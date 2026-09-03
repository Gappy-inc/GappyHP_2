import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { extname, join, relative, resolve, sep } from 'node:path'

const outputDirectory = resolve('dist')
const serverDirectory = join(outputDirectory, 'server')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
}

await rm(serverDirectory, { recursive: true, force: true })

async function collectFiles(directory) {
  const files = []

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'server' || entry.name === '.openai') continue

    const absolutePath = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectFiles(absolutePath))
    else files.push(absolutePath)
  }

  return files
}

const assets = {}

for (const absolutePath of await collectFiles(outputDirectory)) {
  const pathname = `/${relative(outputDirectory, absolutePath).split(sep).join('/')}`
  assets[pathname] = {
    body: (await readFile(absolutePath)).toString('base64'),
    type: contentTypes[extname(absolutePath).toLowerCase()] || 'application/octet-stream',
  }
}

const workerSource = `
const ASSETS = ${JSON.stringify(assets)}

function decode(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index)
  return bytes
}

function assetPath(pathname) {
  if (pathname === '/') return '/index.html'
  if (pathname.endsWith('/')) return pathname + 'index.html'
  if (ASSETS[pathname]) return pathname
  if (ASSETS[pathname + '/index.html']) return pathname + '/index.html'
  return '/404.html'
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const pathname = assetPath(decodeURIComponent(url.pathname))
    const asset = ASSETS[pathname]
    const found = pathname !== '/404.html'
    const headers = new Headers({
      'Content-Type': asset.type,
      'X-Content-Type-Options': 'nosniff',
    })

    if (pathname.startsWith('/_astro/')) headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    else headers.set('Cache-Control', 'public, max-age=300')

    if (request.method === 'HEAD') return new Response(null, { status: found ? 200 : 404, headers })
    if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 })
    return new Response(decode(asset.body), { status: found ? 200 : 404, headers })
  },
}
`.trimStart()

await mkdir(serverDirectory, { recursive: true })
await writeFile(join(serverDirectory, 'index.js'), workerSource)

console.log(`Generated Sites worker with ${Object.keys(assets).length} embedded assets.`)
