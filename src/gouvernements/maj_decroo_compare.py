# « Annoncé et réalisé » pour De Croo (accord du 30 septembre 2020, DOC 55 0020/001, pages du PDF de la Chambre).
# Chaque statut repose sur une source officielle ouverte (recherche du 3 novembre 2026) ou sur une mesure déjà ancrée.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
R = F.resolve().parents[1] / 'dossiers'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
FIN = json.loads((R / 'finances-data.json').read_text(encoding='utf-8'))
EMP = json.loads((R / 'emploi-data.json').read_text(encoding='utf-8'))['emp']['BE']   # depuis 1999
DEF, INV = FIN['defL']['BE'], FIN['inv']['BE']                                          # 1980, 1995
def pc(x): return (f'{x:.1f}'.replace('.', ',').replace('-', '−')) + ' %'
DK = lambda n: [f'Chambre, dossier DOC 55 {n}', f'https://www.dekamer.be/FLWB/html/55/F/55K{n}.html']
DKP = lambda n, doc, lab: [lab, f'https://www.dekamer.be/FLWB/pdf/55/{n}/55K{n}{doc}.pdf']
EU_DEF = ['Eurostat, déficit public (gov_10dd_edpt1)', 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=fr']

def it(statut, eng, p, constat, mesure='', src=None, ctx=''):
    x = {'statut': statut, 'eng': eng, 'p': p, 'constat': constat}
    if mesure: x['mesure'] = mesure
    if src: x['src'] = src
    if ctx: x['ctx'] = ctx
    return x

g = G['de-croo']
items = [
    it('chiffre', 'Viser un taux d’emploi d’au moins 80 % en 2030.', '15, 30',
       f'Échéance postérieure au mandat. Taux d’emploi des 20-64 ans : {pc(EMP[2020-1999])} en 2020, {pc(EMP[2024-1999])} en 2024 (Eurostat).',
       src=[['Dossier Emploi', '__EMPLOI__#f-emploi']]),
    it('chiffre', 'Un effort budgétaire fixe de 0,2 % du PIB par an, plus un effort variable, soit environ 1,4 % du PIB d’ici 2024.', '64',
       f'L’effort se mesure en mesures décidées, pas directement dans le solde. Solde public : {pc(DEF[2020-1980])} du PIB en 2020, {pc(DEF[2024-1980])} en 2024 (Eurostat). En juillet 2024, le Conseil de l’Union ouvre une procédure de déficit excessif (voir les mesures).',
       src=[EU_DEF], ctx='crise du Covid-19 en 2020, puis crise des prix de l’énergie en 2022.'),
    it('chiffre', 'Porter l’investissement public de 2,6 % du PIB (2019) à 4 % en 2030.', '40',
       f'Échéance postérieure au mandat. Investissement public : {pc(INV[2019-1995])} du PIB en 2019, {pc(INV[2024-1995])} en 2024 (Eurostat), tous niveaux de pouvoir confondus.',
       src=[['Dossier Finances publiques', '__FINANCES__']]),
    it('chiffre', 'Suivre une trajectoire contraignante vers une aide au développement de 0,7 % du revenu national brut d’ici 2030.', '105',
       'Échéance postérieure au mandat. Aide publique au développement : 0,47 % du RNB en 2020 (données préliminaires) ; environ 2,6 milliards d’euros en 2023, soit « environ 0,44 % ». Aucune hausse régulière n’apparaît.',
       src=[['SPF Affaires étrangères, aide 2020', 'https://diplomatie.belgium.be/en/oecd-praises-increase-belgian-development-assistance-2020'],
            ['SPF Affaires étrangères, aide 2023', 'https://diplomatie.belgium.be/fr/politique/themes-politiques/sous-la-loupe/chiffre-de-decembre-2024-26-milliards-deuros-consacres-laide-publique-au-developpement-en-2023']]),
    it('adopte', 'Désigner un commissaire Covid, mandaté pour douze mois renouvelables par périodes de six mois.', '19',
       'Désigné par le Comité de concertation du 6 octobre 2020 : « Son mandat couvrira une durée de douze mois, prolongeable par période de six mois. » Nommé par arrêté royal du 9 octobre 2020.',
       src=[['Premier ministre, Comité de concertation du 6 octobre 2020', 'https://premier.decroo-i.archive.belgium.be/fr/le-comit%C3%A9-de-concertation-d%C3%A9cide-de-mesures-plus-strictes-et-d%C3%A9signe-un-commissaire-covid-19.html'],
            ['Conseil des ministres du 13 novembre 2020', 'https://news.belgium.be/fr/composition-et-fonctionnement-de-la-cellule-de-coordination-du-commissaire-covid-19']]),
    it('adopte', 'Fixer la norme de croissance des soins de santé à 2,5 % à partir de 2022.', '25',
       'Loi-programme du 20 décembre 2020.', mesure='Norme de croissance des soins de santé à 2,5 %'),
    it('adopte', 'Relever la pension minimum vers 1 500 € nets pour une carrière complète.', '30',
       'Hausses par étapes du 1er janvier 2021 au 1er janvier 2024. Le montant atteint n’est pas comparé ici aux 1 500 € nets.',
       mesure='Hausse par étapes de la pension minimum et de la GRAPA'),
    it('adopte', 'Introduire un bonus de pension pour qui travaille plus longtemps.', '31',
       'Loi de mai 2024, avec une condition de carrière effective pour la pension minimum.', mesure='Réforme des pensions : bonus et travail effectif'),
    it('adopte', 'Augmenter les allocations les plus basses « en direction du seuil de pauvreté ».', '56',
       'Minima sociaux relevés par paliers à partir de janvier 2021. L’écart restant avec le seuil de pauvreté n’est pas mesuré ici.', mesure='Hausse des autres minima sociaux'),
    it('adopte', 'Organiser, avec les partenaires sociaux, la réintégration des malades de longue durée.', '47',
       'Trajet « retour au travail » auprès des mutualités au 1er janvier 2022.', mesure='Retour au travail des malades de longue durée'),
    it('partiel', 'Donner à chaque équivalent temps plein un droit à cinq jours de formation par an.', '47',
       'Loi du 3 octobre 2022 : dans les entreprises d’au moins 20 travailleurs, « au moins 4 jours en 2023 » puis « 5 jours par an en 2024 », avec calcul possible en moyenne sur cinq ans et des dérogations par convention collective.',
       src=[DK('2810'), DKP('2810', '001', 'Chambre, projet de loi (DOC 55 2810/001)')]),
    it('adopte', 'Faire contribuer davantage ceux qui ont la plus grande capacité contributive.', '62',
       'Taxe annuelle sur les comptes-titres de plus d’un million d’euros (loi de février 2021).', mesure='Taxe annuelle sur les comptes-titres'),
    it('adopte', 'Mettre fin à la régularisation fiscale au 31 décembre 2023.', '62',
       'Loi du 16 mars 2021 : « plus aucune déclaration-régularisation ne pourra être introduite après le 31 décembre 2023 ».',
       src=[DK('1736')]),
    it('abandon', 'Préparer et mettre en œuvre une large réforme fiscale allégeant le travail, sans hausse de la charge fiscale globale.', '15, 57',
       'Aucun projet de loi déposé. Le 20 juillet 2023, le Premier ministre déclare à la Chambre : « Il va de soi que j’aurais préféré me présenter devant cette Assemblée avec un accord fiscal en main. »',
       src=[['Chambre, compte rendu du 20 juillet 2023 (CRIV 55 PLEN 257)', 'https://www.dekamer.be/doc/PCRI/pdf/55/ip257.pdf']]),
    it('non', 'Instaurer une taxe sur les services numériques en 2023, faute d’accord à l’OCDE ou dans l’Union.', '62',
       'Aucun projet du gouvernement trouvé ; seule une proposition de loi de l’opposition, devenue caduque en 2024.',
       src=[DK('0096')]),
    it('adopte', 'Rendre neutres en carbone tous les nouveaux véhicules de société d’ici 2026.', '69',
       'Loi du 25 novembre 2021 : « Tous les nouveaux véhicules devront à partir de 2026 rouler sans émission carbone ». C’est une condition de l’avantage fiscal, pas une interdiction.',
       src=[DK('2170')]),
    it('adopte', 'Élargir le tarif social de l’énergie à tous les bénéficiaires de l’intervention majorée.', '70',
       'En vigueur au 1er février 2021, puis prolongé.', mesure='Tarif social de l’énergie élargi'),
    it('partiel', 'Respecter le calendrier légal de sortie du nucléaire, avec possibilité de prolonger une capacité « pouvant aller jusqu’à 2 GW » en cas de problème d’approvisionnement.', '66',
       'Doel 4 et Tihange 3 sont prolongés de dix ans (loi de 2024), décision prise en mars 2022 au nom de la sécurité d’approvisionnement. L’accord permettait cet ajustement.',
       mesure='Prolongation de Doel 4 et Tihange 3'),
    it('adopte', 'Confier à la SNCB, pour dix ans, la mission de service public du transport de voyageurs.', '74',
       'Arrêté royal du 26 décembre 2022 approuvant les contrats de la SNCB et d’Infrabel pour 2023-2032.',
       src=[['Conseil des ministres (avenants aux contrats de service public)', 'https://news.belgium.be/fr/node/43570/pdf']]),
    it('non', 'Recruter au moins 1 600 policiers par an.', '82',
       'Chiffres annuels de recrutement non trouvés. Pour 2023, la police fédérale indique 1 619 candidats ayant réussi la sélection et 1 043 aspirants entrés en formation : réussir la sélection n’est pas être recruté.',
       src=[['Police fédérale, 15 février 2024', 'https://www.police.be/5998/fr/actualites/la-police-federale-na-jamais-investi-autant-de-personnel-et-de-moyens-dans-la-lutte']]),
    it('adopte', 'Ouvrir l’article 195 de la Constitution à révision.', '88',
       'Inclus dans la déclaration de révision de la Constitution de mai 2024. La révision elle-même revient à la législature suivante.',
       src=[DK('4018')]),
    it('non', 'Étendre le registre des lobbyistes de la Chambre.', '91',
       'Aucun texte adopté ; deux propositions de loi de l’opposition sont devenues caduques en 2024.',
       src=[DK('2394')]),
    it('partiel', 'Abaisser à 16 ans l’âge du vote aux élections européennes.', '92',
       'Loi du 1er juin 2022, avec inscription volontaire des jeunes de 16 et 17 ans. La Cour constitutionnelle l’annule en partie en 2023 (arrêt n° 116/2023).',
       src=[DK('2373'), ['Cour constitutionnelle, arrêt n° 116/2023 (communiqué)', 'https://www.const-court.be/public/f/2023/2023-116f-info.pdf']]),
    it('adopte', 'Porter le congé de naissance de 10 à 20 jours.', '94',
       '15 jours en 2021, 20 jours en 2023.', mesure='Congé de naissance allongé'),
    it('non', 'Obtenir en principe une décision d’asile dans les six mois.', '101',
       'Pas de nouvelle loi. Selon le CGRA, ce délai légal « n’est qu’indicatif » ; fin 2023, l’arriéré réel atteint 20 025 dossiers.',
       src=[['CGRA, délais de décision', 'https://www.cgra.be/fr/asile/les-delais-de-decision'], ['CGRA, rapport annuel 2023', 'https://www.cgra.be/sites/default/files/jaaverslagen/rapport_annuel_cgra_2023.pdf']]),
    it('non', 'Ne plus détenir de mineurs en centre fermé.', '104',
       'Aucune loi adoptée ; les propositions de loi de l’opposition sont devenues caduques en 2024.',
       src=[DK('2880')]),
]
titres = {m['titre'] for m in g['mesures']}
for x in items:
    if x.get('mesure'): assert x['mesure'] in titres, x['mesure']
g['compare'] = {
    'intro': 'Le gouvernement De Croo prête serment le 1er octobre 2020, 494 jours après les élections, en pleine crise du Covid-19, à laquelle l’accord consacre son premier chapitre. À partir de 2022, la flambée des prix de l’énergie entraîne des aides que l’accord ne prévoyait pas. Le mandat se termine par les élections du 9 juin 2024, suivies de huit mois d’affaires courantes.',
    'items': items,
    'hors': [
        ['Aides énergie de 2022', 'TVA à 6 % sur l’électricité et le gaz, chèques et forfaits pour les ménages.', 'Aides énergie de 2022'],
        ['Contribution sur les « surprofits » de l’énergie', 'recettes des producteurs d’électricité plafonnées de 2022 à 2023.', 'Contributions sur les « surprofits » de l’énergie'],
        ['TVA à 6 % permanente sur l’énergie (2023)', 'compensée par une accise variable dite « cliquet ».', 'TVA à 6 % permanente et « cliquet » sur l’énergie'],
    ],
}
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(items))
