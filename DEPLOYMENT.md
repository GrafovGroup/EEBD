# Build, preview and release

## Current source and hosting

- Source: `https://github.com/GrafovGroup/EEBD.git`, branch `codex/initial-build`.
- Baseline: `7da80d346ab1bacbe70447b1a185236f44ce4009`.
- Hosting provider/project: undecided. Connected Sites owner listing was checked on November 15, 2026; no EEBD project was returned. No Site was created.
- Domain: owned per owner input. HTTPS retrieval did not yield accessible content. DNS records, nameservers, MX/TXT and mailbox state have not been changed or established.
- No production deployment, DNS change, mailbox test, analytics configuration or search-console submission has occurred.

## Reproducible commands

Use Node **24.22.1** (see `.nvmrc`). There are no third-party build/runtime dependencies. `npm install` is unnecessary for the core build.

```sh
node scripts/brand-assets.mjs
node scripts/build.mjs
node scripts/dev.mjs
```

The development server listens on `127.0.0.1:4173`, builds `dist/` and rebuilds after source/public changes. Refresh the browser after an edit. Open `/brand-concepts/`, `/en/` or `/fr/`. `PORT` can override the port. The server is for local preview only, not a production deployment target. Stop it with Ctrl-C.

```sh
node scripts/check.mjs
node --test tests/*.test.mjs
node scripts/build.mjs --production
```

The checker uses an isolated `test-results/check-build` to avoid competing with the preview build. The production command is intentionally blocked by unresolved configuration. Do not treat a preview build as a deployable release. Route state, truthful content, provider integrations, policy text and production hosting must be completed before enabling it; setting readiness booleans alone is not integration work.

Optional browser QA uses `scripts/browser-check.mjs` with an existing Playwright installation. Set `EEBD_PLAYWRIGHT_MODULE` to its module path and `EEBD_CHROME_EXECUTABLE` to an installed Chromium-compatible browser if needed. These are QA tools, not site dependencies. Reports/screenshots remain in ignored `test-results/` and are not shipped.

## Deployment contract to complete

Choose a real hosting destination, verify its static/server capabilities, and implement a private enquiry service appropriate to that host. Preserve one verified Site ID if Sites is selected; no hosting manifest is invented now. WHC compatibility must be established before assuming Node/server support.

Production hosting must enforce HTTPS/canonical hostname, deliberate root and slash redirects, real localized 404 responses, MIME types, security headers and production indexing rules. `_headers` and `_redirects` in the generated preview are not evidence that a chosen host supports them. The development server currently enforces noindex and a restrictive CSP; the production policy must reflect the real form endpoint.

The enquiry endpoint must add server validation, bounded requests, rate and bot controls, duplicate protection, durable acceptance and truthful notification outcomes. Attachments remain absent unless private validated storage is implemented. Review actual provider/recipient/retention data flows and replace the preview privacy text. Test all three types in both languages with an authorized controlled destination; acceptance, notification acceptance and inbox receipt are separate evidence.

Before release, mark only approved complete routes as published/indexable. The generator rejects links from production pages to unpublished route destinations. Unverified products remain build-time-only and are never serialized to public assets.

## Release and rollback records

For each actual release record source remote/branch/commit, exact build, hosting project/version, deployed URL, audience, domain bindings and live checks. Preserve existing MX/TXT records during any authorized DNS change. Roll back to a verified prior deployed version or rebuild the recorded source commit; source backups do not replace private data backups.

No deployed revision or rollback target exists yet. Source synchronization evidence is recorded in PROJECT_STATUS.md rather than inferred from a local commit.
