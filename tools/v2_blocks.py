# Insère les composants pédagogiques V2 dans les dossiers (exécuté une fois).
from pathlib import Path
S=Path(__file__).resolve().parents[1]/'src'/'dossiers'

def twomin(q,ans,keys,num,numlab,numsrc,warn,concl):
    k=''.join(f'<li>{x}</li>' for x in keys)
    return f'''<!-- V2 · Niveau 1 : comprendre en deux minutes -->
<section class="twomin" aria-labelledby="t2min">
  <div class="wrap tm">
    <div>
      <span class="kick">Comprendre en deux minutes</span>
      <h2 id="t2min">{q}</h2>
      <p class="ans">{ans}</p>
      <ol class="keys" aria-label="Trois idées à retenir">{k}</ol>
      <a class="deeper" href="#approfondir">Approfondir ↓</a>
    </div>
    <aside>
      <div class="tm-num"><b>{num}</b><span>{numlab}</span><small>{numsrc}</small></div>
      <p class="tm-warn"><b>L’erreur la plus fréquente :</b> {warn}</p>
      <p class="tm-concl">{concl}</p>
    </aside>
  </div>
</section>
<div id="approfondir" aria-hidden="true"></div>

'''

def canwhat(title,yes,no,more):
    li=lambda xs:''.join(f'<li>{x}</li>' for x in xs)
    return f'''
    <div class="canwhat" data-r><p class="cw-t">{title}</p><div class="cw-yes"><h4>Ce qu’il permet de dire</h4><ul>{li(yes)}</ul></div><div class="cw-no"><h4>Ce qu’il ne permet pas de dire</h4><ul>{li(no)}</ul></div><div class="cw-more"><h4>Pour aller plus loin</h4><ul>{li(more)}</ul></div></div>
'''

def why(blocks):
    h=''.join(f'<h3>{t}</h3><p>{p}</p>' for t,p in blocks)
    return f'\n    <div class="why" id="why" hidden>{h}</div>'

def quiz(items):
    out=''
    for i,(q,ok,opts,mech) in enumerate(items):
        bt=''.join(f'<button type="button" data-k="{k}" aria-pressed="false">{t}</button>' for k,t,_ in opts)
        fb=''.join(f'<p class="qfb" data-k="{k}" hidden>{"<b>Exact.</b> " if k==ok else "<b>Pas tout à fait.</b> "}{e}</p>' for k,_,e in opts)
        out+=f'''<div class="qz" data-ok="{ok}" data-r><p class="qq">{i+1}. {q}</p><div class="qopts" role="group" aria-label="Réponses possibles">{bt}</div>{fb}<p class="qmech" hidden><b>Le mécanisme à retenir :</b> {mech}</p><p class="qlive" aria-live="polite"></p></div>
'''
    return f'''<!-- V2 · Vérifier sa compréhension -->
<section class="sec papier check" aria-labelledby="tCk">
  <div class="wrap">
    <span class="kick" data-r>Vérifier sa compréhension · questions de transfert</span>
    <h2 class="giant" id="tCk" data-r>Et ailleurs, <span>ça marche comment ?</span></h2>
    <p class="lede" data-r>Ces questions ne testent pas la mémoire des chiffres : elles vérifient qu’on sait appliquer le mécanisme à une situation nouvelle. Chaque réponse est expliquée.</p>
    {out}  </div>
</section>

'''

def decide(title,intro,opts,trade,note):
    o=''
    for t,mech,doc,unc,arb in opts:
        o+=f'<article class="opt" data-r><h3>{t}</h3><dl><dt>Le mécanisme</dt><dd>{mech}</dd><dt>Ce qui est documenté</dt><dd>{doc}</dd><dt>Ce qui reste incertain</dt><dd>{unc}</dd><dt>Ce qu’on sacrifie</dt><dd>{arb}</dd></dl></article>'
    rows=''.join(f'<tr><td>{a}</td><td>{b}</td></tr>' for a,b in trade)
    return f'''<!-- V2 · Du chiffre à la décision -->
<section class="sec brun grain decide" id="decision" aria-labelledby="tDc">
  <div class="wrap">
    <span class="kick" data-r>Du chiffre à la décision</span>
    <h2 class="giant" id="tDc" data-r>{title}</h2>
    <p class="lede" data-r>{intro}</p>
    <div class="opts4">{o}</div>
    <div class="trade" data-r><h3 class="sub">Les arbitrages : on ne peut pas tout maximiser à la fois</h3><table><thead><tr><th scope="col">Si l’on privilégie…</th><th scope="col">… on prend le risque de sacrifier</th></tr></thead><tbody>{rows}</tbody></table></div>
    <p class="maj">{note}</p>
  </div>
</section>

'''

DOC='<span class="ev doc">documenté</span>'
HYP='<span class="ev hyp">hypothèse</span>'

def put(s,anchor,block,after=False):
    assert s.count(anchor)==1,(anchor[:60],s.count(anchor))
    return s.replace(anchor,anchor+block if after else block+anchor)

# ---------------- EMPLOI ----------------
p=S/'emploi-body.html';s=p.read_text(encoding='utf-8')
s=put(s,'<!-- 2. Sommaire -->',twomin(
 'Qui travaille en Belgique, qui ne travaille pas, et pourquoi ?',
 'En 2025, 72,8 % des 20-64 ans ont un emploi, contre 76,1 % dans l’Union. Le chômage (6,2 %) est proche de la moyenne européenne : l’écart vient surtout des personnes hors du marché du travail, notamment les malades de longue durée (576 643 personnes en invalidité fin 2025), et il se concentre chez les peu diplômés, les personnes nées hors de l’Union et les 55-64 ans.',
 ['Chômage et inactivité sont deux choses différentes : une personne en invalidité ne cherche pas d’emploi, elle n’est donc pas « chômeuse ».',
  'Le taux d’emploi progresse depuis trente ans (61,2 % en 1993), presque entièrement grâce aux femmes et aux 55-64 ans.',
  'Les trois Régions vivent des réalités très différentes : 77,3 % d’emploi en Flandre, 67,9 % en Wallonie, 63,9 % à Bruxelles.'],
 '72,8 %','des 20-64 ans en emploi en 2025 (Union : 76,1 %)','Eurostat, lfsi_emp_a',
 'comparer directement chômeurs et invalides, ou le chômage de Statbel et celui des services régionaux : ils ne comptent pas la même chose.',
 'L’écart avec l’Europe tient moins au chômage qu’au nombre de personnes hors de l’emploi ; ses causes sont débattues.'))
s=put(s,'<div class="gapwrap">',canwhat('Le taux d’emploi',
 ['Quelle part des 20-64 ans a travaillé au moins une heure pendant la semaine de référence.','Comment la Belgique et ses Régions se situent, avec une définition commune à toute l’Union.','L’évolution dans le temps, en tenant compte des ruptures de série.'],
 ['Si les emplois sont à temps plein, bien payés ou de bonne qualité.','Pourquoi un groupe travaille moins qu’un autre.','Si la population vit mieux : un taux d’emploi plus élevé ne prouve ni de meilleurs salaires ni moins d’inégalités.'],
 ['Le temps partiel et les heures travaillées.','Le taux d’emploi en équivalent temps plein.','Les salaires et la pauvreté des travailleurs.']))
s=put(s,'<div class="regs" data-r>',canwhat('Le nombre de personnes en invalidité',
 ['Combien de personnes sont reconnues incapables de travailler depuis plus d’un an et indemnisées par l’INAMI.','Comment ce nombre évolue, et quelles grandes causes médicales sont déclarées.'],
 ['Combien de ces personnes pourraient travailler, et à quelles conditions.','Ce qui vient de la santé, des conditions de travail ou des règles des autres régimes (chômage, pensions).','Si la Belgique fait « pire » que ses voisins : chaque pays organise autrement la protection en cas de maladie.'],
 ['Les entrées et sorties d’invalidité chaque année.','Les reprises partielles du travail autorisées.','Les données par secteur et par métier.']))
s=s.replace('<button type="button" class="betb" data-b="c">','<button type="button" class="betb" data-b="c" data-reveal="why">').replace('<button type="button" class="betb" data-b="e">','<button type="button" class="betb" data-b="e" data-reveal="why">').replace('<button type="button" class="betb" data-b="i">','<button type="button" class="betb" data-b="i" data-reveal="why">')
s=put(s,'<p class="verdict note" id="verdict" hidden></p>',why([
 ('Pourquoi la réponse surprend','On pense spontanément au chômage comme principale forme de non-emploi. En Belgique, les personnes en incapacité de travail de longue durée sont pourtant plus nombreuses que les chômeurs.'),
 ('La confusion à éviter','Les deux chiffres ne viennent pas de la même source : le chômage vient d’une enquête auprès des ménages (15-74 ans), l’invalidité des registres de l’INAMI (tous âges, indépendants compris). Le rapport de 1,7 donne un ordre de grandeur, pas une comparaison exacte.'),
 ('Le mécanisme','Pour être « chômeur » au sens du BIT, il faut chercher un emploi et être disponible. Une personne malade de longue durée ne cherche pas : elle est comptée comme « inactive ». C’est pourquoi le chômage peut baisser sans que l’emploi augmente.'),
 ('Pour réutiliser cette idée','Face à un taux de chômage qui baisse, demandez toujours : le taux d’emploi a-t-il augmenté, ou des personnes sont-elles sorties de la population active ?')]),after=True)
s=put(s,'<!-- 11. Citer -->',quiz([
 ('Dans un pays, le taux de chômage passe de 8 % à 6 %, mais le taux d’emploi ne bouge pas. Que s’est-il le plus probablement passé ?','b',
  [('a','Davantage de personnes ont trouvé un emploi.','Si c’était le cas, le taux d’emploi aurait augmenté. Il est resté stable.'),
   ('b','Des chômeurs ont cessé de chercher un emploi ou sont passés en inactivité (maladie, études, découragement).','Ces personnes ne sont plus comptées dans la population active : le chômage baisse sans création d’emploi.'),
   ('c','La population totale a diminué.','Les deux indicateurs sont des proportions : une baisse de population ne fait pas baisser l’un sans l’autre.')],
  'le chômage est une part de la population active (ceux qui travaillent ou cherchent). Quitter la population active fait baisser le chômage sans créer d’emploi. Il faut donc toujours lire chômage et emploi ensemble.'),
 ('Pour une même commune, le service régional de l’emploi publie 12 % de demandeurs d’emploi et l’enquête de Statbel 8 % de chômage. Qui se trompe ?','c',
  [('a','Le service régional, qui gonfle les chiffres.','Il ne se trompe pas : il compte les personnes inscrites, ce qui n’est pas la même population.'),
   ('b','Statbel, dont l’enquête repose sur un échantillon.','L’échantillon introduit une marge d’erreur, mais pas un écart systématique de cette taille.'),
   ('c','Personne : les deux chiffres ne mesurent pas la même chose.','Le premier compte les inscrits (dont certains travaillent quelques heures), le second les personnes sans emploi qui cherchent et sont disponibles.')],
  'avant de comparer deux chiffres qui portent le même nom, vérifiez leur source et leur définition. « Chômage » peut désigner un registre administratif ou une enquête.')]))
s=put(s,'<!-- 8. Lectures -->',decide('Que peuvent faire <span>les pouvoirs publics ?</span>',
 'Trois grands leviers sont discutés dans le débat belge. Pour chacun : ce qu’on sait de ses effets, ce qui reste incertain, et ce qu’il coûte en contrepartie. Le site ne recommande aucune option.',
 [('Accompagner et former les chercheurs d’emploi','Aider à trouver un emploi ou à acquérir des compétences (compétence des Régions).',f'{DOC} Effet moyen faible à court terme, plus positif deux à trois ans après, surtout pour la formation, les femmes et les chômeurs de longue durée (Card, Kluve et Weber, 2018).','L’efficacité des programmes belges précis est peu évaluée publiquement.','Un coût budgétaire immédiat pour un effet différé.'),
  ('Limiter ou réduire les allocations','Rendre la recherche d’emploi plus urgente (compétence fédérale).',f'{DOC} Des allocations plus longues allongent en général la période sans emploi (Schmieder et von Wachter, 2016). {DOC} La dégressivité renforcée de 2012 n’a pas augmenté les sorties vers l’emploi en Belgique (ONEM, 2022).',f'{HYP} Une partie des personnes pourrait basculer vers l’invalidité ou le CPAS (lien suggéré par la chronologie, De Brouwer et Tojerow, 2023). Les effets de la limitation de 2026 ne sont pas encore connus.','La protection des revenus, et parfois la qualité de l’emploi retrouvé (Nekoei et Weber, 2017).'),
  ('Prévenir et réintégrer les malades de longue durée','Agir sur les conditions de travail et le retour progressif à l’emploi (fédéral, mutualités, employeurs).',f'{DOC} Les règles et les incitants des systèmes de maladie influencent les sorties durables de l’emploi (OCDE, 2010).','L’effet des trajets de réintégration belges n’est pas encore établi par des évaluations publiées.','Un contrôle accru peut être vécu comme de la méfiance envers des personnes réellement malades.')],
 [('Inciter à reprendre vite un emploi','La protection des revenus et le temps de trouver un emploi adapté'),('Contrôler davantage','La confiance et l’accompagnement'),('Réduire la dépense à court terme','L’investissement dans la formation, qui paie plus tard')],
 'Les effets cités viennent de la partie Recherche, avec leurs sources. « Documenté » signifie établi par des études ; « hypothèse » signifie plausible mais non démontré.'))
p.write_text(s,encoding='utf-8')

# ---------------- FINANCES ----------------
p=S/'finances-body.html';s=p.read_text(encoding='utf-8')
s=put(s,'<!-- 1b. Préambule -->',twomin(
 'La dette publique belge est-elle un problème ?',
 'Elle est élevée (107,9 % du PIB contre 81,7 % dans l’Union) et remonte depuis 2023, avec un déficit de 5,2 % du PIB et des intérêts en hausse (14,3 milliards d’euros en 2025). Mais une dette n’est ni bonne ni mauvaise en soi : tout dépend de ce qu’elle finance, de ce qu’elle coûte et de la capacité à la porter. La Belgique a d’ailleurs déjà réduit sa dette de 50 points entre 1993 et 2007.',
 ['Le déficit est un flux (ce qui manque sur un an), la dette un stock (l’accumulation des déficits passés).',
  'La dette baisse si la croissance dépasse le taux d’intérêt et si le budget hors intérêts est équilibré. En 2025, le déficit hors intérêts (3,0 % du PIB) la fait monter.',
  'L’essentiel de la dette est fédéral, mais celle des Communautés et des Régions a presque doublé en dix ans.'],
 '107,9 %','de dette publique en % du PIB, fin 2025 (Union : 81,7 %)','Eurostat, gov_10dd_edpt1',
 'diviser la dette par habitant (58 000 €) comme si chacun la devait, ou lire une note d’agence comme un fait.',
 'Aucun seuil de dette « sûr » ne fait consensus : ce qui compte est la trajectoire, le coût et l’usage de l’argent emprunté.'))
s=put(s,'<h3 class="sub" data-r>Qui porte la dette ?</h3>',canwhat('La dette en % du PIB',
 ['Ce que les pouvoirs publics doivent, rapporté à la richesse produite en une année.','Comment la Belgique se situe en Europe, avec la définition commune du traité de Maastricht.','La tendance sur longue période.'],
 ['Si la dette est soutenable : cela dépend du taux d’intérêt, de la croissance, des échéances et de la confiance des prêteurs.','Ce que possèdent les pouvoirs publics : c’est une dette brute, les actifs ne sont pas déduits.','Ce que la dette a financé : investissement ou dépenses courantes.'],
 ['La charge d’intérêts et le taux moyen payé.','Le solde hors intérêts (solde primaire).','L’investissement public (fiche 05).']))
s=put(s,'<div class="trap" data-r><span class="note">piège !</span><p>Le déficit de 2023',canwhat('Le déficit public',
 ['L’écart, sur une année, entre les recettes et les dépenses de toutes les administrations.','La position de la Belgique par rapport à la valeur de référence européenne de 3 %.'],
 ['Quelle part vient de la conjoncture (une récession creuse le déficit) et quelle part est durable.','Quel niveau de pouvoir est responsable, sans la répartition par sous-secteur.','Si l’argent finance des investissements ou des dépenses courantes.'],
 ['Le solde structurel, corrigé de la conjoncture.','Le solde primaire, hors intérêts.','Le solde de chaque niveau de pouvoir.']))
s=s.replace('<button class="pill cream" id="reveal" type="button">','<button class="pill cream" id="reveal" type="button" data-reveal="why">')
s=put(s,'<p class="verdict note" id="verdict" hidden></p>',why([
 ('Pourquoi on se trompe souvent','Un montant en milliards ne dit rien seul. Le bon repère est la richesse produite : 14,3 milliards représentent 2,2 % du PIB, beaucoup moins qu’en 1995 (9,0 %).'),
 ('Le mécanisme','La charge d’intérêts dépend du montant de la dette et du taux moyen payé. La dette est refinancée petit à petit : une hausse des taux ne se répercute que progressivement, à mesure que d’anciens emprunts bon marché sont remplacés.'),
 ('Pour réutiliser cette idée','Devant un montant budgétaire, rapportez-le au PIB ou au budget total, et comparez-le dans le temps. C’est la seule façon de savoir s’il est « grand ».')]),after=True)
s=put(s,'<!-- 12. Citer -->',quiz([
 ('Un pays a une dette de 100 % du PIB. Sa croissance (inflation comprise) est de 4 %, le taux d’intérêt moyen sur sa dette de 2 %, et son budget hors intérêts est équilibré. Que devient sa dette en % du PIB ?','b',
  [('a','Elle augmente, puisque le pays paie des intérêts.','Les intérêts augmentent la dette en euros, mais le PIB augmente plus vite : le ratio baisse.'),
   ('b','Elle baisse, d’environ 2 points.','La croissance (4 %) dépasse le taux d’intérêt (2 %) : (2 − 4) / 1,04 × 100 ≈ −1,9 point.'),
   ('c','Elle reste stable.','Elle resterait stable si le taux d’intérêt était égal à la croissance.')],
  'quand la croissance dépasse le taux d’intérêt, l’effet « boule de neige » joue en faveur du pays : la dette baisse en % du PIB même sans excédent. C’est l’inverse quand les taux dépassent la croissance, comme en Belgique dans les années 1980.'),
 ('Deux gouvernements empruntent chacun 1 milliard. Le premier construit une ligne de tram utilisée pendant 40 ans, le second paie les dépenses courantes de l’année. Qu’est-ce qui les distingue ?','b',
  [('a','Rien : 1 milliard de dette reste 1 milliard de dette.','La dette est la même, mais ce qu’elle laisse aux générations suivantes ne l’est pas.'),
   ('b','La dette est identique, mais le premier finance un équipement qui rendra des services à ceux qui la rembourseront.','C’est l’idée de la « règle d’or » : étaler le coût d’un investissement sur ceux qui en profitent.'),
   ('c','Le second est interdit par les règles européennes.','Les règles européennes portent sur le déficit et la dette totaux, pas sur l’usage de l’argent emprunté.')],
  'pour juger une dette, regardez ce qu’elle finance et ce qu’elle rapportera, pas seulement son montant. Un investissement mal choisi peut toutefois ne rien rapporter.')]))
s=put(s,'<!-- 9. Lectures -->',decide('Réduire la dette : <span>quatre options, aucune gratuite.</span>',
 'Pour ramener le déficit vers 3 % du PIB et stabiliser la dette, quatre grandes options sont combinables. Pour chacune : le mécanisme, ce que la recherche documente, ce qui reste incertain et ce qu’on sacrifie. Le site ne recommande aucune option : le choix dépend des objectifs qu’on privilégie.',
 [('Réduire les dépenses','Moins de dépenses publiques, donc un déficit hors intérêts plus faible.',f'{DOC} Selon Alesina, Favero et Giavazzi (2019), les plans fondés sur la baisse des dépenses coûtent moins de croissance que ceux fondés sur les hausses d’impôts. {DOC} En pleine crise, l’austérité a coûté plus de croissance que prévu (Blanchard et Leigh, 2013).','Les méthodes de ces études sont contestées, et aucune ne porte spécifiquement sur la Belgique. Couper dans l’investissement peut freiner la croissance future.','Des services publics ou des prestations sociales, selon les dépenses visées.'),
  ('Augmenter les recettes','Plus d’impôts ou de cotisations, donc plus de recettes.',f'{DOC} Les recettes publiques belges sont déjà élevées : 49,0 % du PIB en 2025, contre 46,4 % dans l’Union (Eurostat). {DOC} Les plans fondés sur les impôts seraient plus coûteux en croissance (Alesina et al., 2019, résultat discuté).','L’effet dépend de l’impôt choisi : revenus, patrimoine, consommation ou entreprises ne pèsent pas sur les mêmes personnes.','Le pouvoir d’achat ou la compétitivité, selon qui paie.'),
  ('Miser sur la croissance et l’investissement','Si l’économie croît plus vite que le taux d’intérêt, la dette baisse en % du PIB.',f'{DOC} L’investissement public augmente la production à court et à long terme, surtout s’il est efficace (Abiad, Furceri et Topalova, 2016).',f'{HYP} Que la croissance suffise à compenser le déficit actuel : en 2025, elle dépassait le taux d’intérêt, mais la dette a quand même augmenté de 4 points.','Une dette plus élevée à court terme, en pariant sur un rendement futur.'),
  ('Étaler l’ajustement dans le temps','Corriger le déficit progressivement plutôt que brutalement.','Le cadre européen réformé en 2024 prévoit une trajectoire d’ajustement de 4 ans, prolongeable jusqu’à 7 ans.','Si les taux d’intérêt montent pendant l’ajustement, la facture s’alourdit : les intérêts ont déjà augmenté de 66 % depuis 2021.','La rapidité de la réduction de la dette, et une partie des marges en cas de nouvelle crise.')],
 [('Réduire vite la dette','La croissance à court terme et l’emploi'),('Protéger les services publics et la sécurité sociale','La stabilité des prélèvements, ou la vitesse de l’ajustement'),('Léguer moins de dette aux générations futures','Les investissements faits pour elles : écoles, climat, infrastructures'),('Respecter strictement les règles européennes','Des marges budgétaires en cas de crise')],
 'Les effets cités viennent de la partie Recherche et de la fiche 05, avec leurs sources. « Documenté » signifie établi par des études ou des statistiques officielles ; « hypothèse » signifie plausible mais non démontré.'))
p.write_text(s,encoding='utf-8')

# ---------------- PENSIONS ----------------
p=S/'pensions-body.html';s=p.read_text(encoding='utf-8')
s=put(s,'<!-- 1b. Préambule : comment ça marche -->',twomin(
 'Y aura-t-il encore des pensions demain, et à quel niveau ?',
 'Oui : la pension légale fonctionne par répartition, et les projections officielles annoncent un coût plus élevé, pas une disparition. Le vieillissement est réel (31,8 personnes de 65 ans et plus pour 100 de 15 à 64 ans en 2025, 48,3 projetées en 2070) et prévu de longue date. Le risque de pauvreté des aînés a fortement baissé (9,3 %), mais la pension remplace une part plus faible du revenu de fin de carrière qu’ailleurs en Europe (48 % contre 60 %).',
 ['En répartition, les cotisations d’aujourd’hui paient les pensions d’aujourd’hui : c’est un contrat entre générations.',
  'Le coût futur dépend autant de l’emploi et de la productivité que de la démographie.',
  'Reculer l’âge augmente l’emploi des aînés, mais une partie des personnes passe par le chômage ou la maladie.'],
 '31,8 → 48,3','personnes de 65 ans et plus pour 100 de 15 à 64 ans, 2025 puis 2070 (projection)','Eurostat, demo_pjanind et proj_23ndbi',
 'lire le taux de dépendance comme le nombre de cotisants par pensionné : il compare des âges, pas des personnes qui travaillent.',
 'La question n’est pas « pension ou pas », mais quel niveau, pour qui, et qui finance la hausse : un choix de valeurs autant que de chiffres.'))
s=put(s,'<ol class="epochs">',canwhat('Le taux de dépendance des âgés',
 ['Comment évolue la structure par âge de la population.','Comment la Belgique se compare à d’autres pays, avec la même définition.'],
 ['Combien de personnes cotisent réellement et combien touchent une pension.','Ce que chaque travailleur produira : la productivité compte autant que le nombre.','Le coût futur des pensions, qui dépend aussi des règles et des montants.'],
 ['Le taux d’emploi par âge.','Le rapport entre cotisants et pensionnés.','Les projections de coût du Comité d’étude sur le vieillissement.']))
s=put(s,'<div class="trap dark-trap" data-r><span class="note">attention</span><p>L’écart de pension',canwhat('Le risque de pauvreté des 65 ans et plus',
 ['Quelle part des aînés a un revenu inférieur à 60 % du revenu médian du pays.','Comment cette part évolue et se compare à l’Europe.'],
 ['Si les aînés vivent mieux en absolu : le seuil est relatif et bouge avec les revenus des autres.','Ce que rapporte le fait d’être propriétaire de son logement, non compté dans le revenu.','Le patrimoine ou les privations réelles.'],
 ['La privation matérielle et sociale.','Les revenus selon les trois piliers.','Le patrimoine des ménages âgés.']))
s=s.replace('<button class="pill cream" id="reveal" type="button">','<button class="pill cream" id="reveal" type="button" data-reveal="why">')
s=put(s,'<p class="verdict note" id="verdict" hidden></p>',why([
 ('Le mécanisme','Deux tendances se cumulent : on vit plus longtemps, et les générations nombreuses nées après 1945 arrivent à 65 ans, tandis que les suivantes sont moins nombreuses.'),
 ('Pourquoi cela ne signifie pas la faillite','En répartition, le financement dépend du nombre de personnes qui travaillent réellement et de ce qu’elles produisent, pas seulement de leur âge. Plus d’emploi ou plus de productivité compensent en partie le vieillissement.'),
 ('Pour réutiliser cette idée','Devant un ratio démographique, demandez toujours : combien de ces personnes travaillent, et combien produisent-elles ?')]),after=True)
s=put(s,'<!-- 11. Citer -->',quiz([
 ('Deux pays ont le même taux de dépendance : 35 personnes de 65 ans et plus pour 100 de 15 à 64 ans. Dans le pays A, 80 % des 15-64 ans travaillent ; dans le pays B, 60 %. Lequel finance le plus facilement ses pensions par répartition ?','a',
  [('a','Le pays A.','Avec plus de personnes en emploi, il y a plus de cotisants pour chaque pensionné.'),
   ('b','Le pays B.','Moins de personnes travaillent : chaque pension repose sur moins de cotisants.'),
   ('c','Aucune différence : le taux de dépendance est le même.','Le taux de dépendance compare des âges ; ce qui finance les pensions, ce sont les personnes qui travaillent.')],
  'en répartition, ce qui compte est le rapport entre ceux qui travaillent et ceux qui sont pensionnés, et ce que produit chaque travailleur. Augmenter l’emploi est un levier aussi puissant que la démographie.'),
 ('Le risque de pauvreté des aînés passe de 15 % à 9 % en deux ans. Peut-on en conclure que les pensionnés vivent mieux ?','b',
  [('a','Oui, c’est certain.','Pas forcément : l’indicateur est relatif et peut bouger sans que la situation des aînés change.'),
   ('b','Probablement en partie, mais il faut vérifier : le seuil dépend aussi des revenus du reste de la population, et le logement n’est pas compté.','C’est la lecture prudente : il faut croiser avec la privation matérielle ou les montants des pensions.'),
   ('c','Non, cet indicateur ne dit rien des pensionnés.','Il dit quelque chose d’important, mais pas tout.')],
  'un indicateur relatif (« moins de 60 % du revenu médian ») mesure une position par rapport aux autres, pas un niveau de vie absolu. Il faut le lire avec d’autres indicateurs.')]))
s=put(s,'<!-- 8. Lectures -->',decide('Quatre leviers, <span>et aucun sans contrepartie.</span>',
 'Dans un système par répartition, il n’existe que quelques leviers pour équilibrer les comptes. Pour chacun : le mécanisme, ce qui est documenté, ce qui reste incertain et ce qu’on sacrifie. Le site ne recommande aucune combinaison.',
 [('Travailler plus longtemps','Reculer l’âge ou rendre les départs anticipés moins avantageux : plus de cotisants, moins d’années de pension.',f'{DOC} En Autriche, reculer l’âge de retraite anticipée a augmenté l’emploi des aînés, mais aussi fortement leur chômage (Staubli et Zweimüller, 2013). La Belgique passe à 67 ans en 2030 et a voté un bonus-malus en 2026.','Les effets de la réforme belge de 2026 ne sont pas encore observables.','Les personnes aux carrières pénibles ou en moins bonne santé, qui peuvent difficilement travailler plus longtemps.'),
  ('Augmenter les recettes','Plus de cotisations ou plus d’impôts affectés aux pensions.','Les recettes publiques belges sont déjà élevées (49,0 % du PIB en 2025, contre 46,4 % dans l’Union).','L’effet sur l’emploi dépend de la manière de prélever : cotisations sur le travail ou impôts plus larges.','Le pouvoir d’achat des actifs, ou d’autres dépenses publiques.'),
  ('Ajuster le niveau des pensions','Indexer moins vite ou revoir le calcul des pensions.','La pension remplace déjà une part plus faible du revenu qu’ailleurs (48 % contre 60 % dans l’Union, Eurostat).','L’effet sur la pauvreté des aînés, qui vient de baisser fortement.','Le niveau de vie des pensionnés, surtout des femmes, dont les pensions sont déjà plus basses.'),
  ('Augmenter l’emploi et la productivité','Plus de personnes au travail et plus de richesse produite par travailleur : plus de cotisations sans changer les règles.',f'{DOC} Selon le Comité d’étude sur le vieillissement, une productivité plus faible ferait passer le coût du vieillissement de 1,5 à 3,3 points de PIB d’ici 2070 (simulation).','Il est difficile de garantir une hausse de la productivité par la politique publique.','Des investissements (formation, innovation) dont le rendement est lent et incertain.')],
 [('Garantir des pensions élevées','Un coût plus lourd pour les actifs'),('Alléger la charge des actifs','Le niveau de vie des pensionnés'),('Un âge de départ identique pour tous','La prise en compte des métiers pénibles et des carrières courtes'),('L’équité entre générations','La stabilité des règles pour ceux qui approchent de la pension')],
 '« Documenté » signifie établi par des études ou des statistiques officielles. Les effets cités viennent de la partie Recherche et des fiches, avec leurs sources.'))
p.write_text(s,encoding='utf-8')
print('ok')
