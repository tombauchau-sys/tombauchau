# De Croo : sources officielles pour chaque information (règle de Tom du 3 novembre 2026).
# Recherche du 3 novembre 2026 : pages officielles ouvertes, phrases recopiées ; chiffres sans source officielle retirés.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
g = G['de-croo']
DK = lambda n: [f'Chambre, dossier DOC 55 {n}', f'https://www.dekamer.be/FLWB/html/55/F/55K{n}.html']
ACC = g['accord']['url']
def mes(t): return next(m for m in g['mesures'] if m['titre'] == t)

g['sieges_src'] = [['Chambre, rapport annuel 2019-2020 (résultats des élections)', 'https://www.dekamer.be/pdf_sections/publications/annualreport/rappannuel2019-2020.pdf'],
                   ['Chambre, compte rendu du 3 octobre 2020 (CRIV 55 PLEN 061)', 'https://www.dekamer.be/doc/PCRI/pdf/55/ip061.pdf']]
g['fin_txt'] = 'Fin de législature : élections du 9 juin 2024. Le gouvernement reste en affaires courantes jusqu’à la prestation de serment du gouvernement De Wever, le 3 février 2025.'

g['contexte'] = [
    {'date': '2020', 'texte': 'Le gouvernement prête serment en pleine crise du Covid-19 : l’accord s’ouvre sur la gestion de la crise sanitaire (commissaire Covid, plan pandémie, stocks stratégiques).',
     'src': [['Accord de gouvernement, chapitre 1', ACC]]},
    {'date': '24 février 2022', 'texte': 'Invasion de l’Ukraine par la Russie, que le Conseil européen « condamne dans les termes les plus forts ». En 2022, le prix du gaz sur la plateforme belge passe en moyenne de 46,9 €/MWh (2021) à 101,9 €/MWh ; l’électricité s’échange en moyenne à 244,5 €/MWh sur le marché à un jour.',
     'src': [['Conseil européen, conclusions du 24 février 2022', 'https://www.consilium.europa.eu/en/press/press-releases/2022/02/24/european-council-conclusions-24-february-2022/'],
             ['CREG, rapport annuel 2022', 'https://www.creg.be/en/highlights-creg-2022-annual-report']]},
    {'date': '2022-2023', 'texte': 'Crise de l’accueil des demandeurs d’asile : Fedasil est condamnée plus de 5 000 fois par les tribunaux du travail en 2022 et plus de 3 000 fois en 2023 pour défaut d’accueil ; le 18 juillet 2023, la Cour européenne des droits de l’homme constate dans l’affaire Camara « a systemic failure » des autorités belges à exécuter les décisions de justice. En 2022, plus de 60 000 attestations de protection temporaire sont délivrées, essentiellement à des personnes fuyant l’Ukraine.',
     'src': [['Fedasil, rapport annuel 2022', 'https://www.fedasil.be/sites/default/files/content/download/files/annual_report_2022.pdf'],
             ['Fedasil, rapport annuel 2023', 'https://www.fedasil.be/sites/default/files/rapport_annuel_2023.pdf'],
             ['Cour européenne des droits de l’homme, Camara c. Belgique (communiqué)', 'https://hudoc.echr.coe.int/app/conversion/pdf/?library=ECHR&id=003-7706270-10639596&filename=Judgment+Camara+v.+Belgium+-+Refusal+by+national+authorities+to+execute+immediately+enforceable+court+order.pdf']]},
    {'date': '2023', 'texte': 'La large réforme fiscale prévue par l’accord n’aboutit pas : le 20 juillet 2023, le Premier ministre déclare à la Chambre : « Il va de soi que j’aurais préféré me présenter devant cette Assemblée avec un accord fiscal en main. »',
     'src': [['Chambre, compte rendu du 20 juillet 2023 (CRIV 55 PLEN 257)', 'https://www.dekamer.be/doc/PCRI/pdf/55/ip257.pdf']]},
]

m = mes('Défense : 2 % du PIB d’ici 2035')
m.update({'date_txt': 'Juin-juillet 2022', 'v': 'officiel',
          'texte': 'Le plan STAR, revu en 2022, prévoit « un effort de défense qui atteint 1,54 % du PIB en 2030 » (porté à 1,55 % en valeur nominale) en « poursuivant l’objectif d’atteindre 2 % du PIB en 2035 ».',
          'src': [DK('2737'), ['Chambre, rapport (DOC 55 2737/003)', 'https://www.dekamer.be/FLWB/Pdf/55/2737/55K2737003.pdf']]})
m.pop('verif', None)

m = mes('Budget 2023-2024 : effort de 3,6 milliards')
m.update({'v': 'officiel',
          'texte': 'Effort net de 0,6 % du PIB, soit 3,6 milliards d’euros. Exonération des cotisations patronales sur les hausses de salaire dues à l’indexation aux deux premiers trimestres de 2023 (réduction de 7,07 %), report aux deux suivants ; déduction de la taxe bancaire limitée (111 millions d’euros en 2023). Budget des dépenses 2023 adopté le 22 décembre 2022 par 80 voix contre 57 et 3 abstentions.',
          'src': [['Premier ministre, discours de politique générale du 11 octobre 2022', 'https://news.belgium.be/fr/discours-de-politique-generale-un-pays-qui-protege'],
                  ['Chambre, exposé général du budget 2023 (DOC 55 2930/001)', 'https://www.dekamer.be/FLWB/PDF/55/2930/55K2930001.pdf'],
                  ['Chambre, compte rendu du 22 décembre 2022 (CRIV 55 PLEN 226)', 'https://www.dekamer.be/doc/PCRI/pdf/55/ip226.pdf']]})
m.pop('verif', None)

m = mes('Nouveau statut des travailleurs des arts')
m.update({'v': 'officiel',
          'texte': 'Loi du 16 décembre 2022 « portant création de la Commission du travail des arts et améliorant la protection sociale des travailleurs des arts ».',
          'src': [DK('2864'), ['SPF Sécurité sociale, Working in the Arts', 'https://workinginthearts.belgium.be/fr/professionnel/commission/reglementation']]})
m['verif'] = 'Numac de la loi du 16 décembre 2022 non trouvé.'

m = mes('Plan contre la fraude sociale 2023-2024')
m.update({'v': 'officiel',
          'texte': 'Au moins 3 000 enquêtes par an des services d’inspection sociale et 1 000 enquêtes supplémentaires par an sur le dumping social ; 140 inspecteurs supplémentaires en 2023 à l’ONSS, l’ONEM, l’INASTI et au SPF Emploi ; en cas de fraude de l’employeur, délai de prescription porté de 7 à 10 ans.',
          'src': [['Conseil des ministres du 13 janvier 2023', 'https://news.belgium.be/fr/node/32161/pdf'],
                  ['SIRS, plan d’action 2023-2024', 'https://www.siod.belgie.be/sites/default/files/Downloads/Actieplan/SIOD_Actieplan_2023_2024_FR_Small.pdf']]})
m.pop('verif', None)

m = mes('Budget 2024 : effort de 1,7 milliard')
m.update({'titre': 'Budget 2024 : effort de 1,2 milliard', 'v': 'officiel',
          'texte': 'Accord du 9 octobre 2023 : « un effort budgétaire de 1,2 milliard d’euros » (0,2 % du PIB) et 500 millions de politiques nouvelles ; flexi-jobs étendus à 12 secteurs supplémentaires, avec une cotisation patronale de 28 % au lieu de 25 %. En novembre 2023, la Commission européenne juge que le projet de budget « risks being not in line » avec ses recommandations : elle prévoit un déficit de 4,9 % du PIB en 2024, contre 4,6 % pour le gouvernement.',
          'src': [['Premier ministre, accord du 9 octobre 2023', 'https://premier.decroo-i.archive.belgium.be/fr/accord-sur-le-budget-f%C3%A9d%C3%A9ral-2024.html'],
                  ['Chambre, exposé général du budget 2024 (DOC 55 3645/001)', 'https://www.lachambre.be/FLWB/PDF/55/3645/55K3645001.pdf'],
                  ['Chambre, projet de loi-programme (DOC 55 3697/001)', 'https://www.lachambre.be/FLWB/PDF/55/3697/55K3697001.pdf'],
                  ['Commission européenne, avis C(2023) 9502', 'https://economy-finance.ec.europa.eu/system/files/2023-11/c_2023_9502_be_en_en.pdf']]})
m.pop('verif', None)

F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
