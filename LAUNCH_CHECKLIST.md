# Launch checklist

Milestone: initial bilingual build and second-round brand exploration, November 15, 2026. Statuses describe evidence, not aspirations. This is **not a launch approval**.

| Check | Status | Evidence / limitation |
| --- | --- | --- |
| Initial repository inspected/history preserved | PASS | Baseline `7da80d3`; separate `codex/initial-build` branch |
| Five original identity concepts | PASS | First round archived; five additional concepts implement the owner's no-.ca/integrated-descriptor instruction |
| Approved final identity | BLOCKED | Owner selection still required |
| Complete paired core page drafts | PASS | 19 purposes × two languages; 38 pages plus localized 404s |
| Build and internal link/asset crawl | PASS | Isolated checker: 44 HTML files, 1,573 internal references; labels, IDs, noindex, sitemap and private-source exclusion checks |
| Unit/integration tests | PASS | 17 tests: route/content pairs, publication boundaries, product filters, six request contracts, validation, escaping, inactive forms, HTTP redirects/404/rejection |
| Browser responsive/interaction checks | PASS | Chromium 158.0.8127.36: 152 route/width checks at 320/390/768/1440 px, both locales; six enquiry branches; ten concept applications; menu Escape/focus; no-JavaScript inactive forms; zero page errors or failed resources. French/brand overflow found and fixed. |
| Final selected-logo/favicon browser coverage | BLOCKED | Provisional SVG/PNG/ICO/Apple/manifest assets exist; no identity selected; Firefox/WebKit/real-device checks not performed |
| Qualified technical and French review | BLOCKED | Initial sources reviewed; no competent specialist sign-off claimed |
| Supplier/model/variant evidence | BLOCKED | No approved commercial routes or populated saleable models |
| Recall/notice process | PASS | Publication filter requires reviewed/cleared status; ABS notice noted in research. Actual stock clearance is not performed |
| Training/service provider scope | BLOCKED | Availability, geography, language and credentials need actual arrangements |
| Preview enquiry branching | PASS | Three localized structures, no upload, no HTML submission form, disabled action, no persistence |
| Production validation/rate/bot/idempotency integration | BLOCKED | Validation contract only; no provider/backend configured |
| Durable acceptance / notifications / inbox delivery | BLOCKED | None configured or tested; API preview explicitly rejects acceptance |
| Phone/email routing | BLOCKED | Supplied phone not called; proposed mailbox not activated or tested |
| Contracting entity / production privacy | BLOCKED | Actual identity, processor, recipients and retention unresolved; preview policy only |
| Public pricing / stock / checkout / credentials | PASS | Not invented or emitted |
| Noindex and draft sitemap | PASS | Preview metadata/header and empty sitemap; noindex is not access control |
| Production build protection | PASS | Refuses unresolved readiness; detects links to unpublished destinations |
| Hosting/custom domain/live HTTP checks | BLOCKED | No hosting project selected/created; domain not deployed |
| Analytics/search-console/indexing | NOT APPLICABLE | Not configured, submitted or claimed |
| Secrets/private requests excluded | PASS | No provider credentials or submissions; source modules are not copied to public output |
| Private database backup/restore | NOT APPLICABLE | No live database or request store exists |

Production release requires the blocked core items to be resolved and evidence tied to the actual release commit. Local Chromium checks are not WCAG certification, real-user performance evidence or proof of delivery.

Observed local desktop navigation timing: DOMContentLoaded 8 ms, load 9 ms, HTML transfer 11,293 bytes in unthrottled localhost Chromium. This is a diagnostic only, not Lighthouse/Core Web Vitals or field performance. Manual screen-reader, browser zoom, Firefox, Safari/WebKit and real-device checks remain NOT TESTED.
