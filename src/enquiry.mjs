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
  specifications: { en: 'Part number, required documents or procurement reference (optional)', fr: 'Numéro de pièce, documents ou référence d’achat (facultatif)', max: 1500, type: 'textarea' },
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
export const specificFields = {
  equipment: ['application','model','quantity','specifications'],
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
