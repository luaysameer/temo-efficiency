# TEMO Efficiency — Pre-Execution Choice

Show this block to the user **before every executable command**.

```text
EXECUTION CHOICE
Tool / Environment: <exact tool or environment>
Model: <exact available model name when known; otherwise mapped profile model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <Low | Medium | High>
Boost / Speed: <OFF by default unless justified>
Consumption: <lowest practical setting that can still satisfy acceptance>
Deploy: <YES | NO>
Reason: <one concise sentence explaining why this selection is sufficient>

Then copy and execute the command below.
```

## Rules

- Choose for the user when the environment and model catalog are known.
- Never invent a model name.
- If the environment exposes separate model and reasoning/effort controls, specify both.
- If Boost, consumption, or another control does not exist, write `Not exposed`.
- Prefer the smallest capable model/profile that can still meet the unchanged acceptance criteria.
- Use `Boost: OFF` by default; turn it on only when the environment exposes it and there is a concrete reason.
- If the work requires local USB, GPU, filesystem, device, or desktop access, choose a local execution environment rather than a cloud environment that cannot reach it.
- If diagnostics justify escalation, show a new EXECUTION CHOICE before the next command and preserve all previous PASS/VERIFIED state.
- Do not present a menu of models when the routing score points clearly to one choice.

## Example

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <mapped FAST model available in this environment>
Profile: FAST
Level / Effort: Low
Boost / Speed: OFF
Consumption: Low
Deploy: NO
Reason: The first checkpoint is a deterministic local diagnostic with narrow verification.

Then copy and execute the command below.
```
