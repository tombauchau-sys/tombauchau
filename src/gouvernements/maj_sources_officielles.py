# Règle de Tom (3 novembre 2026) : chaque information doit avoir une source officielle.
# Di Rupo et Michel I d'abord (pilote « Annoncé et réalisé »), plus deux corrections sur Michel II.
# Sources ouvertes par les agents de recherche, citations recopiées ; liens Moniteur (ELI) construits
# à partir de numacs relus sur les reproductions OpenJustice, gardées comme complément.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
DK = lambda leg, n: [f'Chambre, dossier DOC {leg} {n}', f'https://www.dekamer.be/FLWB/html/{leg}/F/{leg}K{n}.html']
ELI = lambda kind, date, numac: [f'Moniteur belge (numac {numac})', f'https://www.ejustice.just.fgov.be/eli/{kind}/{date}/{numac}/justel']
EL2010 = ['Chambre, liste des élus du 13 juin 2010', 'https://www.dekamer.be/pdf_sections/pri/elections/verkozenen%20%20en%20opvolgers%20F.pdf']
EL2014 = ['SPF Intérieur, résultats des élections du 25 mai 2014 (hébergés par la Chambre)', 'https://www.dekamer.be/kvvcr/pdf_sections/archive/2014.pdf']
ACC11 = G['di-rupo']['accord']['url']

def mes(gid, titre):
    return next(m for m in G[gid]['mesures'] if m['titre'] == titre)

def add(lst, x):
    if x not in lst: lst.append(x)

# ---------------- Di Rupo ----------------
g = G['di-rupo']
g['sieges_src'] = [EL2010, ['Chambre, compte rendu du 10 décembre 2011 (CRIV 53 PLEN 060)', 'https://www.lachambre.be/doc/PCRI/pdf/53/ip060.pdf']]
g['fin_src'] = [EL2014]
g['contexte'] = [
    {'date': '2010-2011', 'texte': 'Le gouvernement prête serment 541 jours après les élections du 13 juin 2010. La Belgique est alors soumise, « comme vingt-deux autres États européens », à la procédure européenne de déficit excessif ; l’accord s’engage sur la trajectoire du Programme de stabilité transmis à la Commission européenne.',
     'src': [EL2010, ['Accord de gouvernement, p. 76', ACC11]]},
    {'date': '2012', 'texte': 'Le budget 2012 prévoit « un effort budgétaire de l’ordre de 11,3 milliards EUR (y compris une série de corrections techniques) » pour le pouvoir fédéral et la sécurité sociale.',
     'src': [['Chambre, budget 2012, exposé général (DOC 53 1942/001)', 'https://www.dekamer.be/FLWB/Pdf/53/1942/53K1942001.pdf']]},
]
m = mes('di-rupo', 'Précompte mobilier unifié à 25 %')
m['texte'] = 'Le précompte mobilier est porté « à 25 p.c., à partir du 1er janvier 2013 » et redevient libératoire ; la cotisation supplémentaire de 4 % est supprimée. Un amendement du gouvernement ajoute un impôt de 0,4 % sur les plus-values d’actions réalisées par les sociétés qui ne sont pas des PME.'
m['src'] = [DK('53', '2561'), ['Chambre, projet de loi-programme (DOC 53 2561/001)', 'https://www.lachambre.be/FLWB/pdf/53/2561/53K2561001.pdf'],
            ['Chambre, rapport de la commission des Finances (DOC 53 2561/006)', 'https://www.lachambre.be/FLWB/pdf/53/2561/53K2561006.pdf']]
m['v'] = 'officiel'
m['ref'] = 'Loi-programme du 27 décembre 2012 ; Moniteur belge du 31 décembre 2012'
m.pop('verif', None)
m = mes('di-rupo', 'Accueil des demandeurs d’asile restreint')
m['src'] = [DK('53', '0813'), DK('53', '1825'), ['Cour constitutionnelle, arrêt n° 107/2013', 'https://fr.const-court.be/public/f/2013/2013-107f.pdf']]
m['v'] = 'officiel'; m.pop('verif', None)
m['ref'] = 'Deux lois du 19 janvier 2012 ; Moniteur belge du 17 février 2012'
m = mes('di-rupo', 'Norme salariale de 0 % pour 2013-2014')
m['src'] = [['SPF Emploi, norme salariale', 'https://emploi.belgique.be/fr/themes/remuneration/norme-salariale'],
            ['Sénat, question écrite n° 5-7257 (réponse du 6 juin 2013)', 'https://senate.be/www/?LANG=fr&LEG=5&MIval=Vragen%2FSVPrint&NR=7257'],
            ['Cour constitutionnelle, arrêt n° 152/2016', 'https://fr.const-court.be/public/f/2016/2016-152f.pdf']]
m['v'] = 'officiel'
m['ref'] = 'Arrêté royal du 28 mars 2013, pris faute d’accord entre partenaires sociaux ; Moniteur belge du 2 mai 2013'
m['date_txt'] = 'Mars 2013'
m = mes('di-rupo', 'Pension anticipée retardée')
add(m['src'], ['Chambre, amendements (DOC 53 1952/003)', 'https://www.dekamer.be/FLWB/PDF/53/1952/53K1952003.pdf'])
add(m['src'], ['Service fédéral des Pensions, brochure « Pensions de retraite du régime des fonctionnaires »', 'https://www.sfpd.fgov.be/files/1264/pensionderetraite.pdf'])
m['verif'] = 'Calendrier confirmé par l’amendement n° 12 et le SFP pour le secteur public ; pour les salariés (amendement n° 32), le texte n’a été lu qu’en partie.'
m = mes('di-rupo', 'Allocations d’insertion limitées à trois ans')
m['src'] = [s for s in m['src'] if 'ulb.ac.be' not in s[1]]
m = mes('di-rupo', 'Dégressivité renforcée des allocations de chômage')
m['src'] = [s for s in m['src'] if 'ulb.ac.be' not in s[1]]

cp = g['compare']
for x in cp['items']:
    if x['eng'].startswith('Ramener le déficit'):
        x['ctx'] = 'la Belgique est soumise à la procédure européenne de déficit excessif ; l’objectif reprend le Programme de stabilité transmis à la Commission européenne (accord, p. 76).'
    if x['eng'].startswith('Limiter la croissance du budget des soins'):
        x['src'] = [DK('53', '2198'), ['Chambre, texte adopté (DOC 53 2198/019), article 122', 'https://www.dekamer.be/FLWB/pdf/53/2198/53K2198019.pdf'],
                    ELI('loi', '2012/06/22', '2012021092'), ['Conseil des ministres du 30 novembre 2012', 'https://news.belgium.be/fr/node/15181/pdf']]
        x['constat'] = x['constat'].replace('Inscrit dans la loi-programme du 22 juin 2012, article 122', 'Inscrit dans la loi-programme du 22 juin 2012 (Moniteur du 28 juin 2012), article 122')
cp['intro'] = 'Le gouvernement Di Rupo prête serment en décembre 2011, 541 jours après les élections, alors que la Belgique est soumise à la procédure européenne de déficit excessif. Il gouverne deux ans et demi, jusqu’aux élections de mai 2014.'
cp['hors'] = [
    ['Norme salariale de 0 % pour 2013-2014', 'fixée par arrêté royal du 28 mars 2013, faute d’accord entre partenaires sociaux ; l’accord de gouvernement ne fixait pas de norme.', 'Norme salariale de 0 % pour 2013-2014'],
    ['« Fairness tax »', 'taxe de 5,15 % sur les dividendes des grandes sociétés qui paient peu d’impôt, adoptée en juillet 2013 ; l’accord n’en parle pas.', '« Fairness tax » et TVA sur les avocats'],
]

# ---------------- Michel I ----------------
g = G['michel-1']
g['sieges_src'] = [EL2014]
g['fin_txt'] = 'Le 9 décembre 2018, la démission des ministres et secrétaires d’État N-VA est acceptée par arrêté royal ; MR, CD&V et Open VLD poursuivent seuls (gouvernement Michel II).'
g['fin_src'] = [['Conseil des ministres, communiqué du 9 décembre 2018', 'https://news.belgium.be/fr/node/22506/pdf']]
cp = g['compare']
cp['intro'] = 'Le gouvernement Michel I gouverne quatre ans, d’octobre 2014 au 9 décembre 2018, date de la démission des ministres N-VA. Deux événements absents de l’accord marquent la législature : le nombre record de demandes d’asile de 2015 et les attentats du 22 mars 2016 (voir le contexte). Leur effet sur les résultats ci-dessous n’est pas mesuré ici.'
cp['hors'] = [
    ['Réforme de l’impôt des sociétés (2017)', 'taux de base ramené de 33 % à 29 % en 2018, puis 25 % en 2020 ; l’accord ne prévoyait qu’un « pacte fiscal » sans baisse de taux (p. 96).', 'Réforme de l’impôt des sociétés'],
    ['Taxe sur les comptes-titres (2018)', '0,15 % au-delà de 500 000 €, annulée par la Cour constitutionnelle en 2019 ; absente de l’accord.', 'Première taxe sur les comptes-titres'],
    ['Revenus complémentaires exonérés (2018)', 'jusqu’à 6 000 € par an pour le travail associatif et l’économie collaborative ; absents de l’accord.', 'Revenus complémentaires exonérés (« travail associatif »)'],
]
for x in cp['items']:
    if x['eng'].startswith('Ramener les cotisations patronales'):
        x['src'] = [ELI('loi', '2015/12/26', '2015206007')] + [s for s in x.get('src', []) if 'openjustice' in s[1]]
    if x['eng'].startswith('Relever l’âge du régime de chômage'):
        x['src'] = [ELI('arrete', '2014/12/30', '2014012252')] + x['src']
m = mes('michel-1', 'Création des flexi-jobs'); add(m['src'], ELI('loi', '2015/11/16', '2015205102'))
m = mes('michel-1', 'Travail « faisable et maniable » (loi Peeters)'); add(m['src'], ELI('loi', '2017/03/05', '2017011012'))
m = mes('michel-1', '« Tax shift »'); add(m['src'], ELI('loi', '2015/12/26', '2015206007'))

# ---------------- Michel II : attribution corrigée d'après le compte rendu de la Chambre ----------------
CRIV18 = ['Chambre, compte rendu du 18 décembre 2018 (CRIV 54 PLEN 263)', 'https://www.dekamer.be/doc/PCRI/pdf/54/ip263.pdf']
ac = G['michel-2']['accord']
ac['resume'][1] = 'Le 18 décembre 2018, à la Chambre, il répond à la « main tendue » de groupes d’opposition : « nous proposons de prendre la main qui a été tendue par quelques-uns ». Puis : « Je dois bien constater que cet appel n’a pas convaincu », et il annonce sa démission.'
ac['liens'] = ac.get('liens', [])
add(ac['liens'], ['Chambre, compte rendu du 18 décembre 2018', CRIV18[1]])
for c in G['michel-2'].get('contexte', []):
    if c['date'] == '9 décembre 2018':
        add(c['src'], ['Conseil des ministres, communiqué du 9 décembre 2018', 'https://news.belgium.be/fr/node/22506/pdf'])
    if c['date'] == '18-21 décembre 2018':
        add(c['src'], CRIV18)
    if c['date'] == '27 septembre 2018':
        c['texte'] = 'À l’Assemblée générale de l’ONU, Charles Michel soutient le Pacte mondial pour des migrations sûres, ordonnées et régulières ; selon une proposition de résolution déposée à la Chambre, il déclare : « Mon pays signera en décembre le Pacte mondial sur les migrations à Marrakech. » La N-VA s’y oppose à partir de fin octobre.'
        add(c['src'], ['ONU, débat général, Belgique (27 septembre 2018)', 'https://gadebate.un.org/en/73/belgium'])
        add(c['src'], ['Chambre, DOC 54 3386/001', 'https://www.lachambre.be/FLWB/pdf/54/3386/54K3386001.pdf'])
    if c['date'] == '2 juillet 2019':
        add(c['src'], ['Conseil européen, conclusions du 2 juillet 2019', 'https://data.consilium.europa.eu/doc/document/ST-18-2019-INIT/fr/pdf'])

F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')

# ---------------- Engagements supplémentaires (exhaustivité), sources officielles ouvertes ----------------
DKP = lambda leg, n, doc, lab: [lab, f'https://www.dekamer.be/FLWB/pdf/{leg}/{n}/{leg}K{n}{doc}.pdf']
def it(statut, eng, p, constat, src):
    return {'statut': statut, 'eng': eng, 'p': p, 'constat': constat, 'src': src}
def ins(gid, items):
    cp = G[gid]['compare']
    have = {x['eng'] for x in cp['items']}
    chiffres = [x for x in cp['items'] if x['statut'] == 'chiffre']
    autres = [x for x in cp['items'] if x['statut'] != 'chiffre'] + [x for x in items if x['eng'] not in have]
    cp['items'] = chiffres + autres

ins('di-rupo', [
    it('adopte', 'Calculer la pension du secteur public sur le traitement moyen des dix dernières années de carrière.', '103',
       'Loi du 28 décembre 2011 : à partir du 1er janvier 2012, « traitement moyen des dix dernières années de la carrière ». La règle ne s’applique pas aux personnes qui avaient 50 ans au 1er janvier 2012.',
       [DK('53', '1952'), DKP('53', '1952', '018', 'Chambre, texte adopté (DOC 53 1952/018)')]),
    it('adopte', 'Relever les conditions de la prépension à 60 ans pour les nouvelles conventions à partir du 1er janvier 2012.', '92',
       'Décidé par le Conseil des ministres du 16 décembre 2011 : « les conditions d’âge et d’ancienneté sont respectivement élevées à 60 ans et à 40 ans », dès 2015 pour les conventions prolongées. Arrêté royal non relu.',
       [['Conseil des ministres du 16 décembre 2011', 'https://news.belgium.be/fr/node/14078/pdf']]),
    it('partiel', 'Limiter à un an le crédit-temps sans motif avec allocation.', '97',
       'Arrêté royal du 28 décembre 2011 : l’allocation est limitée à « 12 mois » équivalent temps plein, le crédit-temps avec motif ramené de 60 à 36 mois et l’accès en fin de carrière porté de 51 à 55 ans. Le communiqué ne parle pas expressément de crédit-temps « sans motif ».',
       [['ONEM, réglementations du crédit-temps', 'https://www.onem.be/citoyens/interruption-de-carriere-credit-temps-et-conges-thematiques/credit-temps-secteur-prive/le-credit-temps-reglementations-applicables'],
        ['Conseil des ministres du 16 décembre 2011', 'https://news.belgium.be/fr/node/14161/pdf']]),
    it('adopte', 'Porter de 25 à 60 km la distance d’un emploi jugé convenable pour un chômeur.', '91',
       'Décidé le 16 décembre 2011 pour une application « à partir du 1er janvier 2012 », par arrêté ministériel (date et publication non relues).',
       [['Conseil des ministres du 16 décembre 2011', 'https://news.belgium.be/fr/reglementation-du-chomage']]),
    it('adopte', 'Soumettre à la TVA de 21 % les prestations des notaires et des huissiers de justice.', '81',
       'Loi du 28 décembre 2011, article 53 : l’exemption de TVA des notaires et huissiers est supprimée au 1er janvier 2012, ce qui leur applique le taux normal.',
       [DK('53', '1952'), DKP('53', '1952', '018', 'Chambre, texte adopté (DOC 53 1952/018)')]),
    it('partiel', 'Remplacer, pour les plus jeunes, la pension de survie par une allocation de transition.', '105',
       'Loi du 5 mai 2014 (salariés) : allocation de transition de 12 mois, ou 24 mois avec un enfant à charge. Elle entre en vigueur le 1er janvier 2015, après la fin du mandat ; une loi distincte du 25 avril 2014 vise les indépendants.',
       [DK('53', '3399'), DKP('53', '3399', '005', 'Chambre, texte adopté (DOC 53 3399/005)'), DK('53', '3418')]),
    it('adopte', 'Créer un tribunal de la famille.', '137, 147',
       'Loi du 30 juillet 2013, issue d’une proposition de loi déposée en 2010. La date d’entrée en vigueur n’a pas été relue dans une source officielle.',
       [DK('53', '0682')]),
    it('partiel', 'Porter au moins à la moitié de la peine le seuil de libération conditionnelle pour les faits les plus graves.', '140',
       'Loi du 17 mars 2013 : « Les condamnés à de lourdes peines devront purger la moitié de leur peine au lieu d’un tiers », soit 15 ans pour une peine de 30 ans ou à perpétuité ; pour les récidivistes, le seuil passe à 19 ou 23 ans. Le relèvement ne vise que les peines de 30 ans ou à perpétuité.',
       [DK('53', '2604'), DKP('53', '2604', '008', 'Chambre, texte adopté (DOC 53 2604/008)'), DKP('53', '2603', '004', 'Chambre, rapport (DOC 53 2603/004)')]),
    it('non', 'Diminuer de 5 % la rémunération des ministres ; geler deux ans le budget des cabinets et les dotations des Chambres et de la famille royale.', '12',
       'Aucun texte trouvé pour la baisse de 5 % ni pour le gel des dotations. Le Conseil des ministres du 16 décembre 2011 limite l’enveloppe des cabinets (environ 9 millions d’euros en 2012, −15 % par rapport à 2010).',
       [['Conseil des ministres du 16 décembre 2011', 'https://news.belgium.be/fr/budget-cellules-strategiques']]),
])

ins('michel-1', [
    it('partiel', 'Instaurer un service garanti dans les chemins de fer en cas de grève.', '12, 137',
       'Loi du 29 novembre 2017 : chaque agent concerné indique « au minimum 72 heures avant le début du jour de grève » s’il fera grève, et l’offre de trains est adaptée. « Le projet de loi ne prévoit aucune possibilité de réquisition » : ce n’est pas un service minimum garanti.',
       [DK('54', '2650'), DKP('54', '2650', '001', 'Chambre, projet de loi (DOC 54 2650/001)')]),
    it('adopte', 'Créer une procédure de « plaider coupable ».', '9',
       'Loi du 5 février 2016 (« pot-pourri II ») : « la procédure de la reconnaissance préalable de culpabilité (article 216 nouveau du Code d’instruction criminelle) ».',
       [DK('54', '1418'), DKP('54', '1418', '001', 'Chambre, projet de loi (DOC 54 1418/001)')]),
    it('adopte', 'Étendre la déchéance de la nationalité en lien avec le terrorisme.', '170',
       'Loi du 20 juillet 2015 visant à renforcer la lutte contre le terrorisme : « Le projet étend également les possibilités de retrait de la nationalité. » Elle crée aussi l’infraction de voyage à des fins terroristes.',
       [DK('54', '1198'), DKP('54', '1198', '001', 'Chambre, projet de loi (DOC 54 1198/001)')]),
    it('adopte', 'Permettre le déploiement de l’armée en appui de la police à partir du niveau de menace 3.', '152',
       'Décision gouvernementale de janvier 2015 : « Le gouvernement a aussi décidé d’engager les militaires sur le territoire national en date du 17 janvier 2015. » Déploiement maintenu en octobre 2015 pour les sites « placés en niveau 3 ». Aucune loi ni arrêté royal trouvé comme base.',
       [['Chambre, compte rendu de commission du 21 janvier 2015', 'https://www.dekamer.be/doc/CCRI/pdf/54/ic066x.pdf'],
        ['Conseil des ministres du 30 octobre 2015', 'https://news.belgium.be/fr/appui-de-la-defense-la-police-integree-en-vue-dassurer-des-missions-de-surveillance-5']]),
    it('partiel', 'Supprimer le crédit-temps sans motif.', '26',
       'Ce sont les allocations qui sont supprimées : « Depuis le 01.01.2015, le crédit-temps sans motif est octroyé sans allocations de l’ONEM. » Le droit lui-même reste.',
       [['ONEM, crédit-temps sans motif', 'https://www.onem.be/page/le-credit-temps-sans-motif-reglementation-en-vigueur-avant-le-01.04.2017'],
        ['SPF Emploi, 13 janvier 2015', 'https://emploi.belgique.be/fr/actualites/modification-de-la-reglementation-du-credit-temps']]),
    it('adopte', 'Exiger que la demande d’allocations d’insertion soit introduite avant 25 ans.', '29',
       'Arrêté royal du 30 décembre 2014 (Moniteur du 31 décembre 2014) : la demande « doit être introduite avant le 25ème anniversaire », avec des dérogations.',
       [['SPF Emploi, 27 janvier 2015', 'https://emploi.belgique.be/fr/actualites/modifications-la-reglementation-du-chomage?id=42710']]),
    it('adopte', 'Organiser la réinsertion des travailleurs en incapacité de travail.', '29',
       'Deux arrêtés royaux (28 octobre et 8 novembre 2016), publiés au Moniteur du 24 novembre 2016 et en vigueur le 1er décembre 2016.',
       [['SPF Emploi, trajet de réintégration', 'http://www.emploi.belgique.be/defaultNews.aspx?id=45447'],
        ['INAMI, rapport annuel 2016', 'https://www.inami.fgov.be/fr/publications/rapport-annuel-2016/themes/un-trajet-de-reinsertion-pour-les-travailleurs-salaries-et-les-chomeurs-en-incapacite-de-travail']]),
    it('non', 'Instaurer un service à la collectivité pour les chômeurs de longue durée.', '28',
       'Aucun texte adopté. Une proposition de loi de la majorité, déposée en mai 2018, devient caduque à la fin de la législature.',
       [DK('54', '3066')]),
    it('adopte', 'Ratifier la convention d’Istanbul sur la violence à l’égard des femmes.', '239',
       'Loi d’assentiment du 1er mars 2016 (Moniteur du 9 juin 2016).',
       [DK('54', '1436')]),
    it('adopte', 'Instaurer une contribution des bénéficiaires de l’aide juridique (« ticket modérateur »).', '128',
       'Loi du 6 juillet 2016 : contributions forfaitaires « à caractère symbolique ». La Cour constitutionnelle les annule en 2018, après la fin du mandat.',
       [DK('54', '1819'), ['Cour constitutionnelle, arrêt n° 77/2018 (communiqué)', 'https://www.const-court.be/public/f/2018/2018-077f-info.pdf']]),
])

F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok +')
