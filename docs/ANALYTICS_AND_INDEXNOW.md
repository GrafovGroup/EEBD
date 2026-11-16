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

The consent panel is bilingual. Declining leaves the form fully functional. Google is not contacted until analytics is allowed. Only the consent choice and its timestamp are saved in local storage for 180 days. Form values remain in memory. Withdrawal disables collection and removes this site's `_ga` cookies. Other open tabs receive the changed choice. Advertising consent and personalization remain disabled. Enhanced measurement is off to avoid automatic form and URL capture.

Page locations and source paths use the known route registry; arbitrary query/hash data are excluded. Referrers retain only recognized search-engine origins or registered EEBD paths. Names, email addresses, phone numbers, company names, quantities and message fields are never analytics parameters. Analytics failures do not block enquiries. Preview pages, homepage alternatives and error pages do not collect analytics.

Google reports include consenting visitors only and may undercount when scripts are blocked. A confirmed submission measures provider acceptance, not a sale. The Formspree inbox remains the record of actual messages. No additional real enquiry was sent during this release's tests.

## IndexNow

Public verification token: `6b6ae553a07db67ec24e26004438cbc0`. It is an ownership proof, not an account secret. Production builds publish the matching root `.txt` file.

`manifest.json` contains semantic hashes for the 92 indexable URLs. Hashes cover titles, descriptions and main text, ignoring asset versions, navigation and fixed UI. The WHC activation script calls IndexNow after replacing the live release. It verifies the public key and each changed live page before sending. The first run derives a baseline from the previously deployed sitemap and content; it does not resubmit all unchanged pages.

Only new, revised or removed indexable URLs are included. Quote, privacy, preview and error routes stay out. Each successful receipt updates a private state file outside the web root. Failed submissions retain the previous acknowledged hashes so a later deployment can retry; rate limits are deferred without a tight retry loop. A 202 response is recorded as ownership validation pending, not indexed. HTTP 200 means received, not indexed.

Deployment files are packaged under `deployment/`, outside `web-root/`. Upload the archive to the private WHC backup directory. Run the verified `deployment/activate.py` with the new commit, archive SHA-256, previous deployed commit and expected public-file count. It performs the same live-file, archive, staged-file and atomic rollback checks as earlier releases, then calls the notifier. Preserve `indexnow-state.json` and receipts in the private backup directory. Never upload these records to the site.

Official protocol: https://www.indexnow.org/documentation
