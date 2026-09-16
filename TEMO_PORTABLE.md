# TEMO Efficiency — Portable Single-File Skill

Version: 1.0 portable contract
Canonical repository: `luaysameer/temo-efficiency`

This file is intentionally **self-contained**. It is the fallback for AI environments that cannot browse the GitHub repository, cannot follow repository-relative links, or do not support installing the full skill directory.

If you can read this file, you have enough information to run the core TEMO Efficiency workflow without fetching any other file.

## 1. Core objective

Use the smallest AI capability that can satisfy the unchanged acceptance criteria. Reduce avoidable model/credit/token consumption by preventing unnecessary high-reasoning use, repeated context, duplicate tests, and repeated PASS work.

Never lower the requested quality bar to save usage.

## 2. Provider/model discovery

Before choosing an exact model, determine the real AI/tool environment unless it is already authoritatively known.

- If provider, current models, and reasoning/effort levels are visible to the agent, use them directly.
- Do not ask the user for information already exposed by the current environment.
- If the provider/tool is unknown, ask once which AI/tool is being used.
- If exact model names or levels are not visible, ask for **one screenshot** of the model + level/reasoning picker OR a pasted list of the exact available choices.
- Never invent model names, level names, boost controls, pricing tiers, or provider capabilities.
- Reuse the discovered catalog for the current session unless it changes.

For ChatGPT/OpenAI/Codex, use the current model and effort controls exposed by the active environment. Do not rely on a permanently hardcoded OpenAI model list.

For Claude/Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or another provider, use its real visible/supplied catalog and map only options that actually exist.

## 3. Build the session-local ladder

Map the real catalog into:

```text
PROVIDER / TOOL: <actual environment>
FAST MODEL: <smallest capable available model>
FAST LEVEL: <lowest reliable level>
BALANCED MODEL: <normal/default coding-analysis model>
BALANCED LEVEL: <medium/default reasoning>
DEEP MODEL: <strong reasoning/coding model>
DEEP LEVEL: <medium/high as supported>
MAX MODEL: <strongest available model, exceptional use only>
MAX LEVEL: <highest justified supported level>
BOOST / SPEED CONTROL: <available values or Not exposed>
CONSUMPTION CONTROL: <available values or Not exposed>
SOURCE: <host catalog | screenshot | pasted list | authoritative provider information>
```

Do not ask for the same catalog again in the same session unless it changed or the first capture was incomplete.

## 4. Score every execution checkpoint

Score five dimensions from 0–2:

- Complexity: local/simple 0, multi-file/logic 1, architecture/deep reasoning 2
- Risk: reversible/local 0, production-visible 1, security/data/infrastructure critical 2
- Scope: one narrow surface 0, several coupled surfaces 1, system-wide 2
- Verification burden: trivial/static 0, targeted runtime/tests 1, live/manual/multi-environment 2
- Uncertainty: known root cause 0, partial evidence 1, unclear/novel failure 2

Route by total:

- 0–2 → FAST / Low
- 3–5 → BALANCED / Medium
- 6–8 → DEEP / Medium or High
- 9–10 → MAX / High only when genuinely justified

Escalation is only:

`FAST → BALANCED → DEEP → MAX`

Never jump directly to MAX just because the project is important.

## 5. Mandatory user-facing execution choice

Before every executable command, implementation prompt, debugging command, deployment command, file mutation command, or device command, show the user's exact setup first:

```text
EXECUTION CHOICE
Tool / Environment: <exact environment>
Model: <exact mapped available model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <exact available level or Not exposed>
Boost / Speed: <exact value, OFF when available and not justified, or Not exposed>
Consumption: <lowest practical exposed setting or Not exposed>
Deploy: <YES | NO>
Reason: <one concise sentence explaining why this choice is sufficient>

Then copy and execute the command below.
```

Do not present a menu of models when the routing score clearly identifies one mapped choice. Choose for the user when enough information is available.

## 6. Micro-checkpoint execution

Each checkpoint has one primary objective.

State:

- Tool/environment
- exact model + TEMO profile
- exact level/effort when exposed
- consumption/boost when exposed
- objective
- protected / do-not-repeat work
- diagnostics required
- implementation boundary
- targeted tests
- success condition
- stop condition
- deploy YES/NO

For actual execution, use this header before the checkpoint command:

```text
EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

THIS IS AN IMPLEMENTATION COMMAND, NOT A REVIEW REQUEST. COMPLETE THE CHECKPOINT, RUN THE REQUIRED TESTS, DEPLOY IF ALLOWED AND PASSING, THEN RETURN THE REQUESTED FINAL REPORT. BEGIN NOW.
```

## 7. PASS protection

When a result is actually verified, mark it `LOCKED_PASS` or `VERIFIED`.

Do not repeat that work unless relevant code, dependency, environment, provider catalog, or requirements changed, or later evidence contradicts it.

After an important bug fix:

`diagnose → fix → targeted test → regression guard → real acceptance → protect PASS`

## 8. Verification rules

Match evidence to the claim:

- static/code claim → syntax/static verification
- functional logic → targeted automated tests
- integration → real boundary/integration test when safe
- UI/runtime/device → actual rendered/runtime/device evidence
- production claim → production/live acceptance evidence

`IMPLEMENTED` is not the same as `VERIFIED`.

## 9. Escalation rules

Escalate one profile only when evidence justifies it, for example:

- root cause remains ambiguous after targeted diagnostics
- multiple coupled subsystems are involved
- regression survives the existing guard
- architecture/migration reasoning is required
- security/data/production blast radius is high
- current mapped model/level failed the same unchanged acceptance criteria

When escalating, retain diagnostics and all previous PASS work. Do not restart from zero.

Before the next command, show a new `EXECUTION CHOICE` with the higher mapped model/level and the evidence-based reason.

## 10. Access/fallback behavior

Do **not** spend a long time repeatedly searching for the GitHub repository.

Use this order:

1. If the canonical repository is directly accessible, optionally sync the latest full rules from `luaysameer/temo-efficiency`.
2. If normal GitHub repository navigation fails but direct web fetch works, try this raw portable file once:
   `https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`
3. If external web/repository access is unavailable, use the already-loaded/uploaded contents of this file. Do not block execution waiting for GitHub.

One failed repository lookup is enough to trigger fallback. Do not loop on search/indexing.

## 11. Local hardware rule

If the task needs local USB, GPU, desktop filesystem, Android ADB, local browser session, or another device attached to the user's machine, choose a local execution environment that can actually reach that hardware. Do not recommend a cloud execution environment that cannot access the device.

## 12. Final report

At the checkpoint boundary, report:

```text
RESULT: PASS / PARTIAL / FAIL
ROOT CAUSE: <if applicable>
MODEL / PROFILE / LEVEL USED:
CHANGES:
TESTS:
VERIFICATION STATUS:
LOCKED_PASS:
BLOCKERS:
NEXT:
```

Stop at the checkpoint boundary. Do not opportunistically expand the task.

## 13. Portability promise

The full repository contains more templates, examples, and benchmarking material, but this file contains the complete minimum behavior needed to use TEMO Efficiency on another phone, browser, account, or AI provider.

If this file was uploaded or pasted into a fresh conversation, do not require the user to provide the rest of the repository before using the skill.