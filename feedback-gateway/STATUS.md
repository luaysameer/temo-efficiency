# TEMO Feedback Gateway Status

Current state: **ACTIVE — LOCKED_PASS**

Gateway version: `0.1.1`
Production URL: `https://temo-feedback-gateway.cpu2turn.workers.dev`
Target Worker name: `temo-feedback-gateway`
Target repository: `luaysameer/temo-efficiency`

## Verified PASS

- Worker deployment succeeded from `main`.
- Production workers.dev URL is enabled.
- `GET /api/health` returns `ok: true`, `ready: true`, version `0.1.1`.
- Cloudflare secret `GITHUB_TOKEN` is configured and remains outside repository source.
- Browser acceptance console is live at `/test.html`.
- `GET /v1/schema` returns schema `1.0` and the expected privacy contract.
- Unsupported `rawConversation` is rejected with HTTP 400.
- `consent: false` is rejected with HTTP 400.
- Issue bodies contain only structured feedback fields; no raw conversation, code, logs, files, screenshots, email, or token value is present.
- Source review confirms the GitHub credential is referenced only through runtime secret binding `env.GITHUB_TOKEN`.

## Regression discovered and fixed

The first live acceptance run exposed an indexing race and created two Issues with the same fingerprint:

- `#2` — fingerprint `TFG-DB56C38CCCA1`
- `#3` — fingerprint `TFG-DB56C38CCCA1`

Issue `#3` was classified as the duplicate. Gateway `0.1.1` added layered dedupe protection using Cloudflare cache, direct GitHub Issue listing, a per-fingerprint rate-limit lock, in-flight wait/recheck, and a final pre-create recheck.

## 0.1.1 dedupe retest — PASS

Fresh retest fingerprint: `TFG-8E5FBF894399`

- First submission: HTTP 201, `duplicate: false`, Issue `#4`.
- Immediate duplicate submission: HTTP 200, `duplicate: true`, Issue `#4`.
- GitHub repository search confirmed only one Issue exists for `TFG-8E5FBF894399`.

This closes the duplicate race regression for the verified acceptance path.

## Active contract

- Canonical endpoint: `POST https://temo-feedback-gateway.cpu2turn.workers.dev/v1/feedback`
- Health: `GET https://temo-feedback-gateway.cpu2turn.workers.dev/api/health`
- Schema: `GET https://temo-feedback-gateway.cpu2turn.workers.dev/v1/schema`
- Browser acceptance console: `GET https://temo-feedback-gateway.cpu2turn.workers.dev/test.html`
- Structured feedback only.
- User consent required unless the user has explicitly enabled `AUTO_ANONYMOUS` under the TEMO contract.
- Do not transmit raw conversations, code, logs, files, screenshots, email addresses, or secrets.
- Never claim a feedback report was submitted unless the gateway returns success and an Issue URL/number.

## Notification note

GitHub push/email delivery is an external account-notification setting and is not part of the gateway transport acceptance lock. The canonical Issue creation path is verified independently of whether a maintainer has push/email notifications enabled.
