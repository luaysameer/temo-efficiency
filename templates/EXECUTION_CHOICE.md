# TEMO Efficiency — Pre-Execution Choice

Show this block to the user **before every executable command**.

Before filling it, use `templates/PROVIDER_DISCOVERY.md` unless the active environment/provider catalog is already authoritatively known or was already discovered in this session.

Use the exact mapped model and exact exposed level from the session-local provider ladder. Do not make the user guess.

```text
EXECUTION CHOICE
Tool / Environment: <exact actual tool or environment>
Model: <exact mapped available model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <exact exposed level, or Not exposed>
Boost / Speed: <exact exposed value; OFF by default when available and not justified; otherwise Not exposed>
Consumption: <lowest practical exposed setting that can still satisfy acceptance, or Not exposed>
Deploy: <YES | NO>
Reason: <one concise sentence explaining why this selection is sufficient>

Then copy and execute the command below.
```

## Rules

- Discover/detect the provider and real catalog before choosing an exact model when that information is not already known.
- Choose for the user when the environment and model catalog are known.
- Never invent a model name, level, boost mode, speed mode, or consumption control.
- If the environment exposes separate model and reasoning/effort controls, specify both using their exact visible names when possible.
- If Boost, consumption, level, or another control does not exist, write `Not exposed`.
- Prefer the smallest capable model/profile that can still meet the unchanged acceptance criteria.
- Use `Boost: OFF` by default when the control exists; turn it on only when there is a concrete reason.
- If the work requires local USB, GPU, filesystem, device, or desktop access, choose a local execution environment rather than a cloud environment that cannot reach it.
- If diagnostics justify escalation, show a new EXECUTION CHOICE before the next command and preserve all previous PASS/VERIFIED state.
- Do not present a menu of models when the routing score points clearly to one mapped choice.
- Reuse the session-local provider ladder; do not ask the user for the same screenshot/list again unless the catalog/environment changed or the previous capture was incomplete.

## Example — known local environment

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <exact FAST model from the discovered/current catalog>
Profile: FAST
Level / Effort: <exact low/fast level exposed by that environment>
Boost / Speed: OFF
Consumption: <lowest practical exposed setting or Not exposed>
Deploy: NO
Reason: The first checkpoint is a deterministic local diagnostic with narrow verification.

Then copy and execute the command below.
```

## Example — unknown third-party AI

Do not guess. First use Provider Discovery:

```text
Which AI/tool are you using for this task?
If the exact model and level choices are not visible to me, send one screenshot of that selector or paste the available model names and levels exactly as shown.
```

After discovery, build the ladder once, score the task, and fill the EXECUTION CHOICE with one exact recommendation.