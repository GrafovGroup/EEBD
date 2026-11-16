# EEBD.ca implementation status

Updated November 15, 2026 (America/Toronto). **The full bilingual enquiry website is live at https://eebd.ca/ on WHC. Contact and quotation forms are enabled through Formspree.**

## Published release

- Deployed runtime source: `c77f1ab0b1a77986631ee410cfe86869781c6726`, branch `codex/initial-build` in `GrafovGroup/EEBD`. Later documentation commits do not imply a different deployed runtime.
- Approved Precision 01 identity: EEBD with the singular descriptor directly beneath the letters, no `.ca` inside the logo. English/French light, white and monochrome assets are included.
- 42 page purposes in both languages: 84 public pages, plus localized error pages. Equipment categories, training, service support, fleet supply, industries, coverage, resources, about, contact, quote and privacy are published.
- 80 indexable URLs in the sitemap. Quote and privacy pages remain available but non-indexable. Brand reviews and source files are excluded from production.
- Superclean Canada Inc. is the operator. Verified contact route: info@eebd.ca. The unverified phone is not displayed.
- General contact and equipment/training/service forms provide validation, review/edit, provider-confirmed success and useful failure states. Preview sending remains disabled.
- Suppliers, trainers and service partners are not arranged. Public copy states this; availability requires confirmation. No stock, saleable models, credentials, prices or checkout are invented.

## Verification

23 unit/integration tests passed. Preview checks covered 91 HTML files and 3,664 internal references. Production Chromium checks covered 336 route/width combinations across 320, 390, 768 and 1440 px, with no script errors or failed resources.

On the enriched WHC site, eight English/French successful form journeys, six failure journeys and double-click protection passed with the new Halifax city-page source context, all provider responses intercepted and zero real submissions. Separately, the single owner-authorized real Formspree test was accepted and the owner confirmed inbox receipt. The authenticated Formspree workflow names info@eebd.ca as its notification recipient.

The enriched deployment was activated at 04:54:44 UTC November 16 (23:54 Toronto November 15): 147 packaged public files verified on the host; all 145 readable public files matched their SHA-256 hashes over HTTPS. Localized error responses and the sitemap passed. Existing HTTPS/canonical routing and form transport remain in place.

See DEPLOYMENT.md for reproduction and rollback, LAUNCH_CHECKLIST.md for evidence limits, and DECISIONS.md for owner instructions. Private account/session details and enquiry data are excluded from Git.

## Continuing operation

Keep the Formspree account, notification inbox and WHC hosting active. Formshield, submission archive and required email/contact/message validations are enabled; the project is restricted to eebd.ca. CAPTCHA was already disabled and was not changed. Plan limits and ongoing inbox monitoring are operational responsibilities.

Before publishing individual products or promising training/service delivery, establish the actual commercial relationships and model-specific evidence. Specialist technical/French review, real-device/Safari/Firefox/screen-reader checks and analytics have not been claimed. Google Search Console domain ownership is DNS-verified and the submitted sitemap was processed successfully with 80 discovered URLs. Discovery is not a claim that all pages are indexed. These do not reopen the completed identity or the owner's authorized enquiry-site launch.

## Imagery, detailed enquiries and Canadian coverage

Seven original conceptual images now appear across every public content/form page, with bilingual alt text and captions. Responsive WebP variants total less than 1 MB; imagery does not represent actual EEBD premises, stock or photographed city locations. The approved logo is unchanged.

Nine new paired topics cover compressed-air devices, oxygen escape devices, compatible stowage, familiarization, crew refreshers, equipment registers, inspection coordination, replacement planning and fleet procurement. Fourteen paired city guides cover Vancouver, Victoria, Prince Rupert, Halifax, Saint John, St. John’s, Sydney, Montreal, Quebec City, Toronto, Hamilton, Calgary, Edmonton and Winnipeg. They provide specific local context and enquiry questions without local-office or availability claims.

The home/coverage pages link the regional guides, and category pages link detailed topics. Canonicals, language alternates, Organization/WebPage/Breadcrumb structured data, image metadata and sitemap image/language entries are present. Research and generation prompts are in `docs/`.
