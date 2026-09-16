# TEMO Efficiency — الشرح العربي

[![GitHub stars](https://img.shields.io/github/stars/luaysameer/temo-efficiency?style=social)](https://github.com/luaysameer/temo-efficiency/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TEMO Efficiency](https://img.shields.io/badge/TEMO%20Efficiency-v1.5.0-blue.svg)](TEMO_LATEST.md)

**TEMO Efficiency** مهارة لاختيار **الأداة + الموديل + مستوى التفكير المناسب قبل التنفيذ**، بدل استخدام أقوى موديل دائماً أو ترك المستخدم يخمّن شنو يختار.

الفكرة الأساسية:

> استخدم أصغر موديل ومستوى يقدر يحقق نفس معايير القبول، وصعّد فقط إذا الدليل يثبت أن المستوى الحالي ما يكفي.

**[English](README.md)**

---

## شنو تسوي TEMO Efficiency؟

```text
تحميل TEMO Efficiency
→ فحص آخر نسخة منشورة إذا الوصول إلى GitHub متاح
→ تحديد/تأكيد الذكاء أو الأداة المستخدمة
→ التحقق من الموديلات والـLevels الحقيقية بحساب المستخدم
→ إذا الكتالوج مو ظاهر، تطلب Screenshot أو قائمة مكتوبة
→ بناء FAST / BALANCED / DEEP / MAX
→ تقييم الـCheckpoint الحالية
→ اختيار الموديل + المستوى
→ إظهار الاختيار قبل التنفيذ
→ تنفيذ Micro-Checkpoint محددة
→ التحقق من النتيجة
→ حماية PASS / VERIFIED
→ التصعيد مستوى واحد فقط إذا الدليل يبرره
→ تجهيز Feedback اختياري إذا ظهرت ملاحظة مفيدة
```

TEMO مو مجرد Prompt يقول “وفر Tokens”، وإنما **عقد سلوك للتنفيذ**.

---

## قبل كل أمر تشوف شنو تختار

```text
EXECUTION CHOICE
Tool / Environment: Codex Local
Model: <الموديل الحقيقي الموثق>
Profile: FAST
Level / Effort: <المستوى الحقيقي الموثق>
Boost / Speed: OFF أو Not exposed
Consumption: Low أو Not exposed
Deploy: NO
Reason: المهمة الحالية محددة وما تحتاج موديل أثقل.

Then copy and execute the command below.
```

إذا TEMO عندها معلومات موثوقة كافية، **هي تختار لك** وما تخليك تحتار بين الموديلات والـLevels.

التصعيد فقط:

```text
FAST → BALANCED → DEEP → MAX
```

---

## تعمل ويا ChatGPT وClaude وغيرهم

تقدر تستخدمها مع:

- ChatGPT / OpenAI
- Codex
- Claude / Claude Code
- Gemini
- Cursor
- Copilot
- Cloud Code
- موديلات محلية
- أي AI ثاني

TEMO ما تفترض أن كل مستخدمين نفس المزود عندهم نفس الموديلات. الحساب المجاني أو المدفوع، التجارب، التطبيق، المنطقة أو نوع الحساب ممكن تغير الخيارات.

### إذا الموديلات والـLevels ظاهرة للـAgent

يستخدمها مباشرة.

### إذا ما يقدر يشوفها

يطلب أقل عدد صور يحتاجه:

```text
دزلي Screenshot لـ:
1) قائمة الموديلات وهي مفتوحة،
2) قائمة Reasoning / Thinking / Level إذا منفصلة،
3) Boost / Speed / Mode إذا موجود.

إذا الصور مو مناسبة، اكتب الأسماء مثل ما تظهر بالضبط.
```

إذا حتى اسم البرنامج مو واضح، يطلب صورة للهيدر أو Settings.

**ممنوع** يبني Model Ladder من الذاكرة أو من اسم الشركة أو نوع الاشتراك فقط.

شوف [`templates/CATALOG_CONFIDENCE_GATE.md`](templates/CATALOG_CONFIDENCE_GATE.md).

---

## شلون تحدث نفسها؟

TEMO تستخدم **Canonical Refresh**.

ببداية جلسة جديدة، إذا GitHub متاح:

1. تقرأ [`TEMO_LATEST.md`](TEMO_LATEST.md) مرة واحدة؛
2. تقارن النسخة المحملة ويا آخر نسخة؛
3. إذا النسخة قديمة، تحمل `SKILL.md` أو `TEMO_PORTABLE.md` الحالي قبل أول تنفيذ؛
4. ما تعيد الفحص كل شوي بنفس الجلسة.

إذا فشل فحص التحديث، تكمل بالنسخة الموجودة وما توقف شغل المستخدم.

### شنو ما تسويه؟

ما تعدّل GitHub من نفسها بشكل عشوائي من جلسة أي مستخدم.

التطوير الحقيقي يصير من خلال مراجعة Feedback / Issues / Pull Requests وبعدين ننشر نسخة أحدث. هذا يمنع تجربة خاطئة من تغيير الـSkill لكل الناس.

---

## Feedback حتى تتطور من تجارب الناس

TEMO **ما ترسل Telemetry خفية**، وما ترفع المحادثات أو الصور أو الكود أو الـLogs أو معلومات الحساب تلقائياً.

إذا ظهرت ملاحظة مفيدة، ممكن تجهز تقرير `TEMO FEEDBACK` اختياري، مثل:

- اختارت موديل أقوى من اللازم؛
- اختارت موديل أضعف واضطرت للتصعيد؛
- ما قدرت تشخص الموديلات أو الـLevels؛
- ظهر AI جديد بخيارات غير معروفة؛
- صار `CATALOG_HALLUCINATION_FAIL`؛
- فشل GitHub/Portable fallback؛
- Regression Guard منع تكرار المشكلة؛
- شرح أو UX مو واضح؛
- اختبار جهاز/حساب ثاني طلع PASS أو FAIL مهم.

**المستخدم هو اللي يقرر إذا يريد يرسل الفيدباك.**

أضفنا GitHub Issue Form جاهز باسم **TEMO Efficiency Feedback**، والتفاصيل موجودة في [`docs/FEEDBACK_LOOP.md`](docs/FEEDBACK_LOOP.md).

قبل أي Feedback لازم تنشال كلمات السر، Tokens، البيانات الشخصية، الروابط الخاصة، والكود السري.

---

## إذا GitHub ما يفتح مضبوط

عدنا ثلاث طرق رسمية:

```text
A) GitHub كامل يشتغل
   → استخدم الملفات الأصلية

B) البحث/التنقل يفشل
   → بعد محاولة واحدة فقط وقف التكرار
   → افتح:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md

C) ماكو Web access
   → ارفع TEMO_PORTABLE.md مرة واحدة
   → يشتغل من الملف وحده
```

[`TEMO_PORTABLE.md`](TEMO_PORTABLE.md) ملف Self-contained.

---

## شلون أفعلها بمحادثة جديدة؟

الصق:

```text
Use TEMO Efficiency.
First try the canonical repository:
https://github.com/luaysameer/temo-efficiency

If repository navigation/search fails, do NOT keep retrying it. Immediately load:
https://raw.githubusercontent.com/luaysameer/temo-efficiency/main/TEMO_PORTABLE.md

Then follow TEMO Efficiency for my next task.
```

إذا الـAI ما عنده Web access، ارفع `TEMO_PORTABLE.md` فقط وقل:

```text
Use the attached TEMO_PORTABLE.md as the TEMO Efficiency behavior contract for this chat.
```

---

## نظام التوجيه

TEMO تقيم **الـCheckpoint الحالية**، مو أهمية المشروع كله.

كل نقطة 0–2:

- Complexity
- Risk
- Scope
- Verification burden
- Uncertainty

| الدرجة | Profile | المستوى المعتاد | الاستخدام |
|---:|---|---|---|
| 0–2 | **FAST** | أقل Level موثوق | تعديل/فحص حتمي ومحدود |
| 3–5 | **BALANCED** | Medium/default | تنفيذ مركز وDebug طبيعي |
| 6–8 | **DEEP** | Medium/High | مشاكل صعبة أو أنظمة مترابطة |
| 9–10 | **MAX** | أعلى مستوى مبرر | حالات استثنائية عالية التعقيد/المخاطر |

الـLadder الكامل ما ينبني إلا من Catalog موثوق.

إذا المعروف فقط الموديل الحالي:

```text
CATALOG STATUS: PARTIAL
ROUTING MODE: CURRENT_MODEL_ONLY
```

---

## Micro-Checkpoints وLOCKED_PASS

كل مهمة كبيرة تنقسم إلى أجزاء صغيرة، كل وحدة إلها هدف واضح واختبارات محددة وحد توقف.

بعد نجاح موثق:

```text
diagnose → fix → targeted test → regression guard → real acceptance → LOCKED_PASS
```

ما نعيد الشغل الناجح إلا إذا تغير شيء فعلاً يؤثر عليه.

---

## Local أو Cloud؟

إذا المهمة تحتاج USB، ADB، ملفات محلية، GPU، Desktop UI، Browser session محلية أو جهاز مربوط بالحاسبة، TEMO تختار بيئة تقدر فعلاً توصل لهذا الجهاز.

---

## اختبرها على هاتف/حساب/AI ثاني

استخدم [`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md).

الاختبار يغطي:

- GitHub كامل؛
- Raw Portable fallback؛
- بدون Web؛
- AI أو Catalog غير معروف؛
- اختلاف الموديلات بين الحسابات؛
- منع تخمين أسماء الموديلات؛
- التصعيد؛
- حماية PASS.

---

## أهم الملفات

- [`SKILL.md`](SKILL.md) — القواعد الرسمية، **v1.5.0**
- [`TEMO_LATEST.md`](TEMO_LATEST.md) — آخر نسخة منشورة
- [`TEMO_BOOTSTRAP.md`](TEMO_BOOTSTRAP.md) — Startup + Update + Fallback
- [`TEMO_PORTABLE.md`](TEMO_PORTABLE.md) — ملف واحد Self-contained
- [`templates/PROVIDER_DISCOVERY.md`](templates/PROVIDER_DISCOVERY.md) — اكتشاف البيئة والموديلات
- [`templates/CATALOG_CONFIDENCE_GATE.md`](templates/CATALOG_CONFIDENCE_GATE.md) — يمنع التخمين
- [`templates/EXECUTION_CHOICE.md`](templates/EXECUTION_CHOICE.md) — الاختيار قبل التنفيذ
- [`templates/CHECKPOINT.md`](templates/CHECKPOINT.md) — Micro-Checkpoint
- [`docs/FEEDBACK_LOOP.md`](docs/FEEDBACK_LOOP.md) — نظام الفيدباك الاختياري
- [`docs/CROSS_DEVICE_TEST.md`](docs/CROSS_DEVICE_TEST.md) — اختبارات الأجهزة والمزودات
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — المساهمة بالمشروع

---

## شنو ما تسوي TEMO؟

ما تتجاوز Quotas أو Billing أو الاشتراكات أو Rate Limits أو ضوابط الأمان.

ما تضمن نسبة توفير ثابتة.

ما تجمع Telemetry خفية، وما تعدّل GitHub تلقائياً من أي جلسة مستخدم.

هدفها تقلل **الشغل والـAI usage اللي ما له داعي** مع بقاء نفس مستوى الجودة المطلوب.

## License

MIT — استخدمها، جرّبها، عدلها وطوّرها.
