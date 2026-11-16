# Launch checklist

Milestone: initial bilingual build and selected Precision identity, November 15, 2026. Statuses describe evidence, not aspirations. This is **not a launch approval**.

| Check | Status | Evidence / limitation |
| --- | --- | --- |
| Initial repository inspected/history preserved | PASS | Baseline `7da80d3`; separate `codex/initial-build` branch |
| Five original identity concepts | PASS | First round archived; five additional concepts implement the owner's no-.ca/integrated-descriptor instruction |
| Approved identity direction | PASS | Owner selected Precision 01; suffix removed and descriptor integrated immediately below EEBD; EN/FR light/white/monochrome SVG/PNG assets and social cards created |
| Complete paired core page drafts | PASS | 19 purposes × two languages; 38 pages plus localized 404s |
| Build and internal link/asset crawl | PASS | Isolated checker: 45 HTML files, 1,601 internal references; labels, IDs, noindex, sitemap and private-source exclusion checks |
| Unit/integration tests | PASS | 22 tests, including Formspree transport, uncertain responses, preview isolation and static packaging; existing tests cover: route/content pairs, publication boundaries, product filters, six request contracts, validation, escaping, inactive forms, HTTP redirects/404/rejection |
| Browser responsive/interaction checks | PASS | Chromium 158.0.8127.36: 152 route/width checks at 320/390/768/1440 px, both locales; six validation/review/edit journeys; twelve concept applications; menu Escape/focus; no-JavaScript inactive forms; zero page errors or failed resources. French/brand overflow found and fixed. |
| Final selected-logo/favicon browser coverage | NOT TESTED | Selected Precision assets and SVG/PNG/ICO/Apple/manifest references exist; local Chromium checks recorded separately; actual host, Firefox/WebKit and real-device checks remain outstanding |
| Qualified technical and French review | BLOCKED | Initial sources reviewed; no competent specialist sign-off claimed |
| Supplier/model/variant evidence | BLOCKED | No approved commercial routes or populated saleable models |
| Recall/notice process | PASS | Publication filter requires reviewed/cleared status; ABS notice noted in research. Actual stock clearance is not performed |
| Training/service provider scope | BLOCKED | Availability, geography, language and credentials need actual arrangements |
| Preview enquiry branching and review | PASS | Three localized branches, field errors, review/edit, disabled sending, no upload or browser persistence |
| Formspree integration | IMPLEMENTED | Owner endpoint configured; native AJAX, bilingual review/confirmation, provider errors, honeypot and production CSP. Actual account spam/CAPTCHA settings remain unverified; no server-side idempotency claimed |
| Provider acceptance / notifications / inbox delivery | PASS FOR AUTHORIZED TEST | One owner-authorized labelled test returned HTTP 200 and `ok:true`; owner confirmed receipt in the configured inbox. Browser suite: six success journeys, six error journeys, double-click protection, no automatic retry |
| Phone/email routing | BLOCKED | Supplied phone not called; proposed mailbox not activated or tested |
| Contracting entity / production privacy | PARTIAL | Superclean Canada Inc. confirmed; actual retention, delivery and production policy remain open |
| Public pricing / stock / checkout / credentials | PASS | Not invented or emitted |
| Noindex and draft sitemap | PASS | Preview metadata/header and empty sitemap; noindex is not access control |
| Production build protection | PASS | Refuses unresolved readiness; detects links to unpublished destinations |
| Hosting/custom domain/live holding page | PASS | Both authoritative servers and public resolvers point to WHC; trusted certificate covers root/www; HTTPS root 200, HTTP/www 301 canonical redirects; HTML hash/noindex verified. Full site remains a preview |
| Analytics/search-console/indexing | NOT APPLICABLE | Not configured, submitted or claimed |
| Secrets/private requests excluded | PASS | No provider credentials or submissions; source modules are not copied to public output |
| Private database backup/restore | NOT APPLICABLE | No live database or request store exists |

Production release requires the blocked core items to be resolved and evidence tied to the actual release commit. Local Chromium checks are not WCAG certification, real-user performance evidence or proof of delivery.

Observed local desktop navigation timing: DOMContentLoaded 11 ms, load 11 ms, HTML transfer 11,407 bytes in unthrottled localhost Chromium. This is a diagnostic only, not Lighthouse/Core Web Vitals or field performance. Manual screen-reader, browser zoom, Firefox, Safari/WebKit and real-device checks remain NOT TESTED.
