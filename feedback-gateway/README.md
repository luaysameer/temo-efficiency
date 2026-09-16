# TEMO Feedback Gateway

Cloudflare Worker that accepts **structured, consented TEMO Efficiency feedback** and creates a GitHub Issue in `luaysameer/temo-efficiency` without exposing the GitHub token to the user or AI provider.

## Architecture

```text
ChatGPT / Claude / Codex / Gemini / other AI
        |
        | structured JSON only
        v
TEMO Feedback Gateway (Cloudflare Worker)
        |
        | validation + redaction + rate limit + duplicate check + daily cap
        v
GitHub Issues: luaysameer/temo-efficiency
        |
        v
GitHub app/email notifications to the maintainer
```

## Security / privacy contract

The gateway deliberately accepts a small allowlist of fields. It rejects arbitrary extra fields and does **not** accept:

- raw conversations;
- raw prompts;
- source code;
- logs;
- files/attachments;
- screenshots;
- email addresses;
- passwords, API keys or tokens.

The Worker also applies best-effort secret redaction to accepted text fields before creating an Issue.

The GitHub credential is stored only as the Cloudflare Worker secret `GITHUB_TOKEN`.

## Endpoints

- `GET /api/health` — service health, version and safe readiness state.
- `GET /v1/schema` — machine-readable accepted schema.
- `POST /v1/feedback` — submit structured feedback.

`/api/health` returns `ready: false` until `GITHUB_TOKEN` is configured. This allows the first Worker deployment to succeed safely before the secret is added. Feedback POSTs return HTTP 503 while the transport is not configured.

## Feedback modes

- `MANUAL`
- `ASK_BEFORE_SEND` — recommended default.
- `AUTO_ANONYMOUS` — only after explicit user opt-in in the AI environment.

All requests still require `consent: true`.

## Required GitHub token

Create a **fine-grained GitHub personal access token** restricted to the `luaysameer/temo-efficiency` repository with the minimum permissions needed for Issues:

- Repository access: only `temo-efficiency`.
- Issues: Read and write.
- Metadata: Read.

Do not commit the token.

After the first Worker deployment, add it as the Cloudflare runtime secret `GITHUB_TOKEN` under **Settings → Variables & Secrets**. You can also use Wrangler:

```bash
npx wrangler secret put GITHUB_TOKEN
```

Cloudflare Secrets are intended for sensitive values such as API tokens and expose the value to Worker code through `env` without putting the secret in source control.

## Cloudflare deployment — Git integration

Recommended setup:

1. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Import a repository**.
2. Select `luaysameer/temo-efficiency`.
3. Worker name: `temo-feedback-gateway`.
4. Production branch: `main`.
5. Root directory: `feedback-gateway`.
6. Build command: leave empty.
7. Deploy command: `npx wrangler deploy`.
8. Save and deploy.
9. Open the generated Worker URL and check `/api/health` — first deploy should show `ok: true` and `ready: false`.
10. Add runtime secret `GITHUB_TOKEN` under Worker **Settings → Variables & Secrets**.
11. Check `/api/health` again — it must now show `ready: true`.

Cloudflare Workers Builds supports a repository root directory for monorepos and defaults the deploy command to `npx wrangler deploy`.

The Worker name in Cloudflare must match the `name` in `wrangler.jsonc`.

## Rate limiting and abuse caps

Two Cloudflare Rate Limiting bindings are configured:

- `CLIENT_RATE_LIMITER`: **3 submissions/minute** per pseudonymous client key.
- `GLOBAL_RATE_LIMITER`: **12 submissions/minute** per Cloudflare location for the gateway.

The client key is SHA-256 hashed before it is used as the rate-limit key and is never written into the GitHub Issue.

The configured rate-limit namespace IDs must be unique within the Cloudflare account. If `9515001` or `9515002` are already used by another Worker rate-limit binding in the same account, change them before deployment.

The Worker also checks the number of gateway-created Issues for the current UTC day and stops creating new Issues when `MAX_DAILY_ISSUES` is reached. The default is **100/day**.

This daily cap is enforced through GitHub's Issue search, so it remains global even when requests arrive through different Cloudflare locations.

## Duplicate protection

The Worker generates a deterministic feedback fingerprint from:

- TEMO version;
- provider/tool;
- signal code;
- missed contract;
- observed behavior;
- expected behavior.

The fingerprint is included in the Issue title as `TFG-XXXXXXXXXXXX`. Before creating a new Issue, the gateway searches the repository for the same fingerprint and returns the existing Issue when found.

## Example request

See [`example-feedback.json`](example-feedback.json).

Example:

```bash
curl -X POST "https://<your-worker>.workers.dev/v1/feedback" \
  -H "Content-Type: application/json" \
  --data-binary @example-feedback.json
```

Successful new submission:

```json
{
  "ok": true,
  "duplicate": false,
  "fingerprint": "TFG-...",
  "issueNumber": 12,
  "issueUrl": "https://github.com/luaysameer/temo-efficiency/issues/12"
}
```

## Test order after deployment

1. `GET /api/health` before secret → `ok: true`, `ready: false`.
2. Add `GITHUB_TOKEN` as a Cloudflare runtime secret.
3. `GET /api/health` after secret → `ready: true`.
4. `GET /v1/schema` → schema `1.0`.
5. Submit `example-feedback.json` → GitHub Issue created.
6. Submit the same payload again → `duplicate: true`, no second Issue.
7. Send an unsupported field such as `rawConversation` → HTTP 400.
8. Send `consent: false` → HTTP 400.
9. Exceed client rate limit → HTTP 429.
10. Confirm the created Issue contains no client ID, email, raw conversation, code, logs, or token.

## After the gateway URL is verified

Only after live tests PASS should `SKILL.md`, `TEMO_PORTABLE.md`, and `docs/FEEDBACK_LOOP.md` be updated with the canonical gateway URL and automatic submission behavior.

Do not point the public skill at an unverified endpoint.
