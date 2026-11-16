# EEBD.ca implementation status

Updated November 16, 2026 (America/Toronto). **The bilingual enquiry website is live at https://eebd.ca/ on WHC.** Formspree handles contact and equipment/training/service enquiries.

## Published release

- Runtime source: `f57fbd4403f91f8c74039c12644e8314bc5fb02d`, branch `codex/initial-build` in `GrafovGroup/EEBD`. Later documentation-only commits do not change the deployed runtime.
- Activated November 16 at 06:33:03 UTC / 01:33 Toronto, with a full previous-release backup. Archive, checksum and rollback details are in DEPLOYMENT.md.
- 47 paired page purposes: **94 public content/form pages**, **90 indexable sitemap URLs**, plus localized error pages.
- Three bilingual model guides: Ocenco M-20.2, Interspiro Spiroscape bar configurations, and Dräger Saver CF10 N (4042056). Specification tables, source documents, model limitations and model-aware enquiries are implemented. Language switching preserves model context.
- These are reference/enquiry pages. Suppliers, trainers and service partners remain unarranged. No stock, prices, authorized-dealer status, blanket Canadian approval or recall clearance is invented; saleable catalogue records remain empty.
- Six Canadian supplier candidates are researched in `docs/CANADIAN_SUPPLIER_RESEARCH.md`. Survitec, Dräger Canada and VIKING are the initial priorities. Introduction drafts are prepared but **not sent**.
- One real M-20.2 photo is reproduced from a public-domain CDC/NIOSH report, with attribution and non-endorsement. The owner confirmed no manufacturer photo permissions. Interspiro/Dräger pages link their official photographs; on-site product photos for those two require permission.
- Seven earlier conceptual images, nine detailed enquiry topics and fourteen Canadian city guides remain published. The approved Precision 01 logo is unchanged: descriptor directly under EEBD, no .ca inside the logo.
- Operator: Superclean Canada Inc. Contact: info@eebd.ca. The unverified telephone is not displayed.

- Product comparison and procurement-checklist pages are published in both languages. All three models are linked prominently from the homepage. Blank English/French CSV purchasing lists are downloadable.
- Equipment enquiries include an optional bulk section with part number, NSN, manufacturer NCAGE, purchasing reference, schedule, destinations, remaining shelf life, documents, accessories and freight requirements. Fleet links open this section automatically.
- Fleet, Halifax and Victoria/Esquimalt content and the educational FAQs are expanded. No tender-specific acceptance, supplier authorization, prices or new photo rights are asserted. Shared asset URLs are versioned to refresh WHC’s cached styling.

## Verification

24 unit/integration tests passed. Preview checks covered 101 HTML files and 4,194 internal references. Production Chromium checks covered 376 route/width combinations (94 pages at 320, 390, 768 and 1440 px), with no script errors or failed resources.

All 160 public files were verified on the host; all 158 readable files matched release SHA-256 hashes over HTTPS. Localized 404s, the Bing tag and the 90-URL XML sitemap passed. Existing HTTPS/canonical routing and privacy controls remain unchanged.

The simulated form suite checks all three model prefills in both languages, translated model context, rejected unknown source context, eight successful form journeys, six failure states and double-click protection. Provider requests are intercepted; no new real enquiry is sent. The earlier single authorized real test was accepted and the owner confirmed inbox receipt. Formspree's authenticated workflow identifies info@eebd.ca as the notification destination.

## Commercial and operational follow-through

Keep Formspree, the notification inbox and WHC active. Required form fields, Formshield and the eebd.ca domain restriction are configured; CAPTCHA was already disabled and remains unchanged. Plan limits and inbox monitoring remain operational responsibilities.

Obtain actual supplier terms, approved commercial media, current model/serial documents and qualified service/training arrangements before promising supply. See `docs/MODEL_RESEARCH.md` for current-source conflicts and the unresolved Saver CF notice applicability. Specialist technical/French sign-off and Safari/Firefox/real-device/screen-reader testing are not claimed.

Google Search Console ownership is DNS-verified. The earlier sitemap was processed successfully with 80 discovered URLs; the live sitemap now contains 90. Search engines control crawling, indexing and ranking. See `docs/SEARCH_CONSOLE.md` and the Bing release record for actual submission status.

Bing ownership is verified using the site meta tag. The updated sitemap was submitted successfully; its last observed status is **Processing**, with no errors or warnings reported. See `docs/BING_WEBMASTER.md`. The final live simulated form check passed at 06:35:51 UTC: six model/language checks, eight standard success journeys, two bulk journeys, inactive bulk-field exclusion, six failure states and double-click protection. All Formspree requests were intercepted; zero real submissions occurred.
