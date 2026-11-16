# EEBD brand exploration

Status: **Precision concept 01 selected by the owner**. Final instruction: EEBD with the singular English descriptor **EMERGENCY ESCAPE BREATHING DEVICE** beneath the letters, integrated into the logo artwork. No `.ca` in the logo. EEBD.ca remains the domain and project name.

## Selected identity

Precision uses custom geometric EEBD lettering with the orange upper-E detail from concept 01. The descriptor is inside the SVG, aligned immediately beneath the letters, not a separate HTML caption. The site header/footer and review header use the integrated lockup. Older comparison artwork also has the suffix removed to avoid ambiguity.

Files: `public/assets/brand/precision-primary-en.svg`, `precision-primary-fr.svg`, matching white and monochrome SVGs, and 1200-pixel transparent PNG exports. `design/precision-selected.svg`/PNG show the approved direction. Favicon SVG/PNG/ICO, Apple touch/manifest icons and EN/FR 1200×630 social images are included. Small icons intentionally use the E mark without unreadable text.

## Previous second round

| Concept | Direction | Palette |
| --- | --- | --- |
| 06 Command | Geometric stencil lettering, orange vertical accent | Ink / orange / warm white |
| 07 Openline | Open monoline lettering, forest green | Forest / pale green / mineral white |
| 08 Signal blocks | Four original letter panels | Navy / amber / warm white |
| 09 Contour | Wide rounded letterforms and separating rule | Blue / aqua / cool white |
| 10 Register | Substantial serif typography | Charcoal / terracotta / warm paper |

The brand review at `/brand-concepts/` now shows selected Precision 01. The two exploration rounds remain at `/brand-concepts/round-one/` and `/brand-concepts/round-two/`, with suffix-free integrated lockups. The raw original round is recoverable from Git history.

Sources: `src/brand.mjs`; editable SVGs: `public/assets/brand/`; overview: `design/brand-board.svg` and PNG. Run `node scripts/brand-assets.mjs` to regenerate vector artwork. The PNG board is a raster export for easy viewing, not the editable master. The English descriptor is embedded in the SVG itself. French second-round assets use the singular equivalent: APPAREIL RESPIRATOIRE POUR L’ÉVACUATION D’URGENCE.

Most letterforms are original paths. Register uses editable Georgia text. Descriptors use Arial with a sans-serif fallback. These are system-font references; no proprietary font binaries are distributed. Final font selection/licensing and path conversion for reproducible third-party printing remain part of the selected identity's refinement.

Provisional clear space: at least half the letter height around a full lockup. Retain the descriptor in header/footer versions. Compact favicon marks are the intentional tiny-size exception. Inspect at actual size before approving. Favicon assets use the selected Precision E mark. Final live-host/browser caching checks remain outstanding.

## Media provenance

`marine.svg`, `industrial.svg`, `training.svg`, and `service.svg` are original code-authored illustrations created for this project. They represent a conceptual vessel, facility, training documents and service records; no actual equipment model or customer operation is depicted. SVG source is editable. No third-party photos, supplier trademarks, stock licences or generated product images are used.

## Remaining release checks

Verify selected-logo rendering, descriptor legibility, favicon caching and social images on the actual release host. Source uses custom paths and system Arial descriptor text without distributing font binaries; convert descriptor text to outlines for a printer if deterministic print production is required. Keep comparison concepts outside production output.
