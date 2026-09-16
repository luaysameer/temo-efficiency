# TEMO Efficiency

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Smart provider-aware model routing and micro-checkpoint execution for AI workflows.** TEMO Efficiency helps users avoid spending the strongest model, highest reasoning level, repeated context, and broad test runs on work that does not need them—without lowering the quality bar.

Built through the **TEMO × AREEN** workflow, it turns each task into a scored, bounded checkpoint with provider discovery, explicit model + level selection, evidence-based escalation, and regression protection.

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

If that principle improves your agent workflow, **[Star TEMO Efficiency](https://github.com/luaysameer/temo-efficiency)** and share what happens on a real task.

## Load one file — bootstrap the whole workflow

Loading either this `README.md` or [`SKILL.md`](SKILL.md) is enough to enter TEMO Efficiency.

If the agent can access this repository, it should automatically bootstrap the current canonical files before executing work:

1. [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md)
2. [`SKILL.md`](SKILL.md)
3. [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml)
4. [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md)
5. [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md)
6. [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md)
7. [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) when actual execution is requested

The workflow should not keep reloading unchanged files or repeat provider discovery after it already has a valid session-local model ladder.

If repository access is unavailable, use the loaded copy and never invent missing model names, levels, or controls.

## First question: what AI/tool is actually being used?

TEMO Efficiency is not limited to one provider.

Before routing a task, the agent determines the real environment:

- ChatGPT / OpenAI
- Codex
- Claude / Claude Code
- Gemini
- Cursor
- Copilot
- Cloud Code
- local models
- another AI/tool

If the environment already exposes its current model catalog and reasoning/effort controls, the agent uses those directly and does not ask the user to repeat them.

If the provider or exact choices are unknown, TEMO Efficiency asks once for either:

- the AI/tool name, and
- one screenshot of the model + level/reasoning selector, **or** a pasted list of the exact available models and levels.

From that real catalog, it builds a session-local ladder:

```text
FAST      -> smallest capable model + lowest reliable level
BALANCED  -> normal/default coding-analysis model + medium/default level
DEEP      -> stronger reasoning/coding model + medium/high level
MAX       -> strongest available model + highest justified level
```

The user should not have to guess which model or level to select when TEMO Efficiency has enough information to choose.

See [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md).

## ChatGPT / OpenAI / Codex behavior

For ChatGPT, OpenAI, or Codex, TEMO Efficiency uses the **current** model and reasoning/effort controls exposed by the active environment when they are visible to the agent.

It intentionally does **not** hardcode a permanent OpenAI model list because product catalogs and controls can change.

If the current choices are not visible to the agent, it asks once for a screenshot or pasted list, maps them, and reuses that mapping for the session.

## Other AI providers/tools

For Claude / Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or another environment:

- use the provider/tool's authoritative visible catalog when available;
- otherwise ask for a screenshot or exact pasted list;
- map only the options that actually exist;
- never invent a model, reasoning level, boost mode, or consumption control;
- if capability ordering is ambiguous, ask only for the smallest missing clarification.

## What changes for the user

Before every executable command, TEMO Efficiency makes the execution choice explicit:

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <exact mapped model from the real catalog>
Profile: FAST
Level / Effort: <exact available level>
Boost / Speed: OFF or Not exposed
Consumption: Low or Not exposed
Deploy: NO
Reason: The current checkpoint is deterministic and narrow.

Then copy and execute the command below.
```

If diagnostics later justify escalation, the agent shows a new execution choice before the next command and preserves all previous PASS/VERIFIED work.

See [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md).

## Quick Start

1. Load this `README.md` **or** [`SKILL.md`](SKILL.md). If repository access exists, bootstrap from [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md).
2. Let TEMO discover the actual provider/model/level catalog, or provide one screenshot/list if the environment does not expose it.
3. Give the agent a task with this copy/paste instruction:

```text
Use the latest TEMO Efficiency rules from luaysameer/temo-efficiency.
Bootstrap the canonical workflow if repository access is available.
Discover or reuse my actual AI provider/model/level catalog before choosing an exact model.
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

For ready-to-adapt scenarios, see [`examples/EXAMPLES.md`](examples/EXAMPLES.md).

## 30-Second Demo

### Before: capability and scope are chosen by habit

```text
Task: Fix a reproducible parser bug in one input path.

1. Assume the strongest model is best.
2. Leave the user to guess the reasoning level.
3. Send the whole repository and history.
4. Run every test after each attempt.
5. Debug unrelated failures repeatedly.
6. Spend more tokens/credits without evidence that wider scope improved acceptance.
```

### After: route and verify with TEMO Efficiency

```text
1. Detect the actual AI/tool and its real model + level controls.
2. Reuse the discovered catalog instead of asking again.
3. Score complexity, risk, scope, verification burden, and uncertainty.
4. Show the exact Tool + Model + Profile + Level + Boost + Consumption + Deploy + Reason.
5. Create one narrow micro-checkpoint for the failing path.
6. Reproduce the failure, make the bounded change, and run targeted verification.
7. Add the smallest regression guard for the broken contract.
8. Preserve previous PASS state outside the change surface.
9. Escalate one profile only if diagnostics show ambiguity, coupling, or risk.
```

The acceptance criteria do not change. The workflow reduces avoidable work by narrowing provider choice, model capability, reasoning level, context, implementation, and verification to the evidence-supported surface.

## Model Routing Overview

TEMO Efficiency scores five dimensions from 0–2: complexity, risk, scope, verification burden, and uncertainty. The total selects a generic capability profile, then maps that profile to the user's **actual discovered model catalog**.

| Score | Profile | Default level | Use it for |
|---:|---|---|---|
| 0–2 | **FAST** | Low | Cheap, fast, deterministic work with a narrow surface and obvious verification |
| 3–5 | **BALANCED** | Medium | Focused implementation and normal debugging with a known target |
| 6–8 | **DEEP** | Medium / High | Difficult regressions, architecture reasoning, or several coupled components |
| 9–10 | **MAX** | High | Exceptional complexity or high security, data, infrastructure, or production risk |

Move through `FAST → BALANCED → DEEP → MAX` one step at a time, carrying forward useful diagnostics and completed work.

## How the Workflow Protects Quality

- Acceptance criteria remain fixed; efficiency never means accepting less.
- The user's real provider and model/level catalog are discovered instead of guessed.
- The user sees the recommended exact model and level before execution starts.
- Large jobs become micro-checkpoints with one primary objective and a stop condition.
- Targeted tests fit narrow changes; broader regressions remain required when shared contracts, schemas, routing, security boundaries, or deployment foundations change.
- Important fixes receive a small permanent regression guard when practical.
- `IMPLEMENTED` and `VERIFIED` remain distinct: verification requires the acceptance evidence appropriate to the claim.
- Previously verified work is not repeated unless its code, dependency, environment, provider catalog, or requirement changed.

## Benchmarking

The benchmark framework measures whether TEMO Efficiency reduces **avoidable AI work without lowering acceptance quality**. It records routing, escalation, repeated work, attempts, acceptance, measurable consumption, and time to acceptance. No measured dataset is published yet; results are explicitly marked **Data collection pending.**

Use the reusable protocol and table in [`docs/BENCHMARK.md`](docs/BENCHMARK.md), then contribute real observations through [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Micro-Checkpoint Anatomy

Bootstrap with [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md), discover the provider with [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md), show [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md), then use [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md). Prepend [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) only when execution is intended.

```text
EXECUTION CHOICE
Tool / Environment: <actual agent/environment>
Model: <exact mapped available model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <exact available level or Not exposed>
Boost / Speed: <actual value or Not exposed>
Consumption: <actual value or Not exposed>
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

TEMO can build the ladder dynamically from the user's real catalog. For persistent/manual configuration, copy [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml) and map each capability profile to models available in the environment.

## Documentation

- [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md) — universal entry/bootstrap behavior
- [`SKILL.md`](SKILL.md) — normative behavior and routing rules
- [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md) — discover provider, models, and reasoning levels
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — mandatory user-facing model + level selection before execution
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — micro-checkpoint execution contract
- [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) — implementation header for real execution
- [`examples/EXAMPLES.md`](examples/EXAMPLES.md) — practical routing scenarios
- [`docs/BENCHMARK.md`](docs/BENCHMARK.md) — measurement protocol and reusable dataset template
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — current foundation and planned candidates
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution guidance
- [`README.ar.md`](README.ar.md) — Arabic guide

## What This Project Does Not Do

TEMO Efficiency does not circumvent quotas, billing, plan restrictions, rate limits, or safety controls. It does not promise a fixed saving. Results depend on workload, provider/model capabilities and pricing, context size, verification needs, and agent behavior.

## Origin

TEMO Efficiency was developed through iterative real-project work under the **TEMO × AREEN** collaboration method: discover the actual environment, split the work, choose the capability each checkpoint deserves, show the execution choice clearly, verify precisely, and preserve what already passed.

## Contributing

Real workflow reports are especially useful: provider/model mapping, where routing was correct or wrong, whether escalation was needed, what acceptance evidence existed, and which repeated work was avoided. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT — use it, adapt it, and improve it.
