# EEBD.ca

Canadian emergency escape breathing equipment: **equipment sales, product-specific training, and service coordination**.

## Project status

The owner has authorized implementation. A local bilingual development preview, editable brand concepts and the static site foundation now exist on `codex/initial-build`. The website has not been deployed. Read [PROJECT_STATUS.md](PROJECT_STATUS.md) and [DECISIONS.md](DECISIONS.md) before resuming.

- **Repository:** https://github.com/GrafovGroup/EEBD.git
- **Domain:** EEBD.ca — owned
- **Owner:** Dmitry Grafov / Grafov Group
- **Master prompt:** v1.1, November 15, 2026
- **Baseline:** Grafov Group Universal Codex Website Launch Master Prompt v2.0
- **Languages:** Canadian English and Québec-appropriate French
- **Primary audience:** commercial marine buyers, with selected industrial applications and fleet procurement
- **Branding:** Precision concept 01 selected; full descriptor immediately beneath EEBD inside the logo, with no .ca; two exploration rounds retained

## Run the local review

Use Node **24.22.1** (see `.nvmrc`). The site has no third-party build/runtime dependencies.

```sh
node scripts/build.mjs
node scripts/dev.mjs
```

Open [the brand review](http://127.0.0.1:4173/brand-concepts/), [English draft](http://127.0.0.1:4173/en/) or [French draft](http://127.0.0.1:4173/fr/). The preview server must be running. Current artwork is in `public/assets/brand/`; the summary board is in `design/`. Regenerate editable SVGs with `node scripts/brand-assets.mjs`.

```sh
node scripts/check.mjs
node --test tests/*.test.mjs
```

Production output is intentionally blocked until the selected identity, real offer arrangements, contracting identity, contact routing, enquiry service and hosting have been verified. Inputs in the enquiry preview do not submit or persist. See [DEPLOYMENT.md](DEPLOYMENT.md) and [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) for the exact limits.

## Start here

Read [MASTER_PROMPT.md](MASTER_PROMPT.md) in full before implementation. It is the authoritative project-specific build brief and contains the confirmed inputs, offer boundaries, bilingual sitemap, enquiry workflows, design phase, source references, and release requirements.

The website will support three customer journeys:

| Offer | Customer action |
| --- | --- |
| Equipment sales | Request equipment pricing |
| Product-specific training | Discuss training |
| Service and replacement coordination | Request service support |

The launch is quote-based, with no public pricing or checkout. Equipment availability, training credentials, provider qualifications, and service capabilities must be grounded in actual arrangements and appropriate product documentation.

## Codex starting instruction

Use this instruction when authorizing the build:

```text
Read MASTER_PROMPT.md and the repository's existing instructions and project records.
Inspect and preserve existing work. Build EEBD.ca for equipment sales, product-specific
training, and service coordination in Canadian English and French.

If no identity has been approved, begin with Phase 0 and create five actual Phase 1A
logo concepts with desktop and mobile applications. Continue independent preparation
while the owner selects a concept. After selection, continue the authorized build
according to the prompt's content, enquiry, verification, and release requirements.

Keep PROJECT_STATUS.md and DECISIONS.md current. Report what was implemented, tested,
and deployed, with exact remaining dependencies and no unsupported completion claims.
```

## Key build requirements

- Direct customer relationships, with qualified delivery partners where appropriate.
- Complete English/French pages and enquiry journeys from launch.
- National enquiry coverage with accurate delivery, training, and service availability.
- Separate equipment, training, and service enquiry paths.
- Model-specific product evidence and clear distinction between operational and training equipment.
- Five distinct logo concepts, wide layouts, uppercase navigation/buttons, rounded buttons, and no decorative arrows.
- Visible language switching, clean footer branding, and favicons on every template/language.
- Technical SEO, useful content, mobile/accessibility checks, private enquiry handling, and verified form delivery.
- Recoverable source, approved assets, build instructions, and evidence-backed release records.

## Configuration to establish during implementation

- Contracting entity and any public business address.
- Hosting/Site project and deployment configuration.
- Exact supported products, supply routes, training providers, and service coverage.
- Form endpoint and delivery destination.
- Mailbox activation and end-to-end delivery for the proposed info@eebd.ca address.
- Applicable analytics and search-console access.

The established new-brand phone is **(833) 696-9996**. Contact routing must be tested before the website is reported operational.

## Scope and recovery

This repository is the source destination for EEBD.ca. Preserve its history and existing work. The initial documentation setup has been followed by the owner’s build instruction. Preserve the latest decisions in DECISIONS.md, especially the integrated singular descriptor and no-.ca logo requirement. Production release remains subject to the masterplan’s actual readiness requirements.

During the build, create or maintain the project records named in MASTER_PROMPT.md. Keep secrets, customer submissions, attachments, private supplier terms, and live production data out of Git. Record any separate hosting-source remote and the exact deployed revision.
