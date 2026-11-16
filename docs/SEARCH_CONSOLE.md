# Google Search Console

The owner explicitly requested setup and sitemap submission. On November 15, 2026 (America/Toronto), the eebd.ca Domain property was created in the existing signed-in Google account and verified through a root DNS TXT record at WHC. No password, API key or service account was required. The verification TXT record must remain in DNS.

- [EEBD.ca Search Console](https://search.google.com/search-console?resource_id=sc-domain%3Aeebd.ca)
- [Sitemaps report](https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aeebd.ca)
- [Public sitemap](https://eebd.ca/sitemap.xml)

The submitted sitemap was **processed successfully**, with **80 discovered pages** and a last-read date of November 15, 2026. This result was observed at 04:55:55 UTC November 16. The temporary initial fetch status resolved during processing. There was no unresolved sitemap error at that observation.

The property covers the domain's protocols and subdomains; the website still canonically redirects to HTTPS without www. The sitemap includes only the 80 indexable page URLs, with matching image and language references. The four exclusions are the two quote pages and two privacy pages; contact pages are indexable.

Google controls crawling, indexing and ranking. Discovered URLs are not proof of indexed pages or search position. This setup adds no Google Analytics code, cookies or advertising tags to the website.

## Official references

- [Property types](https://support.google.com/webmasters/answer/34592)
- [Verify site ownership](https://support.google.com/webmasters/answer/9008080)
- [Sitemaps report and status meanings](https://support.google.com/webmasters/answer/7451001)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies): city guides are useful local-context pages, not cloned keyword pages or invented branches.

Private screenshots, the exact verification token and timestamps are retained in ignored local records. Do not commit Google sessions or account credentials.

Google also accepted individual indexing requests for https://eebd.ca/en/ and https://eebd.ca/fr/, confirming each was added to a priority crawl queue. At inspection, both were discovered but not yet indexed. The requests were submitted once per homepage; no repeated bulk requests were made.

## November 16 update

Resubmission of the updated sitemap succeeded with 90 discovered pages. Direct URL Inspection confirmed both language homepages are indexed. Checks of 64 distinct URLs found 57 discovered/not yet indexed and five unknown to Google; the daily inspection quota then prevented additional checks. The aggregate Page indexing report is still processing. See `INDEXING_AUDIT.md` for evidence, limitations and technical corrections.

## November 16, 2026 — latest sitemap resubmission

At approximately 16:46 UTC / 11:46 Toronto, Google confirmed “Sitemap submitted successfully” for `https://eebd.ca/sitemap.xml`. The Sitemaps report shows **Success**, **92 discovered pages**, zero discovered videos, and submitted/last-read dates of November 16. The earlier 80- and 90-page counts above are historical.

Live checks confirmed HTTP 200, valid XML, 92 unique canonical HTTPS URLs and the matching robots.txt sitemap declaration. Discovered pages are not an indexed-page count; no new URL Inspection audit was performed for this resubmission. Private evidence is stored in `test-results/google-sitemap-resubmitted-20261116.png`, `test-results/google-sitemap-success-20261116.png` and `test-results/search-resubmission-live-precheck.json`.

## Indexing check at approximately 16:59 UTC

A fresh URL Inspection attempt still returned the daily property quota error. Page indexing continues to show Processing data, so the earlier two indexed homepages are the last confirmed results, not a fresh count of all 92 pages. Manual actions and Security issues both report No issues detected. See `INDEXING_AUDIT.md` and the private per-page report for the dated evidence and unverified URLs.
