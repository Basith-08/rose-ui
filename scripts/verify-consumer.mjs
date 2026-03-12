import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
const tempDir = mkdtempSync(join(root, '.tmp-consumer-'))
const storeDir = '/home/junichirou/.local/share/pnpm/store/v10'
const localVueDir = join(root, 'node_modules', 'vue')

const run = (cmd, args, cwd = tempDir) => {
  const result = spawnSync(cmd, args, {
    cwd,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    throw new Error(`Command failed: ${cmd} ${args.join(' ')}`)
  }
}

try {
  run('pnpm', ['pack:local'], root)

  writeFileSync(
    join(tempDir, 'package.json'),
    JSON.stringify(
      {
        name: 'rose-ui-consumer-smoke',
        private: true,
        type: 'module',
      },
      null,
      2,
    ),
  )

  run('pnpm', ['add', '--store-dir', storeDir, `link:${localVueDir}`])
  run('pnpm', [
    'add',
    '--store-dir',
    storeDir,
    join(root, '.local-packages', 'basith-08-tokens-1.0.0.tgz'),
    join(root, '.local-packages', 'basith-08-rose-ui-0.0.0.tgz'),
  ])

  const installState = JSON.parse(readFileSync(join(tempDir, 'package.json'), 'utf8'))
  const installed = Object.keys(installState.dependencies ?? {})

  for (const pkg of ['@kagami.b/tokens', '@kagami.b/rose-ui', 'vue']) {
    if (!installed.includes(pkg)) {
      throw new Error(`Missing installed dependency: ${pkg}`)
    }
  }

  writeFileSync(
    join(tempDir, 'smoke.mjs'),
    `const tokens = await import('@kagami.b/tokens')
const ui = await import('@kagami.b/rose-ui')

for (const key of ['colors', 'spacing', 'radius']) {
  if (!(key in tokens)) throw new Error('Missing token export: ' + key)
}

for (const key of ['Button', 'Input', 'Modal', 'createTheme']) {
  if (!(key in ui)) throw new Error('Missing UI export: ' + key)
}

console.log('External consumer verification passed.')
`,
  )

  run('node', ['smoke.mjs'])
} finally {
  rmSync(tempDir, { recursive: true, force: true })
}
