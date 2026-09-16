# TEMO Feedback Gateway Status

Current state: **DEPLOYED — HEALTH_PASS — SECRET_READY — LIVE_TEST_PENDING**

Gateway version: `0.1.0`
Production URL: `https://temo-feedback-gateway.cpu2turn.workers.dev`
Target Worker name: `temo-feedback-gateway`
Target repository: `luaysameer/temo-efficiency`

## Verified PASS

- Worker deployment succeeded from `main`.
- Production workers.dev URL is enabled.
- `GET /api/health` returns `ok: true`.
- Cloudflare secret `GITHUB_TOKEN` is configured and the health endpoint reports `ready: true`.
- Health response reports:
  - service: `TEMO Feedback Gateway`
  - version: `0.1.0`
  - target: `luaysameer/temo-efficiency`
  - endpoint: `/v1/feedback`
  - transport: `GitHub Issues`

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
- Example feedback payload.
- GitHub Actions validation workflow added.

## Current checkpoint

The gateway is deployed and secret-ready. Live acceptance testing remains before the endpoint is published as the canonical feedback transport inside `SKILL.md` and `TEMO_PORTABLE.md`.

## Not yet ACTIVE

Do not add the production gateway URL to `SKILL.md` or `TEMO_PORTABLE.md` until all live acceptance checks pass.

## Activation acceptance checks

1. Worker deploy succeeds. — PASS
2. `GET /api/health` returns `ok: true` and `ready: true`. — PASS
3. `GET /v1/schema` returns schema `1.0`.
4. Valid test payload creates exactly one GitHub Issue.
5. Repeating the same payload returns the existing Issue (`duplicate: true`).
6. `rawConversation` is rejected with HTTP 400.
7. `consent: false` is rejected with HTTP 400.
8. GitHub token is not present in source, responses, logs, or Issue body.
9. Created Issue contains only structured/redacted feedback.
10. Maintainer receives the expected GitHub notification according to repository notification settings.

After all checks PASS, update this file to:

`ACTIVE — LOCKED_PASS`

Then publish the canonical gateway URL into the TEMO skill/portable feedback transport rules.
