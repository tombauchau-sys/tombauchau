# Corrections après vérification du 2 novembre 2026 (fiches de la Chambre, CRISP, communiqué du Palais cité par la presse)
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
CR23 = ['CRISP, L’année politique 2023 au niveau fédéral', 'https://www.crisp.be/fr/catalogue/2139-lannee-politique-2023-au-niveau-federal.html']

dc = G['de-croo']
dc['contexte'] += [
    {'date': '2022-2023', 'texte': 'Crise de l’accueil des demandeurs d’asile : le réseau d’accueil est saturé ; le CRISP la décrit comme une mise à l’épreuve des principes de l’État de droit.', 'src': [CR23]},
    {'date': '2023', 'texte': 'La large réforme fiscale prévue par l’accord est annoncée à plusieurs reprises puis abandonnée ; la réforme des pensions adoptée est fortement réduite par rapport à l’ambition de départ, selon le CRISP.', 'src': [CR23]},
]
for m in dc['mesures']:
    if m['titre'].startswith('Réforme des pensions'):
        m['texte'] = 'Issue des compromis politiques de juillet 2022 et de juillet 2023, plus limitée que l’ambition de départ selon le CRISP : bonus pension pour ceux qui continuent à travailler (constitué à partir du 1er juillet 2024) ; à partir de 2025, la pension minimum exige, en plus de 30 ans de carrière, au moins 5 000 jours de travail effectif à temps plein (environ 16 ans) ou 3 120 jours à temps partiel.'
        m['src'].append(CR23)
    if m['titre'].startswith('Prolongation de Doel'):
        m['texte'] = 'Revirement par rapport à l’accord de 2020, qui confirmait la sortie du nucléaire : en mars 2022, invoquant notamment la sécurité d’approvisionnement, le gouvernement décide de prolonger les deux réacteurs. La loi autorise dix ans d’exploitation supplémentaires ; l’État en porte indirectement 44,9 % et la facture future des déchets nucléaires d’Engie est forfaitisée à 15 milliards d’euros.'
        m['src'].append(['Conseil des ministres, 1er avril 2022', 'https://news.belgium.be/fr/node/29645/pdf'])

dw = G['de-wever']
dw['contexte'][-1] = {'date': '1er-2 novembre 2026', 'texte': 'Pas d’accord sur le budget 2027 au comité ministériel restreint. Le 2 novembre, le Premier ministre présente au Roi la démission du gouvernement. Selon le communiqué du Palais cité par la presse, le Roi « tient sa décision en suspens », consulte les présidents des partis de la majorité et recevra à nouveau le Premier ministre le vendredi 6 novembre.', 'presse': True, 'src': [['L’Avenir, 2 novembre 2026, 11 h 39', 'https://www.lavenir.net/actu/belgique/politique/2026/11/02/la-demission-de-bart-de-wever-mise-en-suspens-par-le-roi-pourquoi-larizona-na-pas-encore-pousse-son-dernier-soupir-U2YWRIR2TZF6PHZYFSOC2GM62U/'], ['AFP via DH, 2 novembre 2026', 'https://www.dhnet.be/dernieres-depeches/2026/11/02/blocage-budgetaire-en-belgique-la-demission-du-premier-ministre-en-suspens-TPARIFDB2JFZNJNK7YMWVI5P6Y/']]}
dw['fin_txt'] = 'Démission présentée au Roi le 2 novembre 2026 ; le Roi tient sa décision en suspens (nouvelle audience prévue le 6 novembre). Le gouvernement reste en fonction.'
CH = 'https://www.lachambre.be/FLWB/html/56/F/56K{}.html'
for m in dw['mesures']:
    t = m['titre']
    if t.startswith('Accueil des demandeurs'):
        m['texte'] = 'Fedasil peut refuser l’aide matérielle aux personnes déjà protégées dans un autre État de l’Union ; l’accueil sous forme d’aide financière est supprimé. La Cour constitutionnelle suspend ces deux volets (février 2026), puis annule la suppression de l’aide financière et interroge la Cour de justice de l’Union sur le premier (mai 2026). Une seconde loi du même jour restreint les demandes d’asile ultérieures.'
        m['src'] = [['Chambre, dossier DOC 56 0914', CH.format('0914')], ['Chambre, dossier DOC 56 0912', CH.format('0912')]] + m['src']
        m['ref'] = 'Loi du 14 juillet 2025 modifiant la loi du 12 janvier 2007 sur l’accueil des demandeurs d’asile (numac 2025005511) et loi du même jour sur les demandes ultérieures (numac 2025005452) ; adoptées le 10 juillet 2025 ; Moniteur belge du 23 juillet 2025'
        m['date'] = '2025-07-23'
        m['verif'] = 'Numac relevés par l’Union des Villes et Communes de Wallonie : à contrôler sur le Moniteur belge.'
    if t.startswith('Regroupement'):
        m['ref'] = 'Loi du 18 juillet 2025 modifiant la loi du 15 décembre 1980 (regroupement familial) ; adoptée le 17 juillet 2025 ; Moniteur belge du 8 août 2025'
    if t.startswith('Retour au travail'):
        m['ref'] = 'Loi du 19 décembre 2025 exécutant une politique renforcée de retour au travail ; adoptée le 18 décembre 2025 ; Moniteur belge du 30 décembre 2025'
    if t.startswith('Réforme des pensions'):
        m['ref'] = 'Loi du 30 mai 2026 portant la réforme des pensions (I), Moniteur belge du 1er juin 2026, et loi du 18 juin 2026 (II), Moniteur belge du 24 juin 2026 ; toutes deux adoptées par la Chambre le 28 mai 2026'
        m['verif'] = 'L’accord prévoit un malus et un bonus de 2 %, 4 % puis 5 % par année : vérifier que la loi votée reprend ces taux.'
    if t.startswith('Dépenses de défense'):
        m['texte'] = 'Selon les estimations de l’OTAN (juin 2025), 2,00 % du PIB en 2025 contre 1,29 % en 2024. Au sommet de La Haye (24-25 juin 2025), la Belgique souscrit au nouvel objectif de l’OTAN : 5 % du PIB d’ici 2035, dont 3,5 % pour la défense proprement dite. Le Conseil de l’Union compte 1,4 % pour 2025 : les deux institutions ne retiennent pas les mêmes dépenses.'
        m['src'].append(['CRISP, Cinq pour cent du PIB (décembre 2025)', 'https://www.crisp.be/fr/catalogue/2806-cinq-pour-cent-du-pib.html'])
dw['mesures'].append({'date': '2025-06-30', 'date_txt': 'Juin 2025', 'd': 'eco', 'titre': 'Île énergétique Princesse Élisabeth en partie suspendue',
    'texte': 'Pour réduire les coûts, le gouvernement suspend la partie du projet d’île énergétique en mer du Nord qui devait la relier aux réseaux des pays voisins et aux parcs éoliens.',
    'src': [['CRISP, Le secteur de l’éolien offshore en Belgique (2025)', 'https://www.crisp.be/fr/catalogue/2154-le-secteur-de-leolien-ioffshorei-en-belgique.html']], 'v': 'reference',
    'verif': 'Décision du Conseil des ministres à retrouver (date exacte).'})
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(dc['mesures']), len(dw['mesures']))
