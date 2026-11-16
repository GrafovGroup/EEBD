import { FORMSPREE_ENDPOINT } from '../public/assets/formspree.js';
export const site = Object.freeze({
  name: 'EEBD.ca',
  origin: 'https://eebd.ca',
  // Bump when shared CSS/JS changes so WHC's cached assets are refreshed.
  assetVersion: '20261116-procurement',
  bingVerification: '8540AF3FE8C8197267E84BBE602115F7',
  phone: '(833) 696-9996',
  phoneTel: '+18336969996',
  phoneVerified: false,
  email: 'info@eebd.ca',
  emailVerified: true,
  contractingEntity: 'Superclean Canada Inc.',
  hostingProvider: 'WHC',
  approvedConcept: 1,
  previewConcept: 1,
  formEnabled: true,
  formProvider: Object.freeze({name:'Formspree',endpoint:FORMSPREE_ENDPOINT}),
  launchMode: 'enquiries',
  supplierArrangements: false,
  readiness: {
    identity: true,
    businessIdentity: true,
    offerBoundariesReviewed: true,
    contactRouting: true,
    enquiryDelivery: true,
    privacyNoticeImplemented: true,
    technicalCopyReviewed: true,
    hosting: true,
  },
});

export function assertProductionReady(config = site) {
  const missing = Object.entries(config.readiness).filter(([, value]) => value !== true).map(([key]) => key);
  if (missing.length) throw new Error(`Production release blocked: ${missing.join(', ')}`);
  if (!config.approvedConcept || !config.contractingEntity || !config.formEnabled || !config.emailVerified) {
    throw new Error('Production release blocked: approved identity, entity, enquiry integration and a verified email route are required.');
  }
}
