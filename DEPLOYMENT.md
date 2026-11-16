# Build, preview and release

## Current deployment

The complete bilingual enquiry website is live at **https://eebd.ca/** on WHC. The root redirects to `/en/`; `/fr/` is available through the language switch. The domain has its own document root, separate from existing websites.

- Repository: `https://github.com/GrafovGroup/EEBD.git`, branch `codex/initial-build`.
- Deployed runtime source: **`f1db02b8b269554675b3aac752f1eb22bad88895`**.
- Activated November 16, 2026 at **16:39:39 UTC** (November 16, 11:39 Toronto).
- Static package: **257 public files**, including two Apache configuration files; 255 readable files verified byte-for-byte over HTTPS.
- Archive: `test-results/eebd-release-f1db02b.tar.gz` (6,055,691 bytes); SHA-256 `510dcd32aafe633bf25a891357b7fad1de5871350750eef7baa40486288040d3`.
- `manifest.json` records every file hash, exact source commit and `sourceDirty:false`. Later documentation-only commits do not change the deployed runtime.

Account identifiers, credentials, session URLs, host backup paths and submissions remain outside Git. Other hosted sites were not changed.

## Domain, HTTPS and routing

Root A: `51.161.57.68`, TTL 300. Nameservers `parking1.whc.ca` and `parking2.whc.ca`, the `www` CNAME to `eebd.ca`, and all pre-existing MX/TXT records were preserved. Formspree workflow delivery to info@eebd.ca and the owner's inbox receipt are verified separately from DNS.

Trusted TLS covers `eebd.ca` and `www.eebd.ca`, with certificate expiry February 14, 2027 at 03:10:40 UTC. cPanel reports renewal through AutoSSL. Only EEBD's original mismatched SSL host binding was replaced during connection.

Live release checks:

- HTTP and www requests return 308 to `https://eebd.ca`, preserving path and query.
- `/` returns 302 to `/en/`; public pages return 200.
- Missing URLs and direct error-page routes return HTTP 404 with the appropriate English/French page. Dedicated error assets avoid recursive error dispatch on WHC LiteSpeed; French directory configuration supplies the localized handler.
- Security headers include nosniff, strict-origin referrer policy and a CSP allowing form AJAX to Formspree and optional, consent-gated Google Analytics scripts/collection. The preview's blanket noindex header is absent.
- The sitemap contains 92 indexable URLs. Contact and quote forms work without React, PHP or a Node service on WHC; delivery does not depend on Analytics.
- ACME/DCV directories and cgi-bin were preserved. Consent-based GA4 enquiry measurement is configured. Google Search Console is verified and the sitemap submission processed successfully.

## Reproducible commands

Use Node **24.22.1** (`.nvmrc`). Core build and browser delivery have no third-party runtime dependencies.

```sh
node scripts/build.mjs
node scripts/dev.mjs
node scripts/check.mjs
node --test tests/*.test.mjs
node scripts/package-whc.mjs --production
```

Local preview runs on `127.0.0.1:4173`, builds `dist/` and watches source/public changes. It sends no enquiries; its CSP prohibits outgoing connections. Brand review utilities exist only in preview. The new four-option homepage review gallery is published at `/homepage-options/` with noindex metadata and is excluded from the sitemap. Production readiness is checked against the actual enquiry-site scope. Saleable product records have separate evidence filters and remain empty.

For the exact release, check out the deployed revision in a clean checkout, then run the production package command. Upload the release archive to the private deployment directory and use `scripts/whc/activate.py` with verified commit/archive/previous-release arguments. It activates only `web-root/` and automatically notifies IndexNow after verifying changed live pages. See `docs/ANALYTICS_AND_INDEXNOW.md`. Do not upload `manifest.json`, source, test reports or account records. Node is required locally only. Preview packages deny all public access until authenticated staging is configured.

## Formspree integration and evidence

The public endpoint is `https://formspree.io/f/xrpqpylv`; it is not an API key. Native AJAX in `public/assets/formspree.js` and `public/assets/enquiry.js` implements the review/edit flow.

General contact sends name, email, optional phone and message. Equipment/training/service enquiries also send the active branch's relevant requirements and location, plus optional organization, phone, model and timing. Payloads include a readable localized message, locale, whitelisted source path, privacy acknowledgement, correlation ID and `_gotcha` honeypot. Inactive branch fields, files and marketing subscription are excluded. No browser storage is used.

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
node scripts/mobile-ux-check.mjs
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

## November 16 — Immersive homepage selected

The owner selected option 01, Immersive, and explicitly requested live publication. Both language homepages now use its full-width hero without the review toolbar. The exact English title, footer, approved logo, remaining homepage sections and Formspree enquiry implementation are retained. The noindex gallery marks option 01 as live.

Ten targeted responsive checks passed across both languages at five widths from 320 to 2560 px, including hero links, enabled enquiry UI and metadata. All 24 unit/integration tests, 112 preview documents, 4,941 internal references and the 48-photo uniqueness audit passed. The release activated at 15:31:28 UTC; all 255 host files passed manifest checks and all 253 readable files matched HTTPS hashes at 15:31:44 UTC. The preceding full release is retained privately for rollback. No new real enquiry was sent.

## November 16 — clear titles and mobile buying flow

Published `f2f3f1e4d0fe822de1706bf955c092706c25cf3c` at 15:56:56 UTC / 10:56 Toronto. Descriptive English/French search titles are independent of editorial headlines; the exact owner-requested English homepage title is preserved. Both comparison pages use stacked cards at widths up to 900 px and desktop tables above that. Model-specific enquiry links, all comparison values and sources are retained.

Equipment enquiries now require contact name, email, location, application, quantity and privacy acknowledgement (six entries, formerly nine). Model, organization and timing are optional; organization/phone/timing are in an expandable section. The photo follows the form on mobile, and bulk purchasing details still open from fleet links. Review/edit and recoverable delivery states remain in place. The mobile utility tagline, Contact link and language switch stay on one line in English and French, tested down to 320 px.

Validation: 25 unit/integration checks; 112 HTML documents and 4,959 internal references; 48 unique photos; 384 responsive page checks; 36 targeted layout/keyboard checks locally and again on the actual host. The live Formspree simulation passed six model-context checks, eight standard successes, two shortened enquiries, two bulk journeys, inactive-field exclusion, six failure states and double-click protection at 15:57:25 UTC. Provider responses were intercepted: zero real submissions. All 253 readable public files matched the clean release hashes over HTTPS at 15:57:20 UTC; localized 404s passed. The previous complete release is retained privately for rollback.

## November 16 — shorter homepage

Published `157068fa22f0bfaebc20437f810fbe9cc77ccf58` at 16:03:38 UTC / 11:03 Toronto. The owner requested less text while scrolling. The approved Immersive hero is followed by five sections: compact model cards, fleet/training/service links, coastal-city navigation, three expandable FAQs and an enquiry call to action. Detailed destination pages remain available. Model names/configurations, all nine previously linked coastal cities, the bilingual structure, search titles, imagery and one-line mobile utility bar are preserved.

At a 390 × 844 viewport with FAQs closed, English visible main text fell from 783 to 224 whitespace-separated words; French fell from 867 to 245. Total page height fell from 10,749 to 3,888 px in English and 11,009 to 3,980 px in French (about 64% shorter). These are layout measurements, not Core Web Vitals or ranking claims.

Validation: 25 existing unit/integration checks; 112 preview documents and 4,769 references; the 48-photo audit; 10 bilingual homepage checks at 320/390/768/1440/2560 px locally and again on live HTTPS, covering all main links, keyboard FAQs, mobile menu, metadata and overflow. All 253 readable public files matched the clean package hashes at 16:03:59 UTC. Localized 404s passed. The enquiry implementation was not changed; the previous live simulated delivery checks remain the latest form evidence. No real enquiry was sent. A complete previous-release backup is retained privately.

## Enquiry measurement, mobile quote action and buyer content — November 16, 2026

Published final runtime `f1db02b8b269554675b3aac752f1eb22bad88895` at 16:39:39 UTC / 11:39 Toronto. Dedicated GA4 property and bilingual consent controls record quote clicks, starts and provider-confirmed enquiries without form contents. `generate_lead` is a key event; enquiry type, source page, CTA placement and site language are registered dimensions. Two-month event/user retention, Google signals off, user-provided data off and ads personalization disallowed. A short-lived anonymous navigation record carries same-tab quote events to the destination without delaying navigation; global tag settings suppress duplicate page views.

The mobile quote bar appears after the hero on long content pages and hides for menus, consent controls, editing and the footer. Four English/French page pairs now include expanded quotation, fleet replacement, port receiving and comparison guidance plus FAQs. The shortened homepage and 48 unique photos are preserved.

The activation hook submitted eight changed indexable URLs to IndexNow at 16:29:40 UTC. HTTP 202 means key validation pending; no indexing claim is made. The final tracking-only release respected the pending receipt’s retry delay and did not repeat the submission. The sitemap remains at 92 URLs.

Validation: 27 unit/integration checks, 384 responsive checks, eight targeted mobile-bar cases, bilingual consent/PII/event deduplication tests and the complete simulated enquiry suite. Actual-host Formspree simulations passed at 16:31:46 UTC with zero real submissions. The final 255 readable public files matched package hashes at 16:39:47 UTC, including localized 404 checks. Real GA4 requests returned HTTP 204 for page views, quote clicks and form starts at 16:40:07 UTC; arbitrary URL data and form fields were absent, and no request went to Google before consent. Initial Analytics traffic includes verification visits. Previous complete releases remain available privately for rollback.
