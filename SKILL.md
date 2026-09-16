---
name: temo-efficiency
description: Provider-aware model and reasoning-level routing for AI workflows. Discovers the real provider/catalog, chooses the smallest capable model/level, shows the execution choice before every command, protects verified work, refreshes canonical rules, and learns from opt-in evidence-based feedback.
version: 1.5.0
license: MIT
---

# TEMO Efficiency

TEMO Efficiency is an execution-routing skill for AI workflows.

Its goal is to use the **smallest capable model + reasoning level** that can satisfy unchanged acceptance criteria, while reducing repeated context, unnecessary high-reasoning use, duplicate diagnostics/tests, and rework.

It is provider-aware and portable across ChatGPT/OpenAI, Codex, Claude/Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, and other AI environments.

## 1. Mandatory startup

Loading this `SKILL.md` activates TEMO Efficiency.

If the canonical repository `luaysameer/temo-efficiency` is reachable:

1. Read `TEMO_LATEST.md` once.
2. If this loaded copy is older than the current manifest, load the current canonical `SKILL.md` before routing the first task.
3. Read `TEMO_BOOTSTRAP.md` for access/fallback behavior.
4. Use the current canonical templates/docs only as needed.

Do not repeatedly refresh unchanged TEMO files during the same session.

If the repository cannot be reached, continue with the loaded copy. Do not block the user's task only because an update check failed.

### Update model

TEMO can **refresh itself from the canonical repository** when access exists.

TEMO must **not silently rewrite the canonical GitHub repository** from an unrelated user's session. Improvements reach the project through reviewed maintainer changes, Issues, or Pull Requests.

## 2. Provider discovery comes before exact routing

Before choosing an exact model/level, determine the real AI/tool environment unless it is already authoritatively known.

If the environment exposes the provider, full selectable model catalog, reasoning/effort controls, and relevant speed/boost controls, use them directly.

Do not ask the user to repeat information already visible to the agent.

If the provider/tool is unknown, ask once which AI/tool is being used.

If the user does not know the tool name, request one screenshot showing the app/site header, sidebar, or settings page.

If the exact selectable models or levels are not visible, request the smallest screenshot set needed:

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

## 3. Catalog Confidence Gate — mandatory

Provider name, plan/tier, or one active model does **not** prove the full selectable catalog.

A full exact catalog may be treated as VERIFIED only when it comes from at least one of:

- host/runtime metadata explicitly exposing selectable models/controls;
- user screenshot(s) of the real picker;
- user-pasted exact visible labels;
- authoritative current first-party information demonstrably applicable to the user's exact environment/account surface.

Do not construct a catalog from:

- model memory;
- provider-family assumptions;
- plan/tier assumptions;
- guessed version numbers;
- extrapolation from one active model;
- stale/general documentation that does not establish the user's actual choices.

If only the active model is verified:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
CURRENT MODEL: <verified model>
FULL SELECTABLE CATALOG: UNKNOWN
ACTION: Request screenshot/list before recommending a different model.
```

Do not invent a full FAST/BALANCED/DEEP/MAX ladder.

Hard failure:

`CATALOG_HALLUCINATION_FAIL`

Use that classification when an agent admits it cannot see the live picker/catalog and then outputs exact alternative model names anyway.

## 4. Build the session-local ladder only after verification

After the catalog passes the confidence gate, retain:

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

Reuse this mapping for the session.

Do not ask again unless the provider, account/product surface, tier, model catalog, or environment changes, or the first capture was incomplete.

## 5. Score the current checkpoint

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

The score applies to the **current checkpoint**, not the importance of the entire project.

## 6. Mandatory execution choice

Before every executable command, implementation prompt, debugging command, deployment command, device command, file mutation, or copy/paste command for another agent, show:

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

## 7. Local vs cloud execution

If the task requires local USB, Android ADB, filesystem access, GPU, desktop UI, a local browser session, or attached hardware, choose an execution environment that can physically reach it.

Do not choose a cloud environment that cannot access the required hardware.

## 8. Micro-checkpoints

Split large work into narrow checkpoints with one primary objective.

Each execution checkpoint should state:

- Tool/environment
- exact model + TEMO profile
- exact level/effort if exposed
- boost/consumption if exposed
- objective
- protected / do-not-repeat work
- targeted diagnostics/tests
- implementation boundary
- measurable success condition
- stop condition
- Deploy YES/NO
- final report shape

Do not opportunistically expand the task.

## 9. Mandatory execution header

When the user actually wants execution, use:

```text
EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

THIS IS AN IMPLEMENTATION COMMAND, NOT A REVIEW REQUEST. COMPLETE THE CHECKPOINT, RUN THE REQUIRED TESTS, DEPLOY IF ALLOWED AND PASSING, THEN RETURN THE REQUESTED FINAL REPORT. BEGIN NOW.
```

The user-facing `EXECUTION CHOICE` must appear before this header.

## 10. Verification and PASS protection

Efficiency never means lowering acceptance criteria.

Match evidence to the claim:

- static/code claim → syntax/static check
- functional logic → targeted automated tests
- integration claim → real boundary/integration test when safe
- UI/runtime/device claim → actual rendered/runtime/device evidence
- production claim → production/live acceptance evidence

`IMPLEMENTED` is not `VERIFIED`.

After meaningful success, protect the exact proven contract as:

`LOCKED_PASS`

Do not repeat it unless relevant code, dependency, environment, provider catalog, requirement, acceptance contract, or later evidence changes.

After an important bug fix, add the smallest practical regression guard.

## 11. Escalation

Escalation is strictly:

`FAST → BALANCED → DEEP → MAX`

Escalate one step only when evidence justifies it, such as:

- root cause remains ambiguous after targeted diagnostics;
- multiple coupled systems must be reasoned about together;
- the unchanged acceptance test still fails;
- security/data/infrastructure risk increased;
- the current mapped model/level could not complete the same bounded checkpoint.

When escalating:

- preserve useful diagnostics;
- preserve PASS/VERIFIED state;
- show a new `EXECUTION CHOICE`;
- do not restart from zero.

## 12. Context efficiency

Before sending large context to a stronger model:

1. remove verified history irrelevant to the current checkpoint;
2. keep the exact blocker, relevant files/functions, protected tests, acceptance criteria, and provider ladder;
3. reuse concise handoffs instead of replaying entire conversations;
4. do not rediscover the provider catalog unless it changed.

## 13. Feedback loop — opt in only

TEMO Efficiency does **not** silently upload telemetry, conversations, screenshots, prompts, code, logs, provider catalogs, or account details.

When a meaningful signal occurs, the agent may prepare a compact `TEMO FEEDBACK` candidate.

Useful signals include:

- routing too strong or too weak;
- unnecessary escalation;
- provider/catalog discovery failure;
- `CATALOG_HALLUCINATION_FAIL`;
- bootstrap/portable fallback failure;
- a new provider/control TEMO does not map well;
- regression protection that prevented repeated work;
- documentation/usability problems;
- meaningful cross-device PASS/FAIL results.

Use `docs/FEEDBACK_LOOP.md` when repository access exists.

Do not ask for feedback after every trivial task.

The user decides whether to submit the report.

If GitHub issue creation is available, submit only after explicit user approval. Otherwise return the report ready to paste into the repository's TEMO Feedback issue form.

Before submission, remove secrets, tokens, personal identifiers, private URLs, confidential code, and unnecessary full-conversation content.

## 14. Portable fallback

If repository navigation/search fails once, do not loop.

Try:

`https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`

If external web access is unavailable, one uploaded/pasted `TEMO_PORTABLE.md` is enough for the core workflow.

## 15. Final report

At the checkpoint boundary, report compactly:

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

TEMO Efficiency does not bypass quotas, billing, subscriptions, plan restrictions, rate limits, or safety controls.

It does not guarantee a fixed saving percentage.

It does not silently self-modify the canonical repository from arbitrary user sessions.

Its purpose is to reduce avoidable AI work while preserving the required quality bar.
