# Architecture Overview

This repo mirrors the OpenClaw documentation style: concise pages, clear sections, and direct operational examples.

## Modules
- **Exec policy** (`src/execpolicy.js`) — evaluates scopes + conditions
- **Manifest validation** (`src/manifest.js`) — validates skill manifests
- **Guardian** (`src/guardian.js`) — manages sandbox cleanup
- **CLI** (`bin/ocp.js`) — operational commands

## Data flow (policy)
1. Load policy config (optional)
2. Evaluate scope + conditions
3. Decide: allow | prompt | deny

## Data flow (guardian)
1. Evaluate policy for `sandbox.cleanup`
2. If allowed, prune exited sandboxes

## Alignment with OpenClaw
- Uses schemas + docs‑first structure
- Separates policy/manifest/ops concerns
- Token‑efficient outputs for Codex 5.2+
