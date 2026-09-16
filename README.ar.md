# TEMO Efficiency — الشرح العربي

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**TEMO Efficiency** هي مهارة لتوجيه الموديلات وتنفيذ العمل عبر نقاط تحقق صغيرة (Micro-Checkpoints) في تدفقات GPT/Codex. تعالج هدر الموديل الأقوى، والسياق المتكرر، والاختبارات الواسعة غير الضرورية، من دون تخفيض معايير القبول.

نشأت من أسلوب **TEMO × AREEN**: قِس صعوبة كل مهمة ومخاطرها، استخدم أقل قدرة تكفيها، احتفظ بما اجتاز الاختبار، وصعّد فقط عند وجود دليل.

> Use the smallest capable model. Preserve the acceptance criteria. Escalate only when evidence says you need to.

إذا كانت هذه الفكرة مفيدة لعملك، **[ضع Star للمشروع](https://github.com/luaysameer/temo-efficiency)** وشارك نتيجة تجربة حقيقية.

## الجديد: الاختيار يظهر قبل التنفيذ

قبل أي أمر تنفيذي، يجب على TEMO Efficiency أن يكتب للمستخدم اختيار التنفيذ بوضوح بدل تركه يخمّن أي موديل أو مستوى يحتاج:

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <اسم الموديل المتاح أو الموديل المرتبط بالـProfile>
Profile: FAST
Level / Effort: Low
Boost / Speed: OFF
Consumption: Low
Deploy: NO
Reason: المهمة الحالية فحص محدد وحتمي ولا تحتاج موديل أثقل.

Then copy and execute the command below.
```

إذا كانت أسماء الموديلات معروفة في البيئة، تختار المهارة للمستخدم مباشرة. وإذا لم تكن معروفة، تحدد الـProfile والـLevel المطلوبين من دون اختراع اسم موديل. عند الحاجة للتصعيد، تظهر بطاقة اختيار جديدة قبل الأمر التالي مع الحفاظ على كل حالات PASS السابقة.

القالب المستقل موجود في [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md).

## البدء السريع

1. حمّل [`SKILL.md`](SKILL.md) في مجلد المهارات لدى الـAgent، أو الصقه ضمن تعليمات المشروع في تدفق GPT/Codex.
2. اربط FAST وBALANCED وDEEP وMAX بمستويات القدرات المتاحة لديك؛ يمكن البدء من [`config/model-ladder.example.yaml`](config/model-ladder.example.yaml).
3. أرسل المهمة مع التعليمات الجاهزة التالية:

```text
Use the TEMO Efficiency rules in SKILL.md for this task.
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

توجد حالات عملية كاملة في [`examples/EXAMPLES.md`](examples/EXAMPLES.md).

## عرض خلال 30 ثانية

### قبل TEMO Efficiency

```text
- إرسال كل مهمة إلى أقوى موديل.
- ترك المستخدم يخمّن أي Model وأي Level يحتاج.
- توسيع النطاق ليشمل المشروع كله.
- إعادة جميع الاختبارات بعد كل محاولة.
- تكرار الـDebug في أجزاء لا تخص العطل.
- استهلاك Tokens/Credits إضافية بلا دليل أن التوسّع حسّن القبول.
```

### بعد TEMO Efficiency

```text
1. قياس التعقيد والمخاطرة والنطاق وصعوبة التحقق والغموض.
2. إظهار Tool + Model + Profile + Level + Boost + Consumption + Deploy + Reason للمستخدم قبل التنفيذ.
3. اختيار FAST / BALANCED / DEEP / MAX.
4. إنشاء Micro-Checkpoint ضيقة واحدة.
5. تنفيذ تحقق مستهدف يناسب سطح التغيير.
6. إضافة Regression Guard للعقد الذي انكسر عندما يكون ذلك عمليًا.
7. حماية حالة PASS السابقة.
8. التصعيد مستوى واحد فقط عندما تبرره نتائج التشخيص.
```

معايير القبول لا تتغير؛ الذي ينخفض هو العمل المتكرر وغير الضروري وعدم وضوح إعداد التنفيذ.

## نظرة عامة على التوجيه

يُقيَّم كل بُعد من 0 إلى 2: التعقيد، المخاطرة، النطاق، عبء التحقق، والغموض. المجموع يحدد Profile عامًّا لا اسم موديل ثابتًا.

| الدرجة | Profile | المستوى الافتراضي | مناسب لـ |
|---:|---|---|---|
| 0–2 | **FAST** | Low | عمل حتمي صغير وسهل التحقق |
| 3–5 | **BALANCED** | Medium | تنفيذ مركز وDebug اعتيادي بهدف معروف |
| 6–8 | **DEEP** | Medium / High | Regression صعب أو عدة مكونات مترابطة أو قرار معماري |
| 9–10 | **MAX** | High | تعقيد استثنائي أو خطر عالٍ على الأمن أو البيانات أو الإنتاج |

اربط كل Profile بأصغر موديل في بيئتك يستطيع إنجاز العمل بثقة. يكون التصعيد تدريجيًا: `FAST → BALANCED → DEEP → MAX`، مع الاحتفاظ بالتشخيص والعمل المنجز.

## كيف يحافظ على الجودة؟

- لا تتغير معايير القبول لتوفير الاستخدام.
- يرى المستخدم الموديل والمستوى المقترحين قبل التنفيذ.
- كل Micro-Checkpoint لها هدف واحد وحد توقف واضح.
- الاختبارات المستهدفة مناسبة للتغيير الضيق؛ أما العقود المشتركة والمخططات والتوجيه وحدود الأمن وأساس النشر فتتطلب Regression أوسع.
- نضيف أصغر Regression Guard عملي بعد الإصلاحات المهمة.
- `IMPLEMENTED` لا تساوي `VERIFIED`؛ لا يوجد تحقق بلا دليل القبول المطلوب.
- لا نعيد العمل الذي اجتاز الاختبار إلا إذا تغير الكود أو الاعتماد أو البيئة أو المتطلب المرتبط به.

## Benchmark

هدف إطار القياس هو معرفة هل تقلل TEMO Efficiency **العمل القابل للتجنب من دون خفض جودة القبول**. يسجل نوع التوجيه، وعدد مرات التصعيد، والعمل والاختبارات المتكررة، ومحاولات التنفيذ، ونتيجة القبول، والاستهلاك التقريبي عندما يمكن قياسه، والزمن حتى القبول.

لا توجد بيانات منشورة مقاسة حتى الآن، لذلك الحالة الحالية هي: **Data collection pending.** استخدم القالب القابل لإعادة الاستخدام في [`docs/BENCHMARK.md`](docs/BENCHMARK.md).

## شكل Micro-Checkpoint

ابدأ أولاً بـ[`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md)، ثم استخدم [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md)، وأضف [`templates/EXECUTION_HEADER.md`](templates/EXECUTION_HEADER.md) فقط عندما يكون المطلوب تنفيذًا فعليًا.

```text
EXECUTION CHOICE
Tool / Environment: <agent and environment>
Model: <exact available model or mapped profile model>
Profile: <FAST | BALANCED | DEEP | MAX>
Level / Effort: <Low | Medium | High>
Boost / Speed: OFF unless justified
Consumption: <lowest practical setting>
Deploy: NO unless explicitly authorized
Reason: <why this is sufficient>

Then copy and execute the command below.
```

## Regression Lock

```text
تشخيص → إصلاح → Targeted Test → Regression Guard → نشر إذا كان مسموحًا → قبول حقيقي → Protect PASS
```

الهدف هو حماية العقد الذي انكسر ومنع دفع تكلفة المشكلة نفسها مرة ثانية، مع إبقاء التحقق متناسبًا مع سطح التغيير.

## المستندات والمشاركة

- [`SKILL.md`](SKILL.md) — القواعد الأساسية الملزمة
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — اختيار الموديل والمستوى قبل كل تنفيذ
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — عقد الـMicro-Checkpoint
- [`examples/EXAMPLES.md`](examples/EXAMPLES.md) — حالات توجيه عملية
- [`docs/BENCHMARK.md`](docs/BENCHMARK.md) — بروتوكول القياس وقالب البيانات
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — الأساس الحالي والخطط المرشحة
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — دليل المساهمة
- [`README.md`](README.md) — النسخة الإنجليزية

هذه المهارة لا تتجاوز الحصص أو الفوترة أو Rate Limits أو ضوابط الأمان، ولا تعد بنسبة توفير ثابتة. النتيجة تعتمد على نوع العمل، وقدرات الموديلات وأسعارها، وحجم السياق، ومتطلبات التحقق، وسلوك الـAgent.

## الترخيص

MIT — استخدمها وعدلها وطورها.
