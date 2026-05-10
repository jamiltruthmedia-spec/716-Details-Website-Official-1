const ALLOWED_SERVICES = new Set([
  'Car Detailing',
  'Ceramic Coating',
  'Window Tinting',
]);

const PUBLIC_ERROR = 'Quote form is not available right now. Please call or text us directly at (716) 405-9988.';

function isAllowedOrigin(origin) {
  if (origin === 'null') return true;
  if (/^https:\/\/(www\.)?716detailing\.com$/.test(origin)) return true;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  return false;
}

function setCors(req, res) {
  const origin = String(req.headers.origin || '');

  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizePhone(value) {
  const raw = clean(value);
  const digits = raw.replace(/\D/g, '');

  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;

  return raw;
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false, message: PUBLIC_ERROR });
  }

  if (!String(req.headers['content-type'] || '').includes('application/json')) {
    return sendJson(res, 415, { ok: false, message: PUBLIC_ERROR });
  }

  const webhookUrl = process.env.GHL_QUOTE_WEBHOOK_URL;
  if (!webhookUrl) {
    return sendJson(res, 500, { ok: false, message: PUBLIC_ERROR });
  }

  let body = {};
  if (req.body && typeof req.body === 'object') {
    body = req.body;
  } else if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body);
    } catch (error) {
      body = {};
    }
  }
  const name = clean(body.name);
  const phone = normalizePhone(body.phone);
  const vehicleMakeModel = clean(body.vehicleMakeModel);
  const message = clean(body.message);
  const service = clean(body.service);
  const landingPageSource = clean(body.landingPageSource);
  const pageUrl = clean(body.pageUrl);

  if (!name || !phone || !vehicleMakeModel || !ALLOWED_SERVICES.has(service)) {
    return sendJson(res, 400, { ok: false, message: 'Please complete your name, phone, and vehicle.' });
  }

  const payload = {
    name,
    phone,
    vehicleMakeModel,
    message,
    service,
    landingPageSource,
    pageUrl,
    submittedAt: new Date().toISOString(),
    submissionId: crypto.randomUUID(),
    source: 'Landing Page Quote Form',
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return sendJson(res, 502, { ok: false, message: PUBLIC_ERROR });
    }

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    return sendJson(res, 502, { ok: false, message: PUBLIC_ERROR });
  }
}
