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

## Reliable even when GitHub search fails

Some AI providers can open GitHub repositories directly. Others can browse the web but cannot reliably resolve a repository through search/indexing. Some have no external web access at all.

TEMO Efficiency now has three official access paths:

```text
A. Full repository access
   → load the canonical files normally

B. Repository search/navigation fails
   → stop retrying after one failure
   → fetch the single raw portable file:
     https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md

C. No web access
   → upload/paste TEMO_PORTABLE.md once
   → run the full core workflow from that one file
```

[`TEMO_PORTABLE.md`](TEMO_PORTABLE.md) is self-contained. If it is already loaded, the AI must **not** require the rest of the repository before using the core TEMO workflow.

This fallback was added after a real cross-provider test showed that one AI could use the repository while another spent time trying to locate it and then asked for the skill manually.

The bootstrap itself follows TEMO Efficiency: **one failed repository lookup is enough to fall back**. Do not waste time repeatedly searching/indexing the same repository.

## Load one file — bootstrap the workflow

You have three valid entrypoints:

- [`README.md`](README.md) when repository access works;
- [`SKILL.md`](SKILL.md) when loading the formal skill contract;
- [`TEMO_PORTABLE.md`](TEMO_PORTABLE.md) for a single-file portable/offline/no-browse setup.

When full repository access works, the canonical bootstrap is:

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

Paste this compact activator:

```text
Use TEMO Efficiency.
First try: https://github.com/luaysameer/temo-efficiency
If repository search/navigation fails, do NOT keep retrying it. Immediately load:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md
Then follow TEMO Efficiency for my next task.
```

If that AI has no external web access, upload **only `TEMO_PORTABLE.md`** and say:

```text
Use the attached TEMO_PORTABLE.md as the TEMO Efficiency behavior contract for this chat.
```

A public GitHub repository cannot automatically inject itself into an unrelated AI conversation unless the AI is given the repository/link/file and can read it.

## Test it on another phone or computer

A complete fresh-session test is included in:

[`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md)

It now tests three real portability modes:

- full repository access;
- GitHub search/navigation failure with raw-file fallback;
- no external web access with one uploaded portable file.

A correct run should:

- discover/confirm the provider and catalog only when needed;
- choose the model + level for the user;
- show `EXECUTION CHOICE` before the command;
- use a narrow checkpoint first;
- preserve previous PASS results;
- escalate one step only when evidence requires it;
- avoid repeated GitHub search loops after an access failure.

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

1. Load [`SKILL.md`](SKILL.md), this README, or [`TEMO_PORTABLE.md`](TEMO_PORTABLE.md).
2. Let TEMO discover/reuse the real provider model + level catalog.
3. Give it a task and acceptance criteria.

Copy/paste starter:

```text
Use the latest TEMO Efficiency rules from luaysameer/temo-efficiency.
If normal repository access fails, fall back once to:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md
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
- [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md) — canonical bootstrap + fallback sequence
- [`TEMO_PORTABLE.md`](TEMO_PORTABLE.md) — self-contained single-file fallback
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
