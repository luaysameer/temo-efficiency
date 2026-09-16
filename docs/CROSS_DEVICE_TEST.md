# TEMO Efficiency — Cross-Device Verification Test

Use this test to verify TEMO Efficiency in a fresh AI conversation on another phone, computer, browser, account, or AI provider.

The goal is not only to test model routing. It also verifies that the skill survives weak GitHub access and does not waste time repeatedly searching for the repository.

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
3. choose a local environment because USB/ADB is local;
4. show `EXECUTION CHOICE` before the command;
5. use FAST/low or the provider's equivalent for the narrow deterministic check;
6. only then provide the bounded ADB command.

Expected shape:

```text
EXECUTION CHOICE
Tool / Environment: <local environment>
Model: <real mapped available model>
Profile: FAST
Level / Effort: <real lowest reliable available level>
Boost / Speed: <real value or Not exposed>
Consumption: <real value or Not exposed>
Deploy: NO
Reason: <short reason>

Then copy and execute the command below.
```

## Test B — GitHub repository search/navigation fails

This reproduces the failure seen in a real Claude test where repository search could not find `luaysameer/temo-efficiency`.

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
- It should continue with provider/model discovery only if needed, then show `EXECUTION CHOICE` before the ADB command.

### FAIL

- Spending a long time repeatedly searching the same repository.
- Saying the whole skill is unusable only because GitHub search/indexing failed.
- Asking the user to paste several repository files when `TEMO_PORTABLE.md` is available.

## Test C — no external web access at all

Download `TEMO_PORTABLE.md` once from the repository and upload that single file to a fresh AI conversation.

Then say:

```text
Use the attached TEMO_PORTABLE.md as the TEMO Efficiency behavior contract for this chat.
Use TEMO Efficiency for my next task.
```

### Expected PASS

The assistant should use the uploaded file directly.

It must NOT require `README.md`, `SKILL.md`, or the rest of the repository before the core workflow can run.

If provider/model/level information is not visible, it may ask once for a screenshot or pasted model list as defined by the portable contract.

## Test D — provider catalog is unknown

In a new conversation say:

```text
Use TEMO Efficiency. I am using another AI tool, but you cannot see its model picker.
```

Expected behavior:

- ask for one screenshot of the model + reasoning/level picker OR an exact pasted list;
- never invent model names;
- build a session-local FAST/BALANCED/DEEP/MAX ladder after receiving the catalog;
- do not ask for the same catalog again during that session unless it changes.

## Test E — escalation

Give a simple task first and confirm it uses FAST/low when appropriate. Then provide evidence that the same checkpoint has become genuinely ambiguous or cross-system.

Expected behavior:

- escalate one step only;
- show a new `EXECUTION CHOICE` before the next command;
- preserve previous diagnostics and `LOCKED_PASS` work;
- do not restart from zero.

## Global FAIL conditions

TEMO Efficiency is not being followed correctly if the assistant:

- starts execution before provider/model/level discovery when discovery is actually needed;
- makes the user choose a model when the skill has enough information to choose;
- invents model names, reasoning levels, boost modes, or controls;
- automatically chooses the strongest model for every task;
- skips from FAST directly to MAX without evidence;
- repeats already VERIFIED/PASS work without a relevant change;
- lowers acceptance criteria to reduce usage;
- chooses a cloud environment for a task that requires local USB/hardware access;
- repeatedly searches/indexes the canonical repository after one clear access failure instead of falling back;
- requires multiple TEMO files when the single portable file is already loaded.

## Portability contract

The official access order is:

1. Full repository when directly accessible.
2. Raw portable URL when repository navigation/search fails:
   `https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md`
3. Uploaded/pasted `TEMO_PORTABLE.md` when external web access is unavailable.

This means a fresh AI session still needs to be given **either a TEMO link or the portable file once**. GitHub cannot inject the skill into unrelated conversations automatically.
