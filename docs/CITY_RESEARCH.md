# Canadian city content research

Reviewed November 15, 2026 (America/Toronto) for the owner-requested coverage expansion. The 14 city guides are editorial enquiry-planning pages. Source facts establish broad local context; the checklists, procurement questions and logistics distinctions are original guidance based on that context. They do not establish EEBD.ca premises, local stock, port access, instructors, service capabilities or delivery commitments.

Suppliers, trainers and service partners remain unarranged. Technical suitability comes from the actual assessed application and applicable model evidence, not city, industry or cargo labels. The guides make no regulatory determinations, product recommendations, shipping guarantees or safety certifications.

## Content model

`src/cities.mjs` exports `cities`. Every record contains:

- `id`, `slug`, `region` (`pacific`, `atlantic`, `stlawrence`, `greatlakes` or `inland`).
- Bilingual `name` and `province` objects.
- `en` and `fr`, each with `title`, `description`, `intro`, `contextHeading`, `context`, three `focus` paragraphs, four `checklist` questions and two `faq` objects (`q`, `a`).
- `sources`, an array of primary-source `{title, url}` references.

The renderer should link the primary sources near the local-context text. Source references identify contextual evidence and do not imply partnership, endorsement or permission to reuse the source's images. No third-party photographs were downloaded or licensed as part of this task.

## Evidence by location

### Vancouver — British Columbia

Port geography and named container terminals only. The main port homepage denied crawling; the official terminal map and terminal dashboard supplied the evidence. No current waiting times, terminal admission rules or delivery capacity are asserted.

- [Port of Vancouver — terminal map](https://www.portvancouver.com/wp-content/uploads/2018/06/5335_VFPA_Map_Source-Files.pdf)
- [Port of Vancouver — terminal dashboard](https://ehub.portvancouver.com/GPSDashboard/)

### Victoria — British Columbia

Ogden Point deep-water/cruise facilities and controlled berth access. No cruise itinerary, harbour fee, seasonal schedule or ship-repair capability is attributed to EEBD.ca.

- [Greater Victoria Harbour Authority — Ogden Point terminal information](https://gvha.ca/deep-water-terminal/terminal-information/)

### Prince Rupert — British Columbia

Mix of container, grain, pellet, bulk and liquid-export terminals. No terminal capacity, projected development completion or vessel ETA is reproduced.

- [Prince Rupert Port Authority — terminals](https://www.rupertport.com/terminals/)

### Halifax — Nova Scotia

Separate named terminal facilities and distinction between receiving/truck operations and vessel/yard activity. No operating hours are copied into customer guidance; the receiver must confirm the actual window.

- [Port of Halifax — marine operations and terminal hours](https://www.porthalifax.ca/port-operations-centre/marine-operations-and-terminal-hours/)

### Saint John — New Brunswick

Container, bulk and breakbulk operations and road/rail links. The New Brunswick location is explicitly distinguished from St. John’s, Newfoundland and Labrador. No transit time or port ranking is repeated.

- [Port Saint John — cargo overview](https://www.sjport.com/cargo-home)

### St. John’s — Newfoundland and Labrador

Port role in container traffic, offshore energy support, fishing, marine maintenance and cruise activity. No offshore transfer, vessel access or local provider relationship is claimed.

- [St. John’s Port Authority — about the port](https://sjpa-apsj.com/about-the-port/)

### Sydney — Nova Scotia

Official Port of Sydney location on Cape Breton and published cruise-call/berth references. The linked schedule is used only for berth-context evidence; no future call date is represented as confirmed. Sydney is explicitly identified as Nova Scotia.

- [Port of Sydney — official port information](https://www.sydneyport.ca/)
- [Port of Sydney — 2026 cruise schedule](https://www.sydneyport.ca/_files/ugd/941752_423286a968924c6e84d7f2f4d030ef63.pdf)

### Montreal — Quebec

Diversity of container, grain, dry/liquid bulk and non-containerized cargo activity. Language questions are original procurement guidance, not claims about a port policy or confirmed French-language providers.

- [Port of Montreal — cargo types](https://www.port-montreal.com/en/goods/business/all-types-of-cargo)

### Quebec City — Quebec

Named port sectors and general bulk, grain and maritime-service activities. No speculative container-terminal development or asserted field coverage is included.

- [Port of Québec — port overview](https://business.portquebec.ca/en/port-overview/)
- [Port de Québec — carte du territoire](https://www.portquebec.ca/affaires-et-operations/carte-du-territoire/)

### Toronto — Ontario

Marine terminal, storage/distribution facilities and road/rail connections. The official PortsToronto address redirects to Toronto Port Authority; the current canonical source is used.

- [Toronto Port Authority — facilities](https://www.torontoportauthority.com/port-of-toronto/working-with-the-port/facilities/)

### Hamilton — Ontario

Agricultural, steel/breakbulk, project-cargo, bulk and rail-transload contexts listed by HOPA. No tonnage, local stock, service authorization or commercial affiliation is inferred.

- [HOPA Ports — Port of Hamilton](https://www.hopaports.ca/port-of-hamilton/)

### Calgary — Alberta

Broad transportation/logistics, warehousing and distribution context only. Specific railroad headquarters claims and promotional metrics from the source are not adopted.

- [Calgary Economic Development — transportation and logistics](https://calgaryeconomicdevelopment.com/key-industries/transportation-and-logistics/)

### Edmonton — Alberta

Regional manufacturing across energy, chemicals and other sectors, plus logistics context. No individual company partnership, technical capability or regional service base is implied.

- [Edmonton Global — advanced manufacturing](https://edmontonglobal.ca/sectors/ai-tech/advanced-manufacturing)

### Winnipeg — Manitoba

Road/rail/air distribution and CentrePort context. No transit-time promise, carrier arrangement or air-transport suitability of a particular device is implied.

- [Winnipeg Economic Development & Tourism — transportation and distribution](https://www.winnipegedt.com/key-industries/transportation-distribution)

## Scope limits

No keyword-volume estimates or ranking forecasts were obtained. The geographic pages offer differentiated planning help and must remain accessible through the coverage navigation, with clear language equivalents and relevant enquiry links. They should not be marked as local offices or `LocalBusiness` locations. The coverage text should not claim that publishing these pages guarantees Google indexing or rankings.

French text is editorial Canadian French. No independent professional terminology or technical sign-off is asserted. Source facts intentionally avoid volatile schedules, commercial metrics and port operational rules that would require continuous maintenance.
