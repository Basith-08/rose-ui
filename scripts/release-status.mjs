import { spawnSync } from 'node:child_process'

const gitCheck = spawnSync('git', ['rev-parse', '--is-inside-work-tree'], {
  stdio: 'pipe',
  encoding: 'utf8',
})

if (gitCheck.status !== 0 || gitCheck.stdout.trim() !== 'true') {
  console.log('Skipping changeset status because this workspace is not inside a Git repository.')
  process.exit(0)
}

const status = spawnSync('pnpm', ['exec', 'changeset', 'status', '--verbose'], {
  stdio: 'inherit',
})

process.exit(status.status ?? 0)
