# TEMO Efficiency

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Provider-aware model + reasoning-level routing for AI execution workflows.**

TEMO Efficiency helps an AI decide **which tool, which model, and which reasoning/effort level should be used before execution**, instead of always using the strongest model or leaving the user to guess.

It also splits work into narrow micro-checkpoints, protects VERIFIED/PASS work, and escalates only when evidence shows that the current checkpoint actually needs more capability.

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

## What happens when you use this skill?

The intended behavior is:

```text
Load TEMO Efficiency
→ detect/confirm the AI provider or tool
→ discover the real available models + reasoning levels
→ build/reuse FAST / BALANCED / DEEP / MAX mapping
→ score the current task checkpoint
→ choose the exact model + level
→ SHOW THE CHOICE BEFORE EXECUTION
→ execute one bounded checkpoint
→ verify the result
→ protect PASS/VERIFIED work
→ escalate one step only if diagnostics justify it
```

TEMO Efficiency is not just a prompt saying “use fewer tokens.” It is a reusable **execution behavior contract**.

See [`docs/BEHAVIOR_CONTRACT.md`](docs/BEHAVIOR_CONTRACT.md).

## The user sees the model + level before every command

Before any executable command, the AI should show something equivalent to:

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <exact real model from the active catalog>
Profile: FAST
Level / Effort: <exact real level>
Boost / Speed: OFF or Not exposed
Consumption: Low or Not exposed
Deploy: NO
Reason: The current checkpoint is deterministic and narrow.

Then copy and execute the command below.
```

If TEMO already knows the model catalog, it chooses for the user. The user should not have to guess.

If the task becomes harder later, TEMO shows a new execution choice and escalates only one step:

```text
FAST → BALANCED → DEEP → MAX
```

Previously verified work stays protected.

## Works with different AI providers

TEMO Efficiency is provider-aware.

It can be used with environments such as:

- ChatGPT / OpenAI
- Codex
- Claude / Claude Code
- Gemini
- Cursor
- Copilot
- Cloud Code
- local models
- other AI tools

### If the AI already knows its current model catalog

Use the real current models and reasoning/effort controls directly.

Do not ask the user to repeat information the environment already exposes.

### If the model catalog is not visible

TEMO asks once for either:

- one screenshot of the model + reasoning/level picker, or
- a pasted list of the exact models and levels available.

It then builds a session-local ladder:

```text
FAST      → smallest capable model + lowest reliable level
BALANCED  → normal/default coding-analysis model + medium/default level
DEEP      → stronger reasoning/coding model + medium/high level
MAX       → strongest available model + highest justified level
```

That mapping is reused during the session. TEMO should not keep asking for the same model list.

TEMO never invents a model name, reasoning level, boost mode, or provider capability.

See [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md).

## ChatGPT / OpenAI / Codex

For ChatGPT/OpenAI/Codex, TEMO uses the **current** model and reasoning controls exposed by the active environment when they are available.

The repository intentionally does not permanently hardcode one OpenAI model list because product catalogs and controls can change.

If the exact current choices are not visible to the AI, TEMO asks once for a screenshot or pasted list and maps the real choices.

## Load one file — bootstrap the workflow

Loading either this `README.md` or [`SKILL.md`](SKILL.md) is enough to enter the TEMO workflow **when the AI can access this repository**.

The canonical bootstrap is:

1. [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md)
2. [`SKILL.md`](SKILL.md)
3. [`docs/BEHAVIOR_CONTRACT.md`](docs/BEHAVIOR_CONTRACT.md)
4. [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml)
5. [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md)
6. [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md)
7. [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md)
8. [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) when actual execution is requested

Do not repeatedly reload unchanged files during the same session.

## Quick activation in a new ChatGPT / AI conversation

Paste this:

```text
Use TEMO Efficiency from https://github.com/luaysameer/temo-efficiency
Load the current SKILL.md and TEMO_BOOTSTRAP.md, follow them as the execution behavior contract for this chat, and do not execute my task until you have completed the provider/model/level discovery required by the skill.
```

Then give the task.

If that AI cannot access GitHub, upload/provide the relevant TEMO skill files instead. A public GitHub repository cannot automatically inject itself into an unrelated AI conversation unless the AI is given the repository/files and can read them.

## Test it on another phone or computer

A complete fresh-session test is included in:

[`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md)

Use it to verify that another ChatGPT session or another supported AI environment follows the same behavior.

A correct run should:

- discover/confirm the provider and catalog only when needed;
- choose the model + level for the user;
- show `EXECUTION CHOICE` before the command;
- use a narrow checkpoint first;
- preserve previous PASS results;
- escalate one step only when evidence requires it.

## Model routing

TEMO scores the **current checkpoint**, not the importance of the whole project.

Five dimensions are scored from 0–2:

- Complexity
- Risk
- Scope
- Verification burden
- Uncertainty

| Score | Profile | Typical level | Intended use |
|---:|---|---|---|
| 0–2 | **FAST** | lowest reliable | deterministic edits, extraction, formatting, narrow checks |
| 3–5 | **BALANCED** | medium/default | focused implementation, normal debugging, targeted integration |
| 6–8 | **DEEP** | medium/high | difficult regressions, architecture, coupled systems |
| 9–10 | **MAX** | highest justified | exceptional complexity or high security/data/infrastructure risk |

Routing uses capability profiles, then maps them to the user's **real discovered catalog**.

## Micro-checkpoints

Large work is split into bounded execution units.

Each checkpoint should state:

- Tool/environment
- Exact mapped model + TEMO profile
- Exact reasoning/effort level when exposed
- Consumption/boost state when exposed
- One primary objective
- Protected / do-not-repeat work
- Targeted diagnostics/tests
- Success condition
- Stop condition
- Deploy YES/NO

See [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md).

## Regression Lock

After a meaningful fix:

```text
diagnose → fix → targeted test → regression guard → real acceptance → LOCKED_PASS
```

Future work touching that surface should preserve the verified result instead of paying for the same investigation again.

## Quality rule

TEMO Efficiency does **not** save usage by lowering the quality bar.

Acceptance criteria stay fixed.

The savings target comes from:

- using the smallest capable model/level;
- sending only relevant context;
- running targeted tests when appropriate;
- avoiding repeated diagnostics;
- protecting verified work;
- escalating only with evidence.

`IMPLEMENTED` is not the same as `VERIFIED`.

## Local vs cloud execution

TEMO also selects the execution environment.

If work requires local USB, filesystem access, GPU, desktop UI, or attached hardware, TEMO should choose a local environment instead of a cloud environment that cannot physically reach the device.

## Quick Start

1. Load [`SKILL.md`](SKILL.md) or this README.
2. Let TEMO discover/reuse the real provider model + level catalog.
3. Give it a task and acceptance criteria.

Copy/paste starter:

```text
Use the latest TEMO Efficiency rules from luaysameer/temo-efficiency.
Bootstrap the canonical workflow if repository access is available.
Discover or reuse my actual AI provider/model/level catalog before choosing an exact model.
Before every execution command, show the recommended Tool / Model / Profile / Level / Boost / Consumption / Deploy choice and one short reason.
Choose for me when the environment is known; do not make me guess the model or level.
Preserve acceptance criteria and previous PASS/VERIFIED work.
Escalate only when diagnostics justify it.

Task: <describe the task>
Acceptance criteria: <required result>
Protected / do not change: <known PASS areas or limits>
```

## Documentation

- [`SKILL.md`](SKILL.md) — normative skill behavior
- [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md) — canonical bootstrap sequence
- [`docs/BEHAVIOR_CONTRACT.md`](docs/BEHAVIOR_CONTRACT.md) — what the skill must do
- [`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md) — verify behavior on another device/session/provider
- [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md) — provider/model/level discovery
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — mandatory choice shown before execution
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — micro-checkpoint contract
- [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) — real execution header
- [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml) — optional persistent mapping
- [`docs/BENCHMARK.md`](docs/BENCHMARK.md) — benchmark protocol
- [`README.ar.md`](README.ar.md) — Arabic guide

## What TEMO Efficiency does not do

It does not bypass quotas, billing, plan restrictions, rate limits, or safety controls. It does not guarantee a fixed saving percentage. Results depend on the workload, provider/model capabilities, context size, verification needs, and environment.

## Origin

TEMO Efficiency was developed through iterative real-project work under the **TEMO × AREEN** workflow: discover the real environment, choose the capability the current checkpoint deserves, verify precisely, and preserve what already passed.

## License

MIT — use it, adapt it, test it, and improve it.
