(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const params = new URLSearchParams(location.search);
  const preview = document.documentElement.dataset.mode === 'preview';
  const concept = params.get('concept');
  if (preview && /^(?:[1-9]|10)$/.test(concept || '')) {
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
  // This is an in-flow disclosure, not a modal. It does not lock page scrolling or trap focus.
  const enquiry=document.querySelector('[data-enquiry]');
  if (enquiry) {
    const types=['equipment','training','service'];
    const selected=types.includes(params.get('type'))?params.get('type'):'equipment';
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
