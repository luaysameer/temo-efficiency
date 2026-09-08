# TEMO Efficiency — الشرح العربي

**توجيه ذكي للموديلات + تقسيم العمل إلى Micro-Checkpoints لتقليل الهدر في Credits/Tokens بدون تقليل جودة النتيجة.**

هذه الفكرة خرجت من أسلوب **TEMO × AREEN** في المشاريع الطويلة: بدل ما نرمي كل مهمة على أقوى موديل ونصرف استخدام عالي، نقيس صعوبة المهمة ومخاطرها ونختار الموديل الذي تستحقه فعلاً.

## الفكرة باختصار

المهمة الصغيرة لا تحتاج نفس مستوى الموديل الذي يحتاجه Debug معقد أو تعديل معماري حساس.

TEMO Efficiency يقيس كل Checkpoint حسب:

- التعقيد
- المخاطرة
- حجم التغيير
- صعوبة التحقق
- مقدار الغموض

ثم يختار واحدًا من أربعة Profiles:

| الدرجة | Profile | الجهد المعتاد | أمثلة |
|---:|---|---|---|
| 0-2 | FAST | Low | تنسيق، استخراج، تعديل صغير، فحص حتمي |
| 3-5 | BALANCED | Medium | برمجة مركزة، Debug طبيعي، Integration محدود |
| 6-8 | DEEP | Medium/High | Architecture، Regression صعب، أنظمة مترابطة |
| 9-10 | MAX | High | حالات استثنائية عالية التعقيد أو الخطورة |

أسماء الموديلات نفسها تتغير مع الوقت، لذلك الـSkill لا تعتمد على اسم موديل ثابت. أنت تربط FAST/BALANCED/DEEP/MAX بالموديلات المتوفرة عندك.

## شلون يوفر استخدام؟

مو عن طريق تقليل الجودة. التوفير يجي من منع الهدر:

1. ما تستخدم أقوى موديل لمهمة بسيطة.
2. ما تعيد شغل صار Verified بدون سبب.
3. ما ترسل تاريخ مشروع ضخم لمشكلة صغيرة.
4. ما تشغل Full Regression على تغيير محلي إذا ماكو داعي.
5. من تصلح Regression مهم، تضيف Test دائم حتى ما تدفع مرة ثانية لنفس المشكلة.
6. كل Checkpoint يوقف عند حدّه وما يفتح Feature ثانية من نفسه.

## الفرق بين IMPLEMENTED و VERIFIED

مهم جدًا:

- **IMPLEMENTED:** الكود أو التعديل موجود واختباراته المطلوبة نجحت.
- **VERIFIED:** عندك دليل القبول المطلوب، مثل اختبار حقيقي على Browser/Device/Production عندما تكون هذه هي معايير النجاح.

ما نسمي العمل 100% لمجرد أن Unit Tests نجحت إذا المطلوب كان تشغيل حقيقي.

## أمر التنفيذ المزدوج

حتى الـAgent ما يستلم الخطة ويرد: «شنو تريد مني أسوي؟»، نضع هذين الأمرين قبل الـCheckpoint:

```text
EXECUTE THIS CHECKPOINT NOW. START IMPLEMENTATION IMMEDIATELY. DO NOT ASK ME WHAT TO DO.

THIS IS AN IMPLEMENTATION COMMAND, NOT A REVIEW REQUEST. COMPLETE THE CHECKPOINT, RUN THE REQUIRED TESTS, DEPLOY IF ALLOWED AND PASSING, THEN RETURN THE REQUESTED FINAL REPORT. BEGIN NOW.
```

هذا الأمر يُستخدم فقط إذا المطلوب فعلًا هو التنفيذ.

## قاعدة Micro-Checkpoint

كل مرحلة تحتوي على:

- Tool
- Model/Profile
- Effort
- مؤشر استهلاك إذا متوفر
- Boost/Speed إذا متوفر
- Deploy YES/NO
- Objective واحد واضح
- شغل سابق ممنوع إعادته أو تخريبه
- Success condition
- Stop condition
- شكل التقرير النهائي

## قاعدة التصعيد

ما نقفز إلى أقوى موديل مباشرة.

```text
FAST -> BALANCED -> DEEP -> MAX
```

نصعّد فقط إذا ظهر دليل، مثل:

- السبب الحقيقي بعده غامض
- أكثر من System مترابط بالمشكلة
- Regression عدّى الاختبارات الموجودة
- قرار Architecture أو Migration
- خطر على Security/Data/Production
- الموديل الحالي فشل في نفس Acceptance Criteria بدون تغيير

وعند التصعيد ما نعيد من الصفر؛ نحمل ويانا التشخيص والنتائج الموجودة.

## Regression Lock

إذا أصلحنا مشكلة مهمة، نحولها إلى Contract محمي:

```text
تشخيص -> إصلاح -> Targeted Test -> Regression Guard -> Deploy -> قبول حقيقي -> Protect PASS
```

الفكرة الأساسية: **لا ندفع Credits مرتين لنفس الخطأ.**

## ملاحظة مهمة

هذه المهارة لا تتجاوز حدود الاشتراك أو الفوترة أو Rate Limits، وما تضمن نسبة توفير ثابتة. هدفها تقليل الاستخدام غير الضروري عن طريق اختيار قدرات مناسبة ومنع إعادة الشغل.

## الاستخدام

اقرأ `SKILL.md` باعتباره التعليمات الأساسية. استخدم `templates/CHECKPOINT.md` لكتابة Checkpoint، و`templates/EXECUTION_HEADER.md` قبل أي خطة تريد من الـAgent تنفيذها مباشرة.

## الترخيص

MIT — استخدمها وعدلها وطورها.
