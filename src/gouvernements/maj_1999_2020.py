# Verhofstadt I (accord lu en entier, doc. 20/1 – 1999 S.E.), mesures 1999-2011 et 2019-2020 ancrées sur les dossiers de la Chambre,
# les décisions de la Commission européenne et les administrations ; repères chiffrés Eurostat (src/dossiers/*-data.json).
# Seules les pages effectivement ouvertes sont citées ; les points non confirmés sont signalés dans « verif ».
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
R = F.resolve().parents[1] / 'dossiers'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}

def CH(leg, n):
    return [f'Chambre, dossier DOC {leg} {n}', f'https://www.lachambre.be/FLWB/html/{leg}/F/{leg}K{n}.html']

def m(date, date_txt, d, titre, texte, src, v='officiel', ref='', verif=''):
    x = {'date': date, 'date_txt': date_txt, 'd': d, 'titre': titre, 'texte': texte, 'src': src, 'v': v}
    if ref: x['ref'] = ref
    if verif: x['verif'] = verif
    return x

# ---------- repères chiffrés (Eurostat, mêmes séries que les dossiers) ----------
EMP = json.loads((R / 'emploi-data.json').read_text(encoding='utf-8'))['emp']['BE']      # depuis 1999
FIN = json.loads((R / 'finances-data.json').read_text(encoding='utf-8'))
DEBT, DEF = FIN['debtL']['BE'], FIN['defL']['BE']                                         # depuis 1980
def pc(x): return (f'{x:.1f}'.replace('.', ',').replace('-', '−')) + ' %'
def bilan(a, b, note):
    return {'debut': a, 'fin': b, 'lignes': [
        ['Taux d’emploi des 20-64 ans', pc(EMP[a - 1999]), pc(EMP[b - 1999]), '__EMPLOI__#f-emploi'],
        ['Dette publique (% du PIB)', pc(DEBT[a - 1980]), pc(DEBT[b - 1980]), '__FINANCES__#f-dette'],
        ['Solde public (% du PIB)', pc(DEF[a - 1980]), pc(DEF[b - 1980]), '__FINANCES__#f-deficit']],
        'note': note + ' Ces chiffres décrivent la situation, ils ne mesurent pas l’effet du gouvernement. Sources : Eurostat (lfsi_emp_a, gov_10dd_edpt1).'}

# Michel I : le solde affiché pour 2018 était celui de 2017 ; aligné sur la série (2018).
G['michel-1']['bilan'] = bilan(2014, 2018, 'Ces chiffres dépendent aussi de la conjoncture européenne et des autres niveaux de pouvoir.')
G['michel-1']['bilan']['note'] = G['michel-1']['bilan']['note'].replace('  ', ' ')

# ---------- Verhofstadt I : accord ----------
g = G['verhofstadt-1']; ac = g['accord']
ac['titre'] = 'La voie vers le XXIe siècle'
ac['date'] = '14 juillet 1999 (déclaration du gouvernement et accord)'
ac['doc'] = 'Chambre, doc. 20/1 – 1999 (session extraordinaire)'
ac['resume'] = [
    '<b>Budget</b> : « le budget devra être en équilibre en 2002 », dans le respect du pacte de stabilité européen, puis rester en équilibre ; le produit de la valorisation des entreprises publiques doit réduire la dette.',
    '<b>Emploi</b> : taux d’activité de 57,3 %, contre 61,7 % chez les trois principaux partenaires commerciaux et 64,4 % chez les voisins ; baisse des charges d’environ 32 000 francs belges par travailleur et par an à partir du deuxième trimestre 2000 ; un emploi ou une formation pour chaque jeune « endéans les 6 mois » après l’école.',
    '<b>Fiscalité</b> : barèmes de l’impôt des personnes physiques réindexés dès 1999 ; suppression de la contribution complémentaire de crise, en commençant par les revenus les plus bas ; réforme de l’impôt des personnes physiques ; glissement des charges sur le travail vers une taxe CO2-énergie dans un cadre européen.',
    '<b>Sécurité sociale</b> : moyens garantis ; hausse progressive des plus petites pensions, surtout celles des indépendants ; norme de croissance des soins de santé portée de 1,5 % à 2,5 % ; ticket modérateur réduit pour les malades chroniques.',
    '<b>Énergie et mobilité</b> : moratoire nucléaire maintenu, MOX compris ; désactivation des centrales « dès qu’elles auront atteint l’âge de 40 ans » ; libéralisation de l’électricité avec un régulateur indépendant ; nouvelle dynamique pour la SNCB et RER à Bruxelles.',
    '<b>Sécurité et justice</b> : exécution des accords Octopus, réforme des polices pour le 31 mars 2001 ; plan de sécurité ; tribunaux de l’application des peines.',
    '<b>Société ouverte</b> : naturalisation gratuite, avis du parquet en un mois ; régularisation au cas par cas, notamment après quatre ans de procédure d’asile (trois ans pour les familles avec enfants scolarisés) ; mise en œuvre de la cohabitation légale ; loi contre les discriminations.',
    '<b>Institutions et éthique</b> : effet de la case de tête réduit de moitié, suppléants supprimés ; charges administratives −10 % en deux ans, −25 % en fin de législature ; aide au développement « à nouveau vers 0,7 % du PNB » ; euthanasie laissée au Parlement ; agence fédérale pour la sécurité alimentaire après la crise de la dioxine.',
]
ac['chapitres'] = [
    {'t': 'Déclaration du Premier ministre', 'p': '1-10', 'pts': ['Majorité de six partis issue des élections du 13 juin 1999 ; plus de 80 000 bénéficiaires du minimex, dont près de la moitié a moins de 35 ans ; agence alimentaire opérationnelle avant le 1er janvier 2000.']},
    {'t': 'Lignes de force', 'p': '10-11', 'pts': ['Équilibre budgétaire en 2002 ; moyens de la sécurité sociale garantis ; baisse progressive de la pression fiscale et parafiscale ; développement durable.']},
    {'t': '1. Une administration efficace', 'p': '11-14', 'pts': ['Audit externe sous l’autorité du Premier ministre ; recrutement par concours (pacte de dépolitisation) ; mandats pour les fonctionnaires dirigeants ; charges administratives −10 % puis −25 %.']},
    {'t': '2. La démocratie citoyenne', 'p': '14-17', 'pts': ['Effet de la case de tête réduit de moitié, suppression des suppléants ; exécution des lois du 2 mai 1995 sur les mandats et le patrimoine ; conférence intergouvernementale et interparlementaire sur le renouveau institutionnel.']},
    {'t': '3. Une société sûre', 'p': '17-22', 'pts': ['Réforme des polices pour le 31 mars 2001 ; plan de sécurité (accès à la police 24 heures sur 24) ; mesures pour les tribunaux de Bruxelles ; comparution immédiate et peines alternatives.']},
    {'t': '4. Une société ouverte', 'p': '22-24', 'pts': ['Naturalisation gratuite, avis du parquet en un mois ; régularisation après quatre ans (trois avec enfants scolarisés) ; cohabitation légale ; loi anti-discrimination.']},
    {'t': '5. Des grandes villes viables', 'p': '24-25', 'pts': ['Revenu cadastral réduit pour les immeubles professionnels des quartiers en difficulté ; financement des villes par enveloppes liées à des objectifs.']},
    {'t': '6. L’État social actif', 'p': '25-32', 'pts': ['Taux d’activité de 57,3 % (15-64 ans) ; baisse des charges d’environ 32 000 francs par travailleur dès le deuxième trimestre 2000, évaluée en fin de deuxième année ; réindexation de l’impôt des personnes physiques dès 1999 ; baisse du taux de l’impôt des sociétés à budget neutre ; tests de TVA réduite sur les services à forte intensité de main-d’œuvre.']},
    {'t': '7. Une sécurité sociale moderne', 'p': '32-36', 'pts': ['Hausse des plus petites pensions, adaptation régulière au bien-être ; deuxième pilier encouragé ; soins de santé +2,5 % par an ; charte des droits du patient ; génériques ; plus de 11 % des plus de 65 ans en perte d’autonomie ; statut de l’artiste.']},
    {'t': '8. Mobilité et développement durable', 'p': '36-39', 'pts': ['Labels écologiques ; fiscalité « écologisée » ; sanctions pour les retards de la SNCB ; RER ; régulateur de l’électricité ; moratoire nucléaire et désactivation à 40 ans ; engagements de Rio et de Kyoto.']},
    {'t': '9-10. Europe et monde', 'p': '39-46', 'pts': ['Présidence de l’Union au second semestre 2001 ; extension de la majorité qualifiée ; au moins un commissaire par État ; coopération au développement vers 0,7 % du PNB ; suites de la commission d’enquête sur le Rwanda.']},
    {'t': '11-12. Questions éthiques et crise alimentaire', 'p': '46-49', 'pts': ['Euthanasie tranchée par le Parlement selon la conscience de chacun ; évaluation de la politique des drogues en six mois ; agence fédérale pour la sécurité des aliments ; interdiction des farines animales ; avances aux secteurs touchés sur cinq ans, sans intérêt ; principe de précaution pour les OGM.']},
]
ac['lecture'] = 'Résumé établi sur le texte intégral (49 pages) : déclaration du Premier ministre (p. 1-10), puis accord de gouvernement en quatre lignes de force et douze chapitres. Les montants y sont en francs belges ; le titre est imprimé « XXe siècle » en page 10, par coquille.'
g['contexte'] = [
    {'date': 'Mai-juin 1999', 'texte': 'Crise de la dioxine dans la chaîne alimentaire, juste avant les élections : l’accord y consacre son dernier chapitre.', 'src': [['Accord, chapitre 12', ac['url']]]},
]
L50 = lambda n: CH('50', n)
g['mesures'] = [
    m('2000-01-10', 'Décembre 1999', 'social', 'Régularisation de certaines catégories d’étrangers',
      'Opération ponctuelle, sur demande, pour quatre catégories : procédure d’asile longue, impossibilité de retour, maladie grave, attaches sociales durables. 37 146 demandes, couvrant plus de 50 000 personnes ; au 20 juillet 2004, 25 511 dossiers régularisés et 10 884 rejetés (réponse du ministre de l’Intérieur, citée dans le DOC 51 1810/001).',
      [L50('0234'), ['Chambre, DOC 51 1810/001 (chiffres)', 'https://www.lachambre.be/FLWB/pdf/51/1810/51K1810001.pdf']],
      ref='Loi du 22 décembre 1999 ; Moniteur belge du 10 janvier 2000'),
    m('2001-08-03', 'Juillet 2001', 'eco', 'Accords du Lambermont : refinancement des Communautés',
      'Refinancement des Communautés, dont l’enseignement francophone, par une part accrue de la TVA ; autonomie fiscale élargie des Régions (impôts régionaux, centimes additionnels à l’impôt des personnes physiques).',
      [L50('1183')], ref='Loi spéciale du 13 juillet 2001 ; Moniteur belge du 3 août 2001',
      verif='Montants du refinancement non relevés ; la seconde loi spéciale du même jour (agriculture, lois communales et provinciales) n’a pas été vérifiée.'),
    m('2001-08-11', 'Juillet 2001', 'social', 'Titres-services',
      'Titre subventionné par l’État pour payer des services ménagers fournis par une entreprise agréée, afin de créer des emplois de proximité.',
      [L50('1281')], ref='Loi du 20 juillet 2001 ; Moniteur belge du 11 août 2001',
      verif='Coût et nombre d’emplois : à relever dans les évaluations annuelles du SPF Emploi.'),
    m('2001-09-14', 'Septembre 2001', 'eco', 'Fonds de vieillissement',
      'Fonds alimenté par les excédents budgétaires et des recettes non fiscales, pour financer le surcoût du vieillissement à partir de 2010, avec une loi qui garantit la réduction continue de la dette publique.',
      [L50('1269')], ref='Loi du 5 septembre 2001 ; Moniteur belge du 14 septembre 2001',
      verif='Montants accumulés non relevés dans une source officielle.'),
    m('2001-09-20', 'Août 2001', 'eco', 'Réforme de l’impôt des personnes physiques',
      'Suppression des taux de 52,5 % et 55 %, taux maximal ramené à 50 % par étapes ; crédit d’impôt remboursable pour les bas revenus du travail ; forfait de frais professionnels relevé ; cohabitants légaux imposés comme les couples mariés ; décumul des revenus.',
      [L50('1270'), ['Chambre, exposé des motifs (DOC 50 1270/001)', 'https://www.lachambre.be/FLWB/PDF/50/1270/50K1270001.pdf']],
      ref='Loi du 10 août 2001 ; Moniteur belge du 20 septembre 2001',
      verif='Coût total de la réforme non chiffré dans la partie de l’exposé des motifs lue.'),
    m('2002-01-01', 'Janvier 2002', 'social', 'Crédit-temps',
      'Remplace l’interruption de carrière dans le secteur privé : le travailleur peut réduire ou suspendre son travail sans accord de l’employeur, et celui-ci n’a plus l’obligation de le remplacer.',
      [['SPF Emploi', 'https://emploi.belgique.be/fr/themes/jours-feries-et-conges/credit-temps-cct-ndeg-103/origine-et-remise-en-contexte-du-credit']],
      ref='CCT n° 77bis du 19 décembre 2001 (Conseil national du Travail), en vigueur le 1er janvier 2002 ; allocations fixées par arrêté royal du 12 décembre 2001'),
    m('2002-07-04', 'Juin 2002', 'social', 'Maximum à facturer en soins de santé',
      'Au-delà d’un plafond annuel de tickets modérateurs, l’assurance maladie rembourse 100 %. Plafond selon le revenu du ménage, de 450 € (revenus jusqu’à 13 400 €) à 2 500 € (au-delà de 49 600 €) ; 450 € pour les catégories sociales, 650 € pour les enfants de moins de 16 ans.',
      [L50('1697'), ['Chambre, exposé des motifs (DOC 50 1697/001)', 'https://www.lachambre.be/FLWB/PDF/50/1697/50K1697001.pdf']],
      ref='Loi du 5 juin 2002 ; Moniteur belge du 4 juillet 2002'),
    m('2003-02-28', 'Janvier 2003', 'eco', 'Sortie progressive du nucléaire',
      'Désactivation des réacteurs après 40 ans d’exploitation et interdiction de construire de nouvelles centrales nucléaires.',
      [L50('1910')], ref='Loi du 31 janvier 2003 ; Moniteur belge du 28 février 2003',
      verif='La règle des 40 ans et l’interdiction de nouvelles centrales sont à confirmer à la lecture des articles de la loi.'),
    m('2003-05-15', 'Avril 2003', 'social', 'Pensions complémentaires (deuxième pilier)',
      'Vise à « démocratiser » les pensions complémentaires, notamment pour les ouvriers et les PME : encouragement des plans sectoriels, plans « sociaux » exonérés de la taxe de 4,4 %.',
      [L50('1340'), ['Chambre, exposé des motifs (DOC 50 1340/001)', 'https://www.lachambre.be/FLWB/PDF/50/1340/50K1340001.pdf']],
      ref='Loi du 28 avril 2003 ; Moniteur belge du 15 mai 2003',
      verif='Garantie de rendement minimal non relevée dans la partie du texte lue.'),
]
g['bilan'] = bilan(1999, 2003, 'Série d’emploi d’Eurostat rompue en 2001 : la comparaison 1999-2003 est approximative.')

# ---------- Verhofstadt II : mesures ----------
g = G['verhofstadt-2']
L51 = lambda n: CH('51', n)
g['mesures'] = [
    m('2004-01-06', 'Décembre 2003', 'eco', 'Déclaration libératoire unique (amnistie fiscale)',
      'Régularisation de capitaux non déclarés contre un prélèvement unique de 6 %, ou de 9 % sans réinvestissement d’au moins trois ans. La Cour d’arbitrage rejette les recours en 2005 : elle juge le taux non manifestement disproportionné, vu le caractère unique de la mesure.',
      [L51('0353'), ['Cour d’arbitrage, arrêt n° 72/2005', 'https://fr.const-court.be/public/f/2005/2005-072f.pdf']],
      ref='Loi du 31 décembre 2003 ; Moniteur belge du 6 janvier 2004',
      verif='Recette effective : seul un chiffre de presse a été trouvé ; il n’est pas repris.'),
    m('2004-07-01', 'Juillet 2004', 'social', 'Activation du comportement de recherche d’emploi',
      'Les chômeurs sont convoqués à des entretiens de suivi ; en cas d’efforts jugés insuffisants, l’allocation peut être réduite puis supprimée. Application en juillet 2004 aux moins de 30 ans, en 2005 aux 30-39 ans, en 2006 aux 40-49 ans.',
      [['Regards économiques n° 112 (UCL, 2014)', 'https://www.regards-economiques.be/images/reco-pdf/reco_142.pdf']],
      v='reference', ref='Accord de coopération du 30 avril 2004 entre l’État fédéral, les Régions et les Communautés',
      verif='Arrêté royal modifiant la réglementation du chômage : date et Moniteur à relever.'),
    m('2005-01-01', 'Janvier 2005', 'eco', 'SNCB scindée, dette reprise par l’État',
      'Le groupe SNCB devient trois sociétés anonymes de droit public : SNCB-Holding, Infrabel (le réseau) et SNCB (le transport) ; « l’endettement historique du groupe a été repris par l’État ». L’accord de 2003 annonçait une reprise de 7,4 milliards d’euros.',
      [['Infrabel, rapport annuel 2005', 'https://infrabel.be/sites/default/files/generated/files/report/rapport_annuel_infrabel_2005.pdf']],
      verif='Montant effectivement repris et acte juridique de la reprise à confirmer.'),
    m('2005-06-30', 'Juin 2005', 'eco', 'Intérêts notionnels',
      'Déduction d’un intérêt fictif calculé sur les fonds propres des sociétés, au taux moyen de l’OLO à 10 ans (plafonné à 6,5 %, +0,5 point pour les PME). Elle accompagne la fin des centres de coordination ; la déduction pour investissement de base et un crédit d’impôt sont supprimés en compensation.',
      [L51('1778'), ['Chambre, exposé des motifs (DOC 51 1778/001)', 'https://www.lachambre.be/FLWB/PDF/51/1778/51K1778001.pdf']],
      ref='Loi du 22 juin 2005 ; Moniteur belge du 30 juin 2005',
      verif='Coût budgétaire : aucun chiffre officiel relevé (seulement des estimations de presse ou de l’opposition, non reprises).'),
    m('2005-12-30', 'Décembre 2005', 'social', 'Pacte de solidarité entre les générations',
      'Fins de carrière : bonus de pension pour qui travaille après 62 ans ou après 44 ans de carrière (pensions prenant cours à partir du 1er janvier 2007) ; règles de la prépension resserrées ; malus de retraite anticipée des indépendants réaménagé. Adopté après les grèves générales d’octobre 2005.',
      [L51('2128'), ['Chambre, exposé des motifs (DOC 51 2128/001)', 'https://www.lachambre.be/FLWB/PDF/51/2128/51K2128001.pdf']],
      ref='Loi du 23 décembre 2005 ; Moniteur belge du 30 décembre 2005',
      verif='Nouvel âge et condition de carrière de la prépension non relevés dans la partie du texte lue.'),
    m('2005-12-30', 'Décembre 2005', 'social', 'Liaison des allocations au bien-être',
      'Tous les deux ans, le gouvernement répartit une enveloppe pour adapter les allocations sociales au bien-être, après avis des partenaires sociaux ; références de 0,5 % pour les allocations, 1 % pour les forfaits et 1,25 % pour les plafonds ; enveloppe annuelle en 2008, puis tous les deux ans dès 2009.',
      [L51('2128')], ref='Loi du 23 décembre 2005 (Pacte de solidarité entre les générations), titre II, chapitre 2'),
]
g['bilan'] = bilan(2003, 2007, 'Série d’emploi d’Eurostat rompue en 2005.')

# ---------- Leterme I (crise financière) ----------
g = G['leterme-1']
EC = 'Commission européenne, décision '
g['contexte'] = [
    {'date': 'Septembre-octobre 2008', 'texte': 'Crise financière mondiale : l’État intervient dans Fortis, Dexia, KBC et Ethias.'},
]
g['mesures'] = [
    m('2008-10-05', 'Septembre-octobre 2008', 'eco', 'Sauvetage de Fortis',
      'L’État acquiert 49,93 % de Fortis Banque pour 4,7 milliards d’euros, puis les 50 % restants pour 4,7 milliards ; il en cède ensuite 75 % à BNP Paribas contre 8,25 milliards d’euros en actions BNP Paribas, et prend 24 % d’un portefeuille de crédits structurés de 10,4 milliards.',
      [[EC + 'C(2008) 8085 (aide NN 42/2008)', 'https://ec.europa.eu/competition/state_aid/cases/227768/227768_1027866_42_1.pdf']],
      ref='Décision du 3 décembre 2008',
      verif='Coût net final pour l’État (cessions, dividendes) non établi ; le prêt de liquidité de la Banque nationale est occulté dans la version publique.'),
    m('2008-09-30', 'Septembre 2008', 'eco', 'Sauvetage de Dexia',
      'Augmentation de capital de 6 milliards d’euros, dont 3 milliards côté belge : État fédéral 1 milliard, Flandre 500 millions, Wallonie 350 millions, Bruxelles 150 millions, et 1 milliard d’actionnaires belges (Holding communal, Arcofin, Ethias) ; garantie de financement plafonnée à 150 milliards, portée à 60,5 % par la Belgique.',
      [[EC + 'C(2008) 7388 (aide NN 49/2008)', 'https://ec.europa.eu/competition/state_aid/cases/227704/227704_1154232_115_2.pdf'],
       ['Communiqué du 30 septembre 2008', 'https://news.belgium.be/fr/node/10031/pdf']],
      ref='Décision du 19 novembre 2008'),
    m('2008-10-17', 'Octobre 2008', 'eco', 'Loi sur la stabilité financière et garantie des dépôts',
      'Loi permettant à l’État d’intervenir et de garantir les crédits entre banques. La garantie des dépôts bancaires passe ensuite de 20 000 à 100 000 euros, et la même protection est étendue à l’assurance vie de la branche 21.',
      [CH('52', '1470'), ['Conseil des ministres du 23 octobre 2008', 'https://news.belgium.be/fr/node/9137/pdf']],
      ref='Loi du 15 octobre 2008 ; Moniteur belge du 17 octobre 2008',
      verif='Arrêté royal portant la garantie à 100 000 euros : date et Moniteur à confirmer.'),
    m('2008-12-18', 'Octobre-décembre 2008', 'eco', 'Aides à KBC et Ethias',
      'KBC : 3,5 milliards d’euros de titres spéciaux souscrits par la Société fédérale de participations et d’investissement. Ethias : 1,5 milliard d’euros, apportés à parts égales par l’État fédéral, la Flandre et la Wallonie (mesures annoncées le 20 octobre 2008).',
      [[EC + 'C(2008) 8820 (KBC, aide N 602/2008)', 'https://ec.europa.eu/competition/state_aid/cases/228625/228625_1153972_25_2.pdf'],
       [EC + 'C(2009) 990 (Ethias, aide NN 57/2008)', 'https://ec.europa.eu/competition/state_aid/cases/228044/228044_1016051_76_1.pdf']],
      ref='Décisions du 18 décembre 2008 et du 12 février 2009',
      verif='Aide flamande ultérieure à KBC (2009) non vérifiée dans une source officielle.'),
]

# ---------- Van Rompuy ----------
g = G['van-rompuy']; ac = g['accord']
ac['titre'] = 'Pas de nouvel accord de coalition : déclaration du gouvernement'
ac['date'] = '31 décembre 2008 ; débat le 2 janvier 2009'
ac['doc'] = 'Chambre, compte rendu intégral CRIV 52 PLEN 072'
ac['url'] = 'https://www.lachambre.be/doc/PCRI/pdf/52/ip072.pdf'
ac['note'] = 'La déclaration n’a pas été déposée comme document parlementaire : elle figure dans le compte rendu de la séance. Son contenu reste à résumer.'
g['contexte'] = [
    {'date': '19 juillet 2009', 'texte': 'Instruction gouvernementale sur la régularisation de séjour : demandes recevables du 15 septembre au 15 décembre 2009. Le Conseil d’État l’annule en décembre 2009 (les dates citées divergent).',
     'src': [['Association pour le droit des étrangers (ADDE)', 'https://www.adde.be/docman/formations-et-colloques-1/formations-2012-1/fde-2012-1/module-1-1/1510-regularisation-2009-c-hublau-1/file.html']]},
    {'date': '22 octobre 2009', 'texte': 'Accord avec l’exploitant pour prolonger de dix ans Doel 1, Doel 2 et Tihange 1, « jusqu’en 2025 », contre une contribution de 215 à 245 millions d’euros au total pour 2010-2014. Aucune loi n’est votée à ce moment.',
     'src': [['Communiqué de GDF Suez (22 octobre 2009)', 'https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2009/10/FCECO013556_20091022.pdf']]},
]
g['mesures'] = [
    m('2009-06-25', 'Juin 2009', 'social', 'Mesures de crise pour l’emploi',
      'Chômage temporaire pour raisons économiques étendu aux employés, et crédit-temps de crise, pour éviter des licenciements pendant la récession.',
      [CH('52', '2003')], ref='Loi du 19 juin 2009 portant des dispositions diverses en matière d’emploi pendant la crise ; Moniteur belge du 25 juin 2009',
      verif='Durées et conditions (baisse du chiffre d’affaires, supplément payé par l’employeur) relevées dans une source secondaire : à confirmer auprès de l’ONEM.'),
]
g['bilan'] = bilan(2008, 2009, 'Mandat de onze mois en pleine crise financière.')

# ---------- Leterme II ----------
g = G['leterme-2']
g['accord']['note'] = 'Aucun document de déclaration n’a été trouvé pour la reprise de fonctions du 25 novembre 2009 (ni document parlementaire, ni compte rendu identifié).'
g['mesures'] = [
    m('2009-12-31', 'Décembre 2009', 'social', 'Prolongation des mesures anticrise et prime de crise',
      'Mesures de crise prolongées jusqu’au 30 juin 2010 ; prime de crise de 1 666 € pour les ouvriers licenciés (555 € payés par l’employeur, 1 111 € par l’ONEM), pour les préavis notifiés du 1er janvier au 30 juin 2010.',
      [CH('52', '2299'), ['Chambre, amendement (DOC 52 2299/014)', 'https://www.lachambre.be/FLWB/PDF/52/2299/52K2299014.pdf']],
      ref='Loi du 30 décembre 2009 portant des dispositions diverses ; Moniteur belge du 31 décembre 2009',
      verif='Montants relevés dans un amendement : à confirmer dans le texte final de la loi.'),
    m('2010-01-01', 'Janvier 2010', 'eco', 'TVA à 12 % dans la restauration',
      'Taux de TVA réduit à 12 % pour les services de restaurant et de restauration, boissons exclues.',
      [['Conseil des ministres du 13 novembre 2009', 'https://news.belgium.be/fr/node/8625/pdf']],
      ref='Arrêté royal modifiant l’arrêté royal n° 20 du 20 juillet 1970',
      verif='Date de l’arrêté royal, publication au Moniteur et entrée en vigueur au 1er janvier 2010 à confirmer.'),
    m('2011-09-12', 'Juillet 2011', 'social', 'Regroupement familial durci',
      'Conditions du regroupement familial resserrées. Le texte vient d’une proposition de loi déposée par des députés, votée alors que le gouvernement est en affaires courantes.',
      [CH('53', '0443')], ref='Loi du 8 juillet 2011 ; Moniteur belge du 12 septembre 2011',
      verif='Contenu précis des nouvelles conditions à relever dans le texte de la loi.'),
]
g['bilan'] = bilan(2009, 2011, 'Dont un an et demi d’affaires courantes.')

# ---------- Michel II, Wilmès I et II ----------
g = G['michel-2']
g['bilan'] = bilan(2018, 2019, 'Mandat de dix mois, presque entièrement en affaires courantes.')

g = G['wilmes-1']
g['mesures'] = [
    m('2019-11-14', 'Octobre 2019', 'eco', 'Budget en douzièmes provisoires',
      'Sans budget voté, l’État fonctionne par crédits provisoires : un douzième du budget précédent par mois. Le projet, déposé sous Michel II, ouvre les crédits pour novembre et décembre 2019.',
      [CH('55', '0413')], ref='Loi du 31 octobre 2019 ; Moniteur belge du 14 novembre 2019',
      verif='Loi des douzièmes pour janvier-mars 2020 (votée le 12 décembre 2019) non encore relevée.'),
]

g = G['wilmes-2']; ac = g['accord']
ac['date'] = '17 mars 2020 (déclaration) ; confiance votée le 19 mars 2020'
ac['doc'] = 'Chambre, compte rendu intégral CRIV 55 PLEN 029'
ac['url'] = 'https://www.lachambre.be/doc/PCRI/pdf/55/ip029.pdf'
ac['resume'] = [
    'Objectif annoncé : « simple et unique : protéger la santé de notre population ».',
    'Confiance votée le 19 mars 2020 par 82 voix contre 44, sans abstention, pour un mandat limité à la crise.',
]
ac['note'] = 'Seuls l’objectif et le vote ont été relevés ; le reste de la déclaration n’est pas encore résumé.'
g['sieges_note'] = 'Gouvernement minoritaire soutenu de l’extérieur, pour la crise sanitaire, par PS, sp.a, Ecolo, Groen, cdH et DéFI. Confiance votée le 19 mars 2020 par 82 voix contre 44.'
g['sieges_src'] = ['Chambre, compte rendu analytique CRABV 55 PLEN 031', 'https://www.lachambre.be/doc/PCRA/pdf/55/ap031.pdf']
g['mesures'] = [
    m('2020-03-24', 'Mars 2020', 'social', 'Droit passerelle de crise pour les indépendants',
      'Revenu de remplacement pour les indépendants contraints d’interrompre leur activité : 1 291,69 € par mois sans charge de famille, 1 614,10 € avec. 415 985 bénéficiaires de mars à juillet 2020 (36 % des affiliés) ; coût estimé à environ 2,5 milliards d’euros pour 2020.',
      [CH('55', '1090'), ['INASTI, Comité général de gestion, évaluation (septembre 2020)', 'https://www.abc-cgg.be/sites/abc/files/2024-07/extension_temporaire_droit%20passerelle_coronavirus_rapport_evaluation.pdf']],
      ref='Loi du 23 mars 2020 ; Moniteur belge du 24 mars 2020'),
    m('2020-03-30', 'Mars 2020', 'eco', 'Pouvoirs spéciaux',
      'Le Parlement habilite le gouvernement pour trois mois, prorogeables une fois, à prendre des arrêtés dans neuf domaines (santé, approvisionnement, droit du travail et sécurité sociale, justice…), à confirmer par une loi dans l’année. Votées par 104 voix contre 8 et 16 abstentions.',
      [CH('55', '1104'), ['Chambre, avis du Conseil d’État (DOC 55 1104/002)', 'https://www.dekamer.be/FLWB/Pdf/55/1104/55K1104002.pdf'],
       ['Chambre, résultat des votes', 'https://www.dekamer.be/kvvcr/pdf_sections/newsletter/0000011342/55-026-plenum-laws02F.pdf']],
      ref='Lois du 27 mars 2020 (I) et (II) ; Moniteur belge du 30 mars 2020 pour la loi (I)',
      verif='Date de publication de la loi (II) non confirmée.'),
    m('2020-04-30', 'Mars-avril 2020', 'social', 'Chômage temporaire « corona »',
      'Chômage temporaire pour force majeure ouvert largement : plus d’un million de travailleurs en avril 2020, 504 657 en moyenne mensuelle sur l’année ; allocation portée de 65 % à 70 % du salaire plafonné, plus un supplément de 5,63 € par jour ; 4,042 milliards d’euros de dépenses supplémentaires.',
      [['ONEM, rapport annuel 2020', 'https://www.onem.be/espace-presse/rapport-annuel-onem-2020']],
      v='a-verifier', verif='Les chiffres sont officiels, mais la base légale (arrêtés de pouvoirs spéciaux) n’est pas encore identifiée.'),
]
g['bilan'] = bilan(2019, 2020, '2020 est l’année du choc du Covid-19.')

M['maj'] = '2026-11-02'; M['maj_txt'] = '2 novembre 2026'
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', {k: len(G[k]['mesures']) for k in G})
