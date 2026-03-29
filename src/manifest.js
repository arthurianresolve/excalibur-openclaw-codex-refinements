import fs from 'node:fs';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const schemaPath = new URL('../schemas/skill-manifest.json', import.meta.url);
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

export function validateManifest(manifest) {
  const ok = validate(manifest);
  return { ok, errors: ok ? null : validate.errors };
}
