import { describe, expect, it } from 'vitest';
import { evaluatePolicy } from '../src/execpolicy.js';

const policy = {
  policies: [
    { id: 'allow-read', scopes: ['fs.read'], decision: 'allow' },
    { id: 'prompt-write', scopes: ['fs.write'], decision: 'prompt' },
    { id: 'deny-exec', scopes: ['process.exec'], decision: 'deny' },
    { id: 'allow-glob', scopes: ['net.*'], decision: 'allow' },
  ],
};

describe('evaluatePolicy', () => {
  it('returns allow for allowed scope', () => {
    const result = evaluatePolicy(policy, 'fs.read');
    expect(result.decision).toBe('allow');
  });

  it('returns prompt for prompt scope', () => {
    const result = evaluatePolicy(policy, 'fs.write');
    expect(result.decision).toBe('prompt');
  });

  it('returns deny for deny scope', () => {
    const result = evaluatePolicy(policy, 'process.exec');
    expect(result.decision).toBe('deny');
  });

  it('supports glob scopes', () => {
    const result = evaluatePolicy(policy, 'net.http');
    expect(result.decision).toBe('allow');
  });

  it('returns prompt when no match exists', () => {
    const result = evaluatePolicy(policy, 'fs.delete');
    expect(result.decision).toBe('prompt');
  });
});
