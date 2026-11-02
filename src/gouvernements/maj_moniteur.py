# Contrôle sur le Moniteur belge (éditions des 21/4, 1/6 éd. 2, 2/7 et 29/7/2026, PDF déposés par Tom le 2 novembre 2026).
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
dw = next(g for g in M['gouvernements'] if g['id'] == 'de-wever')
def eli(d, numac):
    y, m, j = d.split('-')
    return ['Moniteur belge (numac ' + numac + ')', f'https://www.ejustice.just.fgov.be/eli/loi/{y}/{m}/{j}/{numac}/justel']
for x in dw['mesures']:
    t = x['titre']
    if t.startswith('Impôt sur les plus-values'):
        x['texte'] = 'Taux de 10 % sur les plus-values réalisées à partir du 1er janvier 2026 sur actifs financiers, crypto-actifs compris, avec une exonération annuelle de 10 000 € (jusqu’à 15 000 € par report) ; taux de 33 % pour les plus-values internes ou spéculatives. Pour les participations d’au moins 20 %, le premier million est exonéré, puis 1,25 % jusqu’à 2,5 millions, 2,5 % de 2,5 à 5 millions, 5 % de 5 à 10 millions et 10 % au-delà.'
        x['src'] = [eli('2026-04-06', '2026002780')] + x['src']
        x['ref'] = 'Loi du 6 avril 2026 introduisant un impôt sur les plus-values sur les actifs financiers ; adoptée le 2 avril 2026 ; Moniteur belge du 21 avril 2026 ; effets au 1er janvier 2026'
        x.pop('verif', None); x['v'] = 'officiel'
    if t == 'Réforme des pensions':
        x['texte'] = 'Pour les pensions qui prennent cours à partir du 1er janvier 2027 : malus par année de départ anticipé de 2 % pour les personnes nées de 1961 à 1965, 4 % pour celles nées de 1966 à 1974 et 5 % à partir de 1975, sauf pour qui totalise 35 années d’au moins 156 jours et 7 020 jours de travail ; bonus de même taux par année de report. L’accord prévoyait des taux par période (2 % jusqu’en 2030, 4 % jusqu’en 2040, puis 5 %) : la loi les fixe par année de naissance. Départ à 60 ans après 42 années d’au moins 234 jours ; alignement progressif des pensions des fonctionnaires.'
        x['src'] = [eli('2026-05-30', '2026003854')] + x['src']
        x['ref'] = 'Loi du 30 mai 2026 portant la réforme des pensions (I), Moniteur belge du 1er juin 2026 (2e édition), en vigueur le 1er janvier 2027 ; loi (II) du 18 juin 2026, Moniteur belge du 24 juin 2026 ; votées le 28 mai 2026'
        x.pop('verif', None)
    if t.startswith('Flexi-jobs'):
        x['texte'] = 'Les flexi-jobs sont ouverts à tous les secteurs privés et publics, sauf les fonctions artistiques ; les partenaires sociaux d’un secteur et les entités fédérées peuvent demander de les exclure en tout ou en partie. Entrée en vigueur le 1er juillet 2026.'
        x['src'] = [eli('2026-06-28', '2026005019')] + x['src']
        x['ref'] = 'Loi du 28 juin 2026 portant dispositions diverses concernant les flexi-jobs ; adoptée le 18 juin 2026 ; Moniteur belge du 2 juillet 2026'
        x['verif'] = 'Plafond annuel des revenus exonérés (18 000 € selon l’accord) : absent de cette loi, à rattacher au bon texte.'
        x['v'] = 'officiel'
    if t.startswith('Réforme de l’impôt des personnes physiques'):
        x['src'] = [eli('2026-07-15', '2026005724')] + x['src']
        x['ref'] = 'Loi du 15 juillet 2026 portant réforme de l’impôt des personnes physiques ; adoptée le 9 juillet 2026 ; Moniteur belge du 29 juillet 2026 (la fiche de la Chambre inverse les deux dates)'
        x['texte'] = 'Quotité exemptée d’impôt relevée par paliers de 4 785 € à 6 230 € (montants de base) de 2027 à 2031 ; bonus fiscal à l’emploi pour les bas salaires porté à 970 € (montant de base) ; 240 heures supplémentaires volontaires avantagées.'
        x.pop('verif', None); x['v'] = 'officiel'
for c in dw['accord'].get('chapitres', []):
    c['pts'] = [p.replace('1,25 %, 2,25 %, 5 % et 10 % selon les tranches', '1,25 %, 2,25 %, 5 % et 10 % selon les tranches (la loi du 6 avril 2026 retient finalement 2,5 % pour la deuxième tranche)') for p in c['pts']]
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
