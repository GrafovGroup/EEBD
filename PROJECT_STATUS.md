# EEBD.ca implementation status

Updated November 15, 2026. **Local development preview; not launched.** Read this file and DECISIONS.md before resuming.

## Completed implementation

- Preserved the original masterplan/README history and connected the local checkout to the authorized repository on `codex/initial-build`.
- Created two rounds of actual editable logo concepts. The second round (06–10) followed the owner's correction: **EEBD**, no `.ca`, with **EMERGENCY ESCAPE BREATHING DEVICE** embedded beneath it. Light/dark/monochrome/compact and French versions are available. The owner subsequently selected **Precision 01**, with no suffix and the singular descriptor immediately beneath the letters. The selected lockup is applied throughout the default EN/FR preview.
- Created a dependency-free static generator, shared configuration, bilingual route-equivalence map, 19 page purposes in both languages (38 pages), localized 404s, shared header/footer, responsive navigation and original conceptual illustrations.
- Drafted equipment categories, training, service coordination, fleet, industries, coverage, two resources, about, contact, quote and preview privacy content.
- Implemented inactive enquiry previews with three progressive branches, localized labels, preserved request/source language context and a server-validation contract. No requests are accepted, persisted or transmitted; no fake confirmation exists.
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

Verification: 17 automated tests passed; the isolated build crawl checked 45 HTML files and 1,597 internal references; Chromium passed 152 responsive checks, six enquiry branches and twelve concept applications with no page errors or failed resources. See LAUNCH_CHECKLIST.md for limits. Generated output and local browser reports are ignored by Git. The initial milestone is backed up on GitHub at `595cebded88da34353755354e559c7951de2362d`, with the exact local source tree verified against the connector-created tree. Shell push credentials are unavailable; the connected GitHub integration is used for source backup. The selected-Precision update is recorded in the subsequent commit on the same branch; use Git history for its exact revision. No production deployment follows from source synchronization.

## Remaining dependencies

1. Selected Precision identity is implemented. Complete remaining platform/browser checks for the actual release host.
2. Confirm contracting entity/public identity and actual equipment supply routes, training providers and service coverage.
3. Choose hosting and a real private enquiry service, storage/notification destination and operational owner.
4. Verify phone/mailbox routing, implement provider-dependent security/privacy handling and test acceptance/delivery for all six language/type combinations using an authorized test destination.
5. Complete competent technical/content review, selected-brand accessibility/performance/browser checks, then publish only ready routes and verified products.
6. Record exact deployed revision, HTTPS/domain/redirect checks and actual search-console actions.

Do not mark draft pages as published merely to bypass the guard. Do not populate products from manufacturer search results without the required commercial and model-specific evidence. Preserve the owner's singular descriptor/no-domain-suffix override.

## Exact resume point

Continue provider/operating-identity and enquiry-integration work once the necessary business facts/access are supplied. Identity selection is complete; do not reopen it. Routine implementation choices do not require renewed permission. Form delivery and commercial readiness remain unresolved.
