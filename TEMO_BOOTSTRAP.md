# TEMO Efficiency — Universal Bootstrap

Loading either `README.md` or `SKILL.md` is enough to start TEMO Efficiency.

An agent that can access this repository SHOULD bootstrap the current rules before executing work. Do not rely on a stale copied fragment when the canonical repository is reachable.

## Canonical repository

`luaysameer/temo-efficiency`

## Bootstrap sequence

When TEMO Efficiency is invoked from either `README.md` or `SKILL.md`:

1. Read the current `SKILL.md` as the normative behavior contract.
2. Read `config/model-ladder.example.yaml` for profile and routing defaults.
3. Read `templates/PROVIDER_DISCOVERY.md` to discover the user's actual AI provider, model catalog, and level/effort controls.
4. Read `templates/EXECUTION_CHOICE.md` for the mandatory user-facing setup shown before execution.
5. Read `templates/CHECKPOINT.md` for the micro-checkpoint contract.
6. Read `templates/EXECUTION_HEADER.md` only when execution is actually requested.
7. Preserve already-known provider/model information and previously VERIFIED/PASS state; do not ask for or reload unchanged information unnecessarily.

If repository access is unavailable, continue using the loaded copy and clearly avoid inventing missing model names, levels, or controls.

## Provider discovery comes before model routing

Before choosing FAST / BALANCED / DEEP / MAX, determine what environment the user is actually using.

- If the host environment/provider and its current model/level controls are already authoritative and visible to the agent, use them directly. Do not ask the user to repeat information that is already known.
- If the provider/tool is unknown, ask once which AI/tool they are using.
- If exact model names or reasoning/effort levels are not visible, ask the user for either:
  - a screenshot of the model/level picker, or
  - a pasted list of the available models and levels.
- Never invent model names, reasoning levels, boost modes, or subscription-specific controls.

## ChatGPT / OpenAI / Codex rule

For ChatGPT, OpenAI, or Codex environments:

- Use the current model and reasoning/effort controls exposed by the active environment when they are available to the agent.
- Do not hardcode an old OpenAI model catalog into TEMO Efficiency because model names and product controls can change.
- If the exact current choices are not exposed to the agent, ask for a screenshot or pasted list once, then map those choices into the TEMO ladder.

## Other AI tools/providers

For Claude / Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or any other AI environment:

- If the environment exposes its model catalog and levels programmatically, use that authoritative catalog.
- Otherwise request a screenshot or pasted list.
- Infer the local ladder only from the supplied/visible model names, provider descriptions, capability labels, and available reasoning/effort controls.
- If capability ordering is ambiguous, ask only the smallest clarification necessary instead of guessing.

## Session-local provider ladder

After discovery, build and retain a session-local mapping:

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
SOURCE: <host catalog | screenshot | pasted list | provider docs exposed by environment>
```

Do not ask for this information again in the same conversation/session unless the user changes provider, model catalog, account tier, or environment.

## Routing remains task-based

Provider discovery does not change the TEMO scoring system.

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
Level / Effort: <exact available level>
Boost / Speed: <exact value or Not exposed>
Consumption: <exact value or Not exposed>
Deploy: <YES | NO>
Reason: <one concise reason>

Then copy and execute the command below.
```

The user should not have to guess which model or level to select when TEMO Efficiency has enough information to choose.