# TEMO Efficiency — Provider & Model Discovery

Use this before model routing when the active AI/tool catalog is not already known.

## Goal

Discover the user's real execution environment and the exact model/level controls available on **that user's current account/environment** so TEMO Efficiency can choose the model and level for them instead of guessing.

Provider name alone is not enough. Plan/tier name alone is not enough. Knowing one active model is not enough. The real selectable UI/catalog for the current account is the source of truth.

## Step 1 — Detect before asking

First inspect what the active environment already exposes authoritatively.

If the tool/provider, exact selectable model names, reasoning/effort levels, and relevant speed/boost controls are already authoritative and visible, do not ask the user to repeat them.

If the provider/tool itself is unknown, ask once:

```text
Which AI/tool are you using for this task?
Examples: ChatGPT/OpenAI, Codex, Claude/Claude Code, Gemini, Cursor, Copilot, Cloud Code, local model, or another AI tool.
```

If the user does not know the exact name, ask for one screenshot that shows the app/site name, header/sidebar, or settings page so the environment can be identified without guessing.

## Step 2 — Verify the actual catalog

Never construct an exact FAST/BALANCED/DEEP/MAX ladder from memory, provider branding, plan assumptions, or a generic public model list.

Different accounts, plans, experiments, regions, apps, and product surfaces may expose different choices. Therefore, if the exact current selectable catalog is not visible to the agent, request screenshots or an exact pasted list.

### Preferred screenshot flow

Ask for the smallest set of screenshots needed to cover the controls that actually exist:

1. **Model picker screenshot** — open/expand the model menu so all visible model choices are shown.
2. **Level / Reasoning / Thinking screenshot** — if this is a separate control, open/expand it so all visible levels are shown.
3. **Boost / Speed / Mode / Consumption screenshot** — only if such a separate control exists and is relevant to execution.
4. **Provider/account context screenshot** — only when the AI/tool identity or current account surface cannot otherwise be verified.

If one screenshot shows everything, one screenshot is enough.

If screenshots are inconvenient, the user may paste the exact visible labels instead:

```text
Tool/provider:
Models shown:
Levels/reasoning shown:
Boost/speed/mode shown:
Any plan/tier label visible:
```

The plan/tier label is useful context but does **not** replace the actual model/level picker.

### ChatGPT / OpenAI / Codex

If current model and level controls are exposed by the active environment, use them directly.

Do not hardcode a permanent OpenAI model list into TEMO Efficiency.

If exact current options are not visible to the agent, ask for the model picker screenshot/list and, if separate, the reasoning/level screenshot/list.

Do not assume Free, Go, Plus, Pro, Business, Enterprise, or any other account surface exposes the same models or levels. Route only from the verified choices for the current user.

### Other providers/tools

For Claude / Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, or another AI tool:

1. Use a programmatically exposed current catalog when available.
2. Otherwise request the relevant screenshots or exact pasted labels.
3. Read exact model names, reasoning levels, modes, boost/speed controls, and any visible usage/tier labels.
4. Never fabricate an unavailable model or level.
5. Never infer a full catalog from one active model or from the provider name.

If a screenshot is incomplete or ambiguous, ask only for the missing screenshot/control rather than restarting discovery.

## Step 3 — Catalog states

Use one of these states explicitly:

### VERIFIED_FULL

Use when provider/tool, full selectable model list, and level/reasoning controls are verified.

Then build the full session-local ladder.

### VERIFIED_CURRENT_ONLY

Use when the current active model is verified but the full selectable catalog is not.

Represent it as:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
CURRENT MODEL: <verified current model>
FULL SELECTABLE CATALOG: UNKNOWN
ACTION: Request screenshot/list before recommending a different model.
```

A checkpoint may proceed on the current model when safe, but TEMO must not invent alternative models.

### UNVERIFIED

Use when provider/tool or current model controls cannot be verified.

Do not output an exact model recommendation. Ask for the required screenshot(s) or pasted labels first.

## Step 4 — Build the local ladder

Only after `VERIFIED_FULL`, create:

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
SOURCE: host metadata | screenshot(s) | pasted list
CATALOG CONFIDENCE: VERIFIED
```

Mapping principles:

- FAST = smallest/fastest option that can reliably complete deterministic or narrow work.
- BALANCED = default general coding/analysis option for focused implementation and debugging.
- DEEP = stronger reasoning/coding option for difficult regressions, architecture, or coupled systems.
- MAX = strongest available option, reserved for exceptional complexity/risk.
- Map level/effort separately from model when the UI exposes both.
- Prefer low effort for deterministic work, medium for normal debugging/integration, high only when the task itself justifies it.
- If the provider exposes no separate level and this absence is verified from the UI/runtime, record `Not exposed`.
- If capability ordering cannot be determined confidently from the visible information, request the smallest additional clarification necessary.

## Step 5 — Reuse, do not re-ask

Keep this mapping for the current conversation/session.

Do not ask for the provider/model screenshots again unless:

- the provider changes,
- the app/product surface changes,
- the account/tier changes,
- the model catalog changes,
- the user explicitly says the available choices changed,
- or the previous capture was incomplete.

## Step 6 — Route the actual task

After discovery, use the normal TEMO score:

- 0–2 → FAST
- 3–5 → BALANCED
- 6–8 → DEEP
- 9–10 → MAX

Then show the mandatory `EXECUTION CHOICE` with the exact verified mapped model and exact available level before the command.

## Mandatory anti-guess rule

If TEMO cannot verify the provider/model/level catalog, the correct response is not a guessed ladder. The correct response is a compact screenshot request such as:

```text
I cannot verify the exact model + level choices available on your current account yet.
Send screenshots of:
1) the expanded model picker,
2) the expanded reasoning/level picker if separate,
3) any boost/speed/mode selector if present.
If you do not know which AI/tool this is, include one screenshot showing the app/site header or settings page too.

I will map the choices once and reuse them for this session.
```

## Example — unknown third-party AI

```text
User: I use another cloud coding AI.
Agent: Send a screenshot showing its model and reasoning/level choices, or paste those names exactly. If the app/tool itself is unclear, include one screenshot of the header/settings page.
User: <screenshot/list>
Agent: verifies the catalog, maps it once, scores the task, then returns:

EXECUTION CHOICE
Tool / Environment: <that cloud coding AI>
Model: <exact verified model from screenshot/list>
Profile: BALANCED
Level / Effort: <exact verified level from screenshot/list>
Boost / Speed: <actual verified control or Not exposed>
Consumption: <actual verified control or Not exposed>
Deploy: NO
Reason: Focused debugging with a known target needs normal coding/analysis capability, not the strongest model.

Then copy and execute the command below.
```

The provider name is not the routing decision. The task score selects the TEMO profile; the **verified current account catalog** tells TEMO which exact model and level correspond to that profile.