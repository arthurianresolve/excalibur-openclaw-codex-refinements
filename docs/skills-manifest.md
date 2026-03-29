# Skill Manifests

## Goal
Make each skill declare the permissions it requires so policies can be enforced consistently.

## Manifest fields (summary)
- `name`, `version`, `entry`
- `permissions`: list of scopes (see exec policy)
- `network`: allowlist of domains or `none`
- `secrets`: required secrets or `none`

## Behavior
- Skills without a manifest still run in **compat mode** but emit a warning.
- `openclaw skill lint` can auto‑generate a manifest scaffold.

## Schema
See `schemas/skill-manifest.json`.
