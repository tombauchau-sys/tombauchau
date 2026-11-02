# Gouvernement Di Rupo : accord complet du 1er décembre 2011 (PDF hébergé par la Chambre, déposé par Tom) et mesures (fiches de la Chambre).
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
CH = lambda n: ['Chambre, dossier DOC 53 ' + n, 'https://www.lachambre.be/FLWB/html/53/F/53K' + n + '.html']
def m(date, date_txt, d, titre, texte, src, v='officiel', ref='', verif=''):
    x = {'date': date, 'date_txt': date_txt, 'd': d, 'titre': titre, 'texte': texte, 'src': src, 'v': v}
    if ref: x['ref'] = ref
    if verif: x['verif'] = verif
    return x
g = G['di-rupo']; ac = g['accord']
ac['titre'] = 'Accord de gouvernement'
ac['date'] = '1er décembre 2011'
ac['url'] = 'https://www.lachambre.be/kvvcr/pdf_sections/searchlist/Accord_de_Gouvernement_1er_decembre_2011.pdf'
ac['doc'] = 'texte complet hébergé par la Chambre (177 pages)'
ac.pop('url2', None)
ac['resume'] = [
    '<b>Cinq chantiers</b> : réforme de l’État transférant environ 16,9 milliards d’euros de compétences ; autonomie fiscale des Régions de 10,7 milliards ; nouvelle loi spéciale de financement ; assainissement fédéral d’environ 16 milliards d’ici 2014 ; réformes sociales et économiques face au vieillissement.',
    '<b>Budget</b> : déficit de 2,8 % du PIB dès 2012 et équilibre en 2015 ; effort de 11,3 milliards d’euros en 2012, réparti à environ 42 % sur les dépenses, 34 % sur les recettes et 24 % sur des mesures diverses.',
    '<b>Fiscalité</b> : précompte mobilier harmonisé à 21 % ; cotisation de 4 % sur les revenus mobiliers au-delà de 20 000 € ; intérêts notionnels plafonnés à 3 % ; rente nucléaire relevée de 300 millions ; paiements en espèces limités à 3 000 € au plus tard en 2014 ; quotité exemptée +200 € en 2013.',
    '<b>Chômage</b> : stage d’insertion porté à 310 jours ; allocations d’insertion limitées à trois ans pour une partie des bénéficiaires ; dégressivité renforcée des allocations ; disponibilité exigée jusqu’à 60 ans dès 2013 ; emploi convenable jusqu’à 60 km.',
    '<b>Pensions et fin de carrière</b> : pension anticipée portée à 62 ans en 2016 avec 40 ans de carrière (exceptions pour les carrières longues) ; prépension portée à 60 ans avec 40 ans de carrière ; pension publique calculée sur les dix dernières années ; âge légal maintenu à 65 ans.',
    '<b>Santé</b> : norme de croissance réduite à 2 % en 2013 et 3 % en 2014, plus l’indexation ; suppléments d’honoraires interdits en chambre à deux lits.',
    '<b>Réforme de l’État</b> : scission de Bruxelles-Hal-Vilvorde ; allocations familiales (5,8 milliards), emploi, maisons de repos transférés ; Sénat des entités fédérées dès 2014 ; législature fédérale de cinq ans, élections fédérales le même jour que les européennes.',
    '<b>Énergie, justice, migration</b> : fermeture des centrales nucléaires conformément à la loi de 2003, dates à préciser selon les nouvelles capacités ; arrondissements judiciaires réduits de moitié au moins ; décision d’asile dans les six mois ; Défense ramenée à 32 000 personnes en 2015.',
]
ac['note'] = ''
ac['chapitres'] = [
    {'t': 'Introduction', 'p': '2-3', 'pts': [
        'Déficit à 2,8 % du PIB dès 2012, équilibre en 2015 ; taux d’emploi de 73,2 % en 2020 (67,8 % en 2011 selon l’accord).',
        'Cinq chantiers : transferts de 16,9 milliards, autonomie fiscale de 10,7 milliards, loi de financement, assainissement de 16 milliards d’ici 2014, réformes socio-économiques.']},
    {'t': 'I.1 Renouveau politique', 'p': '11-17', 'pts': [
        'Rémunération des ministres −5 % ; dotations des Chambres, des cabinets et royales gelées deux ans.',
        'Sénat transformé en 2014 en Sénat des entités fédérées (50 élus indirects et 10 cooptés) ; législature fédérale de cinq ans et élections le même jour que les européennes.']},
    {'t': 'I.2 Bruxelles-Hal-Vilvorde et Bruxelles', 'p': '18-32', 'pts': [
        'Scission de la circonscription électorale de BHV ; les six communes à facilités forment un canton où l’on peut voter pour les listes bruxelloises.',
        'Scission du parquet en Bruxelles et Hal-Vilvorde ; nomination des bourgmestres des communes à facilités soumise au Conseil d’État ; communauté métropolitaine autour de Bruxelles.']},
    {'t': 'I.3 Transferts de compétences', 'p': '33-59', 'pts': [
        'Emploi (titres-services, réductions de cotisations groupes cibles, contrôle de la disponibilité des chômeurs), soins aux personnes âgées et maisons de repos, allocations familiales, maisons de justice, sécurité routière.',
        'Total des transferts : 16,898 milliards d’euros (marché du travail 4,3 ; allocations familiales 5,9 ; soins de santé 4,2 ; dépenses fiscales 1,9).']},
    {'t': 'I.4 Loi spéciale de financement', 'p': '60-73', 'pts': [
        'Autonomie fiscale des Régions de 10,736 milliards d’euros par des additionnels à l’impôt des personnes physiques ; mécanisme de solidarité ; transition sans entité gagnante ni perdante, puis réduction sur dix ans.',
        'Refinancement de Bruxelles de 461 millions d’euros d’ici 2015 ; responsabilisation des entités pour les pensions de leurs fonctionnaires et pour le climat.']},
    {'t': 'II.1 Assainissement des finances publiques', 'p': '76-84', 'pts': [
        'Effort de 11,3 milliards en 2012 : dépenses (environ 42 %, dont Défense ramenée à 30 000 militaires en 2015, coopération gelée, titres-services à 8,5 €), recettes (environ 34 %), mesures diverses (environ 24 %).',
        'Précompte mobilier harmonisé à 21 % ; cotisation de 4 % au-delà de 20 000 € de revenus mobiliers ; intérêts notionnels plafonnés à 3 % ; avantage des voitures de société calculé selon le CO2 ; TVA de 21 % pour notaires et huissiers.',
        'Contribution bancaire de stabilité financière ; rente nucléaire +300 millions ; paiements en espèces de 15 000 € à 3 000 € au plus tard en 2014.']},
    {'t': 'II.2.1 Marché du travail', 'p': '85-102', 'pts': [
        'Stage d’insertion de 310 jours ; allocations d’insertion limitées à trois ans pour une partie des bénéficiaires (sauf 156 jours de travail) ; dégressivité renforcée : troisième période forfaitaire ; exemptions à partir de 55 ans ou de 20 ans de carrière (25 ans en 2017).',
        'Disponibilité des chômeurs jusqu’à 60 ans dès 2013 ; emploi convenable de 25 à 60 km ; prépension à 60 ans avec 40 ans de carrière ; crédit-temps sans motif limité à un an.',
        'Statut unique ouvriers-employés à l’échéance fixée par la Cour constitutionnelle (8 juillet 2013) ; lutte contre la fraude sociale.']},
    {'t': 'II.2.2 Pensions', 'p': '102-106', 'pts': [
        'Pension anticipée : âge relevé de six mois par an pour atteindre 62 ans en 2016, carrière de 40 ans en 2015 ; exceptions à 60 ans avec 42 ans et 61 ans avec 41 ans de carrière.',
        'Pension publique calculée sur les dix dernières années ; tantièmes des régimes spéciaux ramenés à 1/48 ; pension de survie remplacée par une allocation de transition pour les plus jeunes.']},
    {'t': 'II.2.3-2.5 Santé, pouvoir d’achat, entreprises', 'p': '106-122', 'pts': [
        'Norme de croissance de la santé : 2 % en 2013, 3 % en 2014, plus l’indice ; génériques et alignement des prix des médicaments sur les pays voisins ; suppléments d’honoraires interdits en chambre à deux lits.',
        'Indexation automatique maintenue ; quotité exemptée +200 € à partir de 2013 ; ratio de fonds propres bancaires de 9 % ; charges administratives −30 % ; recherche à 3 % du PIB.']},
    {'t': 'II.2.6-2.8 Climat, énergie, migration, justice', 'p': '123-146', 'pts': [
        'Fermeture des centrales nucléaires conformément à la loi de 2003, dates définitives à préciser selon les nouvelles capacités ; plan d’équipement dans les six mois ; prix de l’énergie ramenés à la moyenne des pays voisins.',
        'Asile : réponse définitive dans les six mois ; aide matérielle exclusive ; familles avec enfants en principe pas détenues ; regroupement familial contrôlé pendant trois ans.',
        'Justice : arrondissements judiciaires réduits de moitié au moins ; tribunal de la famille ; libération conditionnelle plus tardive pour les crimes les plus graves ; justice et police exclues de l’assainissement.']},
    {'t': 'II.3 Autres politiques', 'p': '147-172', 'pts': [
        'Allocations familiales (5,8 milliards) communautarisées ; objectif de 380 000 personnes sorties de la pauvreté d’ici 2020 ; allocations les plus basses relevées vers le seuil de pauvreté selon les marges budgétaires.',
        'Défense : 32 000 personnes en 2015, retrait d’Afghanistan au plus tard en 2014 ; coopération au développement gelée en 2012 et 2013, objectif de 0,7 % du RNB maintenu.']},
]
ac['lecture'] = 'Résumé établi sur le texte intégral de l’accord (177 pages), hébergé par la Chambre ; la déclaration gouvernementale du 7 décembre 2011 figure au DOC 53 0020/001.'
g['contexte'] = [
    {'date': '2010-2011', 'texte': 'Le gouvernement est formé 541 jours après les élections du 13 juin 2010, en pleine crise de la dette dans la zone euro.'},
    {'date': '2012-2013', 'texte': 'Effort budgétaire de 11,3 milliards d’euros en 2012, en application des engagements européens de la Belgique.'},
]
g['mesures'] = [
    m('2011-12-30', 'Décembre 2011', 'social', 'Pension anticipée retardée',
      'Âge et carrière relevés progressivement : 60 ans et 35 ans de carrière en 2012, puis 62 ans et 40 ans en 2016, avec des exceptions pour les carrières longues (60 ans avec 42 ans, 61 ans avec 41 ans). Une loi de juillet 2012 aménage la transition.',
      [CH('1952'), CH('2264')], ref='Loi du 28 décembre 2011 portant des dispositions diverses (Moniteur belge du 30 décembre 2011) ; loi du 20 juillet 2012 (Moniteur belge du 14 août 2012)',
      verif='Calendrier relevé dans une source juridique secondaire : à confirmer auprès du Service fédéral des Pensions.'),
    m('2011-12-30', 'Décembre 2011', 'eco', 'Précompte mobilier à 21 % et cotisation de 4 %',
      'Précompte mobilier sur les dividendes et intérêts porté de 15 % à 21 % au 1er janvier 2012, cotisation supplémentaire de 4 % au-delà d’environ 20 000 € de revenus mobiliers ; taux des intérêts notionnels plafonné à 3 % ; avantage des voitures de société calculé selon le CO2.',
      [CH('1952')], ref='Loi du 28 décembre 2011 portant des dispositions diverses ; Moniteur belge du 30 décembre 2011'),
    m('2011-12-30', 'Décembre 2011', 'eco', 'Contribution de stabilité financière des banques',
      'Nouvelle contribution annuelle des établissements de crédit, à côté de la cotisation au fonds de protection des dépôts.',
      [CH('1954')], ref='Loi du 28 décembre 2011 instaurant une contribution de stabilité financière ; Moniteur belge du 30 décembre 2011',
      verif='Taux à lire dans le texte de la loi.'),
    m('2011-12-30', 'Janvier 2012', 'social', 'Allocations d’insertion limitées à trois ans',
      'Le droit aux allocations d’insertion (après les études) est limité à trois ans, compté à partir du 1er janvier 2012, d’où les premières fins de droit le 1er janvier 2015 ; prolongation possible avec 156 jours de travail. L’ONEM estimait à environ 27 300 le nombre de personnes qui perdraient ce droit.',
      [['ONEM, la réforme des allocations d’insertion', 'https://www.onem.be/espace-presse/la-reforme-du-systeme-des-allocations-dinsertion'], ['ULB, Dégressivité et standstill (étude)', 'https://droit-public.ulb.ac.be/wp-content/uploads/2013/12/D%C3%A9gressivit%C3%A9-et-standstill.pdf']],
      ref='Arrêté royal du 28 décembre 2011 modifiant l’arrêté royal du 25 novembre 1991 ; Moniteur belge du 30 décembre 2011'),
    m('2012-02-17', 'Janvier 2012', 'social', 'Accueil des demandeurs d’asile restreint',
      'L’accueil est limité en cas de demandes multiples et un trajet de retour est instauré ; une loi du même jour introduit la notion de « pays d’origine sûr ».',
      [['EMN Belgium', 'https://emnbelgium.be/news/law-modifying-asylum-seekers-reception-act-published']], v='reference',
      ref='Loi du 19 janvier 2012 ; Moniteur belge du 17 février 2012', verif='Dossier de la Chambre à identifier.'),
    m('2012-08-22', 'Juillet 2012', 'eco', 'Scission de Bruxelles-Hal-Vilvorde',
      'Première phase de la sixième réforme de l’État : scission de la circonscription électorale et de l’arrondissement judiciaire de Bruxelles-Hal-Vilvorde, nomination des bourgmestres des communes à facilités, renouveau politique.',
      [['Sénat, Moniteur belge du 22 août 2012 (fac-similé)', 'https://www.senaat.be/actueel/homepage/Staatshervorming/Moniteur_%20du_22-08-2012.pdf'], CH('2283')],
      ref='Lois spéciales et ordinaires du 19 juillet 2012 ; Moniteur belge du 22 août 2012'),
    m('2012-07-30', 'Novembre 2012', 'social', 'Dégressivité renforcée des allocations de chômage',
      'À partir du 1er novembre 2012 : 65 % du salaire les trois premiers mois puis 60 %, baisse par paliers ensuite, et forfait en troisième période (953,16 € par mois pour un isolé au 1er septembre 2013) ; pas de dégressivité à partir de 55 ans ni avec 20 ans de passé professionnel (25 ans d’ici 2017).',
      [['ULB, Dégressivité et standstill (étude)', 'https://droit-public.ulb.ac.be/wp-content/uploads/2013/12/D%C3%A9gressivit%C3%A9-et-standstill.pdf']], v='reference',
      ref='Arrêté royal du 23 juillet 2012 ; Moniteur belge du 30 juillet 2012', verif='Montants à confirmer sur le site de l’ONEM.'),
    m('2012-12-27', 'Décembre 2012', 'eco', 'Précompte mobilier unifié à 25 %',
      'Le précompte mobilier passe de 21 % à 25 % et redevient libératoire ; la cotisation de 4 % est supprimée ; taxe de 0,412 % sur les plus-values d’actions des grandes sociétés.',
      [], v='a-verifier', ref='Loi-programme du 27 décembre 2012',
      verif='Sources secondaires seulement ; date du Moniteur et dossier de la Chambre non trouvés.'),
    m('2013-05-02', 'Avril 2013', 'social', 'Norme salariale de 0 % pour 2013-2014',
      'Hors indexation et augmentations barémiques, les salaires ne peuvent pas augmenter en 2013 et 2014.',
      [['Cour constitutionnelle, arrêt 152/2016', 'https://fr.const-court.be/public/f/2016/2016-152f.pdf']], v='reference',
      ref='Arrêté royal du 28 avril 2013 ; Moniteur belge du 2 mai 2013'),
    m('2013-08-01', 'Juillet 2013', 'eco', '« Fairness tax » et TVA sur les avocats',
      'Taxe de 5,15 % sur les dividendes des sociétés qui paient peu d’impôt grâce aux intérêts notionnels ou aux pertes reportées ; TVA de 21 % sur les honoraires d’avocat dès le 1er janvier 2014. La Cour constitutionnelle annule en partie la fairness tax en 2018 et valide la TVA sur les avocats, sous réserve, en 2017.',
      [CH('2891'), ['Cour constitutionnelle, arrêt 24/2018', 'https://fr.const-court.be/public/f/2018/2018-024f.pdf'], ['Cour constitutionnelle, arrêt 27/2017', 'https://www.const-court.be/public/f/2017/2017-027f-info.pdf']],
      ref='Loi du 30 juillet 2013 portant des dispositions diverses ; Moniteur belge du 1er août 2013'),
    m('2013-12-24', 'Décembre 2013', 'eco', 'Prolongation de Tihange 1',
      'Tihange 1 peut fonctionner 50 ans au lieu de 40 ; la loi modifie aussi le régime des provisions nucléaires.',
      [CH('3087')], ref='Loi du 18 décembre 2013 ; Moniteur belge du 24 décembre 2013'),
    m('2013-12-31', 'Décembre 2013', 'social', 'Statut unique ouvriers-employés',
      'Délais de préavis harmonisés entre ouvriers et employés et suppression du jour de carence, comme l’exigeait la Cour constitutionnelle. En 2015, la Cour annule le régime plus court prévu pour la construction.',
      [CH('3144'), ['Cour constitutionnelle, arrêt 116/2015', 'https://www.const-court.be/public/d/2015/2015-116d.pdf']],
      ref='Loi du 26 décembre 2013 ; Moniteur belge du 31 décembre 2013'),
    m('2014-01-31', 'Janvier 2014', 'eco', 'Sixième réforme de l’État',
      'Transferts de compétences aux Régions et Communautés (allocations familiales, emploi, soins aux personnes âgées…), nouvelle loi spéciale de financement avec autonomie fiscale accrue des Régions, réforme du Sénat.',
      [CH('3201'), CH('3202'), CH('3200')], ref='Lois spéciales et ordinaires du 6 janvier 2014 ; Moniteur belge du 31 janvier 2014'),
    m('2014-05-22', 'Avril-mai 2014', 'eco', 'Pacte de compétitivité, d’emploi et de relance',
      'Baisse des cotisations patronales (450 millions d’euros en 2015, 900 en 2017, 1 350 en 2019), dispense de précompte professionnel pour le travail en équipe ou de nuit, bonus à l’emploi renforcé ; TVA sur l’électricité des ménages ramenée de 21 % à 6 % au 1er avril 2014.',
      [CH('3479'), ['Chambre, exposé des motifs (DOC 53 3479/001)', 'https://www.lachambre.be/FLWB/PDF/53/3479/53K3479001.pdf']],
      ref='Loi du 15 mai 2014 ; adoptée le 22 avril 2014 ; Moniteur belge du 22 mai 2014'),
]
g['bilan'] = {'debut': 2011, 'fin': 2014, 'lignes': [
    ['Taux d’emploi des 20-64 ans', '67,3 %', '67,3 %', '__EMPLOI__#f-emploi'],
    ['Dette publique (% du PIB)', '102,8 %', '106,6 %', '__FINANCES__#f-dette'],
    ['Solde public (% du PIB)', '−4,4 %', '−3,2 %', '__FINANCES__#f-deficit']],
    'note': 'Chiffres actuels d’Eurostat : l’accord citait 67,8 % d’emploi pour 2011, une donnée de l’époque révisée depuis. Ces chiffres décrivent la situation sans mesurer l’effet du gouvernement. Sources : Eurostat (lfsi_emp_a, gov_10dd_edpt1).'}
g['complet'] = True
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(g['mesures']))
