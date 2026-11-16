# Build, preview and release

## Current deployment

The complete bilingual enquiry website is live at **https://eebd.ca/** on WHC. The root redirects to `/en/`; `/fr/` is available through the language switch. The domain has its own document root, separate from existing websites.

- Repository: `https://github.com/GrafovGroup/EEBD.git`, branch `codex/initial-build`.
- Deployed runtime source: **`c77f1ab0b1a77986631ee410cfe86869781c6726`**.
- Activated November 16, 2026 at **04:54:44 UTC** (November 15, 23:54 Toronto).
- Static package: **147 public files**, including two Apache configuration files; 145 readable files verified byte-for-byte over HTTPS.
- Archive: `test-results/eebd-release-c77f1ab.tar.gz`; SHA-256 `b6fd9f6b458e10915f67b8082654ee842066e492f721c6ab0ff069fea320481a`.
- `manifest.json` records every file hash, exact source commit and `sourceDirty:false`. Later documentation-only commits do not change the deployed runtime.

Account identifiers, credentials, session URLs, host backup paths and submissions remain outside Git. Other hosted sites were not changed.

## Domain, HTTPS and routing

Root A: `51.161.57.68`, TTL 300. Nameservers `parking1.whc.ca` and `parking2.whc.ca`, the `www` CNAME to `eebd.ca`, and all pre-existing MX/TXT records were preserved. Formspree workflow delivery to info@eebd.ca and the owner's inbox receipt are verified separately from DNS.

Trusted TLS covers `eebd.ca` and `www.eebd.ca`, with certificate expiry February 14, 2027 at 03:10:40 UTC. cPanel reports renewal through AutoSSL. Only EEBD's original mismatched SSL host binding was replaced during connection.

Live release checks:

- HTTP and www requests return 308 to `https://eebd.ca`, preserving path and query.
- `/` returns 302 to `/en/`; public pages return 200.
- Missing URLs and direct error-page routes return HTTP 404 with the appropriate English/French page. Dedicated error assets avoid recursive error dispatch on WHC LiteSpeed; French directory configuration supplies the localized handler.
- Security headers include nosniff, strict-origin referrer policy and a CSP allowing form AJAX only to Formspree. The preview's blanket noindex header is absent.
- The sitemap contains 80 indexable URLs. Contact and quote forms work without React, external scripts, PHP or a Node service on WHC.
- ACME/DCV directories and cgi-bin were preserved. Analytics is not configured. Google Search Console is verified and the sitemap submission processed successfully.

## Reproducible commands

Use Node **24.22.1** (`.nvmrc`). Core build and browser delivery have no third-party runtime dependencies.

```sh
node scripts/build.mjs
node scripts/dev.mjs
node scripts/check.mjs
node --test tests/*.test.mjs
node scripts/package-whc.mjs --production
```

Local preview runs on `127.0.0.1:4173`, builds `dist/` and watches source/public changes. It sends no enquiries; its CSP prohibits outgoing connections. Brand review utilities exist only in preview. Production readiness is checked against the actual enquiry-site scope. Saleable product records have separate evidence filters and remain empty.

For the exact release, check out the deployed revision in a clean checkout, then run the production package command. Upload only the contents of `test-results/whc-production/web-root/` into the EEBD document root. Do not upload `manifest.json`, source, test reports or account records. Node is required locally only. Preview packages deny all public access until authenticated staging is configured.

## Formspree integration and evidence

The public endpoint is `https://formspree.io/f/xrpqpylv`; it is not an API key. Native AJAX in `public/assets/formspree.js` and `public/assets/enquiry.js` implements the review/edit flow.

General contact sends name, email, optional phone and message. Equipment/training/service enquiries also send the active branch's relevant requirements, organization, location and timing. Payloads include a readable localized message, locale, whitelisted source path, privacy acknowledgement, correlation ID and `_gotcha` honeypot. Inactive branch fields, files and marketing subscription are excluded. No browser storage is used.

Successful provider acknowledgement produces the language-specific confirmation and clears entries. Field errors, rate limits, verification requirements, uncertain responses and network failures preserve entries and explain the result. Concurrent clicks are prevented. There is no automatic retry or guarantee against duplicates after a manual retry. The correlation ID is not a provider receipt. Provider acceptance alone is not proof of inbox receipt.

One owner-authorized test was submitted once on November 15 at 23:16 Toronto (04:16 UTC November 16). Formspree returned HTTP 200 with `{"next":"/thanks","ok":true}`; the owner confirmed inbox receipt. No additional real enquiry was sent during final publication.

Authenticated dashboard inspection confirmed notification destination **info@eebd.ca**, form enabled, submission archive enabled, Formshield enabled and CAPTCHA already disabled. CAPTCHA was not changed. Required email/contact/message validation was configured, and the EEBD project was restricted to `eebd.ca`. Other projects were untouched. Public privacy notices describe archive/email processing and potential cross-border handling; no automatic retention period or legal certification is invented. Plan limits were not audited.

## Release and rollback

Deployment used the owner's authenticated cPanel Terminal. The enriched release archive was uploaded through cPanel File Manager to a private deployment folder, hash-verified and staged outside the document root. The previous runtime files were checked against their manifest before replacement. Every packaged public file was checked against the manifest before activation. The clean-source package was activated by directory rename, retaining the already verified WHC-specific error-page configuration. Existing ACME/DCV and cgi-bin directories were carried forward.

Private backups outside the web root retain the previous full-site directory and the earlier holding page, along with deployment timestamps and manifests. Their exact locations are in ignored local connection records and private host deployment records. To roll back, stage the selected backup, verify its recorded hashes, preserve current certificate-validation files, then swap only EEBD's document-root directory; retain the displaced release for recovery. Do not change other sites or mail records.

Historical holding source: `ff5ce2abfc5ceb478d7c95e8ff5a5d1475900bb2`. It is superseded. DNS rollback to the former parking A record `149.56.225.6` is not a website-content rollback and is not needed for normal release recovery.

The unused earlier PHP/SQLite proposal remains in `server/whc/` and history. No PHP intake, database, mail worker or cron is deployed; current packaging excludes them.

## Browser verification

Browser QA uses an externally installed Playwright/Chromium, not a site dependency. Set `EEBD_PLAYWRIGHT_MODULE` and `EEBD_CHROME_EXECUTABLE` as needed.

```sh
node scripts/production-check.mjs
node scripts/formspree-browser-check.mjs
EEBD_LIVE_URL=https://eebd.ca EEBD_TEST_SOURCE_ROUTE=cityHalifax node scripts/formspree-browser-check.mjs
```

The live form command loads actual hosted pages/assets but intercepts every Formspree request. It cannot send test emails. Eight bilingual success journeys, six failure journeys and double-click protection passed on the actual host. Reports and screenshots remain in ignored `test-results/`. Mocked UI checks and the separate authorized inbox test provide different evidence; neither is a promise of future service uptime.

## Search Console — November 15, 2026

Created and verified the **Domain property `eebd.ca`** in the owner's signed-in Google account. Added only Google's root TXT verification record, TTL 300, through WHC. Existing web, nameserver and mail records were preserved. Keep the verification record in DNS; its exact value and account-specific evidence remain in ignored local records.

Submitted **https://eebd.ca/sitemap.xml** after the enriched deployment. Search Console reported **Sitemap processed successfully**, last read November 15, 2026, with **80 discovered pages** at 04:55:55 UTC November 16. The initial transient “Couldn't fetch” state resolved to successful processing; no workaround or alternate sitemap was needed.

The sitemap contains 80 canonical page URLs, 80 image references and 160 reciprocal language links. Public HTTP checks returned 200 with application/xml, including a Googlebot user-agent check. Google controls crawl/indexing timing and ranking; discovery is not an indexing guarantee. No analytics tracking code was added. See `docs/SEARCH_CONSOLE.md` for the account-independent access link and references.

Google also accepted individual indexing requests for https://eebd.ca/en/ and https://eebd.ca/fr/, confirming each was added to a priority crawl queue. At inspection, both were discovered but not yet indexed. The requests were submitted once per homepage; no repeated bulk requests were made.
