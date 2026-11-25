# Private Job Hunt

## Local review

Run `node jobhunt/local.mjs` from this worktree and open `http://127.0.0.1:8787/jobhunt`. On the first visit, create a password of at least 14 characters. The username is `owner`. The preview stores a password hash in the collector's local `state/local-owner.hash` file. The file stays outside the website workspace and Git. The service listens on the loopback address only. Restarting the preview signs out existing sessions.

After sign-in, the dashboard reads the current local collector report. The **Sign out** button expires the browser session. Job links open the original listing or employer application page.

## GitHub and Vercel

The `/jobhunt` route calls a server function before the public site's SPA fallback. The function checks a signed, HTTP-only session before reading the report from private storage. The same function serves `/api/jobhunt`. A separately authenticated publisher can update the snapshot.

The existing GitHub integration handles Vercel deployments. Configure these values securely before enabling the route in production:

| Project variable | Purpose |
| --- | --- |
| `JOBHUNT_OWNER_PASSWORD_HASH` | The owner's locally generated `scrypt$` hash |
| `JOBHUNT_SESSION_SECRET` | Independent random 32-byte value encoded as Base64URL |
| `JOBHUNT_PUBLISH_TOKEN` | Independent random 32-byte value encoded as Base64URL |
| `JOBHUNT_STORE_ID` | Set by connecting the dedicated **Private** Blob with the `JOBHUNT` prefix |

Vercel authenticates the server function to the dedicated Blob store with OIDC. A static store token is optional legacy configuration when the store ID is absent. Confirm that a signed-out browser can only load the sign-in form and that wrong passwords cannot retrieve the report. Use the local collector's `publish_dashboard.py` to send the first report after the private route has been verified. Keep credentials, report snapshots and CVs outside GitHub.
