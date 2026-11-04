# « Pour aller plus loin » : uniquement des articles de revues à comité de lecture (consigne de Tom du 4 novembre 2026).
# Recherche du 4 novembre 2026 (Google Scholar, Crossref et OpenAlex inaccessibles : recherche web, pages des éditeurs,
# RePEc, dépôts universitaires). Chaque référence a été ouverte ; la phrase de contenu résume le résumé (abstract) lu.
# Exclus : presse, livres, chapitres, working papers, rapports, annuaires (Political Data Yearbook), revues sans
# évaluation par les pairs démontrée (Pouvoirs, Icade, Journal des tribunaux, Confluence des droits), textes sans résumé lu.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
def A(ref, url, note): return {'type': 'recherche', 'ref': ref, 'url': url, 'note': note}
DOI = lambda d: 'https://doi.org/' + d

DECOSTER = A('Decoster, A., Perelman, S., Vandelannoote, D., Vanheukelom, T. et Verbist, G. (2014), « Prélèvements fiscaux et prestations sociales en Belgique : l’impact de vingt années de réformes », Revue française d’économie, XXIX (4), p. 87-127.',
             DOI('10.3917/rfe.144.0087'), 'Effets redistributifs des réformes fiscales et sociales de 1992 à 2012, par microsimulation.')
CANTILLON = A('Cantillon, B., Kerstens, B. et Verbist, G. (2003), « Les effets redistributifs de la réforme de l’impôt des personnes physiques : résultats de microsimulation », Brussels Economic Review, 46 (1), p. 71-98.',
              'https://ideas.repec.org/a/bxr/bxrceb/y2003v46i1p71-98.html', 'Qui bénéficie de la réforme fiscale de 2001 et quel est son effet sur la pauvreté (microsimulation).')
ORSINI = A('Orsini, K. (2007), « Is Belgium “Making Work Pay”? », Brussels Economic Review, 50 (2), p. 193-220.',
           'https://econpapers.repec.org/RePEc:bxr:bxrceb:2013/80269', 'Crédit d’impôt et baisse des cotisations sur les bas salaires : hausse modeste de la participation et des heures travaillées. Plutôt favorable.')
VANDEWEYER = A('Vandeweyer, J. et Glorieux, I. (2008), « Men Taking Up Career Leave: An Opportunity for a Better Work and Family Life Balance? », Journal of Social Policy, 37 (2), p. 271-294.',
               DOI('10.1017/S0047279407001742'), 'Usage du crédit-temps par les hommes en Flandre : pour moitié, l’interruption à temps plein sert à tester un autre emploi. Nuancé.')
ALBANESE = A('Albanese, A., Cockx, B. et Thuy, Y. (2020), « Working time reductions at the end of the career: Do they prolong the time spent in employment? », Empirical Economics, 59 (1), p. 99-141.',
             DOI('10.1007/s00181-019-01676-7'), 'Le crédit-temps de fin de carrière prolonge l’emploi d’environ deux ans (hommes) et quatre ans (femmes), effet qui s’inverse à l’âge de la retraite anticipée. Nuancé.')
KESTENS = A('Kestens, K., Van Cauwenberge, P. et Christiaens, J. (2012), « The Effect of the Notional Interest Deduction on the Capital Structure of Belgian SMEs », Environment and Planning C: Government and Policy, 30 (2), p. 228-247.',
            DOI('10.1068/c1163b'), 'La déduction des intérêts notionnels a réduit les taux marginaux d’imposition des PME et contribue à expliquer l’évolution de leur endettement. Plutôt favorable.')
VANCAMPENHOUT = A('Van Campenhout, G. et Van Caneghem, T. (2013), « How did the notional interest deduction affect Belgian SMEs’ capital structure? », Small Business Economics, 40 (2), p. 351-373.',
                  DOI('10.1007/s11187-011-9364-1'), 'Aucun changement significatif de l’endettement des PME après la mesure. Défavorable : à lire avec l’article précédent, qui conclut autrement.')
COCKX12 = A('Cockx, B. et Dejemeppe, M. (2012), « Monitoring job search effort: An evaluation based on a regression discontinuity design », Labour Economics, 19 (5), p. 729-737.',
            DOI('10.1016/j.labeco.2012.05.017'), 'La lettre d’avertissement du contrôle de la recherche d’emploi augmente d’environ 9 points les sorties vers l’emploi. Favorable.')
COCKX18 = A('Cockx, B., Dejemeppe, M., Launov, A. et Van der Linden, B. (2018), « Imperfect Monitoring of Job Search: Structural Estimation and Policy Design », Journal of Labor Economics, 36 (1), p. 75-120.',
            DOI('10.1086/693868'), 'Le contrôle n’a qu’un effet faible sur la recherche d’emploi, en raison de sa conception ; une autre conception serait plus efficace. Plutôt défavorable au dispositif tel quel.')
RAZ = A('Raz-Yurovich, L. et Marx, I. (2018), « What does state-subsidized outsourcing of domestic work do for women’s employment? The Belgian service voucher scheme », Journal of European Social Policy, 28 (2), p. 104-115.',
        DOI('10.1177/0958928717709173'), 'Les titres-services améliorent l’emploi des femmes peu qualifiées, gains inversés pendant la récession de 2008. Plutôt favorable.')
LEDUC = A('Leduc, E. et Tojerow, I. (2024), « Home work: Exploring the labor market effects of subsidizing domestic services », Labour Economics, 90, article 102595.',
          DOI('10.1016/j.labeco.2024.102595'), 'Les subsides augmentent l’emploi féminin et la participation formelle, mais peuvent aussi accroître l’incapacité de travail. Nuancé.')
DEFOURNY = A('Defourny, J., Henry, A., Nassaut, S. et Nyssens, M. (2010), « Does the Mission of Providers Matter on a Quasi-Market? The Case of the Belgian “Service Voucher” Scheme », Annals of Public and Cooperative Economics, 81 (4), p. 583-610.',
             DOI('10.1111/j.1467-8292.2010.00423.x'), 'La qualité des emplois en titres-services varie selon le type d’entreprise : meilleure dans l’économie sociale, plus faible dans les agences d’intérim. Nuancé.')
DEJEMEPPE15 = A('Dejemeppe, M., Smith, C. et Van der Linden, B. (2015), « Did the Intergenerational Solidarity Pact increase the employment rate of older workers in Belgium? A macro-econometric evaluation », IZA Journal of Labor Policy, 4, p. 1-23.',
                DOI('10.1186/s40173-015-0040-y'), 'Léger effet positif du Pacte des générations sur l’emploi des travailleurs âgés, au détriment des jeunes ; résultats statistiquement fragiles. Nuancé.')
HOOGHE = A('Hooghe, M. (2012), « The Political Crisis in Belgium (2007–2011): A Federal System without Federal Loyalty », Representation, 48 (1), p. 131-138.',
           DOI('10.1080/00344893.2012.653250'), 'Explique la crise de 2007 à 2011 par le système électoral et la structure des partis, sans incitation à la loyauté entre communautés.')
VANAELST = A('Van Aelst, P. et Louwerse, T. (2014), « Parliament without Government: The Belgian Parliament and the Government Formation Processes of 2007–2011 », West European Politics, 37 (3), p. 475-496.',
             DOI('10.1080/01402382.2013.832953'), 'Pendant les formations, le Parlement prend plus d’initiatives et le clivage majorité-opposition s’atténue.')
BRANS = A('Brans, M., Pattyn, V. et Bouckaert, G. (2016), « Taking Care of Policy in Times of Crisis: Comparative Lessons from Belgium’s Longest Caretaker Government », Journal of Comparative Policy Analysis, 18 (5), p. 448-463.',
          DOI('10.1080/13876988.2015.1104811'), 'Pendant les 541 jours d’affaires courantes, la crise économique extérieure a élargi ce que le gouvernement pouvait légitimement faire.')
DANDOY = A('Dandoy, R. et Terrière, L. (2021), « Caretaker Cabinets in Belgium: A New Measurement and Typology », Politics of the Low Countries, 3 (1), p. 95-108.',
           DOI('10.5553/PLC/.000009'), 'Au moins 1 485 jours de gouvernement en affaires courantes entre 2007 et 2020 ; propose une typologie de ces périodes.')
FASSIN = A('Fassin, Y. et Gosselin, D. (2011), « The Collapse of a European Bank in the Financial Crisis: An Analysis from Stakeholder and Ethical Perspectives », Journal of Business Ethics, 102 (2), p. 169-191.',
           DOI('10.1007/s10551-011-0812-2'), 'La chute de Fortis sous l’angle de la communication, des actionnaires et des conflits d’intérêts ; critique de l’entreprise, pas des mesures publiques.')
GOOSSENS17 = A('Goossens, J. (2017), « Electoral reforms in Belgium’s sixth state reform: Historic split of electoral constituency BHV, reform of the Senate, and coincident elections », Election Law Journal, 16 (2), p. 316-324.',
               DOI('10.1089/elj.2016.0420'), 'Description des volets électoraux de la sixième réforme de l’État : scission de BHV, réforme du Sénat, élections simultanées.')
GOOSSENS15 = A('Goossens, J. et Cannoot, P. (2015), « Belgian Federalism after the Sixth State Reform », Perspectives on Federalism, 7 (2), p. 30-55.',
               'https://core.ac.uk/download/55799447.pdf', 'La réforme réalise des changements attendus, mais le modèle belge atteint ses limites de complexité. Nuancé.')
NUYTS = A('Nuyts, N., Segaert, M. et Votquenne, S. (2022), « Dix ans de dégressivité renforcée des allocations de chômage – Une évaluation », Revue belge de sécurité sociale, 2022 (1).',
          'https://socialsecurity.belgium.be/sites/default/files/content/docs/fr/publications/rbss/2022/02-dix-ans-de-degressivite-renforcee-des-allocations-de-chomage-une-evaluation.pdf',
          'Selon les auteurs, agents de l’ONEM, la dégressivité renforcée de 2012 n’a pas fait réintégrer davantage de chômeurs dans l’emploi, pour une économie budgétaire limitée. Défavorable.')
SCHNABEL = A('Schnabel, J. (2019), « Fiscal Consolidation in Federal Belgium: Collective Action Problem and Solutions », Politics of the Low Countries, 1 (2).',
             'https://kar.kent.ac.uk/75270/', 'L’assainissement budgétaire belge doit beaucoup au compromis entre partis et au Conseil supérieur des Finances. Plutôt favorable à la méthode.')
VERBRUGGEN = A('Verbruggen, A. (2013), « Belgian nuclear power life extension and fuss about nuclear rents », Energy Policy, 60, p. 91-97.',
               DOI('10.1016/j.enpol.2013.04.054'), 'Analyse le débat sur la rente nucléaire et juge opaque la décision de 2012 de prolonger Tihange 1. Critique du processus.')
BIJNENS = A('Bijnens, G., Karimov, S. et Konings, J. (2023), « Does Automatic Wage Indexation Destroy Jobs? A Machine Learning Approach », De Economist, 171 (1), p. 85-117.',
            DOI('10.1007/s10645-023-09418-y'), 'Le saut d’index de 2015 a baissé les salaires réels de 2 % et augmenté l’emploi d’environ 1,2 %. Favorable sur l’emploi.')
COCKX20 = A('Cockx, B., Declercq, K., Dejemeppe, M., Inga, L. et Van der Linden, B. (2020), « Switching from an inclining to a zero-level unemployment benefit profile: Good for work incentives? », Labour Economics, 64, article 101816.',
            DOI('10.1016/j.labeco.2020.101816'), 'Les jeunes qui demandent les allocations d’insertion à 25 ans ou plus en sont exclus depuis 2015 : la mesure n’augmente que les emplois de très courte durée. Plutôt défavorable.')
COCKX23 = A('Cockx, B., Declercq, K. et Dejemeppe, M. (2023), « Tightening eligibility requirements for unemployment benefits. Impact on educational attainment », Economics of Education Review, 95, article 102424.',
            DOI('10.1016/j.econedurev.2023.102424'), 'La même réforme augmente la réussite et réduit l’abandon dans l’enseignement supérieur, pas dans le secondaire. Favorable sur l’éducation : à lire avec l’article précédent.')
PILET = A('Pilet, J.-B. (2021), « Hard times for governing parties: the 2019 federal elections in Belgium », West European Politics, 44 (2).',
          DOI('10.1080/01402382.2020.1750834'), 'Défaite des partis de la coalition sortante en 2019 et difficulté croissante de former des coalitions.')
GUILLAUME = A('Guillaume-Le Gall, M., Humbert-Labeaumaz, A., Augé, A., Pascolo, L. et Reuchamps, M. (2026), « French big brother is watching Belgium: how French newspapers covered Belgian political crises », Comparative European Politics, 24 (1), article 7.',
              DOI('10.1057/s41295-025-00444-5'), 'Comment la presse française a couvert la crise de 541 jours et celle de 2018-2020, ouverte par le Pacte de Marrakech.')
POPELIER = A('Popelier, P. (2020), « COVID-19 legislation in Belgium at the crossroads of a political and a health crisis », The Theory and Practice of Legislation, 8 (1-2), p. 131-153.',
             DOI('10.1080/20508840.2020.1771884'), 'Gouvernement minoritaire, pouvoirs spéciaux et rôle du Parlement pendant la crise sanitaire.')
SINARDET = A('Sinardet, D. et Pieters, J. (2021), « Nationalism and COVID in Belgium: A Surprisingly United Response in a Divided Federal Country », Nationalism and Ethnic Politics, 27 (3), p. 311-330.',
             DOI('10.1080/13537113.2021.1954299'), 'Ce qui a permis une réponse commune entre niveaux de pouvoir face à la pandémie.')
OVERBEKE = A('Van Overbeke, T. et Stadig, D. (2020), « High politics in the Low Countries: COVID-19 and the politics of strained multi-level policy cooperation in Belgium and the Netherlands », European Policy Analysis, 6 (2), p. 305-317.',
             DOI('10.1002/epa2.1101'), 'En Belgique, la lenteur des négociations entre fédéral et entités fédérées a mis le système fédéral en question. Plutôt critique.')
VANDEWALLE = A('Vande Walle, B., Wolfs, W. et Van Hecke, S. (2021), « Opposition in Times of COVID-19: To Support or Not to Support? », Politics of the Low Countries, 3 (2), p. 138-159.',
               DOI('10.5553/PLC/.000019'), 'Pourquoi des partis d’opposition ont soutenu le gouvernement pendant la crise.')
MASSART = A('Massart, T., Vos, T., Egger, C., Dupuy, C., Morel-Jean, C., Magni-Berton, R. et Roché, S. (2021), « The Resilience of Democracy in the Midst of the COVID-19 Pandemic: Democratic Compensators in Belgium, the Netherlands and France », Politics of the Low Countries, 3 (2), p. 113-137.',
            DOI('10.5553/PLC/.000018'), 'Les contre-pouvoirs ont compensé en partie la concentration des décisions pendant la crise. Nuancé.')
LUYTEN = A('Luyten, J. et Schokkaert, E. (2022), « Belgium’s response to the COVID-19 pandemic », Health Economics, Policy and Law, 17 (1), p. 37-47.',
           DOI('10.1017/S1744133121000232'), 'Mauvais résultats en partie dus à la mesure, mais protection insuffisante des maisons de repos lors de la première vague. Plutôt défavorable.')
DEBECKER = A('De Becker, E. et Bruynseraede, C. (2024), « Unemployment protection for self-employed and platform workers in Belgium », European Journal of Social Security, 26 (2), p. 123-139.',
             DOI('10.1177/13882627241232398'), 'Le droit passerelle a été étendu, encore en 2022 et 2023, mais des lacunes de protection subsistent. Nuancé.')
CAMATARRI = A('Camatarri, S., Baudewyns, P., Dandoy, R. et Reuchamps, M. (2025), « The 2024 Belgian federal elections: a race to the right », West European Politics, 48 (7), p. 1760-1771.',
              DOI('10.1080/01402382.2025.2492986'), 'Les élections de 2024 : chute de la coalition Vivaldi et formation de la coalition « Arizona ».')

L = {
    'verhofstadt-1': [CANTILLON, ORSINI, VANDEWEYER, ALBANESE, DECOSTER],
    'verhofstadt-2': [KESTENS, VANCAMPENHOUT, COCKX12, COCKX18, RAZ, LEDUC, DEFOURNY, DEJEMEPPE15, DECOSTER],
    'verhofstadt-3': [HOOGHE, VANAELST],
    'leterme-1': [FASSIN, HOOGHE, VANAELST],
    'van-rompuy': [HOOGHE, VANAELST],
    'leterme-2': [BRANS, DANDOY, HOOGHE, VANAELST],
    'di-rupo': [GOOSSENS17, GOOSSENS15, NUYTS, SCHNABEL, VERBRUGGEN, DECOSTER],
    'michel-1': [BIJNENS, COCKX20, COCKX23],
    'michel-2': [PILET, DANDOY, GUILLAUME],
    'wilmes-1': [PILET],
    'wilmes-2': [POPELIER, SINARDET, OVERBEKE, VANDEWALLE, MASSART, LUYTEN, DEBECKER],
    'de-croo': [LUYTEN, SINARDET, DEBECKER, CAMATARRI],
    'de-wever': [CAMATARRI],
}
for g in M['gouvernements']:
    g['lectures'] = L.get(g['id'], [])
    if not g['lectures']: g.pop('lectures')
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', sum(len(v) for v in L.values()))
