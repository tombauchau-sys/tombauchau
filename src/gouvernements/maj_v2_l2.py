# « Annoncé et réalisé » pour Verhofstadt II (déclaration du 14 juillet 2003) et Leterme II (déclaration du 25 novembre 2009,
# PDF déposé par Tom le 3 novembre 2026, archives du CRISP ; texte officiel au compte rendu CRIV 52 PLEN 122).
# Recherches du 3 novembre 2026 : sources officielles ouvertes, phrases recopiées.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
R = F.resolve().parents[1] / 'dossiers'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
FIN = json.loads((R / 'finances-data.json').read_text(encoding='utf-8'))
EMP = json.loads((R / 'emploi-data.json').read_text(encoding='utf-8'))['emp']['BE']
DEF, DEBT = FIN['defL']['BE'], FIN['debtL']['BE']
def pc(x): return (f'{x:.1f}'.replace('.', ',').replace('-', '−')) + ' %'
def d(y): return pc(DEF[y - 1980])
DK = lambda leg, n: [f'Chambre, dossier DOC {leg} {n}', f'https://www.dekamer.be/FLWB/html/{leg}/F/{leg}K{n}.html']
NB = lambda node, lab: [lab, f'https://news.belgium.be/fr/node/{node}/pdf']
EU_DEF = ['Eurostat, déficit public (gov_10dd_edpt1)', 'https://ec.europa.eu/eurostat/databrowser/view/gov_10dd_edpt1/default/table?lang=fr']
MDG = ['SPF Affaires étrangères, rapport au Parlement sur les Objectifs du Millénaire 2008', 'https://www.dekamer.be/kvvcr/pdf_sections/comm/committee/mdg2008_fr.pdf']
def it(statut, eng, p, constat, mesure='', src=None, ctx=''):
    x = {'statut': statut, 'eng': eng, 'p': p, 'constat': constat}
    if mesure: x['mesure'] = mesure
    if src: x['src'] = src
    if ctx: x['ctx'] = ctx
    return x
def check(g, items):
    t = {m['titre'] for m in g['mesures']}
    for x in items:
        if x.get('mesure'): assert x['mesure'] in t, x['mesure']

# ---------------- Verhofstadt II ----------------
g = G['verhofstadt-2']
m = next(m for m in g['mesures'] if m['titre'] == 'SNCB scindée, dette reprise par l’État')
m.update({'titre': 'SNCB scindée, dette transférée', 'texte': 'Le groupe SNCB devient trois sociétés anonymes de droit public (SNCB-Holding, Infrabel, SNCB). Au 1er janvier 2005, 7,4 milliards d’euros de dettes sont transférés au Fonds de l’infrastructure ferroviaire, un fonds public ; leur reprise formelle par l’État n’est décidée qu’en juillet 2008.',
          'src': [['Chambre, note de politique générale (DOC 51 1371/027)', 'https://www.dekamer.be/FLWB/PDF/51/1371/51K1371027.pdf'],
                  NB('2191', 'Conseil des ministres du 28 janvier 2005'), NB('10086', 'Conseil des ministres du 25 juillet 2008'),
                  ['Infrabel, rapport annuel 2005', 'https://infrabel.be/sites/default/files/generated/files/report/rapport_annuel_infrabel_2005.pdf']]})
m.pop('verif', None)
items = [
    it('chiffre', 'Équilibre budgétaire en 2004 et 2005, puis excédent de 0,3 % du PIB en 2007.', '85-86',
       f'Selon les chiffres actuels d’Eurostat : {d(2004)} en 2004, {d(2005)} en 2005, {d(2007)} en 2007. L’équilibre est approché en 2004 et 2007 ; 2005 s’en écarte.', src=[EU_DEF]),
    it('chiffre', 'Ramener la dette publique sous 90 % du PIB fin 2007.', '85-86',
       f'Objectif atteint selon les chiffres actuels d’Eurostat : {pc(DEBT[2007-1980])} du PIB en 2007 ({pc(DEBT[2003-1980])} en 2003).', src=[['Dossier Finances publiques', '__FINANCES__#f-dette']]),
    it('chiffre', 'Créer 200 000 nouveaux emplois au cours de la législature.', '6',
       f'Le nombre d’emplois créés n’est pas mesuré ici. Taux d’emploi des 20-64 ans : {pc(EMP[2003-1999])} en 2003, {pc(EMP[2007-1999])} en 2007 (Eurostat ; série rompue en 2005).', src=[['Dossier Emploi', '__EMPLOI__#f-emploi']]),
    it('chiffre', 'Augmenter systématiquement l’aide au développement pour atteindre 0,7 % du RNB en 2010.', '78',
       'Échéance postérieure au mandat. Aide publique au développement : 0,60 % du RNB en 2003, 0,41 % en 2004, 0,53 % en 2005, 0,50 % en 2006, 0,43 % en 2007.', src=[MDG]),
    it('adopte', 'Créer 25 000 emplois de proximité grâce aux titres-services.', '6-12',
       'Objectif fixé à « 25.000 emplois supplémentaires pour la fin de 2005 » ; en 2007, 87 152 personnes ont travaillé dans les titres-services (nombre de travailleurs sur l’année, pas d’équivalents temps plein).',
       src=[NB('740', 'Conseil des ministres du 19 décembre 2003'), ['Chambre, note de politique générale Emploi (DOC 52 0995/017)', 'https://www.dekamer.be/FLWB/Pdf/52/0995/52K0995017.pdf']]),
    it('partiel', 'Réduire les charges sur le travail de 800 millions d’euros par an.', '7',
       'Réductions de cotisations décidées dans la loi-programme du 22 décembre 2003 (réduction structurelle portée à 400 € dès 2004, travail de nuit, hauts salaires), mais aucune source officielle ne chiffre un total de 800 millions par an.',
       src=[DK('51', '0473'), NB('742', 'Conseil des ministres du 19 décembre 2003')]),
    it('adopte', 'Activer le comportement de recherche d’emploi des chômeurs.', '10-11',
       'Accord de coopération du 30 avril 2004, appliqué par phases de 2004 à 2006.', mesure='Activation du comportement de recherche d’emploi'),
    it('partiel', 'Limiter à trois jours le traitement administratif du lancement d’une entreprise, d’ici juillet 2005.', '14',
       'Annoncé comme réalisé en juin 2006 : « Voortaan is het mogelijk om een bedrijf op te richten in slechts 3 dagen » ; environ un an de retard.',
       src=[['Conseil des ministres, conférence de presse du 19 juin 2006', 'https://news.belgium.be/nl/node/3338/pdf']]),
    it('adopte', 'Organiser une régularisation fiscale unique.', '15',
       'Déclaration libératoire unique (loi du 31 décembre 2003).', mesure='Déclaration libératoire unique (amnistie fiscale)'),
    it('partiel', 'Reprendre 7,4 milliards d’euros de dettes de la SNCB avant fin 2005.', '20',
       'Dettes transférées au 1er janvier 2005 à un fonds public, le Fonds de l’infrastructure ferroviaire ; reprise formelle par l’État décidée seulement en 2008.', mesure='SNCB scindée, dette transférée'),
    it('adopte', 'Porter le Fonds de vieillissement à 10 milliards d’euros en 2007.', '21, 30',
       'Fin 2007, 13 124 millions d’euros ont été mis à la disposition du Fonds (en valeur nominale), surtout grâce à des recettes ponctuelles (fonds de pension de Belgacom en 2004). Le Fonds est placé en titres de la dette publique.',
       src=[['SPF Finances, rapport annuel 2010 du Fonds de vieillissement', 'https://www.2012.rapportannuel.finances.belgium.be/sites/5046.fedimbo.belgium.be/files/zilverfonds_2010_fr.pdf']]),
    it('adopte', 'Programmer la liaison de certaines allocations au bien-être.', '23',
       'Mécanisme biennal inscrit dans le Pacte de solidarité entre les générations (2005).', mesure='Liaison des allocations au bien-être'),
    it('adopte', 'Augmenter les dépenses de santé de 4,5 % par an en termes réels pendant quatre ans.', '24',
       'Appliqué dans les budgets : « les dépenses en soins de santé bénéficieront d’une norme de croissance de 4,5% par an (hors inflation) ». Le texte de loi fixant la norme n’a pas été retrouvé.',
       src=[['Chambre, note de politique générale Affaires sociales (DOC 51 1371/031)', 'https://www.dekamer.be/FLWB/Pdf/51/1371/51K1371031.pdf']]),
    it('adopte', 'Étendre le maximum à facturer aux enfants jusqu’à 18 ans.', '23-30',
       'Depuis le 1er janvier 2004, par arrêté royal.', src=[NB('745', 'Conseil des ministres du 19 décembre 2003'), NB('842', 'Conseil des ministres du 30 janvier 2004')]),
    it('partiel', 'Étendre la surveillance électronique à au moins 1 000 personnes.', '57',
       'Capacité portée de 300 à 450 en 2004 ; début 2008, le matériel couvre encore « un 600-tal » de condamnés, selon le ministre de la Justice.',
       src=[NB('1177', 'Conseil des ministres du 5 avril 2004'), ['Chambre, commission Justice du 26 février 2008', 'https://www.dekamer.be/doc/CCRI/pdf/52/ic120x.pdf']]),
    it('partiel', 'Généraliser la carte d’identité électronique.', '60',
       'Généralisation lancée en 2004, avec un objectif fin 2007 ; l’achèvement pour tous les Belges est attendu fin 2009, après le mandat.',
       src=[NB('1547', 'Conseil des ministres du 20 juillet 2004'), ['Chambre, rapport d’évaluation (DOC 51 1094/001)', 'https://www.dekamer.be/FLWB/pdf/51/1094/51K1094001.pdf']]),
    it('non', 'Abaisser à 18 ans l’âge d’éligibilité à la Chambre.', '62',
       'Aucune révision de la Constitution pendant le mandat : en 2011, une proposition rappelle encore qu’« il faut être âgé de vingt et un ans accomplis ».',
       src=[['Chambre, DOC 53 1178/001', 'https://www.dekamer.be/FLWB/Pdf/53/1178/53K1178001.pdf']]),
    it('adopte', 'Accorder le droit de vote aux élections communales aux étrangers non européens.', '63',
       'Loi du 19 mars 2004.', src=[DK('51', '0578')]),
    it('adopte', 'Étendre les compétences de la Cour d’arbitrage, qui devient Cour constitutionnelle.', '64',
       'Révision de l’article 142 de la Constitution du 7 mai 2007.', src=[DK('51', '1727')]),
    it('adopte', 'Introduire le divorce sans faute ; examiner au Parlement l’adoption par les couples de même sexe.', '84',
       'Loi du 27 avril 2007 réformant le divorce ; loi du 18 mai 2006 permettant l’adoption par des personnes de même sexe.', src=[DK('51', '2341'), DK('51', '0664')]),
]
check(g, items)
g['compare'] = {
    'intro': 'Le gouvernement Verhofstadt II, libéraux et socialistes sans les écologistes, gouverne quatre ans, de juillet 2003 aux élections de juin 2007. Sa déclaration fixe des objectifs chiffrés d’emploi et de budget, comparés ici aux chiffres actuels.',
    'items': items,
    'hors': [
        ['Intérêts notionnels (2005)', 'déduction pour capital à risque, liée à la fin des centres de coordination ; absente de la déclaration.', 'Intérêts notionnels'],
        ['Pacte de solidarité entre les générations (2005)', 'réforme des fins de carrière ; la déclaration annonçait seulement des projets pilotes pour l’emploi des travailleurs âgés (p. 10).', 'Pacte de solidarité entre les générations'],
    ],
}

# ---------------- Leterme II ----------------
g = G['leterme-2']
CRIV122 = ['Chambre, compte rendu du 25 novembre 2009 (CRIV 52 PLEN 122)', 'https://www.dekamer.be/doc/PCRI/pdf/52/ip122.pdf']
CRIV124 = ['Chambre, compte rendu du 27 novembre 2009 (CRIV 52 PLEN 124)', 'https://www.dekamer.be/doc/PCRI/pdf/52/ip124.pdf']
g['sieges_note'] += ' Confiance votée le 27 novembre 2009 par 82 voix contre 53.'
g['sieges_src'] = g['sieges_src'] + [CRIV124]
ac = g['accord']
ac.update({'titre': 'Pas de nouvel accord : déclaration du gouvernement', 'date': '25 novembre 2009 ; confiance votée le 27 novembre 2009',
           'doc': 'Chambre, compte rendu intégral CRIV 52 PLEN 122', 'url': CRIV122[1],
           'liens': [['Texte de la déclaration (archives du CRISP)', 'https://www.crisp.be/upload/docpol/gouvernements/federal/declarations/DG_Leterme_II_25-11-09.pdf']],
           'k': 'Ce que le gouvernement annonce',
           'resume': [
               '<b>Continuité</b> : « Ce Gouvernement s’inscrit évidemment dans la continuité » ; il veut mettre en œuvre l’accord de gouvernement de 2008 et la déclaration du 13 octobre 2009.',
               '<b>Crise et emploi</b> : protéger l’emploi, la compétitivité et le pouvoir d’achat ; plan PME ; « à politique inchangée », le nombre de demandeurs d’emploi augmenterait de 150 000 en 2009 et 2010.',
               '<b>Budget</b> : déficit limité à 5,6 % du PIB en 2010 ; « un retour à l’équilibre budgétaire en 2015 reste l’objectif ».',
               '<b>Contrôle financier</b> : modèle « twin peaks », la Banque nationale devenant aussi superviseur prudentiel.',
               '<b>Pensions et santé</b> : aboutir à la Conférence nationale des pensions ; soins accessibles « sans augmentation du coût des soins pour les patients ».',
               '<b>Énergie et climat</b> : donner corps aux accords avec le secteur nucléaire ; décision sur le projet de recherche MYRRHA.',
               '<b>Migration</b> : réussir l’opération de régularisation ; réformes de la nationalité, du regroupement familial et de la lutte contre les mariages de complaisance ; nouvelles places d’accueil.',
               '<b>Europe, monde, institutions</b> : présidence de l’Union au second semestre 2010 ; « L’objectif de 0,7 % du RNB sera atteint en 2010 » ; accord sur Bruxelles-Hal-Vilvorde voulu « au printemps 2010 ».',
           ],
           'note': '',
           'lecture': 'Résumé établi sur le texte intégral de la déclaration (8 pages) ; les pages renvoient à ce texte.'})
items = [
    it('chiffre', 'Limiter le déficit à 5,6 % du PIB en 2010.', '3',
       f'Selon les chiffres actuels d’Eurostat, le solde public de 2010 est de {d(2010)} du PIB.', src=[EU_DEF]),
    it('chiffre', 'Revenir à l’équilibre budgétaire en 2015.', '3',
       f'Échéance postérieure au mandat. Solde de 2015 : {d(2015)} du PIB.', src=[EU_DEF]),
    it('chiffre', 'Atteindre en 2010 une aide au développement de 0,7 % du RNB.', '7',
       'Objectif non atteint : « The volume of Belgian ODA in 2010 is equivalent to 0.64% of its GNI, up from 0.55% in 2009. »',
       src=[['OCDE, rapport sur la coopération au développement 2011, Belgique', 'https://oecd-ilibrary.org/development/development-co-operation-report-2011/belgium_dcr-2011-20-en']]),
    it('adopte', 'Prolonger les mesures de crise dans le budget 2010-2011.', '3',
       'Loi du 30 décembre 2009 : mesures prolongées jusqu’au 30 juin 2010 et prime de crise.', mesure='Prolongation des mesures anticrise et prime de crise'),
    it('adopte', 'Réformer le contrôle financier selon le modèle « twin peaks ».', '2',
       'Loi du 2 juillet 2010 ; le nouveau modèle de contrôle entre en vigueur le 1er avril 2011.',
       src=[DK('52', '2408'), ['Conseil des ministres du 25 février 2011', 'https://news.belgium.be/fr/node/12657/pdf'], ['FSMA, organisation', 'https://www.fsma.be/en/organization']]),
    it('adopte', 'Prendre une décision sur le projet de recherche nucléaire MYRRHA.', '6',
       'Le 5 mars 2010, le gouvernement décide de soutenir le projet, avec « une subvention complémentaire de 60 millions d’euros au SCK-CEN sur une durée de cinq ans ».',
       src=[['Conseil des ministres du 5 mars 2010', 'https://news.belgium.be/fr/node/13328/pdf']]),
    it('partiel', 'Réformer le regroupement familial.', '6',
       'Loi du 8 juillet 2011, issue d’une proposition de loi et votée alors que le gouvernement est en affaires courantes.', mesure='Regroupement familial durci'),
    it('abandon', 'Réformer la loi sur la nationalité et renforcer la lutte contre les mariages de complaisance.', '6',
       'Reporté au gouvernement suivant : loi du 4 décembre 2012 sur la nationalité, loi du 2 juin 2013 sur les mariages et cohabitations de complaisance.',
       src=[DK('53', '0476'), DK('53', '2673')]),
    it('non', 'Conclure au printemps 2010 un accord institutionnel, notamment sur Bruxelles-Hal-Vilvorde.', '8',
       'Aucun accord. Fin avril 2010, le gouvernement est démissionnaire et une procédure de « sonnette d’alarme » suspend l’examen des propositions de scission de Bruxelles-Hal-Vilvorde.',
       src=[['Chambre, compte rendu du 29 avril 2010 (CRIV 52 PLEN 151)', 'https://www.dekamer.be/doc/PCRI/pdf/52/ip151.pdf']]),
]
check(g, items)
g['compare'] = {
    'intro': 'Le gouvernement Leterme II reprend la coalition et le programme de Van Rompuy. Démissionnaire dès avril 2010, il gère ensuite les affaires courantes pendant plus d’un an et demi.',
    'items': items,
    'hors': [['TVA à 12 % dans la restauration (2010)', 'absente de la déclaration.', 'TVA à 12 % dans la restauration']],
}
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok')
