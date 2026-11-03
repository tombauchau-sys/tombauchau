# « Annoncé et réalisé » pour Leterme I (accord du 18 mars 2008), Verhofstadt III (déclaration du 21 décembre 2007)
# et Van Rompuy (déclaration du 31 décembre 2008). Recherches du 3-4 novembre 2026, sources officielles ouvertes.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
R = F.resolve().parents[1] / 'dossiers'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
DEF = json.loads((R / 'finances-data.json').read_text(encoding='utf-8'))['defL']['BE']
def d(y): return (f'{DEF[y-1980]:.1f}'.replace('.', ',').replace('-', '−')) + ' %'
DK = lambda leg, n: [f'Chambre, dossier DOC {leg} {n}', f'https://www.dekamer.be/FLWB/html/{leg}/F/{leg}K{n}.html']
NB = lambda path, lab: [lab, f'https://news.belgium.be/fr/{path}']
EU_DEF = ['Eurostat, déficit public (gov_10dd_edpt1)', 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=fr']
def it(statut, eng, p, constat, mesure='', src=None, ctx=''):
    x = {'statut': statut, 'eng': eng, 'p': p, 'constat': constat}
    if mesure: x['mesure'] = mesure
    if src: x['src'] = src
    if ctx: x['ctx'] = ctx
    return x
def check(g, items):
    t = {m['titre'] for m in g['mesures']}
    for x in items:
        if x.get('mesure'): assert x['mesure'] in t, x['mesure']

# ---------------- Verhofstadt III ----------------
g = G['verhofstadt-3']
g['sieges_note'] += ' Confiance votée le 23 décembre 2007 par 97 voix contre 46, avec 1 abstention.'
g['sieges_src'] = g['sieges_src'] + [['Chambre, compte rendu du 23 décembre 2007 (CRIV 52 PLEN 015)', 'https://www.dekamer.be/doc/PCRI/pdf/52/ip015.pdf']]
items = [
    it('chiffre', 'Résorber le déficit prévu pour 2008, estimé entre 0,4 et 0,7 % du PIB.', '4',
       f'Solde public de 2008 selon les chiffres actuels d’Eurostat : {d(2008)} du PIB, année de la crise financière, gérée par les gouvernements suivants.', src=[EU_DEF]),
    it('adopte', 'Relever les allocations les plus basses.', '4',
       'Prévu au budget 2008, déposé le 19 mars 2008 : pensions minimum des salariés et des indépendants +2 %, garantie de revenus aux personnes âgées +2 %, allocations des invalides +2 % au 1er juillet 2008 (appliqué sous Leterme I).',
       src=[['Chambre, exposé général du budget 2008 (DOC 52 0992/001)', 'https://www.dekamer.be/FLWB/pdf/52/0992/52K0992001.pdf']]),
    it('adopte', 'Étendre le fonds mazout.', '4',
       'Décidé le 11 janvier 2008, en vigueur le 1er février : « le Fonds pourra intervenir auprès de 315.000 ménages par an ».',
       src=[NB('node/9366/pdf', 'Conseil des ministres du 11 janvier 2008')]),
    it('adopte', 'Affecter 340 millions d’euros aux dossiers urgents de santé (malades chroniques, maximum à facturer).', '5',
       'Inscrit au budget 2008 : « nouvelles initiatives […] pour un total de 340 millions d’euros en base annuelle », dont 16,05 millions pour les malades chroniques.',
       src=[['Chambre, note de politique générale Santé (DOC 52 0995/002)', 'https://www.dekamer.be/FLWB/PDF/52/0995/52K0995002.pdf']]),
    it('abandon', 'Adopter un plan d’action contre la surpopulation carcérale.', '6',
       'Aucune décision pendant les trois mois de l’intérim ; le « Masterplan 2008-2012 » est approuvé le 18 avril 2008 par le gouvernement suivant.',
       src=[NB('node/8728/pdf', 'Conseil des ministres du 18 avril 2008')]),
    it('partiel', 'Faire ratifier rapidement le traité de Lisbonne.', '7',
       'Projet déposé le 29 février 2008 et voté au Sénat le 6 mars ; la Chambre l’adopte le 10 avril 2008, sous Leterme I.',
       src=[['Sénat, dossier 4-568', 'https://senate.be/www/?LANG=fr&LEG=4&MIval=dossier&NR=568']]),
    it('partiel', 'Préparer une réforme de l’État au sein d’un groupe de travail (« Octopus »).', '8',
       'Un premier paquet de propositions est déposé au Sénat le 5 mars 2008 par huit partis ; il devient caduc en 2010.',
       src=[['Chambre, dossier 52S0602', 'https://www.dekamer.be/doc/FLWB/html/52/F/52S0602.html']]),
]
g['compare'] = {'intro': 'Gouvernement intérimaire de trois mois, chargé d’un programme en dix points en attendant le gouvernement Leterme I. Plusieurs décisions annoncées sont achevées par son successeur.', 'items': items}

# ---------------- Leterme I ----------------
g = G['leterme-1']
items = [
    it('chiffre', 'Un budget 2008 en équilibre, puis un excédent structurel dès 2009.', '5, 13-15',
       f'Solde public selon les chiffres actuels d’Eurostat : {d(2008)} du PIB en 2008, {d(2009)} en 2009, années de la crise financière.', src=[EU_DEF],
       ctx='sauvetages bancaires de l’automne 2008 (voir les mesures).'),
    it('chiffre', 'Porter l’aide au développement à au moins 0,5 % du RNB en 2008, puis 0,7 % en 2010.', '52',
       'Selon les données provisoires de l’OCDE, 0,47 % du RNB en 2008. Pour 2009, le gouvernement estime 0,56 % fin 2009 ; en 2010, l’OCDE relève 0,64 %.',
       src=[['OCDE, données préliminaires 2008 (document déposé au Parlement danois)', 'https://ft.dk/samling/20081/almdel/URU/bilag/141/664508.pdf'],
            ['Chambre, note de politique générale (DOC 52 2225/021)', 'https://www.lachambre.be/FLWB/PDF/52/2225/52K2225021.pdf']]),
    it('adopte', 'Augmenter de 2 % au 1er septembre 2008 les pensions ayant pris cours de 1988 à 2002 ; réduire la cotisation de solidarité ; relever les limites de cumul.', '6, 26',
       '« Depuis le 1er septembre 2008, les pensions pour les travailleurs salariés et indépendants sont majorées de 2 % » (pensions ayant pris cours de 1988 à 2003) ; cotisation de solidarité supprimée pour les pensions les plus basses au 1er juillet 2008 ; revenus autorisés relevés de 25 %.',
       src=[NB('node/8826/pdf', 'Conseil des ministres du 5 septembre 2008'), NB('cotisation-de-solidarite', 'Conseil des ministres du 23 mai 2008 (cotisation de solidarité)'), NB('node/11175/pdf', 'Conseil des ministres du 23 mai 2008 (activité autorisée)')]),
    it('adopte', 'Relever la quotité exemptée d’impôt et le bonus à l’emploi.', '6',
       'Quotité exemptée majorée de 165 € pour les revenus 2008 (loi-programme du 8 juin 2008) ; bonus à l’emploi porté de 143 à 175 € au 1er octobre 2008.',
       src=[['Chambre, rapport de la commission des Finances (DOC 52 1011/017)', 'https://www.lachambre.be/FLWB/pdf/52/1011/52K1011017.pdf'],
            ['SPF Emploi, 14 juillet 2008', 'https://emploi.belgique.be/fr/actualites/bonus-lemploi-moins-175-euros-de-cotisations-personnelles-pour-le-1er-octobre-2008?id=19240']]),
    it('partiel', 'Verser en août un « treizième mois » d’allocations familiales.', '6',
       'Loi-programme du 8 juin 2008 : supplément d’âge annuel de 25 à 74,29 € selon l’âge, payé en août. Ce n’est pas un mois complet ; en octobre 2008, le gouvernement annonce encore une réforme « pour aboutir à un treizième mois ».',
       src=[DK('52', '1011'), NB('loi-programme', 'Conseil des ministres du 20 mars 2008'), ['Déclaration du gouvernement du 14 octobre 2008', 'https://www.lachambre.be/kvvcr/pdf_sections/pri/dossiers/declaration_gouvernement_141008.pdf']]),
    it('adopte', 'Accorder une attention particulière aux patients atteints d’un cancer.', '8, 28',
       'Plan cancer de 35 actions, « lancé le 10 mars 2008 », dix jours avant l’entrée en fonction du gouvernement, avec un budget pluriannuel de 380 millions d’euros, poursuivi pendant le mandat.',
       src=[['SPF Santé publique, plan cancer', 'https://www.health.belgium.be/fr/cancer'], ['Sciensano, état des lieux du plan cancer (2011)', 'https://sciensano.be/sites/default/files/doc25_plan_cancer_etats_des_lieux_sciensano_2011_fr.pdf']]),
    it('abandon', 'Fixer les critères de régularisation, dont la longue procédure d’asile.', '10-11',
       'Pas de décision sous Leterme I : l’instruction de régularisation date de juillet 2009, sous Van Rompuy, et est annulée par le Conseil d’État le 9 décembre 2009.',
       src=[['Conseil d’État, arrêt n° 198.769', 'http://www.raadvst-consetat.be/arr.php?nr=198769']]),
    it('abandon', 'Ouvrir l’accès au travail aux demandeurs d’asile six mois après leur demande.', '48',
       'Décidé le 3 avril 2009, sous Van Rompuy : permis de travail C « six mois après leur demande d’asile ».',
       src=[NB('node/10172/pdf', 'Conseil des ministres du 3 avril 2009')]),
    it('abandon', 'Subordonner la naturalisation à cinq ans de séjour légal.', '10, 50',
       'Réforme de la nationalité adoptée seulement par la loi du 4 décembre 2012, sous Di Rupo.', src=[DK('53', '0476')]),
    it('abandon', 'Imposer une partie minimale de la peine à purger pour les infractions très graves.', '10, 38-47',
       'Adopté seulement par la loi du 17 mars 2013, sous Di Rupo.', src=[DK('53', '2604')]),
    it('adopte', 'Confier à un groupe d’experts l’étude du mix énergétique.', '35',
       'Groupe GEMIX institué par le gouvernement le 14 novembre 2008 ; son rapport date d’octobre 2009.',
       src=[NB('node/8527/pdf', 'Conseil des ministres du 14 novembre 2008')]),
    it('abandon', 'Déposer d’ici la mi-juillet 2008 un deuxième paquet de réforme de l’État.', '4',
       'Pas de dépôt. Le 23 juillet 2008, à la Chambre, la réforme est confiée à trois médiateurs et l’opposition rappelle que la démission du gouvernement a été refusée.',
       src=[['Chambre, compte rendu du 23 juillet 2008 (CRIV 52 PLEN 052)', 'https://www.lachambre.be/doc/PCRI/html/52/ip052x.html']]),
]
check(g, items)
g['compare'] = {
    'intro': 'Le gouvernement Leterme I gouverne neuf mois. Sa démission est refusée en juillet 2008 ; à l’automne, la crise financière impose des sauvetages bancaires que l’accord ne prévoyait pas. Plusieurs engagements sont réalisés par les gouvernements suivants.',
    'items': items,
    'hors': [
        ['Sauvetages bancaires (automne 2008)', 'Fortis, Dexia, KBC et Ethias, avec des apports publics de plusieurs milliards d’euros.', 'Sauvetage de Fortis'],
        ['Loi sur la stabilité financière (octobre 2008)', 'garanties d’État et garantie des dépôts portée à 100 000 €.', 'Loi sur la stabilité financière et garantie des dépôts'],
    ],
}

# ---------------- Van Rompuy ----------------
g = G['van-rompuy']
g['sieges_note'] += ' Confiance votée le 2 janvier 2009 par 88 voix contre 45.'
g['sieges_src'] = g['sieges_src'] + [['Chambre, compte rendu du 2 janvier 2009 (CRIV 52 PLEN 074)', 'https://www.dekamer.be/doc/PCRI/pdf/52/ip074.pdf']]
items = [
    it('chiffre', 'Préparer un plan pour résorber le déficit budgétaire structurel.', '2',
       f'Solde public selon les chiffres actuels d’Eurostat : {d(2009)} du PIB en 2009, au plus fort de la récession.', src=[EU_DEF]),
    it('adopte', 'Exécuter au plus vite le plan de relance et l’accord interprofessionnel.', '1-2',
       'Loi de relance économique du 27 mars 2009 : elle reprend « le plan de relance présenté par le gouvernement le 11 décembre 2008 » et des mesures de l’accord interprofessionnel 2009-2010.',
       src=[DK('52', '1788'), ['Chambre, exposé des motifs (DOC 52 1788/001)', 'https://www.dekamer.be/FLWB/Pdf/52/1788/52K1788001.pdf']]),
    it('adopte', 'Faire de l’emploi l’objectif premier du gouvernement.', '1-2',
       'Loi du 19 juin 2009 sur l’emploi pendant la crise (chômage temporaire des employés, crédit-temps de crise).', mesure='Mesures de crise pour l’emploi'),
    it('adopte', 'Mettre en place une commission d’enquête parlementaire sur la séparation des pouvoirs.', '3',
       'Commission instituée en janvier 2009 ; rapport du 18 mars 2009 et motion adoptée le 19 mars.',
       src=[DK('52', '1711'), ['Chambre, rapport (DOC 52 1711/007)', 'https://www.dekamer.be/FLWB/pdf/52/1711/52K1711007.pdf']]),
    it('adopte', 'Obtenir les propositions du groupe Lamfalussy sur la structure financière.', '2',
       'Rapport final du 16 juin 2009 ; la réforme du contrôle financier qui en découle est adoptée sous Leterme II.',
       src=[['Conseil des ministres du 10 décembre 2008', 'https://news.belgium.be/fr/node/13330/pdf'], ['Comité Lamfalussy, rapport final (hébergé par la Chambre)', 'https://www.lachambre.be/kvvcr/pdf_sections/comm/common/rapport_final_FR.pdf']]),
    it('partiel', 'Mener la Conférence nationale des pensions.', '2',
       'En cours fin 2009 : « Depuis bientôt un an, elle réunit des spécialistes » ; un rapport intermédiaire est en préparation.',
       src=[['Chambre, DOC 52 2315/001', 'https://www.dekamer.be/FLWB/Pdf/52/2315/52K2315001.pdf']]),
    it('partiel', 'Créer un groupe de travail sur Bruxelles-Hal-Vilvorde, avec des conclusions dès l’été 2009.', '3',
       'Le Comité de concertation acte la création du groupe le 16 janvier 2009 ; aucune conclusion officielle n’a été trouvée.',
       src=[['Chambre, notification du Comité de concertation (DOC 52 0037/016)', 'https://www.dekamer.be/FLWB/pdf/52/0037/52K0037016.pdf']]),
]
check(g, items)
g['compare'] = {'intro': 'Le gouvernement Van Rompuy reprend la coalition et l’accord de Leterme I, en pleine récession. Il gouverne onze mois, jusqu’à la désignation d’Herman Van Rompuy à la tête du Conseil européen.', 'items': items}
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
