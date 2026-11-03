# Sources officielles pour les fiches 1999-2020 (règle de Tom du 3 novembre 2026) et « Annoncé et réalisé » pour Verhofstadt I.
# Recherches du 3 novembre 2026 : pages officielles ouvertes, phrases recopiées. Ce qui n'a pas de source officielle est retiré.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
R = F.resolve().parents[1] / 'dossiers'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
DEF = json.loads((R / 'finances-data.json').read_text(encoding='utf-8'))['defL']['BE']
def pc(x): return (f'{x:.1f}'.replace('.', ',').replace('-', '−')) + ' %'
DK = lambda leg, n: [f'Chambre, dossier DOC {leg} {n}', f'https://www.dekamer.be/FLWB/html/{leg}/F/{leg}K{n}.html']
def add(lst, x):
    if x not in lst: lst.append(x)

L1999 = ['Chambre, liste des membres (DOC 50 0001/001)', 'https://www.dekamer.be/FLWB/PDF/50/0001/50K0001001.pdf']
L2007 = ['Chambre, liste des membres (DOC 52 0001/001)', 'https://www.dekamer.be/FLWB/PDF/52/0001/52K0001001.pdf']
MAG2 = ['La Chambre, magazine n° 2', 'https://www.dekamer.be/pdf_sections/pri/magazine/mag002F.pdf']
MAG9 = ['La Chambre, magazine n° 9 (2008)', 'https://www.dekamer.be/pdf_sections/pri/magazine/MAG_009_NL.indd.pdf']
MAG10 = ['La Chambre, magazine n° 10 (2009)', 'https://www.dekamer.be/kvvcr/pdf_sections/pri/magazine/MAG_010_NL_WEB.pdf']
CRIV72 = ['Chambre, compte rendu du 31 décembre 2008 (CRIV 52 PLEN 072)', 'https://www.diekammer.be/doc/PCRI/pdf/52/ip072.pdf']
EL2014 = ['SPF Intérieur, résultats des élections du 25 mai 2014 (hébergés par la Chambre)', 'https://www.dekamer.be/kvvcr/pdf_sections/archive/2014.pdf']
RA2019 = ['Chambre, rapport annuel 2019-2020 (résultats des élections)', 'https://www.dekamer.be/pdf_sections/publications/annualreport/rappannuel2019-2020.pdf']

# ---------------- Verhofstadt I ----------------
g = G['verhofstadt-1']
g['sieges_note'] = 'VLD 23, PS 19, PRL-FDF 18, SP 14, Ecolo 11, Agalev 9 : somme des élus des six partis aux élections du 13 juin 1999.'
g['sieges_src'] = [L1999]
g.pop('statut_note', None)   # départ des ministres Ecolo (5 mai 2003) : aucune source officielle trouvée
g['fin_txt'] = 'Fin de législature : élections du 18 mai 2003, puis affaires courantes jusqu’au gouvernement Verhofstadt II.'
g['fin_src'] = [MAG2]

# ---------------- Verhofstadt II ----------------
g = G['verhofstadt-2']
g['fin_txt'] = 'Élections du 10 juin 2007, puis affaires courantes jusqu’au gouvernement intérimaire Verhofstadt III.'
g['fin_src'] = [L2007]
m = next(m for m in g['mesures'] if m['titre'] == 'Activation du comportement de recherche d’emploi')
m.update({'v': 'officiel',
          'texte': 'Les chômeurs sont convoqués à des entretiens de suivi ; en cas d’efforts jugés insuffisants, l’allocation peut être réduite puis supprimée. Application par phases : jusqu’à 30 ans à partir de juillet 2004, jusqu’à 40 ans à partir de juillet 2005, jusqu’à 50 ans à partir de juillet 2006.',
          'src': [['Chambre, évaluation du plan d’activation (DOC 51 2195/001)', 'https://www.dekamer.be/FLWB/PDF/51/2195/51K2195001.pdf'],
                  ['Banque-Carrefour de la sécurité sociale, délibération 04/021', 'https://ksz.fgov.be/sites/default/files/assets/securite_et_vie_privee/deliberation/04_021_f81_onem.pdf']]})
m.pop('verif', None)

# ---------------- Verhofstadt III, Leterme I, Van Rompuy, Leterme II ----------------
NOTE07 = 'CD&V-N-VA 30, MR 23, PS 20, Open VLD 18, cdH 10 aux élections du 10 juin 2007. Le cartel CD&V-N-VA compte 30 élus ; sans les élus N-VA, qui ne participent pas au gouvernement, la coalition compte 96 sièges.'
for gid in ('verhofstadt-3', 'leterme-1', 'van-rompuy', 'leterme-2'):
    G[gid]['sieges_note'] = NOTE07
    G[gid]['sieges_src'] = [L2007]
g = G['verhofstadt-3']
g['statut_note'] = 'Gouvernement intérimaire « limité dans le temps », prévu dès le départ pour passer la main à Yves Leterme.'
g['statut_src'] = [['Déclaration du 21 décembre 2007 (DOC 52 0020/001)', g['accord']['url']]]
g['fin_txt'] = 'Fin prévue de l’intérim : remplacé par le gouvernement Leterme I le 20 mars 2008.'
g['fin_src'] = [['Déclaration du 20 mars 2008 (DOC 52 0020/002)', G['leterme-1']['accord']['url']]]

g = G['leterme-1']
g['statut_note'] = 'Une première démission, présentée au Roi le 14 juillet 2008, est refusée.'
g['statut_src'] = [MAG9]
g['fin_txt'] = 'Démission présentée le 19 décembre 2008, acceptée trois jours plus tard ; l’arrêté royal de démission et de nomination du gouvernement suivant date du 30 décembre 2008.'
g['fin_src'] = [MAG10, CRIV72]
g['contexte'] = [{'date': 'Septembre-octobre 2008', 'texte': 'Crise financière mondiale : l’État intervient dans Fortis, Dexia, KBC et Ethias (voir les mesures).',
                  'src': [['Chambre, audition de Didier Reynders, commission spéciale Dexia (25 janvier 2012)', 'https://www.diekammer.be/kvvcr/pdf_sections/comm/dexia/N031_20120125reynders.pdf']]}]

g = G['van-rompuy']
g['fin_txt'] = 'Herman Van Rompuy est désigné le 19 novembre 2009 premier président à temps plein du Conseil européen ; Yves Leterme lui succède.'
g['fin_src'] = [['Conseil de l’Union européenne, communiqué du 19 novembre 2009', 'https://www.consilium.europa.eu/uedocs/cms_data/docs/pressdata/en/ec/111343.pdf']]
for c in g['contexte']:
    if c['date'] == '19 juillet 2009':
        c['texte'] = 'Instruction gouvernementale sur la régularisation de séjour, annoncée le 19 juillet 2009 : demandes recevables pendant trois mois à partir du 15 septembre 2009. Le Conseil d’État l’annule le 9 décembre 2009 (arrêt n° 198.769).'
        c['src'] = [['Conseil d’État, arrêt n° 198.769 du 9 décembre 2009', 'http://www.raadvst-consetat.be/arr.php?nr=198769']]
    if c['date'] == '22 octobre 2009':
        c['date'] = 'Octobre 2009'
        c['texte'] = 'Le gouvernement annonce la prolongation de trois réacteurs nucléaires (Doel 1, Doel 2 et Tihange 1) pour dix ans, puis conclut un accord avec l’exploitant ; aucune loi n’est votée pendant le mandat.'
        c['src'] = [['Chambre, compte rendu du 14 octobre 2009 (ministre de l’Énergie)', 'https://www.dekamer.be/doc/PCRA/html/52/ap115.html']]

g = G['leterme-2']
g['statut_note'] = 'Démissionnaire et chargé des affaires courantes à partir d’avril 2010, jusqu’au gouvernement Di Rupo en décembre 2011.'
g['statut_src'] = [['Sénat, séance du 6 mai 2010', 'https://senate.be/www/?MIcolObj=pdf&MInamObj=pdfid&MItabObj=pdf&MItypeObj=application%2Fpdf&MIvalObj=67112088']]
g['fin_txt'] = 'Le gouvernement démissionne en avril 2010 ; le Parlement est dissous le 7 mai 2010 ; élections anticipées le 13 juin 2010, puis 541 jours sans nouveau gouvernement.'
g['fin_src'] = [['Sénat, séance du 6 mai 2010', g['statut_src'][0][1]],
                ['Chambre, rapport annuel 2009-2010', 'https://www.dekamer.be/pdf_sections/publications/annualreport/jaarverslag2009-2010.pdf'],
                ['Chambre, résultats des élections du 13 juin 2010', 'https://www.dekamer.be/kvvcr/pdf_sections/archive/2010.pdf']]
ac = g['accord']
ac['resume'] = []
ac['note'] = ''
ac['lecture'] = ''
ac['titre'] = 'Pas de nouvel accord : déclaration du gouvernement du 25 novembre 2009 (texte à relire)'

# ---------------- Michel II, Wilmès I et II ----------------
g = G['michel-2']
g['sieges_note'] = 'Gouvernement minoritaire : MR 20, CD&V 18 et Open VLD 14 aux élections du 25 mai 2014, soit 52 sièges sur 150.'
g['sieges_src'] = [EL2014]
g['fin_txt'] = 'Démission présentée à la Chambre le 18 décembre 2018 ; affaires courantes, prolongées après les élections du 26 mai 2019, jusqu’au départ de Charles Michel pour la présidence du Conseil européen.'
g['fin_src'] = [['Chambre, compte rendu du 18 décembre 2018 (CRIV 54 PLEN 263)', 'https://www.dekamer.be/doc/PCRI/pdf/54/ip263.pdf'],
                ['Conseil européen, conclusions du 2 juillet 2019', 'https://data.consilium.europa.eu/doc/document/ST-18-2019-INIT/fr/pdf']]
ac = g['accord']
ac['resume'] = [x for x in ac['resume'] if 'Orange bleue' not in x]
ac['k'] = 'Ce que le Premier ministre propose à la Chambre'
ac['lecture'] = 'Le gouvernement n’a ni présenté de déclaration au Parlement ni demandé la confiance.'
cx = []
for c in g['contexte']:
    c['src'] = [s for s in c.get('src', []) if 'crisp.be' not in s[1]]
    if c['date'] == '9 décembre 2018':
        c['texte'] = 'Les trois ministres et deux secrétaires d’État N-VA démissionnent ; MR, CD&V et Open VLD gouvernent seuls. Le lendemain, à Marrakech, Charles Michel déclare : « Mon pays sera du bon côté de l’histoire avec le Pacte mondial pour des migrations sûres, ordonnées et régulières. »'
        add(c['src'], ['Premier ministre, discours de Marrakech (10 décembre 2018)', 'https://archive.premier.be/fr/printpdf/13611'])
    if c['date'] == '27 septembre 2018':
        c['texte'] = c['texte'].replace(' La N-VA s’y oppose à partir de fin octobre.', '')
    if c['date'] == '18-21 décembre 2018':
        c['date'] = '18 décembre 2018'
        c['texte'] = 'Charles Michel constate devant la Chambre : « cet appel n’a pas convaincu », et annonce : « Je prends dès lors la décision de présenter ma démission ».'
    if c['src']: cx.append(c)
g['contexte'] = cx

g = G['wilmes-1']
g['sieges_src'] = [RA2019]
g['statut_note'] = 'Nommée par arrêté royal du 27 octobre 2019, la Première ministre annonce qu’elle restera « dans le cadre strict des affaires courantes ».'
g['statut_src'] = [['Chambre, ordre de préséance du gouvernement (DOC 55 0019/003)', 'https://www.lachambre.be/doc/flwb/pdf/55/0019/55K0019003.pdf'],
                   ['Premier ministre, entretien du 2 novembre 2019', 'https://archive.premier.be/fr/printpdf/15821']]
g['contexte'] = []
g['fin_txt'] = 'Remplacé, au début de la crise du Covid-19, par un gouvernement de plein exercice (Wilmès II), qui prête serment le 17 mars 2020.'
g['fin_src'] = [['Chambre, compte rendu analytique du 17 mars 2020 (CRABV 55 PLEN 029)', 'https://www.lachambre.be/doc/PCRA/pdf/55/ap029.pdf']]
g['accord']['lecture'] = ''

g = G['wilmes-2']
g['statut_src'] = [DK('55', '1104'), ['Chambre, compte rendu du 17 mars 2020 (CRIV 55 PLEN 029)', 'https://www.lachambre.be/doc/PCRI/pdf/55/ip029.pdf']]
g['fin_txt'] = 'La confiance était limitée dans le temps : la Première ministre s’était engagée à la redemander « au plus tard dans six mois ». Elle prend fin avec la formation du gouvernement De Croo.'
g['fin_src'] = [['Premier ministre, discours du 19 mars 2020', 'https://archive.premier.be/fr/printpdf/16486'],
                ['Chambre, motions du 17 septembre 2020 (MOT 55 25/001)', 'https://www.lachambre.be/doc/MOTI/pdf/55/55M00025001.pdf']]
g['sieges_note'] = 'MR 14, CD&V 12, Open VLD 12 aux élections du 26 mai 2019. Gouvernement minoritaire, investi pour la crise sanitaire ; confiance votée le 19 mars 2020 par 82 voix contre 44.'
g['sieges_src'] = [RA2019, g['sieges_src']] if g.get('sieges_src') and not isinstance(g['sieges_src'][0], list) else [RA2019] + (g.get('sieges_src') or [])

# ---------------- Verhofstadt I : annoncé et réalisé ----------------
g = G['verhofstadt-1']
ACC = g['accord']['url']
def it(statut, eng, p, constat, mesure='', src=None, ctx=''):
    x = {'statut': statut, 'eng': eng, 'p': p, 'constat': constat}
    if mesure: x['mesure'] = mesure
    if src: x['src'] = src
    if ctx: x['ctx'] = ctx
    return x
items = [
    it('chiffre', 'Un budget « en équilibre en 2002 », dans le respect du pacte de stabilité européen.', '10',
       f'Objectif atteint selon les chiffres actuels d’Eurostat : solde public de {pc(DEF[2002-1980])} du PIB en 2002 ({pc(DEF[1999-1980])} en 1999, {pc(DEF[2001-1980])} en 2001).',
       src=[['Eurostat, déficit public (gov_10dd_edpt1)', 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=fr']]),
    it('chiffre', 'Inverser la tendance de l’aide au développement et « tendre à nouveau vers 0,7 % du PNB ».', '44',
       'Hausse sans atteindre 0,7 % : 0,36 % du revenu national brut en 2000, 0,37 % en 2001, 0,43 % en 2002, 0,60 % en 2003 (année en partie postérieure au mandat). Le chiffre de 1999 n’a pas été trouvé dans une source officielle.',
       src=[['SPF Affaires étrangères, rapport au Parlement sur les Objectifs du Millénaire 2008, tableau 3.6.2', 'https://www.dekamer.be/kvvcr/pdf_sections/comm/committee/mdg2008_fr.pdf']]),
    it('partiel', 'Créer une agence fédérale pour la sécurité alimentaire, opérationnelle avant le 1er janvier 2000.', '9, 47',
       'Loi du 4 février 2000. L’agence se met en place progressivement : une cellule provisoire est créée en 2002 et le personnel de l’ancienne administration lui est transféré en 2003.',
       src=[DK('50', '0232'), ['Conseil des ministres du 30 août 2002', 'https://news.belgium.be/fr/creation-dune-cellule-provisoire-lafsca'], ['Conseil des ministres du 9 mai 2003', 'https://news.belgium.be/fr/transfert-du-personnel-de-lacsa']]),
    it('partiel', 'Mettre en œuvre la réforme des polices pour le 31 mars 2001.', '18',
       'Loi du 7 décembre 1998 (accords Octopus). La police fédérale est en place le 1er avril 2001, la police locale seulement le 1er janvier 2002.',
       src=[['Police intégrée, historique de la réforme', 'https://www.police.be/5338/a-propos/la-police-locale-5338-germinalt/historique-de-la-zone']]),
    it('adopte', 'Rendre la naturalisation gratuite et réduire à un mois le délai d’avis du parquet.', '22',
       'Loi du 1er mars 2000 : « Le délai imparti au parquet pour rendre son avis est réduit uniformément à un mois » ; « la procédure de naturalisation sera gratuite ».',
       src=[DK('50', '0292'), ['Chambre, rapport (DOC 50 0292/007)', 'https://www.dekamer.be/FLWB/pdf/50/0292/50K0292007.pdf']]),
    it('adopte', 'Régulariser au cas par cas, selon des critères stricts, notamment les demandeurs d’asile en procédure depuis quatre ans (trois avec enfants scolarisés).', '23',
       'Loi du 22 décembre 1999.', mesure='Régularisation de certaines catégories d’étrangers'),
    it('adopte', 'Mettre en œuvre la loi du 23 novembre 1998 sur la cohabitation légale.', '24',
       'Entrée en vigueur le 1er janvier 2000.',
       src=[['Chambre, DOC 51 2514/001', 'https://www.lachambre.be/FLWB/pdf/51/2514/51K2514001.pdf'], ['Registre national, instruction TI 123', 'https://www.ibz.rrn.fgov.be/sites/default/files/documents/fr/registre-national/instructions/liste-TI/TI123_Cohabitation_legale_20200128.pdf']]),
    it('adopte', 'Déposer une loi générale contre les discriminations.', '24',
       'Loi du 25 février 2003, adoptée en fin de mandat.', src=[DK('50', '1578')]),
    it('partiel', 'Réduire de moitié l’effet du vote en case de tête et supprimer les suppléants.', '14',
       'Effet de la case de tête réduit de moitié par des lois de 2000 à 2002, qui suppriment aussi les suppléants. Ceux-ci sont rétablis par la loi du 13 décembre 2002 : « Le cinquième volet est le retour des suppléants. »',
       src=[DK('50', '0666'), DK('50', '0667'), DK('50', '1051'), DK('50', '1806')]),
    it('adopte', 'Porter la norme de croissance des soins de santé de 1,5 % à 2,5 %.', '34',
       'Loi du 24 décembre 1999 : « A partir de l’année 2001, ce montant sera augmenté annuellement d’une norme de croissance réelle maximale de 2,5 p.c. » ; montant fixe pour 2000. Le dossier de la Chambre n’a pas été retrouvé.',
       src=[['INAMI, loi coordonnée du 14 juillet 1994, article 40', 'https://www.inami.fgov.be/SiteCollectionDocuments/Loi19940714-titre-III.pdf']]),
    it('adopte', 'Réduire les cotisations patronales d’environ 32 000 francs belges par travailleur et par an à partir du deuxième trimestre 2000.', '26',
       'Loi du 24 décembre 1999 : réduction structurelle « renforcée à partir du 1er avril 2000 », « d’environ 32 000 francs belges en moyenne par travailleur par an ».',
       src=[DK('50', '0286'), ['Chambre, exposé des motifs (DOC 50 0286/001)', 'https://www.lachambre.be/FLWB/pdf/50/0286/50K0286001.pdf']]),
    it('partiel', 'Permettre à chaque jeune d’entrer sur le marché de l’emploi dans les six mois après l’école.', '26',
       'Même loi (plan dit « Rosetta ») : les employeurs d’au moins 50 travailleurs doivent occuper des jeunes « à raison de 3 % de leur effectif ». C’est une obligation d’embauche, pas une garantie individuelle ; aucun bilan officiel trouvé.',
       src=[DK('50', '0286'), ['Chambre, exposé des motifs (DOC 50 0286/001)', 'https://www.lachambre.be/FLWB/pdf/50/0286/50K0286001.pdf']]),
    it('adopte', 'Généraliser l’interruption de carrière d’un cinquième, au service de la semaine de quatre jours.', '28',
       'Crédit-temps en vigueur le 1er janvier 2002 (convention collective et arrêté royal).', mesure='Crédit-temps'),
    it('adopte', 'Stimuler le deuxième pilier de pension.', '29',
       'Loi du 28 avril 2003 sur les pensions complémentaires.', mesure='Pensions complémentaires (deuxième pilier)'),
    it('adopte', 'Réformer et alléger l’impôt des personnes physiques.', '30',
       'Loi du 10 août 2001.', mesure='Réforme de l’impôt des personnes physiques'),
    it('adopte', 'Désactiver les centrales nucléaires dès qu’elles atteignent 40 ans.', '39',
       'Loi du 31 janvier 2003.', mesure='Sortie progressive du nucléaire'),
    it('abandon', 'Créer des tribunaux de l’application des peines.', '20',
       'Une commission d’étude est créée en 2000 ; son rapport final date de mai 2003. Les tribunaux de l’application des peines n’existent que depuis le 1er février 2007.',
       src=[['Chambre, bibliothèque, dossier n° 90', 'https://www.lachambre.be/kvvcr/pdf_sections/biblio/dossier90F.pdf'], ['Cours et tribunaux, tribunal de première instance', 'https://www.tribunaux-rechtbanken.be/fr/le-systeme-judiciaire-belge/tribunal-de-premiere-instance']]),
    it('adopte', 'Laisser le Parlement trancher les questions éthiques comme l’euthanasie, selon la conscience de chacun.', '46',
       'Loi du 28 mai 2002 relative à l’euthanasie, issue d’une proposition déposée au Sénat.', src=[DK('50', '1488')]),
]
titres = {m['titre'] for m in g['mesures']}
for x in items:
    if x.get('mesure'): assert x['mesure'] in titres, x['mesure']
g['compare'] = {
    'intro': 'Le gouvernement Verhofstadt I gouverne quatre ans. Il prête serment juste après la crise de la dioxine, à laquelle l’accord consacre son dernier chapitre.',
    'items': items,
    'hors': [['Titres-services (2001)', 'titre subventionné pour des services ménagers ; absent de l’accord.', 'Titres-services']],
}
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(items))
