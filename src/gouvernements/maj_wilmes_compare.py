# « Annoncé et réalisé » pour Wilmès II (déclaration du 17 mars 2020, compte rendu analytique CRABV 55 PLEN 029) ;
# libellé « Déclaration » pour les gouvernements sans accord de coalition.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
for gid in ('verhofstadt-3', 'van-rompuy', 'leterme-2', 'verhofstadt-2'):
    if G[gid].get('compare'): G[gid]['compare']['plabel'] = 'Déclaration'
g = G['wilmes-2']
items = [
    {'statut': 'partiel', 'eng': 'Recourir aux pouvoirs spéciaux pendant six mois, avec une évaluation après trois mois, sous le contrôle de la Chambre.', 'p': '3',
     'constat': 'Lois du 27 mars 2020 : pouvoirs accordés pour trois mois, prorogeables une fois, et arrêtés à confirmer par une loi dans l’année.', 'mesure': 'Pouvoirs spéciaux'},
    {'statut': 'adopte', 'eng': 'Alléger les problèmes socio-économiques des indépendants.', 'p': '3',
     'constat': 'Droit passerelle de crise : 415 985 indépendants aidés de mars à juillet 2020.', 'mesure': 'Droit passerelle de crise pour les indépendants'},
    {'statut': 'adopte', 'eng': 'Alléger les problèmes socio-économiques des salariés.', 'p': '3',
     'constat': 'Chômage temporaire pour force majeure ouvert largement, avec une allocation portée à 70 %.', 'mesure': 'Chômage temporaire « corona »'},
]
t = {m['titre'] for m in g['mesures']}
for x in items: assert x['mesure'] in t, x['mesure']
g['compare'] = {'intro': 'Gouvernement minoritaire investi le 17 mars 2020 pour un mandat limité à la crise du Covid-19, sans accord de coalition. Sa déclaration fixe quelques engagements, comparés ici aux textes adoptés.',
                'items': items, 'plabel': 'Déclaration'}
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
