import { writeFile } from 'node:fs/promises'

const [url, output, widthValue, heightValue, captureMode] = process.argv.slice(2)
if (!url || !output || !widthValue || !heightValue) throw new Error('Usage: capture-local-page.mjs <url> <output> <width> <height>')
const width = Number(widthValue)
const height = Number(heightValue)
const pages = await fetch('http://127.0.0.1:9223/json/list').then((response) => response.json())
const page = pages.find((entry) => entry.type === 'page')
if (!page) throw new Error('No Chrome page target is available')
const socket = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})
let commandId = 0
const pending = new Map()
const events = new Map()
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message))
    else resolve(message.result)
  } else if (message.method && events.has(message.method)) {
    events.get(message.method).forEach((resolve) => resolve(message.params))
    events.delete(message.method)
  }
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++commandId
  pending.set(id, { resolve, reject })
  socket.send(JSON.stringify({ id, method, params }))
})
const once = (method) => new Promise((resolve) => {
  const listeners = events.get(method) || []
  listeners.push(resolve)
  events.set(method, listeners)
})

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width, height, deviceScaleFactor: 1, mobile: false,
  screenWidth: width, screenHeight: height,
})
const loaded = once('Page.loadEventFired')
await send('Page.navigate', { url })
await Promise.race([
  loaded,
  new Promise((resolve) => setTimeout(resolve, 8000)),
])
await new Promise((resolve) => setTimeout(resolve, 1500))
if (captureMode === 'full') {
  await send('Runtime.evaluate', {
    expression: `new Promise(async (resolve) => { const step = Math.max(500, Math.floor(innerHeight * 0.75)); for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise((next) => setTimeout(next, 90)); } scrollTo(0, 0); await new Promise((next) => setTimeout(next, 500)); resolve(true); })`,
    awaitPromise: true,
    returnByValue: true,
  })
}
const metrics = await send('Runtime.evaluate', { expression: '({innerWidth, innerHeight, scrollWidth: document.documentElement.scrollWidth})', returnByValue: true })
if (metrics.result.value.innerWidth !== width || metrics.result.value.scrollWidth > width) {
  const overflow = await send('Runtime.evaluate', {
    expression: `Array.from(document.querySelectorAll('*')).map((element) => { const rect = element.getBoundingClientRect(); return { tag: element.tagName, className: String(element.className || '').slice(0, 100), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) } }).filter((item) => item.left < -1 || item.right > innerWidth + 1).slice(0, 20)`,
    returnByValue: true,
  })
  throw new Error(`Viewport mismatch: ${JSON.stringify(metrics.result.value)} overflow=${JSON.stringify(overflow.result.value)}`)
}
const layout = await send('Page.getLayoutMetrics')
const fullPage = captureMode === 'full' || captureMode === 'rawfull'
if (captureMode === 'scrolltiles') {
  const pageHeight = Math.ceil(layout.cssContentSize.height)
  const parts = []
  await send('Runtime.evaluate', {
    expression: "document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto'; true",
    returnByValue: true,
  })
  for (let desiredY = 0, index = 0; desiredY < pageHeight; desiredY += height, index += 1) {
    const actualY = Math.min(desiredY, Math.max(0, pageHeight - height))
    const cropY = desiredY - actualY
    const cropHeight = Math.min(height, pageHeight - desiredY)
    await send('Runtime.evaluate', { expression: `scrollTo({ top: ${actualY}, left: 0, behavior: 'instant' }); ${index ? "document.querySelector('header')?.style.setProperty('visibility','hidden')" : ''}; true`, returnByValue: true })
    await new Promise((resolve) => setTimeout(resolve, 600))
    const part = `${output}.part-${String(index).padStart(2, '0')}.png`
    const tile = await send('Page.captureScreenshot', { format: 'png', fromSurface: true })
    await writeFile(part, Buffer.from(tile.data, 'base64'))
    parts.push({ part, cropY, cropHeight })
  }
  socket.close()
  console.log(JSON.stringify({ ...metrics.result.value, pageHeight, parts }))
  process.exit(0)
}
if (captureMode === 'tiles') {
  const tileHeight = 2000
  const pageHeight = Math.ceil(layout.cssContentSize.height)
  const parts = []
  for (let y = 0, index = 0; y < pageHeight; y += tileHeight, index += 1) {
    const part = `${output}.part-${String(index).padStart(2, '0')}.png`
    const tile = await send('Page.captureScreenshot', {
      format: 'png', fromSurface: true, captureBeyondViewport: true,
      clip: { x: 0, y, width, height: Math.min(tileHeight, pageHeight - y), scale: 1 },
    })
    await writeFile(part, Buffer.from(tile.data, 'base64'))
    parts.push(part)
  }
  socket.close()
  console.log(JSON.stringify({ ...metrics.result.value, pageHeight, parts }))
  process.exit(0)
}
const screenshot = await send('Page.captureScreenshot', {
  format: 'png', fromSurface: true, captureBeyondViewport: fullPage,
  ...(fullPage ? { clip: { x: 0, y: 0, width, height: Math.ceil(layout.cssContentSize.height), scale: 1 } } : {}),
})
await writeFile(output, Buffer.from(screenshot.data, 'base64'))
socket.close()
console.log(JSON.stringify(metrics.result.value))
