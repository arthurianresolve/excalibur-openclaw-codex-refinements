# Implementation Plan

## Phase 1 — Exec policy (observe‑only)
- Add policy evaluation hook before tool execution
- Log decisions without blocking
- Add audit event stream
- Ship a reference CLI + schema validator (ocp)

## Phase 2 — Skill manifests
- Introduce manifest schema + lint command
- Enforce manifest for selected skills (pilot)
- Add network/domain allowlist handling

## Phase 3 — Sandbox guardian
- Build guardian service (cron or internal scheduler)
- Auto‑prune exited sandboxes
- Auto‑recreate on failure with cooldown

## Phase 4 — Enforcement hardening
- Enforce policy for all tools/skills
- Remove legacy ad‑hoc checks
- Add failure diagnostics + dashboards

## Rollback plan
- Policy can be toggled to `observe‑only`
- Guardian can be disabled by config
