const definitions = [
  ['home', '', '', 'Home', 'Accueil'],
  ['equipment', 'equipment', 'equipement', 'Equipment', 'Équipement'],
  ['marineEquipment', 'equipment/marine-eebds', 'equipement/appareils-evacuation-maritime', 'Marine EEBDs', 'Évacuation maritime'],
  ['industrialEquipment', 'equipment/industrial-escape', 'equipement/evacuation-industrielle', 'Industrial escape equipment', 'Évacuation industrielle'],
  ['accessories', 'equipment/training-accessories', 'equipement/formation-accessoires', 'Training units & accessories', 'Appareils de formation et accessoires'],
  ['training', 'training', 'formation', 'Training', 'Formation'],
  ['service', 'service-support', 'soutien-technique', 'Service support', 'Soutien technique'],
  ['fleet', 'fleet-supply', 'approvisionnement-flottes', 'Fleet supply', 'Approvisionnement des flottes'],
  ['industries', 'industries', 'secteurs', 'Industries', 'Secteurs'],
  ['marine', 'industries/marine-offshore', 'secteurs/maritime-extracotier', 'Marine & offshore', 'Maritime et extracôtier'],
  ['industrial', 'industries/industrial-facilities', 'secteurs/installations-industrielles', 'Industrial facilities', 'Installations industrielles'],
  ['coverage', 'coverage', 'couverture', 'Coverage', 'Couverture'],
  ['resources', 'resources', 'ressources', 'Resources', 'Ressources'],
  ['quoteGuide', 'resources/equipment-quote-checklist', 'ressources/preparer-une-demande', 'Prepare an equipment enquiry', 'Préparer une demande d’équipement'],
  ['escapeGuide', 'resources/understanding-eebds', 'ressources/comprendre-les-eebd', 'Understanding escape equipment', 'Comprendre l’équipement d’évacuation'],
  ['about', 'about', 'a-propos', 'About', 'À propos'],
  ['contact', 'contact', 'contact', 'Contact', 'Contact'],
  ['quote', 'request-a-quote', 'demander-une-soumission', 'Request a quote', 'Demander une soumission'],
  ['privacy', 'privacy', 'confidentialite', 'Privacy', 'Confidentialité'],
];
export const routes = definitions.map(([id, en, fr, enLabel, frLabel]) => ({
  id, paths: { en: `/en/${en ? `${en}/` : ''}`, fr: `/fr/${fr ? `${fr}/` : ''}` },
  labels: { en: enLabel, fr: frLabel }, status: 'draft', indexable: false,
}));
export const locales = ['en', 'fr'];
export const localeTags = { en: 'en-CA', fr: 'fr-CA' };
export function route(id) {
  const record = routes.find(item => item.id === id);
  if (!record) throw new Error(`Unknown route: ${id}`);
  return record;
}
export function pathFor(id, locale) {
  if (!locales.includes(locale)) throw new Error(`Unsupported locale: ${locale}`);
  return route(id).paths[locale];
}
export function includedRoutes(mode = 'preview', records = routes) {
  return records.filter(r => r.status === 'published' || (mode === 'preview' && r.status === 'draft'));
}
export function sitemapRoutes(records = routes) {
  return records.filter(r => r.status === 'published' && r.indexable === true);
}
