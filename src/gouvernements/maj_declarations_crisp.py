# Déclarations Van Rompuy (31/12/2008) et Wilmès II (17/3/2020, CRABV 55 PLEN 029) lues en entier ;
# fiches de contextualisation du CRISP sur Michel II et Wilmès I, déposées par Tom le 3 novembre 2026.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
CRISP_M2 = 'CRISP, fiche de contextualisation du gouvernement Michel II'
CRISP_W = 'CRISP, fiche de contextualisation du gouvernement Wilmès'

# ---------- Van Rompuy ----------
ac = G['van-rompuy']['accord']
ac['titre'] = 'Pas de nouvel accord : déclaration « Œuvrer à la confiance »'
ac['k'] = 'Ce que le gouvernement annonce'
ac['resume'] = [
    '<b>Reprise de l’accord précédent</b> : le gouvernement « mettra en œuvre, dans son intégralité, l’accord de gouvernement du gouvernement précédent ».',
    '<b>Crise et emploi</b> : la crise financière est « la plus grave depuis les années trente » ; l’emploi est « l’objectif premier du gouvernement » ; exécuter au plus vite le plan de relance du gouvernement Leterme et l’accord interprofessionnel ; soutien aux PME.',
    '<b>Sécurité sociale</b> : la renforcer comme « rempart » contre la pauvreté et l’endettement ; poursuivre la hausse des pensions, avec la Conférence nationale des pensions.',
    '<b>Budget et climat</b> : préparer un plan pour résorber le déficit structurel ; s’inscrire dans le plan climat européen.',
    '<b>Institutions</b> : propositions du groupe Lamfalussy sur la structure financière ; commission d’enquête parlementaire sur la séparation des pouvoirs ; relance du dialogue communautaire et groupe de travail sur Bruxelles-Hal-Vilvorde, avec des conclusions dès l’été 2009.',
]
ac['note'] = ''
ac['lecture'] = 'Résumé établi sur le texte intégral de la déclaration (4 pages). Elle ne contient pas de nouveaux engagements chiffrés.'

# ---------- Michel II ----------
g = G['michel-2']; ac = g['accord']
ac['titre'] = 'Pas de déclaration gouvernementale ni de vote de confiance'
ac['k'] = 'Priorités annoncées à la presse'
ac['resume'] = [
    'Le Premier ministre présente sa coalition remaniée comme une « Orange bleue », avec ces « défis prioritaires » : « Pouvoir d’achat, développement économique et social, soutien aux investissements… ; sécurité & justice ; focus sur politique climatique ».',
    'Le 18 décembre 2018, il propose à l’opposition une « main tendue » : utilisation à 100 % de l’enveloppe bien-être par les partenaires sociaux, TVA sur l’énergie revue pour alléger les factures, réflexion sur la criminalité et la migration, réponses aux revendications de la marche pour le climat du 2 décembre. L’opposition ne suit pas.',
]
ac['lecture'] = 'D’après la fiche de contextualisation du CRISP : malgré les demandes de l’opposition, le gouvernement n’a ni présenté de déclaration au Parlement ni demandé la confiance.'
g['contexte'] = [
    {'date': '27 septembre 2018', 'texte': 'À l’ONU, Charles Michel annonce que la Belgique approuvera le Pacte mondial pour des migrations sûres, ordonnées et régulières (Pacte de Marrakech). La N-VA s’y oppose à partir de fin octobre.', 'srcnote': CRISP_M2},
    {'date': '9 décembre 2018', 'texte': 'Les trois ministres et deux secrétaires d’État N-VA démissionnent. MR, CD&V et Open VLD gouvernent seuls avec 52 sièges sur 150. Le lendemain, à Marrakech, Charles Michel confirme l’appui de la Belgique au pacte.', 'srcnote': CRISP_M2},
    {'date': '18-21 décembre 2018', 'texte': 'Faute d’accord avec l’opposition, Charles Michel présente la démission du gouvernement le 18 décembre ; le Roi l’accepte le 21 et le charge des affaires courantes jusqu’aux élections du 26 mai 2019.', 'srcnote': CRISP_W},
    {'date': '2 juillet 2019', 'texte': 'Le Conseil européen choisit Charles Michel comme président à partir du 1er décembre 2019.', 'srcnote': CRISP_W},
]
g['fin_txt'] = 'Démission présentée le 18 décembre 2018, acceptée le 21 décembre ; affaires courantes, prolongées après les élections du 26 mai 2019, jusqu’au départ de Charles Michel pour la présidence du Conseil européen.'

# ---------- Wilmès I ----------
g = G['wilmes-1']
g['contexte'] = [
    {'date': '27 octobre 2019', 'texte': 'Sophie Wilmès, ministre du Budget, devient la première femme Première ministre de Belgique. Elle confirme la démission du gouvernement, est chargée « de la poursuite de l’expédition des affaires courantes » et ne demande pas la confiance de la Chambre.', 'srcnote': CRISP_W},
]
g['accord']['lecture'] = 'D’après la fiche de contextualisation du CRISP : gouvernement chargé des affaires courantes, sans déclaration ni vote de confiance.'

# ---------- Wilmès II ----------
ac = G['wilmes-2']['accord']
ac['k'] = 'Ce que le gouvernement annonce'
ac['resume'] = [
    '<b>Objectif</b> : « simple et unique : protéger la santé de notre population » ; d’abord assurer le personnel et le matériel des hôpitaux, avec le Conseil national de sécurité élargi aux entités fédérées.',
    '<b>Économie</b> : un groupe de suivi, l’Economic Risk Management Group, mesure l’impact de la pandémie sur les entreprises et les travailleurs ; mesures pour salariés et indépendants.',
    '<b>Budget</b> : vote des douzièmes provisoires avec une provision d’un milliard d’euros réservée à la lutte contre le coronavirus.',
    '<b>Pouvoirs spéciaux</b> : demandés pour six mois, avec évaluation après trois mois, en santé publique, affaires sociales (dont le droit du travail), sécurité et économie, sous le contrôle de la Chambre.',
    '<b>Limites</b> : la confiance sera redemandée dans six mois au plus tard ; hors crise, le gouvernement reste dans le périmètre des affaires courantes ; l’objectif reste un gouvernement avec une majorité.',
    'Confiance votée le 19 mars 2020 par 82 voix contre 44, sans abstention.',
]
ac['note'] = ''
ac['lecture'] = 'Résumé établi sur le compte rendu analytique de la séance du 17 mars 2020 (CRABV 55 PLEN 029). Les lois du 27 mars 2020 accordent finalement les pouvoirs spéciaux pour trois mois, prorogeables une fois.'

F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
