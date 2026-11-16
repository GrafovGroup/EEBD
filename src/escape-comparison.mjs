// Editorial comparison. Exact approvals and manufacturer instructions control selection.
export const escapeComparison = {
  en: {
    eyebrow: 'EEBD VS. SCBA', title: 'EEBD vs SCBA: differences and uses.',
    description: 'Compare EEBD escape equipment with entry-and-escape SCBA: purpose, breathing system, duration, training and the questions to ask before purchasing.',
    intro: 'An EEBD helps a person leave a hazardous atmosphere. Entry-and-escape SCBA supports trained personnel performing approved tasks. Their roles are different, even when both carry a breathing supply.',
    sections: [
      ['The task comes first', 'For maritime applications, the IMO Fire Safety Systems Code reserves EEBDs for escape. Firefighting and entry into oxygen-deficient spaces require breathing apparatus specifically suited to the task. A hood or a cylinder alone does not establish that suitability.'],
      ['Compare the exact configuration', '“SCBA” describes a broad equipment class that also includes escape-only devices. This comparison uses SCBA to mean an entry-and-escape set. Confirm the approval, operating limits and instructions for the exact unit; do not assume every SCBA is suitable for firefighting.'],
      ['Build the purchasing brief around the hazard', 'Ask your safety lead to define the application, required approvals and escape or response plan. List the exact equipment, dedicated trainers, accessories and service requirements separately. Compare EEBD models only after these requirements are established.'],
    ],
    checklist: ['Escape or entry-and-escape role', 'Hazard assessment and required approvals', 'Exact model and rated configuration', 'Training, fit and maintenance needs'],
    related: ['comparison','escapeGuide','familiarization','procurementDocs'],
    sources: [
      ['IMO — FSS Code, chapter 3, sections 2.1–2.2', 'https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.98%2873%29.pdf'],
      ['NIOSH — Atmosphere-supplying respirators', 'https://www.cdc.gov/niosh/ppe/respirators/asr.html'],
      ['CCOHS — Respirator selection', 'https://www.ccohs.ca/oshanswers/prevention/ppe/respslct.html'],
      ['CCOHS — Respirator fit testing', 'https://www.ccohs.ca/oshanswers/prevention/ppe/respirator-respirator-fit-testing.html'],
      ['Dräger — Saver CF product information', 'https://www.draeger.com/Content/Documents/Products/PI/en_neeur/Saver-CF-Product-Information-en-neeur.pdf'],
    ],
  },
  fr: {
    eyebrow: 'EEBD OU ARI / SCBA', title: 'EEBD ou ARI / SCBA : différences et usages.',
    description: 'Comparez EEBD et ARI/SCBA : évacuation, intervention, système respiratoire, durée, formation et questions à préciser avant un achat.',
    intro: 'Un EEBD aide une personne à quitter une atmosphère dangereuse. Un ARI d’entrée et d’évacuation permet au personnel formé d’effectuer les tâches autorisées. Leurs fonctions diffèrent, même si les deux transportent une réserve respiratoire.',
    sections: [
      ['Définir la tâche avant l’appareil', 'En contexte maritime, le Recueil FSS de l’OMI réserve les EEBD à l’évacuation. La lutte contre l’incendie et l’entrée dans les espaces pauvres en oxygène exigent un appareil respiratoire adapté à ces tâches. Une cagoule ou une bouteille ne démontre pas à elle seule cette aptitude.'],
      ['Comparer la configuration exacte', 'Le terme SCBA désigne une grande catégorie qui comprend aussi des appareils d’évacuation seulement. Ici, ARI/SCBA désigne un appareil d’entrée et d’évacuation. Vérifiez l’homologation, les limites et les instructions de l’appareil exact; tout ARI ne convient pas nécessairement à la lutte contre l’incendie.'],
      ['Fonder l’achat sur les risques', 'Demandez à la personne responsable de la sécurité de définir l’application, les homologations et le plan d’évacuation ou d’intervention. Séparez les appareils, les unités de formation, les accessoires et les besoins d’entretien. Comparez les modèles EEBD après avoir établi ces exigences.'],
    ],
    checklist: ['Évacuation ou entrée et évacuation', 'Évaluation des risques et homologations', 'Modèle et configuration exacts', 'Formation, ajustement et entretien'],
    related: ['comparison','escapeGuide','familiarization','procurementDocs'],
  },
};
escapeComparison.fr.sources = escapeComparison.en.sources;

export const escapeRows = [
  {en:['Purpose','Leave a hazardous atmosphere. No firefighting, rescue entry or re-entry.','Entry, work and escape only within the specific set’s approvals and the response plan.'],fr:['Usage','Quitter une atmosphère dangereuse. Aucun usage pour combattre un incendie, entrer pour un sauvetage ou retourner dans la zone.','Entrée, travail et évacuation selon les homologations de l’appareil et le plan d’intervention.']},
  {en:['Typical arrangement','A hood or other approved interface with a compact breathing supply. Designs vary.','A full-face mask, regulator, harness and carried cylinder in a typical open-circuit set.'],fr:['Configuration courante','Cagoule ou autre interface homologuée et réserve respiratoire compacte. Les modèles varient.','Masque complet, détendeur, harnais et bouteille portée pour un ensemble courant à circuit ouvert.']},
  {en:['Breathing supply','Compressed-air or closed-circuit oxygen systems, depending on the device. A filtering smoke hood is a different category.','Open-circuit sets supply compressed breathing air. Other SCBA types use a closed circuit.'],fr:['Réserve respiratoire','Air comprimé ou oxygène en circuit fermé, selon l’appareil. Une cagoule filtrante constitue une autre catégorie.','Les ensembles à circuit ouvert fournissent de l’air respirable comprimé. D’autres ARI utilisent un circuit fermé.']},
  {en:['Duration','Read the exact model rating: Saver CF variants, for example, offer 10 or 15 minutes. Do not treat a rating as guaranteed escape time.','Depends on the approved configuration, cylinder and air consumption. Workload affects usable time. There is no universal duration.'],fr:['Durée','Lire la durée du modèle exact : les variantes Saver CF offrent, par exemple, 10 ou 15 minutes. Une durée nominale ne garantit pas le temps d’évacuation.','Dépend de la configuration homologuée, de la bouteille et de la consommation. L’effort influe sur le temps disponible. Aucune durée universelle.']},
  {en:['Training and fit','Device familiarization, practice with a dedicated trainer and a workplace escape plan. Follow the interface-specific fit requirements.','Task-specific training and a respiratory protection program. Tight-fitting facepieces require appropriate fit testing and seal checks.'],fr:['Formation et ajustement','Familiarisation, pratique avec un appareil de formation et plan d’évacuation. Respecter les exigences d’ajustement de l’interface.','Formation propre aux tâches et programme de protection respiratoire. Les masques étanches exigent des essais d’ajustement et des vérifications d’étanchéité appropriés.']},
  {en:['Readiness','Check the exact manufacturer’s storage, inspection, expiry and service instructions. Keep training and operational equipment distinct.','Follow the manufacturer’s inspection, cylinder, cleaning and service requirements, with records appropriate to the program.'],fr:['État de préparation','Suivre les instructions du fabricant pour le stockage, l’inspection, l’expiration et l’entretien. Distinguer formation et équipement opérationnel.','Respecter les exigences du fabricant pour les inspections, bouteilles, nettoyage et entretien, avec les registres du programme.']},
];
