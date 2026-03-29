import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { minimatch } from 'minimatch';

const schemaPath = new URL('../schemas/execpolicy.json', import.meta.url);
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

export function loadPolicy(filePath) {
  const raw = fs.readFileSync(path.resolve(filePath), 'utf8');
  const policy = JSON.parse(raw);
  if (!validate(policy)) {
    throw new Error(`Exec policy schema invalid: ${ajv.errorsText(validate.errors)}`);
  }
  return policy;
}

function matchesScope(scope, scopes) {
  return scopes.some((pattern) => minimatch(scope, pattern));
}

function matchesConditions(conditions = {}, context = {}) {
  const { agentId, toolName, pathPrefix, domainAllowlist } = conditions;
  if (agentId && agentId !== context.agentId) return false;
  if (toolName && toolName !== context.toolName) return false;
  if (pathPrefix && context.path && !context.path.startsWith(pathPrefix)) return false;
  if (domainAllowlist && Array.isArray(domainAllowlist)) {
    if (!context.domain || !domainAllowlist.includes(context.domain)) return false;
  }
  return true;
}

export function evaluatePolicy(policy, scope, context = {}) {
  const matches = policy.policies.filter((p) => matchesScope(scope, p.scopes)
    && matchesConditions(p.conditions, context));
  if (matches.length === 0) {
    return { decision: 'prompt', scope, reason: 'no_matching_policy' };
  }
  const decision = matches.find((p) => p.decision === 'deny')?.decision
    || matches.find((p) => p.decision === 'prompt')?.decision
    || 'allow';
  return { decision, scope, matched: matches.map((p) => p.id) };
}
