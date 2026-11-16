export const concepts = [
  { id: 1, name: 'Precision', subtitle: 'A wordmark with purpose.', ink: '#102e3c', accent: '#ee7d3b', paper: '#f5f4ef',
    rationale: 'Custom geometric lettering with an open detail in the first E. Direct, technical and easy to recognize on documentation.', font: 'Arial / system sans-serif; custom vector wordmark', small: 'The isolated open E stays clear at 16 px; use the compact mark below 120 px.', direction: 'Wide off-white canvas, strong editorial typography and a dark maritime illustration.' },
  { id: 2, name: 'Clear passage', subtitle: 'A route expressed as an E.', ink: '#183f38', accent: '#d4e78b', paper: '#f4f5ed',
    rationale: 'An open geometric E defines a clear passage without a literal arrow. The separate symbol gives the identity a useful compact form.', font: 'Arial / system sans-serif; geometric vector wordmark', small: 'The monogram holds at favicon size; the descriptor is omitted on mobile.', direction: 'Quiet green, open space and a lime action colour. A practical, people-focused treatment.' },
  { id: 3, name: 'Airframe', subtitle: 'Air, held in a simple frame.', ink: '#153747', accent: '#a9dce0', paper: '#f0f6f5',
    rationale: 'Two offset rounded frames suggest circulation and an opening. A stable wordmark balances the softer symbol.', font: 'Arial / system sans-serif; geometric vector wordmark', small: 'Use the paired frame alone at 24 px; simplify to the outer frame at 16 px.', direction: 'Cool mineral colours, rounded panels and a calmer technical presentation.' },
  { id: 4, name: 'Marine signal', subtitle: 'Made for the equipment label.', ink: '#172b42', accent: '#f2bf62', paper: '#f6f3eb',
    rationale: 'A compact divided signal panel creates a recognizable label-like emblem. It is original brand artwork, not a regulatory symbol.', font: 'Arial / system sans-serif; geometric vector wordmark', small: 'The four-panel shape survives at 16 px; use the full lockup for headers.', direction: 'Navy, warm amber and structured rules inspired by marine documentation.' },
  { id: 5, name: 'Plainspoken', subtitle: 'Nothing extra. Every letter considered.', ink: '#292c2a', accent: '#c6d3b3', paper: '#f7f5ef',
    rationale: 'An emblem-free, spaced industrial wordmark with a fine baseline. The hierarchy rests on typography rather than an icon.', font: 'Arial / system sans-serif; individually positioned editable letterforms', small: 'Use the EE pair at small sizes; the .ca remains legible in the mobile wordmark.', direction: 'Warm neutrals, restrained colour and an open, typography-led layout.' },
  { id: 6, name: 'Command', subtitle: 'Condensed. Direct. Equipment-ready.', ink: '#172d37', accent: '#ec743b', paper: '#f6f4ee',
    rationale: 'A compact stencil wordmark with strong vertical proportions. The full business descriptor sits directly below EEBD, inside the artwork.', font: 'Custom geometric stencil letterforms; Arial descriptor', small: 'Use the full lockup at 250 px or wider; the first E becomes the favicon.', direction: 'Deep ink, safety orange and a strong editorial layout. A focused industrial presence.' },
  { id: 7, name: 'Openline', subtitle: 'A lighter, more open technical voice.', ink: '#194b43', accent: '#bad39b', paper: '#f2f5ee',
    rationale: 'Four open, monoline letters create a clear technical rhythm. The descriptor is integral, with ample space between the name and its meaning.', font: 'Custom monoline letterforms; Arial descriptor', small: 'Rounded strokes stay distinct at header size. Use the open E alone for tiny icons.', direction: 'Forest green and a light mineral background, with generous space and restrained colour.' },
  { id: 8, name: 'Signal blocks', subtitle: 'Four letters. One unmistakable label.', ink: '#132d4b', accent: '#f5b74b', paper: '#f5f3eb',
    rationale: 'Individual letter panels form a memorable marine-inspired wordmark. The descriptor runs beneath all four letters, without a domain suffix or certification motif.', font: 'Custom vector letterforms in modular panels; Arial descriptor', small: 'Four panels remain identifiable at mobile sizes; use the E panel for the favicon.', direction: 'Navy and amber with structured sections and clear equipment-label hierarchy.' },
  { id: 9, name: 'Contour', subtitle: 'Continuous lines. Confident proportions.', ink: '#193d56', accent: '#67bbc3', paper: '#f0f5f5',
    rationale: 'Wide rounded letterforms give EEBD a calm, engineered character. A thin rule separates the wordmark from the full descriptor below.', font: 'Custom rounded vector letterforms; Arial descriptor', small: 'The broad counters remain open. The descriptor is retained in the mobile header.', direction: 'Cool blue and muted aqua, rounded panels and a measured technical presentation.' },
  { id: 10, name: 'Register', subtitle: 'A durable, typographic identity.', ink: '#30332e', accent: '#b85636', paper: '#f7f3e9',
    rationale: 'A substantial serif wordmark brings the character of an equipment register or established technical publication. The business description is a permanent second line.', font: 'Georgia bold editable wordmark; Arial descriptor; system fonts, no font files bundled', small: 'Strong serifs distinguish the name. Use a single E at icon size and the full lockup for headers.', direction: 'Warm paper, charcoal and restrained terracotta. A more traditional procurement-facing direction.' },
];
export const currentConcepts = concepts.filter(c=>c.id>=6);

const glyphs = {
  E: 'M0 0H42V10H12V23H37V33H12V46H42V56H0Z',
  B: 'M0 0H26Q44 0 44 15Q44 23 36 27Q46 31 46 42Q46 56 28 56H0ZM12 10V23H25Q32 23 32 16Q32 10 25 10ZM12 33V46H27Q34 46 34 40Q34 33 27 33Z',
  D: 'M0 0H23Q48 0 48 28Q48 56 23 56H0ZM12 11V45H22Q35 45 35 28Q35 11 22 11Z',
};
function letters(colour, x = 0, y = 0, spacing = 52) {
  return `<g fill="${colour}" fill-rule="evenodd" transform="translate(${x} ${y})">${['E','E','B','D'].map((c,i)=>`<path d="${glyphs[c]}" transform="translate(${i*spacing} 0)"/>`).join('')}</g>`;
}
export function mark(id, colour, accent) {
  if (id === 6) return `<path fill="${colour}" d="M0 0H48V12H12V24H40V36H12V48H48V60H0Z"/><path fill="${accent}" d="M0 27H48V32H0Z"/>`;
  if (id === 7) return `<path d="M53 7H8V53H53M9 30H46" stroke="${colour}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (id === 8) return `<rect width="60" height="60" rx="2" fill="${colour}"/><path transform="translate(13 8) scale(.8)" fill="${accent}" d="${glyphs.E}"/>`;
  if (id === 9) return `<path d="M52 5H19Q6 5 6 18V43Q6 55 19 55H52M9 30H46" stroke="${colour}" stroke-width="10" fill="none" stroke-linejoin="round"/><path d="M44 30H56" stroke="${accent}" stroke-width="10"/>`;
  if (id === 10) return `<text x="2" y="55" font-family="Georgia,serif" font-size="65" font-weight="bold" fill="${colour}">E</text><path d="M2 61H51" stroke="${accent}" stroke-width="3"/>`;
  if (id === 1) return `<path fill="${colour}" d="M0 0H48V12H12V24H40V36H12V48H48V60H0Z"/><path fill="${accent}" d="M24 0H48V12H24Z"/>`;
  if (id === 2) return `<path fill="none" stroke="${colour}" stroke-width="10" d="M55 5H5V55H55M20 20H48M20 40H48"/><path fill="${accent}" d="M38 25H60V35H38Z"/>`;
  if (id === 3) return `<path fill="none" stroke="${colour}" stroke-width="7" stroke-linecap="round" d="M51 5H24Q5 5 5 24V40Q5 57 24 57H51M43 16H27Q17 16 17 28V38Q17 46 27 46H57"/><path stroke="${accent}" stroke-width="7" stroke-linecap="round" d="M41 29H59"/>`;
  if (id === 4) return `<rect width="60" height="60" rx="2" fill="${colour}"/><path fill="${accent}" d="M7 7H27V27H7ZM33 33H53V53H33Z"/><path fill="none" stroke="${accent}" stroke-width="3" d="M35 9H51V25H35ZM9 35H25V51H9Z"/>`;
  return `<g fill="${colour}" transform="translate(0 7) scale(.62)"><path d="${glyphs.E}"/><path d="${glyphs.E}" transform="translate(49 0)"/></g><path stroke="${accent}" stroke-width="4" d="M0 51H56"/>`;
}
export function logoSvg(id = 6, mode = 'light', compact = false, locale = 'en') {
  const c = concepts.find(c=>c.id===id) || concepts[0];
  const colour = mode === 'dark' ? '#ffffff' : c.ink;
  const accent = mode === 'mono' ? colour : c.accent;
  if (id >= 6) {
    if (compact) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 72 72"><title>EEBD — ${c.name} compact concept</title>${mark(id,colour,accent)}</svg>`;
    const descriptor=locale==='fr'?'APPAREIL RESPIRATOIRE POUR L’ÉVACUATION D’URGENCE':'EMERGENCY ESCAPE BREATHING DEVICE';
    let artwork='';
    if(id===6) artwork=`<g transform="translate(55 9) scale(1.5 1.55)"><defs><mask id="stencil-${mode}"><rect x="-1" width="210" height="60" fill="white"/><rect x="-1" y="26" width="210" height="4" fill="black"/></mask></defs><g mask="url(#stencil-${mode})">${letters(colour)}</g></g><path d="M26 9H36V96H26Z" fill="${accent}"/>`;
    if(id===7) artwork=`<g stroke="${colour}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M105 14H33V93H105M35 53H94M203 14H131V93H203M133 53H192M231 14V93H270Q299 93 299 73Q299 53 271 53H233M233 14H268Q296 14 296 34Q296 53 269 53M327 14V93H350Q390 93 390 53Q390 14 350 14Z"/></g><circle cx="390" cy="14" r="5" fill="${accent}"/>`;
    if(id===8) artwork=[0,1,2,3].map(n=>`<rect x="${28+n*94}" y="7" width="84" height="91" rx="3" fill="${n===2?accent:colour}"/><g transform="translate(${49+n*94} 23) scale(.95)"><path fill="${n===2?c.ink:(mode==='dark'?c.ink:'#fff')}" fill-rule="evenodd" d="${glyphs[['E','E','B','D'][n]]}"/></g>`).join('');
    if(id===9) artwork=`<g stroke="${colour}" stroke-width="11" fill="none" stroke-linecap="square" stroke-linejoin="round"><path d="M105 16H48Q32 16 32 32V77Q32 93 48 93H105M34 54H95M203 16H146Q130 16 130 32V77Q130 93 146 93H203M132 54H193M230 16V93H270Q299 93 299 74Q299 54 272 54H232M232 16H269Q296 16 296 35Q296 54 269 54M327 16V93H351Q390 93 390 54Q390 16 351 16Z"/></g><path d="M28 113H395" stroke="${accent}" stroke-width="3"/>`;
    if(id===10) artwork=`<text x="210" y="98" text-anchor="middle" font-family="Georgia,serif" font-size="118" font-weight="bold" letter-spacing="-4" fill="${colour}">EEBD</text><path d="M35 113H385" stroke="${accent}" stroke-width="3"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 155" role="img"><title>EEBD — ${descriptor}</title>${artwork}<text x="210" y="140" text-anchor="middle" fill="${colour}" font-family="Arial,sans-serif" font-size="${locale==='fr'?'10.5':'13.5'}" font-weight="600" letter-spacing="${locale==='fr'?'.35':'.85'}">${descriptor}</text></svg>`;
  }
  const start = id === 1 || id === 5 ? 4 : 86;
  const word = letters(colour, start, 4, id === 5 ? 58 : 52);
  const end = start + (id === 5 ? 226 : 205);
  const width = end + 72;
  if (compact) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 72 72"><title>EEBD.ca — ${c.name} compact concept</title>${mark(id,colour,accent)}</svg>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 76" role="img"><title>EEBD.ca — ${c.name} concept</title>${id!==1&&id!==5?`<g transform="translate(3 3)">${mark(id,colour,accent)}</g>`:''}${word}${id===1?`<path fill="${accent}" d="M28 4H46V14H28Z"/>`:''}<text x="${end+4}" y="59" fill="${colour}" font-family="Arial, sans-serif" font-size="33" font-weight="400">.ca</text>${id===5?`<path stroke="${accent}" stroke-width="3" d="M4 72H${width-8}"/>`:''}</svg>`;
}

export function boardSvg(round=2) {
  const selection=round===1?concepts.filter(c=>c.id<=5):currentConcepts;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1630" viewBox="0 0 1600 1630"><rect width="1600" height="1630" fill="#f4f3ee"/><g font-family="Arial, sans-serif" fill="#102e3c"><text x="66" y="69" font-size="15" letter-spacing="3">EEBD.CA / BRAND EXPLORATION / ROUND ${round}</text><text x="66" y="135" font-size="50" font-weight="700">${round===1?'Five ways to make a clear first impression.':'Five new directions. The business, spelled out.'}</text><text x="66" y="175" font-size="21" fill="#57656b">${round===1?'Original editable concepts. Select a direction before the identity is finalized.':'EEBD + EMERGENCY ESCAPE BREATHING DEVICE. No domain suffix. Descriptor included in every logo.'}</text></g>${selection.map((c,i)=>{
    const y=220+i*270;
    const embedded=(svg,x,y,w,h)=>svg.replace('<svg ',`<svg x="${x}" y="${y}" width="${w}" height="${h}" `);
    return `<g transform="translate(0 ${y})"><line x1="66" y1="0" x2="1534" y2="0" stroke="#c9d0ce"/><text x="66" y="42" font-family="Arial" font-size="15" fill="#56666a">${String(c.id).padStart(2,'0')}</text><text x="66" y="78" font-family="Arial" font-size="26" fill="${c.ink}" font-weight="700">${c.name}</text><text x="66" y="113" font-family="Arial" font-size="16" fill="#56666a">${c.subtitle}</text><rect x="410" y="25" width="400" height="200" rx="5" fill="white"/>${embedded(logoSvg(c.id),'430','55','360','140')}<rect x="832" y="25" width="400" height="200" rx="5" fill="${c.ink}"/>${embedded(logoSvg(c.id,'dark'),'852','55','360','140')}<rect x="1254" y="25" width="280" height="200" rx="5" fill="${c.paper}" stroke="#c9d0ce"/>${embedded(logoSvg(c.id,'light',true),'1280','65','68','68')}<rect x="1380" y="65" width="36" height="36" fill="${c.ink}"/><rect x="1428" y="65" width="36" height="36" fill="${c.accent}"/><rect x="1476" y="65" width="36" height="36" fill="${c.paper}" stroke="#b6bebc"/><text x="1280" y="175" font-family="Arial" font-size="14" fill="${c.ink}">COMPACT MARK + PALETTE</text></g>`;
  }).join('')}<text x="66" y="1600" font-family="Arial" font-size="16" fill="#57656b">No concept is approved. Desktop and mobile applications are available in the brand review.</text></svg>`;
}
