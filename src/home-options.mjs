import { site } from './config.mjs';
import { pathFor } from './routes.mjs';

export const homeOptions = [
  {id:1,en:'Immersive',fr:'Immersion',description:'A dark, full-width opening with a large escape-equipment scene and a direct enquiry path.'},
  {id:2,en:'Editorial',fr:'Éditorial',description:'Open space, a strong typographic headline and a portrait-led equipment story.'},
  {id:3,en:'Procurement',fr:'Approvisionnement',description:'A purchasing-first layout that prioritizes model selection, fleet quantities and documentation.'},
  {id:4,en:'Technical',fr:'Technique',description:'A precise, structured opening with a panoramic image and clearly numbered next steps.'},
];
const a=(id,l,label,cls='button')=>`<a class="${cls}" href="${pathFor(id,l)}">${label}</a>`;
export function alternativeHero(id,l,photo) {
  const fr=l==='fr';
  const titles={
    1:fr?'Prêt à<br>quitter le danger.':'Ready for<br>the way out.',
    2:fr?'L’évacuation.<br>Bien équipée.':'Escape.<br>Precisely equipped.',
    3:fr?'Votre flotte.<br>Vos exigences.<br>Un dossier clair.':'Your fleet.<br>Your requirements.<br>One clear brief.',
    4:fr?'L’équipement d’évacuation,<br>en détail.':'Escape equipment.<br>Every detail matters.',
  };
  const intro=fr?'Appareils respiratoires d’évacuation d’urgence pour les besoins maritimes et industriels au Canada. Comparez les modèles et préparez votre demande.':'Emergency escape breathing devices for Canadian marine and industrial requirements. Compare models and prepare a clear equipment enquiry.';
  const actions=`<div class="actions">${a('quote',l,fr?'Préparer une demande':'Prepare an enquiry')}${a(id===3?'procurementDocs':'comparison',l,id===3?(fr?'Liste de vérification':'Purchasing checklist'):(fr?'Comparer les modèles':'Compare models'),'button button-outline')}</div>`;
  const introBlock=`<div class="alternative-copy"><p class="eyebrow">${fr?'EEBD · CANADA · ÉVACUATION':'EEBD · CANADA · ESCAPE EQUIPMENT'}</p><h1>${titles[id]}</h1><p class="hero-intro">${intro}</p>${actions}<p class="alternative-note">${fr?'Disponibilité et portée à confirmer selon votre demande.':'Availability and scope confirmed for each enquiry.'}</p></div>`;
  const steps=fr?[['Modèle','Identifier l’appareil'],['Quantité','Préciser les destinations'],['Documents','Définir les exigences']]:[['Model','Identify the device'],['Quantity','Specify destinations'],['Documents','Define the requirements']];
  const rail=`<div class="alternative-rail">${steps.map(([title,body],i)=>`<div><span>0${i+1}</span><strong>${title}</strong><p>${body}</p></div>`).join('')}</div>`;
  if(id===1)return `<section class="alternative-hero immersive">${photo}${introBlock}<div class="immersive-bottom"><span>${fr?'MARITIME / INDUSTRIEL / FLOTTES':'MARINE / INDUSTRIAL / FLEETS'}</span>${a('eebdScba',l,fr?'EEBD ou ARI? →':'EEBD or SCBA? →','text-link')}</div></section>`;
  if(id===2)return `<section class="alternative-hero editorial wrap">${introBlock}<div class="editorial-frame">${photo}<span class="editorial-caption">${fr?'01 / APPAREIL D’ÉVACUATION':'01 / ESCAPE BREATHING DEVICE'}</span></div></section><div class="wrap">${rail}</div>`;
  if(id===3)return `<section class="alternative-hero procurement wrap">${introBlock}${photo}<aside class="procurement-start"><p class="eyebrow">${fr?'COMMENCER ICI':'START HERE'}</p><h2>${fr?'Un achat bien défini.':'A better purchasing brief.'}</h2>${rail}${a('fleetProcurement',l,fr?'Planifier un achat de flotte':'Plan fleet procurement','text-link')}</aside></section>`;
  return `<section class="alternative-hero technical wrap"><div class="technical-title"><p class="eyebrow">${fr?'ÉQUIPEMENT / FORMATION / SOUTIEN':'EQUIPMENT / TRAINING / SUPPORT'}</p><h1>${titles[id]}</h1></div><div class="technical-scene">${photo}<div class="technical-brief"><p>${intro}</p>${actions}</div></div>${rail}</section>`;
}
export function reviewBar(id,locale) {
  const fr=locale==='fr';
  return `<aside class="home-review-bar" aria-label="${fr?'Options de la page d’accueil':'Homepage options'}"><a href="/homepage-options/">← ${fr?'Toutes les options':'All options'}</a><span>0${id} / ${homeOptions[id-1][locale]}</span><nav aria-label="${fr?'Changer d’option':'Switch option'}">${homeOptions.map(o=>`<a href="/homepage-options/${o.id}/${locale}/" ${o.id===id?'aria-current="page"':''}>0${o.id}</a>`).join('')}<a href="/homepage-options/${id}/${fr?'en':'fr'}/" lang="${fr?'en':'fr'}">${fr?'EN':'FR'}</a></nav></aside>`;
}
export function renderHomeGallery() {
  return `<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><link rel="canonical" href="${site.origin}/homepage-options/"><title>Four homepage directions | EEBD.ca</title><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/site.css?v=${site.assetVersion}"></head><body class="home-gallery"><main class="wrap"><header class="gallery-heading"><a href="/en/"><img src="/assets/brand/precision-primary-en.svg" width="180" height="80" alt="EEBD — Emergency Escape Breathing Device"></a><p class="eyebrow">HOMEPAGE DESIGN REVIEW</p><h1>Four ways to<br>make an entrance.</h1><p>Open a full page to compare its layout on desktop or mobile. The current homepage stays in place while you choose.</p><a href="/en/" class="text-link">View the current homepage →</a></header><div class="home-option-grid">${homeOptions.map(o=>`<article><a class="option-preview" href="/homepage-options/${o.id}/en/"><img src="/assets/home-options/option-${o.id}.webp" width="900" height="640" alt="Homepage option ${o.id}: ${o.en}" loading="lazy"></a><div class="option-description"><p class="eyebrow">OPTION 0${o.id}</p><h2>${o.en}</h2><p>${o.description}</p><div class="actions"><a class="button button-dark" href="/homepage-options/${o.id}/en/">Open full page</a><a class="text-link" href="/homepage-options/${o.id}/fr/" lang="fr-CA">Version française →</a></div></div></article>`).join('')}</div><p class="gallery-foot">Choose 01, 02, 03 or 04, or keep the current homepage. You can also combine elements from different options.</p></main></body></html>`;
}
