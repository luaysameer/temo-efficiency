# TEMO Efficiency — Universal Bootstrap

Loading either `README.md`, `SKILL.md`, or `TEMO_PORTABLE.md` is enough to start TEMO Efficiency.

Canonical repository:

`luaysameer/temo-efficiency`

Portable raw entrypoint:

`https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`

## Access modes — use the first one that works

TEMO Efficiency must not depend on one AI provider having perfect GitHub repository browsing.

### Mode A — repository-aware agent

If the canonical repository is directly accessible, read the current canonical files before executing work:

1. `SKILL.md`
2. `docs/BEHAVIOR_CONTRACT.md`
3. `config/model-ladder.example.yaml`
4. `templates/PROVIDER_DISCOVERY.md`
5. `templates/CATALOG_CONFIDENCE_GATE.md`
6. `templates/EXECUTION_CHOICE.md`
7. `templates/CHECKPOINT.md`
8. `templates/EXECUTION_HEADER.md` only when execution is actually requested
9. `docs/CROSS_DEVICE_TEST.md` when portability/testing is requested

### Mode B — direct URL works but repository navigation/search fails

Do not keep searching GitHub repeatedly.

After one failed repository lookup/index/search attempt, fetch the portable raw file directly:

`https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`

Use `TEMO_PORTABLE.md` as the complete behavior contract for the session. It is self-contained and does not require the other repository files.

### Mode C — no external web/repository access

If the user uploaded or pasted `TEMO_PORTABLE.md`, use it directly and continue. Do not require the rest of the repository.

If only a stale/full `SKILL.md` copy is already loaded, use that copy and do not invent missing model names, levels, boost modes, or controls.

The repository cannot inject itself into an unrelated AI session without access or supplied content, so the portable single-file fallback is the official offline/no-browse path.

## Efficiency rule for bootstrap itself

Bootstrap must also follow TEMO Efficiency:

- Do not spend 10–20 seconds repeatedly searching/indexing the same repository.
- One failed repository lookup is enough to try the raw portable URL.
- One failed raw fetch is enough to use an uploaded/pasted portable file or ask for that one file.
- Do not ask for multiple repository files when `TEMO_PORTABLE.md` is sufficient.
- Do not reload unchanged TEMO files during the same session.
- Preserve the provider/model mapping and all previous PASS/VERIFIED state.

## Provider discovery comes before exact model routing

Before choosing FAST / BALANCED / DEEP / MAX, determine what environment the user is actually using.

- If the host environment/provider and its current model/level controls are already authoritatively visible, use them directly.
- Do not ask for information the environment already exposes.
- If the provider/tool is unknown, ask once which AI/tool is being used.
- If exact model names or reasoning/effort levels are not visible, ask for either:
  - one screenshot of the model + level/reasoning picker, or
  - a pasted list of the exact available models and levels.
- Never invent model names, reasoning levels, boost modes, subscription controls, or provider capabilities.

## Catalog confidence gate — mandatory

Knowing the provider or the currently active model is **not** enough to claim knowledge of the full selectable catalog.

Before constructing an exact FAST / BALANCED / DEEP / MAX ladder, apply `templates/CATALOG_CONFIDENCE_GATE.md`.

A full exact ladder is allowed only when the selectable catalog is verified from one of these sources:

1. host/runtime metadata that explicitly exposes the current selectable catalog or controls;
2. a user screenshot of the actual model/level picker;
3. a pasted list from the user containing the exact visible choices;
4. an authoritative current first-party catalog exposed to the agent and applicable to the user's environment.

The following are NOT valid catalog sources:

- the model's own memory of model names;
- guessing provider families or version numbers;
- extrapolating alternatives from one active model;
- stale/general docs that do not prove the user's current selectable options.

If the assistant can identify only the active model but not the full catalog, use:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
```

or ask once for the screenshot/pasted list. Do not fabricate a complete ladder.

Hard FAIL condition:

> The assistant says it cannot see the live model picker/catalog and then outputs exact alternative model names anyway.

Classify this as `CATALOG_HALLUCINATION_FAIL`.

## ChatGPT / OpenAI / Codex

For ChatGPT, OpenAI, or Codex:

- use the current models and reasoning/effort controls exposed by the active environment when available;
- do not hardcode a permanent OpenAI catalog because product names and controls can change;
- if the exact current choices are not visible, request one screenshot or pasted list, then map those real choices into the TEMO ladder.

Environment identity or active-model identity does not automatically prove the exact model picker/catalog. If the exact catalog is not authoritative, discover it instead of guessing.

## Other providers/tools

For Claude / Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or any other AI environment:

- use an authoritative visible/programmatic catalog when available;
- otherwise request one screenshot or exact pasted list;
- infer the local ladder only from supplied/visible model names, capability labels, and actual reasoning/effort controls;
- if capability ordering is ambiguous, ask only the smallest missing clarification instead of guessing.

Do not use provider-family assumptions as a substitute for the real picker/catalog.

## Session-local provider ladder

Only after the Catalog Confidence Gate passes, build and retain:

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
SOURCE: <host catalog | screenshot | pasted list | authoritative first-party catalog>
CATALOG CONFIDENCE: VERIFIED
```

Reuse this mapping for the session. Do not ask again unless the provider, model catalog, account tier, or environment changes.

## Routing remains task-based

Score the current checkpoint and choose the smallest mapped model/level that can meet the unchanged acceptance criteria:

- 0–2 → FAST
- 3–5 → BALANCED
- 6–8 → DEEP
- 9–10 → MAX

Escalate one level at a time only when evidence justifies it.

## Mandatory user-facing result

Before every executable command, show:

```text
EXECUTION CHOICE
Tool / Environment: <exact environment>
Model: <exact verified mapped model, or current model in CURRENT_MODEL_ONLY mode>
Profile: <FAST | BALANCED | DEEP | MAX, or CURRENT_MODEL_ONLY when full ladder is unavailable>
Level / Effort: <exact verified available level or Not exposed>
Boost / Speed: <exact verified value or Not exposed>
Consumption: <exact verified value or Not exposed>
Deploy: <YES | NO>
Reason: <one concise reason>

Then copy and execute the command below.
```

The user should not have to guess which model or level to select when TEMO Efficiency has enough **verified** information to choose.

## Portable activation

For a fresh conversation, prefer this compact activation:

```text
Use TEMO Efficiency.
First try the canonical repository: https://github.com/luaysameer/temo-efficiency
If repository navigation/search fails, immediately load the portable contract from:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md
Do not keep retrying GitHub search.
Then follow TEMO Efficiency for my next task.
```

If the environment has no external web access at all, upload or paste **only `TEMO_PORTABLE.md`**. No other TEMO file is required for core behavior.

The expected fresh-session/provider behavior is defined in `docs/CROSS_DEVICE_TEST.md`.
