# « Pour aller plus loin » : lectures transmises par Tom le 4 novembre 2026, ajoutées seulement si leur existence
# a été vérifiée (page de l'éditeur, DOI, dépôt universitaire ou notice documentaire). Les articles de presse
# dont la page n'a pas pu être ouverte (Le Monde, De Standaard, Courrier international, La Libre, Le Temps, revue Démocratie)
# ne sont pas repris tant qu'ils n'ont pas été vérifiés.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
R = lambda ref, url, note='': {'type': 'recherche', 'ref': ref, 'url': url, **({'note': note} if note else {})}
P = lambda ref, url, note='': {'type': 'presse', 'ref': ref, 'url': url, 'notice': True, **({'note': note} if note else {})}
DECOSTER = R('Decoster, A., Perelman, S., Vandelannoote, D., Vanheukelom, T. et Verbist, G. (2014), « Prélèvements fiscaux et prestations sociales en Belgique : l’impact de vingt années de réformes », Revue française d’économie, XXIX (4), p. 87-127.',
             'https://orbi.uliege.be/bitstream/2268/183151/1/2015%20Revue%20Fran%C3%A7aise%20d%27%C3%A9conomie%20Decoster%20et%20al%20RFE_144_0087.pdf',
             'Effets redistributifs des réformes fiscales et sociales de 1992 à 2012, par microsimulation.')
UYTT = R('Uyttendaele, M. (2011), « Chronique d’une législature maudite. Réflexions sur l’instabilité politique de la Belgique », Pouvoirs, 136, p. 51-69.',
         'https://doi.org/10.3917/pouv.136.0051', 'Lecture juridique et institutionnelle des crises de 2007 à 2010.')
HOOGHE = R('Hooghe, M. (2012), « The Political Crisis in Belgium (2007–2011): A Federal System without Federal Loyalty », Representation, 48 (1), p. 131-138.',
           'https://doi.org/10.1080/00344893.2012.653250', 'Blocages de coalition et tensions entre communautés.')
VAL = R('Van Aelst, P. et Louwerse, T. (2014), « Parliament without Government: The Belgian Parliament and the Government Formation Processes of 2007–2011 », West European Politics, 37 (3), p. 475-496.',
        'https://doi.org/10.1080/01402382.2013.832953', 'Le travail du Parlement pendant les longues périodes d’affaires courantes.')
POP = R('Popelier, P. (2020), « COVID-19 legislation in Belgium at the crossroads of a political and a health crisis », The Theory and Practice of Legislation, 8 (1-2), p. 131-153.',
        'https://doi.org/10.1080/20508840.2020.1771884', 'Gouvernement minoritaire, pouvoirs spéciaux et rôle du Parlement pendant la crise sanitaire.')
SIN = R('Sinardet, D. et Pieters, J. (2021), « Nationalism and COVID in Belgium: A Surprisingly United Response in a Divided Federal Country », Nationalism and Ethnic Politics, 27 (3), p. 311-330.',
        'https://doi.org/10.1080/13537113.2021.1954299', 'Coordination entre niveaux de pouvoir face à la pandémie.')
PDY23 = R('Baudewyns, P., Vandeleene, A., De Winter, L. et Deruette, S. (2024), « Belgium: Political Developments and Data in 2023: The Autumn of the Vivaldi Government », Political Data Yearbook, 63 (1), p. 39-49.',
          'https://doi.org/10.1111/2047-8852.12465', 'Chronique politique de l’année 2023.')
PDY24 = R('Baudewyns, P., Vandeleene, A., De Winter, L. et Deruette, S. (2025), « Belgium: Political Developments and Data in 2024 », Political Data Yearbook, 64 (1), p. 44-63.',
          'https://doi.org/10.1111/2047-8852.70030', 'Fin de la Vivaldi, élections de 2024 et négociations qui suivent ; ne couvre pas l’application des mesures du gouvernement De Wever.')
LIBRE = P('« Alors, ce tax shift, quelle plus-value pour la Belgique ? », La Libre Belgique, 8 février 2020, p. 2.',
          'https://documentation.pfwb.be/index.php?id=189183&lvl=notice_display', 'Notice du centre de documentation du Parlement de la Fédération Wallonie-Bruxelles.')
ECHO = P('« Le cdH relativise le bilan économique de Michel », L’Echo, 28 août 2018.',
         'https://documentation.pfwb.be/index.php?id=150914&lvl=notice_display', 'Présente l’étude d’un parti d’opposition : une argumentation politique, examinée par la presse.')
L = {
    'verhofstadt-1': [DECOSTER], 'verhofstadt-2': [DECOSTER],
    'verhofstadt-3': [UYTT, HOOGHE, VAL], 'leterme-1': [UYTT, HOOGHE, VAL], 'van-rompuy': [UYTT, HOOGHE, VAL],
    'leterme-2': [UYTT, HOOGHE, VAL], 'di-rupo': [DECOSTER, HOOGHE],
    'michel-1': [LIBRE, ECHO], 'wilmes-2': [POP, SIN], 'de-croo': [SIN, PDY23, PDY24], 'de-wever': [PDY24],
}
for gid, lst in L.items():
    G[gid]['lectures'] = lst
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
