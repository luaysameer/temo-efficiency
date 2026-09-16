# TEMO Efficiency — الشرح العربي

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**TEMO Efficiency** هي طريقة لتوجيه الموديلات ومستويات التفكير وتنفيذ العمل عبر Micro-Checkpoints في مختلف أدوات الذكاء الاصطناعي. الفكرة: لا تستخدم أقوى موديل وأعلى Level بشكل تلقائي؛ اكتشف البيئة الحقيقية، اختر أقل قدرة تكفي المهمة، احتفظ بما اجتاز الاختبار، وصعّد فقط عندما يثبت الدليل أن المستوى الحالي غير كافٍ.

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

إذا كانت الفكرة مفيدة لعملك، **[ضع Star للمشروع](https://github.com/luaysameer/temo-efficiency)** وشارك نتيجة تجربة حقيقية.

## ملف واحد يكفي للبدء

تحميل `README.md` أو [`SKILL.md`](SKILL.md) يكفي لتفعيل TEMO Efficiency.

إذا كان الـAgent يستطيع الوصول إلى GitHub، يجب أن يعمل Bootstrap للنسخة الحالية من المشروع قبل التنفيذ ويقرأ:

1. [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md)
2. [`SKILL.md`](SKILL.md)
3. [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml)
4. [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md)
5. [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md)
6. [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md)
7. [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) عند وجود تنفيذ فعلي

بعد قراءة هذه الملفات مرة، لا يعيد تحميلها أو يسأل عن نفس المعلومات ما دامت لم تتغير.

إذا لم يكن الوصول إلى GitHub متاحاً، يستخدم النسخة المحملة ولا يخترع أسماء موديلات أو Levels أو خيارات غير موجودة.

## أولاً: اكتشف أي ذكاء اصطناعي يستخدمه الشخص

قبل اختيار FAST / BALANCED / DEEP / MAX، تحدد TEMO Efficiency البيئة الحقيقية.

قد تكون:

- ChatGPT / OpenAI
- Codex
- Claude / Claude Code
- Gemini
- Cursor
- Copilot
- Cloud Code
- موديلات محلية
- أو أي أداة ذكاء اصطناعي أخرى

إذا كانت البيئة والموديلات ومستويات Reasoning/Thinking ظاهرة للـAgent بشكل موثوق، يستخدمها مباشرة ولا يسأل المستخدم عن شيء يعرفه بالفعل.

إذا لم تكن معروفة، يسأل مرة واحدة عن اسم الأداة. وإذا لم تكن الموديلات أو المستويات ظاهرة، يطلب واحداً من اثنين:

- صورة واحدة لقائمة الموديلات + Levels/Reasoning، أو
- كتابة أسماء الموديلات والمستويات كما تظهر بالضبط.

بعدها يبني Model Ladder خاصة بهذه الجلسة ويحتفظ بها:

```text
FAST      -> أخف موديل موثوق + أقل Level مناسب
BALANCED  -> موديل العمل العام/البرمجة + Level متوسط
DEEP      -> موديل أقوى للتحليل والـDebug المعقد + Medium/High
MAX       -> أقوى موديل متاح + أعلى Level مبرر فقط للحالات الاستثنائية
```

لا يعيد السؤال عن الموديلات في نفس المحادثة إلا إذا تغيّر المزود أو الحساب أو ظهرت موديلات جديدة أو كانت الصورة الأولى ناقصة.

التفاصيل في [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md).

## إذا قال المستخدم ChatGPT / OpenAI / Codex

تستخدم TEMO Efficiency **الموديلات ومستويات التفكير الحالية التي تكشفها البيئة نفسها** إذا كانت ظاهرة.

لا نخزن قائمة OpenAI ثابتة داخل المشروع لأن أسماء الموديلات وخصائص المنتج ممكن تتغير مستقبلاً.

إذا كانت البيئة لا تكشف الخيارات الحالية للـAgent، يطلب صورة أو قائمة مرة واحدة، ثم يربطها بـFAST/BALANCED/DEEP/MAX ويستخدمها لباقي الجلسة.

## إذا كان يستخدم Claude أو Gemini أو Cloud Code أو غيره

نفس الفكرة تماماً:

- إذا الكتالوج ظاهر للـAgent، يستخدمه.
- إذا غير ظاهر، يطلب صورة أو قائمة أسماء.
- يقرأ أسماء الموديلات وLevels والـBoost أو Speed المتاح إن وجد.
- لا يخترع خياراً غير موجود.
- إذا ترتيب قوة الموديلات غير واضح، يسأل فقط عن المعلومة الناقصة بدلاً من التخمين.

## الاختيار يظهر قبل كل تنفيذ

قبل أي أمر تنفيذي، TEMO Efficiency تعرض للمستخدم ما يجب اختياره بوضوح:

```text
EXECUTION CHOICE
Tool / Environment: <الأداة الحقيقية>
Model: <اسم الموديل الحقيقي المختار>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <المستوى الحقيقي المتاح أو Not exposed>
Boost / Speed: <القيمة الحقيقية أو Not exposed>
Consumption: <القيمة الحقيقية أو Not exposed>
Deploy: <YES | NO>
Reason: <سبب مختصر لماذا هذا الاختيار يكفي>

Then copy and execute the command below.
```

يعني المستخدم لا يبقى يخمّن: "أي موديل أختار؟ أي Level؟" إذا TEMO Efficiency عندها معلومات كافية، هي تختار له مباشرة.

وإذا فشل المستوى الحالي بسبب دليل حقيقي، يظهر اختيار جديد بالموديل/المستوى الأعلى قبل الأمر التالي، مع الحفاظ على كل `PASS / VERIFIED` السابق.

## البدء السريع

1. حمّل هذا `README` أو [`SKILL.md`](SKILL.md).
2. خَلِّ TEMO Efficiency تعمل Bootstrap وتكتشف الأداة والموديلات والمستويات الحقيقية.
3. أعطها المهمة بهذا الشكل:

```text
Use the latest TEMO Efficiency rules from luaysameer/temo-efficiency.
Bootstrap the canonical workflow if repository access is available.
Discover or reuse my actual AI provider/model/level catalog before choosing an exact model.
Before every execution command, show me the recommended Tool / Model / Profile / Level / Boost / Consumption / Deploy choice and one short reason.
Choose for me when the environment is known; do not make me guess the model or level.
Score the current task, choose FAST / BALANCED / DEEP / MAX, and explain the route.
Create and execute one narrow micro-checkpoint. Preserve existing acceptance criteria and previous PASS states.
Run verification proportional to the change surface, add a regression guard when practical, and escalate only when diagnostics justify it.
Stop at the checkpoint boundary and report the evidence.

Task: <describe the task>
Acceptance criteria: <state the required result>
Protected / do not change: <state known PASS areas or scope limits>
```

## مثال سريع

بدون TEMO Efficiency:

```text
المستخدم عنده 6 موديلات و4 مستويات تفكير.
يختار أقوى موديل + High لكل شيء.
الـAgent يعيد كل السياق وكل الاختبارات.
```

مع TEMO Efficiency:

```text
1. تعرف الأداة الحقيقية والموديلات المتاحة.
2. تحفظ الكتالوج للجلسة.
3. تقيس صعوبة المهمة.
4. تقول للمستخدم بالضبط: Tool + Model + Profile + Level + Boost + Consumption + Deploy + Reason.
5. تنفذ Micro-Checkpoint واحدة.
6. تعمل Targeted Verification.
7. تحمي PASS.
8. تصعّد فقط إذا التشخيص يبرر ذلك.
```

## نظام التوجيه

كل بُعد يأخذ 0 إلى 2:

- Complexity
- Risk
- Scope
- Verification burden
- Uncertainty

ثم:

| الدرجة | Profile | المستوى الافتراضي | الاستخدام |
|---:|---|---|---|
| 0–2 | **FAST** | Low | عمل صغير، حتمي، سهل التحقق |
| 3–5 | **BALANCED** | Medium | تنفيذ مركز وDebug طبيعي |
| 6–8 | **DEEP** | Medium / High | Regression صعب أو عدة أنظمة مترابطة |
| 9–10 | **MAX** | High | تعقيد أو مخاطرة استثنائية |

الـProfile لا يساوي اسم موديل ثابت. بعد Provider Discovery، يتم ربط كل Profile بالموديل الحقيقي المناسب في البيئة الحالية.

التصعيد يكون فقط:

`FAST → BALANCED → DEEP → MAX`

ولا يتم القفز مباشرة إلى MAX.

## كيف يحافظ على الجودة؟

- معايير القبول لا تتغير لتقليل الاستهلاك.
- الموديلات والمستويات تُكتشف من البيئة الحقيقية ولا تُخمن.
- يرى المستخدم الموديل والـLevel قبل التنفيذ.
- كل Micro-Checkpoint لها هدف واحد وحد توقف واضح.
- الاختبارات المستهدفة تستخدم للتغيير الضيق.
- يتم توسيع الاختبار فقط عندما يتغير عقد مشترك أو Schema أو Security Boundary أو أساس نشر.
- `IMPLEMENTED` لا تعني `VERIFIED`.
- بعد إصلاح خلل مهم نضيف Regression Guard صغير عند الإمكان.
- لا نعيد أي PASS إلا إذا تغيّر ما يؤثر عليه.

## Regression Lock

```text
تشخيص → إصلاح → Targeted Test → Regression Guard → نشر إذا كان مسموحاً → قبول حقيقي → Protect PASS
```

## الملفات الأساسية

- [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md) — نقطة تشغيل شاملة من README أو SKILL
- [`SKILL.md`](SKILL.md) — القواعد الملزمة
- [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md) — اكتشاف الذكاء والموديلات والـLevels
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — اختيار الموديل والـLevel قبل التنفيذ
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — عقد Micro-Checkpoint
- [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) — رأس أمر التنفيذ
- [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml) — إعداد Model Ladder ثابت لمن يريد ذلك
- [`examples/EXAMPLES.md`](examples/EXAMPLES.md) — حالات عملية
- [`docs/BENCHMARK.md`](docs/BENCHMARK.md) — قياس الاستهلاك والقبول
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — دليل المساهمة
- [`README.md`](README.md) — النسخة الإنجليزية

TEMO Efficiency لا تتجاوز الحصص أو الفوترة أو Rate Limits أو ضوابط الأمان، ولا تضمن نسبة توفير ثابتة. الهدف هو تقليل العمل القابل للتجنب مع الحفاظ على نفس معيار القبول.

## الترخيص

MIT — استخدمها، عدلها، وطورها.
