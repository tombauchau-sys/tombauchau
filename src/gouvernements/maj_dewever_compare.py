# « Annoncé et réalisé » pour De Wever (accord de coalition, DOC 56 0020/001, pages du PDF de la Chambre), mandat en cours :
# état au 4 novembre 2026. Sources officielles ouvertes (recherches des 3 et 4 novembre 2026) ou mesures déjà ancrées.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
R = F.resolve().parents[1] / 'dossiers'
M = json.loads(F.read_text(encoding='utf-8'))
g = next(x for x in M['gouvernements'] if x['id'] == 'de-wever')
FIN = json.loads((R / 'finances-data.json').read_text(encoding='utf-8'))
EMP = json.loads((R / 'emploi-data.json').read_text(encoding='utf-8'))['emp']['BE']
DEF = FIN['defL']['BE']
def pc(x): return (f'{x:.1f}'.replace('.', ',').replace('-', '−')) + ' %'
DK = lambda n: [f'Chambre, dossier DOC 56 {n}', f'https://www.dekamer.be/FLWB/html/56/F/56K{n}.html']
EU_DEF = ['Eurostat, déficit public (gov_10dd_edpt1)', 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=fr']
def it(statut, eng, p, constat, mesure='', src=None, ctx=''):
    x = {'statut': statut, 'eng': eng, 'p': p, 'constat': constat}
    if mesure: x['mesure'] = mesure
    if src: x['src'] = src
    if ctx: x['ctx'] = ctx
    return x

m = next(m for m in g['mesures'] if m['titre'] == 'Flexi-jobs dans tous les secteurs')
add = ['Chambre, exposé du ministre (DOC 56 0963/019)', 'https://www.lachambre.be/FLWB/PDF/56/0963/56K0963019.pdf']
if add not in m['src']: m['src'].append(add)
m['verif'] = 'Le plafond annuel exonéré est porté à 18 000 € par une autre loi, du 18 décembre 2025 (DOC 56 0963), à partir des revenus de 2025.'

items = [
    it('chiffre', 'Ramener le déficit de l’État fédéral et de la sécurité sociale sous 3 % du PIB d’ici 2030.', '225',
       f'Échéance postérieure à la législature. Solde de l’ensemble des pouvoirs publics (tous niveaux) : {pc(DEF[2024-1980])} du PIB en 2024, {pc(DEF[2025-1980])} en 2025 (Eurostat). En 2025, l’Union accorde à la Belgique sept ans pour corriger son déficit (voir les mesures).',
       src=[EU_DEF]),
    it('chiffre', 'Porter le taux d’emploi à 80 % d’ici 2029.', '231',
       f'Échéance postérieure. Taux d’emploi des 20-64 ans : {pc(EMP[2024-1999])} en 2024, {pc(EMP[2025-1999])} en 2025 (Eurostat).', src=[['Dossier Emploi', '__EMPLOI__#f-emploi']]),
    it('chiffre', 'Consacrer 2 % du PIB à la défense d’ici 2029 au plus tard, puis 2,5 % en 2034.', '404',
       'Selon les estimations de l’OTAN, 2,00 % du PIB dès 2025 (1,29 % en 2024) ; le Conseil de l’Union retient 1,4 % pour 2025, avec une autre méthode.', mesure='Dépenses de défense'),
    it('adopte', 'Réduire le financement des partis politiques.', '222',
       'Indexation de la dotation gelée de 2025 à 2029 (loi du 9 janvier 2026), après une baisse de 5,32 % pour 2025 votée juste avant l’entrée en fonction.',
       src=[DK('1065'), DK('0572')]),
    it('adopte', 'Instaurer une contribution de 10 % sur les plus-values financières futures, avec une exonération de 10 000 €.', '229',
       'En vigueur pour les plus-values réalisées à partir du 1er janvier 2026.', mesure='Impôt sur les plus-values financières'),
    it('adopte', 'Accompagner et réinsérer les malades de longue durée.', '231',
       'Cotisation des grands employeurs pendant les deuxième et troisième mois d’incapacité, « force majeure médicale » après six mois.', mesure='Retour au travail des malades de longue durée'),
    it('partiel', 'Limiter les allocations de chômage dans le temps : un an, plus un mois par tranche de quatre mois travaillés, deux ans au plus.', '232',
       'Adopté en 2025 ; la Cour constitutionnelle valide l’essentiel en 2026 mais annule les durées transitoires imposées aux chômeurs de longue durée.',
       mesure='La Cour constitutionnelle valide l’essentiel de la réforme du chômage'),
    it('adopte', 'Porter de 12 000 à 18 000 € le revenu annuel maximum des flexi-jobs.', '235',
       'Loi du 18 décembre 2025 : « le plafonnement de 12.000 euros sera supprimé et porté à un montant de 18.000 euros », dès les revenus de 2025 ; flexi-jobs ouverts à tous les secteurs en juillet 2026.',
       src=[DK('0963'), add]),
    it('partiel', 'Relever le salaire minimum de 35 € bruts au 1er avril 2026, sans hausse du coût salarial pour l’employeur.', '241',
       'Convention collective du Conseil national du travail du 24 mars 2026 : +35 € bruts au 1er avril 2026. Selon le CNT, l’employeur supporte une partie du coût ; seule la part dépassant la norme salariale est compensée.',
       src=[['Conseil national du travail, communiqué du 24 mars 2026', 'https://cnt-nar.be/sites/default/files/press_releases/fr/2026-03-24-F.pdf'], ['Conseil national du travail, salaire minimum', 'https://cnt-nar.be/fr/dossiers-thematiques/salaire-minimum']]),
    it('adopte', 'Augmenter le salaire net, principalement par la hausse de la quotité exemptée pour tous ceux qui travaillent.', '249',
       'Loi de juillet 2026 : quotité exemptée relevée par paliers de 2027 à 2031, bonus fiscal à l’emploi renforcé.', mesure='Réforme de l’impôt des personnes physiques'),
    it('adopte', 'Ramener à 6 % la TVA sur les pompes à chaleur pendant cinq ans.', '254',
       'Décidé le 14 novembre 2025 : taux réduit « réintroduit […] à partir du 1er janvier 2026 pour une période de cinq ans », pour les logements. Publication de l’arrêté royal non relue.',
       src=[['Conseil des ministres du 14 novembre 2025', 'https://news.belgium.be/fr/reintroduction-dun-taux-de-tva-reduit-pour-les-pompes-chaleur']]),
    it('adopte', 'Réduire de moitié d’ici 2029 l’avantage du quotient conjugal.', '257',
       '« L’avantage du quotient conjugal pour les non-pensionnés sera réduit de moitié d’ici 2029 », extinction progressive sur vingt ans pour les pensionnés (réforme de l’impôt des personnes physiques).',
       src=[DK('1243'), ['Conseil des ministres du 12 décembre 2025', 'https://news.belgium.be/fr/reforme-du-code-de-limpot-des-personnes-physiques-deuxieme-lecture']]),
    it('adopte', 'Supprimer certains taux de TVA réduits.', '258',
       'Arrêté royal de 2026 : hébergement et camping de 6 % à 12 %, pesticides de 12 % à 21 %.', mesure='Hausses de TVA ciblées'),
    it('partiel', 'Instaurer un malus de 2 % par année de départ anticipé (jusqu’en 2030), puis 4 % et 5 %, et un bonus symétrique.', '267',
       'Loi du 30 mai 2026 : taux fixés selon l’année de naissance (2 % pour 1961-1965, 4 % pour 1966-1974, 5 % ensuite), pour les pensions prenant cours à partir de 2027 et non 2026.',
       mesure='Réforme des pensions'),
    it('partiel', 'Mettre en œuvre les accords conclus autour de la zone Princesse Élisabeth.', '307',
       'La partie en courant continu de l’île énergétique est suspendue en juin 2025 pour ne pas engager 3 milliards d’euros supplémentaires ; l’île et l’infrastructure en courant alternatif se poursuivent.',
       mesure='Île énergétique : partie en courant continu suspendue'),
    it('adopte', 'Abroger les dispositions sur la sortie du nucléaire et l’interdiction de construire de nouvelles centrales.', '306',
       'Loi de mai 2025 modifiant celle du 31 janvier 2003.', mesure='Fin de la sortie programmée du nucléaire'),
    it('adopte', 'Maintenir la norme de croissance en soins de santé.', '342',
       'Budget 2026 des soins de santé approuvé, avec des remboursements en hausse de 3,2 %.', mesure='Budget des soins de santé 2026'),
    it('adopte', 'Rembourser entièrement les soins psychologiques de première ligne jusqu’à 23 ans.', '334',
       'Régime en vigueur depuis le 1er avril 2024, donc avant le gouvernement, et maintenu : « jusqu’à 23 ans compris, il n’y a pas de quote-part personnelle ».',
       src=[['INAMI, soins psychologiques de première ligne', 'https://www.inami.fgov.be/fr/themes/soins-de-sante-cout-et-remboursement/les-prestations-de-sante-que-vous-rembourse-votre-mutualite/soins-de-sante-mentale/vos-soins-psychologiques-de-1re-ligne-rembourses-via-les-reseaux-de-sante-mentale']]),
    it('partiel', 'Passer à un accueil strictement matériel des demandeurs d’asile.', '385',
       'Loi de juillet 2025 restreignant l’accueil ; la Cour constitutionnelle en annule une partie en 2026.', mesure='Accueil des demandeurs d’asile restreint'),
    it('partiel', 'Durcir le regroupement familial : revenus à 110 % du revenu minimum (plus 10 % par personne supplémentaire).', '391',
       'Loi d’août 2025 ; en février 2026, la Cour constitutionnelle suspend une partie des conditions.', mesure='Regroupement familial plus strict'),
    it('encours', 'Au moins doubler la capacité des centres fermés.', '395',
       'Masterplan en cours d’exécution : « La mise en œuvre du Masterplan Centres fermés s’accélère » ; un centre de 50 chambres doit être achevé fin 2026. Aucune source ne constate encore un doublement.',
       src=[['Chambre, note de politique générale Asile et Migration (DOC 56 1282/038)', 'https://www.dekamer.be/doc/FLWB/pdf/56/1282/56K1282038.pdf'], ['Régie des Bâtiments, centre de départ', 'https://www.regiedesbatiments.be/fr/projects/centre-de-depart-de-court-sejour']]),
    it('partiel', 'Porter à 1 000 € les frais de déclaration de nationalité et exiger le niveau de langue B1.', '397',
       'Droit de 1 000 € depuis le 29 juillet 2025 (loi-programme du 18 juillet 2025). Aucun texte trouvé pour le niveau B1.',
       src=[DK('0909'), ['SPF Justice, naturalisation', 'https://www.justice.belgium.be/fr/themes_et_dossiers/personnes_et_familles/nationalite/devenir_belge/naturalisation']]),
    it('encours', 'Supprimer le Sénat, en votant dès le début de la législature les révisions de la Constitution.', '221',
       'Première étape : révision de l’article 195 de la Constitution (procédure de révision), publiée le 24 juillet 2026. Les articles sur le Sénat lui-même ne sont pas encore révisés.',
       src=[DK('1480')]),
]
t = {m['titre'] for m in g['mesures']}
for x in items:
    if x.get('mesure'): assert x['mesure'] in t, x['mesure']
g['compare'] = {
    'intro': 'Mandat en cours : état au 4 novembre 2026. Le 2 novembre 2026, le Premier ministre a remis la démission du gouvernement après l’échec des négociations budgétaires ; le Roi tient sa décision en suspens. Plusieurs engagements de l’accord visent 2029 ou 2030.',
    'items': items,
    'hors': [],
}
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(items))
