// Public submission URL, not an API key. No account credentials belong in this file.
export const FORMSPREE_ENDPOINT='https://formspree.io/f/xrpqpylv';

export async function submitEnquiry(payload,{fetchImpl=fetch,signal}={}) {
  try {
    const response=await fetchImpl(FORMSPREE_ENDPOINT,{
      method:'POST',mode:'cors',credentials:'omit',redirect:'error',
      headers:{Accept:'application/json','Content-Type':'application/json'},
      body:JSON.stringify(payload),signal,
    });
    if(response.status===429) return {kind:'rate-limit'};
    const result=await response.json();
    // Formspree's documented client recognizes a string `next` as success.
    // Keep our bilingual confirmation on-page; never follow a returned URL.
    if(response.ok && result && result.ok!==false && !result.error && !result.errors && typeof result.next==='string') return {kind:'accepted'};
    const errors=Array.isArray(result?.errors)?result.errors:[];
    if(errors.some(error=>/captcha/i.test(error.code || '') || /captcha/i.test(error.field || ''))) return {kind:'verification'};
    if(response.status===400 || response.status===422) return {kind:'invalid',fields:errors.map(error=>error.field).filter(field=>typeof field==='string')};
    return {kind:'unconfirmed'};
  } catch {
    // A timeout may happen after acceptance. Retrying is always a user action;
    // this provider has no verified idempotency guarantee for this integration.
    return {kind:'unconfirmed'};
  }
}
