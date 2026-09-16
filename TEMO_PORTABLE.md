# TEMO Efficiency — Portable Single-File Skill

Version: **1.3 portable contract**
Canonical repository: `luaysameer/temo-efficiency`

This file is self-contained. If an AI cannot browse the full repository, this file is enough to run the core TEMO Efficiency workflow.

## 1. Session refresh

If web/repository access exists, check `TEMO_LATEST.md` once at the start of a new session.

- If this portable copy is older than the manifest, load the current `TEMO_PORTABLE.md` or `SKILL.md` before routing the first task.
- Do not repeatedly refresh during the same session.
- If the update check fails, continue with this loaded copy and do not block the task.

TEMO refreshes from the canonical repository when possible. It does not silently rewrite the repository from an unrelated user's session.

## 2. Core objective

Use the smallest AI model + reasoning/effort level that can satisfy unchanged acceptance criteria.

Reduce avoidable usage by preventing unnecessary high-reasoning use, repeated context, duplicate diagnostics/tests, and repeated PASS work.

Never lower the requested quality bar to save usage.

## 3. Provider/model discovery

Before choosing an exact model, determine the real AI/tool environment unless it is already authoritatively known.

- If provider, full selectable models, and reasoning/effort levels are visible, use them directly.
- Do not ask the user for information already visible.
- If the provider/tool is unknown, ask once which AI/tool is being used.
- If the user does not know, request one screenshot showing the app/site header, sidebar, or settings.
- If exact models/levels are not visible, request screenshot(s) of the expanded model picker and reasoning/level/thinking picker, plus boost/speed/mode only if it exists.
- If screenshots are inconvenient, accept an exact pasted list of visible labels.
- Reuse the verified catalog for the session.

Provider name, plan/tier, or one active model does not prove the full catalog.

## 4. Mandatory Catalog Confidence Gate

A full catalog is VERIFIED only when it comes from at least one of:

1. host/runtime metadata explicitly exposing selectable models/controls;
2. user screenshot(s) of the real picker;
3. user-pasted exact visible labels;
4. authoritative current first-party information demonstrably applicable to the user's exact environment/account surface.

Never build a catalog from:

- model memory;
- provider-family assumptions;
- plan/tier assumptions;
- guessed version numbers;
- extrapolation from one active model;
- stale/general docs that do not establish the user's actual choices.

If only the active model is verified:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
CURRENT MODEL: <verified current model>
FULL SELECTABLE CATALOG: UNKNOWN
ACTION: Request screenshot/list before recommending a different model.
```

Do not invent a full FAST/BALANCED/DEEP/MAX ladder.

Hard failure:

`CATALOG_HALLUCINATION_FAIL`

Use that classification when an agent says it cannot see the live picker/catalog and then outputs exact alternative model names anyway.

## 5. Build the session-local ladder only after verification

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
BOOST / SPEED CONTROL: <verified values or Not exposed>
CONSUMPTION CONTROL: <verified values or Not exposed>
SOURCE: <host metadata | screenshot | pasted list | applicable first-party catalog>
CATALOG CONFIDENCE: VERIFIED
```

Do not ask again unless the provider, product surface, account tier, catalog, or environment changes, or the first capture was incomplete.

## 6. Score every execution checkpoint

Score five dimensions from 0–2:

- Complexity: local/simple 0, multi-file/logic 1, architecture/deep reasoning 2
- Risk: reversible/local 0, production-visible 1, security/data/infrastructure critical 2
- Scope: one narrow surface 0, several coupled surfaces 1, system-wide 2
- Verification burden: trivial/static 0, targeted runtime/tests 1, live/manual/multi-environment 2
- Uncertainty: known root cause 0, partial evidence 1, unclear/novel failure 2

Route by total:

- 0–2 → FAST / lowest reliable level
- 3–5 → BALANCED / medium/default level
- 6–8 → DEEP / medium or high as justified
- 9–10 → MAX / highest justified level, exceptional use only

## 7. Mandatory execution choice

Before every executable command, implementation prompt, debugging command, deployment command, file mutation, or device command, show:

```text
EXECUTION CHOICE
Tool / Environment: <exact environment>
Model: <exact verified mapped model, or verified current model>
Profile: <FAST | BALANCED | DEEP | MAX | CURRENT_MODEL_ONLY>
Level / Effort: <exact verified level or Not exposed / not verified>
Boost / Speed: <verified value or Not exposed>
Consumption: <lowest practical verified setting or Not exposed>
Deploy: <YES | NO>
Reason: <one concise reason>

Then copy and execute the command below.
```

Choose for the user when enough verified information exists. Do not make the user guess.

## 8. Local hardware rule

If a task requires local USB, Android ADB, filesystem access, GPU, desktop UI, local browser state, or attached hardware, choose an environment that can physically reach it.

Do not recommend a cloud environment that cannot access the required hardware.

## 9. Micro-checkpoints

Each checkpoint has one primary objective and should state:

- Tool/environment
- exact model + TEMO profile
- exact level/effort if exposed
- boost/consumption if exposed
- objective
- protected / do-not-repeat work
- targeted diagnostics/tests
- implementation boundary
- success condition
- stop condition
- Deploy YES/NO

For actual execution, use:

```text
EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

THIS IS AN IMPLEMENTATION COMMAND, NOT A REVIEW REQUEST. COMPLETE THE CHECKPOINT, RUN THE REQUIRED TESTS, DEPLOY IF ALLOWED AND PASSING, THEN RETURN THE REQUESTED FINAL REPORT. BEGIN NOW.
```

The user-facing `EXECUTION CHOICE` appears before this header.

## 10. Verification and PASS protection

Match evidence to the claim:

- static/code claim → syntax/static checks
- functional logic → targeted automated tests
- integration → real boundary/integration test when safe
- UI/runtime/device → actual rendered/runtime/device evidence
- production claim → production/live acceptance evidence

`IMPLEMENTED` is not `VERIFIED`.

After meaningful success, mark the proven contract `LOCKED_PASS` and do not repeat it unless relevant code, dependency, environment, provider catalog, requirement, acceptance contract, or later evidence changes.

After important bug fixes, add the smallest practical regression guard.

## 11. Escalation

Escalation is only:

`FAST → BALANCED → DEEP → MAX`

Escalate one step only when evidence justifies it.

When escalating, preserve diagnostics and PASS/VERIFIED state, show a new `EXECUTION CHOICE`, and do not restart from zero.

## 12. Context efficiency

Before sending large context to a stronger model:

1. remove verified history irrelevant to the checkpoint;
2. keep the blocker, relevant files/functions, protected tests, acceptance criteria, and provider ladder;
3. reuse concise handoffs instead of replaying whole conversations;
4. do not rediscover the provider catalog unless it changed.

## 13. Feedback loop — opt in only

TEMO does not silently upload telemetry, conversations, screenshots, prompts, code, logs, provider catalogs, or account details.

When a meaningful signal occurs, the agent may prepare a compact feedback candidate:

```text
TEMO FEEDBACK
Language: <Arabic | English | other>
Provider / Tool: <name or Unknown>
TEMO Version: <loaded version>
Catalog Source: <host metadata | screenshot | pasted list | unknown>
Task Type: <short>
Initial Profile: <FAST | BALANCED | DEEP | MAX | CURRENT_MODEL_ONLY>
Initial Level: <verified label if known>
Escalation: <none or route>
Result: <PASS | PARTIAL | FAIL>
Signal Type: <routing | discovery | portability | verification | regression | docs | other>
What happened: <2–5 lines>
Expected behavior: <short>
Evidence: <minimal, redacted>
Suggested improvement: <optional>
```

Do not ask for feedback after every trivial task.

The user decides whether to submit feedback.

If GitHub issue creation is available, submit only after explicit user approval. Otherwise return the report ready to paste into the repository's TEMO Feedback issue form.

Before submission, remove secrets, tokens, personal identifiers, private URLs, confidential code, and unnecessary full-conversation content.

## 14. Access/fallback behavior

Use this order:

1. Full repository if directly accessible.
2. Raw portable URL if repository navigation/search fails once:
   `https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`
3. Uploaded/pasted `TEMO_PORTABLE.md` if external web access is unavailable.

Do not loop on GitHub search/indexing.

## 15. Final report

```text
RESULT: PASS / PARTIAL / FAIL
ROOT CAUSE: <if applicable>
MODEL / PROFILE / LEVEL USED:
CATALOG STATUS: VERIFIED_FULL / VERIFIED_CURRENT_ONLY / UNKNOWN
CHANGES:
TESTS:
VERIFICATION STATUS:
LOCKED_PASS:
BLOCKERS:
NEXT:
FEEDBACK SIGNAL: NONE / OPTIONAL_CANDIDATE
```

Stop at the checkpoint boundary.

## 16. What TEMO does not do

TEMO Efficiency does not bypass quotas, billing, subscriptions, rate limits, plan restrictions, or safety controls.

It does not guarantee a fixed saving percentage.

It does not silently self-modify the canonical repository from arbitrary user sessions.

Its purpose is to reduce avoidable AI work while preserving the required quality bar.
