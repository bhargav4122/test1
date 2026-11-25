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
  if (typeof supplied !== 'string' || typeof expected !== 'string') return false;
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

const resetDuration = 20 * 60_000;
const resetCooldown = 2 * 60_000;
const resetTokenPattern = /^[A-Za-z0-9_-]{43}$/;
const invalidReset = 'This link is invalid, expired or already used. Request a new link.';
const recoveryHint = 'If the address matches your recovery email, you’ll receive a reset link shortly.';

function tokenDigest(token) {
  return createHash('sha256').update(token).digest('hex');
}

async function form(res, req, status, mode, { error = '', recovery = false, resetToken = '' } = {}) {
  const nonce = randomBytes(18).toString('base64');
  const titles = {
    setup: 'Create your password', login: 'Sign in', recover: 'Forgot your password?',
    'reset-sent': 'Check your email', reset: 'Choose a new password', 'reset-complete': 'Password updated',
  };
  const details = {
    setup: 'Choose a password for your private Job Hunt dashboard on this PC.', login: 'Sign in to view your job matches.',
    recover: 'Enter your recovery email and we’ll send you a link to reset your password.',
    'reset-sent': recoveryHint, reset: 'Use 14 or more characters. Your existing sessions will end.',
    'reset-complete': 'Sign in with your new password to view your job matches.',
  };
  const labels = { setup: 'Create password and sign in', login: 'Sign in', recover: 'Send reset link', reset: 'Reset password' };
  const username = '<div><label for="username">Username</label><input id="username" name="username" value="owner" autocomplete="username" readonly></div>';
  const password = mode === 'login' ? 'current-password' : 'new-password';
  const passwordField = '<div><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="' +
    password + '" maxlength="128" required></div>';
  const confirmField = '<div><label for="confirm">Confirm password</label><input id="confirm" name="confirm" type="password" autocomplete="new-password" maxlength="128" required></div>';
  const fields = {
    login: username + passwordField,
    setup: username + passwordField + '<p class="hint">Use 14 or more characters.</p>' + confirmField,
    recover: '<div><label for="email">Recovery email</label><input id="email" name="email" type="email" autocomplete="email" maxlength="254" required></div>',
    reset: '<input type="hidden" name="token" id="reset-token" value="' +
      (resetTokenPattern.test(resetToken) ? resetToken : '') + '"><p class="error" id="invalid-link" hidden>' + invalidReset + '</p>' +
      passwordField + confirmField,
  };
  const script = mode === 'reset' ? '<script nonce="' + nonce + '">' +
    'const token = location.hash.slice(1) || document.getElementById("reset-token").value; const valid = /^[A-Za-z0-9_-]{43}$/.test(token);' +
    'document.getElementById("reset-token").value = valid ? token : "";' +
    'document.getElementById("invalid-link").hidden = valid;' +
    'document.getElementById("submit-access").disabled = !valid;' +
    'if (location.hash) history.replaceState(null, "", location.pathname + location.search);</script>' : '';
  const link = mode === 'login' && recovery ? '<a class="return" href="/jobhunt?view=recover">Forgot password?</a>' :
    mode !== 'login' && mode !== 'setup' ? '<a class="return" href="/jobhunt">Back to sign in</a>' : '';
  const html = (await readFile(signInPage, 'utf8')).replace(/__([A-Z]+)__/g, (_, field) => ({
    TITLE: titles[mode], DETAIL: details[mode], NONCE: nonce, ACTION: mode,
    ERROR: error ? '<p class="error" role="alert">' + error + '</p>' : '',
    FIELDS: fields[mode] ?? '', LINK: link, SCRIPT: script,
    SUBMIT: labels[mode] ? '<button id="submit-access" type="submit"' + (mode === 'reset' ? ' disabled' : '') + '>' + labels[mode] + '</button>' : '',
  })[field]);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'nonce-" + nonce +
    "'; script-src 'nonce-" + nonce + "'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  return req.method === 'HEAD' ? res.status(status).end() : res.status(status).send(html);
}

export function createPortal({
  secure, getHash, sessionSecret, setupHash, readSnapshot, publish, publishToken,
  getOwner, saveOwner, sendReset, recoveryEmail,
}) {
  const recovery = Boolean(secure && getOwner && saveOwner && sendReset && recoveryEmail);
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
        if (!publish || !secretPattern.test(publishToken ?? '') || !secretPattern.test(sessionSecret ?? '') ||
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

      const owner = getOwner ? await getOwner() : { hash: await getHash() };
      const hash = owner.hash;
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
        const { action, username, password, confirm, email, token } = fields ?? {};
        if (recovery && action === 'recover') {
          const now = Date.now();
          if (typeof email === 'string' && email.length <= 254 &&
              equal(email.trim().toLowerCase(), recoveryEmail.toLowerCase()) &&
              (!owner.requestedAt || now - owner.requestedAt >= resetCooldown)) {
            const resetToken = randomBytes(32).toString('base64url');
            const saved = await saveOwner(owner, {
              hash, resetDigest: tokenDigest(resetToken), expiresAt: now + resetDuration, requestedAt: now,
            });
            if (saved) {
              try {
                await sendReset(resetToken);
              } catch {
                console.error('Job Hunt recovery email delivery failed.');
              }
            }
          }
          return form(res, req, 200, 'reset-sent');
        }
        if (recovery && action === 'reset') {
          if (typeof token !== 'string' || !resetTokenPattern.test(token) ||
              typeof owner.expiresAt !== 'number' || owner.expiresAt <= Date.now() ||
              !equal(tokenDigest(token), owner.resetDigest)) {
            return form(res, req, 400, 'recover', { error: invalidReset });
          }
          if (typeof password !== 'string' || password.length < 14 || password.length > 128 || password !== confirm) {
            return form(res, req, 400, 'reset', { resetToken: token, error: 'Use at least 14 characters and enter the same password twice.' });
          }
          const saved = await saveOwner(owner, { hash: await passwordHash(password) });
          if (!saved) return form(res, req, 409, 'recover', { error: invalidReset });
          res.setHeader('Set-Cookie', sessionCookie('', secure, 0));
          res.setHeader('Location', '/jobhunt?view=reset-complete');
          return res.status(303).end();
        }
        if (action === 'logout') {
          res.setHeader('Set-Cookie', sessionCookie('', secure, 0));
          return redirect(res);
        }
        if (action !== (setup ? 'setup' : 'login')) return res.status(400).end();

        const mode = setup ? 'setup' : 'login';
        const now = Date.now();
        for (const [address, attempt] of failures) {
          if (attempt.expiry < now) failures.delete(address);
        }
        const client = req.socket?.remoteAddress ?? 'unknown';
        const attempt = failures.get(client) ?? { count: 0, expiry: now + 120_000 };
        if (attempt.count >= 8) return form(res, req, 429, mode, { error: 'Too many attempts. Try again in two minutes.', recovery });
        if (failures.size >= 1000 && !failures.has(client)) return res.status(429).end();
        attempt.count += 1;
        failures.set(client, attempt);

        if (username !== 'owner' || typeof password !== 'string' || password.length > 128) {
          return form(res, req, 401, mode, { error: 'Check your password and try again.', recovery });
        }
        let activeHash = hash;
        if (setup) {
          if (password.length < 14 || password !== confirm) {
            return form(res, req, 400, mode, { error: 'Use at least 14 characters and enter the same password twice.', recovery });
          }
          activeHash = await passwordHash(password);
          if (!(await setupHash(activeHash))) return res.status(409).send('Password already set. Reopen Job Hunt.');
        } else {
          const [, salt] = hash.match(hashPattern);
          if (!equal(await passwordHash(password, salt), hash)) {
            return form(res, req, 401, mode, { error: 'Check your password and try again.', recovery });
          }
        }

        failures.delete(client);
        const expiry = String(Math.floor(now / 1000) + sessionSeconds);
        res.setHeader('Set-Cookie', sessionCookie(expiry + '.' + signature(expiry, sessionSecret, activeHash), secure, sessionSeconds));
        return redirect(res);
      }

      const view = new URL(req.url || '/', 'https://www.businessanddatasolutions.com').searchParams.get('view');
      if (recovery && ['recover', 'reset', 'reset-complete'].includes(view)) return form(res, req, 200, view);
      if (setup || !signedIn(req, secure, sessionSecret, hash)) {
        return form(res, req, 200, setup ? 'setup' : 'login', { recovery });
      }
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
