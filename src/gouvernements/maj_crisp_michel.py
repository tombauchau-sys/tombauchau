# 2 novembre 2026 (soir) : contrôle De Croo par le CRISP (Courriers hebdomadaires 2563 et 2621, PDF déposés par Tom),
# résumé de l'accord Michel I (DOC 54 0020/001) et de la déclaration Di Rupo (DOC 53 0020/001).
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
CR22 = ['CRISP, L’année politique 2022 au niveau fédéral (CH 2563)', 'https://www.crisp.be/2023/09/lannee-politique-2022-au-niveau-federal/']
CR23 = ['CRISP, L’année politique 2023 au niveau fédéral (CH 2621)', 'https://www.crisp.be/fr/catalogue/2139-lannee-politique-2023-au-niveau-federal.html']

def m(date, date_txt, d, titre, texte, src, v='reference', ref='', verif=''):
    x = {'date': date, 'date_txt': date_txt, 'd': d, 'titre': titre, 'texte': texte, 'src': src, 'v': v}
    if ref: x['ref'] = ref
    if verif: x['verif'] = verif
    return x

# ---------- De Croo : corrections et ajouts ----------
dc = G['de-croo']
for x in dc['mesures']:
    t = x['titre']
    if t.startswith('Réforme des pensions'):
        x['texte'] = 'Deux compromis politiques : le 19 juillet 2022 (bonus pension, condition de carrière effective pour la pension minimum, meilleure prise en compte du temps partiel), puis le 10 juillet 2023, un « accord a minima » selon le CRISP (plafonnement de la péréquation des pensions des fonctionnaires, coût du vieillissement réduit de 0,5 % du PIB à l’horizon 2070). La loi de 2024 crée le bonus pension (constitué à partir du 1er juillet 2024) et exige, dès 2025, 5 000 jours de travail effectif à temps plein (environ 16 ans) ou 3 120 jours à temps partiel pour la pension minimum, en plus de 30 ans de carrière.'
        x['src'] = [s for s in x['src'] if 'crisp' not in s[1]] + [CR22, CR23]
    if t.startswith('Aides énergie'):
        x['texte'] = 'TVA ramenée de 21 % à 6 % sur l’électricité dès le 1er mars 2022 et sur le gaz dès le 1er avril, prolongée ensuite jusqu’au 31 mars 2023 ; accise sur l’essence et le diesel réduite de 17,5 cents par litre ; prime énergie de 100 € par ménage ; chèque mazout annoncé à 200 € en mars 2022 et fixé à 225 € par la loi du 26 juin 2022, porté à 300 € en novembre 2022.'
        x['src'].append(CR22)
    if t.startswith('Forfait de base'):
        x['texte'] = 'Pour les ménages titulaires d’un contrat variable : réduction de 122 € sur l’électricité et de 270 € sur le gaz pour novembre et décembre 2022 (mise en place à partir de décembre), puis de 183 € et 405 € pour janvier à mars 2023 ; cette seconde prime est en partie récupérée par une cotisation spéciale au-delà de 62 000 € de revenus imposables (125 000 € pour un couple).'
        x['src'].append(CR22)
    if t.startswith('Prolongation de Doel'):
        x['texte'] += ' Les étapes : décision du 18 mars 2022, lettre d’intention avec Engie le 21 juillet 2022, accord du 28 juin 2023 (redémarrage entre novembre 2025 et novembre 2026, investissements partagés par moitié), cadre juridique validé en décembre 2023.'
        x['src'].append(CR23)
dc['mesures'] += [
    m('2022-06-18', 'Juin 2022', 'eco', 'Défense : 2 % du PIB d’ici 2035',
      'Le gouvernement s’engage à consacrer 2 % du PIB à la défense d’ici 2035 (le plan STAR prévoyait 1,54 % en 2030, contre 1,04 % en 2021), avec une hausse étalée : 44 millions d’euros en 2023, 205 millions en 2024, 836 millions en 2025.', [CR22]),
    m('2022-10-11', 'Octobre 2022', 'eco', 'Budget 2023-2024 : effort de 3,6 milliards',
      'Effort budgétaire de 3,6 milliards d’euros (0,6 % du PIB) sur 2023-2024 ; coûts patronaux des indexations neutralisés aux deux premiers trimestres de 2023 ; relèvement de la taxe bancaire ; investissements supplémentaires dans le rail ; une partie de l’enveloppe bien-être sert à relever le salaire minimum. Budget 2023 voté le 22 décembre 2022.', [CR22]),
    m('2022-12-16', 'Décembre 2022', 'social', 'Nouveau statut des travailleurs des arts',
      'Une « Commission du travail des arts » reconnaît désormais les artistes, à la place de l’ONEM, pour leur accès au chômage (accord du 4 mai 2022, loi du 16 décembre 2022).', [CR22], verif='Numac de la loi du 16 décembre 2022 non trouvé.'),
    m('2023-01-13', 'Janvier 2023', 'social', 'Plan contre la fraude sociale 2023-2024',
      'Six mille enquêtes contre le dumping social, renfort de personnel à l’ONSS, à l’ONEM, à l’INASTI et au SPF Emploi ; délai de prescription porté de 7 à 10 ans.', [CR23]),
    m('2023-10-09', 'Octobre 2023', 'eco', 'Budget 2024 : effort de 1,7 milliard',
      'Accord du 9 octobre 2023 : effort de 1,7 milliard d’euros, dont 1,2 milliard pour améliorer le solde ; contrôles fiscaux renforcés, accises sur le tabac relevées, 150 millions demandés au secteur bancaire ; flexi-jobs étendus à douze nouveaux secteurs avec une cotisation patronale de 28 % ; revalorisation du salaire minimum. La Commission européenne signale en novembre un risque de non-conformité (déficit prévu de 4,6 % du PIB).', [CR23]),
]
for c in dc['contexte']:
    if c['date'] == '2022-2023':
        c['texte'] = 'Crise de l’accueil des demandeurs d’asile : réseau saturé, Fedasil condamnée plus de 7 500 fois dès janvier 2023 et la Belgique condamnée par la Cour européenne des droits de l’homme le 18 juillet 2023 ; 2 000 places supplémentaires créées en mars 2023. En 2022, plus de 60 000 réfugiés ukrainiens reçoivent une protection temporaire.'
        c['src'] = [CR22, CR23]
    if c['date'] == '2023':
        c['texte'] = 'La large réforme fiscale prévue par l’accord échoue : déposé en octobre 2022, le projet est réduit de 6 à 2 milliards d’euros, puis le comité ministériel restreint du 18 juillet 2023 « ne peut qu’acter l’échec ». Le CRISP y voit « l’un des échecs les plus marquants » du gouvernement.'
        c['src'] = [CR23]

# ---------- Michel I : accord ----------
mi = G['michel-1']['accord']
mi['titre'] = 'Accord de gouvernement'
mi['date'] = '9 octobre 2014 (pied de page : 10 octobre 2014)'
mi['resume'] = [
    '<b>Budget</b> : équilibre structurel en 2018 ; assainissement entièrement par des économies dans les dépenses, sans hausse de la pression fiscale et parafiscale globale.',
    '<b>Compétitivité</b> : saut d’index en 2015 et modération salariale ; baisse du coût du travail de quatre milliards d’euros ; cotisations patronales ramenées de 33 % à 25 % ; handicap salarial accumulé depuis 1996 résorbé avant la fin de la législature.',
    '<b>Emploi et chômage</b> : taux d’emploi de 73,2 % ; dégressivité renforcée des allocations de chômage poursuivie ; allocations d’insertion demandées avant 25 ans ; prépension (RCC) portée de 60 à 62 ans en 2015.',
    '<b>Pensions</b> : âge légal porté à 66 ans en 2025 et 67 ans en 2030 ; pension anticipée à 62,5 ans en 2017 et 63 ans en 2018 avec 41 puis 42 ans de carrière ; système à points au plus tard en 2030 ; bonus de pension supprimé en 2015.',
    '<b>Fiscalité</b> : « tax shift » allégeant le travail, financé notamment par les accises (tabac, diesel), la TVA et un impôt de transparence sur les trusts ; frais professionnels forfaitaires relevés dès 2015.',
    '<b>Santé et social</b> : norme de croissance des soins de 1,5 % au-delà de l’inflation ; allocations minimales portées progressivement au seuil de pauvreté européen ; enveloppes bien-être affectées à 100 %.',
    '<b>Énergie</b> : Doel 1 et 2 prolongés jusqu’en 2015 et 2016, exploitation ne dépassant pas 2025 ; sortie du nucléaire de la génération actuelle de réacteurs en 2025.',
    '<b>Sécurité, migration, institutions</b> : pas de nouvelle réforme de l’État pendant la législature ; « toutes les peines seront exécutées » ; décision d’asile en six mois au plus ; plus de régularisation collective ; décision sur le successeur du F-16.',
]
mi['chapitres'] = [
    {'t': 'Déclaration gouvernementale', 'p': '3-14', 'pts': [
        'Équilibre budgétaire structurel en 2018 ; « la pression fiscale et parafiscale globale ne peut pas augmenter et celle sur le travail doit diminuer ».',
        'Baisse de quatre milliards d’euros du coût du travail ; cotisations patronales de 33 % à 25 % ; saut d’index corrigé pour les revenus les plus faibles ; indexation automatique maintenue.',
        'Âge légal de la pension à 65 ans pendant la législature, puis 67 ans à partir de 2030 ; soins de santé : 1,5 % de croissance au-delà de l’inflation (2,2 % en 2015).']},
    {'t': '1. Emploi et compétitivité', 'p': '17-41', 'pts': [
        'Saut d’index en 2015, modération salariale en 2015-2016 ; révision de la loi de 1996 sur la norme salariale.',
        'Cotisations patronales ramenées à un taux de base de 25 %, objectif inscrit dans la loi.',
        'Prépension (RCC) de 60 à 62 ans au 1er janvier 2015 ; crédit-temps sans motif supprimé ; dégressivité renforcée du chômage poursuivie ; service à la collectivité pour les chômeurs de longue durée.',
        'Plan de réinsertion au plus tard trois mois après le début d’une incapacité de travail ; charges administratives réduites de 30 %.']},
    {'t': '2. Réforme des pensions', 'p': '42-56', 'pts': [
        'Âge légal porté à 66 ans en 2025 et à 67 ans en 2030 ; pension anticipée à 62,5 ans en 2017 et 63 ans en 2018, avec 41 puis 42 ans de carrière.',
        'Système de pension à points au plus tard en 2030 ; Comité national des pensions tripartite ; bonus de pension supprimé au 1er janvier 2015.',
        'Pension minimum pour une carrière complète supérieure d’au moins 10 % au seuil de pauvreté ; pension complémentaire d’au moins 3 % du salaire visée.']},
    {'t': '3. Progrès social et soins de santé', 'p': '57-91', 'pts': [
        'Allocations minimales portées progressivement au seuil de pauvreté européen ; enveloppes bien-être affectées à 100 %.',
        'Tiers payant obligatoire chez le généraliste dès le 1er juillet 2015 pour les bénéficiaires de l’intervention majorée ; dossier patient électronique généralisé ; réforme du financement des hôpitaux.']},
    {'t': '4. Finances', 'p': '92-106', 'pts': [
        '« Tax shift » : réduction des charges sur le travail sans détériorer le budget ; hausse des frais professionnels forfaitaires dès le début de la législature.',
        'Accises sur le tabac et le diesel relevées ; prélèvement sur l’épargne-pension de 10 % à 8 % ; impôt de transparence sur les trusts ; datamining pour les contrôles fiscaux.']},
    {'t': '5. Énergie, environnement, politique scientifique', 'p': '107-121', 'pts': [
        'Doel 1 et 2 prolongés jusqu’au 31 mars 2015 et 2016, exploitation au plus tard jusqu’en 2025 ; sortie du nucléaire de la génération actuelle en 2025 ; décision sur la prolongation décennale au plus tard fin 2014.',
        'Norme énergétique : coûts pas plus élevés que chez les voisins ; Fonds Kyoto supprimé ; pacte énergétique interfédéral à partir de fin 2015.']},
    {'t': '6. Justice et sécurité', 'p': '122-163', 'pts': [
        '« Toutes les peines seront exécutées » ; masterplans prisons exécutés ; révision du Code pénal ; « plaider coupable ».',
        'Aide juridique dans une enveloppe fermée avec ticket modérateur ; prescription portée à 20 ans pour certains crimes graves.',
        'Armée déployable à partir du niveau de menace 3 ; extension de la déchéance de nationalité pour les binationaux liés au terrorisme.']},
    {'t': '7. Asile et migration', 'p': '164-175', 'pts': [
        'Décision d’asile définitive en six mois au plus ; aide exclusivement matérielle ; « il n’y aura plus de régularisation collective ».',
        'Regroupement familial contrôlé pendant cinq ans ; extension des centres fermés ; retour « volontaire si possible, forcé si nécessaire ».']},
    {'t': '8. Fonction publique et entreprises publiques', 'p': '176-194', 'pts': [
        'Remplacement sélectif des départs ; suppression des SPP et réduction du nombre de SPF et d’organismes ; 3 % de personnes handicapées dans l’administration.']},
    {'t': '9. Politique internationale et défense', 'p': '195-224', 'pts': [
        'Coopération au développement visant 0,7 % du revenu national brut « dans la mesure des possibilités budgétaires », quinze pays partenaires au plus.',
        'Défense : loi de programmation militaire sur dix ans ; décision sur le successeur du F-16, sans nombre d’appareils ni montant dans l’accord.']},
    {'t': '10-11. Mobilité et thèmes transversaux', 'p': '225-244', 'pts': [
        'Service garanti en cas de grève dans le rail ; contrats de gestion de la SNCB et d’Infrabel de six ans ; morts sur les routes réduits de 50 % entre 2010 et 2020.',
        'Ratification de la convention d’Istanbul ; mécanisme national des droits de l’homme.']},
]
mi['lecture'] = 'Résumé établi sur le texte intégral de la colonne française du document (pages 3 à 244 du document de la Chambre).'

# ---------- Di Rupo : déclaration ----------
dr = G['di-rupo']['accord']
dr['titre'] = 'Accord de gouvernement (texte complet à verser) ; déclaration du gouvernement du 7 décembre 2011'
dr['doc'] = 'Chambre, DOC 53 0020/001 (déclaration seule, 7 décembre 2011)'
dr['resume'] = [
    '<b>Réforme de l’État</b> : scission de l’arrondissement électoral de Bruxelles-Hal-Vilvorde ; nouvelle loi spéciale de financement ; moyens propres des Régions et Communautés portés d’environ 46 à 63 milliards d’euros, avec autonomie fiscale.',
    '<b>Budget</b> : déficit ramené à 2,8 % du PIB dès 2012, équilibre en 2015 ; effort fédéral de 11,3 milliards d’euros en 2012.',
    '<b>Emploi</b> : taux d’emploi de 73,2 % en 2020 ; dégressivité des allocations de chômage accélérée ; indexation automatique maintenue.',
    '<b>Pensions</b> : âge légal maintenu à 65 ans ; révision de la prépension et de la retraite anticipée.',
    '<b>Énergie</b> : confirmation de la sortie progressive du nucléaire, sans calendrier dans la déclaration.',
]
dr['note'] = 'Ce document est la déclaration du Premier ministre, qui renvoie lui-même au texte complet de l’accord de gouvernement. Le résumé sera complété quand ce texte aura été lu.'
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(dc['mesures']))
