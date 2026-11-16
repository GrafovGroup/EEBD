// Private build-time records. Never copy this module into public assets.
export const equipmentClasses = ['escape-supplied-air', 'escape-oxygen', 'training-only', 'accessory'];
export const products = [];
export function saleableProducts(records = products) {
  return records.filter(p => p.publicationStatus === 'published' && p.supplyStatus === 'verified'
    && p.identityVerified === true && p.publicCopyReviewed === true && p.mediaRightsVerified === true
    && p.approvalEvidenceVerified === true && p.limitationsReviewed === true
    && p.safetyNoticeStatus === 'cleared' && /^\d{4}-\d{2}-\d{2}$/.test(p.safetyNoticeReviewedAt || '')
    && equipmentClasses.includes(p.equipmentClass));
}
