# De Wever : sources officielles (règle de Tom du 3 novembre 2026). Palais royal, Chambre, Conseil des ministres.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
g = next(x for x in M['gouvernements'] if x['id'] == 'de-wever')
def mes(t): return next(m for m in g['mesures'] if m['titre'] == t)
PAL26 = ['Palais royal, audience du 2 novembre 2026', 'https://www.monarchie.be/fr/agenda/audience-du-premier-ministre-57']

g['sieges_src'] = [['Chambre, résultats des élections du 9 juin 2024', 'https://www.dekamer.be/pdf_sections/pri/fiche/fr_09_02.pdf']]
g['fin_txt'] = 'Le 2 novembre 2026, le Premier ministre remet au Roi la démission du gouvernement « suite à l’échec des négociations budgétaires ». Le Roi « tient sa décision en suspens », consulte les présidents des partis de la majorité et recevra à nouveau le Premier ministre le 6 novembre 2026. Le gouvernement reste en fonction.'
g['fin_src'] = [PAL26]
cx = []
for c in g['contexte']:
    if c['date'] == '6 novembre 2025':
        c.update({'texte': 'Le Premier ministre fait part au Roi de « désaccords persistants » au sein du gouvernement sur le budget, les partenaires souhaitant « poursuivre le travail ». Le Roi demande « de doter le pays au plus vite d’une trajectoire budgétaire claire pour les années à venir ».',
                  'src': [['Palais royal, audience du 6 novembre 2025', 'https://www.monarchie.be/fr/agenda/audience-premier-ministre']]})
        c.pop('presse', None)
    if c['date'] == '1er-2 novembre 2026':
        c.update({'date': '2 novembre 2026',
                  'texte': 'Le Premier ministre remet la démission du gouvernement au Roi « suite à l’échec des négociations budgétaires ». Le Roi « déplore l’absence d’accord visant à doter le pays d’un budget crédible » et tient sa décision en suspens ; il reçoit les présidents de parti dès le 3 novembre.',
                  'src': [PAL26, ['Palais royal, audience du 3 novembre 2026', 'https://www.monarchie.be/fr/agenda/audience-1159']]})
        c.pop('presse', None)
    cx.append(c)
g['contexte'] = cx

m = mes('Hausses de TVA ciblées')
m.update({'v': 'officiel', 'date_txt': 'Mars 2026',
          'texte': 'Arrêté royal modifiant l’arrêté royal n° 20 sur les taux de TVA : de 6 % à 12 % pour la fourniture de logements meublés et les emplacements de camping, de 12 % à 21 % pour les pesticides.',
          'src': [['Conseil des ministres du 23 décembre 2025', 'https://news.belgium.be/fr/node/42538/pdf'],
                  ['Conseil des ministres du 13 février 2026 (deuxième lecture)', 'https://news.belgium.be/fr/node/42960/pdf']],
          'verif': 'Date de l’arrêté royal, publication au Moniteur et entrée en vigueur au 1er mars 2026 non relues dans une source officielle.'})
m = mes('Île énergétique Princesse Élisabeth en partie suspendue')
m.update({'titre': 'Île énergétique : partie en courant continu suspendue', 'v': 'officiel', 'date': '2025-06-06',
          'texte': 'Le ministre de l’Énergie explique à la Chambre : « Le gouvernement a décidé de suspendre la partie en courant continu prévue sur cette île », « afin de ne pas exposer 3 milliards d’euros supplémentaires ». La construction de l’île et de l’infrastructure en courant alternatif se poursuit.',
          'src': [['Chambre, commission Énergie du 1er juillet 2025 (CRIV 56 COM 153)', 'https://www.dekamer.be/doc/CCRI/pdf/56/ic153.pdf'],
                  ['Elia (gestionnaire de réseau), communiqué du 6 juin 2025', 'https://www.elia.be/press/2025/06/20250605_optimisation-of-the-offshore-energy-hub']]})
m.pop('verif', None)
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
