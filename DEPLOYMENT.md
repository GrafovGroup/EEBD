# Build, preview and release

## Current source and hosting

- Source: `https://github.com/GrafovGroup/EEBD.git`, branch `codex/initial-build`.
- Baseline: `7da80d346ab1bacbe70447b1a185236f44ce4009`.
- Hosting provider: WHC, selected by the owner. Existing Web Hosting Pro/cPanel account inspected through an owner-authenticated browser. No Sites project is used.
- Domain: owner-authenticated registrar and hosting access verified. Separate hosting directory created; existing parking DNS and forwarding MX/TXT inspected and preserved. DNS change and HTTPS remain pending.
- A minimal holding page is installed and verified directly at the origin. No full-site production release, DNS change, mailbox test, analytics configuration or search-console submission has occurred.

## Reproducible commands

Use Node **24.22.1** (see `.nvmrc`). There are no third-party build/runtime dependencies. `npm install` is unnecessary for the core build.

```sh
node scripts/brand-assets.mjs
node scripts/build.mjs
node scripts/dev.mjs
```

The development server listens on `127.0.0.1:4173`, builds `dist/` and rebuilds after source/public changes. Refresh the browser after an edit. Open `/brand-concepts/`, `/en/` or `/fr/`. `PORT` can override the port. The server is for local preview only, not a production deployment target. Stop it with Ctrl-C.

```sh
node scripts/check.mjs
node --test tests/*.test.mjs
node scripts/build.mjs --production
```

The checker uses an isolated `test-results/check-build` to avoid competing with the preview build. The production command is intentionally blocked by unresolved configuration. Do not treat a preview build as a deployable release. Route state, truthful content, provider integrations, policy text and production hosting must be completed before enabling it; setting readiness booleans alone is not integration work.

Optional browser QA uses `scripts/browser-check.mjs` with an existing Playwright installation. Set `EEBD_PLAYWRIGHT_MODULE` to its module path and `EEBD_CHROME_EXECUTABLE` to an installed Chromium-compatible browser if needed. These are QA tools, not site dependencies. Reports/screenshots remain in ignored `test-results/` and are not shipped.

## Deployment contract to complete

WHC is selected. Verify actual account capabilities and the private enquiry service before release. The WHC package below needs no hosted Node runtime.

Production hosting must enforce HTTPS/canonical hostname, deliberate root and slash redirects, real localized 404 responses, MIME types, security headers and production indexing rules. `_headers` and `_redirects` in the generated preview are not evidence that a chosen host supports them. The development server currently enforces noindex and a restrictive CSP; the production policy must reflect the real form endpoint.

The enquiry endpoint must add server validation, bounded requests, rate and bot controls, duplicate protection, durable acceptance and truthful notification outcomes. Attachments remain absent unless private validated storage is implemented. Review actual provider/recipient/retention data flows and replace the preview privacy text. Test all three types in both languages with an authorized controlled destination; acceptance, notification acceptance and inbox receipt are separate evidence.

Before release, mark only approved complete routes as published/indexable. The generator rejects links from production pages to unpublished route destinations. Unverified products remain build-time-only and are never serialized to public assets.

## Release and rollback records

For each actual release record source remote/branch/commit, exact build, hosting project/version, deployed URL, audience, domain bindings and live checks. Preserve existing MX/TXT records during any authorized DNS change. Roll back to a verified prior deployed version or rebuild the recorded source commit; source backups do not replace private data backups.

No deployed revision or rollback target exists yet. Source synchronization evidence is recorded in PROJECT_STATUS.md rather than inferred from a local commit.

## WHC preparation — current milestone

The owner selected existing WHC hosting and provided interactive access. The account shows Web Hosting Pro with cPanel, SSH/SFTP, PHP selection and cron. Confirm the **actual per-domain PHP version and extensions**, not just the presence of menu entries. Do not change an account-wide PHP setting that could affect other sites.

`node scripts/package-whc.mjs` prepares `test-results/whc-preview/`:

- `web-root/`: static output, the public PHP entrypoint and an Apache/LiteSpeed `.htaccess`. Preview access is denied by default; noindex alone is not privacy.
- `eebd-private/`: PHP application, schema, config example and private data directory. Place this outside **every** document root; never extract the whole package into a public directory. Directory permissions 0700, files 0600, matching PHP worker ownership. Include all public roots in private configuration and set `EEBD_PRIVATE_DIR` to its absolute path on the host.
- `manifest.json`: SHA-256 file inventory, base Git commit and dirty-source indicator. A dirty package is not an exact committed release.

Required backend capabilities: PHP 8.3+, PDO SQLite, mbstring, local filesystem locking/durability, cron, and a verified PHP `mail()` transport authorized for the sender domain. No third-party PHP dependency is shipped. Configure `config.php` privately, generate a random secret, establish retention and recipient handling, then test with a controlled destination before enabling acceptance. The example is intentionally disabled and retention is unset.

The endpoint checks exact origin, method, JSON size/type, signed timed tokens, honeypot, request/field validation, per-address and global rates, and idempotency. An accepted response follows a SQLite commit. The worker separately queues/retries notifications; `mail-accepted` is **not inbox delivery**. A crash between SMTP acceptance and recording it can repeat a notification; the stable reference and Message-ID identify it. The request itself is deduplicated. A cron exit code of 2 means pending notifications need monitoring. Pending requests are retained for investigation; delivered records follow the configured retention interval. Backup/mailbox retention and failed-request escalation must be agreed and reflected in the production privacy notice before launch.

Worker command after installing privately: `php /absolute/private/directory/worker.php`, scheduled once per minute. Select the actual PHP 8.3+ binary in cPanel. Do not redirect errors into a publicly accessible log or discard monitoring. Restore-test the private database before accepting real enquiries. Only an authorized operator should inspect or export request rows.

Local backend checks can run using an externally installed WordPress PHP-WASM runtime (tested packages `@php-wasm/node` and `@php-wasm/universal` 3.1.54):

```sh
EEBD_PHP_WASM_DIR=/absolute/path/to/node_modules node scripts/php-check.mjs
```

This validates PHP/SQLite logic with a fake mail transport. It does not establish WHC filesystem durability, real concurrent PHP workers, cron execution, SMTP acceptance, spam placement or inbox receipt.

### Host observation / partial connection

The new EEBD domain has its own document root, separate from the main site and existing addon sites. A minimal bilingual holding page generated by `node scripts/holding-page.mjs` was installed there and checked byte-for-byte by a direct origin HTTP request. Its SHA-256 is `d48768e72d8754b0f793d41ea9b78cae8f8025537cbac6b151cd63e6b60865c0`. It carries noindex, CSP and nosniff headers and accepts no enquiries. The full preview and endpoint have not been publicly deployed.

Authoritative DNS still points to WHC parking. Existing nameservers and MX/TXT records have not been changed. DNS editing is pending a wider browser viewport; the owner was asked to expand it because WHC explicitly disables editing at mobile widths. HTTPS and canonical redirects must be verified after DNS connection. The owner has also been asked whether info@eebd.ca should forward to the designated account inbox or use a separate mailbox; no routing change or test message has occurred.

WHC CLI observations: default PHP 8.2.35; EA-PHP 8.3.36 has PDO SQLite and mbstring. The 48 synthetic backend checks passed on the latter. Select and verify the **web** runtime for EEBD separately before enabling the endpoint. CLI evidence is not proof of web-SAPI configuration. Private host test directories contain synthetic data only and are not web roots.
