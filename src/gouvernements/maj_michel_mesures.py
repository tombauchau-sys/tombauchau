# Mesures du gouvernement Michel I (fiches de la Chambre ouvertes le 2 novembre 2026) et lien vers l'accord Di Rupo complet.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'gouvernements.json'
M = json.loads(F.read_text(encoding='utf-8'))
G = {g['id']: g for g in M['gouvernements']}
CH = lambda n: ['Chambre, dossier DOC 54 ' + n, 'https://www.lachambre.be/FLWB/html/54/F/54K' + n + '.html']
def m(date, date_txt, d, titre, texte, src, v='officiel', ref='', verif=''):
    x = {'date': date, 'date_txt': date_txt, 'd': d, 'titre': titre, 'texte': texte, 'src': src, 'v': v}
    if ref: x['ref'] = ref
    if verif: x['verif'] = verif
    return x
mi = G['michel-1']
mi['mesures'] = [
    m('2014-12-29', 'Décembre 2014', 'social', 'Norme de croissance des soins de santé à 1,5 %',
      'La croissance réelle autorisée du budget des soins de santé est fixée à 1,5 % par an à partir de 2016 ; le budget 2015 est fixé à 23,8 milliards d’euros.',
      [], v='a-verifier',
      ref='Loi-programme du 19 décembre 2014, art. 142 ; Moniteur belge du 29 décembre 2014',
      verif='Source : document de l’INAMI sur l’évolution de la législation budgétaire (bi2015_1_legislation_evolution.pdf), adresse exacte à retrouver ; dossier de la Chambre non identifié.'),
    m('2015-04-27', 'Avril 2015', 'social', 'Saut d’index',
      'L’indice santé lissé est bloqué à partir de mars 2015 puis multiplié par 0,98 : salaires, traitements et allocations sociales perdent durablement une indexation de 2 %. Le gouvernement prévoyait des mesures d’accompagnement pour les plus bas revenus.',
      [CH('0960'), ['Chambre, exposé des motifs (DOC 54 0960/001)', 'https://www.lachambre.be/FLWB/PDF/54/0960/54K0960001.pdf']],
      ref='Loi du 23 avril 2015 concernant la promotion de l’emploi ; adoptée le 22 avril 2015 ; Moniteur belge du 27 avril 2015'),
    m('2015-07-06', 'Juin 2015', 'eco', 'Prolongation de Doel 1 et Doel 2',
      'La loi modifie celle de 2003 sur la sortie du nucléaire pour reporter l’arrêt des réacteurs Doel 1 et Doel 2, au nom de la sécurité d’approvisionnement. En 2020, la Cour constitutionnelle se prononce sur cette loi après un arrêt de la Cour de justice de l’Union exigeant une évaluation des incidences sur l’environnement.',
      [CH('0967'), ['Cour constitutionnelle, arrêt 34/2020', 'https://fr.const-court.be/public/f/2020/2020-034f.pdf']],
      ref='Loi du 28 juin 2015 ; adoptée le 18 juin 2015 ; Moniteur belge du 6 juillet 2015',
      verif='Nouvelle date d’arrêt des deux réacteurs et dispositif de l’arrêt 34/2020 (annulation, maintien des effets) à lire dans les textes.'),
    m('2015-08-18', 'Août 2015', 'eco', 'Loi-programme de juillet 2015',
      'Elle contient notamment la « taxe Caïman », qui impose les revenus des constructions juridiques (trusts, fondations) comme s’ils étaient perçus directement.',
      [CH('1125')], ref='Loi-programme du 10 août 2015 ; adoptée le 24 juillet 2015 ; Moniteur belge du 18 août 2015',
      verif='Contenu à confirmer dans le texte de la loi (taxe Caïman, TVA sur l’électricité portée de 6 % à 21 % en septembre 2015).'),
    m('2015-08-21', 'Août 2015', 'social', 'Âge de la pension porté à 66 puis 67 ans',
      'Âge légal de la pension porté à 66 ans en 2025 et à 67 ans en 2030 ; pension anticipée à 63 ans avec 42 ans de carrière à partir de 2019, avec des exceptions pour les carrières longues ; âge minimum de la pension de survie relevé progressivement à 55 ans.',
      [CH('1180')],
      ref='Loi du 10 août 2015 ; adoptée le 23 juillet 2015 ; Moniteur belge du 21 août 2015'),
    m('2015-11-26', 'Décembre 2015', 'social', 'Création des flexi-jobs',
      'Un travailleur occupé au moins aux 4/5 ailleurs peut travailler en complément dans l’horeca avec un « flexi-salaire » exonéré d’impôt et soumis à une cotisation patronale spéciale.',
      [CH('1297')], ref='Loi du 16 novembre 2015 portant des dispositions diverses en matière sociale ; adoptée le 22 octobre 2015 ; Moniteur belge du 26 novembre 2015',
      verif='Taux de la cotisation patronale et date d’entrée en vigueur à lire dans le texte.'),
    m('2015-12-30', 'Décembre 2015', 'eco', '« Tax shift »',
      'Baisse de l’impôt sur les revenus du travail (frais professionnels forfaitaires relevés, tranche d’imposition de 30 % supprimée) et des cotisations patronales, ramenées vers 25 % en 2018 ; financée notamment par la hausse du précompte mobilier de 25 % à 27 % et des accises.',
      [CH('1520')],
      ref='Loi du 26 décembre 2015 relative aux mesures concernant le renforcement de la création d’emplois et du pouvoir d’achat ; adoptée le 18 décembre 2015 ; Moniteur belge du 30 décembre 2015',
      verif='Montants relevés chez des cabinets d’avocats : à contrôler dans le texte de la loi.'),
    m('2017-03-15', 'Mars 2017', 'social', 'Travail « faisable et maniable » (loi Peeters)',
      'Annualisation possible du temps de travail, 100 heures supplémentaires volontaires, objectif de formation, télétravail occasionnel.',
      [CH('2247')], ref='Loi du 5 mars 2017 ; adoptée le 23 février 2017 ; Moniteur belge du 15 mars 2017',
      verif='Contenu relevé dans des sources secondaires : à confirmer dans le texte.'),
    m('2017-03-29', 'Mars 2017', 'social', 'Nouvelle loi sur la norme salariale',
      'Révision de la loi de 1996 : la marge maximale de hausse des salaires tient compte du handicap salarial accumulé depuis 1996 et des écarts passés avec les pays voisins, avec une correction automatique.',
      [CH('2248')], ref='Loi du 19 mars 2017 modifiant la loi du 26 juillet 1996 ; adoptée le 9 mars 2017 ; Moniteur belge du 29 mars 2017',
      verif='Mécanisme à décrire depuis le texte de la loi.'),
    m('2017-12-29', 'Décembre 2017', 'eco', 'Réforme de l’impôt des sociétés',
      'Taux de base de l’impôt des sociétés ramené de 33 % à 29 % en 2018, puis à 25 % en 2020 ; contribution complémentaire de crise réduite puis supprimée ; taux PME de 20 % sur les 100 000 premiers euros.',
      [CH('2864')], ref='Loi du 25 décembre 2017 ; adoptée le 22 décembre 2017 ; Moniteur belge du 29 décembre 2017'),
    m('2018-03-09', 'Mars 2018', 'eco', 'Première taxe sur les comptes-titres',
      '0,15 % sur la valeur moyenne des comptes-titres au-delà de 500 000 € par titulaire. La Cour constitutionnelle l’annule en octobre 2019 pour atteinte à l’égalité.',
      [CH('2837'), ['Cour constitutionnelle, arrêt 138/2019', 'https://www.const-court.be/public/f/2019/2019-138f.pdf']],
      ref='Loi du 7 février 2018 ; adoptée le 1er février 2018 ; Moniteur belge du 9 mars 2018'),
    m('2018-07-26', 'Juillet 2018', 'social', 'Revenus complémentaires exonérés (« travail associatif »)',
      'Jusqu’à 6 000 € par an exonérés d’impôt et de cotisations pour le travail associatif, les services occasionnels entre citoyens et l’économie collaborative. La Cour constitutionnelle annule ce régime en avril 2020.',
      [CH('2839'), ['Cour constitutionnelle, arrêt 53/2020', 'https://fr.const-court.be/public/f/2020/2020-053f.pdf']],
      ref='Loi du 18 juillet 2018 relative à la relance économique et au renforcement de la cohésion sociale ; adoptée le 5 juillet 2018 ; Moniteur belge du 26 juillet 2018',
      verif='Adresse de l’arrêt 53/2020 construite sur le modèle des autres arrêts : à ouvrir.'),
]
mi['bilan'] = {'debut': 2014, 'fin': 2018, 'lignes': [
    ['Taux d’emploi des 20-64 ans', '67,3 %', '69,7 %', '__EMPLOI__#f-emploi'],
    ['Dette publique (% du PIB)', '106,6 %', '100,2 %', '__FINANCES__#f-dette'],
    ['Solde public (% du PIB)', '−3,2 %', '−0,8 %', '__FINANCES__#f-deficit']],
    'note': 'Ces chiffres décrivent la situation, ils ne mesurent pas l’effet du gouvernement : ils dépendent aussi de la conjoncture européenne et des autres niveaux de pouvoir. Sources : Eurostat (lfsi_emp_a, gov_10dd_edpt1).'}
mi['complet'] = True
dr = G['di-rupo']['accord']
dr['url2'] = 'https://www.lachambre.be/kvvcr/pdf_sections/searchlist/Accord_de_Gouvernement_1er_decembre_2011.pdf'
dr['note'] = 'Résumé établi sur la déclaration du 7 décembre 2011. Le texte complet de l’accord (1er décembre 2011, environ 175 pages) est hébergé par la Chambre : sa lecture intégrale est la prochaine étape.'
F.write_text(json.dumps(M, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('ok', len(mi['mesures']))
