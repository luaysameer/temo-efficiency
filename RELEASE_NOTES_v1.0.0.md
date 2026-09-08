# TEMO Efficiency v1.0.0

Initial public release of **TEMO Efficiency** — smart model routing + micro-checkpoint execution for GPT/Codex-style workflows.

## Highlights

- Five-axis task scoring: complexity, risk, scope, verification burden, and uncertainty.
- Capability routing through FAST / BALANCED / DEEP / MAX profiles.
- Micro-checkpoint execution contracts for narrow, auditable implementation work.
- Dual execution header to make implementation intent explicit.
- Regression-lock workflow to protect already-fixed behavior.
- Clear separation between IMPLEMENTED and VERIFIED states.
- Configurable model ladder so the workflow survives model catalog changes.
- English and Arabic documentation.

## Core principle

Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

TEMO Efficiency does not bypass quotas, subscriptions, rate limits, or safety controls. Its purpose is to reduce avoidable AI usage by preventing over-modeling, repeated work, unnecessary full regressions, and scope drift.

## Included files

- `SKILL.md`
- `README.md`
- `README.ar.md`
- `templates/CHECKPOINT.md`
- `templates/EXECUTION_HEADER.md`
- `config/model-ladder.example.yaml`
- `examples/EXAMPLES.md`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `LICENSE`

## Origin

Developed through the **TEMO × AREEN** workflow: split work into precise checkpoints, route each checkpoint to the capability it actually needs, preserve previous PASS states, and verify before moving forward.
