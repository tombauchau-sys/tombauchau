# Mise à jour des fiches pilotes De Croo et De Wever (méthode du 2 novembre 2026) :
# chaque loi ancrée au Moniteur belge (numac) et au dossier de la Chambre, sélection contrôlée,
# repères chiffrés de début et de fin de mandat. À exécuter une fois : python3 maj_pilote.py
import json
from pathlib import Path

F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}

CH = 'https://www.lachambre.be/FLWB/html/{l}/F/{l}K{n}.html'


def chambre(leg, n):
    return ['Chambre, dossier DOC ' + leg + ' ' + n, CH.format(l=leg, n=n)]


def eli(kind, d, numac):
    y, m, j = d.split('-')
    return ['Moniteur belge (numac ' + numac + ')', f'https://www.ejustice.just.fgov.be/eli/{kind}/{y}/{m}/{j}/{numac}/justel']


def cc(n, y, lab):
    return ['Cour constitutionnelle, arrêt ' + lab, f'https://fr.const-court.be/public/f/{y}/{y}-{n:03d}f-info.pdf']


def m(date, date_txt, d, titre, texte, src, v='officiel', ref='', verif=''):
    x = {'date': date, 'date_txt': date_txt, 'd': d, 'titre': titre, 'texte': texte, 'src': src, 'v': v}
    if ref:
        x['ref'] = ref
    if verif:
        x['verif'] = verif
    return x


# ---------------- De Croo ----------------
dc = G['de-croo']
dc['accord']['resume'] = [
    '<b>Emploi</b> : un taux d’emploi d’au moins 80 % en 2030 (l’inactivité des 25-64 ans est alors de 22,8 %) ; droit à cinq jours de formation par an et par équivalent temps plein.',
    '<b>Pensions</b> : relever progressivement la pension minimum vers 1 500 € nets pour une carrière complète ; carrière minimale de 30 ans et condition de travail effectif à fixer ; bonus de pension ; suppression du coefficient de correction des indépendants.',
    '<b>Santé</b> : norme de croissance du budget des soins fixée à 2,5 % à partir de 2022 ; 1,2 milliard d’euros de moyens supplémentaires, dont un fonds de 402 millions pour le personnel soignant ; d’ici 2030, réduire d’au moins 25 % les inégalités de santé et de 15 % la mortalité évitable.',
    '<b>Investissement</b> : plan de relance et d’investissement de 4,7 milliards d’euros ; investissement public porté de 2,6 % du PIB (2019) à 4 % en 2030.',
    '<b>Pauvreté</b> : augmenter les allocations sociales en direction du seuil de pauvreté ; ouverture automatique des droits.',
    '<b>Climat et énergie</b> : −55 % d’émissions de gaz à effet de serre en 2030, neutralité climatique en 2050 ; respect du calendrier légal de sortie du nucléaire.',
    '<b>État</b> : préparer une nouvelle structure de l’État à partir de 2024.',
]
dc['accord']['note'] = 'Résumé établi sur la déclaration gouvernementale et les chapitres 1 et 2 (début) de l’accord ; les chapitres suivants (fiscalité, budget, énergie, justice, migration…) sont en cours de lecture.'
dc['bilan'] = {'debut': 2020, 'fin': 2024, 'lignes': [
    ['Taux d’emploi des 20-64 ans', '69,7 %', '72,3 %', '__EMPLOI__#f-emploi'],
    ['Dette publique (% du PIB)', '111,4 %', '104,0 %', '__FINANCES__#f-dette'],
    ['Solde public (% du PIB)', '−9,0 %', '−4,4 %', '__FINANCES__#f-deficit']],
    'note': '2020 est l’année du choc du Covid-19. Ces chiffres décrivent la situation, ils ne mesurent pas l’effet du gouvernement : ils dépendent aussi de la conjoncture, des crises et des décisions des autres niveaux de pouvoir. Sources : Eurostat (lfsi_emp_a, gov_10dd_edpt1).'}
dc['contexte'] = [
    {'date': '2020', 'texte': 'Le gouvernement s’installe en pleine crise du Covid-19, 494 jours après les élections.'},
    {'date': '24 février 2022', 'texte': 'Invasion de l’Ukraine par la Russie ; flambée des prix de l’énergie en 2021-2022.'},
]
dc['mesures'] = [
    m('2020-12-30', 'Décembre 2020', 'social', 'Congé de naissance allongé',
      'Le congé du second parent passe de 10 à 15 jours pour les naissances à partir du 1er janvier 2021, puis à 20 jours à partir du 1er janvier 2023. Les trois premiers jours sont payés par l’employeur, les suivants par l’assurance maladie.',
      [eli('loi', '2020-12-20', '2020044541'), chambre('55', '1662'), ['SPF Emploi', 'https://emploi.belgique.be/fr/actualites/extension-du-conge-de-naissance-partir-du-1er-janvier-2021']],
      ref='Loi-programme du 20 décembre 2020, art. 63-64 ; Moniteur belge du 30 décembre 2020'),
    m('2020-12-30', 'Décembre 2020', 'social', 'Norme de croissance des soins de santé à 2,5 %',
      'La même loi-programme fixe l’objectif budgétaire de l’assurance soins de santé : à partir de 2022, celui de l’année précédente plus 2,5 % de croissance réelle et l’indexation. Le budget 2022 dépasse ainsi 36 milliards d’euros.',
      [eli('loi', '2020-12-20', '2020044541'), ['INAMI, 18 octobre 2021', 'https://www.inami.fgov.be/fr/presse/budget-2022-de-l-assurance-soins-de-sante-plus-de-36-milliards-d-euros-pour-des-soins-de-sante-durables']],
      ref='Loi-programme du 20 décembre 2020, art. 24 (art. 40 de la loi relative à l’assurance soins de santé)'),
    m('2020-12-31', '2021 à 2024', 'social', 'Hausse par étapes de la pension minimum et de la GRAPA',
      'Hausses annuelles du 1er janvier 2021 au 1er janvier 2024 (GRAPA : +2,58 % par an hors indexation). Au 1er janvier 2021, la pension minimum d’un salarié isolé est de 15 911,02 € par an. Selon le Service fédéral des Pensions, l’objectif de 1 500 € nets pour une carrière complète est dépassé en 2024, en partie grâce à l’indexation ; selon le SPF Sécurité sociale, la GRAPA atteint alors le seuil de risque de pauvreté.',
      [['SPF Sécurité sociale, BELMOD 2024', 'https://socialsecurity.belgium.be/sites/default/files/content/docs/fr/elaboration-politique-sociale/belmod/ladequation_des_prestations_dassistance_sociale.pdf'], ['Service fédéral des Pensions', 'https://www.sfpd.fgov.be/fr/changements/reforme-des-pensions-2021-2024']],
      ref='Arrêtés royaux du 20 décembre 2020 (pension minimum et GRAPA) ; Moniteur belge du 31 décembre 2020',
      verif='Numac des deux arrêtés royaux du 20 décembre 2020 non trouvés (cités dans un avis du SPF Sécurité sociale, numac 2021200711).'),
    m('2021-01-13', '2021 à 2024', 'social', 'Hausse des autres minima sociaux',
      'Allocations de chômage minimales relevées en quatre paliers (isolé : de 29,61 € à 30,96 € par jour au 1er janvier 2021) ; revenu d’intégration et allocation de remplacement de revenus : +2,68 % par an prévus. Selon le SPF Sécurité sociale, le calendrier est respecté en 2021 et 2022, moins en 2023 ; en 2024, seule l’allocation de remplacement augmente. Ces minima restent sous le seuil de risque de pauvreté.',
      [eli('arrete', '2020-12-22', '2021200056'), ['SPF Sécurité sociale, BELMOD 2024', 'https://socialsecurity.belgium.be/sites/default/files/content/docs/fr/elaboration-politique-sociale/belmod/ladequation_des_prestations_dassistance_sociale.pdf']],
      ref='Arrêté royal du 22 décembre 2020 (minima de chômage) ; Moniteur belge du 13 janvier 2021'),
    m('2021-01-27', 'Janvier 2021', 'social', 'Prime pour les chômeurs temporaires de longue durée',
      'Au moins 53 jours de chômage temporaire entre mars et novembre 2020 : 10 € par jour au-delà du 52e, 150 € au minimum. Les mesures de soutien liées au Covid-19 (chômage temporaire, droit passerelle), créées en mars 2020, sont prolongées par plusieurs lois jusqu’en 2022.',
      [eli('arrete', '2021-01-20', '2021020167'), ['ONEM, 18 décembre 2020', 'https://www.onem.be/actualites/2020/12/18/prime-supplementaire-pour-les-chomeurs-temporaires-de-longue-duree-chomage-temporaire-du-a-la-crise-du-covid-19']],
      ref='Arrêté royal du 20 janvier 2021 ; Moniteur belge du 27 janvier 2021'),
    m('2021-02-01', '1er février 2021', 'social', 'Tarif social de l’énergie élargi',
      'Le tarif social du gaz et de l’électricité est étendu aux bénéficiaires de l’intervention majorée, d’abord jusqu’à fin 2021, puis prolongé jusqu’au 1er avril 2023 ; forfait unique de 80 € pour les clients protégés (loi du 15 décembre 2021).',
      [eli('arrete', '2021-01-28', '2021040211'), ['CREG', 'https://www.creg.be/fr/actualites/elargissement-temporaire-des-beneficiaires-du-tarif-social-a-partir-du-1er-fevrier-2021']],
      ref='Arrêté royal du 28 janvier 2021 ; Moniteur belge du 1er février 2021'),
    m('2021-02-25', 'Février 2021', 'eco', 'Taxe annuelle sur les comptes-titres',
      '0,15 % de la valeur moyenne des comptes-titres au-delà d’un million d’euros, plafonnée à 10 % de la partie qui dépasse ce seuil. En 2022, la Cour constitutionnelle annule la clause anti-abus spécifique et l’effet rétroactif de la clause générale, et valide le reste.',
      [eli('loi', '2021-02-17', '2021040569'), chambre('55', '1708'), cc(138, 2022, '138/2022')],
      ref='Loi du 17 février 2021 ; Moniteur belge du 25 février 2021'),
    m('2021-08-09', '2021-2024', 'social', 'Marge salariale de 0,4 %, puis de 0 %',
      'Faute d’accord des partenaires sociaux, le gouvernement fixe la hausse maximale des salaires, au-delà de l’indexation, à 0,4 % pour 2021-2022 ; elle est de 0 % pour 2023-2024, avec une prime pouvoir d’achat de 500 € ou 750 € selon les bénéfices de l’entreprise en 2023.',
      [eli('arrete', '2021-07-30', '2021021164'), eli('arrete', '2023-04-23', '2023202158')],
      ref='Arrêté royal du 30 juillet 2021 (Moniteur belge du 9 août 2021) ; arrêté royal du 23 avril 2023 sur la prime pouvoir d’achat',
      verif='Arrêté royal fixant la marge de 0 % pour 2023-2024 non trouvé (chiffre tiré du rapport au Roi de l’arrêté du 23 avril 2023).'),
    m('2021-12-17', '2021-2022', 'social', 'Retour au travail des malades de longue durée',
      'Création du trajet « retour au travail » auprès des mutualités (1er janvier 2022) ; sanction d’au plus 2,5 % de l’indemnité en cas de non-collaboration (2023) ; possibilité de s’absenter un jour sans certificat trois fois par an ; « force majeure médicale » possible après neuf mois d’incapacité.',
      [eli('loi', '2021-12-12', '2021043466'), eli('loi', '2022-09-25', '2022033623'), eli('loi', '2022-10-30', '2022206608')],
      ref='Lois du 12 décembre 2021, du 25 septembre 2022 et du 30 octobre 2022'),
    m('2022-03-30', 'Mars-octobre 2022', 'eco', 'Aides énergie de 2022',
      'TVA ramenée de 21 % à 6 % sur l’électricité dès le 1er mars 2022 et sur le gaz du 1er avril au 30 septembre 2022 ; accise sur l’essence et le diesel réduite de 17,5 cents par litre ; prime chauffage de 100 € par ménage ; allocation mazout de 225 €, portée à 300 € en novembre 2022.',
      [eli('arrete', '2022-03-23', '2022020620'), eli('loi', '2022-02-28', '2022040472'), eli('loi', '2022-06-26', '2022032653'), ['Conseil des ministres, 15 mars 2022', 'https://news.belgium.be/fr/le-gouvernement-prend-de-nouvelles-mesures-de-lutte-contre-la-hausse-des-prix-de-lenergie']],
      ref='Loi du 28 février 2022 ; arrêté royal du 23 mars 2022 ; loi du 26 juin 2022',
      verif='Texte ayant ramené la TVA sur l’électricité à 6 % au 1er mars 2022 non trouvé (date tirée du Conseil des ministres).'),
    m('2022-11-03', 'Novembre 2022-mars 2023', 'social', 'Forfait de base énergie',
      'Réduction de 122 € sur l’électricité et de 270 € sur le gaz pour novembre et décembre 2022, puis de 183 € et 405 € pour janvier à mars 2023 ; cette seconde prime est en partie récupérée par une cotisation spéciale au-delà de 62 000 € de revenus imposables (125 000 € pour un couple).',
      [eli('loi', '2022-10-30', '2022042479'), eli('loi', '2022-12-19', '2022043068'), ['SPF Économie, 28 octobre 2022', 'https://news.economie.fgov.be/219713-energie-a-quelles-mesures-de-soutien-avez-vous-droit/']],
      ref='Lois du 30 octobre 2022 et du 19 décembre 2022'),
    m('2022-11-10', '10 novembre 2022', 'social', '« Deal pour l’emploi »',
      'Semaine de quatre jours ou horaire alterné à la demande du travailleur (sans réduction du temps de travail) ; droit à la déconnexion dans les entreprises de 20 travailleurs ou plus ; présomption de contrat de travail pour les travailleurs de plateformes ; droit à la formation de 4 jours en 2023 et 5 jours à partir de 2024 ; horaires variables communiqués sept jours ouvrables à l’avance.',
      [eli('loi', '2022-10-03', '2022206360'), chambre('55', '2810'), ['SPF Emploi', 'https://emploi.belgique.be/fr/actualites/deal-pour-lemploi-publication-des-mesures']],
      ref='Loi du 3 octobre 2022 portant des dispositions diverses relatives au travail ; Moniteur belge du 10 novembre 2022'),
    m('2022-12-22', 'Décembre 2022', 'eco', 'Contributions sur les « surprofits » de l’énergie',
      'Recettes des producteurs d’électricité plafonnées à 130 €/MWh (180 € dans certains cas) du 1er août 2022 au 30 juin 2023, l’excédent étant prélevé ; contribution de solidarité du secteur pétrolier pour 2022 et 2023 (6,9 € par tonne de brut raffiné, 7,8 € par m³ de carburant). En 2024, la Cour constitutionnelle interroge la Cour de justice de l’Union sur le plafond.',
      [eli('loi', '2022-12-16', '2022043067'), eli('loi', '2022-12-16', '2022043066'), cc(67, 2024, '67/2024')],
      ref='Deux lois du 16 décembre 2022 ; Moniteur belge du 22 décembre 2022'),
    m('2023-03-29', '1er avril 2023', 'eco', 'TVA à 6 % permanente et « cliquet » sur l’énergie',
      'Le taux de 6 % sur l’électricité et le gaz devient permanent pour les contrats résidentiels, compensé par une accise variable : elle baisse quand le prix du gaz dépasse 100 €/MWh (250 €/MWh pour l’électricité) et remonte quand il redescend.',
      [eli('loi', '2023-03-19', '2023030776'), chambre('55', '3151'), ['Conseil des ministres, 28 octobre 2022', 'https://news.belgium.be/fr/reforme-de-la-fiscalite-sur-la-facture-denergie']],
      ref='Loi du 19 mars 2023 portant réforme de la fiscalité sur la facture d’énergie ; Moniteur belge du 29 mars 2023'),
    m('2023-12-29', 'Décembre 2023', 'eco', 'Mesures fiscales du budget 2024',
      'Bonus fiscal à l’emploi relevé ; taxe bancaire dont le coût ne peut être répercuté sur les clients ; flexi-jobs : cotisation patronale portée de 25 % à 28 %, revenus exonérés plafonnés à 12 000 € par an pour les non-pensionnés, et extension à de nouveaux secteurs au 1er janvier 2024.',
      [eli('loi', '2023-12-22', '2023048600')],
      ref='Loi-programme du 22 décembre 2023 ; Moniteur belge du 29 décembre 2023',
      verif='Liste des secteurs ouverts aux flexi-jobs en 2024 : article de la loi non lu.'),
    m('2024-05-16', '2024-2025', 'social', 'Réforme des pensions : bonus et travail effectif',
      'Bonus pension pour ceux qui continuent à travailler (constitué à partir du 1er juillet 2024) ; à partir de 2025, la pension minimum exige, en plus de 30 ans de carrière, au moins 5 000 jours de travail effectif à temps plein (environ 16 ans) ou 3 120 jours à temps partiel.',
      [eli('loi', '2024-04-25', '2024202431'), chambre('55', '3808'), ['Service fédéral des Pensions et INASTI, 5 avril 2024', 'https://www.sfpd.fgov.be/files/3095/20240405_communique_reforme-des-pension_web.pdf']],
      ref='Loi du 25 avril 2024 portant la réforme des pensions ; Moniteur belge du 16 mai 2024 ; votée le 4 avril 2024'),
    m('2024-06-05', 'Avril-juin 2024', 'eco', 'Prolongation de Doel 4 et Tihange 3',
      'Dix ans d’exploitation supplémentaires pour les deux réacteurs, dont l’État porte indirectement 44,9 % ; la facture future des déchets nucléaires d’Engie est forfaitisée à 15 milliards d’euros.',
      [eli('loi', '2024-04-26', '2024003970'), chambre('55', '3852')],
      ref='Loi du 26 avril 2024 ; Moniteur belge du 5 juin 2024'),
    m('2024-07-26', '26 juillet 2024', 'eco', 'Procédure européenne de déficit excessif',
      'Le Conseil de l’Union constate un déficit excessif en Belgique (4,4 % du PIB en 2023). Le gouvernement est alors en affaires courantes : la correction revient au gouvernement suivant.',
      [['Conseil de l’UE, 26 juillet 2024', 'https://www.consilium.europa.eu/en/press/press-releases/2024/07/26/stability-and-growth-pact-council-launches-excessive-deficit-procedures-against-seven-member-states/']]),
]

# ---------------- De Wever ----------------
dw = G['de-wever']
dw['accord']['resume'] = [
    '<b>Budget</b> : effort d’environ 18 milliards d’euros, plus environ 5 milliards pour des politiques nouvelles ; déficit sous 3 % du PIB d’ici 2030 ; plus des deux tiers de l’effort par des réformes structurelles (travail, pensions), le reste surtout par la maîtrise des dépenses ; pas de hausse de la pression fiscale.',
    '<b>Emploi</b> : se rapprocher d’un taux d’emploi de 80 % d’ici 2029 (72,1 % en 2023) ; au moins 500 € nets par mois d’écart entre travailler et ne pas travailler ; salaire minimum relevé en deux étapes.',
    '<b>Chômage</b> : un an d’allocations pour un an de travail sur trois ans, un mois de plus par tranche de quatre mois travaillés, deux ans au plus ; exception à partir de 55 ans avec 30 ans de carrière (35 ans en 2030).',
    '<b>Travail</b> : flexi-jobs plafonnés à 18 000 € par an ; 360 heures supplémentaires volontaires, dont 240 « brut = net » ; retour de la période d’essai ; employeurs payant 30 % des indemnités de maladie pendant deux mois.',
    '<b>Pensions</b> : bonus et malus selon l’âge de départ, prise en compte du travail effectif, alignement progressif des pensions des fonctionnaires ; départ possible à 60 ans après 42 ans de carrière.',
    '<b>Fiscalité</b> : 10 % sur les plus-values financières futures (exonération de 10 000 €) ; pour les participations d’au moins 20 %, barème de 1,25 % à 10 % au-delà d’un million ; carried interest taxé à 30 % au plus ; 1,5 milliard de baisse de charges, dont 1 milliard pour les bas salaires ; indexation automatique et loi sur la norme salariale maintenues.',
    '<b>Défense et institutions</b> : trajectoire « vers 2 % du PIB et au-delà », financée en partie par un fonds de défense ; suppression du Sénat aux prochaines élections ; préparation d’une réforme de l’État pour la législature suivante.',
    '<b>Migration et énergie</b> : regroupement familial plus strict ; cinq ans d’attente avant le revenu d’intégration pour les nouveaux arrivants ; abrogation de la loi de sortie du nucléaire.',
]
dw['accord']['note'] = 'Résumé établi sur la déclaration gouvernementale et les 25 premières pages de l’accord (sur 209) ; la suite (pensions en détail, santé, justice, migration, énergie…) est en cours de lecture.'
dw['bilan'] = {'debut': 2024, 'fin': 2025, 'lignes': [
    ['Taux d’emploi des 20-64 ans', '72,3 %', '72,8 %', '__EMPLOI__#f-emploi'],
    ['Dette publique (% du PIB)', '104,0 %', '108,1 %', '__FINANCES__#f-dette'],
    ['Solde public (% du PIB)', '−4,4 %', '−5,2 %', '__FINANCES__#f-deficit']],
    'note': 'Dernière année avant le mandat et première année complète. Une seule année ne permet pas de juger une législature ; ces chiffres dépendent aussi de la conjoncture et des autres niveaux de pouvoir. Sources : Eurostat (lfsi_emp_a, gov_10dd_edpt1).'}
dw['contexte'] = [
    {'date': '24-28 novembre 2025', 'texte': 'Accord sur un budget pluriannuel : effort structurel de 9,2 milliards d’euros d’ici 2029, selon le ministre du Budget ; nouveau vote de confiance le 28 novembre. L’année 2026 commence sous le régime des douzièmes provisoires.', 'src': [['Ministre du Budget, novembre 2025', 'https://vanpeteghem.belgium.be/fr/actualites/accord-sur-un-budget-pluriannuel-equitable-qui-repartit-les-charges-de-maniere-juste-et']]},
    {'date': '19 octobre 2026', 'texte': 'Le Conseil général de l’INAMI n’approuve pas le budget des soins de santé 2027 : la délégation du gouvernement s’abstient, la décision revient au Conseil des ministres.', 'src': [['INAMI', 'https://www.inami.fgov.be/fr/actualites/la-proposition-budgetaire-sur-les-soins-de-sante-2027-n-a-pas-ete-approuvee-par-le-conseil-general-de-l-inami']]},
    {'date': '1er-2 novembre 2026', 'texte': 'Pas d’accord sur le budget 2027 au comité ministériel restreint (nuit du 1er au 2 novembre). Le Premier ministre est reçu au Palais le 2 novembre à 9 h 30 ; selon Reuters, citant des médias belges, il y remet sa démission. La décision du Roi n’est pas connue à 10 h 30.', 'presse': True, 'src': [['VRT NWS, 2 novembre 2026', 'https://www.vrt.be/vrtnws/nl/2026/11/02/geen-begrotingsakkoord-politieke-crisis-overzicht'], ['Reuters via Boursorama, 2 novembre 2026, 10 h 23', 'https://www.boursorama.com/bourse/actualites/belgique-le-premier-ministre-bart-de-wever-remet-sa-demission-au-roi-presse-75a7be6568c28f97f7037c094a8b171e']]},
]
dw['mesures'] = [
    m('2025-05-26', 'Mai 2025', 'eco', 'Fin de la sortie programmée du nucléaire',
      'La loi modifie celle du 31 janvier 2003 : elle lève l’interdiction de construire de nouvelles centrales et permet de prolonger ou de redémarrer les centrales existantes.',
      [chambre('56', '0318'), ['Chambre, texte adopté', 'https://www.dekamer.be/FLWB/pdf/56/0318/56K0318010.pdf']],
      ref='Loi du 17 mai 2025 portant diverses dispositions en matière d’énergie nucléaire ; adoptée le 15 mai 2025 ; Moniteur belge du 26 mai 2025',
      verif='Numac non trouvé ; résultat du vote à vérifier au compte rendu de la séance du 15 mai 2025.'),
    m('2025-07-29', 'Juillet 2025', 'social', 'Allocations de chômage limitées dans le temps',
      '24 mois au plus (12 mois de base, jusqu’à 12 de plus selon le passé professionnel) ; allocations d’insertion limitées à un an ; exception à partir de 55 ans avec 30 ans de passé professionnel (35 ans en 2030). Fins de droit par vagues à partir du 1er janvier 2026 ; nouveau régime pour les demandes à partir du 1er mars 2026.',
      [chambre('56', '0909'), ['ONEM', 'https://www.onem.be/page/reforme-de-lassurance-chomage']],
      ref='Loi-programme du 18 juillet 2025 ; adoptée le 17 juillet 2025 ; Moniteur belge du 29 juillet 2025'),
    m('2025-07-29', 'Juillet 2025', 'eco', 'Volet fiscal de la loi-programme de juillet 2025',
      'Réserve de liquidation : délai ramené de 5 à 3 ans, précompte porté de 5 % à 6,5 % ; « exit tax » pour les sociétés qui quittent la Belgique ; régime du carried interest ; régularisation fiscale ; plafond des cotisations patronales au-delà de 85 000 € par trimestre ; indexation limitée des pensions les plus élevées de 2025 à 2029.',
      [chambre('56', '0909'), ['Service fédéral des Pensions', 'https://www.sfpd.fgov.be/fr/changements/reforme-des-pensions']],
      ref='Loi-programme du 18 juillet 2025 ; Moniteur belge du 29 juillet 2025',
      verif='Montants relevés dans une analyse d’avocats : à contrôler sur le texte de la loi.'),
    m('2025-08-08', 'Juillet 2025', 'social', 'Regroupement familial plus strict',
      'Redevance administrative, délai d’attente et conditions matérielles renforcées (revenus, logement, assurance maladie). Le 26 février 2026, la Cour constitutionnelle suspend une partie des conditions visant les familles des bénéficiaires de la protection subsidiaire.',
      [chambre('56', '0913'), cc(24, 2026, '24/2026')],
      ref='Loi du 18 juillet 2025 modifiant la loi du 15 décembre 1980 ; Moniteur belge du 8 août 2025'),
    m('2025-07-14', 'Juillet 2025', 'social', 'Accueil des demandeurs d’asile restreint',
      'Fedasil peut refuser l’aide matérielle aux personnes déjà protégées dans un autre État de l’Union ; l’accueil sous forme d’aide financière est supprimé. La Cour constitutionnelle suspend ces deux volets (février 2026), puis annule la suppression de l’aide financière et interroge la Cour de justice de l’Union sur le premier (mai 2026).',
      [cc(23, 2026, '23/2026'), cc(66, 2026, '66/2026')],
      ref='Deux lois du 14 juillet 2025',
      verif='Titres exacts, dossiers de la Chambre et date au Moniteur belge non trouvés.'),
    m('2025-12-30', '1er janvier 2026', 'social', 'Retour au travail des malades de longue durée',
      'Les employeurs d’au moins 50 travailleurs paient une cotisation de 30 % des indemnités de maladie pendant les 2e et 3e mois d’incapacité (travailleurs de 18 à 55 ans) ; « force majeure médicale » possible après six mois au lieu de neuf ; absence sans certificat limitée à deux fois par an.',
      [chambre('56', '1177'), ['Ministre des Affaires sociales', 'https://vandenbroucke.belgium.be/fr/actualites/une-quatrieme-vague-de-mesures-pour-offrir-de-nouvelles-opportunites-aux-malades-de']],
      ref='Loi du 19 décembre 2025 exécutant une politique renforcée de retour au travail ; Moniteur belge du 30 décembre 2025',
      verif='Détail des taux relevé chez des secrétariats sociaux : à contrôler sur le texte de la loi.'),
    m('2026-03-27', 'Mars 2026', 'eco', 'Budget 2026 voté',
      'La Chambre adopte le budget des voies et moyens (76 voix contre 60) et le budget général des dépenses (77 contre 59) les 18 et 19 mars 2026. Jusque-là, l’État fonctionnait avec des douzièmes provisoires.',
      [chambre('56', '1279'), chambre('56', '1280'), ['Chambre, résultats des votes', 'https://www.lachambre.be/kvvcr/pdf_sections/newsletter/0000027439/56-062-votes_budgets2.pdf']],
      ref='Lois du 23 mars 2026 ; Moniteur belge du 27 mars 2026'),
    m('2026-03-01', '1er mars 2026', 'eco', 'Hausses de TVA ciblées',
      'TVA portée de 6 % à 12 % sur l’hébergement et le camping, et de 12 % à 21 % sur les pesticides.',
      [], v='a-verifier',
      verif='Source : FAQ du SPF Finances du 17 février 2026, citée par un tiers ; base juridique (arrêté royal) et Moniteur belge non trouvés.'),
    m('2026-04-21', 'Avril 2026', 'eco', 'Impôt sur les plus-values financières',
      'Taux de 10 % sur les plus-values réalisées à partir du 1er janvier 2026 sur actifs financiers, crypto-actifs compris, avec une exonération annuelle de 10 000 € (jusqu’à 15 000 € par report) ; 33 % pour les plus-values internes ou spéculatives ; pour les participations d’au moins 20 %, exonération d’un million puis barème de 1,25 % à 10 %.',
      [chambre('56', '1244'), ['Conseil des ministres, 12 décembre 2025', 'https://news.belgium.be/fr/introduction-dune-taxe-sur-les-plus-values-sur-les-actifs-financiers-deuxieme-lecture']],
      ref='Loi du 6 avril 2026 ; adoptée le 2 avril 2026 ; Moniteur belge du 21 avril 2026',
      verif='Numac 2026002780 vu seulement en recherche : lien vers le Moniteur à ajouter après contrôle.'),
    m('2026-06-01', '1er juin 2026', 'social', 'Indexation plafonnée et hausses de taxes',
      'Salaires : la partie au-delà de 4 000 € bruts par mois n’est plus indexée, la hausse est limitée à 2 %, pour deux indexations ; l’employeur verse la moitié de l’économie à la sécurité sociale. Pensions au-delà de 2 000 € bruts : hausse limitée à 40 € par mois à chacune de ces indexations. Taxe sur les comptes-titres portée de 0,15 % à 0,30 % ; taxe sur les opérations d’assurance de 9,25 % à 9,6 % ; précompte VVPR-bis de 15 % à 18 % ; hausse de la taxe bancaire.',
      [chambre('56', '1378'), ['Chambre, exposé des motifs (DOC 56 1378/001)', 'https://www.lachambre.be/FLWB/PDF/56/1378/56K1378001.pdf'], ['Service fédéral des Pensions', 'https://www.sfpd.fgov.be/fr/changements/reforme-des-pensions']],
      ref='Loi-programme du 30 mai 2026 ; adoptée le 28 mai 2026 ; Moniteur belge du 1er juin 2026',
      verif='Mécanisme pour les allocations sociales (hors pensions) non confirmé par une source officielle.'),
    m('2026-06-01', 'Mai-juin 2026', 'social', 'Réforme des pensions',
      'Pour les pensions qui prennent cours à partir du 1er janvier 2027 : malus en cas de départ anticipé, sauf pour qui totalise 35 années d’au moins 156 jours et 7 020 jours de travail effectif ; bonus en cas de report ; départ à 60 ans après 42 années d’au moins 234 jours ; alignement progressif des pensions des fonctionnaires.',
      [chambre('56', '1405'), chambre('56', '1406'), ['Service fédéral des Pensions', 'https://www.sfpd.fgov.be/fr/changements/reforme-des-pensions']],
      ref='Loi du 30 mai 2026 portant la réforme des pensions (Moniteur belge du 1er juin 2026) et loi du 18 juin 2026 (Moniteur belge du 24 juin 2026) ; votées le 28 mai 2026',
      verif='Taux du malus et du bonus (2 %, 4 % ou 5 % selon l’année de naissance d’après une caisse d’assurances sociales) à confirmer sur le site officiel de la réforme.'),
    m('2026-07-02', '1er juillet 2026', 'social', 'Flexi-jobs dans tous les secteurs',
      'Les flexi-jobs sont ouverts à tous les secteurs privés et publics, sauf les fonctions artistiques ; plafond annuel des revenus exonérés porté de 12 000 € à 18 000 €.',
      [chambre('56', '1526')],
      ref='Loi du 28 juin 2026 ; adoptée le 18 juin 2026',
      verif='Date au Moniteur belge (2 juillet 2026) et détails relevés chez des tiers : à contrôler.'),
    m('2026-07-29', 'Juillet 2026', 'eco', 'Réforme de l’impôt des personnes physiques',
      'Quotité exemptée d’impôt relevée par paliers de 4 785 € à 6 230 € (montants de base) de 2027 à 2031 ; bonus fiscal à l’emploi pour les bas salaires renforcé ; heures supplémentaires volontaires portées à 240 heures à partir du 1er avril 2026.',
      [chambre('56', '1243')],
      ref='Loi du 15 juillet 2026 portant réforme de l’impôt des personnes physiques ; adoptée le 9 juillet 2026 ; Moniteur belge du 29 juillet 2026',
      v='reference', verif='Montants relevés par l’Ordre des experts-comptables ; date de la loi et du Moniteur inversées sur une fiche de la Chambre : à contrôler.'),
    m('2025-10-20', 'Octobre 2025', 'social', 'Budget des soins de santé 2026',
      'Le Conseil général de l’INAMI approuve un budget de 46,775 milliards d’euros, dont 40,986 milliards pour le remboursement des soins (+3,2 %) et 470,8 millions d’euros de mesures de correction.',
      [['INAMI', 'https://www.inami.fgov.be/fr/actualites/le-budget-de-l-assurance-soins-de-sante-s-elevera-en-2026-a-46-775-milliards-d-euros']]),
    m('2025-06-20', 'Juin-juillet 2025', 'eco', 'Trajectoire européenne : correction du déficit d’ici 2029',
      'Le Conseil de l’Union accorde sept ans d’ajustement au lieu de quatre : croissance des dépenses nettes limitée à 3,6 % en 2025, 2,5 % en 2026 et 2027, 2,1 % en 2028 et 2029 ; clause dérogatoire pour la défense activée pour 2025-2028.',
      [['Conseil de l’UE, 20 juin 2025', 'https://www.consilium.europa.eu/en/press/press-releases/2025/06/20/stability-and-growth-pact-council-decides-on-way-ahead-for-belgium-and-romania-under-the-excessive-deficit-procedure/'], ['Commission européenne, procédure pour la Belgique', 'https://economy-finance.ec.europa.eu/economic-governance-framework/stability-and-growth-pact/corrective-arm-excessive-deficit-procedure/excessive-deficit-procedures-overview/belgium_en']],
      verif='Mise en suspens de la procédure en 2026 : un document du Conseil (11113/26, 3 juillet 2026) l’indique, mais aucune décision formelle n’est listée par la Commission ; à confirmer.'),
    m('2025-12-31', '2025-2034', 'eco', 'Dépenses de défense',
      'Selon les estimations de l’OTAN (juin 2025), 2,00 % du PIB en 2025 contre 1,29 % en 2024 ; le gouvernement prévoit 2 % jusqu’en 2033, puis 2,5 % à partir de 2034. Le Conseil de l’Union compte 1,4 % pour 2025 : les deux institutions ne retiennent pas les mêmes dépenses.',
      [['OTAN, juin 2025', 'https://nato.int/content/dam/nato/webready/documents/finance/def-exp-2025-en.pdf'], ['Conseil des ministres, 6 février 2026', 'https://news.belgium.be/fr/node/42876/pdf'], ['Conseil de l’UE, document 11113/26', 'https://data.consilium.europa.eu/doc/document/ST-11113-2026-INIT/en/pdf']]),
    m('2026-09-10', '10 septembre 2026', 'social', 'La Cour constitutionnelle valide l’essentiel de la réforme du chômage',
      'Elle rejette les recours contre la limite de 12 + 12 mois et la réduction des allocations d’insertion, mais annule les durées transitoires de 9, 8 ou 6 mois imposées aux chômeurs de longue durée. Trois des sept recours restent à juger.',
      [cc(96, 2026, '96/2026'), ['ONEM, 11 septembre 2026', 'https://www.onem.be/actualites/2026/09/11/consequences-de-larret-de-la-cour-constitutionnelle-du-10-septembre-2026']]),
]
dw['fin_txt'] = 'En fonction au 2 novembre 2026 ; démission présentée au Roi le 2 novembre selon la presse, décision du Roi non connue.'
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(dc['mesures']), len(dw['mesures']))
