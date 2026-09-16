# TEMO Efficiency — Behavior Contract

This document defines what a user should experience when TEMO Efficiency is loaded from `README.md`, `SKILL.md`, or the canonical repository.

## What this skill does

TEMO Efficiency is a provider-aware execution router for AI work. It does not simply tell an agent to use a cheaper model. It makes the execution setup explicit, chooses the smallest capable model + reasoning level for the current checkpoint, preserves verified work, and escalates only when evidence requires more capability.

The required workflow is:

```text
load TEMO Efficiency
→ discover/confirm the real AI provider and available model + level controls
→ build/reuse a session-local FAST/BALANCED/DEEP/MAX ladder
→ score the current checkpoint
→ choose the exact model + level
→ show the choice to the user BEFORE execution
→ execute one bounded micro-checkpoint
→ verify against unchanged acceptance criteria
→ protect PASS/VERIFIED work
→ escalate one step only when diagnostics justify it
```

## Mandatory first-run behavior

When TEMO Efficiency is invoked in a new conversation/session:

1. Bootstrap the canonical workflow from `luaysameer/temo-efficiency` when repository access is available.
2. Determine the active AI/tool environment unless it is already authoritatively known.
3. If exact model names and reasoning/effort levels are already visible to the agent, use them directly.
4. If they are not visible, ask once for either:
   - one screenshot showing the model and level/reasoning choices, or
   - a pasted list of the exact available models and levels.
5. Build a session-local mapping for FAST / BALANCED / DEEP / MAX.
6. Reuse that mapping for the rest of the session. Do not ask again unless the provider, account tier, model catalog, or environment changes.

## Provider behavior

### ChatGPT / OpenAI / Codex

If the active environment exposes the current OpenAI/ChatGPT/Codex model catalog and reasoning controls, TEMO Efficiency uses those current choices directly.

Do not hardcode a permanent OpenAI model list into the skill. Model names, product tiers, and reasoning controls can change.

If exact current choices are not visible, request one screenshot or pasted list and map only what actually exists.

### Claude / Claude Code / Gemini / Cursor / Copilot / Cloud Code / local AI / other tools

Use the same workflow:

- use an authoritative visible/programmatic catalog when available;
- otherwise ask for a screenshot or exact pasted list;
- never invent a model name, reasoning level, boost mode, or provider feature;
- map the real choices into FAST / BALANCED / DEEP / MAX;
- if capability order remains ambiguous, ask only the smallest missing clarification.

## Mandatory pre-execution output

Before every executable command, the agent MUST show the user this information first:

```text
EXECUTION CHOICE
Tool / Environment: <exact environment>
Model: <exact mapped available model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <exact available level or Not exposed>
Boost / Speed: <exact value or Not exposed>
Consumption: <exact value or Not exposed>
Deploy: <YES | NO>
Reason: <one concise reason why this is sufficient>

Then copy and execute the command below.
```

The user should not have to guess which model or level to select when the skill has enough information to choose.

## Routing

Score the current checkpoint on five dimensions, each from 0–2:

- Complexity
- Risk
- Scope
- Verification burden
- Uncertainty

Map the score:

```text
0–2  → FAST      → lowest reliable level
3–5  → BALANCED  → medium/default level
6–8  → DEEP      → medium/high as justified
9–10 → MAX       → highest justified level; exceptional use only
```

Route by capability, not by brand name.

## Escalation

Escalation is:

```text
FAST → BALANCED → DEEP → MAX
```

Never skip directly to the strongest model merely because it exists.

Escalate only when evidence shows the current checkpoint needs more capability, for example:

- root cause remains ambiguous after targeted diagnostics;
- several coupled subsystems must be reasoned about together;
- the unchanged acceptance test still fails;
- security/data/infrastructure risk increased;
- the current profile could not complete the same bounded checkpoint.

When escalating:

- keep all useful diagnostics;
- preserve all previous PASS/VERIFIED state;
- show a new `EXECUTION CHOICE` before the next command;
- do not restart the whole investigation.

## Micro-checkpoints

Large work must be split into bounded checkpoints. Each checkpoint should contain one primary objective, protected work, targeted diagnostics/tests, a measurable success condition, and a stop condition.

Do not broaden the task just because context is available.

## PASS / VERIFIED protection

A successful area becomes protected:

```text
LOCKED_PASS
```

Do not repeat it unless its relevant code, dependency, environment, provider catalog, or requirement changed, or later evidence contradicts it.

This is a core part of TEMO Efficiency: do not pay twice for the same proven work.

## Quality rule

Efficiency never means lowering the acceptance criteria.

TEMO Efficiency reduces avoidable work by changing model/effort choice, context size, test scope, and repeated work — not by accepting a weaker result.

`IMPLEMENTED` and `VERIFIED` are different states. Real acceptance evidence is required before claiming verification.

## Local vs cloud execution

If a task requires USB, local filesystem, GPU, desktop UI, attached device, or other hardware that a cloud environment cannot access, explicitly select a local execution environment.

Do not choose cloud execution for work that physically requires local access.

## Portable activation

A user can activate TEMO Efficiency in a new AI conversation by giving the canonical repository and asking the agent to load the current skill, for example:

```text
Use TEMO Efficiency from https://github.com/luaysameer/temo-efficiency
Load the current SKILL.md and TEMO_BOOTSTRAP.md, follow them as the execution behavior contract for this chat, and do not execute my task until you have completed the provider/model/level discovery required by the skill.
```

If the AI environment cannot access GitHub, the user must provide/upload the relevant skill files. A GitHub repository cannot force an unrelated AI session to load itself without being given access or the files.

## Expected user experience

After TEMO Efficiency is successfully loaded, the user should see this pattern consistently:

```text
user task
→ provider/model discovery only if needed
→ EXECUTION CHOICE
→ exact copy/paste or direct execution command
→ checkpoint result
→ PASS protection or evidence-based escalation
```

If the agent jumps directly into execution without selecting the model/level first, invents unavailable models, repeatedly asks for the same catalog, or restarts already verified work, TEMO Efficiency is not being followed correctly.
