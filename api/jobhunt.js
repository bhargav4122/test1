import { BlobPreconditionFailedError, get, put } from '@vercel/blob';
import { createPortal } from '../jobhunt/portal.js';

const origin = 'https://www.businessanddatasolutions.com';
const path = 'jobhunt/dashboard.json';
const ownerPath = 'jobhunt/owner-recovery.json';
const storeId = process.env.JOBHUNT_STORE_ID;
const token = process.env.JOBHUNT_BLOB_TOKEN;
const storage = { access: 'private', ...(storeId ? { storeId } : { token }) };
const storageConfigured = Boolean(storeId || token);
const ownerHash = process.env.JOBHUNT_OWNER_PASSWORD_HASH;
const recoveryEmail = process.env.JOBHUNT_RECOVERY_EMAIL?.trim();
const mailToken = process.env.RESEND_API_KEY;
const recoveryConfigured = storageConfigured && recoveryEmail && mailToken;

async function readPrivate(pathname) {
  if (!storageConfigured) throw new Error('Private storage is not configured.');
  const blob = await get(pathname, { ...storage, useCache: false });
  if (!blob) return null;
  if (blob.statusCode !== 200) throw new Error('Private storage is unavailable.');
  return { data: await new Response(blob.stream).json(), etag: blob.blob.etag };
}

async function getOwner() {
  const blob = storageConfigured ? await readPrivate(ownerPath) : null;
  return blob ? { ...blob.data, etag: blob.etag } : { hash: ownerHash };
}

async function saveOwner(current, next) {
  const version = current.etag;
  try {
    await put(ownerPath, JSON.stringify(next), {
      ...storage, addRandomSuffix: false, contentType: 'application/json',
      ...(version ? { ifMatch: version } : { allowOverwrite: false }),
    });
    return true;
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError) return false;
    if (!version && (await getOwner()).etag) return false;
    throw error;
  }
}

async function sendReset(resetToken) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + mailToken, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      from: 'Business & Data Solutions <Info@businessanddatasolutions.com>',
      to: [recoveryEmail],
      subject: 'Reset your Job Hunt password',
      text: 'Use this link to reset your Job Hunt password:\n\n' + origin + '/jobhunt?view=reset#' + resetToken +
        '\n\nThe link expires in 20 minutes and works once. If you did not request it, you can ignore this email.',
    }),
  });
  if (!response.ok) throw new Error('Password reset email could not be sent.');
}

export default createPortal({
  secure: true,
  getOwner,
  saveOwner: recoveryConfigured ? saveOwner : undefined,
  sendReset: recoveryConfigured ? sendReset : undefined,
  recoveryEmail,
  sessionSecret: process.env.JOBHUNT_SESSION_SECRET,
  publishToken: process.env.JOBHUNT_PUBLISH_TOKEN,
  async readSnapshot() {
    return (await readPrivate(path))?.data ?? [];
  },
  publish: storageConfigured && (content => put(path, content, {
    ...storage, addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
  })),
});
