# Practical Routing Examples

These scenarios demonstrate the scoring and checkpoint contract from [`../SKILL.md`](../SKILL.md). Scores are illustrative routing inputs, not benchmark results. A scenario is not `VERIFIED` until the stated acceptance evidence exists.

## A. Tiny Deterministic File Edit → FAST

**Task:** Change one outdated command in a documentation file without touching surrounding content.

**Score / reason:** Complexity 0 + risk 0 + scope 0 + verification 0 + uncertainty 0 = **0**. The edit is local, reversible, deterministic, and checkable by exact text comparison.

**Selected profile:** FAST / Low effort.

**Checkpoint:** Replace the single old command, preserve all other lines, and stop.

**Verification:** Inspect the diff; search for the old and new exact strings; confirm only the intended file changed. Until that evidence is recorded, status is `IMPLEMENTED`, not `VERIFIED`.

**Escalation condition:** Escalate to BALANCED only if the command is generated, duplicated across coupled documentation, or its correct replacement depends on runtime behavior.

**Regression guard:** Add no automated test unless the repository already validates docs; otherwise use the exact-string check as the repeatable guard.

```text
Profile: FAST
Objective: Replace one outdated command in docs/guide.md.
Protected: All other text and every non-documentation file.
Success: Diff contains only the intended replacement; old string absent; new string present.
Stop: Report the checks. Do not edit adjacent guidance.
```

## B. Focused Bug Fix → BALANCED

**Task:** Fix a known UI state bug where closing one dialog leaves its local loading flag active.

**Score / reason:** Complexity 1 + risk 1 + scope 0 + verification 1 + uncertainty 0 = **3**. The root cause and component are known, but runtime behavior and a targeted interaction test are required.

**Selected profile:** BALANCED / Medium effort.

**Checkpoint:** Reproduce the dialog state transition, change only the affected state-reset path, and add one focused interaction test.

**Verification:** Run the new interaction test plus existing tests for that component. A live/UI acceptance requirement remains unverified until rendered interaction evidence is captured.

**Escalation condition:** Escalate to DEEP if the flag is owned by shared state, the failure crosses navigation or persistence boundaries, or the focused fix breaks a protected contract.

**Regression guard:** Keep a deterministic interaction test that opens, triggers loading, closes, reopens, and asserts the clean state.

```text
Profile: BALANCED
Objective: Reset the dialog loading flag on the known close path.
Protected: Other dialogs, shared request behavior, and existing component PASS tests.
Success: Reproduction fails before the fix and passes after it; component tests pass.
Stop: Report evidence. Do not refactor shared state unless escalation criteria are met.
```

## C. Cross-Component Regression → DEEP

**Task:** Diagnose a regression in which a client request succeeds, but stale cache state causes the next service-backed view to show the previous value.

**Score / reason:** Complexity 1 + risk 1 + scope 1 + verification 2 + uncertainty 2 = **7**. The failure crosses client, service, and cache boundaries; the root cause is unclear and realistic integration evidence is required.

**Selected profile:** DEEP / Medium or High effort based on diagnostics.

**Checkpoint:** Capture one failing request-to-render trace, locate the first broken contract, change the smallest responsible boundary, and protect it with an integration-level guard.

**Verification:** Run the targeted cross-component reproduction and protected tests for the client contract, service response, and cache invalidation path. Do not claim `VERIFIED` until the required runtime environment reproduces the accepted result.

**Escalation condition:** Escalate to MAX only if diagnostics reveal high production blast radius, data-integrity risk, or a system-wide cache or consistency redesign.

**Regression guard:** Add the smallest test that writes a new value, observes invalidation, reads through the real boundary available in test, and asserts the new value is rendered.

```text
Profile: DEEP
Objective: Find and fix the first broken contract in the request → cache → render path.
Protected: Authentication, unrelated cache keys, and prior client/service contract PASS tests.
Success: Targeted trace identifies the boundary; reproduction and protected tests pass.
Stop: Report evidence and remaining uncertainty. Do not redesign the caching system.
```

## D. High-Risk Architecture or Security Task → MAX

**Task:** Plan and review a change to an authorization boundary used by multiple services that handle sensitive data.

**Score / reason:** Complexity 2 + risk 2 + scope 2 + verification 2 + uncertainty 2 = **10**. The task is system-wide, security-sensitive, highly coupled, and requires multi-layer acceptance evidence.

**Selected profile:** MAX / High effort, justified by risk and scope rather than project importance alone.

**Checkpoint:** Define the current authorization contract and threat assumptions, propose one bounded migration stage, identify rollback conditions, and specify evidence required before implementation or deployment.

**Verification:** Review trust boundaries and negative authorization cases; run applicable unit, integration, and policy tests in an approved environment. A design review is not production verification, and no deployment is implied.

**Escalation condition:** MAX is already the highest profile. Stop and request specialized human/security review if assumptions are unresolved, required access is unavailable, or evidence exposes unacceptable data-loss or privilege-escalation risk.

**Regression guard:** Preserve negative tests for cross-tenant access, privilege downgrade, token scope, and default-deny behavior that directly match the approved contract.

```text
Profile: MAX
Objective: Produce one reviewable authorization-boundary migration stage and its test contract.
Protected: Default-deny behavior, tenant isolation, auditability, rollback path, and existing PASS tests.
Success: Threat assumptions, migration boundary, negative tests, and rollback gates are explicit and reviewed.
Stop: Do not implement or deploy without separate authorization and required evidence.
```

