# EEBD.ca implementation status

Updated November 15, 2026 (America/Toronto). **WHC domain/HTTPS connection is complete; the holding page is live. The full site remains a development preview. Formspree is the selected enquiry provider.** Read this file and DECISIONS.md before resuming.

## Completed implementation

- Preserved the original masterplan/README history and connected the local checkout to the authorized repository on `codex/initial-build`.
- Created two rounds of actual editable logo concepts. The second round (06–10) followed the owner's correction: **EEBD**, no `.ca`, with **EMERGENCY ESCAPE BREATHING DEVICE** embedded beneath it. Light/dark/monochrome/compact and French versions are available. The owner subsequently selected **Precision 01**, with no suffix and the singular descriptor immediately beneath the letters. The selected lockup is applied throughout the default EN/FR preview.
- Created a dependency-free static generator, shared configuration, bilingual route-equivalence map, 19 page purposes in both languages (38 pages), localized 404s, shared header/footer, responsive navigation and original conceptual illustrations.
- Drafted equipment categories, training, service coordination, fleet, industries, coverage, two resources, about, contact, quote and preview privacy content.
- Implemented bilingual enquiry details, accessible validation, review and edit steps for all three branches. Local preview sends no data. Integrated the owner-provided Formspree endpoint using tailored native AJAX, with bilingual provider-confirmed success/error states. It supersedes the earlier unused PHP/SQLite proposal.
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

Verification: 22 automated tests passed; the new isolated Formspree browser suite passed six success journeys, six failure journeys and double-click protection with zero real submissions; the isolated build crawl checked 45 HTML files and 1,601 internal references; Chromium passed 152 responsive checks, six validation/review/edit journeys and twelve concept applications with no page errors or failed resources. See LAUNCH_CHECKLIST.md for limits. Generated output and local browser reports are ignored by Git. The initial milestone is backed up on GitHub at `595cebded88da34353755354e559c7951de2362d`, with the exact local source tree verified against the connector-created tree. Shell push credentials are unavailable; the connected GitHub integration is used for source backup. The selected-Precision update is recorded in the subsequent commit on the same branch; use Git history for its exact revision. No production deployment follows from source synchronization.

## Remaining dependencies

1. Selected Precision identity is implemented. Complete remaining platform/browser checks for the actual release host.
2. Superclean Canada Inc. and info@eebd.ca are owner-confirmed. Suppliers, trainers and service partners are not arranged; no saleable models are populated.
3. WHC selected; owner-authenticated cPanel inspected. Domain attached to its own directory, separate from existing sites. DNS and HTTPS are verified. Formspree accepted one test and the owner confirmed inbox receipt. Complete remaining full-site host checks. Keep account/session details out of source.
4. Verify phone/mailbox routing, implement provider-dependent security/privacy handling and test acceptance/delivery for all six language/type combinations using an authorized test destination.
5. Complete competent technical/content review, selected-brand accessibility/performance/browser checks, then publish only ready routes and verified products.
6. Record exact deployed revision, HTTPS/domain/redirect checks and actual search-console actions.

Do not mark draft pages as published merely to bypass the guard. Do not populate products from manufacturer search results without the required commercial and model-specific evidence. Preserve the owner's singular descriptor/no-domain-suffix override.

## Exact resume point

Domain/hosting connection is complete. Public URL: https://eebd.ca/. It displays only the bilingual holding page; root/www HTTPS and canonical redirects were verified. Nameservers and mail records were preserved. The exact holding source is `ff5ce2abfc5ceb478d7c95e8ff5a5d1475900bb2`; hashes and rollback are in DEPLOYMENT.md.

Owner selected Formspree `https://formspree.io/f/xrpqpylv` for contact/enquiry delivery. Native AJAX now supports all six language/type journeys, preserves the review/edit step, and reports provider acceptance without claiming inbox delivery. WHC packaging is static-only. The unused PHP implementation remains in source/history; it is no longer a deployment requirement.

Next: review Formspree account spam/CAPTCHA and retention settings, then finish production privacy/content readiness. One authorized end-to-end delivery test is complete. Preview sending remains off. The owner authorized one clearly labelled live test. Formspree returned HTTP 200 with `ok:true` and `next:/thanks`; the owner confirmed receipt in the configured inbox. No Formspree dashboard settings have been changed. The earlier mailbox-versus-forwarding question remains separate from the new form provider choice.

The approved identity is complete; do not reopen it. Routine implementation choices do not require renewed permission. The full site has not been released.
