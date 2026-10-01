# OpenAI Work & Codex Routing — verified account snapshot

Verified for the user's visible ChatGPT Work/Codex catalog on **2026-10-01**.

> This is a session/account preset, not a promise that every OpenAI account exposes the same choices. Re-check the picker if the product surface, plan, or available models change.

## Cost-aware ladder

| Profile | Model | Reasoning | Speed | Best for |
|---|---|---|---|---|
| FAST | GPT-6 Luna | Low or Medium | Standard | Search, summaries, file inventory, simple copy/design edits, deterministic chores |
| BALANCED | GPT-6.1 Sol | Medium | Standard | Normal implementation, multi-file changes, UI work, routine debugging |
| DEEP | GPT-6.1 Sol | High | Standard | Architecture, coupled systems, difficult debugging, important game mechanics |
| MAX | GPT-6 Astra | High (or Max only when justified) | Standard | Novel blockers, high-stakes review, exceptionally hard reasoning |

## Speed rule

Use **Standard** by default. Fast/Turbo buys latency, not better reasoning, and spends the allowance faster. Enable it only when waiting time is the actual blocker. After a checkpoint passes, return to Standard.

## Routing rule

Route the **current checkpoint**, not the entire project's prestige:

- Luna handles discovery and bounded chores.
- 6.1 Sol Medium is the default build lane.
- 6.1 Sol High handles hard implementation and diagnosis.
- Astra is a short escalation lane, not the permanent project default.
- If one bounded attempt fails with evidence, escalate one step while carrying forward diagnostics and verified work.

## Mega X ReBurn trial plan

| Checkpoint | Recommended choice | Why |
|---|---|---|
| Inventory sprites, filenames, references, notes | Luna · Medium · Standard | Large but mostly mechanical reading/classification |
| Write the implementation plan and acceptance tests | 6.1 Sol · Medium · Standard | Needs synthesis without maximum reasoning |
| Player movement, state machine, collisions, camera | 6.1 Sol · High · Standard | Coupled gameplay systems and runtime verification |
| Import/normalize sprite sheets and simple animation wiring | 6.1 Sol · Medium · Standard | Focused implementation with visual checks |
| Diagnose a stubborn physics/animation/runtime bug | 6.1 Sol · High · Standard | Deep debugging with preserved evidence |
| One unresolved architectural or creative blocker | Astra · High · Standard | Exceptional escalation only |
| Rename assets, update docs, format configs | Luna · Low · Standard | Deterministic low-risk work |
| Final cross-system review before release | Astra · High · Standard | Short milestone review; return afterward |

### Recommended first command

```text
EXECUTION CHOICE
Tool / Environment: ChatGPT Work with Codex
Model: GPT-6.1 Sol
Profile: DEEP
Level / Effort: High
Boost / Speed: Standard
Consumption: Cost-aware; escalate only with evidence
Deploy: NO
Reason: The first X ReBurn checkpoint couples gameplay architecture, assets, movement, and verification.

EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

Inspect the Mega X ReBurn project, preserve all existing user work, and produce a bounded implementation checkpoint for the player movement and animation foundation. First inventory the relevant files and runtime, then define measurable acceptance tests, implement only this checkpoint, run targeted tests plus a rendered playtest when available, and stop after reporting PASS/PARTIAL/FAIL. Do not deploy. If blocked, preserve diagnostics and recommend exactly one TEMO escalation step.
```

## When the catalog changes

Mark this preset stale and repeat Provider Discovery. Do not silently map a renamed or unavailable model to the old ladder.
