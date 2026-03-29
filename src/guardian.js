import { execSync } from 'node:child_process';

export async function runGuardian({ dryRun = false } = {}) {
  // Basic, operational logic: remove exited OpenClaw sandbox containers.
  // This is intentionally conservative and safe-by-default.
  const cmd = "docker ps -a --filter 'name=openclaw-sbx-' --filter 'status=exited' -q";
  const output = execSync(cmd, { encoding: 'utf8' }).trim();
  const ids = output ? output.split(/\s+/) : [];
  if (ids.length === 0) {
    return { action: 'none', removed: [] };
  }
  if (dryRun) {
    return { action: 'dry-run', wouldRemove: ids };
  }
  execSync(`docker rm ${ids.join(' ')}`, { stdio: 'ignore' });
  return { action: 'removed', removed: ids };
}
