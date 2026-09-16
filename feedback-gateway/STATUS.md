# TEMO Feedback Gateway Status

Current state: **DEPLOYED — LIVE_ACCEPTANCE_PASS — NOTIFICATION_PENDING**

Gateway version: `0.1.0`
Production URL: `https://temo-feedback-gateway.cpu2turn.workers.dev`
Target Worker name: `temo-feedback-gateway`
Target repository: `luaysameer/temo-efficiency`

## Verified PASS

- Worker deployment succeeded from `main`.
- Production workers.dev URL is enabled.
- `GET /api/health` returns `ok: true` and `ready: true`.
- Cloudflare secret `GITHUB_TOKEN` is configured.
- Browser acceptance console is live at `/test.html`.
- `GET /v1/schema` returns schema `1.0` and the expected privacy contract.
- A valid structured browser test created GitHub Issue `#3` with fingerprint `TFG-DB56C38CCCA1`.
- Repeating the identical payload returned the same Issue with `duplicate: true` and HTTP 200; no second Issue was created.
- An unsupported `rawConversation` field was rejected with HTTP 400 and `unsupported_field:rawConversation`.
- `consent: false` was rejected with HTTP 400 and `consent_must_be_true`.
- Issue `#3` was inspected directly and contains only structured feedback fields; no raw conversation, code, logs, files, screenshots, email, or token value is present.
- Source review confirms the GitHub credential is referenced only through the runtime secret binding `env.GITHUB_TOKEN`; the token value is not stored in repository source or returned by the gateway responses.

## Implemented

- Structured JSON feedback endpoint.
- Consent required.
- Strict allowlist schema; arbitrary fields rejected.
- Raw conversation / prompt / code / logs / files / screenshots / email are not accepted.
- Best-effort secret redaction.
- Cloudflare client rate limit: 3/minute.
- Cloudflare gateway rate limit: 12/minute per Cloudflare location.
- GitHub-backed daily Issue cap: 100/day by default.
- Deterministic duplicate fingerprint and existing-Issue reuse.
- GitHub fine-grained token kept as Cloudflare `GITHUB_TOKEN` secret only.
- Health endpoint.
- Machine-readable schema endpoint.
- Browser acceptance console.
- Example feedback payload.
- GitHub Actions validation workflow added.

## Current checkpoint

The production gateway has passed the live API acceptance checks. One final operational acceptance check remains: confirm that the maintainer receives the expected GitHub notification according to repository notification settings.

## Not yet ACTIVE

Do not add the production gateway URL to `SKILL.md` or `TEMO_PORTABLE.md` until the notification check also passes.

## Activation acceptance checks

1. Worker deploy succeeds. — PASS
2. `GET /api/health` returns `ok: true` and `ready: true`. — PASS
3. Browser acceptance console `/test.html` renders. — PASS
4. `GET /v1/schema` returns schema `1.0`. — PASS
5. Valid test payload creates exactly one GitHub Issue. — PASS (`#3`)
6. Repeating the same payload returns the existing Issue (`duplicate: true`). — PASS
7. `rawConversation` is rejected with HTTP 400. — PASS
8. `consent: false` is rejected with HTTP 400. — PASS
9. GitHub token is not present in repository source, gateway responses, or Issue body; runtime code does not log the token value. — PASS
10. Created Issue contains only structured/redacted feedback. — PASS
11. Maintainer receives the expected GitHub notification according to repository notification settings. — PENDING USER CONFIRMATION

After check 11 passes, update this file to:

`ACTIVE — LOCKED_PASS`

Then publish the canonical gateway URL into the TEMO skill/portable feedback transport rules.
