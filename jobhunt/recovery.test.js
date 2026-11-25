import assert from 'node:assert/strict';
import { scryptSync } from 'node:crypto';
import test from 'node:test';
import { createPortal } from './portal.js';

test('owner recovery restricts delivery, rejects replay and revokes existing sessions', async () => {
  const host = 'www.businessanddatasolutions.com';
  const email = 'owner@example.test';
  const originalPassword = 'original-password-fixture';
  const newPassword = 'new-password-test-fixture';
  const salt = 'a'.repeat(32);
  let owner = { hash: ['scrypt', salt, scryptSync(originalPassword, salt, 32).toString('hex')].join('$') };
  let version = 0;
  const sent = [];
  const handler = createPortal({
    secure: true,
    recoveryEmail: email,
    sessionSecret: 'S'.repeat(43),
    async getOwner() { return { ...owner, etag: version }; },
    async saveOwner(current, next) {
      if (current.etag !== version) return false;
      owner = next;
      version += 1;
      return true;
    },
    async sendReset(token) { sent.push(token); },
    async readSnapshot() { return []; },
  });

  async function send({ method = 'GET', url = '/jobhunt', body, cookie, origin = 'https://' + host } = {}) {
    const res = {
      code: 0, body: '', headers: {},
      setHeader(key, value) { this.headers[key] = value; },
      status(value) { this.code = value; return this; },
      send(value) { this.body = value; },
      end() {},
    };
    await handler({
      method, url, body, headers: { host, origin, cookie, 'content-type': 'application/x-www-form-urlencoded' },
    }, res);
    assert.match(res.headers['Cache-Control'], /no-store/);
    return res;
  }

  const login = password => send({ method: 'POST', body: { action: 'login', username: 'owner', password } });
  const reset = (token, password = newPassword) => send({
    method: 'POST', body: { action: 'reset', token, password, confirm: password },
  });
  assert.match((await send()).body, /Forgot password/);
  assert.equal((await send({ url: '/jobhunt?view=recover' })).code, 200);
  const oldSession = (await login(originalPassword)).headers['Set-Cookie'];
  assert.ok(oldSession);

  const wrongEmail = await send({ method: 'POST', body: { action: 'recover', email: 'other@example.test' } });
  const request = { method: 'POST', body: { action: 'recover', email } };
  assert.equal((await send({ ...request, origin: 'https://outside.example' })).code, 403);
  assert.equal(sent.length, 0);
  const twoRequests = await Promise.all([send(request), send(request)]);
  for (const response of twoRequests) {
    assert.match(response.body, /If the address matches your recovery email/);
  }
  assert.match(wrongEmail.body, /If the address matches your recovery email/);
  assert.equal(sent.length, 1);
  assert.equal(await send(request).then(response => response.code), 200);
  assert.equal(sent.length, 1);
  assert.equal(owner.resetToken, undefined);
  assert.notEqual(owner.resetDigest, sent[0]);
  assert.ok(owner.expiresAt > Date.now());
  const expiresAt = owner.expiresAt;
  owner.expiresAt = Date.now() - 1;
  assert.equal((await reset(sent[0])).code, 400);
  owner.expiresAt = expiresAt;
  assert.equal((await reset('X'.repeat(43))).code, 400);

  const short = await reset(sent[0], 'short');
  assert.equal(short.code, 400);
  assert.match(short.body, /Choose a new password/);
  assert.match(short.body, new RegExp(sent[0]));
  const twoResets = await Promise.all([reset(sent[0]), reset(sent[0])]);
  assert.deepEqual(twoResets.map(response => response.code).sort(), [303, 409]);
  assert.equal((await reset(sent[0])).code, 400);
  assert.equal(owner.resetDigest, undefined);
  assert.equal((await login(originalPassword)).code, 401);
  assert.equal((await login(newPassword)).code, 303);
  const oldVisitor = await send({ cookie: oldSession.split(';')[0] });
  assert.match(oldVisitor.body, /Sign in to view your job matches/);
  assert.doesNotMatch(oldVisitor.body, /Remote opportunities/);
});
