import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { get, put } from '@vercel/blob';
import { z } from 'zod';

const path = 'jobhunt/dashboard.json';
const templatePath = new URL('../jobhunt/dashboard-template.html', import.meta.url);
const maxBytes = 3 * 1024 * 1024;
const secretPattern = /^[A-Za-z0-9_-]{43,128}$/;
const httpsUrl = z.string().url().refine(url => url.startsWith('https://'));
const job = z.object({
  status: z.string(), title: z.string(), company: z.string(), region: z.string(), location: z.string(),
  role_family: z.string(), skills: z.string(), eligibility_check: z.string(), posted: z.string(),
  employment: z.string(), salary: z.string(), timezones: z.string(), url: httpsUrl,
  source: z.string(), source_url: httpsUrl.or(z.literal('')),
});
const check = z.object({
  title: z.string(), text: z.string(),
  links: z.array(z.object({ label: z.string(), url: httpsUrl })),
});
const report = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  jobs: z.array(job),
  health: z.array(z.object({ source: z.string(), status: z.string() })),
  supplement: z.array(z.object({ title: z.string(), items: z.array(check) })),
});
const snapshot = z.array(report).max(30);

function credentialsMatch(supplied, expected) {
  if (typeof supplied !== 'string') return false;
  const digest = value => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(supplied), digest(expected));
}

function authHeader(user, password) {
  return 'Basic ' + Buffer.from(user + ':' + password, 'utf8').toString('base64');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');

  if (!['GET', 'HEAD', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD, POST');
    return res.status(405).end();
  }

  const { JOBHUNT_OWNER_PASSWORD: ownerPassword, JOBHUNT_PUBLISH_TOKEN: publishToken,
          JOBHUNT_BLOB_TOKEN: storeToken } = process.env;
  if (!secretPattern.test(ownerPassword ?? '') || !secretPattern.test(publishToken ?? '') ||
      ownerPassword === publishToken || !storeToken) {
    return res.status(503).send('Job Hunt is not configured.');
  }

  const storage = { access: 'private', token: storeToken };
  if (req.method === 'POST') {
    if (!credentialsMatch(req.headers.authorization, 'Bearer ' + publishToken)) {
      return res.status(401).end();
    }
    if (req.headers['content-type']?.split(';')[0] !== 'application/json') {
      return res.status(415).end();
    }
    const parsed = snapshot.safeParse(req.body);
    if (!parsed.success) return res.status(400).send('Invalid job report.');
    const content = JSON.stringify(parsed.data);
    if (Buffer.byteLength(content) > maxBytes) return res.status(413).end();
    try {
      await put(path, content, {
        ...storage, addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
      });
      return res.status(204).end();
    } catch {
      return res.status(502).send('Private report storage is unavailable.');
    }
  }

  if (!credentialsMatch(req.headers.authorization, authHeader('owner', ownerPassword))) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Job Hunt", charset="UTF-8"');
    return res.status(401).send('Owner sign-in required.');
  }

  try {
    const blob = await get(path, { ...storage, useCache: false });
    if (blob && blob.statusCode !== 200) return res.status(502).send('Private report storage is unavailable.');
    const data = blob ? await new Response(blob.stream).json() : [];
    const reportJson = JSON.stringify(snapshot.parse(data)).replace(/</g, '\\u003c');
    const nonce = randomBytes(18).toString('base64');
    const template = await readFile(templatePath, 'utf8');
    const html = template.replace(/<(script|style)(?=[\s>])/g, '<$1 nonce="' + nonce + '"')
      .replace('__DASHBOARD_DATA__', () => reportJson);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'nonce-" + nonce +
      "'; style-src 'nonce-" + nonce + "'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
    if (req.method === 'HEAD') return res.status(200).end();
    return res.status(200).send(html);
  } catch {
    return res.status(502).send('Private report storage is unavailable.');
  }
}
