import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { z } from 'zod';

const scrypt = promisify(scryptCallback);
const dashboard = new URL('./dashboard-template.html', import.meta.url);
const signInPage = new URL('./sign-in.html', import.meta.url);
const maxBytes = 3 * 1024 * 1024;
const hashPattern = /^scrypt\$([0-9a-f]{32})\$([0-9a-f]{64})$/;
export const secretPattern = /^[A-Za-z0-9_-]{43,128}$/;
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
const sessionSeconds = 8 * 60 * 60;

function equal(supplied, expected) {
  if (typeof supplied !== 'string') return false;
  const digest = value => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(supplied), digest(expected));
}

async function passwordHash(password, salt = randomBytes(16).toString('hex')) {
  const key = await scrypt(password, salt, 32);
  return ['scrypt', salt, key.toString('hex')].join('$');
}

function signature(expiry, secret, hash) {
  return createHmac('sha256', secret).update(expiry).update('\0').update(hash).digest('base64url');
}

function sessionCookie(value, secure, age) {
  const name = secure ? '__Host-jobhunt' : 'jobhunt-local';
  return [name + '=' + value, 'HttpOnly', 'SameSite=Strict', 'Path=/', 'Max-Age=' + age, secure && 'Secure'].filter(Boolean).join('; ');
}

function signedIn(req, secure, secret, hash) {
  const name = secure ? '__Host-jobhunt' : 'jobhunt-local';
  const cookie = req.headers.cookie?.split(/;\s*/).find(part => part.startsWith(name + '='))?.slice(name.length + 1);
  if (!cookie) return false;
  const [expires, proof, remainder] = cookie.split('.');
  return !remainder && /^\d{10}$/.test(expires) && Number(expires) > Math.floor(Date.now() / 1000) &&
    equal(proof, signature(expires, secret, hash));
}

function redirect(res) {
  res.setHeader('Location', '/jobhunt');
  return res.status(303).end();
}

async function form(res, req, status, setup, error = '') {
  const nonce = randomBytes(18).toString('base64');
  const html = (await readFile(signInPage, 'utf8')).replace(/__([A-Z]+)__/g, (_, field) => ({
    TITLE: setup ? 'Create your password' : 'Sign in',
    DETAIL: setup ? 'Choose a password for your private Job Hunt dashboard on this PC.' : 'Sign in to view your job matches.',
    NONCE: nonce,
    ACTION: setup ? 'setup' : 'login',
    AUTOCOMPLETE: setup ? 'new-password' : 'current-password',
    HINT: setup ? '<div class="hint">Use 14 or more characters.</div>' : '',
    CONFIRM: setup ? '<div><label for="confirm">Confirm password</label><input id="confirm" name="confirm" type="password" autocomplete="new-password" maxlength="128" required></div>' : '',
    BUTTON: setup ? 'Create password and sign in' : 'Sign in',
    ERROR: error ? '<p class="error" role="alert">' + error + '</p>' : '',
  })[field]);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'nonce-" + nonce +
    "'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  return req.method === 'HEAD' ? res.status(status).end() : res.status(status).send(html);
}

export function createPortal({ secure, getHash, sessionSecret, setupHash, readSnapshot, publish, publishToken }) {
  const failures = new Map();

  return async function portal(req, res) {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');

    if (!['GET', 'HEAD', 'POST'].includes(req.method)) {
      res.setHeader('Allow', 'GET, HEAD, POST');
      return res.status(405).end();
    }

    try {
      const type = req.headers['content-type']?.split(';')[0];
      if (req.method === 'POST' && type === 'application/json') {
        if (!publish || !secretPattern.test(publishToken ?? '') ||
            equal(publishToken, sessionSecret) || !equal(req.headers.authorization, 'Bearer ' + publishToken)) {
          return res.status(401).end();
        }
        const parsed = snapshot.safeParse(req.body);
        if (!parsed.success) return res.status(400).send('Invalid job report.');
        const content = JSON.stringify(parsed.data);
        if (Buffer.byteLength(content) > maxBytes) return res.status(413).end();
        await publish(content);
        return res.status(204).end();
      }

      const hash = await getHash();
      const setup = hash == null && typeof setupHash === 'function';
      if ((!setup && !hashPattern.test(hash ?? '')) || !secretPattern.test(sessionSecret ?? '')) {
        return res.status(503).send('Job Hunt is not configured.');
      }

      if (req.method === 'POST') {
        if (type !== 'application/x-www-form-urlencoded') return res.status(415).end();
        if (req.headers.origin !== (secure ? 'https://' : 'http://') + req.headers.host) {
          return res.status(403).end();
        }
        const fields = typeof req.body === 'string' ? Object.fromEntries(new URLSearchParams(req.body)) : req.body;
        const { action, username, password, confirm } = fields ?? {};
        if (action === 'logout') {
          res.setHeader('Set-Cookie', sessionCookie('', secure, 0));
          return redirect(res);
        }
        if (action !== (setup ? 'setup' : 'login')) return res.status(400).end();

        const now = Date.now();
        for (const [address, attempt] of failures) {
          if (attempt.expiry < now) failures.delete(address);
        }
        const client = req.socket?.remoteAddress ?? 'unknown';
        const attempt = failures.get(client) ?? { count: 0, expiry: now + 120_000 };
        if (attempt.count >= 8) return form(res, req, 429, setup, 'Too many attempts. Try again in two minutes.');
        if (failures.size >= 1000 && !failures.has(client)) return res.status(429).end();
        attempt.count += 1;
        failures.set(client, attempt);

        if (username !== 'owner' || typeof password !== 'string' || password.length > 128) {
          return form(res, req, 401, setup, 'Check your password and try again.');
        }
        let activeHash = hash;
        if (setup) {
          if (password.length < 14 || password !== confirm) {
            return form(res, req, 400, setup, 'Use at least 14 characters and enter the same password twice.');
          }
          activeHash = await passwordHash(password);
          if (!(await setupHash(activeHash))) return res.status(409).send('Password already set. Reopen Job Hunt.');
        } else {
          const [, salt] = hash.match(hashPattern);
          if (!equal(await passwordHash(password, salt), hash)) {
            return form(res, req, 401, false, 'Check your password and try again.');
          }
        }

        failures.delete(client);
        const expiry = String(Math.floor(now / 1000) + sessionSeconds);
        res.setHeader('Set-Cookie', sessionCookie(expiry + '.' + signature(expiry, sessionSecret, activeHash), secure, sessionSeconds));
        return redirect(res);
      }

      if (setup || !signedIn(req, secure, sessionSecret, hash)) return form(res, req, 200, setup);
      if (req.method === 'HEAD') return res.status(200).end();

      const data = snapshot.parse(await readSnapshot());
      const content = JSON.stringify(data).replace(/</g, '\\u003c');
      const nonce = randomBytes(18).toString('base64');
      const html = (await readFile(dashboard, 'utf8')).replace(/<(script|style)(?=[\s>])/g, '<$1 nonce="' + nonce + '"')
        .replace('__DASHBOARD_DATA__', () => content);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'nonce-" + nonce +
        "'; style-src 'nonce-" + nonce + "'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
      return res.status(200).send(html);
    } catch {
      return res.status(503).send('Job Hunt is temporarily unavailable.');
    }
  };
}
