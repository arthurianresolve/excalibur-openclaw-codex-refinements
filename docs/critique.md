# Critique of Initial Proposal (and Improvements)

## What was weak / risky
1) **Too much at once**: The original plan bundled policy, skills, and sandbox changes without explicit checkpoints to validate safety and regressions.
2) **Policy without an enforcement surface**: The proposal didn’t define where policies are enforced in the runtime pipeline or how to test them.
3) **Missing compatibility strategy**: No plan for migration of existing skills or per‑agent overrides without breaking workflows.
4) **Operational noise**: Sandbox guardian changes could introduce restarts if rules are too aggressive.
5) **Insufficient observability**: No tracing/metrics plan to prove improvement or detect regressions.

## Improvements applied
- **Gated rollout**: policy introduced in “observe‑only” mode first, then enforce for a small allowlist of tools.
- **Explicit enforcement points**: policy enforcement happens before tool execution and before sandbox escalation.
- **Migration path**: skills run without manifests by default, but produce a warning and auto‑generate a manifest scaffold.
- **Safety backoff**: sandbox guardian uses TTLs + exponential cooldowns to avoid restart loops.
- **Telemetry**: add audit events for policy decisions and sandbox lifecycle actions.

## Improved sequencing
1. **Exec policy layer (observe‑only)**
2. **Skill manifests + permissions**
3. **Sandbox guardian (self‑healing)**
4. **Enforcement hardening + cleanup refactors**
