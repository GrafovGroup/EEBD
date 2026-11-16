# Editorial images

Created November 15, 2026 with the built-in image-generation tool. Final site assets are in `public/assets/images/`, with 1200 px and 640 px WebP versions. The original generations remain in ignored local output and the tool's generation directory. WebP encoding/resizing changes file size and dimensions only.

Images illustrate contexts, not EEBD.ca premises, personnel, inventory, specific products or a photographed city. Every page's main image carries a conceptual-image caption and localized alt text. No operational respirator details, certification marks or manufacturer logos are fabricated. The approved Precision logo is unchanged.

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

Route assignments and bilingual descriptions are maintained in `src/images.mjs`. Reuse across related pages is intentional. A city image is a regional illustration rather than a location photograph.
