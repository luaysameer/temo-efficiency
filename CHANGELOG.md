# Changelog

## 1.6.0 — OpenAI cost-aware routing & Mega X ReBurn trial

### Added

- Dated, user-verified ChatGPT Work/Codex ladder for GPT-6 Luna, GPT-6.1 Sol, and GPT-6 Astra.
- Explicit Standard-vs-Fast/Turbo rule: speed controls latency/cost, not reasoning quality.
- Ready-to-run Mega X ReBurn checkpoint map and first implementation command.
- Machine-readable OpenAI routing preset.

### Changed

- Route every checkpoint independently; Astra is an escalation lane, not a permanent project default.
- Updated Arabic and English quick-start guidance and version manifest.

## 1.5.0 — Provider-aware routing, portable bootstrap, auto-refresh & feedback

Major evolution of TEMO Efficiency from a model-routing workflow into a provider-aware execution behavior contract.

### Added

- Mandatory `EXECUTION CHOICE` before executable commands: Tool / Environment, exact verified Model, TEMO Profile, Level / Effort, Boost / Speed, Consumption, Deploy state, and a concise reason.
- Provider discovery for ChatGPT/OpenAI, Codex, Claude/Claude Code, Gemini, Cursor, Copilot, Cloud Code, local models, and other AI tools.
- Screenshot / pasted-list fallback when the current provider model catalog or reasoning levels are not visible.
- Catalog Confidence Gate preventing fabricated provider/model/level ladders.
- `CURRENT_MODEL_ONLY` mode when the active model is known but the full selectable catalog is not verified.
- Hard regression classification: `CATALOG_HALLUCINATION_FAIL`.
- Universal bootstrap with full-repository, raw-portable, and no-web access modes.
- Self-contained `TEMO_PORTABLE.md` for providers that cannot reliably browse GitHub.
- One-failed-GitHub-lookup fallback rule to prevent repeated repository search/index loops.
- Cross-device/provider verification tests.
- Session-local model ladder mapped only from verified real choices.
- Local-vs-cloud execution selection for USB, filesystem, GPU, desktop, and attached-device tasks.
- Canonical version manifest: `TEMO_LATEST.md`.
- Session-start auto-refresh rule: check the canonical manifest once and load newer rules when reachable.
- Opt-in evidence-based feedback loop with no silent telemetry.
- GitHub Feedback Issue Form with Arabic/English support.
- Expanded Arabic and English usage documentation.

### Changed

- Routing now operates on the current checkpoint and the user's actual verified catalog rather than a hardcoded model list.
- Provider name, account tier, or one active model no longer counts as proof of the full selectable catalog.
- TEMO preserves `PASS`, `VERIFIED`, and `LOCKED_PASS` work across escalation and rule refreshes.
- Escalation remains strictly `FAST → BALANCED → DEEP → MAX`, one step at a time and only with evidence.
- `IMPLEMENTED` remains distinct from `VERIFIED`; acceptance evidence is still required.

### Privacy & safety

- TEMO does not silently upload conversations, prompts, screenshots, code, logs, account information, model catalogs, or telemetry.
- Feedback is opt-in and should contain only minimal reproducible evidence with secrets/private data removed.
- Auto-refresh updates behavior from the canonical repository when available; arbitrary user sessions do not self-modify the canonical repository.

### Core principle

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

## 1.0.0 — Initial public release

- Added five-axis task scoring.
- Added FAST / BALANCED / DEEP / MAX capability routing.
- Added micro-checkpoint execution contract.
- Added dual execution header.
- Added regression-lock workflow.
- Added IMPLEMENTED vs VERIFIED distinction.
- Added configurable model ladder.
- Added English and Arabic documentation.
