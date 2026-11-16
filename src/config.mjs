export const site = Object.freeze({
  name: 'EEBD.ca',
  origin: 'https://eebd.ca',
  phone: '(833) 696-9996',
  phoneTel: '+18336969996',
  phoneVerified: false,
  email: null,
  contractingEntity: null,
  approvedConcept: 1,
  previewConcept: 1,
  formEnabled: false,
  readiness: {
    identity: true,
    businessIdentity: false,
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
  if (!config.approvedConcept || !config.contractingEntity || !config.formEnabled || !config.phoneVerified) {
    throw new Error('Production release blocked: approved identity, entity, enquiry integration and verified contact are required.');
  }
}
