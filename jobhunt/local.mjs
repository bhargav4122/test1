import { randomBytes } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPortal } from './portal.js';

const root = fileURLToPath(new URL('../../', import.meta.url));
const state = resolve(process.env.JOBHUNT_LOCAL_STATE ?? resolve(root, 'state'));
const credential = resolve(state, 'local-owner.hash');
const localDashboard = resolve(root, 'Job Hunt.html');
const host = '127.0.0.1';
const port = Number(process.env.JOBHUNT_LOCAL_PORT ?? '8787');
const address = 'http://' + host + ':' + port;
await mkdir(state, { recursive: true });

const handler = createPortal({
  secure: false,
  sessionSecret: randomBytes(32).toString('base64url'),
  async getHash() {
    try {
      return (await readFile(credential, 'utf8')).trim();
    } catch (error) {
      if (error.code === 'ENOENT') return null;
      throw error;
    }
  },
  async setupHash(hash) {
    try {
      await writeFile(credential, hash + '\n', { flag: 'wx', mode: 0o600 });
      return true;
    } catch (error) {
      if (error.code === 'EEXIST') return false;
      throw error;
    }
  },
  async readSnapshot() {
    const html = await readFile(localDashboard, 'utf8');
    const data = html.match(/<script type="application\/json" id="data">([\s\S]*?)<\/script>/);
    if (!data) throw new Error('Local dashboard snapshot unavailable.');
    return JSON.parse(data[1]);
  },
});

const server = createServer(async (req, res) => {
  if (req.headers.host !== host + ':' + port) {
    res.writeHead(421).end();
    return;
  }
  const path = new URL(req.url, address).pathname;
  if (path === '/') {
    res.writeHead(302, { Location: '/jobhunt', 'Cache-Control': 'no-store' }).end();
    return;
  }
  if (!['/jobhunt', '/jobhunt/'].includes(path)) {
    res.writeHead(404).end();
    return;
  }
  res.status = status => { res.statusCode = status; return res; };
  res.send = body => res.end(body);

  try {
    if (req.method === 'POST') {
      const chunks = [];
      let bytes = 0;
      for await (const chunk of req) {
        bytes += chunk.length;
        if (bytes > 4096) {
          res.writeHead(413).end();
          return;
        }
        chunks.push(chunk);
      }
      req.body = Buffer.concat(chunks).toString('utf8');
    }
    await handler(req, res);
  } catch {
    if (!res.headersSent) res.writeHead(400);
    res.end();
  }
});
server.listen(port, host, () => console.log('Private Job Hunt is running at ' + address + '/jobhunt'));
