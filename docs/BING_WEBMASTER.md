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
