# Enquiry measurement and search notifications

## Google Analytics 4

EEBD.ca uses measurement ID `G-VSWZM68L7Q`, property `564503640`, web stream `16353110266`. Dashboard: https://analytics.google.com/analytics/web/#/p564503640/reports/intelligenthome

Events:

| Event | Trigger | Purpose |
| --- | --- | --- |
| `quote_click` | Internal quote CTA click | Compare enquiry entry points, including `mobile_bar` |
| `form_start` | First user input/change on an enquiry page | Count started enquiries once per page |
| `generate_lead` | Formspree confirms acceptance | Count completed enquiries, once per submission |

Fixed event parameters: `enquiry_type`, `source_page`, `site_language`; quote clicks also carry `cta_location`. There are no monetary values or claimed sales. Review, validation failures and unconfirmed sends are not conversions. The submission identifier is used only for in-memory deduplication and is never sent to Google.

The consent panel is bilingual. Declining leaves the form fully functional. Google is not contacted until analytics is allowed. The consent choice and its timestamp are saved in local storage for 180 days. A same-tab quote click carries only its registered source path, type, placement and timestamp through session storage for up to 60 seconds, then removes the record on the next page. This lets the tag finish its batch on the destination without delaying navigation. No form contents are stored. Form values remain in memory. Withdrawal disables collection and removes this site's `_ga` cookies. Other open tabs receive the changed choice. Advertising consent and personalization remain disabled. Enhanced measurement is off to avoid automatic form and URL capture.

Page locations and source paths use the known route registry; arbitrary query/hash data are excluded. Referrers retain only recognized search-engine origins or registered EEBD paths. Names, email addresses, phone numbers, company names, quantities and message fields are never analytics parameters. Analytics failures do not block enquiries. Preview pages, homepage alternatives and error pages do not collect analytics.

Google reports include consenting visitors only and may undercount when scripts are blocked. A confirmed submission measures provider acceptance, not a sale. The Formspree inbox remains the record of actual messages. No additional real enquiry was sent during this release's tests.

## IndexNow

Public verification token: `6b6ae553a07db67ec24e26004438cbc0`. It is an ownership proof, not an account secret. Production builds publish the matching root `.txt` file.

`manifest.json` contains semantic hashes for the 92 indexable URLs. Hashes cover titles, descriptions and main text, ignoring asset versions, navigation and fixed UI. The WHC activation script calls IndexNow after replacing the live release. It verifies the public key and each changed live page before sending. The first run derives a baseline from the previously deployed sitemap and content; it does not resubmit all unchanged pages.

Only new, revised or removed indexable URLs are included. Quote, privacy, preview and error routes stay out. Each successful receipt updates a private state file outside the web root. Failed submissions retain the previous acknowledged hashes so a later deployment can retry; rate limits are deferred without a tight retry loop. A 202 response is recorded as ownership validation pending, not indexed. HTTP 200 means received, not indexed.

Deployment files are packaged under `deployment/`, outside `web-root/`. Upload the archive to the private WHC backup directory. Run the verified `deployment/activate.py` with the new commit, archive SHA-256, previous deployed commit and expected public-file count. It performs the same live-file, archive, staged-file and atomic rollback checks as earlier releases, then calls the notifier. Preserve `indexnow-state.json` and receipts in the private backup directory. Never upload these records to the site.

Official protocol: https://www.indexnow.org/documentation

### Verification completed November 16, 2026

The initial eight-URL notification at 16:29:40 UTC returned HTTP 202 while ownership validation was pending. At the owner's request, one verification retry at **16:48:15 UTC / 11:48:15 Toronto** returned **HTTP 200**, with an empty response body and no Retry-After header. The public key file also returned HTTP 200 with the exact expected contents. IndexNow now accepts the site's submissions; this does not establish whether the pages are indexed.

The successful batch contained the comparison, project procurement, resources hub and equipment quote checklist pages in English and French. Its private receipt is `test-results/indexnow-verification-recheck.json`. The hosting ledger was reconciled with this acknowledgement so subsequent deployments do not resend these same changes; the earlier state was backed up privately. Bing's IndexNow dashboard had not yet populated when checked. Both search consoles separately accepted the 92-URL sitemap resubmission and reported Success.

## Property configuration verified November 16, 2026

`generate_lead` is a key event, counted once per event, without a default monetary value. Event-scoped custom dimensions are registered for enquiry type, source page, quote-button location and site language. The reports snapshot uses the Marketing performance template; Reports → Generate leads and Realtime show enquiry activity as it arrives. Event and user data retention are two months with activity resets off. Google signals and user-provided data collection are off; ads personalization is disallowed in all 307 regions. Initial traffic includes release-verification visits, not actual leads.
