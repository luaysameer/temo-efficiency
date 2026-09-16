# TEMO Feedback Gateway Status

Current state: **CODE_READY — DEPLOYMENT_PENDING**

Gateway version: `0.1.0`
Target Worker name: `temo-feedback-gateway`
Target repository: `luaysameer/temo-efficiency`

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

## Not yet ACTIVE

Do not add a production gateway URL to `SKILL.md` or `TEMO_PORTABLE.md` until all live acceptance checks pass.

## Activation acceptance checks

1. Worker deploy succeeds.
2. `GET /api/health` returns `ok: true`.
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
