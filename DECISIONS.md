# Project decisions

## November 15, 2026 — Owner instructions

- Begin building EEBD.ca from the masterplan in `https://github.com/GrafovGroup/EEBD.git`. This supersedes the master prompt's historical documentation-only scope for implementation.
- Preserve equipment sales, product-specific training and service coordination; English and French; quote-based launch; no checkout.
- After reviewing the first five concepts, the owner requested **another five**. The words **EMERGENCY ESCAPE BREATHING DEVICE** must sit beneath EEBD and be part of the logo. **No `.ca` in the logo.** This explicitly overrides sections 7 and 9 where the original lockup or plural descriptor differs. The website/domain remains EEBD.ca.
- The owner then selected **Precision concept 01**, requiring the words to sit **immediately beneath the letters as part of the logo**, with **no .ca**. This is the approved direction; no further selection is required. All full logo assets, including comparison variants and the brand-review header, have been updated to remove the suffix. The default site and review now use Precision.
- An earlier reply containing only “let’” was incomplete and was not treated as approval. The later explicit Precision selection supersedes the open comparison questions.

## Reversible implementation decisions

- Reuse the empty current checkout, preserve upstream history, and work on `codex/initial-build`.
- Dependency-free Node 24 static generator with structured bilingual content and minimal browser JavaScript. No framework/runtime hosting commitment.
- Draft content is available only in the local review build. Every draft has noindex; sitemap is empty. A production build fails closed while external launch requirements are unmet.
- Display the supplied phone as unverified preview content, without pretending a contact route is operational. The owner-confirmed email may appear in preview; do not imply it is verified or show a fake form success.
- Enquiry previews use inputs outside an HTML form, a functional review/edit step, disabled sending and no persistence. They cannot submit by pressing Enter, including without JavaScript.
- Original vector workplace/document illustrations are conceptual, not pictures of actual inventory, customers or premises. No manufacturer images or marks are reused.
- Root routing is an explicit temporary redirect to `/en/`, with visible EN/FR controls; no geolocation.

## Decisions still needed

Public address policy; exact equipment supply routes; training/service providers and coverage; actual WHC deployment configuration; form acceptance/storage/notification provider and destination; mailbox and phone routing; privacy retention/recipients; competent technical review. These are not inferred from the owner's other projects.

## Preview correction

The initial development watcher called an already-imported build module, retaining stale page templates after source edits. It now launches a fresh Node build process on each rebuild. The server was restarted and the selected-identity review opened with a fresh URL so the visible page matches source.

## November 15, 2026 — Business details and WHC

- Owner confirmed Superclean Canada Inc. as the legal business name and info@eebd.ca as the designated enquiry email. Address ownership/routing is not proof of delivery.
- Owner chose existing WHC hosting, identified the account, signed in interactively and authorized connecting hosting and domain. Account identifiers, session URLs and credentials stay out of source.
- No suppliers, trainers or service partners are arranged. Public draft copy now states that these arrangements are being established; no model catalogue or provider claims are added.
- Enquiry UI now supports validation, review and editing in both languages. Preview sending remains disabled and personal entries remain in page memory only.
- WHC candidate architecture: locally generated static pages plus a PHP endpoint, private SQLite store and cron notification worker. Production remains gated until actual host, mail and policy verification. No Node service is needed on the host.

## November 15, 2026 — Domain connection and Formspree

- Completed the authorized WHC DNS/HTTPS connection and published the separate bilingual holding page with the approved logo. Preserved nameservers and email records. Exact source, checks and rollback are in DEPLOYMENT.md.
- Owner supplied `https://formspree.io/f/xrpqpylv` and directed use of the integration matching the site. Selected native Vanilla JavaScript/AJAX for the existing static review/edit flow.
- Formspree supersedes the proposed private PHP endpoint, SQLite storage and cron notifications. Current WHC packages contain static files only. Historical PHP code and synthetic verification remain available in source/history.
- The normal local preview still sends no data. Production rendering is wired to Formspree, but full release remains subject to actual delivery and content/privacy readiness. Provider acceptance and inbox receipt are distinct. Owner subsequently authorized one labelled test enquiry. It was submitted once and accepted by Formspree (HTTP 200, `ok:true`); no dashboard change was made. Owner confirmed receipt in the configured inbox. The enquiry-delivery readiness flag is now supported by that test; this does not enable the full-site release.

## November 15, 2026 — Full-site publication authorized

- Owner explicitly instructed finishing and publishing the full website with the contact form working. WHC is the production target; no additional publishing permission is required.
- Launch scope is a complete bilingual enquiry website. Supplier/provider arrangements remain unconfirmed, so pages collect requirements and clearly state that availability is subject to confirmation. No saleable model, stock, credential or scheduled service is asserted. This replaces the earlier blanket requirement for arranged supply before publishing informational enquiry pages; product publication still requires its own evidence.
- Reviewed general technical copy against the linked Transport Canada/CCOHS sources. No specialist review, equipment recommendation or regulatory certification is claimed.
- Inspected the authenticated Formspree workflow: notification to info@eebd.ca, form enabled, submission archive enabled, Formshield enabled and CAPTCHA disabled in the existing account configuration. The owner already confirmed inbox receipt. Enabled required email/contact/message validation and restricted the EEBD project to eebd.ca. No other project was changed.
- Added general contact forms in both languages, alongside equipment/training/service enquiries. Published a privacy notice describing the actual Formspree archive/email data flow and cross-border processing. No invented automatic retention schedule or legal clearance.
- The unverified phone number is omitted from public pages. Verified email and the functioning form supply the contact route.
- Local release checks: 23 tests, 152 responsive page checks, eight mocked successful form journeys, six failure journeys and double-click protection. Final WHC checks and deployment evidence are recorded after publication.

## November 15, 2026 — Full website live

- Published the complete English/French enquiry website on WHC under the owner's explicit instruction. Final runtime source: `df778613444e4e7c1cb4cf9064a8e57f4c889e5e`.
- Corrected LiteSpeed custom-error recursion found during live verification by giving error documents dedicated asset URLs and the French directory its own handler. All 87 packaged public files were verified on the host; all 85 readable files matched their hashes over HTTPS. Canonical redirects, localized 404 bodies, security headers and 34-URL sitemap passed.
- Actual-host UI tests passed eight bilingual success journeys, six failure journeys and double-click protection using intercepted Formspree responses. No additional live enquiry was sent. The earlier single authorized submission and owner-confirmed inbox receipt remain the end-to-end delivery evidence.
- Archived the previous live directory and earlier holding page privately, with manifest/timestamp records. Other hosted websites and mail records were preserved. Documentation updates after this runtime commit do not imply a new deployment.

## November 15, 2026 — Enriched pages and Google discovery

- Owner requested relevant imagery on each page, more detailed services/products, major Canadian city coverage especially coastal cities, and Search Console verification/sitemap submission. This authorizes publication of the expanded site and the required domain-verification record.
- Added seven built-in generated conceptual images with responsive WebP variants, localized descriptions and visible captions. The images do not portray actual equipment models, staff, stock or offices. Preserved the approved logo.
- Added nine detailed bilingual enquiry topics and fourteen paired city guides. Sources establish local context; pages contain distinct planning questions. No unverified saleable product records, service qualifications or local branches were introduced.
- Deployed runtime `c77f1ab0b1a77986631ee410cfe86869781c6726` on WHC at 04:54:44 UTC November 16. Verified 147 host files, 145 public HTTP hashes, 336 responsive page checks, 23 unit/integration checks and 3,664 internal references.
- Created the eebd.ca Google Search Console Domain property using the owner's existing signed-in account. Added one TXT verification record through WHC; Google verified ownership. Submitted the live sitemap, which Google processed successfully with 80 discovered URLs. Search discovery does not establish rankings or complete indexing.
- No additional real Formspree enquiry was sent. Prior authorized inbox receipt remains valid delivery evidence; current browser checks use intercepted provider responses.
- Google accepted one individual indexing request for each English/French homepage and added both to a priority crawl queue. Actual indexing remains pending.

## November 16, 2026 — model research and Bing

The owner requested Canadian supplier research, exact product models with real photographs/details, and Bing submission. Six candidate Canadian channels were researched without outreach. Three bilingual model-reference pages identify Ocenco M-20.2, Interspiro Spiroscape bar configurations and Dräger Saver CF10 N. These are informational enquiries, not verified saleable variants; the catalogue sale gates remain unchanged. Model identity carries into the quote form and its language equivalent.

The owner confirmed no existing manufacturer photo permission. A public-domain CDC/NIOSH M-20.2 photograph is used with credit and non-endorsement. Interspiro/Dräger photos remain on their official sites, linked from the pages, until commercial reuse permission is obtained. Supplier introductions are drafted for review, not sent. Bing verification is scoped to EEBD.ca using its own site meta tag.

## November 16, 2026 — procurement improvements

The owner authorized implementation and live publication of the reviewed improvements, including model comparison, fleet procurement content and a bulk enquiry form. Tender documents are evidence for useful purchasing questions, not instructions to bid or contact third parties. No open-opportunity deadline, tender volume, accepted-equivalent status or DND supplier relationship is advertised.

Published the comparison and document-checklist pages in both languages, blank CSV purchasing lists, optional bulk equipment fields, prominent model links, deeper fleet/coastal content and educational FAQs. Retained the existing verified Formspree endpoint. Supplier outreach remains deferred following the owner’s “I will do it later” response; no supplier email has been sent.
