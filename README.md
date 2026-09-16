# TEMO Efficiency

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TEMO Efficiency](https://img.shields.io/badge/TEMO%20Efficiency-v1.5.0-blue.svg)](TEMO_LATEST.md)

**Provider-aware model + reasoning-level routing for AI execution workflows.**

TEMO Efficiency helps an AI decide **which tool, which model, and which reasoning/effort level to use before execution**. It avoids using the strongest model by default, prevents repeated verified work, and escalates only when evidence shows that the current checkpoint needs more capability.

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

**[العربية](README.ar.md)**

---

## What TEMO Efficiency does

```text
Load TEMO Efficiency
→ refresh the current canonical rules when possible
→ identify/confirm the AI provider/tool
→ verify the user's real selectable models + reasoning levels
→ ask for screenshots/list only when the catalog is not visible
→ build/reuse FAST / BALANCED / DEEP / MAX
→ score the current checkpoint
→ choose the exact model + level
→ SHOW THE CHOICE BEFORE EXECUTION
→ execute one bounded micro-checkpoint
→ verify the result
→ protect PASS / VERIFIED work
→ escalate one step only when evidence justifies it
→ optionally prepare evidence-based feedback
```

TEMO is an **execution behavior contract**, not just a prompt that says “use fewer tokens.”

---

## The user sees the model + level before every command

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <exact verified model>
Profile: FAST
Level / Effort: <exact verified level>
Boost / Speed: OFF or Not exposed
Consumption: Low or Not exposed
Deploy: NO
Reason: The current checkpoint is deterministic and narrow.

Then copy and execute the command below.
```

When TEMO has enough verified information, **it chooses for the user**. The user should not have to guess which model or level to select.

Escalation is only:

```text
FAST → BALANCED → DEEP → MAX
```

---

## Works across AI providers

TEMO can be used with:

- ChatGPT / OpenAI
- Codex
- Claude / Claude Code
- Gemini
- Cursor
- Copilot
- Cloud Code
- local models
- other AI tools

TEMO does not assume that two users on the same provider have the same model catalog. Free/paid/professional tiers, experiments, apps, regions, and product surfaces may expose different options.

### If the catalog is visible

Use the real current model + level controls directly.

### If the catalog is not visible

TEMO asks for the smallest evidence needed:

```text
Send screenshots of:
1) the expanded model picker,
2) the expanded reasoning/level/thinking picker if separate,
3) any boost/speed/mode selector if present.

If screenshots are inconvenient, paste the exact visible labels instead.
```

If the AI/tool itself is unclear, TEMO may ask for one screenshot of the app/site header or settings page.

TEMO never builds a full ladder from memory, provider-family assumptions, or plan/tier assumptions.

See [`templates/CATALOG_CONFIDENCE_GATE.md`](templates/CATALOG_CONFIDENCE_GATE.md).

---

## Auto-refresh: how TEMO stays current

TEMO uses a **canonical refresh model**.

At the start of a new session, when repository access exists:

1. read [`TEMO_LATEST.md`](TEMO_LATEST.md) once;
2. compare the loaded version with the current manifest;
3. if the loaded copy is older, load the current canonical `SKILL.md` or `TEMO_PORTABLE.md` before routing the first task;
4. do not keep checking repeatedly during the same session.

If the update check fails, TEMO continues with the loaded copy instead of blocking the user's task.

### What “auto-update” does **not** mean

TEMO does **not** silently rewrite this GitHub repository from arbitrary user sessions.

Improvements enter through reviewed maintainer changes, GitHub Issues, or Pull Requests. This avoids a bad run automatically changing the canonical skill for everyone.

---

## Feedback loop: learn from real users without hidden telemetry

TEMO does **not** silently upload conversations, screenshots, prompts, code, logs, account information, provider catalogs, or telemetry.

When a meaningful signal happens, TEMO may prepare an optional compact feedback report, for example:

- routing was too strong or too weak;
- provider/model discovery failed;
- a new provider exposes unfamiliar controls;
- `CATALOG_HALLUCINATION_FAIL` occurred;
- GitHub/portable fallback failed;
- a regression guard prevented repeated work;
- documentation was unclear;
- a cross-device/provider test produced a useful PASS/FAIL.

The user decides whether to submit it.

Use the GitHub **TEMO Efficiency Feedback** issue form or see [`docs/FEEDBACK_LOOP.md`](docs/FEEDBACK_LOOP.md).

Feedback is useful when it contains minimal reproducible evidence, not private data.

---

## Reliable when GitHub browsing is weak

TEMO has three official access modes:

```text
A. Full repository access
   → use the canonical files

B. Repository search/navigation fails
   → stop after one failed lookup
   → load the raw portable contract:
     https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md

C. No web access
   → upload/paste TEMO_PORTABLE.md once
   → use the core workflow from that one file
```

[`TEMO_PORTABLE.md`](TEMO_PORTABLE.md) is self-contained.

---

## Quick activation in a new AI conversation

Paste:

```text
Use TEMO Efficiency.
First try the canonical repository:
https://github.com/luaysameer/temo-efficiency

If repository navigation/search fails, do NOT keep retrying it. Immediately load:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md

Then follow TEMO Efficiency for my next task.
```

If the AI has no web access, upload only `TEMO_PORTABLE.md` and say:

```text
Use the attached TEMO_PORTABLE.md as the TEMO Efficiency behavior contract for this chat.
```

---

## Model routing

TEMO scores the **current checkpoint**, not the importance of the whole project.

Five dimensions are scored 0–2:

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

A full exact ladder is created only from a **verified catalog**.

If only the current model is known:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
```

---

## Micro-checkpoints + LOCKED_PASS

Large work is split into narrow checkpoints.

Each checkpoint contains:

- Tool/environment
- exact model + profile
- exact reasoning/effort level when exposed
- boost/consumption state when exposed
- one primary objective
- protected / do-not-repeat work
- targeted diagnostics/tests
- success condition
- stop condition
- Deploy YES/NO

After meaningful verified success:

```text
diagnose → fix → targeted test → regression guard → real acceptance → LOCKED_PASS
```

Future work should preserve that PASS unless relevant code, dependencies, environment, provider catalog, requirements, or evidence changes.

---

## Local vs cloud execution

If a task requires local USB, Android ADB, local files, GPU, desktop UI, browser state, or attached hardware, TEMO should choose an execution environment that can physically reach it.

---

## Test TEMO on another phone/account/provider

Use [`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md).

It covers:

- full repository access;
- raw portable fallback;
- no-web single-file mode;
- unknown provider/catalog;
- different account model catalogs;
- catalog hallucination prevention;
- escalation behavior;
- PASS preservation.

---

## Key files

- [`SKILL.md`](SKILL.md) — normative skill behavior, **v1.5.0**
- [`TEMO_LATEST.md`](TEMO_LATEST.md) — current-version manifest
- [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md) — startup/update/fallback flow
- [`TEMO_PORTABLE.md`](TEMO_PORTABLE.md) — self-contained portable contract
- [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md) — provider/model/level discovery
- [`templates/CATALOG_CONFIDENCE_GATE.md`](templates/CATALOG_CONFIDENCE_GATE.md) — blocks model-catalog guessing
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — model + level shown before execution
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — micro-checkpoint contract
- [`docs/FEEDBACK_LOOP.md`](docs/FEEDBACK_LOOP.md) — opt-in feedback workflow
- [`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md) — portability/regression tests
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution guidance
- [`README.ar.md`](README.ar.md) — الشرح العربي

---

## What TEMO Efficiency does not do

TEMO does not bypass quotas, billing, subscriptions, rate limits, plan restrictions, or safety controls.

It does not guarantee a fixed saving percentage.

It does not use hidden telemetry or silently self-modify the canonical repository.

The purpose is to reduce **avoidable AI work** while preserving the required quality bar.

## License

MIT — use it, test it, adapt it, and improve it.
