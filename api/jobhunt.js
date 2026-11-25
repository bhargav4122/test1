import { get, put } from '@vercel/blob';
import { createPortal } from '../jobhunt/portal.js';

const path = 'jobhunt/dashboard.json';
const storage = { access: 'private', token: process.env.JOBHUNT_BLOB_TOKEN };

export default createPortal({
  secure: true,
  getHash: () => process.env.JOBHUNT_OWNER_PASSWORD_HASH,
  sessionSecret: process.env.JOBHUNT_SESSION_SECRET,
  publishToken: process.env.JOBHUNT_PUBLISH_TOKEN,
  async readSnapshot() {
    if (!storage.token) throw new Error('Private report storage is not configured.');
    const blob = await get(path, { ...storage, useCache: false });
    if (!blob) return [];
    if (blob.statusCode !== 200) throw new Error('Private report storage is unavailable.');
    return new Response(blob.stream).json();
  },
  publish: storage.token && (content => put(path, content, {
    ...storage, addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json',
  })),
});
