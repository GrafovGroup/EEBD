# EEBD.ca implementation status

Updated November 15, 2026 (America/Toronto). **The full bilingual enquiry website is live at https://eebd.ca/ on WHC. Contact and quotation forms are enabled through Formspree.**

## Published release

- Deployed runtime source: `df778613444e4e7c1cb4cf9064a8e57f4c889e5e`, branch `codex/initial-build` in `GrafovGroup/EEBD`. Later documentation commits do not imply a different deployed runtime.
- Approved Precision 01 identity: EEBD with the singular descriptor directly beneath the letters, no `.ca` inside the logo. English/French light, white and monochrome assets are included.
- 19 page purposes in both languages: 38 public pages, plus localized error pages. Equipment categories, training, service support, fleet supply, industries, coverage, resources, about, contact, quote and privacy are published.
- 34 indexable URLs in the sitemap. Quote and privacy pages remain available but non-indexable. Brand reviews and source files are excluded from production.
- Superclean Canada Inc. is the operator. Verified contact route: info@eebd.ca. The unverified phone is not displayed.
- General contact and equipment/training/service forms provide validation, review/edit, provider-confirmed success and useful failure states. Preview sending remains disabled.
- Suppliers, trainers and service partners are not arranged. Public copy states this; availability requires confirmation. No stock, saleable models, credentials, prices or checkout are invented.

## Verification

23 unit/integration tests passed. Preview checks covered 45 HTML files and 1,642 internal references. Production Chromium checks covered 152 route/width combinations across 320, 390, 768 and 1440 px, with no script errors or failed resources.

On the actual WHC site, eight English/French successful form journeys, six failure journeys and double-click protection passed with all provider responses intercepted and zero real submissions. Separately, the single owner-authorized real Formspree test was accepted and the owner confirmed inbox receipt. The authenticated Formspree workflow names info@eebd.ca as its notification recipient.

The final deployment was verified at 04:33 UTC November 16 (23:33 Toronto November 15): 87 packaged public files verified on the host; all 85 readable public files matched their SHA-256 hashes over HTTPS. Canonical HTTP/www redirects, root language redirect, custom English/French 404 responses, CSP and sitemap passed. The initial error-document recursion discovered on WHC was corrected before completion.

See DEPLOYMENT.md for reproduction and rollback, LAUNCH_CHECKLIST.md for evidence limits, and DECISIONS.md for owner instructions. Private account/session details and enquiry data are excluded from Git.

## Continuing operation

Keep the Formspree account, notification inbox and WHC hosting active. Formshield, submission archive and required email/contact/message validations are enabled; the project is restricted to eebd.ca. CAPTCHA was already disabled and was not changed. Plan limits and ongoing inbox monitoring are operational responsibilities.

Before publishing individual products or promising training/service delivery, establish the actual commercial relationships and model-specific evidence. Specialist technical/French review, real-device/Safari/Firefox/screen-reader checks, analytics and search-console submission have not been claimed. These do not reopen the completed identity or the owner's authorized enquiry-site launch.
