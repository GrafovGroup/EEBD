import { cities } from './cities.mjs';
import { offerings } from './offerings.mjs';
import { modelFor } from './models.mjs';

export const imageDescriptions = {
  'ocenco-m202-niosh': {en:'Ocenco M-20.2 EEBD shown open beside a closed unit in a NIOSH assessment photograph.',fr:'EEBD Ocenco M-20.2 ouvert à côté d’un appareil fermé dans une photographie d’évaluation du NIOSH.'},
  'marine-port': {en:'Conceptual image of a cargo vessel beside a Pacific coastal terminal.',fr:'Image conceptuelle d’un cargo à un terminal de la côte du Pacifique.'},
  'atlantic-harbour': {en:'Conceptual image of working vessels in an Atlantic harbour.',fr:'Image conceptuelle de navires de travail dans un port de l’Atlantique.'},
  'river-port': {en:'Conceptual image of a cargo vessel and a Canadian river terminal.',fr:'Image conceptuelle d’un cargo et d’un terminal fluvial canadien.'},
  'industrial-facility': {en:'Conceptual image of an industrial facility and its access walkways.',fr:'Image conceptuelle d’une installation industrielle et de ses passerelles d’accès.'},
  'training-workshop': {en:'Conceptual training room with closed equipment cases and safety helmets.',fr:'Salle de formation conceptuelle avec valises d’équipement fermées et casques de sécurité.'},
  'service-planning': {en:'Conceptual workbench prepared for equipment inventory and service planning.',fr:'Établi conceptuel préparé pour l’inventaire d’équipement et la planification des services.'},
  'procurement-desk': {en:'Conceptual procurement workspace with documents and a closed laptop.',fr:'Espace de travail conceptuel pour l’approvisionnement, avec documents et ordinateur fermé.'},
};
const coreImages={home:'marine-port',equipment:'marine-port',marineEquipment:'marine-port',industrialEquipment:'industrial-facility',accessories:'training-workshop',training:'training-workshop',service:'service-planning',fleet:'river-port',industries:'industrial-facility',marine:'atlantic-harbour',industrial:'industrial-facility',coverage:'marine-port',resources:'procurement-desk',quoteGuide:'procurement-desk',escapeGuide:'marine-port',about:'procurement-desk',contact:'procurement-desk',quote:'procurement-desk',privacy:'procurement-desk','404':'marine-port'};
const regionImages={pacific:'marine-port',atlantic:'atlantic-harbour',stlawrence:'river-port',greatlakes:'river-port',inland:'industrial-facility'};
export function imageFor(id) {
  if(id==='comparison')return 'ocenco-m202-niosh';
  if(modelFor(id))return modelFor(id).image;
  const city=cities.find(c=>c.id===id),offering=offerings.find(o=>o.id===id);
  return city?regionImages[city.region]:offering?.image || coreImages[id] || 'procurement-desk';
}
export const imagePath=id=>`/assets/images/${imageFor(id)}.webp`;
