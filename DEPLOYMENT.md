# Build, preview and release

## Current deployment

The complete bilingual enquiry website is live at **https://eebd.ca/** on WHC. The root redirects to `/en/`; `/fr/` is available through the language switch. The domain has its own document root, separate from existing websites.

- Repository: `https://github.com/GrafovGroup/EEBD.git`, branch `codex/initial-build`.
- Deployed runtime source: **`2e1f4494be14b2fae08aaf89b14ba50c65c978f3`**.
- Activated November 16, 2026 at **07:14:32 UTC** (November 16, 02:14 Toronto).
- Static package: **162 public files**, including two Apache configuration files; 160 readable files verified byte-for-byte over HTTPS.
- Archive: `test-results/eebd-release-2e1f449.tar.gz` (1,498,094 bytes); SHA-256 `ef180aedac576e492fec4ba0b530866ffc1fb11b2314722ec280f2912c0d0023`.
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
- The sitemap contains 90 indexable URLs. Contact and quote forms work without React, external scripts, PHP or a Node service on WHC.
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

## November 16 model release and Bing submission

The model release `30a4408` adds six paired model-reference pages and one attributed public-domain M-20.2 photograph. The static sitemap now contains 86 URLs. The previous enriched runtime `c77f1ab` remains in the private rollback backup.

All 154 public files were verified before activation; all 152 readable files matched over HTTPS at 06:04:25 UTC. The hosted simulated form suite passed at 06:05:46 UTC: six model/language context checks, unknown-source rejection, eight successful journeys, six failure cases and double-click protection. Every Formspree response was intercepted; zero real submissions occurred.

Bing Webmaster ownership was verified through the production meta tag. The 86-URL sitemap was submitted and the report showed **Processing**, with no errors or warnings reported at that point. This does not establish indexing. See `docs/BING_WEBMASTER.md`. The Google submission above records its earlier 80-URL processing result; the same public sitemap now includes the new model pages.

## November 16 procurement release

Runtime `f57fbd4403f91f8c74039c12644e8314bc5fb02d` was activated at 06:33:03 UTC with the model release retained as a complete private rollback backup. All 160 public files were hash-checked before activation; the 158 HTTP-readable files matched the release manifest over HTTPS at 06:33:36 UTC. Localized 404s and the absence of blanket noindex passed.

This release adds bilingual comparison and procurement-checklist pages, English/French CSV purchasing-list downloads, optional bulk equipment fields, expanded fleet/coastal content and educational FAQs. The public sitemap now has 90 URLs. Google and Bing keep the existing sitemap URL; this deployment is not a new observation of indexing status.

Local checks passed: 24 unit/integration tests, 101 preview HTML files and 4,194 internal references, 376 responsive page/width checks with no script/resource failures, and simulated form success/failure flows including both bulk languages and inactive-field exclusion. The live English/French CSV downloads, comparison styling and fleet disclosure passed. No additional real enquiry has been sent.

WHC serves CSS with a seven-day cache lifetime. Shared CSS and entry-script URLs now use `site.assetVersion`; bump it when those assets change.

The final live simulated form check passed at 06:35:51 UTC: six model/language checks, eight standard success journeys, two bulk journeys, inactive bulk-field exclusion, six failure states and double-click protection. All Formspree requests were intercepted; zero real submissions occurred.

## Layout and search metadata release — November 16, 07:03 UTC

Navigation labels and the header enquiry button are 25% larger at their existing breakpoints. Containers use the full viewport width with responsive side padding. The owner supplied the exact new footer notice; the English homepage title is `Emergency Escape Breathing Device | EEBD.CA`. Five overlong meta descriptions were rewritten and eight homepage image instances now have localized descriptions.

Validation: 752 rendered route/viewport combinations at 320, 390, 768, 1024, 1200, 1440, 1920 and 2560 px; no page errors or horizontal page overflow. All 160 public files were verified on WHC and 158 readable files matched release hashes over HTTPS at 07:04 UTC. All 90 sitemap pages remain HTTP 200, indexable, self-canonical and reachable within three HTML link steps. Quote and privacy exclusions remain intentional. See `docs/INDEXING_AUDIT.md` for actual search-index evidence and its limits.

## EEBD-in-use hero release — November 16, 07:14 UTC

The owner requested a generated image of EEBD use in place of the homepage boat. Both language homepages now use the original generated ship-corridor scene, with 1200 × 800 and 640 × 427 WebP assets and localized alt text. The generated-image caption remains visible. Open Graph and sitemap image references follow the new homepage image. Other marine-context images are retained. The prompt and reference roles are documented in `docs/EEBD_HERO_PROMPT.md`. Eight targeted homepage checks covered both languages at 390, 768, 1440 and 1920 px. No form code changed. The previous layout release remains backed up.
