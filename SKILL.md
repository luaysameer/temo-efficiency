---
name: temo-efficiency
description: Credit-aware model routing and micro-checkpoint execution for GPT/Codex-style agent workflows. Chooses the smallest capable model/effort, shows the recommended execution setup before every command, protects verified work, minimizes repeated context and tests, and escalates only when evidence justifies it.
version: 1.1.0
license: MIT
---

# TEMO Efficiency

Use this skill when a task can benefit from deliberate model selection, staged implementation, targeted verification, or protection against repeated work.

## Core objective

Spend reasoning capacity where it materially improves the result. Do not choose a stronger model or higher effort by habit. Do not save credits by weakening acceptance criteria. Save credits by reducing unnecessary reasoning, repeated context, duplicated tests, setup ambiguity, and rework.

## Non-negotiable rules

1. Preserve acceptance criteria. Efficiency must never mean lowering the user's required quality bar.
2. Choose the smallest capable model profile for the current checkpoint.
3. Before every execution command, show the user the recommended execution setup first: tool/environment, model, profile, level/effort, boost/speed, consumption setting, deploy state, and one concise reason for the choice.
4. Do not make the user guess the model or level when the available environment/model catalog is known. Choose for them. If exact model names are not known, state the capability profile and tell them to select the mapped model from their local ladder instead of inventing a model name.
5. Split large work into micro-checkpoints with one primary objective each.
6. Never redo previously verified work unless the relevant code, dependency, environment, or requirement changed.
7. Prefer targeted tests over full regression when the change surface is narrow. Run broader regression when shared contracts, routing, schemas, security boundaries, or deployment foundations changed.
8. Escalate model/effort only after concrete evidence: failing tests, ambiguous root cause, broad architectural coupling, safety/security risk, or repeated inability of the current profile to satisfy the checkpoint.
9. Separate IMPLEMENTED from VERIFIED. Do not call a result verified without the required acceptance evidence.
10. Deployment is a gate, not a default. Deploy only when the checkpoint explicitly permits it and required tests pass.
11. After fixing a regression, add a regression guard when practical so the same failure is not paid for twice.
12. Stop at the checkpoint boundary. Do not opportunistically start the next feature.

## Mandatory pre-execution selection

For any task where the user wants execution, implementation, debugging, deployment, file mutation, device work, or a copy/paste command for another agent, present this block BEFORE the executable instruction:

```text
EXECUTION CHOICE
Tool / Environment: <exact tool or environment>
Model: <exact available model name when known; otherwise mapped profile model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <Low | Medium | High>
Boost / Speed: <OFF by default unless justified>
Consumption: <lowest practical setting that can still satisfy acceptance>
Deploy: <YES | NO>
Reason: <one concise sentence explaining why this selection is sufficient>

Then copy and execute the command below.
```

This block is user-facing and must come before the implementation command.

Rules:

- Prefer a concrete model name when the actual model catalog is known.
- Never invent a model name.
- If the environment exposes separate model and reasoning/effort controls, specify both.
- If the environment has no boost or consumption control, write `Not exposed` rather than inventing one.
- If local hardware/device access is required, explicitly choose a local environment instead of a cloud environment that cannot reach the device.
- Keep the explanation short. The purpose is to eliminate setup ambiguity before execution.
- Do not ask the user to choose among multiple models when one is clearly appropriate from the routing score.
- If later evidence requires escalation, present a new execution choice before the next execution command, preserving prior PASS/VERIFIED state.

## Model routing

First classify the checkpoint on five dimensions, each 0-2:

- Complexity: local/simple (0), multi-file/logic (1), architecture/deep reasoning (2)
- Risk: reversible/local (0), production-visible (1), security/data/infrastructure critical (2)
- Scope: one narrow surface (0), several coupled surfaces (1), system-wide (2)
- Verification burden: trivial/static (0), targeted runtime/tests (1), live/manual/multi-environment (2)
- Uncertainty: known root cause (0), partial evidence (1), unclear/novel failure (2)

Score mapping:

- 0-2: FAST profile, Low effort
- 3-5: BALANCED profile, Medium effort
- 6-8: DEEP profile, Medium or High effort
- 9-10: MAX profile, High effort, only when justified

The environment may expose different model names. Map profiles by capability, not branding:

- FAST: cheapest/fastest model that can reliably perform the checkpoint
- BALANCED: default coding/analysis model for focused implementation and debugging
- DEEP: stronger reasoning model for architecture, cross-system debugging, or high-coupling changes
- MAX: strongest available model reserved for exceptional complexity/risk

If the user specifies a model, respect it unless it cannot satisfy the task or creates a clear safety/quality problem. If a requested model is unavailable, recommend the nearest profile rather than inventing a model name.

## Effort routing

- Low: formatting, extraction, simple edits, deterministic checks, narrow lookups
- Medium: focused implementation, normal debugging, integration work with a known target
- High: unclear root cause, architecture, difficult regressions, multi-system integration, security-sensitive changes

Do not use High merely because the project is important. Use it because the current checkpoint is difficult.

## Micro-checkpoint contract

Every execution checkpoint should state:

- Tool/environment
- Model profile or exact model if known
- Effort
- Cost/consumption indicator if the environment exposes one
- Speed/boost setting if applicable
- Objective
- Do-not-repeat / protected work
- Success condition
- Stop condition
- Deploy: YES/NO
- Final report shape

Keep one checkpoint focused on one failure class or feature boundary whenever possible.

## Mandatory execution header

When handing a checkpoint to an implementation agent, prepend both lines below so the checkpoint is treated as work, not as a document to summarize:

```text
EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

THIS IS AN IMPLEMENTATION COMMAND, NOT A REVIEW REQUEST. COMPLETE THE CHECKPOINT, RUN THE REQUIRED TESTS, DEPLOY IF ALLOWED AND PASSING, THEN RETURN THE REQUESTED FINAL REPORT. BEGIN NOW.
```

Use this header only when the user actually wants execution.

The user-facing `EXECUTION CHOICE` block must appear before this implementation header.

## Escalation ladder

Do not jump directly to the strongest model. Escalate one step at a time:

FAST -> BALANCED -> DEEP -> MAX

Escalate when at least one is true:

- the root cause remains ambiguous after targeted diagnostics
- the checkpoint spans multiple coupled subsystems
- a regression survived the existing contract tests
- the task requires architecture or migration decisions
- security, permissions, data-loss, or production blast radius is high
- the current profile failed to meet the same unchanged acceptance criteria

When escalating, keep all useful diagnostics and completed work. Do not restart from zero.

Before issuing the next executable command after escalation, show the updated `EXECUTION CHOICE` block with the new model/profile/level and the evidence-based reason for changing it.

## Regression protection

After a bug is fixed:

1. Identify the exact broken contract.
2. Add the smallest deterministic regression test or guard that reproduces it.
3. Mark that test as protected for future checkpoints touching the same surface.
4. Future work must preserve that PASS result unless requirements intentionally change.

This prevents the cycle: fix -> later change -> same bug returns -> pay again.

## Verification strategy

Use evidence appropriate to the claim:

- Static/code claim -> syntax/static checks
- Functional logic -> targeted automated tests
- Integration claim -> integration test against real boundary when safe
- UI/runtime claim -> real rendered/browser/device evidence when available
- Production claim -> production/live acceptance evidence

Never infer actual runtime success merely from a source lookup or unit test when the user asked for real behavior.

## Context efficiency

Before sending large context to a strong model:

1. Remove already verified history that does not affect the current checkpoint.
2. Keep exact current state, blocker, relevant files/functions, protected tests, and acceptance criteria.
3. Reuse concise handoff files instead of replaying entire conversations.
4. Preserve exact identifiers only when needed for reproducibility.

## Output format

For an execution task, first return the user-facing setup:

```text
EXECUTION CHOICE
Tool / Environment:
Model:
Profile:
Level / Effort:
Boost / Speed:
Consumption:
Deploy:
Reason:

Then copy and execute the command below.
```

Then provide one copy/paste prompt containing the mandatory execution header and the checkpoint specification.

For a planned checkpoint that is not yet being executed, return a compact execution block with:

```text
Tool:
Model/Profile:
Effort:
Consumption:
Boost:
Deploy:

Objective:
Protected / Do not repeat:
Success condition:
Stop condition:
```

## Credit-safety claim

This skill does not bypass quotas, billing, rate limits, or subscription rules, and it cannot guarantee a fixed percentage of savings. Its purpose is to reduce avoidable usage by routing work to an appropriate capability level, preventing duplicate work, keeping setup explicit, and keeping verification proportional to the change surface.
