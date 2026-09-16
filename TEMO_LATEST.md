# TEMO Efficiency — Latest Manifest

Canonical repository: `luaysameer/temo-efficiency`

Current skill version: **1.4.0**
Current portable contract: **1.2**

## Canonical entrypoints

- Full skill: `SKILL.md`
- Universal bootstrap: `TEMO_BOOTSTRAP.md`
- Single-file fallback: `TEMO_PORTABLE.md`
- Behavior contract: `docs/BEHAVIOR_CONTRACT.md`
- Provider discovery: `templates/PROVIDER_DISCOVERY.md`
- Catalog confidence gate: `templates/CATALOG_CONFIDENCE_GATE.md`
- Execution choice: `templates/EXECUTION_CHOICE.md`
- Feedback loop: `docs/FEEDBACK_LOOP.md`
- Cross-device test: `docs/CROSS_DEVICE_TEST.md`

## Session update rule

When TEMO Efficiency starts in a new session and the canonical repository is reachable:

1. Read this manifest once.
2. Compare the loaded skill/portable version with the current manifest.
3. If the loaded copy is older, load the current canonical `SKILL.md` or current `TEMO_PORTABLE.md` before routing the task.
4. Do not repeatedly check again during the same session unless the user explicitly asks to refresh.
5. Preserve the current task, provider catalog, and PASS/VERIFIED work while refreshing rules.

If the repository is unreachable, continue with the loaded copy and state that the latest version could not be checked. Do not block the user's task only because an update check failed.

## Privacy and control

TEMO Efficiency does not silently upload conversation content, screenshots, prompts, logs, or telemetry to this repository.

Feedback is opt-in. The agent may prepare a compact feedback report when a meaningful routing, catalog-discovery, portability, or verification issue is observed, but the user decides whether to submit it.
