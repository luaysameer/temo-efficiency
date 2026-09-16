# TEMO Efficiency — Catalog Confidence Gate

This gate prevents an AI from inventing or extrapolating model names, reasoning levels, boost modes, or provider capabilities.

## Purpose

Provider discovery is not complete merely because the assistant knows which company/tool it is using or can identify the currently active model. TEMO Efficiency needs enough verified catalog information to make a real routing choice.

## Verified catalog sources

A model/level option may be treated as VERIFIED only when it comes from at least one of these sources:

1. Host/runtime metadata that explicitly exposes the current selectable model catalog or exact available controls.
2. A screenshot from the user showing the actual model/level picker.
3. A pasted list from the user containing the exact visible model/level choices.
4. An authoritative provider catalog exposed to the agent by a current first-party tool/source and applicable to the user's environment.

## Unverified sources — never use for ladder construction

Do NOT build FAST/BALANCED/DEEP/MAX from:

- the model's own memory of product names;
- guesses based on naming patterns or model families;
- extrapolation from one visible/current model to other supposedly available models;
- stale documentation when current availability is not confirmed;
- web snippets that do not establish the user's actual available catalog;
- a statement such as "I think these models exist" or "this provider usually offers...".

If the assistant cannot cite or identify one of the verified catalog sources above, the catalog is NOT VERIFIED.

## Active-model-known is not catalog-known

Knowing the current model does not automatically reveal all selectable alternatives.

Example:

```text
CURRENT MODEL: Sonnet X
FULL CATALOG: UNKNOWN
```

In this state TEMO must NOT invent Haiku/Opus/Fable/etc. It must either:

- request one screenshot of the model + level picker, or
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
ACTIVE MODEL KNOWN: YES/NO
FULL SELECTABLE CATALOG KNOWN: YES
LEVEL/REASONING CONTROLS KNOWN: YES or Not exposed (verified)
SOURCE: host metadata | user screenshot | user pasted list | authoritative first-party catalog
CATALOG CONFIDENCE: VERIFIED
```

Only then may TEMO output exact FAST/BALANCED/DEEP/MAX model names.

If `FULL SELECTABLE CATALOG KNOWN` is NO or uncertain:

```text
CATALOG CONFIDENCE: UNVERIFIED/PARTIAL
ACTION: Ask once for screenshot or pasted list.
```

Do not continue to a fabricated ladder.

## Provider-specific claims

Statements such as "this provider does not expose a reasoning control" must also be based on verified current UI/runtime/provider information. If not confirmed, say `Not visible / not verified` instead of asserting absence.

## Required behavior when blocked

Use the shortest question possible:

```text
I can see/identify your current AI environment, but I cannot verify the full selectable model + level catalog. Send one screenshot of the model/level picker, or paste the exact choices shown there. I will map them once and reuse that ladder for this session.
```

## Regression condition

The following is a hard FAIL:

> The assistant says it cannot see the live model picker/catalog, then immediately outputs exact alternative model names or a full ladder anyway.

Any cross-device/provider test must flag that behavior as `CATALOG_HALLUCINATION_FAIL`.
