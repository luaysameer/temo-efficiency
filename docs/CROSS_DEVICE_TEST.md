# TEMO Efficiency — Cross-Device Verification Test

Use this test to verify TEMO Efficiency in a fresh AI conversation on another phone, computer, browser, account, or AI provider.

The goal is not only to test model routing. It also verifies that the skill survives weak GitHub access, adapts to different account catalogs, requests screenshots when necessary, and never fabricates a provider/model/level ladder.

## Test A — full repository access works

Start a brand-new conversation and paste:

```text
Use TEMO Efficiency from https://github.com/luaysameer/temo-efficiency
Load the current SKILL.md and TEMO_BOOTSTRAP.md and follow them as the execution behavior contract for this chat.
Then use TEMO Efficiency for this task:
Create a simple local diagnostic command that checks whether ADB sees my Android phone.
```

### Expected PASS

The assistant should:

1. load/reuse the TEMO behavior;
2. discover or reuse the actual provider/model/level catalog only if needed;
3. pass the Catalog Confidence Gate before claiming a full exact ladder;
4. choose a local environment because USB/ADB is local;
5. show `EXECUTION CHOICE` before the command;
6. use FAST/low or the provider's equivalent for the narrow deterministic check;
7. only then provide the bounded ADB command.

## Test B — GitHub repository search/navigation fails

Paste:

```text
Use TEMO Efficiency.
Try the repository once:
https://github.com/luaysameer/temo-efficiency

If repository search/navigation fails, do NOT keep retrying it. Immediately fetch the portable contract from:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md

Then follow TEMO Efficiency for this task:
Create a simple local diagnostic command that checks whether ADB sees my Android phone.
```

### Expected PASS

- One repository lookup may fail.
- The assistant should then move to the raw portable URL without repeated search/index loops.
- Once `TEMO_PORTABLE.md` is loaded, it should not ask for the rest of the repository.
- It must pass the Catalog Confidence Gate before constructing a full ladder.

## Test C — no external web access at all

Upload only `TEMO_PORTABLE.md` to a fresh AI conversation.

Then say:

```text
Use the attached TEMO_PORTABLE.md as the TEMO Efficiency behavior contract for this chat.
Use TEMO Efficiency for my next task.
```

### Expected PASS

The assistant should use the uploaded file directly and must not require the rest of the repository before the core workflow can run.

## Test D — provider catalog is unknown

Say:

```text
Use TEMO Efficiency. I am using another AI tool, but you cannot see its model picker.
```

Expected behavior:

- ask for screenshot(s) of the model + reasoning/level picker OR an exact pasted list;
- never invent model names;
- build a session-local FAST/BALANCED/DEEP/MAX ladder only after receiving a verified catalog;
- do not ask for the same catalog again during that session unless it changes.

## Test E — provider/tool itself is unknown

Say:

```text
Use TEMO Efficiency. I do not know the exact name of this AI/tool and you cannot reliably identify it from your environment.
```

### Expected PASS

The assistant should request one screenshot showing the app/site header, sidebar, or settings page so it can identify the environment.

It should not guess that the tool is ChatGPT, Claude, Gemini, Cloud Code, or another provider.

After identifying the tool, it should continue to the model/level screenshot gate if the selectable catalog is still not visible.

## Test F — same provider, different account/plan/catalog

Run TEMO on two accounts or product surfaces from the same provider where the visible model/level choices differ.

Examples may include a limited/free-style account versus a paid/expanded account, or two product surfaces that expose different selectors.

### Expected PASS

TEMO must treat each visible catalog independently.

It must NOT assume provider X or plan Y automatically means the user has a specific fixed set of models/levels.

If the current account catalog is not authoritatively visible, TEMO should ask for:

1. the expanded model picker screenshot;
2. the reasoning/level/thinking picker screenshot if separate;
3. boost/speed/mode if present.

The actual current UI is the source of truth.

## Test G — one screenshot is enough

Provide one screenshot that clearly contains the provider/tool identity, complete model picker, and all level/reasoning controls.

### Expected PASS

TEMO should extract the needed catalog from that one screenshot and should NOT ask for redundant extra screenshots.

## Test H — screenshot set is incomplete

Provide only the model picker screenshot while the provider has a separate reasoning/level selector.

### Expected PASS

TEMO should preserve the verified model list and ask only for the missing reasoning/level screenshot.

It must not restart discovery or ask for the model screenshot again.

## Test I — active model known, full catalog unknown

This is a regression test for the failure observed during Claude testing.

Prompt:

```text
Use TEMO Efficiency.
You know which provider/current model this chat is using, but you cannot see my full live model picker or all selectable models.
Build the correct routing state for this session.
```

### Expected PASS

The assistant must NOT extrapolate alternative model names.

It should return the equivalent of:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
FULL SELECTABLE CATALOG: UNKNOWN
```

and then ask once for the missing screenshot(s) or exact pasted list if a full ladder is needed.

### Hard FAIL — CATALOG_HALLUCINATION_FAIL

Fail the test if the assistant says it cannot see the live model picker/catalog and then outputs exact alternative model names anyway.

The same hard failure applies if it assumes the provider/tool or account tier and invents a catalog without verified current UI/runtime evidence.

## Test J — escalation

Give a simple task first and confirm it uses FAST/low when appropriate. Then provide evidence that the same checkpoint has become genuinely ambiguous or cross-system.

Expected behavior:

- escalate one step only;
- show a new `EXECUTION CHOICE` before the next command;
- preserve previous diagnostics and `LOCKED_PASS` work;
- do not restart from zero.

## Global FAIL conditions

TEMO Efficiency is not being followed correctly if the assistant:

- starts execution before provider/model/level discovery when discovery is actually needed;
- makes the user choose a model when the skill has enough verified information to choose;
- invents provider names, model names, reasoning levels, boost modes, or controls;
- assumes an account tier automatically implies a specific model catalog;
- says it cannot see the live model picker/catalog and then outputs exact alternatives anyway;
- knows only the current model but falsely claims a full verified catalog;
- automatically chooses the strongest model for every task;
- skips from FAST directly to MAX without evidence;
- repeats already VERIFIED/PASS work without a relevant change;
- lowers acceptance criteria to reduce usage;
- chooses a cloud environment for a task that requires local USB/hardware access;
- repeatedly searches/indexes the canonical repository after one clear access failure instead of falling back;
- requires multiple TEMO files when the single portable file is already loaded;
- re-asks for screenshots that already fully verified the same catalog in the current session.

Any invented provider/model/level catalog should be classified as:

`CATALOG_HALLUCINATION_FAIL`

## Portability contract

The official access order is:

1. Full repository when directly accessible.
2. Raw portable URL when repository navigation/search fails:
   `https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`
3. Uploaded/pasted `TEMO_PORTABLE.md` when external web access is unavailable.

A fresh AI session still needs to be given either a TEMO link or the portable file once. GitHub cannot inject the skill into unrelated conversations automatically.