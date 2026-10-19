# -*- coding: utf-8 -*-
"""Documentaires ARTE : lecture critique intégrée aux dossiers (« Voir et discuter »).

Source : analyse critique transmise par Tom le 19 octobre 2026 (lecture des sous-titres de sept programmes),
reformulée ; les vérifications externes ont été refaites par Au plus Juste (sources citées dans chaque fiche).
Un documentaire n’est jamais une preuve : il sert de support de discussion."""

def L(u, t):
    return f'<a href="{u}" target="_blank" rel="noopener">{t}</a>'

FILMS = {
'finances': dict(
    titre='Les États peuvent-ils s’endetter sans fin ?', serie='ARTE, collection « 42 »', duree='environ 27 min',
    url='https://www.arte.tv/fr/videos/127469-002-A/les-etats-peuvent-ils-s-endetter-sans-fin/', piste='sous-titres français',
    angle='Refinancer, emprunter, annuler',
    montre='Le refinancement des échéances comme fonctionnement normal de la dette d’un État ; une soutenabilité qui dépend de l’usage des fonds, des perspectives de croissance, des intérêts et de la confiance des prêteurs ; trois cas contrastés (Grèce, Japon, États-Unis) ; le rôle des banques centrales et des agences de notation ; les effets d’une annulation sur les épargnants. Conclusion du film : un recours prudent à l’emprunt, surtout en temps de crise.',
    garder='Au début (vers 01:21), l’explication du ratio dette/PIB glisse vers une dette accumulée « en un an » : c’est une confusion entre un stock (la dette) et un flux (le déficit). Le cas japonais (vers 08:45) associe détention nationale et stabilité sans examiner la monnaie, les créanciers, les échéances et la politique monétaire. Un facteur de risque (taux élevés, croissance faible, vers 15:33) n’est pas une prédiction de crise. Le scénario d’annulation mondiale (minutes 22-23) ne dit rien d’une restructuration ciblée.',
    verifie='Dette et déficit : la dette est un stock à une date donnée, le déficit un flux sur une année ; le ratio dette/PIB rapporte ce stock à la production d’une année ; les deux sont reliés par les ajustements stock-flux (' + L('https://ec.europa.eu/eurostat/documents/3217494/11470676/KS-EK-20-002-EN-N.pdf/37f13094-3a02-3b9a-89c6-bb5b684cccd7?t=1603963411000', 'Eurostat, Government debt and link with the deficit') + ').',
    belgique='Le dossier fait ce que le film ne fait pas pour la Belgique : la décomposition de la dette en solde primaire, effet « boule de neige » et ajustements (<a href="#f-dynamique">fiche 06</a>), les détenteurs (<a href="#f-detenteurs">fiche 07</a>), le coût de l’emprunt (<a href="#f-taux">fiche 08</a>) et la position européenne (<a href="#f-europe">fiche 09</a>).',
    debat='Qui décide qu’une dépense est « utile » : selon quel objectif, quel horizon, quels bénéficiaires ? Qui supportera le coût de l’ajustement ? Une annulation : quelles créances, quels détenteurs, quelles pertes, quelle procédure ?'),
'fiscalite': dict(
    titre='Tax Wars. La guerre des impôts', serie='ARTE, documentaire', duree='environ 94 min',
    url='https://www.arte.tv/fr/videos/106711-000-A/tax-wars/', piste='sous-titres français',
    angle='Fiscalité internationale des multinationales',
    montre='Le film suit l’ICRICT (Commission indépendante pour la réforme de l’impôt international des sociétés) et sa campagne. Le cas General Electric à Belfort sert à expliquer les prix de transfert et les redevances ; des séquences au Chili, en Inde et en Zambie relient recettes publiques, services et inégalités ; il présente la taxation unitaire, puis l’impôt minimum mondial, et la place des pays du Sud dans la négociation.',
    garder='Le cadrage soutient explicitement la réforme défendue par l’ICRICT : un plaidoyer n’est pas un consensus. Il faut distinguer illustration pédagogique, accusation et décision de justice (les allégations sur Belfort ne sont pas des condamnations). Les montants de pertes fiscales cités n’ont pas le même périmètre et ne s’additionnent pas. Vers 1:17, le film garde un désaccord utile : être présent à la table des négociations ne garantit pas une influence égale. En Zambie (vers 1:25), contribution importante des mines et recettes perdues coexistent.',
    verifie='Apple : après l’annulation par le Tribunal en 2020 rappelée dans le film, la Cour de justice de l’UE a, le 10 septembre 2024, confirmé la décision de la Commission : l’Irlande doit récupérer environ 13 milliards d’euros d’aides illégales (' + L('https://curia.europa.eu/jcms/jcms/p1_4551743', 'CJUE, affaire C-465/20 P') + '). Impôt minimum mondial (pilier 2) : un taux effectif de 15 % par pays, pour les groupes dont le chiffre d’affaires consolidé atteint au moins 750 millions d’euros ; ce n’est ni une taxe sur le chiffre d’affaires ni la taxation unitaire (' + L('https://www.oecd.org/en/events/public-consultations/2022/03/implementation-framework-of-the-global-minimum-tax.html', 'OCDE') + ' ; ' + L('https://financien.belgium.be/nl/node/17567', 'SPF Finances, pilier 2') + ').',
    belgique='Le film parle des bénéfices des multinationales ; le dossier montre que l’impôt des sociétés rapporte 4,4 % du PIB en Belgique, contre 12,0 % pour l’impôt des personnes physiques (<a href="#f-structure">fiche 02</a>). Ne pas comparer un taux sur les salaires (<a href="#f-qui">fiche 03</a>) à un taux sur les bénéfices.',
    debat='Taux légal, taux effectif, lieu où les profits sont déclarés : trois questions différentes. Quelle capacité de contrôle a une administration fiscale aux moyens limités ? Une réforme se juge en distinguant le projet défendu, l’accord signé, ses conditions d’application et les recettes réellement observées.'),
'inegalites': dict(
    titre='Peut-on mieux répartir la richesse ?', serie='ARTE, collection « 42 »', duree='environ 28 min',
    url='https://www.arte.tv/fr/videos/115510-011-A/peut-on-mieux-repartir-la-richesse/', piste='sous-titres français',
    angle='Croissance, patrimoine et droit',
    montre='Le film oppose croissance mondiale et concentration du patrimoine, rappelle la redistribution d’après-guerre et les changements de fiscalité, et donne la parole à la juriste Katharina Pistor sur le rôle du droit dans la protection du capital. Il évoque aussi des entreprises dont les actifs restent liés à leur mission plutôt qu’aux dividendes.',
    garder='Le passage sur une étude fiscale (vers 15:58) en élargit la portée : elle porte sur les grandes baisses d’impôts sur les plus riches, pas sur toutes les politiques dites néolibérales. Les liens entre inégalités, santé, criminalité ou bonheur demandent des études spécifiques : une corrélation entre pays n’est pas une causalité. Un écart absolu peut augmenter pendant qu’un rapport diminue.',
    verifie='L’étude évoquée est très probablement celle de David Hope et Julian Limberg (identification déduite de ses caractéristiques) : sur 18 pays de l’OCDE entre 1965 et 2015, les grandes baisses d’impôts sur les riches augmentent les inégalités de revenus, sans effet significatif sur la croissance ni sur le chômage (' + L('https://doi.org/10.1093/ser/mwab061', 'Socio-Economic Review, 2022, 20(2), 539-559') + '). Une absence d’effet significatif ne prouve pas un effet nul dans tous les contextes.',
    belgique='Le dossier sépare ce que le film mêle : revenus (rapport S80/S20 de 3,25, le plus faible des 27, <a href="#f-europe">fiche 04</a>), patrimoine (<a href="#f-ecarts">fiche 03</a>), pauvreté et redistribution (<a href="#f-pauvrete">fiches 01</a> et <a href="#f-redistribution">02</a>).',
    debat='Réduire la pauvreté, égaliser les chances et limiter la concentration du pouvoir économique sont trois objectifs différents : lequel défend-on ? Le droit de propriété et des sociétés détermine les revenus avant toute redistribution : quelles règles, au bénéfice de qui, à quel coût ?'),
'logement': dict(
    titre='Pourquoi se loger est-il si cher ?', serie='ARTE, collection « 42 »', duree='environ 30 min',
    url='https://www.arte.tv/fr/videos/115519-007-A/pourquoi-se-loger-est-il-si-cher/', piste='sous-titres français',
    angle='Offre, crédit, foncier',
    montre='Une offre lente à réagir, la rareté du foncier, la demande d’investissement, le crédit, le tourisme et les coûts de construction ; les limites de l’étalement urbain, la reconversion de bâtiments, la politique foncière de Vienne et l’adaptation des logements aux étapes de la vie. Un passage porte sur la Belgique (vers 21:00).',
    garder='Le sondage en ligne du début n’est pas représentatif sans sa méthode. Le jugement sur l’urbanisme belge (vers 21:00) est l’avis d’un intervenant, pas un classement démontré. Vers 22:05, un risque futur de bureaux vides ne doit pas devenir une vacance déjà observée. Vienne est un cas à expliquer (accès au parc, financement, durée de constitution) avant d’être transposé.',
    verifie='Le film attribue à l’ONU une projection de 80 % d’urbains dans le monde en 2050 (vers 13:38) ; la révision 2018 des perspectives de l’ONU donne 68 % (55 % en 2018) (' + L('https://population.un.org/WUP/PUBLICATIONS/Files/WUP2018-PressRelease.pdf', 'ONU, World Urbanization Prospects 2018') + '). Sur les « communs » évoqués dans le film : entre propriété privée et absence de règles existe la gestion collective organisée étudiée par Elinor Ostrom (' + L('https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/lecture/', 'conférence Nobel, 2009') + '), ce qui ne prouve pas qu’un tel régime convienne à tout logement.',
    belgique='Une hausse des prix n’a pas le même sens pour un propriétaire, un locataire ou un premier acheteur : le dossier distingue prix et revenus (<a href="#f-acheter">fiche 01</a>), poids du logement chez les locataires (<a href="#f-louer">fiche 02</a>), jeunes (<a href="#f-jeunes">fiche 03</a>) et statut d’occupation (<a href="#f-statut">fiche 04</a>).',
    debat='Qu’est-ce qui renchérit le logement, et pour qui ? Qui décide quels terrains deviennent constructibles, et quels habitants sont peu représentés dans ces décisions ? Une reconversion de bureaux ou une densification se juge avec les transports, les services et la qualité de vie.'),
'education': dict(
    titre='Faut-il repenser l’école ?', serie='ARTE, « Les questions qui fâchent »', duree='environ 28 min',
    url='https://www.arte.tv/fr/videos/127323-005-A/les-questions-qui-fachent/', piste='sous-titres allemands, reformulés en français',
    angle='Notes, sélection, autonomie',
    montre='La chercheuse Michaela Brohm-Badry critique les notes et la sélection précoce au nom de la motivation ; le pédagogue Roland Reichenbach rappelle les fonctions collectives de l’école et le risque que l’autonomie profite surtout aux élèves déjà favorisés. L’Alemannenschule (Allemagne) illustre une autre organisation. Les deux points de vue se rejoignent sur l’importance des enseignants.',
    garder='Les deux intervenants sont filmés séparément : ce n’est pas un débat direct. Les résultats d’un établissement (vers 24:28) ne prouvent pas l’effet de sa pédagogie : recrutement, encadrement, abandons et parcours antérieurs comptent. Vers 08:58, le film note lui-même que supprimer les notes peut déplacer la sélection vers des tests d’employeurs. Les explications sur le cerveau et la synthèse attribuée à John Hattie ne sont pas vérifiées ici.',
    verifie='Aucune vérification externe n’a été menée sur ce programme : il est présenté comme support de discussion.',
    belgique='En Belgique, l’enseignement dépend des Communautés : le dossier distingue les résultats PISA de la Flandre et de la Fédération Wallonie-Bruxelles (<a href="#f-competences">fiche 01</a>), le redoublement (<a href="#f-parcours">fiche 02</a>) et les écarts entre Régions (<a href="#f-regions">fiche 04</a>). L’effet de l’orientation précoce est traité dans la question 2 de la partie Recherche.',
    debat='Que mesure-t-on : acquis, décrochage, bien-être, orientation, mobilité sociale ? Un meilleur bien-être ne prouve pas de meilleurs acquis, ni un meilleur examen une plus grande égalité. Si l’on supprime la note, qui sélectionne ensuite, selon quels critères, avec quels recours ?'),
'sante': dict(
    titre='SOS santé', serie='ARTE Regards', duree='environ 32 min',
    url='https://www.arte.tv/fr/videos/111747-002-A/arte-regards/', piste='sous-titres espagnols, reformulés en français',
    angle='Soignants : former, recruter, répartir les tâches',
    montre='La pratique infirmière avancée à Stuttgart, le recrutement international à Heidelberg (programme Triple Win, parcours bosniens) et une répartition élargie des tâches en Finlande. Le reportage relie effectifs et conditions de travail, et signale le nombre plus faible de soignants par habitant en Bosnie-Herzégovine.',
    garder='Des témoignages de satisfaction ne prouvent ni l’efficacité ni le coût d’une réforme. Une projection de pénurie n’est pas un décompte observé. Le cas finlandais (vers 14:53) comporte une limite de compétence et une orientation vers le médecin : il ne montre pas que les infirmiers remplaceraient les médecins. La remarque salariale (vers 18:33) rappelle que plus de responsabilités a un prix. Vers 27:05, chômage de soignants et besoins non couverts coexistent en Bosnie.',
    verifie='Aucune vérification externe n’a été menée sur ce programme : il est présenté comme support de discussion. Les statuts et compétences infirmiers diffèrent selon les pays et ne se transposent pas à la Belgique.',
    belgique='Le dossier compare les soignants en exercice de la Belgique et de ses voisins (<a href="#f-moyens">fiche 04</a>) : moins de médecins par habitant qu’en Allemagne ou aux Pays-Bas, autant d’infirmiers. Le recrutement de soignants étrangers croise les dossiers <a href="__EMPLOI__#f-ecarts">Emploi</a> et <a href="__IMMIGRATION__#f-flux">Immigration</a>.',
    debat='Qu’appelle-t-on pénurie : manque de diplômés, de postes financés, difficultés de recrutement ou départs du métier ? Élargir les tâches des infirmiers change la formation, la responsabilité et la rémunération : qui en décide ? Recruter à l’étranger : quel bilan pour le migrant, l’employeur et le pays d’origine ?'),
'justice': dict(
    titre='Des prisons sans murs, un autre modèle carcéral', serie='ARTE Regards', duree='environ 33 min',
    url='https://www.arte.tv/fr/videos/111747-003-A/arte-regards/', piste='sous-titres anglais, reformulés en français',
    angle='Prisons ouvertes et réinsertion',
    montre='Seehaus, une structure allemande pour jeunes condamnés, et des prisons ouvertes finlandaises : vie collective, formation, responsabilités et règles strictes au service de la réinsertion. Les rencontres « restauratives » présentées réunissent des personnes concernées par des faits semblables, pas forcément les protagonistes d’une même affaire. Le film montre aussi la sélection à l’entrée et des retours en détention fermée.',
    garder='Les participants sont admis sur examen (vers 10:16) : leurs résultats ne peuvent pas être attribués directement au régime ouvert. Les réussites annoncées (vers 04:07) doivent être rapportées aux sorties du dispositif (vers 19:13) : sans le dénominateur, pas de taux de réussite. L’écart de récidive entre l’Allemagne et la Finlande (vers 13:08) dépend des définitions et de la durée de suivi. Un coût journalier n’est pas un bilan complet.',
    verifie='Aucune vérification externe n’a été menée sur ce programme : les taux cités restent des affirmations attribuées au film.',
    belgique='Le dossier traite la récidive belge et ce que la recherche sait de la prison (<a href="#f-recidive">fiche 03</a> et question 3 de la partie Recherche), et compare la détention belge à celle des 27 (<a href="#f-europe">fiche 04</a>).',
    debat='Réinsérer : comment mesurer un résultat ? Récidive (selon quelle définition, après combien de temps), formation, emploi durable, logement, sécurité. Que veut-on d’une peine : protéger, sanctionner, réinsérer, réparer ? Une justice restaurative suppose le volontariat, un accompagnement et la possibilité de se retirer.'),
}

def section(name, links):
    f = FILMS.get(name)
    if not f:
        return ''
    rows = [('Ce que le film montre', f['montre']), ('À garder en tête', f['garder']), ('Vérifié par Au plus Juste', f['verifie']),
            ('Pour la Belgique', f['belgique']), ('Questions pour le débat', f['debat'])]
    dl = ''.join(f'<dt>{a}</dt><dd>{b}</dd>' for a, b in rows)
    return f'''<!-- Voir et discuter -->
<section class="sec papier pens" id="voir" aria-labelledby="tVo">
  <div class="wrap">
    <span class="kick" data-r>Voir et discuter · documentaire</span>
    <h2 class="giant" id="tVo" data-r>Un documentaire, <span>lu de près.</span></h2>
    <p class="lede" data-r>Un film n’est pas une source primaire. Nous résumons ce qu’il montre, signalons ce qu’il faut vérifier et le relions aux données belges du dossier. Les repères horaires sont indicatifs.</p>
    <div class="pens-list">
      <details class="pen" data-r open>
        <summary><span class="pn-n">{f['titre']}</span><span class="pn-d">{f['serie']} · {f['duree']}</span><span class="pn-t">{f['angle']}</span></summary>
        <dl>{dl}<dt>Voir le film</dt><dd class="pn-src"><a href="{f['url']}" target="_blank" rel="noopener">{f['titre']}</a> ({f['serie']}).</dd></dl>
      </details>
    </div>
    <p class="srcl" data-r>Lecture critique fondée sur les {f['piste']} du programme, consultés le 19 octobre 2026 : il ne s’agit pas d’un visionnage intégral (images, graphiques et génériques non contrôlés). « À garder en tête » et « Questions pour le débat » sont des analyses d’Au plus Juste, distinctes des arguments du film.</p>
  </div>
</section>

'''
