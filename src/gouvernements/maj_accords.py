# Résumés des accords De Croo (2020) et De Wever (2025), chapitre par chapitre,
# établis sur le texte intégral du document de la Chambre (DOC 55 0020/001 et DOC 56 0020/001),
# déposé par Tom le 2 novembre 2026. Pages = pages du PDF de la Chambre.
import json
from pathlib import Path

F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}

dc = G['de-croo']['accord']
dc['resume'] = [
    '<b>Budget</b> : un effort fixe de 0,2 % du PIB par an, plus un effort variable selon la croissance (0 % en 2021, puis 0,2 % par an en croissance normale), soit environ 1,4 % du PIB d’ici 2024, réparti en un tiers de dépenses, un tiers de recettes et un tiers « divers » ; plus de 5 milliards d’euros de politiques nouvelles.',
    '<b>Emploi</b> : un taux d’emploi d’au moins 80 % en 2030 ; droit individuel à la formation, cinq jours par an en moyenne par équivalent temps plein.',
    '<b>Pensions</b> : pension minimum relevée vers 1 500 € nets pour une carrière complète ; bonus de pension ; carrière minimale de 30 ans et condition de travail effectif à fixer ; cotisation de pension complémentaire d’au moins 3 % du salaire brut.',
    '<b>Santé</b> : norme de croissance de 2,5 % à partir de 2022 ; 1,2 milliard d’euros supplémentaires (fonds blouses blanches de 402 millions, accord social de 600 millions, santé mentale de 200 millions) ; d’ici 2030, −25 % d’inégalités de santé et −15 % de mortalité évitable.',
    '<b>Fiscalité</b> : une large réforme fiscale qui allège le travail sans hausse de la charge fiscale globale ; contribution des personnes à plus grande capacité contributive ; taxe sur les services numériques en 2023 faute d’accord international.',
    '<b>Investissement</b> : plan de relance de 4,7 milliards d’euros ; investissement public porté de 2,6 % du PIB (2019) à 4 % en 2030.',
    '<b>Climat et énergie</b> : −55 % d’émissions en 2030 ; calendrier légal de sortie du nucléaire « respecté », avec un rapport fin novembre 2021 permettant d’ajuster le calendrier pour une capacité « pouvant aller jusqu’à 2 GW » en cas de problème d’approvisionnement ; éolien en mer doublé à 4 GW d’ici 2030.',
    '<b>Sécurité, institutions, international</b> : au moins 1 600 policiers recrutés par an ; nouvelle structure de l’État à partir de 2024 ; vote à 16 ans aux élections européennes ; aide au développement portée à 0,7 % du revenu national brut d’ici 2030.',
]
dc['note'] = ''
dc['chapitres'] = [
    {'t': '1. Un pays solidaire', 'p': '19-38', 'pts': [
        'Crise sanitaire : commissaire Covid mandaté douze mois (renouvelable six mois), plan pandémie, stocks stratégiques.',
        'Santé : norme de croissance de 2,5 % dès 2022 ; 1,2 milliard d’euros supplémentaires (environ 4,5 % du budget) ; objectifs 2030 de réduction des inégalités de santé (−25 %) et de la mortalité évitable (−15 %) ; suppléments d’honoraires « régulés, stabilisés et ensuite diminués ».',
        'Sécurité sociale : dotations d’équilibre renouvelées pour une durée indéterminée ; proposition de convergence des statuts d’ici fin 2021.',
        'Pensions : pension minimum vers 1 500 € nets (carrière de 45 ans) ; bonus de pension ; réforme proposée d’ici le 1er septembre 2021 ; carrière minimale de 30 ans pour la pension minimum ; 2e pilier d’au moins 3 % du salaire brut.',
        'Pauvreté : allocations augmentées « en direction du seuil de pauvreté » ; octroi automatique des droits. Dossiers éthiques (avortement) : pas de vote sans consensus de la majorité, étude d’un comité scientifique.']},
    {'t': '2. Un pays prospère', 'p': '39-64', 'pts': [
        'Relance : réserve de reconstitution exonérée (exercices 2022 à 2024) ; investissement public visé à 4 % du PIB en 2030 ; déduction majorée pour investissement prolongée de deux ans.',
        'Travail : objectif de 80 % d’emploi en 2030 (inactivité des 25-64 ans à 22,8 %) ; cinq jours de formation par an ; cadre pour le télétravail ; minimum d’incapacité de travail dès le deuxième mois au lieu du septième.',
        'Entreprises et consommateurs : charges administratives −30 % ; plus de frais pour le premier rappel d’une facture impayée ; tarif social télécom réformé.',
        'Fiscalité : large réforme fiscale déplaçant la charge du travail vers d’autres bases, « la charge fiscale globale n’augmentera pas » ; taxe numérique en 2023 faute d’accord OCDE ou UE ; fin de la régularisation fiscale au 31 décembre 2023 ; 100 % des conteneurs à haut risque scannés à Anvers.',
        'Budget : effort fixe de 0,2 % du PIB par an plus effort variable, 1,4 % du PIB d’ici 2024 selon le Bureau du Plan ; politiques nouvelles pour plus de 5 milliards d’euros, dont 3,223 milliards de mesures structurelles.']},
    {'t': '3. Un pays durable', 'p': '65-77', 'pts': [
        'Climat : −55 % d’émissions de gaz à effet de serre d’ici 2030 ; financement climatique international en hausse, hors budget du développement.',
        'Nucléaire : calendrier légal de sortie respecté ; rapport fin novembre 2021 sur l’enchère CRM, avec possibilité d’ajuster le calendrier pour une capacité « pouvant aller jusqu’à 2 GW ».',
        'Énergie : éolien en mer doublé à 4 GW d’ici 2030 ; extension du tarif social aux bénéficiaires de l’intervention majorée à examiner ; voitures de société neuves neutres en carbone d’ici 2026 ; instrument fiscal « pollueur-payeur » budgétairement neutre.',
        'Mobilité : fret ferroviaire doublé d’ici 2030 ; morts sur les routes réduits de moitié d’ici 2030, « vision zéro » en 2050 ; contrat de service public de dix ans pour la SNCB.']},
    {'t': '4. Un pays en sécurité', 'p': '78-87', 'pts': [
        'Justice : moyens supplémentaires (non chiffrés) ; réforme des codes pénal et de procédure pénale ; « toutes les peines seront exécutées » ; détenus étrangers condamnés à plus de cinq ans transférés vers leur pays par accords bilatéraux.',
        'Police : au moins 1 600 recrutements par an ; tolérance zéro pour les violences contre les policiers et les secours ; réforme du financement des zones de police.',
        'Défense : l’OTAN reste la pierre angulaire ; trajectoire de croissance à examiner d’ici 2030, sans pourcentage du PIB fixé.']},
    {'t': '5. Un pays de coopération et de respect', 'p': '88-95', 'pts': [
        'Institutions : débat démocratique et nouvelle structure de l’État à partir de 2024 ; article 195 de la Constitution soumis à révision ; compétences en santé rendues plus homogènes.',
        'Démocratie : registre des lobbyistes étendu ; vote à 16 ans aux élections européennes ; processus à la Chambre sur la loi électorale et l’avenir du Sénat.',
        'Égalité : plan interfédéral contre le racisme ; 3 % d’emplois de personnes handicapées dans les services publics ; congé de naissance porté de 10 à 20 jours.']},
    {'t': '6. La Belgique dans le monde', 'p': '96-107', 'pts': [
        'Europe : présidence du Conseil de l’UE au premier semestre 2024 ; majorité qualifiée en politique étrangère.',
        'Asile et migration : décision d’asile en principe dans les six mois ; nouveau code de la migration ; conditions du regroupement familial comparées aux pays voisins et revues si nécessaire ; « des mineurs ne peuvent pas être détenus en centre fermé ».',
        'Développement : trajectoire contraignante vers 0,7 % du revenu national brut d’ici 2030.']},
]
dc['lecture'] = 'Résumé établi sur le texte intégral de l’accord (pages 10 à 107 du document de la Chambre).'

dw = G['de-wever']['accord']
dw['resume'] = [
    '<b>Budget</b> : déficit de l’État fédéral et de la sécurité sociale sous 3 % du PIB d’ici 2030 ; plus des deux tiers de l’effort par des réformes structurelles, le reste au moins aux deux tiers par la maîtrise des dépenses ; pas de hausse de la pression fiscale. La déclaration gouvernementale chiffre l’effort à 18 milliards d’euros, plus environ 5 milliards de politiques nouvelles.',
    '<b>Emploi</b> : taux d’emploi de 80 % d’ici 2029 (72,1 % en 2023) ; au moins 500 € nets par mois d’écart entre travailler et ne pas travailler ; salaire minimum +35 € bruts au 1er avril 2026, puis à nouveau en 2028.',
    '<b>Chômage</b> : un an d’allocations pour un an de travail sur trois ans, un mois de plus par tranche de quatre mois travaillés, deux ans au plus ; exception à partir de 55 ans avec 30 ans de carrière (35 ans en 2030).',
    '<b>Pensions</b> : malus et bonus de 2 % par année (jusqu’en 2030), 4 % (jusqu’en 2040) puis 5 %, sauf 35 années de 156 jours et 7 020 jours de travail ; départ à 60 ans après 42 années d’au moins 234 jours ; périodes assimilées plafonnées à 40 % de la carrière en 2027, 20 % en 2031.',
    '<b>Fiscalité</b> : 10 % sur les plus-values financières futures (exonération de 10 000 €) ; salaire net relevé à partir de 2027 ; quotient conjugal réduit de moitié d’ici 2029 ; flexi-jobs portés à 18 000 € par an ; TVA des pompes à chaleur à 6 % pendant cinq ans.',
    '<b>Santé</b> : norme de croissance maintenue ; réforme de la nomenclature et du financement des hôpitaux ; soins psychologiques de première ligne entièrement remboursés jusqu’à 23 ans.',
    '<b>Migration</b> : accueil strictement matériel ; regroupement familial soumis à 110 % du revenu minimum (plus 10 % par personne) et à 21 ans ; cinq ans d’attente avant l’aide sociale ; nationalité à 1 000 € et langue au niveau B1 ; capacité des centres fermés au moins doublée.',
    '<b>Défense, énergie, institutions</b> : défense à 2 % du PIB d’ici 2029 au plus tard, 2,5 % en 2034 ; 4 GW de nucléaire visés et sortie du nucléaire abrogée ; suppression du Sénat aux prochaines élections ; réforme de l’État préparée pour la législature suivante.',
]
dw['note'] = ''
dw['chapitres'] = [
    {'t': 'Réformes institutionnelles et démocratie', 'p': '217-223', 'pts': [
        'Nouvelle structure de l’État à partir de la législature suivante ; article 195 de la Constitution soumis à révision.',
        'Suppression du Sénat aux prochaines élections fédérales ; indemnité de sortie des députés limitée à 52 semaines ; dotations des partis non indexées pendant la législature.']},
    {'t': 'Cadre budgétaire', 'p': '224-230', 'pts': [
        'Constat repris de la BNB : à politique inchangée, déficit de 4,5 % à 7,2 % du PIB et dette de 105,7 % (2024) à 130 % du PIB d’ici 2038.',
        'Objectif : déficit de l’entité I sous 3 % d’ici 2030 ; plus des 2/3 de l’effort par des réformes structurelles ; fonds de défense alimenté par des ventes d’actifs (première tranche avant le 31 décembre 2025).',
        'Recettes : cotisation de 10 % sur les plus-values financières futures ; pour les participations d’au moins 20 %, 1 million exonéré puis 1,25 %, 2,25 %, 5 % et 10 % selon les tranches ; carried interest à 30 % au plus ; réserve de liquidation de 5 % à 6,5 %.']},
    {'t': 'Marché du travail', 'p': '231-244', 'pts': [
        'Constat : prestations sociales de 161 milliards d’euros (2024) à 198 milliards (2029) ; emploi 72,1 % contre 75,4 % dans l’UE (2023). Objectif 80 % d’ici 2029.',
        'Chômage limité à deux ans ; norme d’allocations et plafond du cumul des aides par ménage ; plus de nouveaux entrants en prépension (RCC), sauf raisons médicales.',
        'Flexibilité : période d’essai réintroduite ; travail de nuit à partir de minuit dans la distribution et l’e-commerce ; flexi-jobs de 12 000 à 18 000 € ; 360 heures supplémentaires volontaires, dont 240 « brut = net » ; travail étudiant 650 heures dès 15 ans.',
        'Malades de longue durée : employeurs payant 30 % de l’indemnité pendant deux mois ; force majeure médicale après six mois au lieu de neuf ; absence sans certificat deux fois par an.',
        'Salaires : indexation automatique et loi de 2017 sur la norme salariale maintenues ; salaire minimum +35 € bruts au 1er avril 2026, puis en 2028.']},
    {'t': 'Pouvoir d’achat et fiscalité', 'p': '245-265', 'pts': [
        'Salaire net relevé à partir de 2027 (quotité exemptée, bonus à l’emploi) ; quotient conjugal réduit de moitié pour les non-retraités d’ici 2029 ; fin de la réduction d’impôt sur les allocations de chômage.',
        'Entreprises : régime des impatriés de 30 % à 35 % ; amortissement de 40 % la première année ; plafond des cotisations patronales.',
        'Fiscalité verte : TVA des pompes à chaleur de 21 % à 6 % pendant cinq ans ; TVA des chaudières fossiles de 6 % à 21 % ; taxe d’embarquement de 5 € ; taxe numérique unilatérale au plus tard en 2027 faute d’accord.',
        'Fraude : 300 agents supplémentaires ; facturation électronique en temps réel à partir de 2028 ; régularisation fiscale à 30 % et 45 %.']},
    {'t': 'Pensions', 'p': '266-272', 'pts': [
        'Constat : coût du vieillissement +4,1 % du PIB en Belgique de 2023 à 2070, contre +1,2 % dans l’UE.',
        'Malus et bonus de 2 %, 4 % puis 5 % par année ; années comptées pour la retraite anticipée seulement à partir de 156 jours ; départ à 60 ans après 42 années de 234 jours ; périodes assimilées plafonnées (40 % en 2027, 20 % en 2031).',
        'Fonctionnaires : période de référence allongée progressivement à 45 ans en 2062 ; fin de la pension pour inaptitude physique et de la péréquation dès 2026. Pension de survie remplacée par une allocation de transition de deux à quatre ans.']},
    {'t': 'Économie, administration, pauvreté, égalité', 'p': '273-301', 'pts': [
        'Investissement public visé à 3 % du PIB par an (État fédéral et entités fédérées) ; internet à plus de 1 Gb/s pour toutes les entreprises d’ici 2030.',
        'Administration : −10 % de postes d’encadrement ; bureaux loués −15 % ; recrutement contractuel comme règle.',
        'Pauvreté : extension du projet d’intégration à tous les bénéficiaires du revenu d’intégration ; plafond global des aides par ménage. Égalité : financement d’Unia réduit de 25 %.']},
    {'t': 'Énergie, climat, mobilité', 'p': '303-325', 'pts': [
        'Nucléaire : 4 GW visés ; abrogation de la loi de sortie de 2003 ; Doel 4 et Tihange 3 prolongés d’au moins dix ans ; plan pour un premier petit réacteur modulaire.',
        'Climat : −55 % d’émissions européennes d’ici 2030 et neutralité en 2050 ; accises sur l’électricité des entreprises ramenées au minimum européen ; tarif social réformé vers un forfait selon les revenus.',
        'Rail : +30 % de voyageurs, ponctualité de plus de 90 %, fret doublé d’ici 2030 ; routes : zéro mort en 2050, convocation automatique au tribunal pour les récidivistes.']},
    {'t': 'Santé', 'p': '326-346', 'pts': [
        'Norme de croissance maintenue, avec responsabilisation en cas de dépassement ; si l’INAMI ne décide pas, le Conseil des ministres tranche.',
        'Réforme de la nomenclature et du financement des hôpitaux ; quotas de médecins relevés ; soins psychologiques de première ligne remboursés jusqu’à 23 ans ; « génération sans tabac » en 2040.',
        'Éthique : fin de l’anonymat des donneurs de gamètes à l’avenir ; avortement modifié seulement après consensus de la majorité.']},
    {'t': 'Sécurité et justice', 'p': '347-383', 'pts': [
        'Police : fusion des six zones de police bruxelloises ; un inspecteur de quartier pour 2 000 habitants ; recrutement en 90 jours au plus.',
        'Justice pénale : nouveau Code pénal applicable le 9 avril 2026 ; libération conditionnelle plus tardive (3/5 de la peine pour les délits sexuels, 3/4 pour les récidivistes) une fois la surpopulation réduite ; déchéance de nationalité possible pour certains crimes graves.',
        'Prisons : Masterplan IV ; près de 40 % des détenus en détention préventive (constat) ; location de places de prison à l’étranger à l’étude.']},
    {'t': 'Asile et migration', 'p': '384-399', 'pts': [
        'Accueil « strictement matériel » en centres collectifs ; fin des hôtels et des initiatives locales d’accueil ; « pas de régularisation collective ».',
        'Regroupement familial : 110 % du revenu minimum mensuel moyen garanti plus 10 % par personne, âge minimal de 21 ans, attente de deux ans pour la protection subsidiaire.',
        'Cinq ans d’attente avant l’aide sociale pour les nouveaux arrivants ; nationalité : frais de 1 000 €, langue au niveau B1 ; détention jusqu’à 18 mois dans les cas graves, capacité des centres fermés au moins doublée.']},
    {'t': 'Défense et affaires étrangères', 'p': '400-421', 'pts': [
        'Défense : 2 % du PIB d’ici 2029 au plus tard, 2,5 % en 2034 ; 29 100 militaires d’ici 2030 ; service militaire volontaire de 12 mois ; au moins 2 % du budget de la Défense pour la recherche.',
        'Affaires étrangères : soutien à l’Ukraine ; coopération au développement fusionnée avec les Affaires étrangères et liée à la réadmission des migrants.']},
]
dw['lecture'] = 'Résumé établi sur le texte intégral de la version française de l’accord (pages 214 à 421 du document de la Chambre). Le barème des plus-values suit le texte néerlandais : la version française omet une tranche.'
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
