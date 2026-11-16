import { FORMSPREE_ENDPOINT } from '../public/assets/formspree.js';
export const site = Object.freeze({
  name: 'EEBD.ca',
  origin: 'https://eebd.ca',
  phone: '(833) 696-9996',
  phoneTel: '+18336969996',
  phoneVerified: false,
  email: 'info@eebd.ca',
  emailVerified: false,
  contractingEntity: 'Superclean Canada Inc.',
  hostingProvider: 'WHC',
  approvedConcept: 1,
  previewConcept: 1,
  formEnabled: true,
  formProvider: Object.freeze({name:'Formspree',endpoint:FORMSPREE_ENDPOINT}),
  readiness: {
    identity: true,
    businessIdentity: true,
    offerArrangements: false,
    contactRouting: false,
    enquiryDelivery: false,
    privacyReview: false,
    technicalReview: false,
    hosting: false,
  },
});

export function assertProductionReady(config = site) {
  const missing = Object.entries(config.readiness).filter(([, value]) => value !== true).map(([key]) => key);
  if (missing.length) throw new Error(`Production release blocked: ${missing.join(', ')}`);
  if (!config.approvedConcept || !config.contractingEntity || !config.formEnabled || !config.phoneVerified || !config.emailVerified) {
    throw new Error('Production release blocked: approved identity, entity, enquiry integration and verified contact are required.');
  }
}
