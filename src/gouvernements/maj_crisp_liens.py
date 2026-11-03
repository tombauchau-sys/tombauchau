# Liens du CRISP (page « Gouvernements nationaux et fédéraux depuis 1944 », transmise par Tom le 3 novembre 2026) :
# déclaration et composition de chaque gouvernement ; fiches de contextualisation Michel II et Wilmès I.
# Compléments transmis par Tom : résumé Leterme II (texte non relu), audience royale du 6 novembre 2025, numac de la loi-programme 2012.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
B = 'https://www.crisp.be/upload/docpol/gouvernements/federal/'
CR = {
    'verhofstadt-1': ('DG_Verhostadt_I_14-07-99.pdf', 'Verhofstadt_99-03.pdf'),
    'verhofstadt-2': ('DG_Verhofstadt_14-07-03.pdf', 'Verhofstadt_03-07.pdf'),
    'verhofstadt-3': ('DG_Verhofstadt_21-12-07.pdf', 'Verhofstadt_07-08.pdf'),
    'leterme-1': ('DG_Leterme_20-03-08.pdf', 'Leterme_08-08.pdf'),
    'van-rompuy': ('DG_Van_Rompuy_31-12-08.pdf', 'Van_Rompuy_08-09.pdf'),
    'leterme-2': ('DG_Leterme_II_25-11-09.pdf', 'Leterme_09-10.pdf'),
    'di-rupo': ('DG_Di_Rupo_07-12-2011.pdf', 'Di_Rupo_11-14.pdf'),
    'michel-1': ('DG_Michel_14-10-2014.pdf', 'Michel-I-14-18.pdf'),
    'michel-2': ('CTXT_Michel_II_18-12-18.pdf', 'Michel-II-18-18.pdf'),
    'wilmes-1': ('CTXT_Wilmes_27-10-19.pdf', 'Wilmes-I-19-19.pdf'),
    'wilmes-2': ('DG_Wilmes_II_17-03-20.pdf', 'Wilmes-II-20-20.pdf'),
    'de-croo': ('DG_De_Croo_01-10-20.pdf', 'De_Croo-20-24.pdf'),
    'de-wever': ('DG_De_Wever_04-02-25.pdf', 'De_Wever-25-.pdf'),
}
for gid, (dg, comp) in CR.items():
    g = G[gid]
    lab = 'Fiche de contextualisation du CRISP' if dg.startswith('CTXT') else 'Déclaration lue à la Chambre (archives du CRISP)'
    g['accord']['liens'] = [[lab, B + 'declarations/' + dg]]
    g['compo_url'] = B + 'compositions/' + comp

# Fiches de contextualisation : sources avec lien
for gid in ('michel-2', 'wilmes-1'):
    for c in G[gid].get('contexte', []):
        if c.get('srcnote', '').endswith('Michel II'):
            c['src'] = [['CRISP, contextualisation Michel II', B + 'declarations/CTXT_Michel_II_18-12-18.pdf']]
        elif c.get('srcnote'):
            c['src'] = [['CRISP, contextualisation Wilmès', B + 'declarations/CTXT_Wilmes_27-10-19.pdf']]
        c.pop('srcnote', None)
G['michel-2']['accord']['lecture'] = G['michel-2']['accord']['lecture'].replace('D’après la fiche de contextualisation du CRISP', 'D’après la fiche de contextualisation du CRISP (lien ci-dessus)')

# Leterme II : résumé transmis par Tom ; le PDF du CRISP n'a pas pu être lu
ac = G['leterme-2']['accord']
ac['titre'] = 'Pas de nouvel accord : déclaration du gouvernement'
ac['date'] = '25 novembre 2009'
ac['k'] = 'Ce que le gouvernement annonce'
ac['resume'] = [
    'Continuité avec le gouvernement précédent.',
    'Lutte contre la crise : protection de l’emploi et du pouvoir d’achat, soutien à la compétitivité, assainissement des finances publiques.',
    'Réforme du contrôle financier et modernisation des institutions.',
]
ac['note'] = 'Résumé transmis d’après le CRISP : le texte de la déclaration n’a pas encore été relu ici.'

# De Wever : épisode budgétaire de novembre 2025 (distinct de la démission de novembre 2026)
g = G['de-wever']
cx = [c for c in g['contexte'] if not c['date'].startswith('6 novembre 2025')]
cx.insert(0, {'date': '6 novembre 2025', 'texte': 'Faute d’accord sur le budget, le Premier ministre est reçu par le Roi ; au lieu de démissionner, il reporte l’échéance d’un accord budgétaire à Noël.',
              'presse': True,
              'src': [['Belga News Agency', 'https://www.belganewsagency.eu/de-wever-moves-budget-deadline-to-christmas-after-meeting-with-king-philippe']]})
g['contexte'] = cx

# Di Rupo : loi-programme du 27 décembre 2012
for m in G['di-rupo']['mesures']:
    if m.get('ref') == 'Loi-programme du 27 décembre 2012':
        m['ref'] = 'Loi-programme du 27 décembre 2012 ; Moniteur belge du 31 décembre 2012 ; numac 2012021152'
        m['verif'] = 'Références de publication transmises, pas encore relues ; contenu relevé dans des sources secondaires, dossier de la Chambre non trouvé.'

F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
