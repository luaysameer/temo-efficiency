# TEMO Efficiency Roadmap

This roadmap separates the current stable foundation from planned work and candidates. Items below do not imply implementation until they ship and are documented in a release.

## v1.0 — Current Stable Foundation

Implemented in the current stable release:

- five-axis task scoring across complexity, risk, scope, verification burden, and uncertainty
- generic FAST / BALANCED / DEEP / MAX capability routing
- micro-checkpoint execution contracts
- evidence-based one-step escalation
- targeted verification with broader regression rules for shared or high-risk surfaces
- regression-lock protection for important PASS states
- separation of `IMPLEMENTED` and `VERIFIED`
- configurable, future-proof model ladder

## v1.1 — Planned

Planned documentation and community-validation work:

- stronger Quick Start
- benchmark framework
- community testing
- more routing examples
- improved Codex workflow examples

These items are roadmap goals. Documentation may evolve on `main` before a v1.1 release is created; their appearance in the repository does not create or announce that release.

## v1.2 — Candidates

Candidate ideas, not implemented commitments:

- automatic task scoring helper
- reusable routing presets
- richer regression-lock templates
- benchmark dataset
- community-contributed model ladders

Candidate scope and sequencing should be driven by measured benchmark data and sanitized real-workflow feedback. See [`BENCHMARK.md`](BENCHMARK.md) and [`../CONTRIBUTING.md`](../CONTRIBUTING.md).

