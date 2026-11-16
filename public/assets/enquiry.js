import { submitEnquiry } from './formspree.js';
(() => {
  'use strict';
  const root=document.querySelector('[data-enquiry]');
  if (!root) return;
  const fr=document.documentElement.lang==='fr-CA';
  const t=(en,frText)=>fr?frText:en;
  const details=root.querySelector('[data-enquiry-details]'),review=root.querySelector('[data-enquiry-review]'),complete=root.querySelector('[data-enquiry-complete]');
  const errors=root.querySelector('[data-errors]'),status=root.querySelector('[data-submission-status]'),send=root.querySelector('[data-send]');
  const live=root.dataset.delivery==='enabled';
  let reviewedPayload=null, reviewedMessage='', submissionId=null, sending=false;
  const activeFields=()=>[...details.querySelectorAll('input[name],select[name],textarea[name]')].filter(el=>!el.matches(':disabled')&&!['requestType','_gotcha'].includes(el.name));
  const label=el=>(el.labels?.[0]?.textContent || el.name).replace(/\s*\*\s*$/,'').trim();
  function step(name) {
    details.hidden=name!=='details';review.hidden=name!=='review';complete.hidden=name!=='complete';
    root.querySelectorAll('[data-step]').forEach(el=>{if(el.dataset.step===name) el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
  }
  function clearErrors() {
    errors.hidden=true;errors.querySelector('ul').replaceChildren();
    root.querySelectorAll('.field-error').forEach(el=>el.remove());
    root.querySelectorAll('[aria-invalid]').forEach(el=>{el.removeAttribute('aria-invalid');el.removeAttribute('aria-describedby');});
  }
  function showErrors(items) {
    clearErrors();
    if (!items.length) return;
    for(const [el,message] of items) {
      el.setAttribute('aria-invalid','true');
      const error=document.createElement('p');error.className='field-error';error.id=el.id+'-error';error.textContent=message;
      el.setAttribute('aria-describedby',error.id);if(el.closest('.field'))el.closest('.field').append(error);else el.closest('.check-label').after(error);
      const li=document.createElement('li'),a=document.createElement('a');a.href='#'+el.id;a.textContent=label(el)+': '+message;
      a.addEventListener('click',event=>{event.preventDefault();el.focus();});li.append(a);errors.querySelector('ul').append(li);
    }
    errors.hidden=false;errors.focus();
  }
  function validate() {
    const invalid=[];
    for(const el of activeFields()) {
      if(el.type!=='checkbox') el.value=el.value.trim();
      let message='';
      if(el.validity.valueMissing) message=t('Complete this field.','Remplissez ce champ.');
      else if(el.validity.typeMismatch) message=t('Enter a valid email address.','Saisissez une adresse courriel valide.');
      else if(!el.validity.valid || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(el.value)) message=t('Check this value.','Vérifiez cette valeur.');
      if(message) invalid.push([el,message]);
    }
    showErrors(invalid);return invalid.length===0;
  }
  function payload() {
    const params=new URLSearchParams(location.search),candidate=params.get('source');
    const sourcePath=Object.hasOwn(window.eebdRoutePairs || {},candidate)?candidate:location.pathname;
    return {requestType:root.querySelector('[name="requestType"]:checked').value,locale:document.documentElement.lang,sourcePath,
      fields:Object.fromEntries(activeFields().filter(el=>el.type!=='checkbox').map(el=>[el.name,el.value.trim()])),privacyAcknowledgement:root.querySelector('[name="privacyAcknowledgement"]').checked,optionalMarketingConsent:false};
  }
  function row(title,value) {
    const div=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');
    dt.textContent=title;dd.textContent=value;div.append(dt,dd);return div;
  }
  root.querySelector('[data-review]').disabled=false;
  root.querySelector('[data-review]').addEventListener('click',()=>{
    if(!validate()) return;
    const next=payload(),serialized=JSON.stringify(next);
    if(serialized!==JSON.stringify(reviewedPayload)) submissionId=crypto.randomUUID();
    reviewedPayload=next;
    const summary=root.querySelector('[data-summary]');summary.replaceChildren();
    summary.append(row(t('Enquiry type','Type de demande'),root.querySelector('[name="requestType"]:checked').labels[0].textContent.trim()));
    for(const el of activeFields()) {
      if(el.type==='checkbox') continue;
      const value=el.tagName==='SELECT'?el.selectedOptions[0].textContent:el.value;
      if(el.value) summary.append(row(label(el),value));
    }
    summary.append(row(t('Privacy information','Renseignements sur la confidentialité'),t('Acknowledged','Lecture confirmée')));
    reviewedMessage=[...summary.children].map(el=>el.querySelector('dt').textContent+': '+el.querySelector('dd').textContent).join('\n\n');
    step('review');root.querySelector('[data-review-heading]').focus();
    if(live) {send.disabled=false;status.textContent='';}
    else status.textContent=t('Preview only. This enquiry has not been sent.','Aperçu seulement. Cette demande n’a pas été envoyée.');
  });
  root.querySelector('[data-edit]').addEventListener('click',()=>{if(sending)return;step('details');root.querySelector('#enquiry-title').focus();});
  root.querySelectorAll('[name="requestType"]').forEach(el=>el.addEventListener('change',clearErrors));
  send.addEventListener('click',async()=>{
    if(!live || sending || !reviewedPayload) return;
    sending=true;send.disabled=true;root.querySelector('[data-edit]').disabled=true;review.setAttribute('aria-busy','true');
    status.textContent=t('Sending your enquiry…','Envoi de votre demande…');
    try {
      const result=await submitEnquiry({
        ...reviewedPayload.fields,name:reviewedPayload.fields.contact,
        message:reviewedMessage,_subject:`EEBD.ca — ${reviewedPayload.requestType} — ${reviewedPayload.locale}${reviewedPayload.fields.model?' — '+reviewedPayload.fields.model.replace(/[\r\n]/g,' ').slice(0,100):''}`,
        requestType:reviewedPayload.requestType,locale:reviewedPayload.locale,sourcePath:reviewedPayload.sourcePath,
        privacyAcknowledgement:reviewedPayload.privacyAcknowledgement,optionalMarketingConsent:false,
        submissionId,_gotcha:root.querySelector('[name="_gotcha"]').value,
      },{signal:AbortSignal.timeout(15000)});
      if(result.kind==='accepted') {
        step('complete');root.querySelector('[data-complete-heading]').focus();
        // Clear contact data only after the provider confirms acceptance.
        details.querySelectorAll('input:not([type="radio"]),textarea,select').forEach(el=>{if(el.type==='checkbox')el.checked=false;else el.value='';});
        root.querySelector('[data-summary]').replaceChildren();reviewedPayload=null;reviewedMessage='';submissionId=null;return;
      }
      if(result.kind==='invalid') {
        const invalid=activeFields().filter(el=>result.fields.includes(el.name) || (el.name==='contact' && result.fields.includes('name'))).map(el=>[el,t('Check this field and try again.','Vérifiez ce champ et réessayez.')]);
        if(invalid.length) {step('details');showErrors(invalid);return;}
      }
      if(result.kind==='rate-limit') status.textContent=t('Too many attempts. Please wait a few minutes before retrying. Your details are still here.','Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer. Vos renseignements sont conservés.');
      else if(result.kind==='verification') status.textContent=t('The form service requires an additional verification that is currently unavailable. Your details are still here; please try again later.','Le service de formulaires exige une vérification supplémentaire qui est actuellement indisponible. Vos renseignements sont conservés; veuillez réessayer plus tard.');
      else throw new Error('unconfirmed');
    } catch {
      status.textContent=t('We could not confirm submission. Your details are still here. Please wait before trying again; resending may create a duplicate.','Nous ne pouvons pas confirmer l’envoi. Vos renseignements sont conservés. Veuillez patienter avant de réessayer; un nouvel envoi pourrait créer un doublon.');
    } finally {sending=false;send.disabled=false;root.querySelector('[data-edit]').disabled=false;review.removeAttribute('aria-busy');}
  });
})();
