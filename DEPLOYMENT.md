# Build, preview and release

## Current deployment

- Source: `https://github.com/GrafovGroup/EEBD.git`, branch `codex/initial-build`.
- Original baseline: `7da80d346ab1bacbe70447b1a185236f44ce4009`.
- WHC hosts a minimal bilingual holding page at **https://eebd.ca/** with the approved Precision logo and Superclean Canada Inc. identity. The full site remains a development preview.
- The EEBD domain has its own document root, separate from existing websites. Account identifiers, credentials and session URLs are excluded from source.
- Owner selected Formspree endpoint `https://formspree.io/f/xrpqpylv` for enquiry delivery. This public form URL is not an API key. No live enquiry endpoint is deployed on WHC.

## Verified domain connection — November 15, 2026, America/Toronto

The root A record changed from WHC parking `149.56.225.6` (TTL 14440) to the web server `51.161.57.68` (TTL 300). Both authoritative nameservers and public resolvers 1.1.1.1 and 8.8.8.8 returned the new address. Nameservers `parking1.whc.ca` and `parking2.whc.ca`, the `www` CNAME to `eebd.ca`, and all existing MX/TXT records were preserved. Email routing has not been activated or tested.

The new domain initially inherited a certificate for another hostname. Only EEBD's mismatched SSL host binding was removed; the free certificate was then issued through the WHC/cPanel wizard. Other sites' bindings were left intact. TLS trust and both certificate names were verified: `eebd.ca` and `www.eebd.ca`, expiry February 14, 2027 at 03:10:40 UTC. cPanel reports renewal via AutoSSL.

Live checks at November 16, 2026 04:10 UTC (November 15, 23:10 Toronto):

- HTTPS root returns 200 and exactly matches the generated holding HTML.
- HTTP root, HTTP www and HTTPS www return 301 to `https://eebd.ca/`.
- Redirects preserve paths and query strings; ACME/DCV challenge paths remain accessible over HTTP.
- The holding page sends noindex, nosniff, referrer and restrictive CSP headers. Browser review confirms the approved integrated logo and both languages.
- No form submission occurred during hosting setup. A later owner-authorized Formspree test is recorded below. Analytics and search-console submission are not configured.

Holding source revision: `ff5ce2abfc5ceb478d7c95e8ff5a5d1475900bb2`. Build command: `node scripts/holding-page.mjs --https`.

| Artifact | SHA-256 |
| --- | --- |
| `index.html` | `d48768e72d8754b0f793d41ea9b78cae8f8025537cbac6b151cd63e6b60865c0` |
| `.htaccess` with HTTPS redirects | `549b4f0eb7d3f24f73c94395e30aaebc26503ee1e1bfcec160815040075d5950` |
| Earlier `.htaccess` without redirects | `1dc811b7f107c9d504e62ad8bfbadc195891584bf665f8bda1ba3279349b4266` |

A rollback copy of the earlier `.htaccess` is stored outside all web roots. The local ignored connection record contains its account-specific location. To restore the earlier holding configuration, generate without `--https` and verify the earlier hash before replacing that file. DNS rollback, if needed, restores only the root A value `149.56.225.6` and TTL 14440; preserve nameservers and mail records. That returns visitors to the former parking service, not to a previous full website. The holding generator is separate from the guarded full-site build.

## Reproducible commands

Use Node **24.22.1** (see `.nvmrc`). Core build and browser delivery have no third-party runtime dependencies. No Node service is required on WHC.

```sh
node scripts/brand-assets.mjs
node scripts/build.mjs
node scripts/dev.mjs
node scripts/check.mjs
node --test tests/*.test.mjs
node scripts/package-whc.mjs
```

The preview listens on `127.0.0.1:4173`, builds `dist/` and watches source/public changes. Open `/en/`, `/fr/` or `/brand-concepts/`. It sends no enquiries; its CSP prohibits outgoing connections. The checker uses an isolated build directory to avoid preview races.

`node scripts/build.mjs --production` and `node scripts/package-whc.mjs --production` remain guarded by the actual unresolved launch configuration. Do not set readiness flags or mark routes published simply to bypass checks.

## Formspree integration

The selected approach is Vanilla JavaScript/AJAX, using native `fetch` tailored to the existing review/edit journey. The endpoint and transport are in `public/assets/formspree.js`; the UI is in `public/assets/enquiry.js`. No React, CDN script or PHP service is needed. The production template enables sending; normal development previews keep it disabled.

The payload contains the active enquiry branch, name/email, organization, location, timing, model and relevant requirements, a readable bilingual message, locale, whitelisted source path, privacy acknowledgement, a correlation ID and the `_gotcha` honeypot. Inactive branch fields, page query strings, files and marketing consent are not added. `submissionId` is a correlation value, not a provider receipt or a deduplication guarantee.

AJAX uses JSON and `Accept: application/json`, omits credentials, and does not follow redirects. Successful provider acknowledgement produces the local language confirmation and clears the entries. Known field errors return focus to the validation summary. Rate limits, verification requirements, unknown responses and network failures preserve entries and explain the outcome. Buttons prevent concurrent clicks. There is no automatic retry or claim that a retry cannot duplicate a submission. Acceptance by Formspree is not proof of inbox receipt.

The production CSP permits connections only to `https://formspree.io`; scripts remain local. `strict-origin-when-cross-origin` permits Formspree's domain restriction to see the origin without the full page path/query. The public holding page keeps its own more restrictive policy because it has no form.

One owner-authorized, clearly labelled synthetic test was submitted on November 15 at 23:16 Toronto (04:16 UTC November 16). Formspree returned HTTP 200 with `{"next":"/thanks","ok":true}`. There was exactly one POST and no automatic retry. This verifies API acceptance; inbox receipt and account controls remain unverified. Test details stay in ignored local records.

Before enabling the full site:

1. Verify the actual notification recipient and inbox receipt for the authorized test. Account access, delivery and recipient are not inferred from the form URL.
2. Set the Formspree project's Restrict to Domain setting to `eebd.ca`; verify current spam/CAPTCHA and plan-limit behavior. If the form requires CAPTCHA tokens, add the appropriate public site key/widget and matching CSP before launch; no challenge is silently disabled or bypassed.
3. Confirm the service's handling, retention and recipients in the production privacy notice. Preview text identifies Formspree but remains a preview notice.
4. Validate all three types in both languages on the actual host and release only approved routes/content. Supplier, trainer and service arrangements remain unconfirmed.

## WHC static package

`test-results/whc-preview/web-root/` contains the static website and Apache/LiteSpeed `.htaccess`; upload only this directory's contents into the EEBD document root. Preview access is denied until authenticated staging is configured. `manifest.json` records file SHA-256 hashes, source commit and dirty state. A dirty package is not a committed release.

Formspree supersedes the earlier proposed PHP/SQLite/mail-worker architecture. The packager no longer includes its public endpoint or private files and removes obsolete private output from earlier generated packages. The earlier implementation remains in `server/whc/` and Git history as unused code. Its 48 synthetic checks passed locally and on WHC EA-PHP 8.3.36, but this is historical evidence, not evidence of Formspree delivery. No live PHP intake, database or cron was deployed.

## Verification tools

Browser QA uses an externally installed Playwright/Chromium, not a site dependency. Set `EEBD_PLAYWRIGHT_MODULE` and `EEBD_CHROME_EXECUTABLE` as needed:

```sh
node scripts/browser-check.mjs
node scripts/formspree-browser-check.mjs
```

The Formspree check serves isolated local fixtures, intercepts all provider requests and tests bilingual success/error flows. It sends no real submissions. Reports and screenshots stay in ignored `test-results/`. Local mocked tests do not establish service activation, domain restrictions, CAPTCHA completion, mailbox delivery or real-device support.
