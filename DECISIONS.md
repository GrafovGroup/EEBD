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

## November 15–16, 2026 — Business details and WHC

- Owner confirmed Superclean Canada Inc. as the legal business name and info@eebd.ca as the designated enquiry email. Address ownership/routing is not proof of delivery.
- Owner chose existing WHC hosting, identified the account, signed in interactively and authorized connecting hosting and domain. Account identifiers, session URLs and credentials stay out of source.
- No suppliers, trainers or service partners are arranged. Public draft copy now states that these arrangements are being established; no model catalogue or provider claims are added.
- Enquiry UI now supports validation, review and editing in both languages. Preview sending remains disabled and personal entries remain in page memory only.
- WHC candidate architecture: locally generated static pages plus a PHP endpoint, private SQLite store and cron notification worker. Production remains gated until actual host, mail and policy verification. No Node service is needed on the host.
