# Launch checklist

Updated November 16, 2026 (America/Toronto), under the owner's explicit full-site launch instruction. Deployed runtime: `f1db02b8b269554675b3aac752f1eb22bad88895`.

| Check | Status | Evidence / limitation |
| --- | --- | --- |
| Source preserved and backed up | PASS | Original history retained; runtime commit on `codex/initial-build`; clean package manifest |
| Approved identity | PASS | Precision 01, integrated singular descriptor, no .ca in logo; bilingual SVG/PNG, favicon/social assets |
| Complete paired pages | PASS | 48 purposes × two languages, 96 public pages plus localized error pages |
| Build and internal references | PASS | 112 preview HTML files, 4,855 references; labels, IDs and private-source exclusion |
| Unit/integration checks | PASS | 27 tests: IndexNow content/retry checks, route/content pairs, publication guard, product filters, validation, escaping, transport, preview isolation and packaging |
| Production responsive checks | PASS | 384 public-page/width checks for this release and eight mobile quote-bar cases. Prior homepage: 10 EN/FR viewport checks; no page errors or horizontal overflow |
| General and scoped enquiry UI | PASS | General contact plus equipment/training/service in both languages; review/edit, active fields, consent and no persistence of entries |
| Actual-host form checks | PASS | Eight standard, two shortened and two bulk success journeys, inactive bulk-field exclusion, six failure journeys and double-click protection; intercepted provider responses, zero real submissions |
| Actual inbox delivery | PASS FOR AUTHORIZED TEST | One authorized POST accepted by Formspree; owner confirmed receipt; authenticated workflow recipient info@eebd.ca |
| Formspree controls | PASS | Enabled form/archive/Formshield; eebd.ca domain restriction; required email/contact/message; existing CAPTCHA-disabled setting unchanged |
| Business identity / privacy | IMPLEMENTED | Superclean Canada Inc.; bilingual notice reflects current Formspree archive/email flow and cross-border processing; no legal certification claimed |
| Public contact | PASS | Verified email and forms; unverified phone omitted |
| Content/offer boundaries | PASS | Broad technical sources reviewed; arrangements explicitly pending; no stock, pricing, credentials or saleable models asserted |
| Model/provider evidence | FUTURE COMMERCIAL WORK | Actual suppliers, trainers and service partners remain unarranged; evidence required before offering specific models/capabilities |
| HTTPS and canonical redirects | PASS | Trusted root/www certificate; HTTP/www 308 preserves path/query; root 302 to English |
| Final host files | PASS | All 257 public files hash-verified on host; 255 readable files matched over HTTPS |
| Error pages | PASS | English/French HTTP 404 bodies and direct error routes verified after correcting LiteSpeed recursion |
| Search metadata | PASS | 92 indexable sitemap URLs; reciprocal alternates/canonicals; quote/privacy noindex; review gallery noindex and excluded from sitemap |
| Secrets and submissions excluded | PASS | No credentials, customer messages, private source or database in public output/Git |
| Rollback | PREPARED | Private previous-release and holding-directory backups with manifests/timestamps; no rollback needed |
| Google Search Console | PASS | Domain verified with DNS TXT; sitemap processed successfully with 92 discovered URLs; indexing/rankings not promised |
| Analytics | PASS | Consent-gated GA4; confirmed enquiry key event; live page/quote/start requests returned 204 without form contents |
| IndexNow | SUBMITTED / PENDING | Eight revised URLs submitted; HTTP 202 ownership validation pending. Deployment hook and private retry state configured |
| Editorial imagery | PASS | 48 unique page-purpose images; 39 new selections; localized alt text; no repeated photo between different page pairs |
| Expanded enquiry topics | PASS | Nine paired detail pages; no unverified saleable models |
| Canadian city guides | PASS | Fourteen paired guides with official local-context sources, distinct planning questions and no local-office claims |
| Qualified technical/French review | NOT CLAIMED | Initial primary-source editorial review only; obtain model-specific specialist review as commercial scope develops |
| Other browsers / assistive technology | NOT TESTED | Safari/WebKit, Firefox, real devices and manual screen-reader checks remain outside observed Chromium coverage |

Browser checks are not WCAG certification or real-user performance evidence. Local timing measurements are not Core Web Vitals. Continued Formspree account capacity, inbox handling and hosting renewal require normal operation.

## Model release verification — November 16

- PASS: Three model guides in both languages; ratings/configurations remain distinct; direct manufacturer documentation; no sale offers or blanket recall-clearance claims.
- PASS: Public-domain M-20.2 photograph with attribution and non-endorsement. Owner confirms no existing manufacturer photo permission; Interspiro/Dräger photographs remain linked at source, not copied.
- PASS: Six model/language enquiry checks, unknown source rejection, eight successful form journeys, six failure states and double-click protection on live HTTPS, all provider responses intercepted.
- PASS: 360 production responsive route checks, zero script/resource failures; 23 unit/integration tests; 97 preview HTML files and 3,938 internal references.
- PASS: Bing property verified; sitemap submitted, current status Processing. No indexing guarantee.
- PREPARED / NOT SENT: Three supplier introduction drafts. No supplier application, message, purchase or commercial relationship created.

## Procurement release verification — November 16

- PASS: 94 paired-language pages; model comparison, procurement checklist and both downloadable CSV files.
- PASS: Optional equipment fields survive review/edit/submission and are excluded from service/training branches. Fleet links open the bulk section.
- PASS: Live versioned assets, CSV downloads, 90 sitemap URLs and 158 public file hashes.
- The final live simulated form check passed at 06:35:51 UTC: six model/language checks, eight standard success journeys, two bulk journeys, inactive bulk-field exclusion, six failure states and double-click protection. All Formspree requests were intercepted; zero real submissions occurred.

## Homepage image and layout follow-through

- PASS: Owner-requested footer and English homepage title, 25% larger navigation and full-width containers with responsive padding.
- PASS: Generated EEBD-use homepage image in both languages; four responsive widths tested per language; optimized image variants and localized descriptions. Public generation wording was subsequently removed at the owner’s request.
- See `docs/INDEXING_AUDIT.md` for indexed URLs, current report/inspection limits and completed metadata corrections.

## Unique photo library and comparison release

- PASS: 48 image owners and distinct content hashes across all 96 EN/FR content/form pages.
- PASS: Bilingual EEBD-versus-SCBA guide, accessible table, generic equipment comparison image and primary sources.
- PASS: Four complete homepage options with EN/FR previews, noindex metadata and a live screenshot gallery.
- PASS: All 255 host files and 253 readable HTTPS hashes; sitemap contains 92 URLs.
- PASS: Owner selected 01 Immersive; deployed to the English and French homepages with enquiry/comparison links and active enquiry UI checked.

## Mobile UX release — November 16, 15:56 UTC

- PASS: Clear bilingual browser/social titles, with the exact English homepage title preserved.
- PASS: Six required equipment entries instead of nine; optional organization/phone/timing disclosure and optional model field; phone form appears before its photo.
- PASS: Phone-friendly cards for model and EEBD/SCBA comparisons; desktop tables retained; values, sources and model-aware enquiry links checked.
- PASS: Mobile utility bar stays on one line in both languages at 320 and 390 px without overlap.
- PASS: Actual-host simulated delivery tests, all 253 readable file hashes and localized 404s. No real enquiry sent.

## Homepage simplification — November 16, 16:03 UTC

- PASS: Five concise sections below the approved hero; model, equipment, service, fleet, comparison, enquiry and coastal-city destinations retained.
- PASS: About 71% fewer visible main words and 64% less page height at 390 px in both languages; detailed content remains on destination pages.
- PASS: Five responsive widths per language, keyboard FAQ controls, mobile menu, one-line utility bar, metadata and all main links.
- PASS: 25 existing unit/integration checks, 112-document/4,769-reference static audit, 48-photo audit and 253 readable live file hashes. The previous form checks remain valid evidence for the unchanged enquiry implementation.

## November 16 enquiry measurement and content follow-up

- PASS: Dedicated GA4 property, bilingual opt-in/decline/preferences, four reporting dimensions, confirmed-lead key event and advertising disabled.
- PASS: No Google requests before consent; no form entries or arbitrary query parameters in Analytics; navigation never waits for tracking.
- PASS: Context-preserving mobile quote bar with menu/consent/footer/keyboard handling.
- PASS: Eight expanded EN/FR buyer-resource pages; concise homepage and unique-photo library preserved.
- PASS: 27 unit checks, 384 responsive checks, eight targeted mobile cases, full local/live simulated enquiry journeys and 255 matching HTTPS file hashes.
- PENDING: IndexNow returned 202 for eight updated indexable URLs. Receipt recorded; indexing remains controlled by search engines.
