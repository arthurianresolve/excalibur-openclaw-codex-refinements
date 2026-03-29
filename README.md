# Excalibur OpenClaw Codex Refinements

This repo captures a refined, implementation‑ready plan to integrate Codex‑inspired **exec policy**, **skill manifests**, and **sandbox guardians** into OpenClaw. It includes critique, improved sequencing, schemas, and operational reference code.

## Contents
- `docs/critique.md` — candid critique + improvements
- `docs/architecture.md` — architecture overview
- `docs/execpolicy.md` — exec‑policy architecture & flow
- `docs/skills-manifest.md` — manifest spec + enforcement
- `docs/sandbox-guardian.md` — sandbox lifecycle + auto‑healing
- `docs/implementation-plan.md` — phased plan with milestones
- `docs/operations.md` — operational usage for the CLI
- `docs/clean-coding.md` / `docs/secure-coding.md` — coding standards
- `docs/codex-optimization.md` — token‑efficient guidance for Codex 5.2+
- `config/` — example exec policy configuration
- `schemas/` — JSON schemas for exec policy + skill manifests
- `examples/` — example skill manifest
- `scripts/` — placeholder guardian scripts
- `src/` + `bin/` — operational CLI + reference implementation
- `tests/` — vitest coverage for policy behavior

## Quick start
```bash
pnpm install
pnpm test
pnpm run policy:check
```

## Status
Operational reference implementation. No changes are applied to OpenClaw automatically.
