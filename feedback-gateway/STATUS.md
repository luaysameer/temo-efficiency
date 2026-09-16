# TEMO Feedback Gateway Status

Current state: **REGRESSION_FOUND — DEDUPE_FIX_DEPLOYING — RETEST_REQUIRED**

Gateway version: `0.1.1`
Production URL: `https://temo-feedback-gateway.cpu2turn.workers.dev`
Target Worker name: `temo-feedback-gateway`
Target repository: `luaysameer/temo-efficiency`

## Verified PASS

- Worker deployment succeeded from `main`.
- Production workers.dev URL is enabled.
- `GET /api/health` returned `ok: true` and `ready: true` on gateway `0.1.0`.
- Cloudflare secret `GITHUB_TOKEN` is configured.
- Browser acceptance console is live at `/test.html`.
- `GET /v1/schema` returned schema `1.0` and the expected privacy contract.
- Unsupported `rawConversation` was rejected with HTTP 400.
- `consent: false` was rejected with HTTP 400.
- Issue bodies contain only structured feedback fields; no raw conversation, code, logs, files, screenshots, email, or token value was present.
- Source review confirms the GitHub credential is referenced only through runtime secret binding `env.GITHUB_TOKEN`.

## Regression discovered from acceptance screenshots

The first live acceptance run created **two GitHub Issues with the same fingerprint**:

- `#2` — fingerprint `TFG-DB56C38CCCA1` — created `2026-09-16T09:07:03Z`
- `#3` — fingerprint `TFG-DB56C38CCCA1` — created `2026-09-16T09:07:05Z`

This exposed an indexing race in the original duplicate check: it relied on GitHub Search, which can lag immediately after Issue creation. Issue `#3` has been closed with state reason `duplicate`; Issue `#2` remains the canonical first test Issue.

## Dedupe fix in gateway 0.1.1

The duplicate guard now uses layered protection:

1. Cloudflare cache lookup for a recently created fingerprint.
2. Direct GitHub repository Issue listing for the newest 100 Issues before falling back to GitHub Search.
3. A dedicated per-fingerprint Cloudflare rate-limit lock (`FINGERPRINT_RATE_LIMITER`, namespace `9515003`, limit 1 / 10 seconds).
4. On an in-flight duplicate, the Worker waits and rechecks for the canonical Issue instead of creating another Issue.
5. A final direct recheck runs immediately before Issue creation.
6. The browser test console now generates a fresh test-run UUID on every page load so a retest cannot accidentally reuse the old acceptance fingerprint.

## Retest required

After Cloudflare deploys `0.1.1` from `main`:

1. `GET /api/health` must report version `0.1.1`, `ok: true`, `ready: true`.
2. Reload `/test.html` to obtain a new Run UUID.
3. Press **Create test Issue** once — expect HTTP 201 and one new Issue.
4. Immediately press **Duplicate test** — expect HTTP 200, `duplicate: true`, and the **same issueNumber / issueUrl**.
5. Confirm the repository contains only one Issue for that new fingerprint.
6. Repeat privacy and consent rejection tests if desired; prior checks already PASS.
7. Confirm maintainer notification behavior.

## Not yet ACTIVE

Do not publish the production gateway URL into `SKILL.md` or `TEMO_PORTABLE.md` until the 0.1.1 dedupe retest passes.

After the retest passes, set:

`ACTIVE — LOCKED_PASS`

Then publish the canonical gateway URL into the TEMO skill/portable feedback transport rules.
