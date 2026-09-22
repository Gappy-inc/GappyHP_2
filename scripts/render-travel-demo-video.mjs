import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const output = new URL('../public/travel-demo-v3.mp4', import.meta.url).pathname
const posterOutput = new URL('../public/travel-demo-poster-v4.jpg', import.meta.url).pathname
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'gappy-travel-video-'))

const scenes = [
  {
    duration: 8,
    kicker: 'THE OPERATIONAL QUESTION',
    title: ['Tomorrow is booked.', 'But is the guide confirmed?'],
    summary: 'The booking exists. Completion still depends on current confirmation evidence.',
    status: 'CONFIRMATION NEEDED',
    steps: ['Booking context loaded', 'Unconfirmed guide identified', 'Operator review required'],
  },
  {
    duration: 10,
    kicker: 'SAMPLE INSTRUCTION',
    title: ['Turn an instruction', 'into actionable work.'],
    summary: 'Check tomorrow’s departures and follow up on unconfirmed guides.',
    status: 'WORK PREPARED',
    steps: ['12 sample bookings loaded', 'Booking #2871 surfaced', '09:00 · v3 request prepared'],
  },
  {
    duration: 10,
    kicker: 'OPERATOR CONTROL',
    title: ['Review first.', 'Approve explicitly.'],
    summary: 'The operations team sees the exact booking snapshot before external action.',
    status: 'NEEDS APPROVAL',
    steps: ['Guide Tanaka assigned', 'Meeting point checked', 'Approve simulated request'],
  },
  {
    duration: 9,
    kicker: 'GUIDE RESPONSE',
    title: ['A reply is evidence.', 'Not completion.'],
    summary: 'The guide confirms the 09:00 · v3 request on an operator-branded view.',
    status: 'RESPONSE RECEIVED ≠ VERIFIED',
    steps: ['Request approved', 'Guide confirms 09:00 · v3', 'Current booking check pending'],
  },
  {
    duration: 8,
    kicker: 'CURRENT-BOOKING CHECK',
    title: ['Verify against', 'the current source.'],
    summary: 'The response and current booking agree for version 3.',
    status: 'VERIFIED · 09:00 · v3',
    steps: ['Booking active', 'Start time matches', 'Booking version matches'],
  },
  {
    duration: 10,
    kicker: 'MATERIAL CHANGE',
    title: ['09:00 → 10:30.', 'Invalidate. Reconfirm.'],
    summary: 'Booking version 4 replaces version 3. The old confirmation cannot close the new job.',
    status: 'RECONFIRMATION REQUIRED',
    steps: ['v3 confirmation invalidated', '10:30 · v4 request prepared', 'New guide reply required'],
  },
  {
    duration: 5,
    kicker: 'GAPPY / TRAVEL OPERATIONS',
    title: ['From change', 'to verified outcome.'],
    summary: 'See how one bounded workflow fits your operation.',
    status: 'BOOK A DEMO',
    steps: ['Your operation', 'Your approval boundaries', 'Your brand'],
  },
]

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function wrapLines(value, maxLength = 42) {
  const words = value.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxLength && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

function sceneSvg(scene, index) {
  const title = scene.title.map((line, lineIndex) => `<text x="92" y="${260 + lineIndex * 78}" class="title">${escapeXml(line)}</text>`).join('')
  const summary = wrapLines(scene.summary).map((line, lineIndex) => `<text x="92" y="${470 + lineIndex * 38}" class="body">${escapeXml(line)}</text>`).join('')
  const steps = scene.steps.map((step, stepIndex) => {
    const y = 430 + stepIndex * 92
    const active = stepIndex === scene.steps.length - 1
    return `<rect x="790" y="${y}" width="650" height="70" rx="14" fill="${active ? '#242815' : '#17171b'}" stroke="${active ? '#e6ff4a' : '#39393f'}"/>
      <rect x="814" y="${y + 19}" width="32" height="32" rx="8" fill="${active ? '#e6ff4a' : '#242429'}"/>
      <text x="830" y="${y + 41}" text-anchor="middle" class="step-number" fill="${active ? '#11110f' : '#8d8d91'}">0${stepIndex + 1}</text>
      <text x="870" y="${y + 43}" class="step">${escapeXml(step)}</text>`
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <defs>
      <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#ffffff" stroke-opacity=".035"/></pattern>
      <linearGradient id="glow" x1="0" x2="1"><stop stop-color="#c9b6ff" stop-opacity=".22"/><stop offset="1" stop-color="#e6ff4a" stop-opacity=".08"/></linearGradient>
      <style>
        .brand{font-family:Helvetica,sans-serif;font-size:18px;font-weight:600;letter-spacing:4px;fill:#e6ff4a}.meta{font-family:Menlo,monospace;font-size:15px;font-weight:500;letter-spacing:2px;fill:#e6ff4a}.title{font-family:Helvetica,sans-serif;font-size:58px;font-weight:600;fill:#fff}.body{font-family:Helvetica,sans-serif;font-size:24px;font-weight:400;fill:#a7a7aa}.booking{font-family:Helvetica,sans-serif;font-size:31px;font-weight:600;fill:#fff}.small{font-family:Helvetica,sans-serif;font-size:18px;font-weight:400;fill:#8e8e93}.step{font-family:Helvetica,sans-serif;font-size:21px;font-weight:500;fill:#eee}.step-number{font-family:Menlo,monospace;font-size:12px;font-weight:500}.status{font-family:Menlo,monospace;font-size:17px;font-weight:600;letter-spacing:1px;fill:#11110f}.footer{font-family:Menlo,monospace;font-size:13px;font-weight:500;letter-spacing:1.5px;fill:#707075}
      </style>
    </defs>
    <rect width="1600" height="900" fill="#09090b"/><rect width="1600" height="900" fill="url(#grid)"/><circle cx="1300" cy="110" r="460" fill="url(#glow)" opacity=".6"/>
    <text x="92" y="72" class="brand">GAPPY</text><text x="1508" y="72" text-anchor="end" class="footer">INTERACTIVE PROTOTYPE · SAMPLE DATA</text>
    <text x="92" y="174" class="meta">${escapeXml(scene.kicker)}</text>${title}
    ${summary}
    <rect x="92" y="655" width="290" height="58" rx="29" fill="${index === scenes.length - 1 ? '#e6ff4a' : '#ffffff'}"/><text x="237" y="691" text-anchor="middle" class="status">${index === scenes.length - 1 ? 'BOOK A DEMO ↗' : 'SAMPLE WORKFLOW'}</text>
    <rect x="730" y="150" width="790" height="620" rx="26" fill="#101013" stroke="#ffffff" stroke-opacity=".2"/><rect x="730" y="150" width="790" height="72" rx="26" fill="#151519"/><rect x="730" y="196" width="790" height="26" fill="#151519"/>
    <text x="770" y="194" class="footer">BOOKING #2871 · CURRENT WORK ITEM</text><circle cx="1460" cy="184" r="7" fill="#e6ff4a"/><text x="1440" y="190" text-anchor="end" class="footer">ACTIVE</text>
    <text x="790" y="292" class="booking">Mt. Fuji Day Tour</text><text x="790" y="332" class="small">Tomorrow · ${index >= 5 ? '10:30 · Version 4' : '09:00 · Version 3'} · Guide Tanaka</text>
    <rect x="790" y="360" width="650" height="48" rx="24" fill="#e6ff4a"/><text x="1115" y="391" text-anchor="middle" class="status">${escapeXml(scene.status)}</text>
    ${steps}
    <text x="92" y="838" class="footer">NO REAL BOOKINGS · NO MESSAGES SENT · VERIFICATION DOES NOT MEAN THE TOUR OPERATED</text>
  </svg>`
}

try {
  const segmentPaths = []
  scenes.forEach((scene, index) => {
    const svgPath = join(temporaryDirectory, `scene-${index}.svg`)
    const pngPath = join(temporaryDirectory, `scene-${index}.png`)
    const segmentPath = join(temporaryDirectory, `scene-${index}.mp4`)
    writeFileSync(svgPath, sceneSvg(scene, index))
    execFileSync('sips', ['-s', 'format', 'png', svgPath, '--out', pngPath], { stdio: 'ignore' })
    execFileSync('ffmpeg', [
      '-y', '-loop', '1', '-framerate', '30', '-i', pngPath,
      '-t', String(scene.duration),
      '-vf', `scale=1600:900,fade=t=in:st=0:d=0.25,fade=t=out:st=${Math.max(0, scene.duration - 0.25)}:d=0.25,format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-r', '30', segmentPath,
    ], { stdio: 'ignore' })
    segmentPaths.push(segmentPath)
  })

  const concatPath = join(temporaryDirectory, 'concat.txt')
  writeFileSync(concatPath, segmentPaths.map((path) => `file '${path}'`).join('\n'))
  execFileSync('ffmpeg', [
    '-y', '-f', 'concat', '-safe', '0', '-i', concatPath,
    '-c', 'copy', '-movflags', '+faststart', output,
  ], { stdio: 'inherit' })
  execFileSync('ffmpeg', [
    '-y', '-ss', '47', '-i', output,
    '-frames:v', '1', '-q:v', '2', posterOutput,
  ], { stdio: 'ignore' })
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true })
}
