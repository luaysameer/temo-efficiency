# TEMO Efficiency — Universal Bootstrap

Loading either `README.md` or `SKILL.md` is enough to start TEMO Efficiency when the AI can access the canonical repository.

Canonical repository:

`luaysameer/temo-efficiency`

## Bootstrap sequence

When TEMO Efficiency is invoked from either `README.md` or `SKILL.md`:

1. Read the current `SKILL.md` as the normative behavior contract.
2. Read `docs/BEHAVIOR_CONTRACT.md` for the required user experience and portable behavior.
3. Read `config/model-ladder.example.yaml` for profile/routing defaults.
4. Read `templates/PROVIDER_DISCOVERY.md` to discover the actual provider, model catalog, and reasoning/effort controls.
5. Read `templates/EXECUTION_CHOICE.md` for the mandatory user-facing choice shown before execution.
6. Read `templates/CHECKPOINT.md` for the micro-checkpoint contract.
7. Read `templates/EXECUTION_HEADER.md` only when execution is actually requested.
8. Use `docs/CROSS_DEVICE_TEST.md` when the user wants to verify that the skill behaves correctly in a fresh session, on another device, or with another provider.

Do not repeatedly reload unchanged material during the same session. Preserve the provider/model mapping and all previous PASS/VERIFIED state.

If repository access is unavailable, continue using the loaded copy and never invent missing model names, levels, boost modes, or controls.

## Provider discovery comes before model routing

Before choosing FAST / BALANCED / DEEP / MAX, determine what environment the user is actually using.

- If the host environment/provider and its current model/level controls are already authoritatively visible, use them directly.
- Do not ask for information the environment already exposes.
- If the provider/tool is unknown, ask once which AI/tool is being used.
- If exact model names or reasoning/effort levels are not visible, ask for either:
  - one screenshot of the model + level/reasoning picker, or
  - a pasted list of the exact available models and levels.
- Never invent model names, reasoning levels, boost modes, subscription controls, or provider capabilities.

## ChatGPT / OpenAI / Codex

For ChatGPT, OpenAI, or Codex:

- use the current models and reasoning/effort controls exposed by the active environment when available;
- do not hardcode a permanent OpenAI catalog because product names and controls can change;
- if the exact current choices are not visible, request one screenshot or pasted list, then map those real choices into the TEMO ladder.

## Other providers/tools

For Claude / Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or any other AI environment:

- use an authoritative visible/programmatic catalog when available;
- otherwise request one screenshot or exact pasted list;
- infer the local ladder only from supplied/visible model names, capability labels, and actual reasoning/effort controls;
- if capability ordering is ambiguous, ask only the smallest missing clarification instead of guessing.

## Session-local provider ladder

After discovery, build and retain:

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
Model: <exact mapped model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <exact available level or Not exposed>
Boost / Speed: <exact value or Not exposed>
Consumption: <exact value or Not exposed>
Deploy: <YES | NO>
Reason: <one concise reason>

Then copy and execute the command below.
```

The user should not have to guess which model or level to select when TEMO Efficiency has enough information to choose.

## Portable activation

In a fresh supported AI conversation with repository access, the user can say:

```text
Use TEMO Efficiency from https://github.com/luaysameer/temo-efficiency
Load the current SKILL.md and TEMO_BOOTSTRAP.md, follow them as the execution behavior contract for this chat, and do not execute my task until you have completed the provider/model/level discovery required by the skill.
```

If the AI environment cannot access GitHub, the user must provide/upload the relevant TEMO skill files. The repository cannot inject itself into an unrelated AI session without being given access or the files.

The expected cross-device/fresh-session behavior is defined in `docs/CROSS_DEVICE_TEST.md`.
