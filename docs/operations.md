# Operational Usage

## Install
```bash
pnpm install
```

## Exec policy check
```bash
ocp policy-check config/execpolicy.example.json fs.read \
  --agent main --tool exec --path /home/george/.openclaw/workspace
```

## Skill manifest lint
```bash
ocp manifest-lint examples/skill-manifest.example.json
```

## Sandbox guardian
```bash
ocp guardian-run --dry-run
ocp guardian-run --policy config/execpolicy.example.json
```

## Notes
- `guardian-run` removes **exited** sandbox containers only.
- Policy evaluation is deterministic and favor‑safe (prompt if no policy match).
