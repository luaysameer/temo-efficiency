const SIGNAL_CODES = new Set([
  "REPEATED_MISUNDERSTANDING",
  "REPEATED_QUESTION",
  "CONTEXT_MISS",
  "EXECUTION_DRIFT",
  "ROUTING_TOO_WEAK",
  "ROUTING_TOO_STRONG",
  "CATALOG_DISCOVERY_FAIL",
  "CATALOG_HALLUCINATION_FAIL",
  "BOOTSTRAP_FAIL",
  "TOOL_ENVIRONMENT_MISMATCH",
  "VERIFICATION_FAIL",
  "LOCKED_PASS_REGRESSION",
  "PORTABLE_FALLBACK_PASS",
  "REGRESSION_GUARD_PASS",
  "DOCUMENTATION_USABILITY",
  "OTHER"
]);

const RESULTS = new Set(["PASS", "PARTIAL", "FAIL"]);
const CONFIDENCE = new Set(["LOW", "MEDIUM", "HIGH"]);
const MODES = new Set(["MANUAL", "ASK_BEFORE_SEND", "AUTO_ANONYMOUS"]);
const CATALOG_STATUS = new Set(["VERIFIED_FULL", "VERIFIED_CURRENT_ONLY", "UNKNOWN"]);
const LANGUAGES = new Set(["ar", "en", "other"]);
const SOURCES = new Set(["temo-efficiency", "temo-portable"]);

const ALLOWED_FIELDS = new Set([
  "schemaVersion",
  "source",
  "consent",
  "feedbackMode",
  "clientId",
  "language",
  "providerTool",
  "temoVersion",
  "signalCode",
  "confidence",
  "retryCount",
  "result",
  "taskType",
  "catalogStatus",
  "initialRoute",
  "escalation",
  "missedContract",
  "whatHappened",
  "expectedBehavior",
  "likelyCause",
  "suggestedImprovement"
]);

const LIMITS = {
  clientId: 128,
  providerTool: 80,
  temoVersion: 24,
  taskType: 120,
  initialRoute: 160,
  escalation: 160,
  missedContract: 800,
  whatHappened: 1400,
  expectedBehavior: 1000,
  likelyCause: 800,
  suggestedImprovement: 1000
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

export default {
  async fetch(request, env) {
    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS });
      }

      const url = new URL(request.url);

      if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/api/health")) {
        return json({
          ok: true,
          service: "TEMO Feedback Gateway",
          version: env.GATEWAY_VERSION || "0.1.0",
          target: `${env.GITHUB_OWNER}/${env.GITHUB_REPO}`,
          endpoint: "/v1/feedback",
          privacy: "structured-only; no raw conversation/code/log/email fields accepted",
          transport: "GitHub Issues"
        });
      }

      if (request.method === "GET" && url.pathname === "/v1/schema") {
        return json(schemaDocument(env));
      }

      if (request.method !== "POST" || url.pathname !== "/v1/feedback") {
        return json({ ok: false, error: "not_found" }, 404);
      }

      const contentType = request.headers.get("content-type") || "";
      if (!contentType.toLowerCase().includes("application/json")) {
        return json({ ok: false, error: "content_type_must_be_application_json" }, 415);
      }

      const contentLength = Number(request.headers.get("content-length") || 0);
      if (contentLength > 16_384) {
        return json({ ok: false, error: "payload_too_large" }, 413);
      }

      const raw = await request.text();
      if (raw.length > 16_384) {
        return json({ ok: false, error: "payload_too_large" }, 413);
      }

      let payload;
      try {
        payload = JSON.parse(raw);
      } catch {
        return json({ ok: false, error: "invalid_json" }, 400);
      }

      const validation = validatePayload(payload);
      if (!validation.ok) {
        return json({ ok: false, error: "validation_failed", details: validation.errors }, 400);
      }

      const clientKey = await sha256Hex(`${payload.clientId}|${payload.providerTool}`);
      const [clientLimit, globalLimit] = await Promise.all([
        env.CLIENT_RATE_LIMITER.limit({ key: `client:${clientKey}` }),
        env.GLOBAL_RATE_LIMITER.limit({ key: "temo-feedback-global-v1" })
      ]);

      if (!clientLimit.success || !globalLimit.success) {
        return json({
          ok: false,
          error: "rate_limited",
          retryAfterSeconds: 60
        }, 429, { "Retry-After": "60" });
      }

      const clean = sanitizePayload(payload);
      const fingerprint = await feedbackFingerprint(clean);
      const issueToken = `TFG-${fingerprint.slice(0, 12).toUpperCase()}`;

      const existing = await findExistingIssue(issueToken, env);
      if (existing) {
        return json({
          ok: true,
          duplicate: true,
          fingerprint: issueToken,
          issueNumber: existing.number,
          issueUrl: existing.html_url
        }, 200);
      }

      const maxDaily = Math.max(1, Number(env.MAX_DAILY_ISSUES || 100));
      const todayCount = await countTodayGatewayIssues(env);
      if (todayCount >= maxDaily) {
        return json({
          ok: false,
          error: "daily_issue_cap_reached",
          current: todayCount,
          limit: maxDaily
        }, 429, { "Retry-After": "3600" });
      }

      const title = buildIssueTitle(clean, issueToken);
      const body = buildIssueBody(clean, issueToken, env);
      const issue = await createIssue(title, body, env);

      return json({
        ok: true,
        duplicate: false,
        fingerprint: issueToken,
        issueNumber: issue.number,
        issueUrl: issue.html_url
      }, 201);
    } catch (error) {
      console.error("TEMO Feedback Gateway error", error);
      return json({ ok: false, error: "gateway_error" }, 500);
    }
  }
};

function validatePayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, errors: ["payload_must_be_object"] };
  }

  for (const key of Object.keys(payload)) {
    if (!ALLOWED_FIELDS.has(key)) errors.push(`unsupported_field:${key}`);
  }

  if (payload.schemaVersion !== "1.0") errors.push("schemaVersion_must_be_1.0");
  if (!SOURCES.has(payload.source)) errors.push("source_invalid");
  if (payload.consent !== true) errors.push("consent_must_be_true");
  if (!MODES.has(payload.feedbackMode)) errors.push("feedbackMode_invalid");
  if (!LANGUAGES.has(payload.language)) errors.push("language_invalid");
  if (!SIGNAL_CODES.has(payload.signalCode)) errors.push("signalCode_invalid");
  if (!RESULTS.has(payload.result)) errors.push("result_invalid");
  if (!CONFIDENCE.has(payload.confidence)) errors.push("confidence_invalid");
  if (!CATALOG_STATUS.has(payload.catalogStatus)) errors.push("catalogStatus_invalid");

  requiredString(payload, "clientId", 8, LIMITS.clientId, errors);
  requiredString(payload, "providerTool", 1, LIMITS.providerTool, errors);
  requiredString(payload, "temoVersion", 1, LIMITS.temoVersion, errors);
  requiredString(payload, "whatHappened", 10, LIMITS.whatHappened, errors);
  requiredString(payload, "expectedBehavior", 5, LIMITS.expectedBehavior, errors);

  optionalString(payload, "taskType", LIMITS.taskType, errors);
  optionalString(payload, "initialRoute", LIMITS.initialRoute, errors);
  optionalString(payload, "escalation", LIMITS.escalation, errors);
  optionalString(payload, "missedContract", LIMITS.missedContract, errors);
  optionalString(payload, "likelyCause", LIMITS.likelyCause, errors);
  optionalString(payload, "suggestedImprovement", LIMITS.suggestedImprovement, errors);

  if (payload.retryCount !== undefined) {
    if (!Number.isInteger(payload.retryCount) || payload.retryCount < 0 || payload.retryCount > 20) {
      errors.push("retryCount_must_be_integer_0_to_20");
    }
  }

  return { ok: errors.length === 0, errors };
}

function requiredString(payload, key, min, max, errors) {
  const value = payload[key];
  if (typeof value !== "string") {
    errors.push(`${key}_must_be_string`);
    return;
  }
  const n = value.trim().length;
  if (n < min || n > max) errors.push(`${key}_length_${min}_to_${max}`);
}

function optionalString(payload, key, max, errors) {
  if (payload[key] === undefined || payload[key] === null || payload[key] === "") return;
  if (typeof payload[key] !== "string") {
    errors.push(`${key}_must_be_string`);
    return;
  }
  if (payload[key].trim().length > max) errors.push(`${key}_max_${max}`);
}

function sanitizePayload(payload) {
  return {
    schemaVersion: "1.0",
    source: payload.source,
    feedbackMode: payload.feedbackMode,
    language: payload.language,
    providerTool: cleanText(payload.providerTool, LIMITS.providerTool),
    temoVersion: cleanText(payload.temoVersion, LIMITS.temoVersion),
    signalCode: payload.signalCode,
    confidence: payload.confidence,
    retryCount: payload.retryCount ?? 0,
    result: payload.result,
    taskType: cleanText(payload.taskType || "", LIMITS.taskType),
    catalogStatus: payload.catalogStatus,
    initialRoute: cleanText(payload.initialRoute || "", LIMITS.initialRoute),
    escalation: cleanText(payload.escalation || "", LIMITS.escalation),
    missedContract: cleanText(payload.missedContract || "", LIMITS.missedContract),
    whatHappened: cleanText(payload.whatHappened, LIMITS.whatHappened),
    expectedBehavior: cleanText(payload.expectedBehavior, LIMITS.expectedBehavior),
    likelyCause: cleanText(payload.likelyCause || "", LIMITS.likelyCause),
    suggestedImprovement: cleanText(payload.suggestedImprovement || "", LIMITS.suggestedImprovement)
  };
}

function cleanText(value, max) {
  return redactSecrets(String(value || ""))
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

function redactSecrets(text) {
  return text
    .replace(/github_pat_[A-Za-z0-9_]{20,}/g, "[REDACTED_GITHUB_TOKEN]")
    .replace(/gh[pousr]_[A-Za-z0-9]{20,}/g, "[REDACTED_GITHUB_TOKEN]")
    .replace(/sk-[A-Za-z0-9_-]{20,}/g, "[REDACTED_API_KEY]")
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]{16,}/gi, "Bearer [REDACTED]")
    .replace(/\b(api[_ -]?key|access[_ -]?token|password|secret)\s*[:=]\s*[^\s,;]+/gi, "$1=[REDACTED]");
}

async function feedbackFingerprint(clean) {
  const material = [
    clean.temoVersion,
    clean.providerTool.toLowerCase(),
    clean.signalCode,
    normalizeForHash(clean.missedContract),
    normalizeForHash(clean.whatHappened),
    normalizeForHash(clean.expectedBehavior)
  ].join("|");
  return sha256Hex(material);
}

function normalizeForHash(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .trim()
    .slice(0, 900);
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function findExistingIssue(issueToken, env) {
  const query = `repo:${env.GITHUB_OWNER}/${env.GITHUB_REPO} is:issue in:title ${issueToken}`;
  const response = await githubFetch(`/search/issues?q=${encodeURIComponent(query)}&per_page=1`, env);
  if (!response.ok) {
    const details = await response.text();
    console.error("GitHub issue search failed", response.status, details.slice(0, 500));
    throw new Error("github_search_failed");
  }
  const data = await response.json();
  return data.items?.[0] || null;
}

async function countTodayGatewayIssues(env) {
  const today = new Date().toISOString().slice(0, 10);
  const query = `repo:${env.GITHUB_OWNER}/${env.GITHUB_REPO} is:issue in:title TFG- created:>=${today}`;
  const response = await githubFetch(`/search/issues?q=${encodeURIComponent(query)}&per_page=1`, env);
  if (!response.ok) {
    const details = await response.text();
    console.error("GitHub daily issue count failed", response.status, details.slice(0, 500));
    throw new Error("github_daily_count_failed");
  }
  const data = await response.json();
  return Number(data.total_count || 0);
}

async function createIssue(title, body, env) {
  const response = await githubFetch(`/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/issues`, env, {
    method: "POST",
    body: JSON.stringify({ title, body })
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("GitHub issue creation failed", response.status, details.slice(0, 800));
    throw new Error("github_issue_create_failed");
  }

  return response.json();
}

function githubFetch(path, env, init = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "TEMO-Feedback-Gateway",
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });
}

function buildIssueTitle(clean, issueToken) {
  const provider = clean.providerTool.replace(/[\r\n\[\]]/g, " ").replace(/\s+/g, " ").trim().slice(0, 40);
  return `[TEMO Feedback] ${clean.signalCode} · ${provider} · ${issueToken}`;
}

function buildIssueBody(clean, issueToken, env) {
  const lines = [
    "## TEMO Feedback Gateway",
    "",
    `- **Gateway version:** ${mdInline(env.GATEWAY_VERSION || "0.1.0")}`,
    `- **Fingerprint:** \`${issueToken}\``,
    `- **Submitted:** ${new Date().toISOString()}`,
    `- **Feedback mode:** ${mdInline(clean.feedbackMode)}`,
    `- **Language:** ${mdInline(clean.language)}`,
    `- **Provider / Tool:** ${mdInline(clean.providerTool)}`,
    `- **TEMO version:** ${mdInline(clean.temoVersion)}`,
    `- **Signal:** \`${clean.signalCode}\``,
    `- **Confidence:** ${mdInline(clean.confidence)}`,
    `- **Retry / correction count:** ${clean.retryCount}`,
    `- **Result:** ${mdInline(clean.result)}`,
    `- **Catalog status:** ${mdInline(clean.catalogStatus)}`,
    `- **Task type:** ${mdInline(clean.taskType || "Not supplied")}`,
    `- **Initial route:** ${mdInline(clean.initialRoute || "Not supplied")}`,
    `- **Escalation:** ${mdInline(clean.escalation || "None / not supplied")}`,
    "",
    section("Missed requirement / contract", clean.missedContract),
    section("What happened", clean.whatHappened),
    section("Expected behavior", clean.expectedBehavior),
    section("Likely cause", clean.likelyCause),
    section("Suggested improvement", clean.suggestedImprovement),
    "---",
    "This issue was created from structured TEMO feedback. The gateway does not accept raw conversation, code, logs, files, screenshots, email addresses, or arbitrary extra fields. User consent was asserted in the submitted payload."
  ];

  return lines.filter(Boolean).join("\n");
}

function section(title, value) {
  if (!value) return "";
  return `### ${title}\n\n${mdQuote(value)}\n`;
}

function mdQuote(value) {
  return String(value)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

function mdInline(value) {
  return String(value || "").replace(/[\r\n|]/g, " ").trim();
}

function schemaDocument(env) {
  return {
    ok: true,
    schemaVersion: "1.0",
    gatewayVersion: env.GATEWAY_VERSION || "0.1.0",
    endpoint: "/v1/feedback",
    method: "POST",
    contentType: "application/json",
    required: [
      "schemaVersion",
      "source",
      "consent",
      "feedbackMode",
      "clientId",
      "language",
      "providerTool",
      "temoVersion",
      "signalCode",
      "confidence",
      "result",
      "catalogStatus",
      "whatHappened",
      "expectedBehavior"
    ],
    signalCodes: [...SIGNAL_CODES],
    feedbackModes: [...MODES],
    results: [...RESULTS],
    confidence: [...CONFIDENCE],
    catalogStatus: [...CATALOG_STATUS],
    privacy: {
      acceptsRawConversation: false,
      acceptsCode: false,
      acceptsLogs: false,
      acceptsEmail: false,
      acceptsFiles: false,
      acceptsScreenshots: false,
      arbitraryFields: false
    }
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS,
      ...extraHeaders
    }
  });
}
