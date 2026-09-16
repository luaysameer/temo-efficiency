# TEMO Efficiency — الشرح العربي

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**TEMO Efficiency** هي مهارة لتوجيه التنفيذ بين الموديلات ومستويات التفكير المختلفة. قبل أي تنفيذ، تحدد الأداة المناسبة، والموديل المناسب، والـLevel المناسب، ثم تعرض الاختيار للمستخدم قبل الأمر.

الفكرة الأساسية:

> استخدم أصغر موديل ومستوى يستطيعان إنجاز الـCheckpoint بنفس معايير القبول، وصعّد فقط عندما يثبت الدليل أن المستوى الحالي غير كافٍ.

## شنو تسوي المهارة من تستخدمها؟

السلوك المطلوب هو:

```text
تحميل TEMO Efficiency
→ اكتشاف/تأكيد الذكاء الاصطناعي المستخدم
→ معرفة الموديلات والـLevels الحقيقية المتاحة
→ بناء FAST / BALANCED / DEEP / MAX
→ تقييم الـCheckpoint الحالية
→ اختيار الموديل + المستوى
→ إظهار الاختيار قبل التنفيذ
→ تنفيذ Micro-Checkpoint محددة
→ التحقق من النتيجة
→ حماية PASS / VERIFIED
→ التصعيد مستوى واحد فقط إذا الدليل يبرر ذلك
```

التفاصيل الملزمة موجودة في [`docs/BEHAVIOR_CONTRACT.md`](docs/BEHAVIOR_CONTRACT.md).

## قبل كل أمر لازم يظهر الاختيار

قبل أي أمر تنفيذي، المفروض تشوف شيء مثل:

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <اسم الموديل الحقيقي المختار>
Profile: FAST
Level / Effort: <المستوى الحقيقي المتاح>
Boost / Speed: OFF أو Not exposed
Consumption: Low أو Not exposed
Deploy: NO
Reason: هذه المهمة فحص محدد ولا تحتاج موديل أثقل.

Then copy and execute the command below.
```

إذا TEMO تعرف الموديلات والـLevels الموجودة عندك، هي تختار لك وما تخليك تخمّن.

## تعمل مع ChatGPT وغيره

المهارة مو مرتبطة بمزود واحد. تقدر تتعامل مع:

- ChatGPT / OpenAI
- Codex
- Claude / Claude Code
- Gemini
- Cursor
- Copilot
- Cloud Code
- موديلات محلية
- أي أداة ذكاء اصطناعي أخرى

إذا البيئة تكشف الموديلات والـLevels الحالية للـAgent بشكل موثوق، يستخدمها مباشرة.

إذا ما يقدر يشوفها، يسأل مرة واحدة عن:

- اسم الأداة/الذكاء، و
- صورة لقائمة Model + Level/Reasoning، أو كتابة الأسماء كما تظهر بالضبط.

بعدها يبني Model Ladder لهذه الجلسة:

```text
FAST      → أخف موديل موثوق + أقل Level مناسب
BALANCED  → موديل العمل العام + Level متوسط
DEEP      → موديل أقوى للتحليل والـDebug المعقد
MAX       → أقوى موديل + أعلى Level مبرر فقط للحالات الاستثنائية
```

ولا يعيد نفس السؤال في نفس الجلسة إلا إذا تغيرت البيئة أو الموديلات أو الحساب.

## ChatGPT / OpenAI / Codex

إذا كنت تستخدم ChatGPT أو OpenAI أو Codex، TEMO تعتمد الموديلات ومستويات التفكير **الحالية** الظاهرة في البيئة.

ما نخزن قائمة OpenAI ثابتة داخل المشروع لأن أسماء الموديلات والخيارات ممكن تتغير.

إذا الخيارات الحالية غير ظاهرة للـAgent، يطلب صورة أو قائمة مرة واحدة ثم يربطها بـFAST/BALANCED/DEEP/MAX.

## ملف واحد يكفي للبدء

إذا الـAgent عنده وصول للمشروع، تحميل `README.md` أو [`SKILL.md`](SKILL.md) يكفي حتى يبدأ الـBootstrap ويقرأ الملفات الحالية:

1. [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md)
2. [`SKILL.md`](SKILL.md)
3. [`docs/BEHAVIOR_CONTRACT.md`](docs/BEHAVIOR_CONTRACT.md)
4. [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml)
5. [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md)
6. [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md)
7. [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md)
8. [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) عند التنفيذ الفعلي

## شلون أشغلها بمحادثة جديدة أو هاتف ثاني؟

افتح محادثة جديدة والصق:

```text
Use TEMO Efficiency from https://github.com/luaysameer/temo-efficiency
Load the current SKILL.md and TEMO_BOOTSTRAP.md, follow them as the execution behavior contract for this chat, and do not execute my task until you have completed the provider/model/level discovery required by the skill.
```

وبعدها اكتب مهمتك.

إذا الذكاء المستخدم ما يقدر يفتح GitHub، لازم ترفع له ملفات المهارة أو تلصقها. GitHub وحده ما يگدر يفرض نفسه تلقائياً داخل محادثة منفصلة إذا ما تم إعطاء الرابط/الملفات أو ما عندها صلاحية للوصول.

## اختبارها على جهاز ثاني

استخدم:

[`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md)

هذا الملف يعطيك اختبار جاهز لمحادثة جديدة ويحدد شنو يعتبر PASS وشنو يعتبر FAIL.

الـPASS الصحيح يعني:

- يكتشف أو يعرف الـProvider والموديلات فقط إذا يحتاج؛
- يختار الموديل والـLevel بدلاً منك عندما عنده معلومات كافية؛
- يعرض `EXECUTION CHOICE` قبل الأمر؛
- يبدأ بأصغر Profile مناسب؛
- ما يعيد الشغل الذي صار PASS؛
- يصعد فقط `FAST → BALANCED → DEEP → MAX` وبالدليل.

## نظام التوجيه

كل Checkpoint تنحسب على خمس نقاط، كل وحدة 0–2:

- Complexity
- Risk
- Scope
- Verification burden
- Uncertainty

ثم:

| الدرجة | Profile | المستوى المعتاد | الاستخدام |
|---:|---|---|---|
| 0–2 | **FAST** | أقل Level موثوق | عمل حتمي صغير وفحص محدود |
| 3–5 | **BALANCED** | Medium/default | تنفيذ مركز وDebug طبيعي |
| 6–8 | **DEEP** | Medium/High | مشاكل صعبة وأنظمة مترابطة |
| 9–10 | **MAX** | أعلى مستوى مبرر | حالات استثنائية عالية التعقيد/المخاطر |

الـProfile مو اسم موديل ثابت. TEMO تربطه بالموديلات الحقيقية الموجودة عند الشخص.

## حماية العمل الناجح

بعد نجاح مهم، يتحول إلى:

```text
LOCKED_PASS
```

ما يتكرر إلا إذا تغير الكود أو البيئة أو الاعتماد أو الموديلات أو المتطلبات المرتبطة به، أو ظهر دليل جديد يناقضه.

## الجودة ما تنخفض

TEMO Efficiency ما توفر الاستهلاك عن طريق تقليل الجودة.

معايير القبول تبقى نفسها. التوفير يكون عن طريق:

- موديل أصغر عندما يكفي؛
- Level أقل عندما يكفي؛
- سياق أقل؛
- اختبارات مستهدفة؛
- عدم تكرار التشخيص؛
- حماية PASS؛
- التصعيد فقط عندما يكون ضروري.

`IMPLEMENTED` لا تعني `VERIFIED`.

## Local أو Cloud

إذا المهمة تحتاج USB أو ملفات محلية أو GPU أو واجهة سطح مكتب أو جهاز مربوط بالحاسبة، TEMO لازم تختار Local execution، مو Cloud ما يقدر يوصل للجهاز.

## الملفات المهمة

- [`SKILL.md`](SKILL.md) — القواعد الملزمة للمهارة
- [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md) — آلية تحميل المنظومة
- [`docs/BEHAVIOR_CONTRACT.md`](docs/BEHAVIOR_CONTRACT.md) — شنو لازم تسوي المهارة بالضبط
- [`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md) — اختبارها بمحادثة/جهاز ثاني
- [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md) — اكتشاف الموديلات والـLevels
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — اختيار التنفيذ قبل الأمر
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — عقد Micro-Checkpoint
- [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml) — Model Ladder اختياري ثابت
- [`README.md`](README.md) — النسخة الإنجليزية

## ملاحظة مهمة

TEMO Efficiency لا تتجاوز الحصص أو الفوترة أو Rate Limits أو ضوابط الأمان، وما تضمن نسبة توفير ثابتة. الهدف هو تقليل العمل غير الضروري مع الحفاظ على نفس معايير القبول.

## License

MIT — استخدمها، عدلها، جرّبها، وطوّرها.
