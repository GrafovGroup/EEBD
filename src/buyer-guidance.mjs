// Original purchasing guidance. Technical selection remains model- and application-specific.
export function addBuyerGuidance(pages) {
  const additions={
    quoteGuide:{
      en:{sections:[
        ['An example of a useful first enquiry','“We are planning replacement escape equipment for two vessels receiving in Halifax and Victoria. We have a model reference but need the exact variant checked. Please separate operational units, trainers and brackets, and identify the documents available.” Add your approximate quantities and receiving window. This is enough to start a discussion without completing a full tender package.'],
        ['Compare the full quoted scope','Compare unit prices only after checking that the model, variant, included accessories and delivery basis match. Record freight, taxes, document costs, training and any service requirements separately. Ask how long the offer remains valid and which items depend on supplier confirmation. A lower unit price can cover a different scope.'],
        ['Make unknowns visible','If a part number, quantity or delivery date is not yet fixed, label it as an estimate or a question. Separate mandatory requirements from preferences. This gives the supplier a clear list of points to resolve instead of encouraging assumptions about what you need.']
      ],faq:[
        {q:'Can I enquire before choosing a model?',a:'Yes. Describe the application, location and approximate quantity, and say which requirements your safety or procurement team has already established. Model selection and availability still need confirmation.'},
        {q:'Can one request cover equipment and training?',a:'Yes. Use the equipment enquiry for the main purchase and describe the training requirement in the additional-information field, including participants, location and language. Equipment, training and service scope should be confirmed separately.'},
        {q:'Does sending a request reserve stock?',a:'No. An enquiry starts a discussion. Stock, delivery dates, pricing and the terms for placing an order require a confirmed quotation.'}
      ]},
      fr:{sections:[
        ['Exemple de première demande utile','« Nous prévoyons remplacer les appareils d’évacuation de deux navires, avec réception à Halifax et à Victoria. Nous avons une référence de modèle, mais la variante exacte reste à vérifier. Veuillez distinguer les appareils opérationnels, ceux de formation et les supports, et préciser les documents disponibles. » Ajoutez les quantités estimées et la période de réception. Cela suffit pour amorcer un échange sans préparer tout un dossier d’appel d’offres.'],
        ['Comparer la portée complète des offres','Comparez les prix unitaires après avoir vérifié le modèle, la variante, les accessoires inclus et les conditions de livraison. Distinguez le transport, les taxes, les documents, la formation et les besoins d’entretien. Demandez la durée de validité de l’offre et les éléments soumis à confirmation. Un prix unitaire inférieur peut correspondre à une portée différente.'],
        ['Signaler les éléments à préciser','Si un numéro de pièce, une quantité ou une date reste à confirmer, présentez-le comme une estimation ou une question. Séparez les exigences obligatoires des préférences afin que le fournisseur puisse résoudre les points ouverts sans présumer de vos besoins.']
      ],faq:[
        {q:'Puis-je faire une demande sans avoir choisi un modèle?',a:'Oui. Décrivez l’application, le lieu, la quantité approximative et les exigences déjà établies par votre équipe de sécurité ou d’achat. La sélection et la disponibilité restent à confirmer.'},
        {q:'Une demande peut-elle couvrir l’équipement et la formation?',a:'Oui. Présentez l’achat principal dans la demande d’équipement et précisez la formation dans les renseignements supplémentaires : participants, lieu et langue. La portée de chaque volet doit être confirmée séparément.'},
        {q:'L’envoi d’une demande réserve-t-il du stock?',a:'Non. Il amorce un échange. Le stock, les dates, les prix et les conditions de commande exigent une soumission confirmée.'}
      ]}
    },
    fleetProcurement:{
      en:{sections:[
        ['Build a replacement register before asking for prices','Use one record per unit or traceable batch: vessel or site, storage position, exact model, serial or lot reference, labelled dates and responsible contact. Keep the manufacturer’s service instructions with the record. Flag missing information for review instead of treating an unknown date as evidence that a device is fit for use.'],
        ['Plan a handover for every destination','For each port or site, distinguish the required receiving date from the vessel sailing date. Confirm who can accept delivery, the receiving address, opening hours and any agent or warehouse handover. Use a fallback contact and record who approves changes if the itinerary moves. These are planning details; an enquiry does not confirm a delivery slot.'],
        ['Reconcile the delivery with the purchase list','Prepare a receiving checklist before shipment: quantities, exact item identifiers, required documents, traceability records and any agreed remaining-life condition. Record discrepancies and refer them to the supplier and the person responsible for equipment acceptance. Keep packing and document references together for future replenishment.']
      ],faq:[
        {q:'Can a fleet enquiry cover multiple Canadian ports?',a:'Yes. Give one destination line for each port or receiving site, with quantities and dates. Freight, availability and receiving arrangements need confirmation for each destination.'},
        {q:'How should we show annual demand?',a:'Separate firm purchase quantities from planning estimates and optional future deliveries. Include the forecast period and label changes clearly. A forecast is not a stock reservation or an order.'},
        {q:'Should trainers be counted as operational units?',a:'Keep them on separate purchasing and inventory lines with their own identifiers. A training unit is not a substitute for an operational escape device.'}
      ]},
      fr:{sections:[
        ['Préparer un registre de remplacement avant les prix','Prévoyez une fiche par appareil ou lot traçable : navire ou site, emplacement, modèle exact, numéro de série ou lot, dates de l’étiquette et responsable. Joignez les instructions d’entretien du fabricant. Signalez les données manquantes; une date inconnue ne démontre pas qu’un appareil est apte au service.'],
        ['Prévoir la réception à chaque destination','Pour chaque port ou site, distinguez la date de réception souhaitée de la date de départ du navire. Confirmez le réceptionnaire, l’adresse, les heures et la remise éventuelle à un agent ou entrepôt. Prévoyez un contact de remplacement et la personne autorisée à approuver les changements d’itinéraire. Une demande ne confirme pas un créneau de livraison.'],
        ['Rapprocher la livraison de la liste d’achat','Préparez une liste de réception avant l’expédition : quantités, références exactes, documents exigés, traçabilité et durée restante convenue. Signalez les écarts au fournisseur et au responsable de l’acceptation. Conservez ensemble les références d’emballage et les documents pour les achats futurs.']
      ],faq:[
        {q:'Une demande de flotte peut-elle viser plusieurs ports canadiens?',a:'Oui. Utilisez une ligne par port ou lieu de réception avec les quantités et les dates. Le transport, la disponibilité et les modalités de réception doivent être confirmés pour chaque destination.'},
        {q:'Comment présenter la demande annuelle?',a:'Séparez les quantités fermes des estimations et des livraisons futures facultatives. Indiquez la période prévue et les changements. Une prévision ne réserve pas de stock et ne constitue pas une commande.'},
        {q:'Faut-il compter les appareils de formation parmi les unités opérationnelles?',a:'Conservez des lignes d’achat et d’inventaire distinctes, avec leurs propres références. Un appareil de formation ne remplace pas un appareil opérationnel d’évacuation.'}
      ]}
    },
    comparison:{
      en:{sections:[
        ['Use a decision record, not a winner’s badge','Start your comparison with the intended use and required documentation. For each candidate, record the exact variant, breathing system, rating basis, carrying or storage arrangement, dedicated trainer and confirmed support route. Mark each field “confirmed”, “awaiting evidence” or “not applicable”. Leave price and lead time as quotation-dependent fields.'],
        ['Keep the manufacturer’s rating context','Ocenco lists different NIOSH and European duration ratings for the M-20.2 and identifies a separate M-20.2T trainer. That illustrates why a model-family name and a single number are not enough for a purchasing comparison. Check the supplied variant and its documents rather than combining specifications from different versions.']
      ],faq:[
        {q:'Which EEBD is best for a Canadian vessel?',a:'There is no single answer based on country or rated minutes alone. The responsible team must assess the application and required approvals, then confirm the exact variant, documents and support arrangements.'},
        {q:'Can a similar-looking model satisfy the same specification?',a:'Appearance and a shared EEBD label do not establish equivalence. Ask for the exact product identity and supporting evidence, and obtain acceptance from the party responsible for the requirement.'}
      ],sources:[['Ocenco — M-20.2 specifications and trainer','https://www.ocenco.com/products/m-202/']]},
      fr:{sections:[
        ['Utiliser un dossier de décision','Commencez par l’usage prévu et les documents exigés. Pour chaque candidat, notez la variante, le système respiratoire, la base de classification, le port ou le rangement, l’appareil de formation et le soutien confirmé. Classez chaque point comme « confirmé », « preuve attendue » ou « sans objet ». Les prix et les délais restent soumis à une soumission.'],
        ['Conserver le contexte de la classification','Ocenco indique des durées NIOSH et européennes distinctes pour le M-20.2 ainsi qu’un appareil de formation M-20.2T séparé. Le nom d’une famille et un seul chiffre ne suffisent donc pas pour comparer un achat. Vérifiez la variante livrée et ses documents sans combiner les caractéristiques de versions différentes.']
      ],faq:[
        {q:'Quel EEBD convient le mieux à un navire canadien?',a:'Le pays et la durée nominale ne suffisent pas à répondre. L’équipe responsable doit évaluer l’application et les homologations exigées, puis confirmer la variante, les documents et le soutien.'},
        {q:'Un appareil semblable peut-il satisfaire la même spécification?',a:'L’apparence et la désignation EEBD ne démontrent pas l’équivalence. Demandez l’identité exacte du produit et les preuves, puis l’acceptation de la personne responsable des exigences.'}
      ],sources:[['Ocenco — caractéristiques du M-20.2 et appareil de formation','https://www.ocenco.com/products/m-202/']]}
    }
  };
  for(const [id,locales] of Object.entries(additions))for(const [locale,addition] of Object.entries(locales)) {
    const page=pages[id][locale];page.sections.push(...addition.sections);page.faq=[...(page.faq || []),...addition.faq];
    if(addition.sources)page.sources=[...(page.sources || []),...addition.sources];
  }
  for(const locale of ['en','fr'])pages.resources[locale].sections.push(locale==='fr'?
    ['Choisir le bon point de départ','Vous préparez une première demande? Consultez le guide de soumission. Vous avez plusieurs destinations ou un programme de remplacement? Utilisez le guide d’achat de flotte et le modèle de liste d’achat. Pour distinguer les modèles et leurs configurations, commencez par la comparaison des appareils.']:
    ['Choose your starting point','Preparing a first enquiry? Use the quotation guide. Managing several destinations or a replacement programme? Use the fleet procurement guide and purchasing-list template. To understand differences between models and configurations, start with the product comparison.']);
}
