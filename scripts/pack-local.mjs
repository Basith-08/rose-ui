import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
const outDir = join(root, '.local-packages')

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const packages = [
  { name: '@kagami.b/tokens', dir: join(root, 'packages', 'tokens') },
  { name: '@kagami.b/rose-ui', dir: join(root, 'packages', 'ui') },
]

for (const pkg of packages) {
  const result = spawnSync(
    'pnpm',
    ['pack', '--pack-destination', outDir],
    {
      cwd: pkg.dir,
      stdio: 'inherit',
    },
  )

  if (result.status !== 0) {
    throw new Error(`Failed to pack ${pkg.name}`)
  }
}

console.log(`Local tarballs created in ${outDir}`)
