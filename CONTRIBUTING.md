# Contributing to TEMO Efficiency

Contributions are welcome. The most valuable changes are backed by real evidence from actual AI workflows.

## What to contribute

Useful reports include:

- a task where TEMO selected a model/profile that was too strong;
- a task where TEMO selected a model/profile that was too weak;
- a provider/model picker TEMO could not classify correctly;
- a ChatGPT/Claude/Cloud Code/other account where the catalog differed from assumptions;
- a bootstrap or portable fallback failure;
- a `CATALOG_HALLUCINATION_FAIL` case;
- a regression guard that prevented repeated work;
- a clearer scoring rule, execution template, or documentation improvement;
- a cross-device/provider PASS or FAIL with reproducible evidence.

## Preferred feedback path

Use the GitHub issue form:

`.github/ISSUE_TEMPLATE/temo-feedback.yml`

The form supports English and Arabic feedback.

See `docs/FEEDBACK_LOOP.md` for the compact report format and privacy rules.

## Evidence over opinion

When suggesting a routing change, include when possible:

```text
Provider / Tool:
TEMO Version:
Catalog Source:
Task Type:
Initial Profile / Model / Level:
Escalation:
Result:
Observed behavior:
Expected behavior:
Minimal reproducible evidence:
Suggested improvement:
```

Do not include passwords, API keys, tokens, private URLs, personal information, confidential code, or unnecessary full conversations.

## Core guarantees that must remain intact

1. Never lower acceptance criteria merely to reduce usage.
2. Never claim quota, billing, plan, or rate-limit bypass.
3. Never invent provider/model/level catalogs.
4. Prefer real account/runtime evidence over provider-family assumptions.
5. Choose the smallest capable model/level for the current checkpoint.
6. Escalate only when evidence justifies it.
7. Preserve PASS/VERIFIED work.
8. Keep feedback opt-in; no hidden telemetry.
9. Do not silently self-modify the canonical repository from an unrelated user session.

## Updating TEMO

TEMO uses a canonical-refresh model:

- `TEMO_LATEST.md` declares the current published version.
- New sessions with repository access check that manifest once.
- Older loaded copies should refresh from the canonical repository before routing work.
- If the repository cannot be reached, the loaded copy continues instead of blocking the user's task.

Maintainer changes should be reviewed, tested against the cross-device/provider cases in `docs/CROSS_DEVICE_TEST.md`, then published to the canonical repository.
