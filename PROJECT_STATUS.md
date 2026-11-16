# EEBD.ca implementation status

Updated November 16, 2026 (America/Toronto). **The bilingual enquiry website is live at https://eebd.ca/ on WHC.** Formspree handles contact and equipment/training/service enquiries.

## Published release

- Runtime source: `157068fa22f0bfaebc20437f810fbe9cc77ccf58`, branch `codex/initial-build` in `GrafovGroup/EEBD`. Later documentation-only commits do not change the deployed runtime.
- Activated November 16 at 16:03:38 UTC / 11:03 Toronto, with a full previous-release backup. Archive, checksum and rollback details are in DEPLOYMENT.md.
- 48 paired page purposes: **96 public content/form pages**, **92 indexable sitemap URLs**, plus localized error pages.
- Three bilingual model guides: Ocenco M-20.2, Interspiro Spiroscape bar configurations, and Dräger Saver CF10 N (4042056). Specification tables, source documents, model limitations and model-aware enquiries are implemented. Language switching preserves model context.
- These are reference/enquiry pages. Suppliers, trainers and service partners remain unarranged. No stock, prices, authorized-dealer status, blanket Canadian approval or recall clearance is invented; saleable catalogue records remain empty.
- Six Canadian supplier candidates are researched in `docs/CANADIAN_SUPPLIER_RESEARCH.md`. Survitec, Dräger Canada and VIKING are the initial priorities. Introduction drafts are prepared but **not sent**.
- One real M-20.2 photo is reproduced from a public-domain CDC/NIOSH report, with attribution and non-endorsement. The owner confirmed no manufacturer photo permissions. Interspiro/Dräger pages link their official photographs; on-site product photos for those two require permission.
- 39 new images plus the existing hero, seven context images and one real product photograph provide 48 distinct page-purpose images. Nine detailed enquiry topics and fourteen Canadian city guides remain published. The approved Precision 01 logo is unchanged: descriptor directly under EEBD, no .ca inside the logo.
- Operator: Superclean Canada Inc. Contact: info@eebd.ca. The unverified telephone is not displayed.

- Product comparison and procurement-checklist pages are published in both languages. All three models are linked prominently from the homepage. Blank English/French CSV purchasing lists are downloadable.
- Equipment enquiries include an optional bulk section with part number, NSN, manufacturer NCAGE, purchasing reference, schedule, destinations, remaining shelf life, documents, accessories and freight requirements. Fleet links open this section automatically.
- Fleet, Halifax and Victoria/Esquimalt content and the educational FAQs are expanded. No tender-specific acceptance, supplier authorization, prices or new photo rights are asserted. Shared asset URLs are versioned to refresh WHC’s cached styling.

## Verification

25 unit/integration tests passed. Preview checks covered 112 HTML files and 4,769 internal references. The preceding mobile UX release passed 384 route/width combinations (96 pages at 320/390/768/1440 px) without page errors, failed resources or horizontal overflow. Thirty-six targeted checks at 320/390/768/900/901/1440 px passed locally and on the live host for bilingual comparison cards/tables, shorter enquiries, keyboard disclosure controls and the single-line mobile utility bar. The homepage-only follow-up passed 10 bilingual checks at 320/390/768/1440/2560 px locally and on live HTTPS, including all main destination links and keyboard FAQs. The photo audit confirms 48 distinct images, one per page purpose.

All 255 public files were verified on the host; all 253 readable files matched release SHA-256 hashes over HTTPS at 16:03:59 UTC. Localized 404s passed. The sitemap still contains 92 URLs. These checks establish the deployed content, not search-engine indexing.

The live simulated form suite passed at 15:57:25 UTC: six model-context checks, eight standard success journeys, two shortened enquiries, two bulk journeys, inactive-field exclusion, six error states and double-click protection. All provider requests were intercepted; zero real submissions occurred. The earlier single authorized inbox test remains the delivery evidence.

## Commercial and operational follow-through

Keep Formspree, the notification inbox and WHC active. Required form fields, Formshield and the eebd.ca domain restriction are configured; CAPTCHA was already disabled and remains unchanged. Plan limits and inbox monitoring remain operational responsibilities.

Obtain actual supplier terms, approved commercial media, current model/serial documents and qualified service/training arrangements before promising supply. See `docs/MODEL_RESEARCH.md` for current-source conflicts and the unresolved Saver CF notice applicability. Specialist technical/French sign-off and Safari/Firefox/real-device/screen-reader testing are not claimed.

Google Search Console ownership is DNS-verified. The updated sitemap was processed successfully with 92 discovered URLs. Direct inspections confirm the English and French homepages are indexed; the aggregate indexing report is still processing. See `docs/INDEXING_AUDIT.md` for checked URLs and the inspection quota limit. Search engines control crawling, indexing and ranking. See `docs/SEARCH_CONSOLE.md` and the Bing release record for actual submission status.

Bing ownership is verified using the site meta tag. The latest checked sitemap status is Success with 92 discovered URLs, zero errors and zero warnings. Ninety completed URL inspections reported Discovered but not crawled; two inspections failed after retry and remain unverified. No Bing-indexed pages were confirmed. The earlier Google home-page indexing confirmations remain the latest completed inspections; fresh Google inspections were quota-limited. These observations preceded the mobile release and do not promise subsequent indexing.

## Latest owner-directed presentation updates

The live layout uses the full screen width with responsive padding and 25% larger navigation text. The English homepage browser title is `Emergency Escape Breathing Device | EEBD.CA`. The bottom-left footer now reads exactly `2026 EEBD.CA. A division of Facility Unlimited Corp. All Right Reserved.` The earlier owner-supplied contracting entity remains the contact/privacy entity; the new instruction specified the footer wording. Five search descriptions and the localized homepage image descriptions were improved.

Both homepages now show an original generated EEBD-in-use scene, replacing the boat hero. The owner subsequently requested removal of public AI-generation wording. The image has descriptive alt text and optimized desktop/mobile WebP versions; its provenance stays in internal documentation. See `docs/EEBD_HERO_PROMPT.md`. The targeted image checks passed in both languages at four widths.

## Unique imagery, EEBD versus SCBA and homepage options

Published the separate bilingual comparison at `/en/resources/eebd-vs-scba/` and `/fr/ressources/eebd-vs-ari/`, with a generic side-by-side equipment image, accessible comparison table and primary-source links. It distinguishes escape-only EEBDs from entry-and-escape SCBA without universal-duration or no-training claims.

The owner clarified that every English/French page pair should have a separate photo. The 48 pairs now have 48 distinct photos; bilingual counterparts share their one asset. Homepage card and training photos that repeated other pages were replaced with typographic panels. The Ocenco source credit remains. No unlicensed supplier photographs were added, and no supplier enquiry was sent.

Four complete homepage alternatives are live for review at `https://eebd.ca/homepage-options/`: 01 Immersive, 02 Editorial, 03 Procurement and 04 Technical. Each has EN/FR pages and is noindex, outside the sitemap. The owner selected 01 Immersive, which is now the live homepage in both languages without the review toolbar. The gallery identifies this selection. The gallery uses screenshots of the alternatives; those screenshots and the alternatives’ shared homepage image are review material, not duplicate editorial images assigned to distinct page purposes.

Final Formspree browser simulation completed at 07:37:59 UTC: six model-context checks, eight standard successes, two bulk journeys, six error states and duplicate-click protection; zero real submissions. The earlier owner-confirmed real inbox test remains the delivery evidence.

## Clear titles and mobile improvements

The owner authorized descriptive page titles, a shorter mobile enquiry flow and phone-friendly comparisons. All bilingual search titles now describe their topic; the English home title stays exactly as requested. Equipment enquiries have six required entries instead of nine. Organization, phone and timing sit in an optional disclosure; unknown models can be left blank. The form precedes its photograph on mobile. Comparison pages use model/criterion cards through 900 px and desktop tables above that, with all data and source/model links preserved.

The owner also requested that the top bar fit on one mobile line. The tagline, Contact and EN/FR controls remain visible on one line, without overlap or page overflow at the tested 320/390 px phone widths. Source and release records are synchronized with GitHub. Existing Immersive homepage, branding, footer, commercial boundaries and Formspree endpoint are preserved.

## Streamlined homepage

The owner requested less text while scrolling. The live bilingual homepage now has five sections below the preserved Immersive hero: compact model cards, fleet/training/service links, coastal-city links, three closed-by-default FAQs and an enquiry CTA. Repeated training/service/process paragraphs and nine full city summaries were replaced with concise links into the existing detailed pages. All nine coastal city destinations remain directly linked.

At 390 px, visible main text is approximately 71% lower (English 783 → 224 words, French 867 → 245), and total page height is approximately 64% lower (English 10,749 → 3,888 px, French 11,009 → 3,980 px). The previous mobile form, comparison cards and utility-bar fixes remain intact. No new photo or real form submission was needed. Source and release records are backed up on GitHub.
