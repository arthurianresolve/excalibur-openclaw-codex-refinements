import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const schemaPath = new URL('../schemas/skill-manifest.json', import.meta.url);
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

export function validateManifest(manifest) {
  const ok = validate(manifest);
  return { ok, errors: ok ? null : validate.errors };
}
