(() => {
  'use strict';
  const html=document.documentElement;
  const routes=window.eebdRoutePairs || {};
  if(html.dataset.mode!=='production' || !Object.hasOwn(routes,location.pathname))return;
  const id=html.dataset.analyticsId;
  if(!/^G-[A-Z0-9]+$/.test(id || ''))return;
  const pendingKey='eebd.pending-quote.v1';
  const placements=new Set(['mobile_bar','header','footer','hero','content']);
  const key='eebd.analytics-consent.v1', lifetime=180*24*60*60*1000;
  const panel=document.querySelector('[data-analytics-consent]');
  const preferences=document.querySelector('[data-analytics-preferences]');
  const types=new Set(['equipment','training','service','general']);
  let allowed=false,loaded=false,started=false,pageSent=false,returnFocus=null;
  const accepted=new Set();
  const cleanPath=value=>Object.hasOwn(routes,value)?value:location.pathname;
  const source=cleanPath(new URLSearchParams(location.search).get('source'));
  const type=value=>types.has(value)?value:'equipment';
  let referrer='';
  try{const ref=new URL(document.referrer);if(['www.google.com','www.google.ca','www.bing.com','bing.com','duckduckgo.com'].includes(ref.hostname))referrer=ref.origin+'/';else if(ref.origin===location.origin && Object.hasOwn(routes,ref.pathname))referrer='https://eebd.ca'+ref.pathname;}catch{}
  const page={page_location:'https://eebd.ca'+location.pathname,page_referrer:referrer,page_title:document.title};
  window.dataLayer=window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function clearCookies() {
    for(const cookie of document.cookie.split(';')) {
      const name=cookie.split('=')[0].trim();
      if(!/^_ga(?:_|$)/.test(name))continue;
      for(const domain of ['', '; domain='+location.hostname, '; domain=.eebd.ca'])document.cookie=name+'=; Max-Age=0; path=/; SameSite=Lax'+domain;
    }
  }
  function consent(value,persist=false) {
    allowed=value==='granted';
    window['ga-disable-'+id]=!allowed;
    if(persist)try{localStorage.setItem(key,JSON.stringify({value,at:Date.now()}));}catch{}
    if(panel)panel.hidden=true;
    if(allowed) {
      gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      if(!loaded) {
        loaded=true;
        gtag('set',{...page,send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false});
        gtag('js',new Date());
        gtag('config',id,{...page,send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:15552000,cookie_update:false});
        const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;
        document.head.append(script);
      }
      if(!pageSent){pageSent=true;gtag('event','page_view',{...page,send_to:id});}
    } else {
      gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      clearCookies();try{sessionStorage.removeItem(pendingKey);}catch{}
    }
    window.dispatchEvent(new Event('analytics-consent-change'));
  }
  function event(name,enquiryType,extra={}) {
    if(!allowed)return;
    // Only fixed enums and registered paths are emitted; no form contents or query strings.
    gtag('event',name,{...page,send_to:id,enquiry_type:type(enquiryType),source_page:source,site_language:html.lang==='fr-CA'?'fr':'en',...extra});
  }
  const safe=fn=>(...args)=>{try{fn(...args);}catch{/* Analytics must never interrupt an enquiry. */}};
  window.eebdAnalytics={
    start:safe(enquiryType=>{if(!allowed || started)return;started=true;event('form_start',enquiryType);}),
    accepted:safe((enquiryType,submissionId)=>{if(!allowed || !submissionId || accepted.has(submissionId))return;accepted.add(submissionId);event('generate_lead',enquiryType);})
  };
  document.addEventListener('click',safe(e=>{
    const a=e.target.closest('a[href]');if(!a)return;
    const url=new URL(a.href,location.href);
    if(url.origin!==location.origin || !['/en/request-a-quote/','/fr/demander-une-soumission/'].includes(url.pathname))return;
    const placement=a.closest('[data-mobile-enquiry]')?'mobile_bar':a.closest('.site-header')?'header':a.closest('.site-footer')?'footer':a.closest('.page-hero,.immersive-hero')?'hero':'content';
    const extra={cta_location:placement,source_page:location.pathname};
    // Carry same-tab CTA events to the destination, where the tag can finish its
    // normal batch while the visitor completes the form. Never delay navigation.
    if(allowed && !e.defaultPrevented && e.button===0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && (!a.target || a.target==='_self')) {
      try{sessionStorage.setItem(pendingKey,JSON.stringify({at:Date.now(),source:location.pathname,type:type(url.searchParams.get('type')),placement}));return;}catch{}
    }
    event('quote_click',url.searchParams.get('type'),extra);
  }));
  preferences?.addEventListener('click',()=>{
    returnFocus=preferences;panel.hidden=false;
    panel.querySelector('button')?.focus();window.dispatchEvent(new Event('analytics-consent-change'));
  });
  panel?.querySelectorAll('[data-consent-choice]').forEach(button=>button.addEventListener('click',()=>{
    consent(button.dataset.consentChoice,true);returnFocus?.focus();returnFocus=null;
  }));
  if(preferences)preferences.hidden=false;
  window.addEventListener('storage',event=>{if(event.key!==key && event.key!==null)return;let choice;try{choice=JSON.parse(event.newValue);}catch{}consent(choice?.value==='granted'?'granted':'denied');});
  let saved;
  try{saved=JSON.parse(localStorage.getItem(key));}catch{}
  if(saved && ['granted','denied'].includes(saved.value) && Number.isFinite(saved.at) && Date.now()-saved.at>=0 && Date.now()-saved.at<lifetime)consent(saved.value);
  else {clearCookies();if(panel)panel.hidden=false;window.dispatchEvent(new Event('analytics-consent-change'));}
  let pending;
  try{pending=JSON.parse(sessionStorage.getItem(pendingKey));sessionStorage.removeItem(pendingKey);}catch{}
  if(allowed && pending && Number.isFinite(pending.at) && Date.now()-pending.at>=0 && Date.now()-pending.at<60000 && Object.hasOwn(routes,pending.source) && types.has(pending.type) && placements.has(pending.placement)) {
    event('quote_click',pending.type,{source_page:pending.source,cta_location:pending.placement,page_location:'https://eebd.ca'+pending.source});
  }

})();
