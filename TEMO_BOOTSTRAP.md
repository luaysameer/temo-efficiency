# TEMO Efficiency — Universal Bootstrap

Loading `README.md`, `SKILL.md`, or `TEMO_PORTABLE.md` is enough to start TEMO Efficiency.

Canonical repository: `luaysameer/temo-efficiency`

Portable raw entrypoint:

`https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`

## 1. Refresh once at session start

If the canonical repository is reachable, read `TEMO_LATEST.md` once before routing the first task.

- Compare the loaded TEMO version with the current manifest.
- If the loaded copy is older, load the current canonical `SKILL.md` or `TEMO_PORTABLE.md` before execution.
- Do not repeatedly refresh during the same session unless the user explicitly asks.
- Preserve the current provider catalog and all PASS/VERIFIED work while refreshing rules.
- If the update check fails, continue with the loaded copy and do not block the task.

This is TEMO's update model: **refresh the rules from the canonical repository**, not silently rewrite the repository from a user's session.

## 2. Access modes — use the first one that works

### Mode A — repository-aware AI

Read the current canonical files needed for the task:

1. `TEMO_LATEST.md`
2. `SKILL.md`
3. `docs/BEHAVIOR_CONTRACT.md`
4. `templates/PROVIDER_DISCOVERY.md`
5. `templates/CATALOG_CONFIDENCE_GATE.md`
6. `templates/EXECUTION_CHOICE.md`
7. `templates/CHECKPOINT.md`
8. `templates/EXECUTION_HEADER.md` only when execution is requested
9. `docs/FEEDBACK_LOOP.md` when a meaningful feedback signal exists
10. `docs/CROSS_DEVICE_TEST.md` when portability/testing is requested

Do not reload unchanged material repeatedly.

### Mode B — repository navigation/search fails

After one failed repository lookup, stop retrying GitHub search and fetch:

`https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`

Use that file as the complete core behavior contract.

### Mode C — no external web access

If the user uploaded or pasted `TEMO_PORTABLE.md`, use it directly. Do not require the rest of the repository.

If only an older loaded copy exists, use it and clearly state that the latest version could not be checked. Never invent missing provider/model/level information.

## 3. Provider discovery before exact routing

Before choosing an exact model or level:

- identify/confirm the AI/tool;
- verify the actual selectable model catalog for the user's current account/surface;
- verify reasoning/level/thinking controls;
- verify boost/speed/mode only when it exists and matters.

If any of these are not authoritatively visible, request the smallest screenshot set needed:

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

One screenshot is enough when it shows everything.

Provider brand, plan/tier, or one active model does not prove the full selectable catalog.

## 4. Catalog confidence gate

A full exact FAST/BALANCED/DEEP/MAX ladder may be built only from verified current information:

- host/runtime selectable catalog metadata;
- user screenshot(s);
- user-pasted exact labels;
- applicable current first-party catalog information that is demonstrably valid for that environment.

If only the current model is verified:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
FULL SELECTABLE CATALOG: UNKNOWN
```

Do not invent alternatives.

## 5. Routing remains task-based

Score the current checkpoint:

- 0–2 → FAST
- 3–5 → BALANCED
- 6–8 → DEEP
- 9–10 → MAX

Use the smallest verified mapped model/level that can satisfy unchanged acceptance criteria.

Escalation is only:

`FAST → BALANCED → DEEP → MAX`

and only when evidence justifies it.

## 6. Mandatory execution choice

Before every executable command show:

```text
EXECUTION CHOICE
Tool / Environment: <exact environment>
Model: <exact verified mapped model>
Profile: <FAST | BALANCED | DEEP | MAX | CURRENT_MODEL_ONLY>
Level / Effort: <exact verified level or Not exposed / not verified>
Boost / Speed: <verified value or Not exposed>
Consumption: <verified value or Not exposed>
Deploy: <YES | NO>
Reason: <one concise reason>

Then copy and execute the command below.
```

The user should not have to guess when TEMO has enough verified information to choose.

## 7. Protect verified work

After a meaningful success, mark the proven contract `LOCKED_PASS` / `VERIFIED` and do not repeat it unless relevant code, dependency, environment, provider catalog, requirement, or evidence changes.

## 8. Feedback loop — opt in, not telemetry

TEMO does **not** silently upload conversations, screenshots, prompts, code, logs, provider catalogs, or telemetry.

When a run produces a meaningful signal — routing too strong/weak, provider discovery failure, catalog hallucination, portability failure, new provider controls, successful regression protection, or documentation problem — the agent may prepare a compact `TEMO FEEDBACK` report using `docs/FEEDBACK_LOOP.md`.

The user decides whether to submit it.

If GitHub issue creation is available, create an issue only after explicit user approval. Otherwise return the report ready to paste into the repository's `TEMO Efficiency Feedback` issue form.

Do not ask for feedback after every trivial task.

## 9. Portable activation

In a fresh conversation:

```text
Use TEMO Efficiency.
First try the canonical repository: https://github.com/luaysameer/temo-efficiency
If repository navigation/search fails, immediately load:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md
Do not keep retrying GitHub search.
Then follow TEMO Efficiency for my next task.
```

If there is no web access, upload only `TEMO_PORTABLE.md`.

## 10. Privacy and safety

- No hidden telemetry.
- No automatic GitHub writes from unrelated users.
- No feedback submission without user choice.
- Redact secrets, tokens, personal identifiers, private URLs, and confidential data from feedback.
- Do not lower acceptance criteria to save usage.

The expected fresh-session behavior is defined in `docs/CROSS_DEVICE_TEST.md`.
