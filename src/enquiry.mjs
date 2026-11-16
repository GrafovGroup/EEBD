export const requestTypes = ['equipment', 'training', 'service'];
export const fieldDefinitions = {
  message: { en: 'Message', fr: 'Message', required: true, max: 2000, type: 'textarea' },
  contact: { en: 'Contact name', fr: 'Nom de la personne-ressource', required: true, max: 120, autocomplete: 'name' },
  organization: { en: 'Organization', fr: 'Organisation', required: true, max: 160, autocomplete: 'organization' },
  email: { en: 'Email', fr: 'Courriel', required: true, max: 254, type: 'email', autocomplete: 'email' },
  phone: { en: 'Phone (optional)', fr: 'Téléphone (facultatif)', max: 40, type: 'tel', autocomplete: 'tel' },
  location: { en: 'Province/territory and delivery or service location', fr: 'Province ou territoire et lieu de livraison ou de service', required: true, max: 240 },
  timing: { en: 'Timing or “flexible”', fr: 'Échéancier ou « Flexible »', required: true, max: 160 },
  model: { en: 'Manufacturer/model or “not sure”', fr: 'Fabricant et modèle ou « Je ne sais pas »', required: true, max: 240 },
  quantity: { en: 'Quantity or approximate requirement', fr: 'Quantité ou besoin approximatif', required: true, max: 120 },
  application: { en: 'Application', fr: 'Application', required: true, options: [['marine','Marine','Maritime'],['industrial','Industrial','Industrielle'],['other','Other / not sure','Autre / Je ne sais pas']] },
  specifications: { en: 'Other equipment specifications (optional)', fr: 'Autres spécifications de l’équipement (facultatif)', max: 1500, type: 'textarea' },
  partNumber: { en: 'Manufacturer part number (optional)', fr: 'Numéro de pièce du fabricant (facultatif)', max: 160 },
  nsn: { en: 'NATO Stock Number / NSN (optional)', fr: 'Numéro de nomenclature OTAN / NNO (facultatif)', max: 80 },
  ncage: { en: 'Manufacturer NCAGE (optional)', fr: 'NCAGE du fabricant (facultatif)', max: 80 },
  procurementReference: { en: 'Tender or purchasing reference (optional)', fr: 'Référence d’appel d’offres ou d’achat (facultatif)', max: 240 },
  purchasePlan: { en: 'Purchase schedule (optional)', fr: 'Calendrier d’achat (facultatif)', options: [['one-off','One-time purchase','Achat ponctuel'],['staged','Staged deliveries','Livraisons échelonnées'],['forecast','Annual forecast / planning estimate','Prévision annuelle / estimation'],['replacement','Replacement programme','Programme de remplacement'],['discuss','To discuss','À discuter']] },
  destinationSchedule: { en: 'Quantities, destinations and required dates (optional)', fr: 'Quantités, destinations et dates souhaitées (facultatif)', max: 2000, type: 'textarea', help: { en: 'Use one line per vessel or site. Label estimates and firm quantities separately.', fr: 'Utilisez une ligne par navire ou site. Distinguez les estimations des quantités fermes.' } },
  remainingShelfLife: { en: 'Minimum remaining shelf life (optional)', fr: 'Durée minimale de conservation restante (facultatif)', max: 240, help: { en: 'State the required period or percentage and when it must be measured, for example at delivery.', fr: 'Précisez la période ou le pourcentage exigé et le moment de mesure, par exemple à la livraison.' } },
  documentation: { en: 'Required documents and languages (optional)', fr: 'Documents et langues requis (facultatif)', max: 1500, type: 'textarea', help: { en: 'For example: exact-variant approvals, instructions, applicable SDS, traceability and release documents.', fr: 'Exemples : homologations de la variante, instructions, FDS applicables, traçabilité et documents de libération.' } },
  accessories: { en: 'Separate training units and accessories (optional)', fr: 'Appareils de formation et accessoires distincts (facultatif)', max: 1500, type: 'textarea', help: { en: 'List each trainer, bracket or storage item with its own model or part number and quantity.', fr: 'Indiquez le modèle ou numéro de pièce et la quantité de chaque appareil de formation, support ou accessoire.' } },
  deliveryTerms: { en: 'Freight, handover or receiving requirements (optional)', fr: 'Exigences de transport, de transfert ou de réception (facultatif)', max: 500 },
  participants: { en: 'Participant count or estimate', fr: 'Nombre de participants ou estimation', required: true, max: 120 },
  language: { en: 'Preferred training language', fr: 'Langue de formation souhaitée', required: true, options: [['en','English','Anglais'],['fr','French','Français'],['both','English and French','Anglais et français'],['discuss','To discuss','À discuter']] },
  objective: { en: 'Learning objective and any required credential', fr: 'Objectif d’apprentissage et qualification exigée, le cas échéant', required: true, max: 1500, type: 'textarea' },
  format: { en: 'Preferred format (subject to availability)', fr: 'Format souhaité (selon la disponibilité)', options: [['discuss','To discuss','À discuter'],['onsite','At your location','À votre emplacement'],['provider','At a provider’s location','Chez un prestataire'],['remote','Remote, if suitable','À distance, si approprié']] },
  support: { en: 'Support requested', fr: 'Soutien demandé', required: true, options: [['identify','Help identify the right route','Aide pour déterminer la démarche'],['inspection','Inspection support','Soutien pour l’inspection'],['servicing','Servicing','Entretien'],['replacement','Replacement','Remplacement'],['documents','Documentation','Documentation']] },
  issue: { en: 'Reason for the service request', fr: 'Motif de la demande de soutien', required: true, max: 1500, type: 'textarea' },
  records: { en: 'Available equipment or life-date information (optional)', fr: 'Renseignements disponibles sur l’appareil ou ses dates (facultatif)', max: 1500, type: 'textarea' },
  notes: { en: 'Additional information (optional)', fr: 'Renseignements supplémentaires (facultatif)', max: 2000, type: 'textarea' },
};
export const commonFields = ['contact','organization','email','phone','location','timing'];
export const bulkFields = ['partNumber','nsn','ncage','procurementReference','purchasePlan','destinationSchedule','remainingShelfLife','documentation','accessories','deliveryTerms'];
export const specificFields = {
  equipment: ['application','model','quantity','specifications',...bulkFields],
  training: ['model','participants','language','objective','format'],
  service: ['model','quantity','support','issue','records'],
};

// The future endpoint must call this after request-size/origin/rate/bot checks.
// Validation is not an implemented delivery service.
export function validateEnquiry(input, allowedPaths = []) {
  const errors = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, errors: { request: 'invalid' } };
  const type = input.requestType;
  if (![...requestTypes,'general'].includes(type)) errors.requestType = 'invalid';
  if (!['en-CA','fr-CA'].includes(input.locale)) errors.locale = 'invalid';
  if (!allowedPaths.includes(input.sourcePath)) errors.sourcePath = 'invalid';
  if (input.privacyAcknowledgement !== true) errors.privacyAcknowledgement = 'required';
  // Product references must be resolved against a verified catalogue before being supported.
  if (input.productId || input.variantId) errors.productId = 'unsupported';
  const fields = type==='general'?['contact','email','phone','message']:[...commonFields,...(specificFields[type] || []),'notes'];
  const clean = {};
  for (const name of fields) {
    const def=fieldDefinitions[name];
    const raw=input.fields?.[name];
    if (raw !== undefined && typeof raw !== 'string') { errors[name]='invalid'; continue; }
    const value=(raw || '').trim();
    if (def.required && !value) errors[name]='required';
    else if (value.length > (def.max || 80) || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)) errors[name]='invalid';
    else if (value && def.options && !def.options.some(([id])=>id===value)) errors[name]='invalid';
    else if (name==='email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[name]='invalid';
    clean[name]=value;
  }
  return Object.keys(errors).length ? { ok: false, errors } : {
    ok: true, value: { requestType:type, locale:input.locale, sourcePath:input.sourcePath,
      message: { en: 'Message', fr: 'Message', required: true, max: 2000, type: 'textarea' },
  contact: { name:clean.contact, email:clean.email, phone:clean.phone }, organization:clean.organization,
      location:clean.location, timing:clean.timing, requestSpecificFields:Object.fromEntries((specificFields[type]||[]).map(k=>[k,clean[k]])),
      notes:clean.notes, message:clean.message, privacyAcknowledgement:true, optionalMarketingConsent:input.optionalMarketingConsent === true },
  };
}
