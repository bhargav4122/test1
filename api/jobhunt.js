import { get, put } from '@vercel/blob';
import { createPortal } from '../jobhunt/portal.js';

const path = 'jobhunt/dashboard.json';
const storeId = process.env.JOBHUNT_STORE_ID;
const token = process.env.JOBHUNT_BLOB_TOKEN;
const storage = { access: 'private', ...(storeId ? { storeId } : { token }) };
const storageConfigured = Boolean(storeId || token);

export default createPortal({
  secure: true,
  getHash: () => process.env.JOBHUNT_OWNER_PASSWORD_HASH,
  sessionSecret: process.env.JOBHUNT_SESSION_SECRET,
  publishToken: process.env.JOBHUNT_PUBLISH_TOKEN,
  async readSnapshot() {
    if (!storageConfigured) throw new Error('Private report storage is not configured.');
    const blob = await get(path, { ...storage, useCache: false });
    if (!blob) return [];
    if (blob.statusCode !== 200) throw new Error('Private report storage is unavailable.');
    return new Response(blob.stream).json();
  },
  publish: storageConfigured && (content => put(path, content, {
    ...storage, addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
  })),
});
