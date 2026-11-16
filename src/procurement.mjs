// Buyer guidance, not a representation of tender compliance or product availability.
export const comparisonRows = [
  { en: 'Breathing system', fr: 'Système respiratoire', values: {
    modelM202: { en: 'Compressed oxygen · closed circuit', fr: 'Oxygène comprimé · circuit fermé' },
    modelSpiroscape: { en: 'Compressed air · open circuit', fr: 'Air comprimé · circuit ouvert' },
    modelSaverCF10: { en: 'Compressed air · constant flow', fr: 'Air comprimé · débit constant' },
  } },
  { en: 'Rated duration and basis', fr: 'Durée nominale et référence', values: {
    modelM202: { en: '10 minutes: NIOSH. 15 minutes: European rating. Verify the supplied variant and certificate.', fr: '10 minutes : NIOSH. 15 minutes : classification européenne. Vérifier la variante livrée et son certificat.' },
    modelSpiroscape: { en: '15 minutes · EN 1146 / ISO 23269-1', fr: '15 minutes · EN 1146 / ISO 23269-1' },
    modelSaverCF10: { en: '10 minutes · NIOSH escape rating', fr: '10 minutes · classification NIOSH pour l’évacuation' },
  } },
  { en: 'Configuration to identify', fr: 'Configuration à préciser', values: {
    modelM202: { en: 'Exact unit label and part number; carried or stored configuration.', fr: 'Étiquette et numéro de pièce exacts; configuration portée ou rangée.' },
    modelSpiroscape: { en: 'Bar version: 3 L / 200 bar steel or 2 L / 300 bar composite. State filled or empty delivery.', fr: 'Version en bar : acier 3 L / 200 bar ou composite 2 L / 300 bar. Préciser la livraison pleine ou vide.' },
    modelSaverCF10: { en: 'CF10 N · part 4042056. Other Saver CF versions have different specifications.', fr: 'CF10 N · pièce 4042056. Les autres versions Saver CF ont des caractéristiques différentes.' },
  } },
  { en: 'Before requesting a quotation', fr: 'Avant de demander une soumission', values: {
    modelM202: { en: 'Specify required approvals. List M-20.2T trainers and mounting brackets separately.', fr: 'Préciser les homologations exigées. Séparer les appareils de formation M-20.2T et les supports.' },
    modelSpiroscape: { en: 'Confirm the cylinder configuration, applicable approvals and Canadian filling/service arrangements.', fr: 'Confirmer la bouteille, les homologations applicables et les modalités de remplissage et d’entretien au Canada.' },
    modelSaverCF10: { en: 'Ask Dräger to check current safety notices against the exact variant and serial number.', fr: 'Demander à Dräger de vérifier les avis de sécurité selon la variante et le numéro de série exacts.' },
  } },
];

export const procurementPages = {
  comparison: {
    en: { eyebrow: 'PRODUCT COMPARISON', title: 'Compare the details that matter.', description: 'Compare Ocenco M-20.2, Interspiro Spiroscape and Dräger Saver CF10 N: breathing systems, rated durations, configurations and procurement checks.', intro: 'Three manufacturer references, with their rating basis and configuration kept visible. Use this comparison to prepare questions for your purchasing and safety teams.', requestType: 'equipment',
      sections: [
        ['Read the duration with its rating', 'A duration belongs to a specific model, configuration and test basis. It is not a guaranteed escape time. A longer published rating alone does not establish suitability for your vessel, workplace or escape route.'],
        ['Confirm the exact requirement', 'Selection needs competent assessment, the applicable manufacturer instructions and the documents required for your application. These models are not presented as interchangeable or as accepted equivalents for a tender. Availability and commercial terms require a separate quotation.'],
        ['Build a complete equipment list', 'Keep operational devices, dedicated training units, brackets and storage accessories on separate lines. For a fleet, give the quantity and required delivery date for each destination.'],
      ], checklist: ['Exact model and variant', 'Required certification and instructions', 'Quantity and delivery location', 'Separate trainers and accessories'], related: ['procurementDocs', 'fleetProcurement', 'escapeGuide'] },
    fr: { eyebrow: 'COMPARAISON DES MODÈLES', title: 'Comparez les détails essentiels.', description: 'Comparez Ocenco M-20.2, Interspiro Spiroscape et Dräger Saver CF10 N : systèmes respiratoires, durées nominales, configurations et vérifications d’achat.', intro: 'Trois références de fabricants, avec leur base de classification et leur configuration. Préparez les questions à transmettre à vos équipes d’achat et de sécurité.', requestType: 'equipment',
      sections: [
        ['Lire la durée avec sa classification', 'Une durée correspond à un modèle, à une configuration et à une méthode d’essai précis. Elle ne garantit pas un temps d’évacuation. Une durée publiée plus longue ne démontre pas à elle seule l’adéquation au navire, au lieu de travail ou au parcours d’évacuation.'],
        ['Confirmer les exigences exactes', 'La sélection exige une évaluation compétente, les instructions applicables et les documents requis pour l’utilisation prévue. Ces modèles ne sont pas présentés comme interchangeables ni comme des équivalents acceptés pour un appel d’offres. La disponibilité et les conditions commerciales exigent une soumission distincte.'],
        ['Préparer une liste complète', 'Séparez les appareils opérationnels, les appareils de formation, les supports et les accessoires de rangement. Pour une flotte, précisez la quantité et la date de livraison souhaitée pour chaque destination.'],
      ], checklist: ['Modèle et variante exacts', 'Certification et instructions exigées', 'Quantité et lieu de livraison', 'Appareils de formation et accessoires séparés'], related: ['procurementDocs', 'fleetProcurement', 'escapeGuide'] },
  },
  procurementDocs: {
    en: { eyebrow: 'PROCUREMENT RESOURCES', title: 'A clearer equipment purchasing brief.', description: 'Build an EEBD purchasing list with part numbers, NSNs, destinations and shelf-life requirements. Download the template and check the required documents.', intro: 'Bring the equipment identity, delivery schedule and supporting documents into one brief. Start with the checklist, then use the purchasing-list template for multiple line items.', requestType: 'equipment',
      sections: [
        ['1. Identify every line item', 'Record the manufacturer, exact model and part number. Add the NATO Stock Number (NSN), manufacturer NCAGE identifier and procurement reference when specified. Treat an NSN as a reference to verify against the requested configuration, not proof that a different product is equivalent.'],
        ['2. Separate quantities from forecasts', 'Show quantities by vessel, site or receiving destination. Label firm quantities, staged deliveries and annual forecasts clearly. Add required dates, document language and separate quantities for trainers, brackets and storage items.'],
        ['3. Request the evidence for the exact variant', 'Identify the datasheet, current instructions, approval certificates and any applicable safety data sheets needed. Ask for serial or batch traceability, manufacture and expiry dates, current safety-notice status and required release or conformity documents. Document availability must be confirmed with the source of supply.'],
        ['4. State remaining-life and delivery requirements', 'If the purchasing specification requires minimum remaining shelf life, state the period or percentage and the point at which it is measured. Confirm freight responsibilities, the named delivery or handover place, taxes, partial shipments and any applicable dangerous-goods arrangements in the quotation. These conditions are specific to the purchase.'],
        ['5. Check alternatives and submission rules', 'An alternative needs supporting specifications and acceptance by the party responsible for the requirement. A changed or superseded part number may need manufacturer evidence. Follow the solicitation’s instructions for actual bid attachments; links on a website do not necessarily satisfy its documentation requirements.'],
      ], checklist: ['Part number / NSN, if specified', 'Quantities and dates by destination', 'Required documents and languages', 'Remaining shelf life and freight terms', 'Separate operational, training and accessory lines'], related: ['fleetProcurement', 'comparison', 'quoteGuide'] },
    fr: { eyebrow: 'RESSOURCES D’APPROVISIONNEMENT', title: 'Un dossier d’achat mieux défini.', description: 'Préparez une liste d’achat EEBD avec numéros de pièce, NNO, destinations, durée de conservation et documents. Téléchargez le modèle français de liste d’achat.', intro: 'Réunissez l’identité des appareils, le calendrier de livraison et les documents justificatifs. Utilisez la liste de vérification, puis le modèle de liste d’achat pour plusieurs articles.', requestType: 'equipment',
      sections: [
        ['1. Identifier chaque article', 'Inscrivez le fabricant, le modèle et le numéro de pièce exacts. Ajoutez le numéro de nomenclature OTAN (NNO ou NSN), l’identifiant NCAGE du fabricant et la référence d’achat lorsque requis. Un NNO est une référence à vérifier selon la configuration demandée; il ne prouve pas l’équivalence d’un autre produit.'],
        ['2. Distinguer quantités et prévisions', 'Présentez les quantités par navire, installation ou destination. Distinguez les quantités fermes, les livraisons échelonnées et les prévisions annuelles. Ajoutez les dates souhaitées, la langue des documents et les quantités distinctes d’appareils de formation, de supports et d’accessoires.'],
        ['3. Demander les preuves propres à la variante', 'Précisez les fiches techniques, instructions actuelles, certificats d’homologation et fiches de données de sécurité applicables. Demandez la traçabilité par numéro de série ou lot, les dates de fabrication et d’expiration, l’état des avis de sécurité et les documents de libération ou de conformité requis. Leur disponibilité doit être confirmée auprès de la source d’approvisionnement.'],
        ['4. Préciser la durée restante et la livraison', 'Si le dossier d’achat exige une durée minimale de conservation restante, précisez la période ou le pourcentage et le moment de mesure. Confirmez dans la soumission les responsabilités de transport, le lieu de livraison ou de transfert, les taxes, les livraisons partielles et les modalités applicables aux marchandises dangereuses. Ces conditions sont propres à chaque achat.'],
        ['5. Vérifier les solutions de remplacement et le dépôt', 'Une solution de remplacement exige des spécifications justificatives et l’acceptation de la personne responsable des exigences. Un numéro de pièce remplacé peut exiger une preuve du fabricant. Respectez les instructions de dépôt des pièces justificatives; les liens d’un site Web ne satisfont pas nécessairement aux exigences documentaires d’un appel d’offres.'],
      ], checklist: ['Numéro de pièce / NNO, si requis', 'Quantités et dates par destination', 'Documents et langues requis', 'Durée restante et conditions de transport', 'Articles opérationnels, de formation et accessoires séparés'], related: ['fleetProcurement', 'comparison', 'quoteGuide'] },
  },
};

export function enhanceProcurementContent(pages) {
  for(const locale of ['en','fr']) {
    const fr=locale==='fr';
    const additions=fr?[
      ['Achats publics et spécifications de projet', 'Indiquez la référence d’achat, le numéro de pièce demandé, le NNO et le NCAGE du fabricant lorsqu’ils sont précisés. Décrivez les exigences documentaires et la personne habilitée à accepter une solution de remplacement. EEBD.ca reçoit les demandes d’approvisionnement; aucun statut de fournisseur agréé d’un organisme public ni aucune conformité à un appel d’offres n’est annoncé.'],
      ['Durée restante et traçabilité', 'Précisez toute exigence minimale de conservation restante à la livraison, ainsi que les dates de fabrication et d’expiration, les numéros de série ou de lot et les documents de libération requis. Ces points doivent être vérifiés auprès du fournisseur pour les unités proposées.'],
      ['Livraisons ponctuelles, échelonnées ou prévues', 'Distinguez les quantités fermes des prévisions annuelles. Utilisez une ligne par appareil et destination, avec les dates de réception souhaitées et les responsabilités de transport à confirmer. Une prévision ne réserve pas de stock et ne constitue pas une commande.'],
    ]:[
      ['Public-sector and project specifications', 'Include the purchasing reference, requested part number, NSN and manufacturer NCAGE when specified. Identify the required documents and who can accept an alternative. EEBD.ca accepts procurement enquiries; no approved public-sector supplier status or compliance with a particular tender is represented.'],
      ['Remaining life and traceability', 'State any minimum remaining shelf-life requirement at delivery, together with manufacture and expiry dates, serial or batch records and release documents required. These details must be verified with the supplier for the actual units proposed.'],
      ['One-time, staged or forecast deliveries', 'Separate firm quantities from annual forecasts. Use one line for each device and destination, with required receiving dates and freight responsibilities to confirm. A forecast does not allocate stock or constitute an order.'],
    ];
    pages.fleetProcurement[locale].sections.push(...additions);
    pages.fleetProcurement[locale].title=fr?'Préparez l’achat de votre flotte.':'Prepare your fleet purchase.';
    pages.fleetProcurement[locale].checklist=procurementPages.procurementDocs[locale].checklist;
    pages.fleetProcurement[locale].related=['procurementDocs','comparison','fleet','coverage'];
    pages.fleet[locale].sections.push(additions[0]);
    pages.fleet[locale].related=['fleetProcurement','procurementDocs','comparison'];
    pages.resources[locale].related=['comparison','procurementDocs','quoteGuide','escapeGuide'];
    pages.quoteGuide[locale].related=['procurementDocs','comparison','fleetProcurement'];
    pages.equipment[locale].related=['comparison','procurementDocs',...pages.equipment[locale].related];
    for(const id of ['cityHalifax','cityVictoria']) {
      const region=id==='cityHalifax'?'Halifax':fr?'Victoria et Esquimalt':'Victoria and Esquimalt';
      pages[id][locale].sections.push([fr?`Achats de flotte : ${region}`:`Fleet procurement: ${region}`,fr?
        'Pour un achat regroupant plusieurs navires ou sites, indiquez le lieu de réception exact, la référence d’achat et les quantités par destination. Distinguez les dates de réception souhaitées des dates de départ des navires. Ajoutez les documents requis, la durée de conservation restante exigée et les modalités de remise à un agent ou à un réceptionnaire désigné.':
        'For a purchase covering several vessels or sites, identify the exact receiving location, purchasing reference and quantity for each destination. Separate required receiving dates from vessel departure dates. Include documentation, minimum remaining shelf life and any handover to an agent or designated receiving party.']);
      pages[id][locale].related=['fleetProcurement','procurementDocs','comparison','coverage'];
    }
    pages.escapeGuide[locale].faq=fr?[
      {q:'Quelle est la durée d’un EEBD?',a:'La durée nominale dépend du modèle, de sa variante et de la méthode d’essai. Comparez ces éléments ensemble. Par exemple, le fabricant du M-20.2 distingue une durée NIOSH de 10 minutes d’une durée européenne de 15 minutes. Une durée nominale ne garantit pas le temps nécessaire à une évacuation réelle.'},
      {q:'Un appareil à air comprimé est-il équivalent à un appareil à oxygène?',a:'Ces appareils peuvent avoir des systèmes respiratoires et des configurations différents. Une désignation EEBD commune ne les rend pas interchangeables. La sélection doit suivre les exigences de l’application et les instructions du modèle exact.'},
      {q:'Les appareils de formation et les supports sont-ils compris?',a:'Le contenu dépend de la configuration et de la soumission. Indiquez séparément chaque appareil de formation, support et accessoire, avec sa quantité et sa référence. Ne présumez pas qu’un appareil opérationnel comprend ces articles.'},
    ]:[
      {q:'How long does an EEBD last?',a:'Rated duration depends on the model, variant and test basis. Compare these together. For example, the M-20.2 manufacturer distinguishes a 10-minute NIOSH rating from a 15-minute European rating. A rated duration does not guarantee the time available in an actual escape.'},
      {q:'Is a compressed-air device equivalent to an oxygen device?',a:'These devices can use different breathing systems and configurations. The shared EEBD description does not make them interchangeable. Selection must follow the application’s requirements and the exact model’s instructions.'},
      {q:'Are training units and brackets included?',a:'Package contents depend on the configuration and quotation. List each trainer, bracket and accessory separately with its quantity and reference. Do not assume these items are included with an operational device.'},
    ];
    pages.escapeGuide[locale].related=['comparison','procurementDocs','accessories'];
    pages.escapeGuide[locale].sources=[...(pages.escapeGuide[locale].sources || []),['Ocenco — M-20.2 specifications and accessories','https://www.ocenco.com/products/m-202/']];
  }
}
