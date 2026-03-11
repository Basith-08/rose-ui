import { spawnSync } from 'node:child_process'

const checks = [
  {
    filter: '@rose/tokens',
    expression: `
      const mod = await import('@rose/tokens');
      for (const key of ['colors', 'spacing', 'radius']) {
        if (!(key in mod)) {
          throw new Error('Missing token export: ' + key);
        }
      }
    `,
  },
  {
    filter: '@rose/ui',
    expression: `
      const mod = await import('@rose/ui');
      for (const key of ['Button', 'Input', 'Modal', 'createTheme']) {
        if (!(key in mod)) {
          throw new Error('Missing UI export: ' + key);
        }
      }
    `,
  },
]

for (const check of checks) {
  const result = spawnSync(
    'pnpm',
    ['--filter', check.filter, 'exec', 'node', '--input-type=module', '-e', check.expression],
    { stdio: 'inherit' },
  )

  if (result.status !== 0) {
    throw new Error(`Smoke import failed for ${check.filter}`)
  }
}

console.log('Smoke imports passed.')
