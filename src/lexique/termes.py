# -*- coding: utf-8 -*-
"""Lexique de Chiffre Juste : source unique des définitions.

Chaque entrée : t (terme), c (rubrique), d (définition), al (autres noms, sigles),
ex (repère chiffré déjà vérifié sur le site), v (où le terme sert sur le site),
s (source de référence pour les textes juridiques).
Rubriques : pol, eur, eco, soc, env, met.
Les repères chiffrés reprennent uniquement des valeurs inscrites au registre de vérification.
"""

L = []


def T(t, c, d, al=None, ex=None, v=None, s=None):
    L.append({'t': t, 'c': c, 'd': d, 'al': al or [], 'ex': ex or '', 'v': v or [], 's': s or []})


EURLEX = 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:'
FIN = ('Finances publiques', '__FINANCES__')
EMP = ('Emploi', '__EMPLOI__')
PEN = ('Pensions', '__PENSIONS__')
IMM = ('Immigration', '__IMMIGRATION__')
JUS = ('Justice', '__JUSTICE__')
SAN = ('Santé', '__SANTE__')
EDU = ('Éducation', '__EDUCATION__')
INE = ('Inégalités', '__INEGALITES__')
CLI = ('Climat et énergie', '__CLIMAT__')
LOG = ('Logement', '__LOGEMENT__')
FICHE = ('Fiche chômage', '__FICHE__')
CMP = ('Comparer', '__COMPARER__')


def at(p, a):
    return (p[0], p[1] + '#' + a)


# ===================== Politique et institutions belges =====================
T('État fédéral', 'pol',
  'Niveau de pouvoir qui exerce, pour toute la Belgique, les compétences qui n’ont pas été confiées aux Communautés et aux Régions : notamment la justice, la défense, les affaires étrangères, la sécurité sociale, la fiscalité principale et la politique de l’emploi au sens du droit du travail.',
  al=['fédéral', 'pouvoir fédéral'], v=[at(FIN, 'f-dette'), at(JUS, 'histoire')])
T('Fédéralisme belge', 'pol',
  'Organisation de la Belgique en un État fédéral composé de Communautés et de Régions, construite par étapes depuis 1970. Les entités fédérées disposent de leurs propres parlements, gouvernements et budgets ; il n’existe pas de hiérarchie entre les lois fédérales et les décrets ou ordonnances des entités fédérées.',
  al=['entités fédérées'], v=[FIN, EDU])
T('Communauté', 'pol',
  'Entité fédérée compétente pour les matières liées aux personnes : enseignement, culture, langue, une partie de la santé et de l’aide aux personnes. Il en existe trois : la Communauté française (appelée Fédération Wallonie-Bruxelles), la Communauté flamande et la Communauté germanophone.',
  al=['Fédération Wallonie-Bruxelles', 'FWB'], v=[at(EDU, 'histoire')])
T('Région', 'pol',
  'Entité fédérée compétente pour les matières liées au territoire : économie, emploi (placement des demandeurs d’emploi), logement, environnement, énergie, mobilité, pouvoirs locaux. Il en existe trois : la Région wallonne, la Région flamande et la Région de Bruxelles-Capitale. En Flandre, la Communauté et la Région partagent un seul parlement et un seul gouvernement.',
  al=['Wallonie', 'Flandre', 'Bruxelles-Capitale'], v=[LOG, EMP])
T('Réformes de l’État', 'pol',
  'Révisions successives de la Constitution et des lois spéciales qui ont transformé la Belgique unitaire en État fédéral : 1970, 1980, 1988-1989, 1993 (la Belgique devient officiellement fédérale), 2001 et 2012-2014. La sixième réforme a notamment transféré aux Régions et aux Communautés les allocations familiales et une partie des politiques de l’emploi et de la santé.',
  al=['réforme de l’État', 'sixième réforme de l’État'], v=[EMP, LOG])
T('Loi spéciale', 'pol',
  'Loi fédérale qui, parce qu’elle touche à l’organisation de l’État, doit être adoptée à une majorité renforcée : la majorité dans chaque groupe linguistique de la Chambre et du Sénat, et les deux tiers des voix au total. La loi spéciale de financement du 16 janvier 1989 fixe ainsi les moyens des Communautés et des Régions.',
  al=['majorité spéciale', 'loi spéciale de financement'])
T('Chambre des représentants', 'pol',
  'Assemblée de 150 députés élus directement, qui vote les lois fédérales, le budget fédéral et contrôle le gouvernement fédéral (vote de confiance ou de méfiance).',
  al=['Chambre', 'Parlement fédéral'], v=[CLI])
T('Sénat', 'pol',
  'Seconde assemblée fédérale. Depuis la sixième réforme de l’État (2014), elle compte 60 membres, pour la plupart désignés par les parlements des entités fédérées, et n’intervient plus que dans certaines matières, comme les révisions de la Constitution et les lois spéciales.')
T('Gouvernement fédéral', 'pol',
  'Pouvoir exécutif de l’État fédéral, composé du Premier ministre et des ministres (paritaire entre francophones et néerlandophones, Premier ministre éventuellement excepté). Il est issu d’une coalition et repose sur un accord de gouvernement.',
  al=['accord de gouvernement', 'coalition'], v=[FIN, EDU])
T('Cour constitutionnelle', 'pol',
  'Juridiction qui contrôle si les lois, décrets et ordonnances respectent la répartition des compétences entre l’État fédéral, les Communautés et les Régions, ainsi que les droits fondamentaux garantis par la Constitution. Elle s’appelait Cour d’arbitrage jusqu’en 2007.')
T('Conseil d’État', 'pol',
  'Haute juridiction administrative : elle peut annuler les actes des autorités administratives et donne des avis juridiques sur les projets de lois, décrets et arrêtés.')
T('Pouvoirs locaux', 'pol',
  'Communes et provinces, placées sous la tutelle des Régions. Elles gèrent notamment la police locale, l’état civil, une partie de l’enseignement, les CPAS (centres publics d’action sociale) et l’aménagement local.',
  al=['communes', 'provinces', 'CPAS'], v=[at(FIN, 'f-dette')])
T('Sécurité sociale', 'pol',
  'Ensemble des régimes qui protègent contre les risques de la vie (maladie, invalidité, chômage, vieillesse, accidents du travail, charges de famille), financés par les cotisations des travailleurs et des employeurs et par une intervention de l’État. Elle est gérée avec les partenaires sociaux.',
  al=['ONSS'], v=[PEN, EMP, SAN])
T('Partenaires sociaux', 'pol',
  'Organisations représentatives des travailleurs (syndicats) et des employeurs, qui négocient les salaires et les conditions de travail et participent à la gestion de la sécurité sociale.',
  al=['syndicats', 'organisations patronales'])
T('Concertation sociale', 'pol',
  'Négociation entre partenaires sociaux, avec ou sans le gouvernement, au niveau interprofessionnel (Groupe des Dix, Conseil national du travail), des secteurs (commissions paritaires) et des entreprises. Elle aboutit notamment à des conventions collectives de travail (CCT).',
  al=['CCT', 'convention collective de travail', 'Groupe des Dix'], v=[EMP])
T('Indexation automatique', 'pol',
  'Mécanisme belge qui adapte les salaires, les allocations sociales et les pensions à l’évolution des prix, mesurée par l’indice santé. Il protège le pouvoir d’achat mais rend les coûts salariaux plus sensibles à l’inflation.',
  al=['indexation', 'indice santé'])
T('Indice santé', 'pol',
  'Indice des prix à la consommation calculé par Statbel dont sont exclus le tabac, les boissons alcoolisées, l’essence et le diesel. Créé en 1994, il sert de base à l’indexation des salaires, des allocations et des loyers.',
  al=['indice-santé'])
T('Norme salariale', 'pol',
  'Marge maximale d’augmentation des salaires, au-delà de l’indexation, fixée tous les deux ans en application de la loi du 26 juillet 1996 relative à la compétitivité, afin de limiter l’écart avec l’évolution salariale des pays voisins.',
  al=['loi de 1996'])
T('Statbel', 'pol',
  'Office belge de statistique (Direction générale Statistique du SPF Économie). Il produit notamment l’enquête sur les forces de travail, l’enquête sur les revenus et les conditions de vie, l’indice des prix et les statistiques de population.',
  v=[FICHE, INE])
T('Banque nationale de Belgique', 'pol',
  'Banque centrale belge, membre de l’Eurosystème. Elle établit aussi les comptes nationaux (avec l’Institut des comptes nationaux), les statistiques de la dette publique et des études économiques.',
  al=['BNB'], v=[IMM, FIN])
T('Bureau fédéral du Plan', 'pol',
  'Organisme d’intérêt public qui réalise des prévisions et des analyses économiques, budgétaires, sociales et environnementales pour les autorités belges, notamment les perspectives de moyen terme et les projections du coût du vieillissement.',
  al=['BFP'])
T('Conseil supérieur des Finances', 'pol',
  'Organe consultatif qui formule des avis sur la trajectoire budgétaire des pouvoirs publics belges (section « Besoins de financement des pouvoirs publics ») et sur le coût du vieillissement (Comité d’étude sur le vieillissement).',
  al=['CSF', 'Comité d’étude sur le vieillissement'])
T('ONEM', 'pol',
  'Office national de l’emploi : organisme fédéral qui fixe le droit aux allocations de chômage. Le paiement passe par les syndicats ou par la CAPAC ; depuis la sixième réforme de l’État, l’accompagnement et le contrôle de la recherche d’emploi relèvent des services régionaux (Actiris, Forem, VDAB, ADG).',
  al=['Office national de l’emploi', 'Actiris', 'Forem', 'VDAB'], v=[FICHE, EMP])
T('INAMI', 'pol',
  'Institut national d’assurance maladie-invalidité : il organise le remboursement des soins de santé et les indemnités d’incapacité de travail, versés par l’intermédiaire des mutualités.',
  al=['mutualités', 'assurance maladie-invalidité'], v=[SAN, at(EMP, 'f-invalidite')])

# ===================== Europe et traités =====================
T('Union européenne', 'eur',
  'Union politique et économique de 27 États membres, fondée sur les traités. Elle exerce les compétences que les États lui ont attribuées, selon les principes d’attribution, de subsidiarité et de proportionnalité. Elle a succédé en 1993 aux Communautés européennes et absorbé la Communauté européenne en 2009.',
  al=['UE', 'Union', 'UE à 27'], v=[CMP])
T('Commission européenne', 'eur',
  'Organe exécutif de l’Union : elle propose les textes législatifs, veille à l’application des traités (« gardienne des traités »), gère le budget et négocie les accords commerciaux. Elle compte un commissaire par État membre.',
  al=['Commission'], v=[CLI])
T('Conseil de l’Union européenne', 'eur',
  'Institution où siègent les ministres des États membres, par domaine (finances, agriculture, etc.). Il adopte la législation et le budget avec le Parlement européen. À ne pas confondre avec le Conseil européen ni avec le Conseil de l’Europe.',
  al=['Conseil des ministres de l’UE', 'Conseil Ecofin', 'Ecofin'], v=[FIN])
T('Conseil européen', 'eur',
  'Réunion des chefs d’État ou de gouvernement des États membres, de son président et de la présidente ou du président de la Commission. Il fixe les grandes orientations politiques de l’Union mais n’adopte pas de lois.')
T('Parlement européen', 'eur',
  'Assemblée élue au suffrage universel direct tous les cinq ans (720 membres depuis 2024, dont 22 pour la Belgique). Il adopte la législation et le budget avec le Conseil, et contrôle la Commission.',
  al=['eurodéputés'])
T('Cour de justice de l’Union européenne', 'eur',
  'Juridiction de l’Union, établie à Luxembourg. Elle garantit l’interprétation et l’application uniformes du droit de l’Union, notamment en répondant aux questions des juges nationaux (questions préjudicielles).',
  al=['CJUE'])
T('Banque centrale européenne', 'eur',
  'Banque centrale des pays de la zone euro, établie à Francfort. Son mandat principal est la stabilité des prix ; depuis 2021, elle vise une inflation de 2 % à moyen terme. Avec les banques centrales nationales de la zone euro, elle forme l’Eurosystème.',
  al=['BCE', 'Eurosystème'])
T('Eurostat', 'eur',
  'Office statistique de l’Union européenne, établi à Luxembourg. Il harmonise les définitions et publie les statistiques comparables des États membres, transmises par les instituts nationaux (Statbel, BNB, etc.). C’est la source principale des comparaisons de Chiffre Juste.',
  v=[CMP])
T('Zone euro', 'eur',
  'Ensemble des États membres qui ont adopté l’euro comme monnaie. La monnaie unique existe depuis le 1er janvier 1999 ; les billets et pièces circulent depuis le 1er janvier 2002. La zone compte 21 pays depuis l’entrée de la Bulgarie en 2026.',
  al=['euro'])
T('Union économique et monétaire', 'eur',
  'Volet des traités qui organise la coordination des politiques économiques des États membres et, pour les pays de la zone euro, la monnaie unique et une politique monétaire commune. Elle a été créée par le traité de Maastricht et réalisée en trois étapes entre 1990 et 1999.',
  al=['UEM'])
T('Critères de convergence', 'eur',
  'Conditions fixées par le traité de Maastricht pour adopter l’euro : inflation et taux d’intérêt à long terme proches de ceux des pays les plus stables, déficit public ne dépassant pas 3 % du PIB, dette publique ne dépassant pas 60 % du PIB (ou s’en rapprochant à un rythme satisfaisant) et stabilité du taux de change pendant deux ans.',
  al=['critères de Maastricht', '3 %', '60 %'], v=[at(FIN, 'f-dette')],
  s=[('Protocole n° 13 sur les critères de convergence (version consolidée), EUR-Lex', EURLEX + '12016E/PRO/13')])
T('Pacte de stabilité et de croissance', 'eur',
  'Ensemble de règles européennes, adopté en 1997, qui encadre les finances publiques des États membres autour des valeurs de référence de 3 % du PIB pour le déficit et de 60 % pour la dette. Réformé à plusieurs reprises, il repose depuis avril 2024 sur des plans budgétaires nationaux à moyen terme et une trajectoire de dépenses publiques nettes.',
  al=['PSC', 'règles budgétaires européennes', 'cadre budgétaire européen'], v=[at(FIN, 'f-deficit')])
T('Procédure pour déficit excessif', 'eur',
  'Procédure du Pacte de stabilité et de croissance ouverte par le Conseil de l’Union lorsqu’un État dépasse la valeur de référence de déficit (3 % du PIB) ou ne réduit pas assez sa dette. L’État reçoit une trajectoire de correction et peut, en dernier ressort, être sanctionné. Elle a été ouverte pour la Belgique en 2024.',
  al=['PDE'], v=[at(FIN, 'f-deficit')])
T('Semestre européen', 'eur',
  'Cycle annuel de coordination des politiques économiques et budgétaires des États membres, mis en place en 2011 : la Commission analyse la situation de chaque pays et le Conseil adopte des recommandations par pays.',
  v=[PEN])
T('Traité sur la stabilité, la coordination et la gouvernance', 'eur',
  'Traité intergouvernemental signé le 2 mars 2012 par 25 États membres et entré en vigueur le 1er janvier 2013, en réponse à la crise des dettes souveraines. Son volet budgétaire, le « pacte budgétaire », impose une « règle d’or » : un déficit structurel limité, en principe, à 0,5 % du PIB.',
  al=['TSCG', 'pacte budgétaire', 'règle d’or'])
T('Marché unique', 'eur',
  'Espace sans frontières intérieures où circulent librement les marchandises, les services, les capitaux et les personnes (les « quatre libertés »). Il a été organisé par l’Acte unique européen et devait être achevé au 31 décembre 1992.',
  al=['marché intérieur', 'quatre libertés', 'libre circulation'])
T('Citoyenneté européenne', 'eur',
  'Statut créé par le traité de Maastricht et qui s’ajoute à la nationalité d’un État membre : droit de circuler et de séjourner dans l’Union, droit de vote et d’éligibilité aux élections municipales et européennes dans l’État de résidence, protection consulaire.',
  al=['citoyen de l’Union'], v=[IMM])
T('Espace Schengen', 'eur',
  'Espace de libre circulation des personnes sans contrôle aux frontières intérieures. L’accord de Schengen a été signé le 14 juin 1985 et sa convention d’application le 19 juin 1990 ; il s’applique depuis le 26 mars 1995 et a été intégré au droit de l’Union par le traité d’Amsterdam.',
  al=['Schengen'])
T('Subsidiarité', 'eur',
  'Principe selon lequel, dans les domaines qui ne relèvent pas de sa compétence exclusive, l’Union n’intervient que si l’objectif ne peut pas être atteint de manière suffisante par les États membres et peut l’être mieux au niveau européen (article 5 du traité sur l’Union européenne).')
T('Règlement, directive, décision', 'eur',
  'Principaux actes juridiques de l’Union. Le règlement s’applique directement et entièrement dans tous les États membres. La directive fixe un objectif que chaque État doit atteindre en adoptant ses propres règles (transposition). La décision est obligatoire pour ses seuls destinataires.',
  al=['règlement européen', 'directive européenne', 'transposition'])
T('Procédure législative ordinaire', 'eur',
  'Procédure par laquelle le Parlement européen et le Conseil de l’Union adoptent ensemble, sur proposition de la Commission, la plupart des actes législatifs européens. Elle s’appelait codécision avant le traité de Lisbonne.',
  al=['codécision'])
T('Majorité qualifiée', 'eur',
  'Règle de vote la plus courante au Conseil de l’Union depuis le traité de Lisbonne : une décision est adoptée si elle réunit au moins 55 % des États membres (15 sur 27) représentant au moins 65 % de la population de l’Union. Certaines matières, comme la fiscalité, exigent l’unanimité.',
  al=['unanimité', 'double majorité'])
T('NextGenerationEU', 'eur',
  'Instrument de relance adopté en 2020 après la crise du Covid-19, d’environ 750 milliards d’euros aux prix de 2018, financé par un emprunt commun de l’Union. Il finance notamment les plans nationaux de relance et de résilience.',
  al=['plan de relance européen', 'facilité pour la reprise et la résilience'])
T('Traité de Paris (CECA)', 'eur',
  'Traité signé le 18 avril 1951 par la Belgique, la France, l’Allemagne, l’Italie, le Luxembourg et les Pays-Bas, entré en vigueur le 23 juillet 1952. Il crée la Communauté européenne du charbon et de l’acier, première communauté européenne, et a expiré le 23 juillet 2002.',
  al=['CECA', 'Communauté européenne du charbon et de l’acier'],
  s=[('Texte du traité, EUR-Lex', EURLEX + '11951K/TXT')])
T('Traités de Rome', 'eur',
  'Deux traités signés le 25 mars 1957 et entrés en vigueur le 1er janvier 1958 : l’un crée la Communauté économique européenne (CEE, marché commun et union douanière), l’autre la Communauté européenne de l’énergie atomique (Euratom).',
  al=['traité de Rome', 'CEE', 'Communauté économique européenne', 'Euratom'],
  s=[('Traité instituant la CEE, EUR-Lex', EURLEX + '11957E/TXT')])
T('Acte unique européen', 'eur',
  'Traité signé en février 1986 et entré en vigueur le 1er juillet 1987. Il fixe l’objectif d’achever le marché intérieur au 31 décembre 1992, étend le vote à la majorité qualifiée et renforce le rôle du Parlement européen.',
  al=['Acte unique'],
  s=[('Texte de l’Acte unique, EUR-Lex', EURLEX + '11986U/TXT')])
T('Traité de Maastricht', 'eur',
  'Traité sur l’Union européenne, signé le 7 février 1992 et entré en vigueur le 1er novembre 1993. Il crée l’Union européenne, organisée alors en trois « piliers », institue la citoyenneté européenne et prévoit l’Union économique et monétaire avec ses critères de convergence (dont les références de 3 % du PIB pour le déficit et de 60 % pour la dette).',
  al=['Maastricht', 'traité sur l’Union européenne', 'TUE'], v=[at(FIN, 'f-dette')],
  s=[('Texte du traité, EUR-Lex', EURLEX + '11992M/TXT')])
T('Traité d’Amsterdam', 'eur',
  'Traité signé le 2 octobre 1997 et entré en vigueur le 1er mai 1999. Il renforce les droits du Parlement européen, crée un espace de liberté, de sécurité et de justice et intègre l’acquis de Schengen au droit de l’Union.',
  al=['Amsterdam'],
  s=[('Texte du traité, EUR-Lex', EURLEX + '11997D/TXT')])
T('Traité de Nice', 'eur',
  'Traité signé le 26 février 2001 et entré en vigueur le 1er février 2003. Il adapte les institutions (pondération des voix au Conseil, composition de la Commission) en vue de l’élargissement de 2004 à dix nouveaux États.',
  al=['Nice'],
  s=[('Texte du traité, EUR-Lex', EURLEX + '12001C/TXT')])
T('Traité de Lisbonne', 'eur',
  'Traité signé le 13 décembre 2007 et entré en vigueur le 1er décembre 2009, après l’échec du traité établissant une Constitution pour l’Europe (rejeté par référendum en France et aux Pays-Bas en 2005). Il donne à l’Union la personnalité juridique, rend la Charte des droits fondamentaux contraignante, crée la présidence stable du Conseil européen et le Haut représentant pour les affaires étrangères, généralise la procédure législative ordinaire et prévoit une procédure de retrait (article 50).',
  al=['Lisbonne', 'TFUE', 'traité sur le fonctionnement de l’Union européenne', 'article 50'],
  s=[('Texte du traité, EUR-Lex', EURLEX + '12007L/TXT')])
T('Charte des droits fondamentaux de l’Union européenne', 'eur',
  'Texte qui rassemble les droits civils, politiques, économiques et sociaux reconnus dans l’Union. Proclamée à Nice le 7 décembre 2000, elle a la même valeur juridique que les traités depuis l’entrée en vigueur du traité de Lisbonne (2009).',
  al=['Charte des droits fondamentaux'],
  s=[('Texte de la Charte, EUR-Lex', EURLEX + '12016P/TXT')])
T('Convention européenne des droits de l’homme', 'eur',
  'Traité du Conseil de l’Europe (organisation distincte de l’Union, qui compte 46 États), signé à Rome le 4 novembre 1950 et entré en vigueur le 3 septembre 1953. Son respect est contrôlé par la Cour européenne des droits de l’homme, à Strasbourg, qui a plusieurs fois condamné la Belgique pour les conditions de détention dans ses prisons.',
  al=['CEDH', 'Cour européenne des droits de l’homme', 'Conseil de l’Europe'], v=[at(JUS, 'f-prison')])
T('Convention de Genève relative au statut des réfugiés', 'eur',
  'Convention des Nations unies du 28 juillet 1951, complétée par le protocole de New York de 1967. Elle définit le réfugié comme une personne qui craint avec raison d’être persécutée du fait de sa race, de sa religion, de sa nationalité, de son appartenance à un certain groupe social ou de ses opinions politiques, et interdit de la renvoyer vers un pays où elle serait en danger (non-refoulement).',
  al=['Convention de Genève', 'non-refoulement'], v=[at(IMM, 'f-asile')])
T('Système de Dublin', 'eur',
  'Règles européennes qui désignent l’État membre responsable de l’examen d’une demande d’asile, en principe le pays de première entrée. Le règlement Dublin III (2013) est remplacé par les règles du pacte sur la migration et l’asile, adopté en 2024, dont l’application a été fixée à 2026.',
  al=['règlement Dublin', 'pacte sur la migration et l’asile'], v=[at(IMM, 'f-asile')])

# ===================== Économie et finances publiques =====================
T('Produit intérieur brut', 'eco',
  'Valeur de tous les biens et services finaux produits sur le territoire d’un pays pendant une année. Il mesure l’activité économique, pas le bien-être : il ignore notamment le travail domestique, les inégalités et l’épuisement des ressources.',
  al=['PIB'], v=[CMP, FIN])
T('PIB par habitant', 'eco',
  'PIB divisé par la population moyenne de l’année. Il donne un ordre de grandeur de la richesse produite par personne, mais pas du revenu réellement perçu par les ménages ; au Luxembourg et en Irlande, il est gonflé par les travailleurs frontaliers et les profits des multinationales.',
  v=[CMP])
T('Croissance économique', 'eco',
  'Variation annuelle du PIB en volume, c’est-à-dire une fois l’effet des prix retiré. On parle de récession quand le PIB recule, en général sur au moins deux trimestres consécutifs.',
  al=['croissance réelle', 'récession'])
T('Inflation', 'eco',
  'Hausse générale et durable des prix à la consommation, mesurée par la variation d’un indice des prix. Une inflation de 3 % signifie qu’il faut 3 % d’euros en plus pour acheter le même panier qu’un an plus tôt.',
  al=['hausse des prix'], ex='Belgique : environ +21 % de hausse des prix entre 2021 et 2025 (IPCH).', v=[at(FIN, 'f-interets')])
T('Indice des prix à la consommation harmonisé', 'eco',
  'Indice des prix calculé selon une méthode commune à tous les pays de l’Union, publié par Eurostat. Il sert à comparer l’inflation entre pays et c’est l’indicateur suivi par la Banque centrale européenne. Chiffre Juste l’utilise pour convertir des montants en euros constants.',
  al=['IPCH', 'HICP'], v=[at(FIN, 'f-interets'), at(LOG, 'f-acheter')])
T('Euros courants et euros constants', 'eco',
  'Un montant en euros courants est exprimé aux prix de son année. Exprimé en euros constants (par exemple « en euros de 2025 »), il est corrigé de l’inflation, ce qui permet de comparer des années entre elles. Les ratios en % du PIB n’ont pas besoin de cette correction, puisque le PIB évolue lui aussi avec les prix.',
  al=['euros courants', 'euros constants', 'prix courants', 'valeur nominale', 'valeur réelle', 'déflateur'], v=[at(FIN, 'f-interets'), at(CLI, 'f-facture')])
T('Standard de pouvoir d’achat', 'eco',
  'Unité monétaire fictive utilisée par Eurostat pour corriger les différences de niveau des prix entre pays : un SPA permet en théorie d’acheter la même quantité de biens et services dans chaque pays. Elle repose sur les parités de pouvoir d’achat.',
  al=['SPA', 'parité de pouvoir d’achat', 'PPA'], v=[CMP])
T('Administrations publiques', 'eco',
  'Ensemble des pouvoirs publics au sens des comptes nationaux (secteur S13) : État fédéral, Communautés et Régions, pouvoirs locaux et sécurité sociale. C’est ce périmètre qui sert au calcul européen de la dette et du déficit.',
  al=['S13', 'secteur public', 'pouvoirs publics'], v=[FIN])
T('Dette publique', 'eco',
  'Total des emprunts contractés par les administrations publiques et non encore remboursés, au sens du traité de Maastricht : dette brute (les actifs publics ne sont pas déduits), consolidée (les prêts entre administrations ne sont comptés qu’une fois) et à sa valeur nominale.',
  al=['dette brute', 'dette de Maastricht', 'endettement public'], ex='Belgique : 107,9 % du PIB fin 2025 ; Union : 81,7 %.', v=[at(FIN, 'f-dette'), CMP])
T('Dette nette', 'eco',
  'Dette brute dont on déduit certains actifs financiers des administrations publiques (dépôts, prêts, titres). Elle n’a pas de définition européenne unique, ce qui la rend moins comparable entre pays.',
  v=[at(FIN, 'f-dette')])
T('Déficit public', 'eco',
  'Différence, sur une année, entre les dépenses et les recettes de l’ensemble des administrations publiques, exprimée en % du PIB. Un déficit s’ajoute à la dette ; un excédent permet de la réduire.',
  al=['solde public', 'besoin de financement', 'excédent'], ex='Belgique : 5,2 % du PIB en 2025 ; Union : 3,1 %.', v=[at(FIN, 'f-deficit'), CMP])
T('Solde primaire', 'eco',
  'Solde public hors charges d’intérêts. Un excédent primaire signifie que les recettes couvrent les dépenses courantes et d’investissement : seule la charge de la dette passée crée alors un déficit.',
  al=['excédent primaire', 'déficit primaire'], v=[at(FIN, 'f-dette')])
T('Déficit structurel', 'eco',
  'Déficit public corrigé des effets de la conjoncture (recettes plus faibles et dépenses de chômage plus élevées en période de ralentissement) et des mesures ponctuelles. Il n’est pas observé directement mais estimé, ce qui le rend sensible aux hypothèses.',
  al=['solde structurel'])
T('Charge d’intérêts', 'eco',
  'Intérêts payés chaque année par les administrations publiques sur leur dette. Elle dépend du montant de la dette et du taux moyen payé ; comme la dette est refinancée progressivement, une hausse des taux ne s’y répercute que petit à petit.',
  al=['intérêts de la dette', 'taux d’intérêt implicite'], ex='Belgique : 14,3 milliards d’euros en 2025, soit 2,2 % du PIB.', v=[at(FIN, 'f-interets')])
T('Effet boule de neige', 'eco',
  'Dynamique par laquelle la dette augmente d’elle-même, en % du PIB, quand le taux d’intérêt moyen payé (r) dépasse le taux de croissance du PIB en valeur (g). À l’inverse, quand g dépasse r, le ratio de dette peut baisser même avec un léger déficit hors intérêts.',
  al=['r - g', 'r moins g'], v=[at(FIN, 'f-dette')])
T('Recettes publiques', 'eco',
  'Ensemble des ressources des administrations publiques : impôts, cotisations sociales, revenus de la propriété, ventes de biens et services.',
  al=['prélèvements obligatoires', 'pression fiscale'], v=[FIN, CMP])
T('Dépenses publiques', 'eco',
  'Ensemble des dépenses des administrations publiques : rémunérations, achats, prestations sociales, subventions, intérêts et investissements. Exprimées en % du PIB, elles ne disent pas qui finance quoi : un pays peut dépenser moins en public parce que les ménages paient davantage en privé.',
  ex='Belgique : 54,2 % du PIB en 2025 (provisoire) ; Union : 49,5 %.', v=[at(FIN, 'f-depenses'), CMP])
T('COFOG', 'eco',
  'Classification des fonctions des administrations publiques, établie par les Nations unies. Elle range chaque dépense selon sa finalité dans dix fonctions (services généraux, défense, ordre et sécurité, affaires économiques, environnement, logement, santé, loisirs et culture, enseignement, protection sociale), ce qui permet de comparer les pays et les années.',
  al=['dépenses par fonction', 'classification des fonctions des administrations publiques'], v=[at(FIN, 'f-depenses')])
T('Investissement public', 'eco',
  'Dépenses des administrations publiques pour acquérir des biens durables : bâtiments, routes, réseaux, équipements, logiciels (formation brute de capital fixe). Les générations futures héritent de la dette, mais aussi de ces actifs.',
  al=['formation brute de capital fixe'], v=[at(FIN, 'f-invest')])
T('Notation souveraine', 'eco',
  'Appréciation, par une agence de notation privée (S&P, Moody’s, Fitch…), du risque qu’un État ne rembourse pas sa dette, exprimée par une note (AAA, AA, A…). C’est une opinion d’entreprise, pas une mesure officielle ; les agences sont encadrées dans l’Union depuis 2009.',
  al=['agence de notation', 'note souveraine', 'rating'], v=[FIN])
T('Politique budgétaire', 'eco',
  'Utilisation des dépenses et des recettes publiques pour influencer l’activité économique, par exemple soutenir la demande en période de crise (relance) ou réduire le déficit (consolidation, parfois appelée austérité).',
  al=['relance', 'austérité', 'consolidation budgétaire'], v=[FIN])
T('Politique monétaire', 'eco',
  'Action de la banque centrale sur les taux d’intérêt et la quantité de monnaie, pour maintenir la stabilité des prix. Dans la zone euro, elle relève de la Banque centrale européenne et non des gouvernements nationaux.',
  al=['taux directeurs'])
T('Stabilisateurs automatiques', 'eco',
  'Recettes et dépenses publiques qui réagissent d’elles-mêmes à la conjoncture : en période de ralentissement, les impôts rentrent moins et les allocations de chômage augmentent, ce qui soutient l’activité sans décision nouvelle.')
T('Keynésianisme', 'eco',
  'Courant économique issu de John Maynard Keynes (Théorie générale, 1936), selon lequel la demande globale peut rester durablement insuffisante et l’État doit la soutenir, notamment par la politique budgétaire, en période de crise.',
  v=[FIN])
T('Monétarisme et économie de l’offre', 'eco',
  'Courants qui insistent sur le rôle de la monnaie dans l’inflation (Milton Friedman) et sur les conditions de production (fiscalité, réglementation, incitations au travail et à l’investissement) plutôt que sur le soutien à la demande.',
  al=['monétarisme', 'économie de l’offre'])
T('Théorie monétaire moderne', 'eco',
  'Courant hétérodoxe selon lequel un État qui émet sa propre monnaie ne peut pas faire défaut dans cette monnaie : la limite de la dépense publique serait l’inflation et les capacités de production, pas la dette. Ses critiques soulignent les risques d’inflation et le cas particulier des pays de la zone euro, qui n’émettent pas leur monnaie.',
  al=['TMM', 'MMT'], v=[FIN])
T('État-providence', 'eco',
  'Ensemble des interventions publiques qui protègent contre les risques sociaux et redistribuent les revenus : sécurité sociale, aide sociale, services publics comme l’enseignement et la santé.',
  al=['État social', 'protection sociale'], v=[INE, PEN])
T('Balance commerciale', 'eco',
  'Différence entre la valeur des exportations et celle des importations de biens d’un pays (et parfois de services). Un solde négatif n’est pas en soi une perte : il reflète aussi la structure de l’économie et les échanges au sein de chaînes de production.',
  al=['solde commercial', 'exportations', 'importations'], v=[CMP])
T('Compte courant', 'eco',
  'Partie de la balance des paiements qui retrace les échanges de biens et de services, les revenus reçus et versés à l’étranger et les transferts courants. Un excédent signifie que le pays prête au reste du monde, un déficit qu’il s’en finance.',
  al=['balance des paiements', 'balance courante'])
T('Productivité', 'eco',
  'Quantité produite par unité de travail (par heure ou par emploi) ou par combinaison de facteurs de production. Sa croissance est, à long terme, la principale source d’augmentation du niveau de vie.')
T('Patrimoine', 'eco',
  'Valeur de ce que possède un ménage (logement, épargne, placements, biens professionnels) diminuée de ses dettes. Il est beaucoup plus concentré que le revenu.',
  al=['patrimoine net', 'richesse'], v=[at(INE, 'f-ecarts')])

# ===================== Société =====================
T('Taux d’emploi', 'soc',
  'Part des personnes d’une classe d’âge qui ont un emploi, quel qu’il soit (au moins une heure de travail rémunéré pendant la semaine de référence, selon la définition du Bureau international du travail). L’indicateur européen de référence porte sur les 20-64 ans.',
  al=['emploi'], v=[at(EMP, 'f-emploi'), CMP])
T('Chômage au sens du BIT', 'soc',
  'Personne de 15 à 74 ans sans emploi pendant la semaine de référence, disponible pour travailler dans les deux semaines et qui a cherché activement un emploi au cours des quatre dernières semaines. Le taux de chômage rapporte ces personnes à la population active (personnes en emploi et chômeurs).',
  al=['chômage', 'taux de chômage', 'BIT', 'Bureau international du travail', 'population active'], ex='Belgique : 6,2 % en 2025.', v=[FICHE, at(EMP, 'f-duree'), CMP])
T('Demandeur d’emploi inoccupé', 'soc',
  'Personne sans emploi inscrite auprès d’un service régional de l’emploi (Actiris, Forem, VDAB, ADG). Cette mesure administrative dépend des règles d’inscription et ne coïncide pas avec le chômage au sens du BIT.',
  al=['DEI', 'chômeur inscrit'], v=[FICHE])
T('Inactivité', 'soc',
  'Situation des personnes ni en emploi ni au chômage : étudiants, retraités, personnes au foyer, personnes malades ou en invalidité, personnes découragées qui ne cherchent plus. Une baisse du chômage peut cacher une hausse de l’inactivité.',
  al=['inactifs', 'taux d’activité'], v=[EMP])
T('Chômage de longue durée', 'soc',
  'Chômage au sens du BIT qui dure depuis au moins douze mois. Il est souvent exprimé en % de la population active.',
  v=[at(EMP, 'f-duree'), CMP])
T('Incapacité de travail et invalidité', 'soc',
  'Assurance qui indemnise les travailleurs dont la maladie ou l’accident empêche le travail : on parle d’incapacité primaire pendant la première année, puis d’invalidité. Le nombre d’invalides a fortement augmenté en Belgique depuis vingt ans.',
  al=['invalidité', 'incapacité primaire', 'malades de longue durée'], v=[at(EMP, 'f-invalidite')])
T('Écart salarial entre femmes et hommes', 'soc',
  'Différence entre le salaire horaire brut moyen des hommes et celui des femmes, en % de celui des hommes, dans sa forme « non ajustée » publiée par Eurostat. Il ne tient pas compte des écarts de temps de travail, de secteur ou de fonction.',
  al=['écart salarial', 'écart de rémunération'], v=[CMP])
T('Salaire minimum', 'soc',
  'Rémunération mensuelle brute minimale fixée par la loi ou par un accord interprofessionnel. Cinq pays de l’Union n’ont pas de salaire minimum légal : les minima y sont fixés par conventions collectives.')
T('Revenu disponible équivalent', 'soc',
  'Revenu d’un ménage après impôts et transferts sociaux, divisé par un nombre d’« unités de consommation » pour tenir compte de sa taille : 1 pour le premier adulte, 0,5 pour chaque autre personne de 14 ans ou plus, 0,3 pour chaque enfant de moins de 14 ans (échelle de l’OCDE modifiée).',
  al=['revenu équivalent', 'unités de consommation', 'échelle de l’OCDE'], v=[at(INE, 'f-pauvrete')])
T('Taux de risque de pauvreté', 'soc',
  'Part des personnes dont le revenu disponible équivalent est inférieur à 60 % du revenu médian de leur pays. C’est une mesure relative : elle compare chacun au niveau de vie de son pays, pas à un panier fixe de besoins.',
  al=['risque de pauvreté', 'seuil de pauvreté', 'pauvreté monétaire'], ex='Belgique : 10,9 % en 2025 ; seuil de 18 780 € par an pour une personne seule.', v=[at(INE, 'f-pauvrete'), CMP])
T('Risque de pauvreté ou d’exclusion sociale', 'soc',
  'Indicateur européen qui compte les personnes concernées par au moins une de ces trois situations : risque de pauvreté monétaire, privation matérielle et sociale sévère, ou vie dans un ménage à très faible intensité de travail.',
  al=['AROPE', 'exclusion sociale'], v=[at(INE, 'f-pauvrete'), CMP])
T('Privation matérielle et sociale sévère', 'soc',
  'Situation des personnes qui ne peuvent pas se permettre au moins 7 éléments sur une liste de 13 jugés nécessaires (faire face à une dépense imprévue, chauffer convenablement le logement, remplacer des meubles usés, avoir une connexion internet, partir une semaine en vacances…).',
  al=['privation matérielle', 'privation sévère'], v=[INE, CMP])
T('Transferts sociaux', 'soc',
  'Prestations versées par les pouvoirs publics aux ménages : allocations de chômage, d’invalidité, familiales, aide sociale, pensions. Comparer la pauvreté « avant » et « après transferts » mesure l’ampleur de la redistribution, pas une situation réelle sans elle.',
  al=['redistribution', 'avant transferts'], v=[at(INE, 'f-redistribution')])
T('Coefficient de Gini', 'soc',
  'Indicateur d’inégalité de la distribution des revenus, de 0 (tout le monde a le même revenu) à 100 (une seule personne a tout). Il résume une distribution entière en un seul chiffre et ne dit pas où se situent les inégalités.',
  al=['Gini', 'indice de Gini'], v=[INE, CMP])
T('Espérance de vie', 'soc',
  'Nombre moyen d’années qu’une personne vivrait si elle connaissait, tout au long de sa vie, les risques de décès observés à chaque âge l’année considérée. Ce n’est pas une prédiction pour une génération réelle.',
  al=['espérance de vie à la naissance'], ex='Belgique : 82,4 ans en 2024 ; Union : 81,5.', v=[at(SAN, 'f-vie'), CMP])
T('Années de vie en bonne santé', 'soc',
  'Nombre d’années qu’une personne peut espérer vivre sans limitation dans les activités de la vie quotidienne, d’après les réponses à une question d’enquête. Il combine mortalité et santé déclarée, ce qui le rend sensible aux différences de perception entre pays.',
  al=['espérance de vie en bonne santé'], v=[at(SAN, 'f-vie'), CMP])
T('Mortalité évitable', 'soc',
  'Décès avant 75 ans qui auraient pu être évités par la prévention et la santé publique (mortalité « prévenable ») ou par des soins de qualité et accessibles (mortalité « traitable »), selon une liste de causes établie par l’OCDE et Eurostat.',
  al=['mortalité prévenable', 'mortalité traitable'], v=[at(SAN, 'f-evitable')])
T('Ticket modérateur', 'soc',
  'Partie du prix d’un soin remboursable qui reste à la charge du patient. Elle s’ajoute aux suppléments et aux soins non remboursés dans les « paiements directs » des ménages.',
  al=['paiements directs', 'reste à charge', 'quote-part personnelle'], v=[at(SAN, 'f-cout')])
T('Maximum à facturer', 'soc',
  'Mécanisme belge, en vigueur depuis 2002, qui plafonne les tickets modérateurs payés par un ménage sur une année, selon ses revenus ; au-delà du plafond, la mutualité rembourse.',
  al=['MAF'], v=[at(SAN, 'f-cout')])
T('Besoins de soins non satisfaits', 'soc',
  'Part des personnes qui déclarent avoir renoncé à un examen ou à un traitement médical dont elles avaient besoin, parce qu’il était trop cher, trop éloigné ou soumis à une liste d’attente.',
  al=['renoncement aux soins'], v=[at(SAN, 'f-cout')])
T('Répartition et capitalisation', 'soc',
  'Deux modes de financement des pensions. En répartition, les cotisations des actifs d’une année paient les pensions de la même année. En capitalisation, chacun épargne pour sa propre pension, placée sur les marchés. La pension légale belge fonctionne par répartition.',
  al=['répartition', 'capitalisation'], v=[PEN])
T('Piliers des pensions', 'soc',
  'Le premier pilier est la pension légale ; le deuxième, la pension complémentaire constituée par l’employeur ou le secteur ; le troisième, l’épargne-pension individuelle, encouragée par un avantage fiscal.',
  al=['deuxième pilier', 'troisième pilier', 'pension complémentaire', 'épargne-pension'], v=[PEN])
T('Taux de dépendance des âgés', 'soc',
  'Nombre de personnes de 65 ans et plus pour 100 personnes de 15 à 64 ans. C’est un rapport démographique, pas économique : il ne dit pas combien de personnes travaillent réellement ni combien sont retraitées.',
  al=['taux de dépendance', 'ratio de dépendance'], ex='Belgique : 31,8 en 2025.', v=[at(PEN, 'f-cout'), CMP])
T('Âge légal et âge effectif de la pension', 'soc',
  'L’âge légal est l’âge à partir duquel chacun peut prendre sa pension sans condition de carrière : 66 ans depuis 2025, 67 ans en 2030. L’âge effectif est l’âge auquel on quitte réellement le marché du travail, en moyenne plus bas grâce aux départs anticipés.',
  al=['âge légal', 'âge de la pension', 'pension anticipée'], v=[at(PEN, 'f-age')])
T('Taux de remplacement', 'soc',
  'Rapport entre le montant de la pension et le dernier salaire (ou un salaire de référence). Il mesure dans quelle mesure la pension maintient le niveau de vie.',
  v=[at(PEN, 'f-niveau')])
T('Né à l’étranger, étranger, immigré', 'soc',
  'Une personne née à l’étranger peut être belge (par naturalisation ou par ses parents) ; une personne étrangère, c’est-à-dire sans la nationalité belge, peut être née en Belgique. Les statistiques distinguent donc le pays de naissance et la nationalité.',
  al=['immigré', 'étranger', 'pays de naissance', 'nationalité'], v=[at(IMM, 'f-flux')])
T('Solde migratoire et solde naturel', 'soc',
  'Le solde migratoire est la différence entre les arrivées et les départs d’une année, le solde naturel la différence entre les naissances et les décès. Leur somme donne, à des ajustements près, la variation de la population.',
  al=['solde migratoire', 'solde naturel', 'migration nette'], ex='Belgique, 2016-2025 : +620 046 par le solde migratoire, +24 145 par le solde naturel.', v=[at(IMM, 'f-flux'), CMP])
T('Protection internationale', 'soc',
  'Protection accordée par un État à une personne qui ne peut pas rentrer dans son pays : soit le statut de réfugié (Convention de Genève), soit la protection subsidiaire, pour les personnes exposées à un risque réel d’atteintes graves (peine de mort, torture, violence aveugle d’un conflit armé). En Belgique, les demandes sont examinées par le Commissariat général aux réfugiés et aux apatrides (CGRA).',
  al=['asile', 'demandeur d’asile', 'réfugié', 'protection subsidiaire', 'CGRA'], v=[at(IMM, 'f-asile')])
T('Premier titre de séjour', 'soc',
  'Autorisation de séjour délivrée pour la première fois à un ressortissant d’un pays hors de l’Union, pour une durée d’au moins trois mois, selon son motif : famille (regroupement familial), études, travail ou autres (notamment protection internationale).',
  al=['titre de séjour', 'regroupement familial', 'permis de séjour'], v=[at(IMM, 'f-flux')])
T('Criminalité enregistrée et chiffre noir', 'soc',
  'La criminalité enregistrée compte les faits connus de la police. Le « chiffre noir » désigne les faits jamais déclarés ni découverts, que seules les enquêtes de victimation permettent d’approcher. Une hausse des faits enregistrés peut refléter davantage de plaintes plutôt que davantage de faits.',
  al=['chiffre noir', 'enquête de victimation', 'statistiques policières'], v=[at(JUS, 'f-crime')])
T('ICCS', 'soc',
  'Classification internationale des infractions à des fins statistiques, adoptée par les Nations unies en 2015. Elle permet de comparer des infractions définies différemment par chaque code pénal national ; l’homicide volontaire y porte le code 0101.',
  al=['classification internationale des infractions', 'homicide volontaire'], v=[at(JUS, 'f-crime')])
T('Surpopulation carcérale', 'soc',
  'Situation où le nombre de détenus dépasse la capacité officielle des prisons. Le taux d’occupation rapporte les détenus aux places disponibles.',
  al=['taux d’occupation', 'capacité carcérale'], v=[at(JUS, 'f-prison'), CMP])
T('Détention préventive', 'soc',
  'Privation de liberté d’une personne qui n’a pas encore été jugée définitivement, ordonnée par un juge d’instruction lorsque des conditions strictes sont réunies (indices sérieux, absolue nécessité pour la sécurité publique). Elle représente une part importante de la population des prisons belges.',
  al=['prévenus'], v=[at(JUS, 'f-prison')])
T('Récidive', 'soc',
  'Nouvelle infraction commise par une personne déjà condamnée. Son taux varie fortement selon la définition retenue : nouvelle arrestation, nouvelle condamnation ou nouvelle incarcération, et selon la durée d’observation.',
  al=['taux de récidive'], v=[at(JUS, 'f-recidive')])
T('PISA', 'soc',
  'Programme international pour le suivi des acquis des élèves, piloté par l’OCDE depuis 2000. Il évalue tous les trois ans, en principe, les compétences des élèves de 15 ans en lecture, mathématiques et sciences, à partir d’échantillons représentatifs.',
  al=['programme international pour le suivi des acquis des élèves'], v=[at(EDU, 'f-competences')])
T('Décrochage scolaire', 'soc',
  'Indicateur européen des « sortants précoces » : part des 18-24 ans qui ont au plus un diplôme du secondaire inférieur et qui ne suivent ni études ni formation.',
  al=['sortants précoces', 'abandon scolaire'], v=[at(EDU, 'f-parcours'), CMP])
T('Redoublement', 'soc',
  'Fait de recommencer une année scolaire. Il est historiquement fréquent en Fédération Wallonie-Bruxelles ; la recherche montre en moyenne peu d’effets positifs durables sur les apprentissages.',
  v=[at(EDU, 'f-parcours')])
T('Tronc commun', 'soc',
  'Réforme de la Fédération Wallonie-Bruxelles qui organise un parcours commun à tous les élèves de la maternelle jusqu’à la troisième année du secondaire, mis en place progressivement depuis 2020. Ses modalités ont été revues en 2026.',
  al=['Pacte pour un enseignement d’excellence'], v=[at(EDU, 'histoire')])
T('Diplômés du supérieur', 'soc',
  'Part des 25-34 ans titulaires d’un diplôme de l’enseignement supérieur (bachelier, master, doctorat ou formation supérieure courte). C’est l’un des indicateurs suivis par l’Union.',
  al=['niveau de diplôme', 'enseignement supérieur'], v=[at(EDU, 'f-diplome'), CMP])
T('NEET', 'soc',
  'Jeunes qui ne sont ni en emploi, ni en études, ni en formation (de l’anglais « not in education, employment or training »), en général mesurés chez les 15-29 ans.',
  al=['ni en emploi ni en formation'])
T('Surcharge des coûts du logement', 'soc',
  'Situation des personnes dont le ménage consacre plus de 40 % de son revenu disponible (aides au logement déduites) aux dépenses de logement : loyer ou intérêts d’emprunt, charges, énergie.',
  al=['taux d’effort', 'coût du logement'], v=[at(LOG, 'f-louer'), CMP])
T('Surpeuplement', 'soc',
  'Situation d’un logement qui compte moins de pièces que le minimum défini par Eurostat : une pièce pour le ménage, une par couple, une par adulte seul, une pour deux enfants de même sexe de 12 à 17 ans ou pour deux enfants de moins de 12 ans, etc.',
  al=['logement surpeuplé'], v=[at(LOG, 'f-jeunes'), CMP])
T('Indice des prix des logements', 'soc',
  'Indice qui suit l’évolution des prix d’achat des logements (neufs et anciens) à qualité comparable. Les prix y sont nominaux : pour mesurer une hausse réelle, il faut déduire l’inflation.',
  al=['prix des logements', 'rapport prix/revenu'], v=[at(LOG, 'f-acheter'), CMP])
T('Logement social', 'soc',
  'Logement loué à un loyer inférieur à celui du marché, en fonction des revenus, par des sociétés publiques ou agréées. La politique du logement relève des Régions.',
  al=['logement public', 'liste d’attente'], v=[at(LOG, 'f-louer')])
T('Sans-abrisme', 'soc',
  'Situation des personnes sans logement stable, de la rue aux hébergements d’urgence et aux logements précaires. La typologie européenne ETHOS distingue plusieurs catégories ; les dénombrements belges (Bruss’help, KU Leuven) ne sont pas toujours comparables d’une année à l’autre.',
  al=['sans chez-soi', 'sans-abri', 'ETHOS'], v=[at(LOG, 'f-louer')])

# ===================== Climat et énergie =====================
T('Gaz à effet de serre', 'env',
  'Gaz qui retiennent la chaleur dans l’atmosphère : dioxyde de carbone (CO₂), méthane, protoxyde d’azote et gaz fluorés. Leurs émissions sont additionnées en tonnes d’équivalent CO₂, selon le pouvoir de réchauffement de chaque gaz.',
  al=['GES', 'émissions', 'équivalent CO2', 'CO2'], v=[at(CLI, 'f-emissions'), CMP])
T('Inventaire national des émissions', 'env',
  'Comptabilité officielle des émissions de gaz à effet de serre d’un pays, transmise chaque année aux Nations unies et à l’Union. Elle compte les émissions produites sur le territoire, pas celles des produits importés.',
  al=['émissions territoriales', 'empreinte carbone'], v=[at(CLI, 'f-emissions')])
T('UTCATF', 'env',
  'Utilisation des terres, changement d’affectation des terres et foresterie (LULUCF en anglais) : émissions et absorptions de CO₂ par les forêts et les sols. Les émissions « nettes » les incluent, les émissions « hors UTCATF » non.',
  al=['LULUCF', 'émissions nettes', 'puits de carbone'], v=[at(CLI, 'f-emissions')])
T('Neutralité climatique', 'env',
  'Situation où les émissions de gaz à effet de serre restantes sont compensées par des absorptions. La loi européenne sur le climat de 2021 fixe cet objectif pour l’Union en 2050, avec une baisse nette d’au moins 55 % en 2030 par rapport à 1990.',
  al=['neutralité carbone', 'loi européenne sur le climat', 'zéro émission nette'])
T('Système d’échange de quotas d’émission', 'env',
  'Marché européen du carbone créé en 2005 : les centrales électriques, l’industrie lourde, l’aviation intra-européenne et, depuis 2024, le transport maritime doivent détenir un quota par tonne de CO₂ émise ; le nombre total de quotas baisse chaque année et ils s’échangent à un prix de marché.',
  al=['SEQE', 'SEQE-UE', 'ETS', 'marché du carbone', 'quotas'], v=[at(CLI, 'recherche')])
T('Partage de l’effort', 'env',
  'Règlement européen qui fixe à chaque État un objectif de réduction des émissions des secteurs non couverts par le marché du carbone (transport, bâtiments, agriculture, petite industrie, déchets). Pour la Belgique : −47 % en 2030 par rapport à 2005.',
  al=['effort sharing'], v=[at(CLI, 'histoire')])
T('Protocole de Kyoto', 'env',
  'Protocole à la convention-cadre des Nations unies sur les changements climatiques, adopté le 11 décembre 1997 et entré en vigueur le 16 février 2005. Il fixait aux pays industrialisés des objectifs chiffrés de réduction pour 2008-2012 ; pour la Belgique, −7,5 % par rapport à 1990.',
  al=['Kyoto'], v=[at(CLI, 'histoire')])
T('Accord de Paris', 'env',
  'Accord adopté le 12 décembre 2015 lors de la COP21 et entré en vigueur le 4 novembre 2016. Il vise à contenir le réchauffement nettement en dessous de 2 °C et à poursuivre les efforts pour le limiter à 1,5 °C ; chaque pays fixe ses propres contributions, revues tous les cinq ans.',
  al=['COP21', 'contributions déterminées au niveau national'], v=[CLI])
T('Énergies renouvelables', 'env',
  'Énergies issues de sources qui se renouvellent : soleil, vent, eau, biomasse, géothermie. L’indicateur européen mesure leur part dans la consommation finale brute d’énergie, tous usages confondus (électricité, chaleur, transport).',
  al=['renouvelables', 'part des renouvelables'], ex='Belgique : 14,3 % en 2024 ; Union : 25,2 %.', v=[at(CLI, 'f-energie'), CMP])
T('Dépendance énergétique', 'env',
  'Part de l’énergie consommée par un pays qui est importée (importations nettes rapportées à l’énergie disponible). Par convention, l’énergie nucléaire est comptée comme une production nationale, même si l’uranium est importé.',
  ex='Belgique : 75,4 % en 2024 ; Union : 57,3 %.', v=[at(CLI, 'f-energie')])
T('Mix électrique', 'env',
  'Répartition de la production d’électricité d’un pays entre ses sources : nucléaire, gaz, renouvelables, etc. À ne pas confondre avec la consommation, qui inclut les importations.',
  al=['production d’électricité'], v=[at(CLI, 'f-energie')])
T('Sortie du nucléaire', 'env',
  'Loi belge du 31 janvier 2003 qui interdisait de nouvelles centrales nucléaires et prévoyait la fermeture des réacteurs après 40 ans d’exploitation, entre 2015 et 2025. Elle a été abrogée par un vote de la Chambre le 15 mai 2025.',
  al=['loi de 2003'], v=[at(CLI, 'histoire')])
T('Précarité énergétique', 'env',
  'Difficulté d’un ménage à satisfaire ses besoins d’énergie à un coût supportable. L’indicateur européen le plus courant est la part des personnes qui déclarent ne pas pouvoir chauffer convenablement leur logement.',
  al=['pauvreté énergétique'], v=[at(CLI, 'f-facture')])
T('Effet rebond', 'env',
  'Phénomène par lequel une amélioration de l’efficacité énergétique, en rendant l’usage moins cher, en augmente la consommation et réduit une partie des économies attendues. L’hypothèse d’un rebond total (paradoxe de Jevons) trouve peu d’appui dans la recherche récente.',
  al=['paradoxe de Jevons'], v=[at(CLI, 'recherche')])

# ===================== Statistique et méthode =====================
T('Source primaire', 'met',
  'Organisme qui produit la donnée (Eurostat, Statbel, BNB, ONEM…) ou étude qui publie le résultat, par opposition à un article de presse ou à un site qui la reprend. Chiffre Juste vérifie chaque chiffre dans sa source primaire.',
  al=['source', 'source secondaire'])
T('Enquête et données administratives', 'met',
  'Une enquête interroge un échantillon de personnes et extrapole à la population (enquête sur les forces de travail, enquête sur les revenus et conditions de vie). Les données administratives proviennent des registres des institutions (inscriptions, paiements, plaintes) : elles sont exhaustives mais dépendent des règles de l’institution.',
  al=['enquête', 'données administratives', 'échantillon', 'EU-SILC', 'enquête sur les forces de travail', 'EFT'], v=[FICHE])
T('Moyenne et médiane', 'met',
  'La moyenne additionne toutes les valeurs et divise par leur nombre ; la médiane est la valeur qui partage une population en deux moitiés égales. Quand quelques valeurs sont très élevées, comme pour les revenus ou le patrimoine, la moyenne dépasse nettement la médiane.',
  al=['moyenne', 'médiane'], v=[INE])
T('Quintile et décile', 'met',
  'Une population classée, par exemple selon le revenu, est découpée en cinq groupes de même taille (quintiles) ou en dix (déciles). « Les 20 % les plus modestes » désigne le premier quintile.',
  al=['quintile', 'décile', 'quartile'], v=[at(SAN, 'f-cout'), LOG])
T('Pourcentage et point de pourcentage', 'met',
  'Quand un taux passe de 10 % à 12 %, il augmente de 2 points de pourcentage, mais de 20 % en valeur relative. Confondre les deux exagère ou minimise une évolution.',
  al=['point de pourcentage', 'points'])
T('Indice base 100', 'met',
  'Façon de présenter une série en fixant sa valeur d’une année de référence à 100 : un indice de 145 signifie une hausse de 45 % depuis cette année. Il permet de comparer des évolutions, pas des niveaux.',
  al=['indice', 'année de base', '2015 = 100'], v=[at(LOG, 'f-acheter'), at(CLI, 'f-emissions')])
T('Rupture de série', 'met',
  'Changement de méthode, de définition ou de source qui rend une valeur non directement comparable à celles d’avant. Eurostat la signale par la lettre « b » ; une partie de la variation observée cette année-là peut venir du changement de méthode.',
  al=['b', 'changement de méthode'], v=[INE, FICHE, CMP])
T('Données provisoires, estimées, révisées', 'met',
  'Les premières valeurs publiées sont souvent provisoires (« p ») ou estimées (« e ») et sont révisées quand l’information se complète. Un chiffre récent n’est donc pas définitif.',
  al=['provisoire', 'estimation', 'révision'], v=[FIN, CMP])
T('Comparabilité', 'met',
  'Deux chiffres ne se comparent que s’ils mesurent la même chose, de la même façon, sur la même période. Comparer une donnée nationale (inscriptions à l’ONEM) à une donnée européenne (chômage BIT) mélange deux définitions.',
  v=[CMP, FICHE])
T('Corrélation et causalité', 'met',
  'Deux phénomènes peuvent évoluer ensemble (corrélation) sans que l’un cause l’autre : un troisième facteur peut agir sur les deux (variable confondante), ou le lien peut aller dans l’autre sens. Établir une causalité demande une méthode adaptée.',
  al=['corrélation', 'causalité', 'variable confondante'], v=[EDU, JUS])
T('Essai randomisé contrôlé', 'met',
  'Expérience où les participants sont répartis au hasard entre un groupe qui reçoit une mesure et un groupe qui ne la reçoit pas. Le tirage au sort rend les groupes comparables : la différence de résultats peut alors être attribuée à la mesure.',
  al=['expérience aléatoire', 'essai randomisé', 'RCT'], v=[EMP, SAN])
T('Expérience naturelle et différence de différences', 'met',
  'Méthodes qui exploitent une situation réelle où un groupe est touché par une mesure et un autre non, pour une raison indépendante des personnes (une date de réforme, une frontière). La différence de différences compare l’évolution des deux groupes avant et après.',
  al=['expérience naturelle', 'différence de différences', 'quasi-expérience'], v=[EMP])
T('Contrôle synthétique', 'met',
  'Méthode qui construit, à partir d’autres pays ou régions, un « jumeau » statistique qui suivait la même évolution avant une politique, pour estimer ce qui se serait passé sans elle.',
  v=[CLI])
T('Méta-analyse et revue systématique', 'met',
  'Une revue systématique rassemble toutes les études sur une question selon une méthode explicite ; une méta-analyse combine statistiquement leurs résultats. Elles pèsent plus qu’une étude isolée.',
  al=['méta-analyse', 'revue systématique', 'synthèse'], v=[EDU, JUS])
T('Revue à comité de lecture', 'met',
  'Revue scientifique qui ne publie un article qu’après examen par d’autres chercheurs du domaine. Ce contrôle n’est pas une garantie absolue, mais il distingue la recherche publiée des documents de travail et des rapports non relus.',
  al=['évaluation par les pairs', 'peer review', 'document de travail'])
T('Intervalle de confiance', 'met',
  'Fourchette autour d’une estimation tirée d’un échantillon, qui indique sa précision : plus l’échantillon est petit, plus la fourchette est large. Deux valeurs dont les intervalles se recouvrent largement ne sont pas forcément différentes.',
  al=['marge d’erreur', 'significativité'])
T('Biais de sélection', 'met',
  'Erreur qui apparaît quand les personnes observées ne sont pas représentatives de la population visée, par exemple quand seules les personnes les plus motivées participent à un programme évalué.',
  al=['biais'])
T('Indicateur composite', 'met',
  'Indicateur qui combine plusieurs mesures en une seule (comme le risque de pauvreté ou d’exclusion sociale). Il résume mais cache la contribution de chaque composante, et dépend des choix de pondération.',
  v=[INE])
