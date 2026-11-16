# Bing Webmaster Tools — EEBD.ca

Verified and submitted November 16, 2026.

- Property: **https://eebd.ca/** in the owner's existing signed-in Bing Webmaster account.
- Verification: site-specific `msvalidate.01` meta tag in the production HTML, configured in `src/config.mjs`. Keep the tag to retain verification.
- Submitted sitemap: **https://eebd.ca/sitemap.xml**.
- Latest observed report: **Submitted / Processing**, one known sitemap, no reported errors or warnings, no discovered URL count yet. Processing and indexing are controlled by Bing; this is not a claim that pages are indexed.
- Live sitemap at submission: **86 canonical URLs**, 86 image entries and 172 reciprocal language alternates. Public HTTPS checks returned valid XML.
- Dashboard: https://www.bing.com/webmasters/sitemaps?siteUrl=https://eebd.ca/

Only EEBD.ca was added. Automatic approval review rejected the proposed Google Search Console import action because it might expose/import multiple properties. The narrower manual verification method completed the task; no broader Google import was granted and no other Bing property was changed. No analytics/Clarity scripts, advertising campaigns, recurring scans or additional users were configured.

Private evidence: `test-results/bing-sitemap-submitted.png`, `test-results/bing-setup.json`. These are ignored local records and are not part of the website package.

Reference: https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b . The final account state is based on the authenticated report, not documentation alone.

## November 16 resubmission and indexing audit

Bing processed the 90-URL sitemap successfully, then accepted the requested resubmission for processing. The initial 86-URL observation above is historical. Later direct inspections found 37 URLs discovered but not crawled; the remaining URLs are not individually verified. The homepage and comparison-page live tests passed. Homepage metadata/image notices were corrected and the fresh live test reported no SEO/GEO issues. Explicit indexing requests were accepted for the English homepage, comparison and fleet procurement pages. A French-homepage request returned a Bing server error. See `INDEXING_AUDIT.md`; discovery and request acceptance do not confirm indexing.

## November 16, 2026 — latest sitemap resubmission

The owner-requested resubmission of `https://eebd.ca/sitemap.xml` was accepted at approximately 16:46 UTC / 11:46 Toronto. Bing initially showed Processing and had returned to **Success** by 16:49 UTC, with **92 discovered URLs**, one known sitemap, zero errors and zero warnings. Submission and crawl dates both read November 16. These are sitemap-processing results, not confirmation that all URLs are indexed.

IndexNow verification separately succeeded at **16:48:15 UTC**: `https://api.indexnow.org/indexnow` returned **HTTP 200** for the eight revised English/French URLs. Bing's IndexNow dashboard still showed its introductory screen, so API acceptance is the verification evidence. See `ANALYTICS_AND_INDEXNOW.md`. Private screenshots: `test-results/bing-sitemap-resubmitted-20261116.png` and `test-results/bing-sitemap-success-20261116.png`.

## Fresh 92-URL indexing audit at approximately 16:59 UTC

All 92 canonical URLs were attempted individually. Ninety completed inspections returned Discovered but not crawled; none were confirmed indexed. `/fr/soutien-technique/revue-registre-equipement/` and `/fr/couverture/montreal/` returned inspection-service errors after a retry and remain unverified. Site Explorer's Indexed URLs view has no data. A fresh live test of the English Dräger page passed with URL can be indexed by Bing and No SEO/GEO issues found. No specific crawl block was identified. See `INDEXING_AUDIT.md`; the private CSV preserves each URL's observation and timestamp.
