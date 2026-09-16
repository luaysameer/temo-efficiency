# TEMO Efficiency — Catalog Confidence Gate

This gate prevents an AI from inventing or extrapolating provider identity, model names, reasoning levels, boost modes, or account capabilities.

## Purpose

Provider discovery is not complete merely because the assistant knows a company/tool name or can identify the currently active model. TEMO Efficiency needs enough verified information from the **current user account/product surface** to make a real routing choice.

Different accounts, plans, experiments, regions, apps, and product surfaces can expose different controls. Therefore provider name or plan name alone never proves the user's exact selectable catalog.

## Verified catalog sources

A provider/model/level option may be treated as VERIFIED only when it comes from at least one of these sources:

1. Host/runtime metadata that explicitly exposes the current provider and selectable model/control catalog.
2. User screenshot(s) showing the actual current UI: model picker, reasoning/level picker, and any relevant mode/boost control.
3. A pasted list from the user containing the exact visible provider/model/level choices.
4. An authoritative first-party catalog exposed to the agent that is current and demonstrably applicable to the user's exact environment/account surface.

## Unverified sources — never use for ladder construction

Do NOT build FAST/BALANCED/DEEP/MAX from:

- the model's own memory of product names;
- guesses based on provider brand, account tier, naming patterns, or model families;
- extrapolation from one visible/current model to other supposedly available models;
- stale documentation when current availability is not confirmed;
- generic web pages that do not establish the user's actual current choices;
- a statement such as "this provider usually offers...";
- assumptions that Free/paid/Pro-style plans expose a specific catalog.

If the assistant cannot identify one of the verified sources above, the catalog is NOT VERIFIED.

## Unknown provider gate

If the AI/tool itself is not reliably identified, do not guess it.

Ask either:

```text
Which AI/tool are you using?
```

or, if the user does not know:

```text
Send one screenshot showing the app/site header, sidebar, or settings page so I can identify the environment.
```

Only after the provider/tool is known should exact model/level discovery continue.

## Screenshot fallback — mandatory when catalog is not visible

If exact selectable models or levels are not authoritatively visible, request the smallest set of screenshots needed:

```text
Please send screenshots of:
1) the expanded model picker,
2) the expanded reasoning/level/thinking picker if separate,
3) the boost/speed/mode selector if present.
If the AI/tool itself is unclear, include one screenshot showing the app/site name or settings page.
```

If one screenshot contains all controls, one screenshot is enough.

If the user cannot send screenshots, request an exact pasted list instead.

Do not proceed to a full ladder until the missing catalog fields are verified.

## Active-model-known is not catalog-known

Knowing the current model does not automatically reveal all selectable alternatives.

Example:

```text
CURRENT MODEL: Sonnet X
FULL CATALOG: UNKNOWN
```

In this state TEMO must NOT invent alternatives. It must either:

- request screenshot(s) of the model + level picker, or
- ask for a pasted list of the exact choices.

If the current task can be safely completed with the already-active model and the user does not need a model switch, TEMO may operate in `CURRENT_MODEL_ONLY` mode for that checkpoint, but it must clearly state:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
```

and must not claim a full FAST/BALANCED/DEEP/MAX ladder exists.

## Full-ladder gate

Before outputting a session ladder containing exact model names, verify:

```text
PROVIDER KNOWN: YES
CURRENT ACCOUNT/PRODUCT SURFACE: VERIFIED OR NOT NEEDED
FULL SELECTABLE CATALOG KNOWN: YES
LEVEL/REASONING CONTROLS KNOWN: YES or Not exposed (verified)
BOOST/SPEED/MODE CONTROLS: VERIFIED or Not exposed (verified)
SOURCE: host metadata | user screenshot(s) | user pasted list | applicable first-party catalog
CATALOG CONFIDENCE: VERIFIED
```

Only then may TEMO output exact FAST/BALANCED/DEEP/MAX model names.

If `FULL SELECTABLE CATALOG KNOWN` is NO or uncertain:

```text
CATALOG CONFIDENCE: UNVERIFIED/PARTIAL
ACTION: Ask once for required screenshot(s) or pasted exact list.
```

Do not continue to a fabricated ladder.

## Provider-specific claims

Statements such as "this provider does not expose a reasoning control" or "this plan has only one model" must also be based on verified current UI/runtime/provider information. If not confirmed, say `Not visible / not verified` instead of asserting absence.

## Required behavior when blocked

Use the shortest useful request:

```text
I can’t verify the exact model + level choices available on your current AI/account yet.
Send screenshots of the expanded model picker and reasoning/level picker. If a boost/speed/mode control exists, include that too. If the AI/tool itself is unclear, include one screenshot showing the app/site header or settings page.
I’ll map the choices once and reuse them for this session.
```

## Regression conditions

The following are hard FAIL conditions:

> The assistant says it cannot see the live model picker/catalog, then immediately outputs exact alternative model names or a full ladder anyway.

> The assistant assumes the provider/tool or account tier and builds a catalog without verified current UI/runtime evidence.

Any cross-device/provider test must flag these behaviors as `CATALOG_HALLUCINATION_FAIL`.