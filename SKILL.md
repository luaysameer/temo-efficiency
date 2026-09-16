---
name: temo-efficiency
description: Provider-aware model routing and micro-checkpoint execution for AI agent workflows. Discovers the real provider/model/level catalog, chooses the smallest capable model and effort, shows the execution choice before every command, protects verified work, and escalates only when evidence requires it.
version: 1.4.0
license: MIT
---

# TEMO Efficiency

TEMO Efficiency is an execution-routing skill for AI workflows. Its purpose is not merely to use a cheaper model. It makes the model + level choice explicit before execution, keeps acceptance criteria unchanged, prevents repeated verified work, and escalates only when the current checkpoint actually needs more capability.

## Mandatory bootstrap

Loading this `SKILL.md` is enough to activate the TEMO Efficiency workflow.

If the canonical repository `luaysameer/temo-efficiency` is reachable, read the current canonical files before executing work:

1. `TEMO_BOOTSTRAP.md`
2. current `SKILL.md`
3. `docs/BEHAVIOR_CONTRACT.md`
4. `config/model-ladder.example.yaml`
5. `templates/PROVIDER_DISCOVERY.md`
6. `templates/CATALOG_CONFIDENCE_GATE.md`
7. `templates/EXECUTION_CHOICE.md`
8. `templates/CHECKPOINT.md`
9. `templates/EXECUTION_HEADER.md` only when execution is requested

`docs/CROSS_DEVICE_TEST.md` defines the expected portable behavior and may be used to verify that the skill is being followed correctly in a fresh conversation or another device.

Do not repeatedly reload unchanged files in the same session. Preserve the provider/model mapping and all prior PASS/VERIFIED state.

If repository access is unavailable, continue from the loaded copy. Never invent missing provider identity, model names, levels, boost modes, or controls.

## Required user experience

The expected flow is:

```text
load TEMO Efficiency
→ identify/confirm the AI provider/tool
→ verify the real model + level catalog for this account/environment
→ if catalog is not visible, request screenshot(s) or an exact pasted list
→ build/reuse FAST/BALANCED/DEEP/MAX only from verified choices
→ score the current checkpoint
→ choose the exact model + level
→ show EXECUTION CHOICE before execution
→ execute one bounded micro-checkpoint
→ verify against unchanged acceptance criteria
→ LOCKED_PASS successful work
→ escalate one step only when evidence requires it
```

If an agent jumps directly into execution without doing provider/model/level discovery when discovery is needed, makes the user guess the model when the catalog is known, invents provider/model names, or repeats already verified work, TEMO Efficiency is not being followed correctly.

## Provider discovery comes first

Before choosing FAST / BALANCED / DEEP / MAX, determine the actual AI/tool environment unless it is already authoritatively known.

- If the active environment already exposes its provider, exact selectable model choices, reasoning/effort levels, speed/boost controls, and relevant consumption controls, use those directly.
- Do not ask the user to repeat information the environment already exposes.
- If the provider/tool is unknown, ask once which AI/tool they are using: ChatGPT/OpenAI, Codex, Claude/Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or another AI tool.
- If the user does not know the tool name, request one screenshot showing the app/site header, sidebar, or settings page.
- If exact model names or levels are not visible, request screenshot(s) of the expanded model picker and reasoning/level picker, plus boost/speed/mode only if it exists and matters.
- If screenshots are inconvenient, accept a pasted list of the exact visible labels.
- Build a session-local ladder only from the verified real catalog and reuse it.
- Do not ask again unless the provider, product surface, account tier, model catalog, or environment changes, or the supplied capture was incomplete.
- Never fabricate a provider identity, model name, reasoning level, boost mode, consumption control, or provider capability.

### Screenshot fallback is mandatory when the catalog is uncertain

If TEMO cannot verify the exact current choices, it must not build a full ladder from memory or assumptions.

Use the smallest screenshot request needed:

```text
I can’t verify the exact model + level choices available on your current AI/account yet.
Send screenshots of:
1) the expanded model picker,
2) the expanded reasoning/level/thinking picker if separate,
3) any boost/speed/mode selector if present.
If the AI/tool itself is unclear, include one screenshot showing the app/site header or settings page.

If screenshots are inconvenient, paste the exact visible labels instead.
I’ll map them once and reuse the ladder for this session.
```

If one screenshot shows everything, one screenshot is enough.

Provider brand, account plan/tier, or one active model does not prove the full selectable catalog.

### ChatGPT / OpenAI / Codex

Use the current model and reasoning/effort controls exposed by the active environment when available.

Do not hardcode a permanent OpenAI model list because product catalogs and controls can change.

Do not assume different ChatGPT/OpenAI account tiers expose a particular model set. If exact current choices are not visible to the agent, request screenshots or an exact pasted list and map only those verified choices.

### Other providers/tools

For Claude / Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or another environment:

- use an authoritative visible/programmatic catalog when available;
- otherwise request screenshots or an exact pasted list;
- infer FAST/BALANCED/DEEP/MAX only from actual visible/supplied capabilities and provider labels;
- if capability ordering is ambiguous, ask only the smallest missing clarification rather than guessing.

Detailed discovery behavior is in `templates/PROVIDER_DISCOVERY.md` and the hard verification rule is in `templates/CATALOG_CONFIDENCE_GATE.md`.

## Catalog confidence states

Use one of these states:

### VERIFIED_FULL

Provider/tool, full selectable model catalog, and level/reasoning controls are verified. A full exact ladder may be built.

### VERIFIED_CURRENT_ONLY

Current model is verified, but alternatives are not.

Use:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
CURRENT MODEL: <verified current model>
FULL SELECTABLE CATALOG: UNKNOWN
ACTION: Request screenshot/list before recommending a different model.
```

Do not invent alternatives.

### UNVERIFIED

Provider/tool or selectable controls are not sufficiently verified.

Do not output an exact model recommendation or full ladder. Ask for the required screenshot(s) or pasted labels first.

## Session-local model ladder

Only after `VERIFIED_FULL`, retain a mapping like:

```text
PROVIDER / TOOL: <actual environment>
FAST MODEL: <smallest capable available model>
FAST LEVEL: <lowest reliable available level>
BALANCED MODEL: <normal/default coding-analysis model>
BALANCED LEVEL: <medium/default reasoning>
DEEP MODEL: <strong reasoning/coding model>
DEEP LEVEL: <medium/high as supported>
MAX MODEL: <strongest available model, exceptional use only>
MAX LEVEL: <highest justified supported level>
BOOST / SPEED CONTROL: <actual values or Not exposed>
CONSUMPTION CONTROL: <actual values or Not exposed>
SOURCE: <host metadata | screenshot(s) | pasted list | applicable first-party catalog>
CATALOG CONFIDENCE: VERIFIED
```

Do not rediscover the same catalog in the same session unless it actually changes.

## Mandatory pre-execution selection

Before every executable command, implementation prompt, debugging command, deployment command, file mutation instruction, device command, or copy/paste command for another agent, show this user-facing block first:

```text
EXECUTION CHOICE
Tool / Environment: <exact tool or environment>
Model: <exact verified mapped model, or verified current model in CURRENT_MODEL_ONLY mode>
Profile: <FAST | BALANCED | DEEP | MAX, or CURRENT_MODEL_ONLY if full ladder is unavailable>
Level / Effort: <exact verified available level or Not exposed / not verified>
Boost / Speed: <exact verified value, OFF when available and not justified, or Not exposed>
Consumption: <lowest practical verified exposed setting or Not exposed>
Deploy: <YES | NO>
Reason: <one concise sentence explaining why this choice is sufficient>

Then copy and execute the command below.
```

Rules:

- Choose for the user when the real catalog is verified.
- Never make the user guess which model or level to use when TEMO has enough verified information to choose.
- If a control does not exist, write `Not exposed` only when that absence is verified.
- If local USB, filesystem, GPU, desktop UI, or attached hardware is required, choose a local environment rather than cloud execution that cannot reach it.
- If later evidence requires escalation, show a new `EXECUTION CHOICE` before the next command and preserve prior PASS/VERIFIED work.

## Model routing

Score the CURRENT checkpoint on five dimensions, each 0–2:

- Complexity: local/simple (0), multi-file/logic (1), architecture/deep reasoning (2)
- Risk: reversible/local (0), production-visible (1), security/data/infrastructure critical (2)
- Scope: one narrow surface (0), several coupled surfaces (1), system-wide (2)
- Verification burden: trivial/static (0), targeted runtime/tests (1), live/manual/multi-environment (2)
- Uncertainty: known root cause (0), partial evidence (1), unclear/novel failure (2)

Route by score:

- 0–2 → FAST / lowest reliable level
- 3–5 → BALANCED / medium/default level
- 6–8 → DEEP / medium or high as justified
- 9–10 → MAX / highest justified level, exceptional use only

Map these profiles to the actual verified provider catalog, not to a hardcoded brand or tier list.

## Escalation ladder

Escalation is strictly:

```text
FAST → BALANCED → DEEP → MAX
```

Do not jump directly to the strongest model merely because it exists.

Escalate when evidence shows the current checkpoint needs more capability, such as:

- root cause remains ambiguous after targeted diagnostics;
- several coupled subsystems must be reasoned about together;
- the unchanged acceptance test still fails;
- security/data/infrastructure risk increased;
- the current mapped model/profile could not complete the same bounded checkpoint.

When escalating:

- keep useful diagnostics;
- preserve previous PASS/VERIFIED state;
- show a new `EXECUTION CHOICE`;
- do not restart the investigation from zero.

## Micro-checkpoint contract

Each execution checkpoint should contain:

- Tool/environment
- Exact verified mapped model and TEMO profile
- Exact level/effort if exposed
- Consumption/boost controls if exposed
- One primary objective
- Protected / do-not-repeat work
- Only the diagnostics/tests needed for this failure class
- Measurable success condition
- Exact stop condition
- Deploy YES/NO
- Final report shape

Keep checkpoints narrow. Do not broaden the task merely because more context is available.

## Mandatory execution header

When the user actually wants execution, the implementation prompt should contain:

```text
EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

THIS IS AN IMPLEMENTATION COMMAND, NOT A REVIEW REQUEST. COMPLETE THE CHECKPOINT, RUN THE REQUIRED TESTS, DEPLOY IF ALLOWED AND PASSING, THEN RETURN THE REQUESTED FINAL REPORT. BEGIN NOW.
```

The user-facing `EXECUTION CHOICE` must appear before this implementation header.

## PASS / VERIFIED protection

After a meaningful success, protect the exact proven contract as:

```text
LOCKED_PASS
```

Do not repeat it unless the relevant code, dependency, environment, provider catalog, requirement, or acceptance contract changed, or later evidence contradicts it.

After an important bug fix, add the smallest practical regression guard so the same failure is not paid for twice.

## Verification rule

Efficiency never means lowering acceptance criteria.

Use evidence appropriate to the claim:

- static/code claim → syntax/static checks
- functional logic → targeted tests
- integration claim → integration test against the real boundary when safe
- UI/runtime claim → real rendered/browser/device evidence when available
- production claim → production/live acceptance evidence

`IMPLEMENTED` is not `VERIFIED`. Do not claim verification without the required acceptance evidence.

## Context efficiency

Before sending large context to a stronger model:

1. remove already verified history that does not affect the current checkpoint;
2. keep the exact blocker, relevant files/functions, protected tests, acceptance criteria, and session-local provider ladder;
3. reuse concise handoff files instead of replaying whole conversations;
4. do not rediscover the provider/model catalog unless it changed.

## Portable activation in another conversation/device

A user can activate TEMO Efficiency in a fresh supported AI conversation with repository access by saying:

```text
Use TEMO Efficiency from https://github.com/luaysameer/temo-efficiency
Load the current SKILL.md and TEMO_BOOTSTRAP.md, follow them as the execution behavior contract for this chat, and do not execute my task until you have completed the provider/model/level discovery required by the skill.
```

If repository navigation fails, use the single-file portable fallback:

`https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`

If the AI environment cannot access the web, upload or paste `TEMO_PORTABLE.md` once.

Use `docs/CROSS_DEVICE_TEST.md` to verify the expected behavior on another phone, computer, browser, or provider.

## Credit-safety claim

TEMO Efficiency does not bypass quotas, billing, rate limits, subscription rules, or safety controls, and it cannot guarantee a fixed percentage of savings. Its purpose is to reduce avoidable work by routing to the smallest capable verified model/level, minimizing repeated context and tests, and protecting verified results without weakening acceptance quality.