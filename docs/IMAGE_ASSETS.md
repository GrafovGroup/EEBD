# Editorial images

Created November 15, 2026 with the built-in image-generation tool. Final site assets are in `public/assets/images/`, with 1200 px and 640 px WebP versions. The original generations remain in ignored local output and the tool's generation directory. WebP encoding/resizing changes file size and dimensions only.

Images illustrate contexts, not EEBD.ca premises, personnel, inventory, specific products or a photographed city. The owner requested removal of public AI-generation and conceptual-image wording on November 16; localized descriptions now identify visible subjects. Internal provenance remains documented here. Generated illustrations do not establish model-specific operating instructions, certification or manufacturer approval. No certification marks or manufacturer logos are fabricated. The approved Precision logo is unchanged.

## Prompts

Marine port prompt:

> Use case: photorealistic-natural. Asset type: wide editorial website image for EEBD.ca, a Canadian marine escape-equipment enquiry business. Create a high-end realistic wide photograph of a working container ship beside a Pacific coastal cargo terminal, calm dark teal water, distant forested mountains, overcast morning light, warm orange dock equipment accents. Strong clean composition, crisp industrial details, subtle natural grain, landscape 3:2 ratio. This is a conceptual setting, no identifiable real port or named vessel. No logos, no writing, no labels, no watermark, no people close to camera, no depicted breathing apparatus or rescue scenario. Keep important subject within central 75 percent for responsive cropping.

The remaining six prompts use this shared specification, inserting the subject from the table below:

> Use case: photorealistic-natural. Asset type: wide editorial photograph for EEBD.ca, Canadian escape-equipment enquiry website. Subject: [subject]. Premium natural commercial photography, realistic materials, restrained dark navy, warm off-white and burnt-orange palette, soft daylight, calm preparedness mood. Wide landscape 3:2 composition, important objects within central 75% for responsive crop. Conceptual scene, not evidence of EEBD premises, inventory or capabilities. No text, no logos, no watermarks, no recognizable brands.

| Asset base name | Subject |
| --- | --- |
| industrial-facility | a clean Canadian industrial plant exterior with pipes, structural steel, service walkways and orange safety railings, viewed from a safe pedestrian area; no workers, no smoke, no emergency |
| training-workshop | a small unoccupied maritime training classroom with neatly arranged desks, plain closed orange training-equipment carry cases, safety helmets and an out-of-focus presentation board with no visible writing; no people, no displayed respirators or technical instruction |
| service-planning | a tidy industrial equipment planning workbench with closed orange protective cases, blank inventory tags, a clipboard with non-readable lines, a caliper and neutral work gloves; no dismantled life-safety device, no exposed breathing apparatus or implied servicing technique |
| procurement-desk | an orderly marine procurement desk by a window overlooking softly blurred water, closed laptop, blank paper documents, pencil, plain orange folder and compact closed protective case; no readable text, no people, no confidential data |
| atlantic-harbour | a conceptual Atlantic Canadian working harbour with fishing and offshore support vessels, rocky headland in the distance, deep blue-grey water and muted orange dock accents; no identifiable real port or named vessels, no logos |
| river-port | a conceptual large Canadian river cargo port, freighter alongside terminal silos and gantry cranes, low shoreline and soft cloud layers, navy water and subtle orange accents; no identifiable real city or named vessel, no logos |

Route assignments and bilingual descriptions are maintained in `src/images.mjs`. Each of the 48 bilingual page purposes has its own unique image. Only English/French counterparts and the four homepage design alternatives share their page-purpose image. Homepage category and training panels use text rather than repeating another page’s photo. A city scene does not establish a local branch or document an actual incident.

## Real product reference photograph — November 16, 2026

`public/assets/images/ocenco-m202-niosh.webp` is a faithful format conversion of the 626 × 469 embedded photograph in Figure 1, PDF page 3 of CDC/NIOSH PPE CASE P2018-0105 (2018). It is a historical model-identification photograph, not EEBD.ca inventory or a new manufacturer batch image. The device depiction was not edited or generated.

- Source record explicitly labelled Public Domain: https://stacks.cdc.gov/view/cdc/137510
- Source PDF: https://stacks.cdc.gov/view/cdc/137510/cdc_137510_DS1.pdf
- Reuse terms: https://www.cdc.gov/other/agencymaterials.html
- Caption credits CDC/NIOSH, gives the year, links to the free original in a new window and states non-endorsement by CDC/HHS/the U.S. Government. No agency logo is used.
- English/French alt text identifies the opened and closed M-20.2 units. The source photograph is retained at its native resolution; no invented detail or generative upscaling.
- No manufacturer product photograph was copied for Interspiro or Dräger. Their model pages link to official photos/documentation, and use separate documentation-workspace images. The owner confirmed no existing photo permission on November 16. Commercial image permission is an outstanding supplier question.

## Generated EEBD-use homepage hero — November 16

The owner supplied EEBD-use examples and requested a realistic generated replacement for the homepage vessel image. `eebd-in-use.webp` and `eebd-in-use-small.webp` depict a generic maritime worker wearing an escape hood connected to a carried air pouch. Both homepages use the new image without a public generation caption, as subsequently requested by the owner; no supplier or model identity is asserted. The built-in tool prompt and reference roles are in `EEBD_HERO_PROMPT.md`.

## Unique page library and comparison — November 16

39 new images were selected using the built-in image-generation tool. Together with the existing hero, seven context images and the CDC/NIOSH photograph, these provide 48 distinct main images for 96 EN/FR content/form pages. Each new image has optimized 1200 × 800 and 640 × 427 WebP files. The original prompts and selected revision prompts are recorded in PAGE_IMAGE_PROMPTS.json; PAGE_IMAGE_LIBRARY.json records source generations and output paths.

The EEBD-versus-SCBA image depicts generic equipment configurations. It is paired with accessible HTML explanations; it is not a manufacturer diagram or donning instruction. The comparison distinguishes escape-only equipment from entry-and-escape SCBA, avoiding universal duration, cylinder-size, training exemption or shipboard-count claims. Sources are linked on both language pages.

Run `node scripts/image-audit.mjs` to check per-page asset ownership, unique file hashes, localized alt descriptions, no duplicated body photographs and removal of public generation wording. Review-gallery thumbnails show webpage screenshots; they are design previews, not additional editorial photo placements. The logo remains shared branding.
