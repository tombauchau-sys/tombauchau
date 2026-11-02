# Accords Verhofstadt II (DOC 51 0020/001), déclaration Verhofstadt III (DOC 52 0020/001), accord Leterme I (DOC 52 0020/002),
# lus en entier sur les PDF de la Chambre déposés par Tom le 2 novembre 2026.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}

v2 = G['verhofstadt-2']['accord']
v2['date'] = '14 juillet 2003 (déclaration du gouvernement fédéral)'
v2['resume'] = [
    '<b>Emploi</b> : « 200 000 nouveaux emplois », de près de 4,2 millions à 4,4 millions de personnes au travail, taux d’activité supérieur à 65 % ; baisse des charges de 800 millions par an ; 25 000 emplois de proximité via les titres-services ; bonus crédit d’emploi dès 2004.',
    '<b>Budget</b> : équilibre en 2004 et 2005, excédent de 0,3 % du PIB en 2007 ; dette sous 90 % du PIB fin 2007 ; Fonds de vieillissement porté à 10 milliards en 2007 ; dépenses primaires fédérales limitées à +1,2 % par an.',
    '<b>Fiscalité</b> : baisse continue de la pression fiscale et parafiscale ; poursuite de la réduction de l’impôt des personnes physiques ; régularisation fiscale unique ; TVA à 6 % demandée pour les secteurs à forte intensité de main-d’œuvre.',
    '<b>Santé et sécurité sociale</b> : dépenses de santé +4,5 % par an en termes réels pendant quatre ans ; maximum à facturer étendu aux enfants jusqu’à 18 ans ; liaison des allocations au bien-être ; Fonds de vieillissement renforcé.',
    '<b>Entreprises publiques</b> : reprise par l’État, avant fin 2005, de 7,4 milliards de dettes de la SNCB ; +25 % de voyageurs en train par rapport à 2000.',
    '<b>Environnement</b> : Kyoto, −7,5 % d’émissions en 2010 par rapport à 1990 ; premier parc éolien en mer ; victimes de la route −33 % d’ici 2006 et −50 % d’ici 2010.',
    '<b>Sécurité et justice</b> : police locale renforcée de l’équivalent de 2 500 agents ; surveillance électronique d’au moins 1 000 personnes ; plan Themis contre l’arriéré judiciaire.',
    '<b>Institutions et international</b> : éligibilité à 18 ans ; Cour d’arbitrage transformée en Cour constitutionnelle ; armée ramenée à 35 000 militaires ; aide au développement à 0,7 % du PIB en 2010.',
]
v2['chapitres'] = [
    {'t': 'Deux cent mille nouveaux emplois', 'p': '6-12', 'pts': ['De près de 4,2 millions à 4,4 millions de personnes au travail ; baisse des charges de 800 millions par an pour cinq groupes cibles ; 25 000 emplois de proximité (titres-services) ; nouveau système d’activation des chômeurs.']},
    {'t': 'Connaissance et esprit d’entreprise', 'p': '13-19', 'pts': ['Recherche à 3 % du PIB d’ici 2010 ; création d’entreprise en trois jours d’ici juillet 2005 ; régularisation fiscale unique ; réforme de l’impôt des personnes physiques dans un cadre budgétaire neutre ; datamining contre la fraude.']},
    {'t': 'Entreprises publiques', 'p': '20-22', 'pts': ['Reprise de 7,4 milliards de dettes de la SNCB avant fin 2005 ; +25 % de voyageurs ; reprise du fonds de pension de Belgacom au profit du Fonds de vieillissement.']},
    {'t': 'Sécurité sociale', 'p': '23-30', 'pts': ['Santé : +4,5 % par an en termes réels pendant quatre ans ; maximum à facturer étendu aux enfants ; hausse du revenu d’intégration et des allocations les plus basses ; pensions complémentaires assouplies.']},
    {'t': 'Environnement, mobilité, villes', 'p': '31-42', 'pts': ['Kyoto : −7,5 % en 2010 ; réduction d’impôt pour les économies d’énergie ; marché européen des quotas de CO2 en 2005 ; sécurité routière ; politique des grandes villes.']},
    {'t': 'Sécurité et justice', 'p': '43-57', 'pts': ['Police locale +2 500 agents ; contrats de sécurité pluriannuels ; plan Themis ; tribunal de la famille ; surveillance électronique à 1 000 unités ; prisons provisoires dans d’anciens bâtiments militaires.']},
    {'t': 'Administration, institutions, société', 'p': '58-68', 'pts': ['Carte d’identité électronique généralisée d’ici 2007 ; éligibilité à 18 ans ; Cour constitutionnelle ; transposition de la directive sur l’accueil des demandeurs d’asile d’ici février 2005.']},
    {'t': 'Europe, monde, éthique', 'p': '69-84', 'pts': ['Armée de 35 000 militaires ; aide au développement à 0,7 % du PIB en 2010 ; débat parlementaire sur l’adoption par les couples de même sexe ; divorce sans faute.']},
    {'t': 'Cadre financier 2004-2007', 'p': '85-86', 'pts': ['Croissance supposée de 1,8 % en 2004 ; équilibre en 2004-2005, excédent de 0,3 % du PIB en 2007 ; dette sous 90 % ; Fonds de vieillissement à 10 milliards.']},
]
v2['lecture'] = 'Résumé établi sur le texte intégral de la déclaration (86 pages). Les montants y sont exprimés en euros.'

v3 = G['verhofstadt-3']['accord']
v3['resume'] = [
    '<b>Nature</b> : gouvernement intérimaire de quatorze ministres, « limité dans le temps », avec un programme en dix points pour trois mois ; Yves Leterme doit former le gouvernement définitif au plus tard le 23 mars 2008.',
    '<b>Budget et pouvoir d’achat</b> : déficit 2008 prévu entre 0,4 et 0,7 % du PIB à résorber ; dette à 84,7 % du PIB ; hausse des allocations les plus basses, extension du fonds mazout, réductions d’impôt ciblées.',
    '<b>Santé et emploi</b> : 340 millions d’euros pour les dossiers urgents (malades chroniques, maximum à facturer) ; fin de la mise en œuvre du Pacte de solidarité entre les générations.',
    '<b>Autres points</b> : objectifs de Kyoto pour 2008-2012 ; plan d’action contre la surpopulation carcérale ; ratification du traité de Lisbonne ; réforme de l’État préparée par le groupe Octopus.',
]
v3['chapitres'] = []
v3['lecture'] = 'Résumé établi sur le texte intégral de la déclaration du 21 décembre 2007 (9 pages).'

l1 = G['leterme-1']['accord']
l1['date'] = 'conclu le 18 mars 2008 ; déclaration du 20 mars 2008'
l1['resume'] = [
    '<b>Budget</b> : budget 2008 à l’équilibre (croissance supposée de 1,9 %, dépenses primaires +1,37 %) ; excédent structurel dès 2009, d’au moins 1 % du PIB en 2011.',
    '<b>Emploi</b> : plus de 200 000 emplois, dont 61 000 en 2008 ; allocations de chômage plus élevées au début puis dégressives ; formation à 1,9 % de la masse salariale.',
    '<b>Pouvoir d’achat</b> : quotité exemptée et bonus à l’emploi relevés ; allocations familiales liées au bien-être avec un « treizième mois » en août ; observatoire des prix.',
    '<b>Pensions</b> : +2 % au 1er septembre 2008 pour les pensions ayant pris cours de 1988 à 2002 ; baisse de la cotisation de solidarité ; limites de cumul +25 % ; pas de relèvement de l’âge légal.',
    '<b>Santé</b> : plan cancer et maladies chroniques de 380 millions d’euros sur 2008-2010 ; pas de hausse de la part des patients.',
    '<b>Énergie et climat</b> : objectifs européens 20/20/20 en 2020 ; groupe d’experts sur le mix énergétique, décisions avant fin 2009.',
    '<b>Migration</b> : régularisation individuelle avec un critère de longue procédure de 4 ou 5 ans ; accès au travail des demandeurs d’asile après six mois ; naturalisation après 5 ans de séjour légal.',
    '<b>Justice et réforme de l’État</b> : partie minimale de la peine à purger (entre 1/3 et 2/3) pour les infractions très graves ; second paquet de réforme de l’État annoncé pour la mi-juillet 2008.',
]
l1['chapitres'] = [
    {'t': 'Budget', 'p': '13-15', 'pts': ['Équilibre en 2008, excédent structurel dès 2009 et d’au moins 1 % du PIB en 2011 (la déclaration parle de près de 4 milliards d’euros).']},
    {'t': '1-3. Emploi, entreprises, pouvoir d’achat', 'p': '15-24', 'pts': ['218 000 emplois sur 2007-2012 selon le Bureau du Plan ; dispense de précompte pour le travail en équipe ; recherche à 3 % du PIB en 2010 ; quotité exemptée ; « treizième mois » d’allocations familiales.']},
    {'t': '4-6. Protection sociale, pauvreté, cohésion', 'p': '24-33', 'pts': ['Liaison bisannuelle au bien-être ; pensions +2 % au 1er septembre 2008 ; 13 priorités en santé, 380 millions sur 2008-2010 ; plan de réduction de la pauvreté.']},
    {'t': '7. Environnement et énergie', 'p': '33-37', 'pts': ['20/20/20 en 2020, plaidoyer pour −30 % ; experts sur le mix énergétique avant fin juin 2008 ; RER et contrat de gestion de la SNCB.']},
    {'t': '8-9. Sécurité, justice, autorité publique', 'p': '38-47', 'pts': ['Plan national de sécurité ; peine minimale à purger entre 1/3 et 2/3 ; collège anti-fraude ; rapport sur les intérêts notionnels.']},
    {'t': '10-12. Migration, international, institutions', 'p': '47-55', 'pts': ['Critère de longue procédure de 4 ou 5 ans ; enfermement limité à deux mois ; aide au développement à 0,5 % en 2008, 0,6 % en 2009, 0,7 % en 2010 ; second paquet de réforme de l’État.']},
]
l1['lecture'] = 'Résumé établi sur le texte intégral de la déclaration et de l’accord (55 pages).'
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
