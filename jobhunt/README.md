# Private Job Hunt deployment

The main website uses the existing Vercel project. The special route `/jobhunt` calls a server function before the site's public SPA fallback. Both `/jobhunt` and `/api/jobhunt` require the same owner credential to read. Browser responses are private and uncached.

## Production configuration

1. Attach a dedicated **Private** Vercel Blob store. Set its read/write token as `JOBHUNT_BLOB_TOKEN` in the Vercel project.
2. Generate two independent long random secrets (at least 32 random bytes each, Base64URL encoded). Set `JOBHUNT_OWNER_PASSWORD` and `JOBHUNT_PUBLISH_TOKEN` in Vercel. Use the owner secret with username `owner` in the browser's HTTPS sign-in prompt. Keep it in your password manager. Keep the publisher token on the collector machine.
3. Deploy through the GitHub-connected project. Check that unauthenticated requests to both paths return 401 before uploading the first report. Verify that an authenticated owner can see the report and that public pages still load.
4. Use the local collector's `publish_dashboard.py` to send the report snapshot. Publisher credentials cannot read the dashboard. The publisher accepts report JSON only. Preserve the local collector at 08:00 UK time.

GitHub holds the site source. The private Blob holds the latest snapshot from the collector, including up to 30 report dates. Job application links open the original vacancy. The site accepts no CV uploads, applicant information or share links.
