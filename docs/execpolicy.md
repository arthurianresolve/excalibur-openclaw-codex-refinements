# Exec Policy Layer

## Goal
Provide a first‑class policy system that decides whether a tool/skill invocation is allowed, needs approval, or is denied.

## Enforcement points
- **Before tool execution** (primary gate)
- **Before sandbox escalation** (secondary gate)
- **Before network egress** (optional future)

## Flow
1. Request arrives (tool/skill invocation)
2. Policy engine evaluates `action + scope + context`
3. Policy result: `allow | prompt | deny`
4. If `prompt`, user approval workflow kicks in
5. Execution proceeds or is blocked
6. Audit event is logged

## Policy scopes (example)
- `fs.read`, `fs.write`, `fs.delete`
- `net.http`, `net.ws`, `net.smtp`
- `process.exec`, `process.install`
- `secrets.read`
- `sandbox.escalate`

## Audit output
Each decision logs:
- `policyId`, `action`, `scope`
- `decision`, `reason`
- `agentId`, `sessionId`

## Schema
See `schemas/execpolicy.json`.
