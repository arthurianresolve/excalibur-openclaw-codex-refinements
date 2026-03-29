# Sandbox Guardian

## Goal
Keep sandboxes healthy without operator intervention.

## Responsibilities
- Prune exited containers
- Recreate failed sandboxes
- Respect cooldowns to avoid restart loops

## Policy
- TTL for idle sandboxes (e.g., 30–60 minutes)
- Cooldown after failure (e.g., exponential backoff)
- Guarded by exec policy `sandbox.escalate`

## Telemetry
Emit events for:
- `sandbox.pruned`
- `sandbox.recreated`
- `sandbox.restart_suppressed`
