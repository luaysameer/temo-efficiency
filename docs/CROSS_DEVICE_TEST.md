# TEMO Efficiency — Cross-Device Verification Test

Use this test to check whether TEMO Efficiency behaves correctly in a fresh AI conversation on another phone, computer, browser, or supported AI provider.

## Test A — repository access available

Start a brand-new conversation and paste exactly:

```text
Use TEMO Efficiency from https://github.com/luaysameer/temo-efficiency
Load the current SKILL.md and TEMO_BOOTSTRAP.md and follow them as the execution behavior contract for this chat.
Before executing any task, discover or confirm the actual AI provider, available models, and reasoning/effort levels as required by the skill.
Then use TEMO Efficiency for this task:
Create a simple local diagnostic command that checks whether ADB sees my Android phone.
```

## Expected PASS behavior

The assistant should NOT immediately dump a large diagnostic command.

It should first do one of these:

1. If it already authoritatively knows the active provider/model/level catalog, use it directly.
2. If it does not know the exact choices, ask once for the AI/tool name and/or a screenshot/pasted list of available models + levels.

Then, before the command, it should show an execution block containing the equivalent of:

```text
EXECUTION CHOICE
Tool / Environment: <local environment because USB/ADB is local>
Model: <real available mapped model>
Profile: FAST
Level / Effort: <real low/lowest reliable available level>
Boost / Speed: <real value or Not exposed>
Consumption: <real value or Not exposed>
Deploy: NO
Reason: <short reason>

Then copy and execute the command below.
```

Only after that should it provide the bounded ADB check.

## Test B — provider catalog is unknown

In a new conversation say:

```text
Use TEMO Efficiency. I am using another AI tool, but you cannot see its model picker.
```

Expected behavior:

- it should ask for one screenshot of the model + reasoning/level picker OR an exact pasted list;
- it should not invent model names;
- after receiving the screenshot/list, it should build a session-local FAST/BALANCED/DEEP/MAX ladder;
- it should not ask for the same catalog again during that session unless something changes.

## Test C — escalation

Give a simple task first and confirm it uses FAST/low when appropriate. Then provide evidence that the same checkpoint has become genuinely ambiguous or cross-system.

Expected behavior:

- escalate one step only;
- show a new EXECUTION CHOICE before the next command;
- preserve previous diagnostics and LOCKED_PASS work;
- do not restart from zero.

## FAIL conditions

TEMO Efficiency is not being followed correctly if the assistant:

- starts execution before provider/model/level discovery when discovery is actually needed;
- makes the user choose a model when the skill has enough information to choose;
- invents model names, reasoning levels, boost modes, or controls;
- automatically chooses the strongest model for every task;
- skips from FAST directly to MAX without evidence;
- repeats already VERIFIED/PASS work without a relevant change;
- lowers acceptance criteria to reduce usage;
- chooses a cloud environment for a task that requires local USB/hardware access.

## Important portability note

The repository defines the behavior contract, but it cannot automatically inject itself into every unrelated AI conversation. On another device/session, the AI must either:

- be given the canonical repository URL and have permission/capability to read it, or
- receive the relevant skill files directly.

Once loaded successfully, the test above verifies whether the agent is following the intended TEMO Efficiency behavior.
