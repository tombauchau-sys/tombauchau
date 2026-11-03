# Pilote « Annoncé et réalisé » (choix de Tom, 3 novembre 2026) : Di Rupo et Michel I.
# Engagements cités d'après les accords lus en entier (pages du document), comparés aux mesures déjà ancrées
# dans la fiche ; objectifs chiffrés comparés aux séries Eurostat du site. Statuts factuels :
# adopte / partiel / abandon (seulement si une source officielle le constate) / non (non retrouvé) / chiffre.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
R = F.resolve().parents[1] / 'dossiers'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
FIN = json.loads((R / 'finances-data.json').read_text(encoding='utf-8'))
FIS = json.loads((R / 'fiscalite-data.json').read_text(encoding='utf-8'))
DEF = FIN['defL']['BE']                     # depuis 1980
TAX = FIS['es']['BE']['v']                  # depuis 1995 (gov_10a_taxag)
WEDGE = FIS['wedge']['BE']['v']             # depuis 2000 (earn_nt_taxwedge, bas salaire)
def pc(x): return (f'{x:.1f}'.replace('.', ',').replace('-', '−')) + ' %'
def d(y): return pc(DEF[y - 1980])

def it(statut, eng, p, constat, mesure='', src=None, ctx=''):
    x = {'statut': statut, 'eng': eng, 'p': p, 'constat': constat}
    if mesure: x['mesure'] = mesure
    if src: x['src'] = src
    if ctx: x['ctx'] = ctx
    return x

# Vérifier que chaque mesure citée existe bien dans la fiche
def check(gid, items):
    titres = {m['titre'] for m in G[gid]['mesures']}
    for x in items:
        if x.get('mesure'):
            assert x['mesure'] in titres, (gid, x['mesure'])

EU_DEF = ['Eurostat, déficit public (gov_10dd_edpt1)', 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=fr']

# ---------------- Di Rupo ----------------
dr = [
    it('chiffre', 'Ramener le déficit de l’ensemble des pouvoirs publics à 2,8 % du PIB en 2012.', '2, 76',
       f'Solde public de 2012 selon les chiffres actuels : {d(2012)} du PIB ; {d(2013)} en 2013 et {d(2014)} en 2014.', src=[EU_DEF],
       ctx='crise de la dette dans la zone euro ; l’objectif reprend la trajectoire convenue avec l’Union européenne.'),
    it('chiffre', 'Atteindre l’équilibre budgétaire en 2015.', '2',
       f'Échéance postérieure à la fin du mandat (mai 2014). Solde de 2015 : {d(2015)} du PIB, sous le gouvernement suivant.', src=[EU_DEF]),
    it('adopte', 'Harmoniser le précompte mobilier à 21 % et ajouter une cotisation de 4 % sur les revenus mobiliers au-delà d’environ 20 000 €.', '80',
       'Adopté en décembre 2011. Un an plus tard, le gouvernement le remplace par un taux unique de 25 % et supprime la cotisation de 4 %.',
       mesure='Précompte mobilier à 21 % et cotisation de 4 %'),
    it('adopte', 'Plafonner le taux des intérêts notionnels à 3 % en 2012.', '81',
       'Adopté dans la même loi de décembre 2011.', mesure='Précompte mobilier à 21 % et cotisation de 4 %'),
    it('adopte', 'Créer une contribution de stabilité financière à charge des banques.', '82',
       'Loi du 28 décembre 2011.', mesure='Contribution de stabilité financière des banques'),
    it('non', 'Augmenter de 300 millions d’euros le produit de la rente nucléaire.', '82',
       'Aucun texte relevé à ce stade dans cette fiche.'),
    it('non', 'Limiter les paiements en espèces à 3 000 € au plus tard en 2014.', '83',
       'Aucun texte relevé à ce stade dans cette fiche.'),
    it('non', 'Relever de 200 € la quotité exemptée d’impôt à partir de 2013.', '84, 113',
       'Aucun texte relevé à ce stade dans cette fiche.'),
    it('adopte', 'Limiter les allocations d’insertion à trois ans pour une partie des bénéficiaires.', '89',
       'Arrêté royal du 28 décembre 2011 : premières fins de droit le 1er janvier 2015.', mesure='Allocations d’insertion limitées à trois ans'),
    it('adopte', 'Renforcer la dégressivité des allocations de chômage.', '79, 85-102',
       'Arrêté royal du 23 juillet 2012, en vigueur le 1er novembre 2012.', mesure='Dégressivité renforcée des allocations de chômage'),
    it('adopte', 'Porter l’âge de la pension anticipée à 62 ans en 2016, avec 40 ans de carrière, avec des exceptions pour les carrières longues.', '102',
       'Loi du 28 décembre 2011, aménagée en juillet 2012.', mesure='Pension anticipée retardée'),
    it('partiel', 'Adopter le statut unique ouvriers-employés pour le 8 juillet 2013, échéance fixée par la Cour constitutionnelle.', '96',
       'Adopté, mais après l’échéance : loi du 26 décembre 2013. En 2015, la Cour annule le régime plus court prévu pour la construction.',
       mesure='Statut unique ouvriers-employés'),
    it('adopte', 'Scinder la circonscription électorale de Bruxelles-Hal-Vilvorde.', '18',
       'Lois du 19 juillet 2012.', mesure='Scission de Bruxelles-Hal-Vilvorde'),
    it('adopte', 'Transférer aux Régions et Communautés environ 16,9 milliards d’euros de compétences, avec une nouvelle loi de financement et un Sénat des entités fédérées.', '13, 33-73',
       'Lois du 6 janvier 2014 (sixième réforme de l’État).', mesure='Sixième réforme de l’État'),
    it('partiel', 'Fermer les centrales nucléaires « conformément à la loi de 2003 », les dates définitives dépendant des nouvelles capacités de production.', '127',
       'La loi du 18 décembre 2013 permet à Tihange 1 de fonctionner dix ans de plus que la loi de 2003. L’accord prévoyait lui-même d’adapter le calendrier selon les capacités disponibles.',
       mesure='Prolongation de Tihange 1'),
    it('non', 'Limiter la croissance du budget des soins de santé à 2 % en 2013 et 3 % en 2014, plus l’indexation.', '109',
       'Pas encore vérifié dans les budgets de l’INAMI.'),
    it('non', 'Réduire d’au moins la moitié le nombre d’arrondissements judiciaires.', '137',
       'Aucun texte relevé à ce stade dans cette fiche.'),
    it('non', 'Donner une réponse définitive aux demandes d’asile dans les six mois.', '130',
       'Délai non mesuré ici. La loi de janvier 2012 restreint l’accueil (voir les mesures), mais elle ne porte pas sur ce délai.'),
]
check('di-rupo', dr)
G['di-rupo']['compare'] = {
    'intro': 'Le gouvernement Di Rupo est formé en décembre 2011, 541 jours après les élections, en pleine crise de la dette dans la zone euro. Il gouverne deux ans et demi, jusqu’aux élections de mai 2014.',
    'items': dr,
    'hors': [
        ['Norme salariale de 0 % pour 2013-2014', 'fixée par arrêté royal en avril 2013 ; l’accord ne fixait pas de norme.'],
        ['« Fairness tax »', 'taxe de 5,15 % sur les dividendes des grandes sociétés qui paient peu d’impôt, adoptée en juillet 2013 ; l’accord n’en parle pas.'],
    ],
}

# ---------------- Michel I ----------------
mi = [
    it('chiffre', 'Atteindre l’équilibre budgétaire structurel en 2018.', '4',
       f'Solde public de 2018 : {d(2018)} du PIB ({d(2014)} en 2014). L’accord vise le solde structurel, corrigé de la conjoncture, que nos séries ne publient pas : la comparaison n’est qu’indicative.',
       src=[EU_DEF]),
    it('chiffre', '« La pression fiscale et parafiscale globale ne peut pas augmenter. »', '3-4',
       f'Impôts et cotisations sociales : {pc(TAX[2014 - 1995])} du PIB en 2014, {pc(TAX[2018 - 1995])} en 2018 (Eurostat, gov_10a_taxag).',
       src=[['Dossier Fiscalité : niveau des prélèvements', '__FISCALITE__#f-niveau']]),
    it('chiffre', 'La pression fiscale sur le travail « doit diminuer ».', '3-4',
       f'Coin fiscal sur un bas salaire (célibataire à 67 % du salaire moyen) : {pc(WEDGE[2014 - 2000])} du coût du travail en 2014, {pc(WEDGE[2018 - 2000])} en 2018 (Eurostat). Ce cas type ne résume pas tous les salaires.',
       src=[['Dossier Fiscalité : qui paie ?', '__FISCALITE__#f-qui']]),
    it('adopte', 'Appliquer un saut d’index en 2015.', '21',
       'Loi du 23 avril 2015.', mesure='Saut d’index'),
    it('adopte', 'Ramener les cotisations patronales de 33 % à 25 %, avec un ancrage légal.', '5',
       'Prévu par la loi du 26 décembre 2015 (« tax shift »), avec un taux ramené vers 25 % en 2018. Détail à confirmer dans le texte de la loi (voir la mesure).',
       mesure='« Tax shift »'),
    it('adopte', 'Alléger l’impôt sur le travail par un « tax shift », en relevant notamment les frais professionnels forfaitaires.', '92, 96',
       'Loi du 26 décembre 2015, financée notamment par les accises et le précompte mobilier.', mesure='« Tax shift »'),
    it('adopte', 'Créer un impôt de transparence sur les trusts et autres constructions juridiques.', '95',
       '« Taxe Caïman » dans la loi-programme du 10 août 2015 (contenu à confirmer dans le texte, voir la mesure).', mesure='Loi-programme de juillet 2015'),
    it('adopte', 'Horeca : permettre aux travailleurs occupés au moins à 4/5 ailleurs de travailler dans le secteur pour le salaire net plus 25 % de cotisations patronales.', '34',
       'Flexi-jobs créés par la loi du 16 novembre 2015.', mesure='Création des flexi-jobs'),
    it('adopte', 'Assouplir l’organisation du temps de travail, par exemple par l’annualisation, après avis des partenaires sociaux.', '24',
       'Loi du 5 mars 2017 sur le travail « faisable et maniable ».', mesure='Travail « faisable et maniable » (loi Peeters)'),
    it('adopte', 'Adapter la loi de 1996 sur la norme salariale pour résorber le handicap salarial accumulé depuis 1996.', '5, 19',
       'Loi du 19 mars 2017. La résorption effective du handicap salarial n’est pas mesurée ici.', mesure='Nouvelle loi sur la norme salariale'),
    it('partiel', 'Porter l’âge légal de la pension à 66 ans en 2025 et 67 ans en 2030 ; pension anticipée à 62,5 ans en 2017 et 63 ans en 2018, avec 41 puis 42 ans de carrière.', '44',
       'Âge légal adopté tel qu’annoncé (loi du 10 août 2015). Pour la pension anticipée, le seuil de 63 ans avec 42 ans de carrière s’applique à partir de 2019, un an plus tard que prévu.',
       mesure='Âge de la pension porté à 66 puis 67 ans'),
    it('adopte', 'Limiter la croissance des soins de santé à 1,5 % au-delà de l’inflation.', '7',
       'Loi-programme du 19 décembre 2014, article 142 (référence à confirmer, voir la mesure).', mesure='Norme de croissance des soins de santé à 1,5 %'),
    it('adopte', 'Prolonger Doel 1 et Doel 2, sans dépasser 2025.', '8, 109',
       'Loi du 28 juin 2015.', mesure='Prolongation de Doel 1 et Doel 2'),
    it('non', 'Mettre en place un système de pension à points au plus tard en 2030.', '42',
       'Aucune loi relevée pendant le mandat.'),
    it('non', 'Supprimer le bonus de pension à partir de 2015.', '47',
       'Aucun texte relevé à ce stade dans cette fiche.'),
    it('non', 'Relever l’âge du régime de chômage avec complément d’entreprise (prépension) de 60 à 62 ans.', '27',
       'Aucun texte relevé à ce stade dans cette fiche.'),
    it('non', 'Porter les allocations minimales au seuil de pauvreté européen ; affecter les enveloppes « bien-être » à 100 % ou plus.', '8, 62',
       'Aucun texte ni montant relevé à ce stade dans cette fiche.'),
    it('non', 'Décider du remplacement des avions de combat F-16.', '222',
       'Décision non encore documentée dans cette fiche.'),
]
check('michel-1', mi)
G['michel-1']['compare'] = {
    'intro': 'Le gouvernement Michel I gouverne quatre ans, d’octobre 2014 à décembre 2018, date à laquelle la N-VA le quitte sur le Pacte de Marrakech.',
    'items': mi,
    'hors': [
        ['Réforme de l’impôt des sociétés (2017)', 'taux de base ramené de 33 % à 29 % en 2018, puis 25 % en 2020 ; l’accord ne prévoyait qu’un « pacte fiscal » sans baisse de taux (p. 96).'],
        ['Taxe sur les comptes-titres (2018)', '0,15 % au-delà de 500 000 €, annulée par la Cour constitutionnelle en 2019 ; absente de l’accord.'],
        ['Revenus complémentaires exonérés (2018)', 'jusqu’à 6 000 € par an pour le travail associatif et l’économie collaborative ; absents de l’accord.'],
    ],
}

F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(dr), len(mi))
