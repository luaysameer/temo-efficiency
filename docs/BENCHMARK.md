# TEMO Efficiency Benchmark Framework

## Goal

Measure whether TEMO Efficiency reduces **avoidable AI work without lowering acceptance quality**.

This framework is a protocol and reusable recording template. It does not contain measured performance claims.

## Current Results

**Data collection pending.**

No measured dataset has been published yet. Do not interpret placeholder fields or example labels in this document as results.

## Evaluation Design

1. Define the task and acceptance criteria before routing.
2. Record the relevant repository/environment state and protected PASS evidence.
3. Score complexity, risk, scope, verification burden, and uncertainty using [`../SKILL.md`](../SKILL.md).
4. Record the initial profile, each escalation, each implementation attempt, and each verification run.
5. Stop timing only when the task reaches an accepted result or a clearly documented terminal blocker.
6. Compare workflows only when their task, starting state, acceptance criteria, and available tools are materially equivalent.

If a baseline workflow is used, keep it separate from the TEMO run and document differences in context, agent behavior, model availability, and environment. Never lower the acceptance criteria to make a routed workflow appear more efficient.

## Required Metrics

| Metric | How to record it |
|---|---|
| Task count | Number of distinct tasks evaluated |
| Initial routing profile | FAST, BALANCED, DEEP, or MAX selected before implementation |
| Escalation count | Number of profile increases after the initial route |
| Repeated test count | Test executions repeated without a relevant change to code, dependency, environment, or requirement |
| Unnecessary full regressions avoided | Full-suite runs deliberately skipped because the bounded change did not affect broader contracts; record the decision evidence |
| Implementation attempts | Distinct implementation attempts before acceptance or terminal blocker |
| Acceptance result | PASS, FAIL, or BLOCKED against the unchanged predefined criteria |
| Approximate model/token/credit consumption | Record only when the platform exposes a measurable value; otherwise use `N/M` (not measurable) |
| Time to accepted result | Elapsed time from task start to accepted evidence; use `N/A` if no accepted result exists |

`Unnecessary full regressions avoided` is a decision audit, not an estimate of tests that would certainly have run. Count an avoided run only when the checkpoint identifies why targeted verification was sufficient. Do not count a full regression as avoidable when shared contracts, routing, schemas, security boundaries, or deployment foundations changed.

## Task-Level Data Template

Use one row per task. Add links to sanitized evidence where possible.

| Task ID | Task type | Initial profile | Escalations | Repeated tests | Full regressions avoided | Implementation attempts | Acceptance result | Consumption (measured only) | Time to accepted result | Evidence / notes |
|---|---|---|---:|---:|---:|---:|---|---|---|---|
| `<id>` | `<category>` | `<FAST/BALANCED/DEEP/MAX>` | `<count>` | `<count>` | `<count>` | `<count>` | `<PASS/FAIL/BLOCKED>` | `<value or N/M>` | `<duration or N/A>` | `<sanitized links and routing rationale>` |

## Run Record Template

```text
Task ID:
Task type:
Starting state / commit:
Acceptance criteria:
Protected PASS evidence:

Scores:
- Complexity (0-2):
- Risk (0-2):
- Scope (0-2):
- Verification burden (0-2):
- Uncertainty (0-2):

Initial routing profile:
Escalations and diagnostic reasons:
Implementation attempts:
Verification runs:
- targeted:
- repeated without relevant change:
- full regressions:
- full regressions deliberately avoided and why:

Acceptance result: PASS / FAIL / BLOCKED
Acceptance evidence:
Approximate model/token/credit consumption: <measured value or N/M>
Time to accepted result: <duration or N/A>
Unexpected problems:
Suggested routing improvement:
```

## Aggregate Summary Template

Complete only from recorded task rows. Keep unknown fields as `N/M` or `N/A`; do not infer consumption from profile names.

| Dataset version | Task count | Initial FAST | Initial BALANCED | Initial DEEP | Initial MAX | Escalations | Repeated tests | Full regressions avoided | Attempts | PASS | FAIL | BLOCKED | Measurable consumption coverage | Median time to accepted result |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| `Data collection pending` | — | — | — | — | — | — | — | — | — | — | — | — | — | — |

## Evidence and Privacy Rules

- Preserve the original acceptance criteria and disclose changes in environment or requirements.
- Do not report a task as `VERIFIED` without the required acceptance evidence.
- Record raw platform consumption only when available; label estimates and their method explicitly.
- Do not publish private API keys, secrets, credentials, proprietary source code, customer data, or other sensitive information.
- Sanitize logs and paths before sharing a run.

Contributions should follow [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

