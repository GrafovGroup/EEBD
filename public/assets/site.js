(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const params = new URLSearchParams(location.search);
  const preview = document.documentElement.dataset.mode === 'preview';
  const concept = params.get('concept');
  const exploring=!document.documentElement.dataset.approvedConcept || params.get('application')==='1';
  if (preview && exploring && /^(?:[1-9]|10)$/.test(concept || '')) {
    document.documentElement.dataset.concept = concept;
    for (const [selector,mode] of [['.brand-logo','light'],['.footer-logo','dark']]) {
      document.querySelectorAll(selector).forEach(img=>{ img.src=`/assets/brand/concept-${concept}-${mode}${document.documentElement.lang==='fr-CA'?'-fr':''}.svg`; });
    }
    document.querySelectorAll('a[href^="/en/"],a[href^="/fr/"]').forEach(a=>{
      const url=new URL(a.href);
      url.searchParams.set('concept',concept);
      a.href=url.pathname+url.search;
    });
  }
  if (preview && params.get('application') === '1') document.documentElement.dataset.application='1';
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#main-navigation');
  const media=matchMedia('(max-width: 1000px)');
  function closeMenu(restore=false) {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.textContent=toggle.dataset.openLabel;
    if (restore) toggle.focus();
  }
  toggle?.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));
    toggle.textContent=open?toggle.dataset.closeLabel:toggle.dataset.openLabel;
    nav.classList.toggle('is-open',open);
  });
  document.addEventListener('keydown',event=>{
    if (event.key==='Escape' && toggle?.getAttribute('aria-expanded')==='true') closeMenu(true);
  });
  document.addEventListener('click',event=>{
    if (toggle?.getAttribute('aria-expanded')==='true' && !event.target.closest('.site-header')) closeMenu();
  });
  nav?.addEventListener('click',event=>{if(event.target.closest('a')) closeMenu();});
  nav?.addEventListener('focusout',event=>{
    if (event.relatedTarget && !nav.contains(event.relatedTarget) && event.relatedTarget!==toggle) closeMenu();
  });
  media.addEventListener('change',()=>closeMenu());
  const mobileEnquiry=document.querySelector('[data-mobile-enquiry]');
  if(mobileEnquiry) {
    const hero=document.querySelector('main .page-hero'),footer=document.querySelector('.site-footer');
    let scheduled=false;
    function updateMobileEnquiry() {
      scheduled=false;
      const consentOpen=document.querySelector('[data-analytics-consent]:not([hidden])');
      const editing=document.activeElement?.matches('input,textarea,select,[contenteditable="true"]');
      const show=innerWidth<=700 && hero?.getBoundingClientRect().bottom<0 && footer?.getBoundingClientRect().top>innerHeight && toggle?.getAttribute('aria-expanded')!=='true' && !consentOpen && !editing;
      mobileEnquiry.hidden=!show;
    }
    function scheduleMobileEnquiry(){if(!scheduled){scheduled=true;requestAnimationFrame(updateMobileEnquiry);}}
    for(const name of ['scroll','resize','analytics-consent-change'])window.addEventListener(name,scheduleMobileEnquiry,{passive:true});
    for(const name of ['focusin','focusout','click'])document.addEventListener(name,scheduleMobileEnquiry);
    updateMobileEnquiry();
  }
  // This is an in-flow disclosure, not a modal. It does not lock page scrolling or trap focus.
  const enquiry=document.querySelector('[data-enquiry]');
  if (enquiry) {
    const modelContext=window.eebdModelContext || {};
    const source=params.get('source');
    if((window.eebdBulkContext || []).includes(source)) {
      const bulk=enquiry.querySelector('[data-bulk-fields]');
      if(bulk)bulk.open=true;
    }
    if(source && Object.hasOwn(modelContext,source)) {
      enquiry.querySelectorAll('input[name="model"]').forEach(input=>{input.value=modelContext[source];});
    }
    const types=[...enquiry.querySelectorAll('[name="requestType"]')].map(input=>input.value);
    const selected=types.includes(params.get('type'))?params.get('type'):types[0];
    enquiry.querySelector(`input[name="requestType"][value="${selected}"]`).checked=true;
    function updateFields() {
      const current=enquiry.querySelector('input[name="requestType"]:checked').value;
      enquiry.querySelectorAll('[data-request-type]').forEach(group=>{
        const active=group.dataset.requestType===current;
        group.hidden=!active;
        group.disabled=!active;
      });
      document.querySelectorAll('.language-switch a').forEach(a=>{
        const url=new URL(a.href);
        url.searchParams.set('type',current);
        // Translate only an observed local route, never copy arbitrary query data or entries.
        const source=params.get('source');
        const mapping=window.eebdRoutePairs || {};
        if (source && mapping[source]) url.searchParams.set('source',a.lang==='fr-CA'?mapping[source].fr:mapping[source].en);
        a.href=url.pathname+url.search;
      });
    }
    enquiry.querySelectorAll('input[name="requestType"]').forEach(radio=>radio.addEventListener('change',updateFields));
    updateFields();
  }
})();
