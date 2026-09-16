# TEMO Efficiency — Feedback Loop

TEMO Efficiency improves through **opt-in, evidence-based feedback** from real tasks.

The skill must never silently upload a user's conversation, screenshots, code, logs, prompts, account information, provider catalog, email address, or telemetry.

Feedback is detected and prepared locally/in-chat first. The user controls whether anything is submitted.

## Recommended transport architecture

### Canonical destination: GitHub Issues

The official system of record for TEMO feedback is the public repository issue tracker:

`https://github.com/luaysameer/temo-efficiency/issues`

Why GitHub Issues is preferred:

- each report has a permanent ID;
- reports are searchable and sortable;
- multiple users can confirm the same behavior;
- fixes can reference the original report;
- releases and changelog entries can link back to evidence;
- maintainers can label/close/merge duplicate reports;
- GitHub can deliver issue notifications to the repository owner's email according to the owner's GitHub notification settings.

Email should therefore be treated as a **notification channel**, not the canonical feedback database.

TEMO must not assume the repository owner's email address or try to send direct email unless a separate authorized mail integration is explicitly configured.

## Feedback modes

TEMO supports three user-controlled modes:

```text
ASK_BEFORE_SEND  — default
AUTO_ANONYMOUS   — only after explicit opt-in by the user
OFF              — detect nothing for submission
```

### ASK_BEFORE_SEND — default

TEMO may detect a useful signal and prepare a compact report, then ask once whether the user wants to submit it.

Do not interrupt every minor task. Ask only for meaningful signals.

### AUTO_ANONYMOUS — optional

This mode may be enabled only after explicit user consent in the current environment/session or through a persistent configuration the user controls.

In this mode TEMO may submit only structured, redacted metadata that does **not** include raw conversation text, screenshots, code, personal information, account identifiers, private URLs, secrets, or files.

If the transport cannot guarantee that restricted fields are excluded, fall back to `ASK_BEFORE_SEND`.

### OFF

Do not prepare or submit feedback unless the user explicitly requests it.

## Friction detector — automatic signal detection

TEMO should detect interaction friction during normal work. A friction signal does not mean the user did anything wrong; it means the workflow may have a reusable improvement opportunity.

### High-value signal codes

#### `REPEATED_MISUNDERSTANDING`
Trigger when the user has to restate or correct substantially the same intent **two or more times** because the agent still did not understand the requirement.

Example:

```text
User explains requirement
→ agent misunderstands
→ user corrects
→ agent misunderstands the same point again
→ user corrects again
```

Feedback should summarize:

- what requirement was repeatedly missed;
- how many corrections/retries occurred;
- the likely ambiguity or context failure;
- what instruction/rule could prevent the same loop.

Do not copy the full conversation by default.

#### `REPEATED_QUESTION`
Trigger when the agent asks the user for the same information again even though the information was already supplied and remained valid.

#### `CONTEXT_MISS`
Trigger when a previously explicit constraint, acceptance criterion, protected PASS state, provider catalog, or user-provided setting is ignored without evidence that it changed.

#### `EXECUTION_DRIFT`
Trigger when the user requested execution but the agent repeatedly reviews/explains instead of carrying out the requested bounded checkpoint where execution is available.

#### `ROUTING_TOO_WEAK`
Trigger when the selected profile/model/level cannot complete the unchanged checkpoint and an evidence-based escalation is required.

#### `ROUTING_TOO_STRONG`
Trigger when a clearly deterministic/narrow checkpoint was unnecessarily routed to a substantially stronger model/level than needed.

#### `CATALOG_DISCOVERY_FAIL`
Trigger when provider/model/level discovery cannot establish the real selectable catalog after following the defined discovery path.

#### `CATALOG_HALLUCINATION_FAIL`
Hard failure: the agent says it cannot verify the live picker/catalog but still invents or extrapolates exact alternative models/levels.

#### `BOOTSTRAP_FAIL`
Trigger when canonical repository, portable fallback, version refresh, or skill loading behaves incorrectly.

#### `TOOL_ENVIRONMENT_MISMATCH`
Trigger when a cloud environment is selected for work that requires local USB/filesystem/GPU/desktop/device access, or the reverse when materially inefficient.

#### `VERIFICATION_FAIL`
Trigger when the agent calls work VERIFIED without the required acceptance evidence, or repeated verification is unnecessarily broad.

#### `LOCKED_PASS_REGRESSION`
Trigger when previously protected verified behavior breaks after a later checkpoint.

#### `PORTABLE_FALLBACK_PASS`
Positive signal: a provider failed normal repository navigation but successfully recovered through `TEMO_PORTABLE.md` without repeated search loops.

#### `REGRESSION_GUARD_PASS`
Positive signal: a regression guard prevented repeated investigation/rework.

## Retry threshold

A single clarification is normal and should not automatically become negative feedback.

Default friction thresholds:

```text
1 clarification                       → normal
2 materially repeated corrections    → feedback candidate
3+ repeated corrections/questions    → high-confidence feedback candidate
same known information requested 2x  → feedback candidate
catalog fabrication                   → immediate hard-fail feedback candidate
```

Use judgment when the user intentionally changes the requirement; that is not a misunderstanding signal.

## Automatic diagnosis of the feedback

When a friction signal fires, TEMO should produce a concise diagnosis rather than merely saying "the AI did not understand."

Use:

```text
SIGNAL CODE:
CONFIDENCE: LOW / MEDIUM / HIGH
RETRY / CORRECTION COUNT:
MISSED CONTRACT:
LIKELY CAUSE:
EXPECTED TEMO BEHAVIOR:
PROPOSED RULE / DOC IMPROVEMENT:
```

Possible likely-cause classes include:

- ambiguous wording;
- missing provider/catalog evidence;
- prior context not reused;
- user constraint not promoted to protected state;
- poor checkpoint boundary;
- wrong tool/environment;
- model/level underpowered;
- unnecessary model/level over-routing;
- language/dialect interpretation problem;
- stale TEMO version;
- unsupported provider behavior;
- insufficient evidence / unknown.

Do not state a cause as certain when evidence is weak.

## Bilingual normalization

Feedback may originate in Arabic, English, or another language.

For maintainability, TEMO may normalize the report into:

```text
Original language: <language>
Short English summary: <1–3 lines>
ملخص عربي: <1–3 lines when useful>
```

Do not mistranslate technical names, model names, error messages, version numbers, or exact UI labels. Preserve exact technical labels separately.

## Compact feedback packet

```text
TEMO FEEDBACK
Feedback ID: <local/generated ID if available>
Mode: <ASK_BEFORE_SEND | AUTO_ANONYMOUS | MANUAL>
Signal Code: <code>
Confidence: <LOW | MEDIUM | HIGH>
Language: <Arabic | English | other>
Provider / Tool: <verified name or Unknown>
Plan / Surface: <only if user chooses to share>
TEMO Version: <loaded version>
Catalog Status: <VERIFIED_FULL | VERIFIED_CURRENT_ONLY | UNKNOWN>
Catalog Source: <host metadata | screenshot | pasted list | unknown>
Task Type: <short description>
Initial Profile: <FAST | BALANCED | DEEP | MAX | CURRENT_MODEL_ONLY>
Initial Level: <exact visible label if verified>
Escalation: <none or route taken>
Retry / Correction Count: <number>
Result: <PASS | PARTIAL | FAIL>
What happened: <2–5 concise lines>
Likely cause: <evidence-based, or Unknown>
Expected behavior: <short>
Proposed improvement: <optional>
Minimal evidence: <redacted, reproducible evidence only>
```

## Submission policy

### Path A — GitHub action available

If the current agent has permission to create GitHub issues in `luaysameer/temo-efficiency`:

1. prepare the compact packet;
2. redact restricted information;
3. in `ASK_BEFORE_SEND`, show the user the packet or a short summary and obtain explicit approval;
4. create a GitHub Issue using the TEMO Feedback form/format;
5. return the created issue number/link;
6. never claim submission unless the create action succeeded.

### Path B — no GitHub write action

Return the compact packet and point the user to:

`https://github.com/luaysameer/temo-efficiency/issues/new/choose`

The user can submit it manually through the TEMO Efficiency Feedback form.

### Path C — future provider-independent gateway

A future optional `TEMO Feedback Gateway` may accept structured feedback over HTTPS and create the GitHub Issue server-side.

Recommended architecture:

```text
AI / user
→ HTTPS POST structured packet
→ Cloudflare Worker
→ schema validation + rate limiting + abuse controls
→ redact/reject forbidden fields
→ GitHub App/server credential stored only in Worker secret storage
→ create GitHub Issue
→ GitHub notification system emails/notifies maintainer
```

The gateway must never expose a GitHub token/API secret to the client or prompt.

A public automatic endpoint also needs spam/rate-limit protection before production use. Until that gateway exists, GitHub Issues + Ask-before-send is the stable default.

## Why direct email is not the default

Direct email from arbitrary AI sessions is less reliable because:

- most AI environments do not have an authorized mail account;
- it would require storing or exposing a destination address and sender credentials;
- reports become fragmented across inbox threads;
- duplicate/related reports are harder to triage;
- email does not naturally connect fixes, commits, releases, and community confirmations.

Recommended flow:

```text
Feedback → GitHub Issue → GitHub notification → maintainer email/app notification
```

This gives both structured history and email visibility.

## Feedback safety

Before preparing/submitting feedback:

- redact passwords, API keys, tokens, private URLs, personal identifiers, account identifiers, confidential code, and private files;
- include only the minimum evidence needed to reproduce the behavior;
- do not upload full conversations by default;
- do not upload screenshots unless the user intentionally chooses to share them;
- do not send email addresses unless the user intentionally provides them for that purpose;
- never claim feedback was submitted unless an actual transport action completed.

## Agent behavior

Do not ask for feedback after every trivial task.

When a meaningful friction signal is detected in `ASK_BEFORE_SEND`, use a compact message such as:

```text
TEMO detected a reusable feedback signal: REPEATED_MISUNDERSTANDING (3 corrections).
I can prepare a redacted GitHub feedback report explaining what was repeatedly missed and the likely rule improvement. Send it? Yes / No.
```

If the user says yes and GitHub issue creation is available, create the Issue. Otherwise provide the ready-to-paste report.

## Maintainer triage

Group feedback by:

- misunderstanding/context reuse;
- provider discovery/catalog accuracy;
- routing quality;
- escalation quality;
- context/consumption efficiency;
- portability/bootstrap;
- tool/environment selection;
- verification/regression protection;
- documentation/usability;
- positive regression/portable wins.

Changes to routing or behavior rules should be backed by reproducible patterns rather than one-off preferences.
