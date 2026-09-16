# TEMO Efficiency — Provider & Model Discovery

Use this before model routing when the active AI/tool catalog is not already known.

## Goal

Discover the user's real execution environment and available model/level controls so TEMO Efficiency can choose the model and level for them instead of guessing.

## Step 1 — Detect before asking

First inspect what the active environment already exposes.

If the tool/provider, exact model names, reasoning/effort levels, and speed/boost controls are already authoritative and visible, do not ask the user to repeat them.

If the provider/tool is unknown, ask once:

```text
Which AI/tool are you using for this task?
Examples: ChatGPT/OpenAI, Codex, Claude/Claude Code, Gemini, Cursor, Copilot, Cloud Code, local model, or another AI tool.
```

## Step 2 — Resolve the actual catalog

### ChatGPT / OpenAI / Codex

If current model and level controls are exposed by the active environment, use them directly.

Do not hardcode a permanent OpenAI model list into TEMO Efficiency.

If exact current options are not visible to the agent, ask for either:

```text
Send one screenshot of the model + reasoning/level selector, or paste the available model names and levels exactly as shown.
```

### Other providers/tools

For Claude / Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or another AI tool:

1. Use a programmatically exposed catalog when available.
2. Otherwise ask for one screenshot of the model/level menu OR a pasted list.
3. Read exact model names, reasoning levels, modes, boost/speed controls, and any visible usage tier labels.
4. Never fabricate an unavailable model or level.

If the screenshot is incomplete or ambiguous, ask only for the missing field rather than restarting discovery.

## Step 3 — Build the local ladder

Create a session-local mapping from the actual available controls:

```text
PROVIDER / TOOL:
FAST MODEL:
FAST LEVEL:
BALANCED MODEL:
BALANCED LEVEL:
DEEP MODEL:
DEEP LEVEL:
MAX MODEL:
MAX LEVEL:
BOOST / SPEED CONTROL:
CONSUMPTION CONTROL:
SOURCE:
```

Mapping principles:

- FAST = smallest/fastest option that can reliably complete deterministic or narrow work.
- BALANCED = default general coding/analysis option for focused implementation and debugging.
- DEEP = stronger reasoning/coding option for difficult regressions, architecture, or coupled systems.
- MAX = strongest available option, reserved for exceptional complexity/risk.
- Map level/effort separately from model when the UI exposes both.
- Prefer low effort for deterministic work, medium for normal debugging/integration, high only when the task itself justifies it.
- If the provider exposes no separate level, record `Not exposed` rather than inventing one.
- If capability ordering cannot be determined confidently from the visible information, request the smallest additional clarification necessary.

## Step 4 — Reuse, do not re-ask

Keep this mapping for the current conversation/session.

Do not ask the user for the provider/model screenshot again unless:

- the provider changes,
- the model catalog changes,
- account/tier changes expose different choices,
- the user explicitly says the available models changed,
- or the previous capture was incomplete.

## Step 5 — Route the actual task

After discovery, use the normal TEMO score:

- 0–2 → FAST
- 3–5 → BALANCED
- 6–8 → DEEP
- 9–10 → MAX

Then show the mandatory `EXECUTION CHOICE` with the exact mapped model and exact available level before the command.

## Example — unknown third-party AI

```text
User: I use another cloud coding AI.
Agent: Send one screenshot showing its model and reasoning/level choices, or paste those names exactly.
User: <screenshot/list>
Agent: maps the catalog once, scores the task, then returns:

EXECUTION CHOICE
Tool / Environment: <that cloud coding AI>
Model: <exact model from screenshot/list>
Profile: BALANCED
Level / Effort: <exact level from screenshot/list>
Boost / Speed: <actual control or Not exposed>
Consumption: <actual control or Not exposed>
Deploy: NO
Reason: Focused debugging with a known target needs normal coding/analysis capability, not the strongest model.

Then copy and execute the command below.
```

The provider name is not the routing decision. The task score selects the TEMO profile; the discovered catalog tells TEMO which exact model and level correspond to that profile.