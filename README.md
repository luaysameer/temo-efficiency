# TEMO Efficiency

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Smart model routing + micro-checkpoint execution for GPT/Codex-style workflows.**

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

TEMO Efficiency is a portable agent skill built from the **TEMO × AREEN** workflow: a practical method for reducing wasted AI credits/tokens without turning quality down.

The idea is simple: expensive reasoning should be spent on difficult work, not on every task by default. A rename, deterministic parser check, focused bug fix, architecture migration, and production-security incident should not all receive the same model and effort level.

## Why this exists

Long AI-assisted projects often waste usage in predictable ways:

- the strongest model is selected for routine work
- the same verified area gets re-audited repeatedly
- huge conversation histories are resent for a narrow fix
- full regression suites run after tiny isolated changes
- a later change reintroduces a bug that was already fixed
- agents summarize an implementation checkpoint instead of executing it
- “implemented” is confused with “verified in the real environment”

TEMO Efficiency turns those problems into explicit routing and execution rules.

## What it does

The skill scores each checkpoint by **complexity, risk, scope, verification burden, and uncertainty**. It then recommends a capability profile:

| Score | Profile | Typical effort | Best for |
|---:|---|---|---|
| 0-2 | FAST | Low | deterministic edits, extraction, formatting, narrow checks |
| 3-5 | BALANCED | Medium | focused coding, normal debugging, targeted integrations |
| 6-8 | DEEP | Medium/High | architecture, difficult regressions, coupled systems |
| 9-10 | MAX | High | exceptional complexity, high-risk or deeply ambiguous work |

The profile names are deliberately generic. Model catalogs change. Configure FAST/BALANCED/DEEP/MAX to the models your environment actually exposes instead of hardcoding yesterday's model names.

## The key principle: save waste, not quality

This project is **not** a quota bypass and does not promise “unlimited” usage. It does not weaken acceptance criteria to save credits.

It reduces avoidable usage by:

1. selecting the smallest capable model for the current checkpoint,
2. splitting large jobs into micro-checkpoints,
3. preserving previously verified work,
4. using targeted tests when the change surface is narrow,
5. escalating only when diagnostics justify it,
6. adding regression guards after important fixes,
7. stopping at the requested boundary instead of expanding scope.

## Example

Suppose a production web app has a server-picker bug.

A wasteful workflow might send the whole project to the strongest model, rerun every test, re-audit unrelated authentication and catalog code, and then continue redesigning the UI after the bug is fixed.

TEMO Efficiency instead creates a checkpoint such as:

```text
Tool: Codex
Profile: BALANCED or DEEP depending on uncertainty
Effort: Medium
Deploy: YES only after protected tests pass

Objective: Fix typed server-picker dispatch only.
Protected: Catalog, authentication, provider validation, existing routing contract.
Success: Reproduce the bad path, fix it, add one permanent regression test, pass protected tests.
Stop: Return the report. Do not start the next feature.
```

If the root cause remains unclear after diagnostics, the workflow escalates one capability level while preserving the evidence already gathered.

## Two-line execution header

A common agent failure is receiving a detailed checkpoint and replying, “What would you like me to do with it?”

TEMO Efficiency therefore includes an explicit dual execution header:

```text
EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

THIS IS AN IMPLEMENTATION COMMAND, NOT A REVIEW REQUEST. COMPLETE THE CHECKPOINT, RUN THE REQUIRED TESTS, DEPLOY IF ALLOWED AND PASSING, THEN RETURN THE REQUESTED FINAL REPORT. BEGIN NOW.
```

Use it only when execution is actually intended.

## Micro-checkpoint anatomy

A good checkpoint contains:

- exact objective
- model/profile and effort
- deploy permission
- relevant current state
- protected work that must not regress
- exact tests to run
- success condition
- stop condition
- exact final report fields

This makes continuation cheap: the next agent does not need the entire project history to know what is already proven.

## Regression-lock philosophy

One of the biggest sources of wasted AI usage is paying twice for the same bug.

When an important bug is fixed, TEMO Efficiency asks for the smallest permanent regression guard that proves the broken contract. Later checkpoints touching that area must run the protected guard before deployment.

The intended lifecycle is:

```text
diagnose -> fix -> targeted test -> regression guard -> deploy -> real acceptance -> protect PASS
```

not:

```text
fix -> forget -> unrelated change -> same bug returns -> debug everything again
```

## Installation / use

### Systems that support `SKILL.md`

Copy this repository into your skills directory and enable `temo-efficiency` according to your agent platform's skill-loading mechanism.

### GPT / ChatGPT / other agents without a skill loader

Use `SKILL.md` as project instructions, or paste the relevant routing/checkpoint rules into your persistent project instructions.

### Codex-style workflow

Use `templates/CHECKPOINT.md` to prepare a micro-checkpoint and prepend `templates/EXECUTION_HEADER.md` before sending it to the implementation agent.

## Configure your model ladder

Copy:

```text
config/model-ladder.example.yaml
```

and map the profiles to models available in your environment. The skill routes by capability, so the workflow survives model renames and new releases.

## Repository structure

```text
TEMO-Efficiency/
├── SKILL.md
├── README.md
├── README.ar.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── config/
│   └── model-ladder.example.yaml
├── templates/
│   ├── CHECKPOINT.md
│   └── EXECUTION_HEADER.md
└── examples/
    └── EXAMPLES.md
```

## Design goals

- **Model-aware:** route by capability, not habit.
- **Credit-aware:** avoid unnecessary expensive reasoning and repeated work.
- **Quality-preserving:** acceptance criteria never shrink to save usage.
- **Regression-resistant:** important PASS states become protected contracts.
- **Portable:** no dependency on one specific current model catalog.
- **Auditable:** every checkpoint states why its model/effort level was selected.

## What this project does not do

TEMO Efficiency does not circumvent platform limits, billing, plan restrictions, rate limits, or safety controls. Actual savings depend on workload, model pricing, context size, and agent behavior.

## Origin

This workflow was developed through iterative real-project use under the **TEMO × AREEN** collaboration method: split the work, choose the capability the checkpoint actually deserves, verify precisely, and preserve what already passed.

## Support the project

If TEMO Efficiency saves you time or AI usage, **star the repository** so more builders can discover it. Real-world routing examples and improvements are welcome.

## Contributing

Ideas are welcome, especially reproducible examples showing where the router chose too much or too little capability. See `CONTRIBUTING.md`.

## License

MIT — use it, adapt it, and improve it.

---

### العربية

**TEMO Efficiency** هي مهارة لتنظيم شغل GPT/Codex بحيث ما نستخدم أقوى موديل بشكل عشوائي لكل مهمة. تقسّم المشروع إلى Checkpoints صغيرة، تختار أقل مستوى قدرات يكفي للمهمة، تحافظ على الشغل الذي اجتاز الاختبار، وتصعّد للموديل الأقوى فقط عندما توجد أسباب فعلية.

للشرح العربي الكامل: `README.ar.md`.
