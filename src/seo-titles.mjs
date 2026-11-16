import { cities } from './cities.mjs';
import { modelFor } from './models.mjs';

// Search titles describe the page independently of its editorial headline.
const titles = {
  home: ['Emergency Escape Breathing Device', 'Appareil respiratoire d’évacuation d’urgence'],
  equipment: ['EEBD Equipment & Model Guides in Canada', 'Équipement EEBD et guides des modèles au Canada'],
  comparison: ['EEBD Model Comparison', 'Comparaison des modèles EEBD'],
  marineEquipment: ['Marine EEBDs for Vessels & Fleets', 'EEBD maritimes pour navires et flottes'],
  industrialEquipment: ['Industrial Emergency Escape Breathing Equipment', 'Appareils respiratoires d’évacuation industrielle'],
  accessories: ['EEBD Training Units & Accessories', 'Appareils de formation et accessoires EEBD'],
  training: ['EEBD Training & Device Familiarization', 'Formation et familiarisation aux EEBD'],
  service: ['EEBD Service & Replacement Enquiries', 'Demandes d’entretien et de remplacement EEBD'],
  fleet: ['Fleet EEBD Procurement & Supply Enquiries', 'Approvisionnement EEBD pour les flottes'],
  industries: ['EEBD Applications: Marine & Industrial', 'Applications EEBD : maritime et industrie'],
  marine: ['Marine & Offshore EEBD Requirements', 'Besoins EEBD maritimes et extracôtiers'],
  industrial: ['EEBD Requirements for Industrial Facilities', 'Besoins EEBD des installations industrielles'],
  coverage: ['EEBD Enquiries Across Canada', 'Demandes EEBD partout au Canada'],
  resources: ['EEBD Guides, Comparisons & Purchasing Resources', 'Guides, comparaisons et ressources d’achat EEBD'],
  quoteGuide: ['EEBD Equipment Enquiry Checklist', 'Liste de préparation d’une demande EEBD'],
  procurementDocs: ['EEBD Procurement Checklist & CSV Template', 'Liste de vérification et modèle d’achat EEBD'],
  eebdScba: ['EEBD vs SCBA: Differences & Uses', 'EEBD ou ARI / SCBA : différences et usages'],
  escapeGuide: ['What Is an EEBD? Uses, Ratings & Limitations', 'Qu’est-ce qu’un EEBD? Usages, durées et limites'],
  about: ['About EEBD.ca: Canadian Escape Equipment Enquiries', 'À propos d’EEBD.ca : demandes d’équipement au Canada'],
  contact: ['Contact EEBD.ca', 'Contacter EEBD.ca'],
  quote: ['Request an EEBD Quote', 'Demander une soumission EEBD'],
  privacy: ['Privacy & Enquiry Data', 'Confidentialité et renseignements des demandes'],
  compressedAir: ['Compressed-Air EEBDs: Models & Enquiries', 'EEBD à air comprimé : modèles et demandes'],
  oxygenEscape: ['Oxygen Escape Devices & Closed-Circuit EEBDs', 'Appareils d’évacuation à oxygène et EEBD à circuit fermé'],
  stowage: ['EEBD Storage, Brackets & Compatible Accessories', 'Rangement, supports et accessoires compatibles EEBD'],
  familiarization: ['EEBD Device Familiarization & Training Enquiries', 'Familiarisation aux EEBD et demandes de formation'],
  crewRefreshers: ['EEBD Crew Refresher Training Planning', 'Planification des mises à niveau EEBD des équipes'],
  registerReview: ['EEBD Equipment Register & Life-Date Review', 'Revue du registre et des dates des EEBD'],
  inspectionCoordination: ['EEBD Inspection & Service Coordination', 'Coordination d’inspection et d’entretien EEBD'],
  replacementPlanning: ['EEBD Replacement Planning & Equipment Lists', 'Planification du remplacement et listes EEBD'],
  fleetProcurement: ['Bulk EEBD Purchasing for Fleets & Projects', 'Achats EEBD en lot pour flottes et projets'],
};

export function pageTitle(id, locale) {
  const city = cities.find(item => item.id === id);
  if (city) return locale === 'fr' ? `EEBD à ${city.name.fr} : demandes d’équipement` : `EEBD in ${city.name.en}: Equipment Enquiries`;
  const model = modelFor(id);
  if (model) return `${model.name} — ${locale === 'fr' ? 'Caractéristiques' : 'Specifications'}`;
  if (!titles[id]) throw new Error(`Missing search title: ${id}`);
  return titles[id][locale === 'fr' ? 1 : 0];
}
