# Indexing audit — November 16, 2026

The sitemap has 90 indexable URLs. Sitemap discovery is separate from page indexing.

## Verified search-engine results

- Google URL Inspection confirmed `https://eebd.ca/en/` and `https://eebd.ca/fr/` are indexed. The English homepage's reported fetch succeeded as Googlebot smartphone, with crawling/indexing allowed and the inspected URL selected as canonical.
- Of 64 distinct URLs inspected on Google, two were indexed, 57 were “Discovered - currently not indexed” and five were “URL is unknown to Google.” The daily property inspection quota prevented further checks. The remaining 26 are unknown, not assumed unindexed. The aggregate Page indexing report was still processing.
- Bing inspections confirmed 37 distinct URLs as discovered but not crawled. Its aggregate Indexed URLs view returned no data. The remaining 53 were not individually verified; there is no supported site-wide indexed-page total yet.
- Bing's live tests confirmed the English homepage and English comparison page can be indexed. The homepage initially had a description-length warning and four image-alt notices. After the deployed corrections, a new live test at approximately 02:05 Toronto reported no SEO/GEO issues.
- Bing accepted explicit indexing requests for the English homepage, English comparison and English fleet/project procurement pages. The French homepage request returned a Bing server error; its acceptance is not claimed. The full sitemap remains submitted and covers both languages.

These observations are dated snapshots. Newly discovered pages can await a first crawl, and search-engine reports can lag. None of the inspections found a confirmed site-wide robots, noindex, HTTP-error or canonical block. Do not repeatedly submit already accepted requests or claim that all pages will be indexed.

## Live technical checks and fixes

All 90 sitemap pages returned HTTP 200 without redirects or blocking robots headers, had self-canonicals, reciprocal English/French alternates, and were reachable through HTML links within three steps of the English homepage. There were no missing page titles or descriptions. Robots.txt permits crawling and advertises the sitemap. Both missing-page probes returned real HTTP 404s. Four quote/privacy URLs intentionally remain outside the sitemap with noindex.

Five overlong descriptions were rewritten: both homepages, both equipment hubs and the English purchasing checklist. The four contextual images on each homepage now have localized descriptions. The English homepage title is the owner-requested `Emergency Escape Breathing Device | EEBD.CA`. These improve metadata and accessibility; they are not proof that description length or empty decorative alt text had blocked indexing.

The three product-name titles are shared between their English/French versions because the model names are identical. The body languages, descriptions, canonicals and reciprocal language alternates are distinct. No unsupported duplicate-content penalty is inferred.

## Private evidence and follow-through

Ignored local records include `test-results/eebd-indexing-status-20261116.csv` (one row per sitemap URL, with unverified results marked), `url-index-observations-20261116.json`, `indexability-audit-20261116.json`, `bing-indexing-requests-20261116.json`, and screenshots. They are not published with the website. No credentials or account sessions belong in Git.

When the daily Google quota resets and aggregate reports become available, check the unverified URLs and any newly reported exclusions. No recurring monitoring has been scheduled. Existing sitemap submissions already cover all 90 URLs.

References: [Google Page indexing](https://support.google.com/webmasters/answer/7440203), [Google URL Inspection](https://support.google.com/webmasters/answer/9012289), [Bing URL Inspection](https://www.bing.com/webmasters/help/URL-Inspection-55a30305).
