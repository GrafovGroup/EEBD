(() => {
  'use strict';
  const root=document.querySelector('[data-enquiry]');
  if (!root) return;
  const fr=document.documentElement.lang==='fr-CA';
  const t=(en,frText)=>fr?frText:en;
  const details=root.querySelector('[data-enquiry-details]'),review=root.querySelector('[data-enquiry-review]'),complete=root.querySelector('[data-enquiry-complete]');
  const errors=root.querySelector('[data-errors]'),status=root.querySelector('[data-submission-status]'),send=root.querySelector('[data-send]');
  const live=root.dataset.delivery==='enabled';
  const endpoint='/api/enquiries.php';
  let token=null, tokenTime=0, idempotencyKey=null, reviewedPayload=null, sending=false;
  const activeFields=()=>[...details.querySelectorAll('input[name],select[name],textarea[name]')].filter(el=>!el.matches(':disabled')&&!['requestType','website'].includes(el.name));
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
  async function getToken() {
    send.disabled=true;
    status.textContent=t('Preparing secure submission…','Préparation de l’envoi sécurisé…');
    try {
      const response=await fetch(endpoint,{headers:{Accept:'application/json'},credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(12000)});
      const result=await response.json();
      if(!response.ok || typeof result.token!=='string') throw new Error('unavailable');
      token=result.token;tokenTime=Date.now();
      // The server also enforces this interval; the UI never substitutes for server checks.
      await new Promise(resolve=>setTimeout(resolve,2100));
      if(review.hidden) return;
      status.textContent='';send.disabled=false;
    } catch {
      token=null;status.textContent=t('Sending is unavailable. Your details are still here. Use “Send enquiry” to try again.','L’envoi est indisponible. Vos renseignements sont conservés dans cette page. Utilisez « Envoyer la demande » pour réessayer.');send.disabled=false;
    }
  }
  root.querySelector('[data-review]').disabled=false;
  root.querySelector('[data-review]').addEventListener('click',()=>{
    if(!validate()) return;
    const next=payload(),serialized=JSON.stringify(next);
    if(serialized!==JSON.stringify(reviewedPayload)) idempotencyKey=crypto.randomUUID();
    reviewedPayload=next;
    const summary=root.querySelector('[data-summary]');summary.replaceChildren();
    summary.append(row(t('Enquiry type','Type de demande'),root.querySelector('[name="requestType"]:checked').labels[0].textContent.trim()));
    for(const el of activeFields()) {
      if(el.type==='checkbox') continue;
      const value=el.tagName==='SELECT'?el.selectedOptions[0].textContent:el.value;
      if(el.value) summary.append(row(label(el),value));
    }
    summary.append(row(t('Privacy information','Renseignements sur la confidentialité'),t('Acknowledged','Lecture confirmée')));
    step('review');root.querySelector('[data-review-heading]').focus();
    if(live) {if(!token || Date.now()-tokenTime>3300000) void getToken();else {send.disabled=false;status.textContent='';}}
    else status.textContent=t('Preview only. This enquiry has not been sent.','Aperçu seulement. Cette demande n’a pas été envoyée.');
  });
  root.querySelector('[data-edit]').addEventListener('click',()=>{if(sending)return;step('details');root.querySelector('#enquiry-title').focus();});
  root.querySelectorAll('[name="requestType"]').forEach(el=>el.addEventListener('change',clearErrors));
  send.addEventListener('click',async()=>{
    if(!live || sending || !reviewedPayload) return;
    if(!token || Date.now()-tokenTime>3300000) {await getToken();return;}
    sending=true;send.disabled=true;root.querySelector('[data-edit]').disabled=true;review.setAttribute('aria-busy','true');
    status.textContent=t('Saving your enquiry…','Enregistrement de votre demande…');
    try {
      const response=await fetch(endpoint,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({...reviewedPayload,token,idempotencyKey,website:root.querySelector('[name="website"]').value}),signal:AbortSignal.timeout(15000)});
      const result=await response.json();
      if(response.status===202 && result.accepted===true && /^EEBD-[A-F0-9]{16}$/.test(result.reference)) {
        root.querySelector('[data-reference]').textContent=result.reference;step('complete');root.querySelector('[data-complete-heading]').focus();
        // Remove contact data after durable acceptance; keep only the reference on screen.
        details.querySelectorAll('input:not([type="radio"]),textarea,select').forEach(el=>{if(el.type==='checkbox')el.checked=false;else el.value='';});
        root.querySelector('[data-summary]').replaceChildren();reviewedPayload=null;return;
      }
      if(response.status===422 && result.errors) {
        step('details');
        const invalid=activeFields().filter(el=>Object.hasOwn(result.errors,el.name)).map(el=>[el,t('Check this field and try again.','Vérifiez ce champ et réessayez.')]);
        showErrors(invalid);if(!invalid.length)root.querySelector('#enquiry-title').focus();return;
      }
      if(result.error==='TOKEN_EXPIRED') {token=null;status.textContent=t('The review session expired. Select “Send enquiry” to prepare it again; your details are still here.','La session a expiré. Sélectionnez « Envoyer la demande » pour la renouveler; vos renseignements sont conservés.');}
      else if(response.status===429) status.textContent=t('Too many attempts. Please wait a few minutes before retrying. Your details are still here.','Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer. Vos renseignements sont conservés.');
      else throw new Error('unconfirmed');
    } catch {
      status.textContent=t('We could not confirm that your enquiry was saved. Your details are still here. Retry to check the same request without creating a duplicate.','Nous ne pouvons pas confirmer l’enregistrement de votre demande. Vos renseignements sont conservés. Réessayez pour vérifier la même demande sans créer de doublon.');
    } finally {sending=false;send.disabled=false;root.querySelector('[data-edit]').disabled=false;review.removeAttribute('aria-busy');}
  });
})();
