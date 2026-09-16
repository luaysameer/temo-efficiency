# TEMO Efficiency

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Smart model routing and micro-checkpoint execution for GPT/Codex-style workflows.** TEMO Efficiency helps developers avoid spending strongest-model reasoning, repeated context, and broad test runs on work that does not need them—without lowering the quality bar.

Built through the **TEMO × AREEN** workflow, it turns each task into a scored, bounded checkpoint with evidence-based escalation and regression protection.

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

If that principle would improve your agent workflow, **[Star TEMO Efficiency](https://github.com/luaysameer/temo-efficiency)** and share what happens on a real task.

## What changes for the user

Before every executable command, TEMO Efficiency now makes the execution choice explicit instead of leaving setup to guesswork:

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <exact available model or mapped profile model>
Profile: FAST
Level / Effort: Low
Boost / Speed: OFF
Consumption: Low
Deploy: NO
Reason: The current checkpoint is deterministic and narrow.

Then copy and execute the command below.
```

The skill chooses the smallest capable model/profile, names the reasoning level, explains the choice in one line, and only escalates when evidence requires it. See [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md).

## Quick Start

1. Load [`SKILL.md`](SKILL.md) in your agent's skill directory, or paste it into the project instructions for a GPT/Codex-style workflow.
2. Map FAST, BALANCED, DEEP, and MAX to the capability levels available in your environment; [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml) is an optional starting point.
3. Give the agent a task with this copy/paste instruction:

```text
Use the TEMO Efficiency rules in SKILL.md for this task.
Before every execution command, show me the recommended Tool / Model / Profile / Level / Boost / Consumption / Deploy choice and one short reason.
Choose for me when the environment is known; do not make me guess the model or level.
Score the current task, choose FAST / BALANCED / DEEP / MAX, and explain the route.
Create and execute one narrow micro-checkpoint. Preserve existing acceptance criteria and previous PASS states.
Run verification proportional to the change surface, add a regression guard when practical, and escalate only when diagnostics justify it.
Stop at the checkpoint boundary and report the evidence.

Task: <describe the task>
Acceptance criteria: <state the required result>
Protected / do not change: <state known PASS areas or scope limits>
```

For complete ready-to-adapt scenarios, see [`examples/EXAMPLES.md`](examples/EXAMPLES.md).

## 30-Second Demo

### Before: capability and scope are chosen by habit

```text
Task: Fix a reproducible parser bug in one input path.

1. Send the whole repository and history to the strongest model.
2. Ask for a broad review and implementation at the same time.
3. Run every test after each attempt.
4. Debug unrelated failures repeatedly.
5. Spend more tokens/credits without evidence that wider scope improved acceptance.
```

### After: route and verify the checkpoint with TEMO Efficiency

```text
1. Score complexity, risk, scope, verification burden, and uncertainty.
2. Show the user the exact execution choice: tool, model, profile, level, boost, consumption, deploy, reason.
3. Choose FAST / BALANCED / DEEP / MAX from the score and evidence.
4. Create one narrow micro-checkpoint for the failing path.
5. Reproduce the failure, make the bounded change, and run targeted verification.
6. Add the smallest regression guard for the broken contract.
7. Preserve previous PASS state outside the change surface.
8. Escalate one profile only if diagnostics show ambiguity, coupling, or risk.
```

The acceptance criteria do not change. The workflow reduces avoidable work by narrowing model capability, context, implementation, and verification to the evidence-supported surface.

## Model Routing Overview

TEMO Efficiency scores five dimensions from 0–2: complexity, risk, scope, verification burden, and uncertainty. The total selects a generic capability profile, not a hardcoded model brand.

| Score | Profile | Default level | Use it for |
|---:|---|---|---|
| 0–2 | **FAST** | Low | Cheap, fast, deterministic work with a narrow surface and obvious verification |
| 3–5 | **BALANCED** | Medium | Focused implementation and normal debugging with a known target |
| 6–8 | **DEEP** | Medium / High | Difficult regressions, architecture reasoning, or several coupled components |
| 9–10 | **MAX** | High | Exceptional complexity or high security, data, infrastructure, or production risk |

Configure each profile to the smallest model in your environment that can reliably satisfy its checkpoints. Move through `FAST → BALANCED → DEEP → MAX` one step at a time, carrying forward useful diagnostics and completed work.

## How the Workflow Protects Quality

- Acceptance criteria remain fixed; efficiency never means accepting less.
- The user sees the recommended model and level before execution starts.
- Large jobs become micro-checkpoints with one primary objective and a stop condition.
- Targeted tests fit narrow changes; broader regressions remain required when shared contracts, schemas, routing, security boundaries, or deployment foundations change.
- Important fixes receive a small permanent regression guard when practical.
- `IMPLEMENTED` and `VERIFIED` remain distinct: verification requires the acceptance evidence appropriate to the claim.
- Previously verified work is not repeated unless its code, dependency, environment, or requirement changed.

## Benchmarking

The benchmark framework measures whether TEMO Efficiency reduces **avoidable AI work without lowering acceptance quality**. It records routing, escalation, repeated work, attempts, acceptance, measurable consumption, and time to acceptance. No measured dataset is published yet; results are explicitly marked **Data collection pending.**

Use the reusable protocol and table in [`docs/BENCHMARK.md`](docs/BENCHMARK.md), then contribute real observations through [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Micro-Checkpoint Anatomy

A checkpoint states the tool/environment, profile, effort, objective, protected PASS state, verification, success condition, stop condition, deployment permission, and final report shape. Use [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) first, then [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md), and prepend [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) only when execution is intended.

```text
EXECUTION CHOICE
Tool / Environment: <agent and environment>
Model: <exact available model or mapped profile model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <Low | Medium | High>
Boost / Speed: OFF unless justified
Consumption: <lowest practical setting>
Deploy: NO unless explicitly authorized
Reason: <why this is sufficient>

Then copy and execute the command below.
```

## Regression Lock

After an important bug is fixed, preserve the exact contract that failed:

```text
diagnose → fix → targeted test → regression guard → deploy if allowed → real acceptance → protect PASS
```

Future checkpoints touching that surface run the protected guard. This prevents paying for the same failure again while keeping verification proportional to the actual change.

## Configure Your Model Ladder

Copy [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml) and map each capability profile to models available in your environment. Because routing uses capability profiles, the workflow remains useful as model catalogs change.

## Documentation

- [`SKILL.md`](SKILL.md) — normative behavior and routing rules
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — mandatory user-facing model + level selection before execution
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — micro-checkpoint execution contract
- [`examples/EXAMPLES.md`](examples/EXAMPLES.md) — practical routing scenarios
- [`docs/BENCHMARK.md`](docs/BENCHMARK.md) — measurement protocol and reusable dataset template
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — current foundation and planned candidates
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution guidance
- [`README.ar.md`](README.ar.md) — الشرح العربي

## What This Project Does Not Do

TEMO Efficiency does not circumvent quotas, billing, plan restrictions, rate limits, or safety controls. It does not promise a fixed saving. Results depend on workload, model capabilities and pricing, context size, verification needs, and agent behavior.

## Origin

TEMO Efficiency was developed through iterative real-project work under the **TEMO × AREEN** collaboration method: split the work, choose the capability each checkpoint deserves, show the execution choice clearly, verify precisely, and preserve what already passed.

## Contributing

Real workflow reports are especially useful: where routing was correct or wrong, whether escalation was needed, what acceptance evidence existed, and which repeated work was avoided. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT — use it, adapt it, and improve it.
