# EEBD.ca implementation status

Updated November 16, 2026. **Full site remains a development preview. WHC connection work is underway.** Read this file and DECISIONS.md before resuming.

## Completed implementation

- Preserved the original masterplan/README history and connected the local checkout to the authorized repository on `codex/initial-build`.
- Created two rounds of actual editable logo concepts. The second round (06–10) followed the owner's correction: **EEBD**, no `.ca`, with **EMERGENCY ESCAPE BREATHING DEVICE** embedded beneath it. Light/dark/monochrome/compact and French versions are available. The owner subsequently selected **Precision 01**, with no suffix and the singular descriptor immediately beneath the letters. The selected lockup is applied throughout the default EN/FR preview.
- Created a dependency-free static generator, shared configuration, bilingual route-equivalence map, 19 page purposes in both languages (38 pages), localized 404s, shared header/footer, responsive navigation and original conceptual illustrations.
- Drafted equipment categories, training, service coordination, fleet, industries, coverage, two resources, about, contact, quote and preview privacy content.
- Implemented bilingual enquiry details, accessible validation, review and edit steps for all three branches. Local preview sends no data. Built a disabled-by-default PHP endpoint with private SQLite acceptance, signed timed tokens, rate limits, idempotency and a separate notification retry worker.
- Implemented preview noindex, empty sitemap, metadata/canonicals/alternates, favicon references, route/product publication filters and a production build guard. No saleable product records are populated.
- Prepared research, brand, deployment and decision records with the commercial evidence still required.

## Review

- Current brand review: `http://127.0.0.1:4173/brand-concepts/`
- Archived first round: `/brand-concepts/round-one/`
- English draft: `/en/`; French draft: `/fr/`
- Selected identity: `design/precision-selected.png` / editable `.svg`. Previous concept overview: `design/brand-board.png`.
- Selected production-source artwork: `public/assets/brand/precision-{primary,white,mono}-{en,fr}.{svg,png}`; social cards and favicon assets are present.
- Local preview requires `node scripts/dev.mjs` to remain running. It is not a public or durable hosted URL.

## Verification and source synchronization

Verification: 17 automated tests passed; the isolated build crawl checked 45 HTML files and 1,601 internal references; Chromium passed 152 responsive checks, six validation/review/edit journeys and twelve concept applications with no page errors or failed resources. See LAUNCH_CHECKLIST.md for limits. Generated output and local browser reports are ignored by Git. The initial milestone is backed up on GitHub at `595cebded88da34353755354e559c7951de2362d`, with the exact local source tree verified against the connector-created tree. Shell push credentials are unavailable; the connected GitHub integration is used for source backup. The selected-Precision update is recorded in the subsequent commit on the same branch; use Git history for its exact revision. No production deployment follows from source synchronization.

## Remaining dependencies

1. Selected Precision identity is implemented. Complete remaining platform/browser checks for the actual release host.
2. Superclean Canada Inc. and info@eebd.ca are owner-confirmed. Suppliers, trainers and service partners are not arranged; no saleable models are populated.
3. WHC selected; owner-authenticated cPanel inspected. Domain attached to its own directory, separate from existing sites. Complete authoritative DNS, HTTPS, mail routing and actual runtime tests. Keep account/session details out of source.
4. Verify phone/mailbox routing, implement provider-dependent security/privacy handling and test acceptance/delivery for all six language/type combinations using an authorized test destination.
5. Complete competent technical/content review, selected-brand accessibility/performance/browser checks, then publish only ready routes and verified products.
6. Record exact deployed revision, HTTPS/domain/redirect checks and actual search-console actions.

Do not mark draft pages as published merely to bypass the guard. Do not populate products from manufacturer search results without the required commercial and model-specific evidence. Preserve the owner's singular descriptor/no-domain-suffix override.

## Exact resume point

Continue WHC domain/hosting connection and enquiry integration. The owner has supplied business identity and interactive WHC access. Identity selection is complete; do not reopen it. Routine implementation choices do not require renewed permission. Form delivery and commercial readiness remain unresolved.

PHP verification: 48 checks passed in PHP 8.3.33 (WordPress WASM), with SQLite and fake mail only. Real WHC mail acceptance, inbox receipt, cron, concurrent workers and privacy/retention approval remain unverified. A separate bilingual, noindex holding page is prepared and its content was verified byte-for-byte against the WHC origin. This is not publication of the full site.

WHC follow-up: the same 48 checks also passed natively on WHC EA-PHP 8.3.36 with PDO SQLite and mbstring, using only synthetic requests and a fake notification transport. The domain was added successfully with a separate document root. The holding page is installed and origin-verified; authoritative DNS still points to parking and HTTPS is pending. WHC’s DNS editor is read-only at the current 698 px browser width; owner was asked to widen it. Email forwarding versus a separate mailbox is awaiting the owner’s choice. No actual email has been sent.

Latest source backup for the enquiry/WHC preparation milestone: `5dd72e5ba73a4aa68b51768942bd9d67de3c576c` on `codex/initial-build`; the connector tree matched the staged local tree exactly. Later documentation-only commits record host verification.
