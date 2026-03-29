#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import minimist from 'minimist';
import { evaluatePolicy, loadPolicy } from '../src/execpolicy.js';
import { validateManifest } from '../src/manifest.js';
import { runGuardian } from '../src/guardian.js';

function formatErrors(errors) {
  if (!errors) return 'unknown error';
  return errors.map((e) => `${e.instancePath || '/'} ${e.message}`).join('\n');
}

const argv = minimist(process.argv.slice(2), {
  boolean: ['dry-run'],
  alias: { h: 'help' },
});

const [command, ...rest] = argv._;

if (!command || argv.help) {
  console.log(`Usage:
  ocp policy-check <policy.json> <scope>
  ocp manifest-lint <manifest.json>
  ocp guardian-run [--dry-run]
`);
  process.exit(0);
}

try {
  if (command === 'policy-check') {
    const [policyPath, scope] = rest;
    if (!policyPath || !scope) throw new Error('policy-check requires <policy.json> <scope>');
    const context = {
      agentId: argv.agent,
      toolName: argv.tool,
      path: argv.path,
      domain: argv.domain,
    };
    const policy = loadPolicy(policyPath);
    const result = evaluatePolicy(policy, scope, context);
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.decision === 'deny' ? 2 : 0);
  }

  if (command === 'manifest-lint') {
    const [manifestPath] = rest;
    if (!manifestPath) throw new Error('manifest-lint requires <manifest.json>');
    const manifest = JSON.parse(fs.readFileSync(path.resolve(manifestPath), 'utf8'));
    const result = validateManifest(manifest);
    if (!result.ok) {
      console.error('Manifest invalid:\n' + formatErrors(result.errors));
      process.exit(1);
    }
    console.log('Manifest OK');
    process.exit(0);
  }

  if (command === 'guardian-run') {
    const result = await runGuardian({ dryRun: argv['dry-run'], policyPath: argv.policy });
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  }

  throw new Error(`Unknown command: ${command}`);
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
