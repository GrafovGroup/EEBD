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
- Display the supplied phone as unverified preview content, without pretending a contact route is operational. Do not publish the proposed email or a fake form success.
- Enquiry previews use inputs outside an HTML form, a disabled submission button and no persistence. They cannot submit by pressing Enter, including without JavaScript.
- Original vector workplace/document illustrations are conceptual, not pictures of actual inventory, customers or premises. No manufacturer images or marks are reused.
- Root routing is an explicit temporary redirect to `/en/`, with visible EN/FR controls; no geolocation.

## Decisions still needed

Contracting entity and public address policy; exact equipment supply routes; training/service providers and coverage; hosting destination; form acceptance/storage/notification provider and destination; mailbox and phone routing; privacy retention/recipients; competent technical review. These are not inferred from the owner's other projects.

## Preview correction

The initial development watcher called an already-imported build module, retaining stale page templates after source edits. It now launches a fresh Node build process on each rebuild. The server was restarted and the selected-identity review opened with a fresh URL so the visible page matches source.
