# TEMO Efficiency — Feedback Loop

TEMO Efficiency improves through **opt-in, evidence-based feedback** from real tasks.

The skill must never silently upload a user's conversation, screenshots, code, logs, prompts, account information, or provider catalog. Feedback is prepared locally/in-chat first, and the user chooses whether to submit it.

## When feedback is useful

Prepare a feedback candidate when at least one of these happens:

- the router chose a model/profile that was clearly too strong;
- the router chose a model/profile that was too weak and escalation was required;
- provider/model discovery failed or asked unnecessary questions;
- the skill invented or misread a model/level;
- repository/bootstrap/portable fallback failed;
- a new AI provider exposes controls TEMO does not yet map well;
- a regression guard prevented repeated work;
- a cross-device test produced a meaningful PASS/FAIL result;
- the user found a clearer workflow, scoring rule, template, or acceptance pattern.

Do not ask for feedback after every trivial task. Prefer meaningful signals.

## Compact feedback format

```text
TEMO FEEDBACK
Language: <Arabic | English | other>
Provider / Tool: <name or Unknown>
Plan / Surface: <only if user chooses to share>
TEMO Version: <loaded version>
Catalog Source: <host metadata | screenshot | pasted list | unknown>
Task Type: <short description>
Initial Profile: <FAST | BALANCED | DEEP | MAX | CURRENT_MODEL_ONLY>
Initial Level: <exact visible label if verified>
Escalation: <none or route taken>
Result: <PASS | PARTIAL | FAIL>
Signal Type: <routing | discovery | portability | verification | regression | docs | other>
What happened: <2–5 concise lines>
Expected behavior: <short>
Evidence: <minimal reproducible evidence; redact secrets/personal data>
Suggested improvement: <optional>
```

## Feedback safety

Before preparing/submitting feedback:

- redact secrets, tokens, private URLs, personal identifiers, private code, and sensitive screenshots;
- include only the minimum evidence needed to reproduce the behavior;
- do not upload full conversations by default;
- do not upload screenshots unless the user intentionally chooses to share them;
- never claim feedback was submitted unless an actual GitHub action completed.

## Agent behavior

At the end of a meaningful TEMO run, the agent may say that it found a useful feedback signal and offer a compact report.

If the user agrees and GitHub issue creation is available, the agent may create the issue with the user's explicit approval.

If direct issue creation is unavailable, return the compact report ready to paste into the repository's Feedback issue template.

## Maintainer triage

Feedback should be grouped by:

- provider discovery/catalog accuracy;
- routing quality;
- escalation quality;
- context/consumption efficiency;
- portability/bootstrap;
- verification/regression protection;
- documentation/usability.

Changes to routing rules should be backed by reproducible examples rather than one-off preferences.
