# Veille actualité – brouillon du lundi 26 octobre 2026

Rubrique **Questions** uniquement. Période couverte : 19 au 26 octobre 2026 (Europe/Brussels).
Proposition complète au format de `src/actualite/actu.json` : `veille/actu-2026-10-26.json` (rien n’est modifié dans `src/`).

## 1. Entrées proposées (5)

| Date | Type | Thème | Fait | Question liée | Source consultée |
|---|---|---|---|---|---|
| 23/10 | officiel | immigration | UE, juillet 2026 : 34 145 premières demandes d’asile (−39 % sur un an, −8 % sur un mois). Belgique citée seulement pour 100 demandes de mineurs non accompagnés (5e rang) | `__IMMIGRATION__#f-asile` « Combien de demandes, combien de protections accordées ? » | [Eurostat, news ddn-20261023-1](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20261023-1) |
| 22/10 | presse | finances | Budget fédéral pluriannuel : toujours pas d’accord ; le Premier ministre parle de « phase décisive ». Aucun montant repris | `__FINANCES__#f-dette` | [RTBF, récap du 22/10](https://www.rtbf.be/article/le-recap-de-ce-jeudi-22-octobre-2026-budget-federal-toujours-bloque-tempete-austen-en-approche-et-parcours-du-tour-de-france-2027-devoile-11804364) |
| 21/10 | officiel | finances | Dette trimestrielle BE : **110,2 %** du PIB au T2 2026 (T1 révisé 109,4 %, T2 2025 106,4 %) ; UE 82,9 %, zone euro 88,8 % ; 4e ratio de l’UE | `__FINANCES__#f-dette` | [Eurostat 2-21102026-bp](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-21102026-bp) |
| 21/10 | officiel | finances | Déficit trimestriel CVS BE : **−5,3 %** au T2 2026 (T1 révisé −5,0 %) ; UE −3,5 %, zone euro −3,3 % | `__FINANCES__#f-deficit` « Qui dépense plus qu’il ne perçoit ? » | [Eurostat 2-21102026-cp](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-21102026-cp) |
| 19/10 | presse | sante | Le Conseil général de l’INAMI n’adopte pas le budget soins de santé 2027 : abstention des représentants du gouvernement (unanimité requise) ; la décision revient au gouvernement. Aucun montant repris | `__SANTE__#f-cout` « Combien dépense-t-on, et qui paie ? » | [La Libre, 19/10](https://www.lalibre.be/belgique/politique-belge/2026/10/19/budget-des-soins-de-sante-2027-le-gouvernement-federal-echoue-a-trouver-un-accord-22VFUZUSIBAO7EAME6LYHDIOBU/) ; recoupé par [Mutualités Libres](https://mutualites-libres.prezly.com/budget-de-la-sante-2027-absence-de-decision-en-raison-de-labstention-du-gouvernement) (partie prenante) |

Textes exacts : voir `veille/actu-2026-10-26.json`.

## 2. Entrées à retirer

- **Plus de 4 mois** (avant le 26/06/2026) : 12/06 (pacte migration et asile), 29/05 (réforme des pensions), 01/03 (réforme du chômage).
- **Dépassées par des chiffres révisés** : les deux entrées du 21/07 (dette T1 109,1 % → révisée 109,4 % ; déficit T1 −4,8 % → révisé −5,0 %), remplacées par les entrées T2 ci-dessus.
- **Remplacée** : entrée presse du 15/10 sur le budget fédéral (même sujet, mise à jour au 22/10).

Conséquence : le thème *pensions* n’a plus aucune entrée dans la bande (voir point à vérifier).

## 3. Réponses de questions à mettre à jour

- Aucune réponse de page de faits ne cite le T1 2026 (109,1 % / −4,8 %) : rien à corriger dans `src/dossiers/` pour ces chiffres.
- La fiche Finances `#f-dette` affiche 108,1 % (annuel 2025, notification d’octobre) : toujours exact. Le chiffre trimestriel de 110,2 % ne la remplace pas (ce n’est pas la même mesure : fin de trimestre, PIB des quatre derniers trimestres).
- Le classement « quatrième dette » (`#f-europe`) reste valable au T2 2026.

## 4. Rien de neuf (vérifié) cette semaine

- Eurostat euro-indicateurs : après le 21/10, seule la production dans la construction (20/10), hors thèmes. Inflation, chômage de septembre : pas encore publiés (fin octobre / début novembre).
- Pas trouvé de publication Statbel, BNB ou Bureau du Plan sur les thèmes du site pendant la période (le calendrier Statbel n’a pas pu être lu : page protégée).
- Pas d’arrêt de la Cour constitutionnelle ni de loi au Moniteur repérés sur les thèmes suivis (recherche non exhaustive).

## À vérifier par Tom

1. **Asile, chiffre belge** : le nombre belge de premières demandes en juillet 2026 n’est pas dans le communiqué. Je n’ai pas pu lire la base `migr_asyappctzm` (accès refusé). À ajouter à l’entrée du 23/10 seulement si tu le lis toi-même.
2. **Date des communiqués du 21/10** : la date est confirmée par la liste des euro-indicateurs Eurostat ; les pages elles-mêmes n’affichent pas de date.
3. **INAMI** : pas de communiqué officiel de l’INAMI trouvé, d’où le type « presse ». Le montant d’économies de 141,5 millions cité par La Libre et les Mutualités Libres n’est pas repris (règle presse). Si l’INAMI publie un communiqué, remplace la source.
4. **Trois entrées finances le 21/10** (notification annuelle déjà en ligne + dette T2 + déficit T2) : tu peux les fusionner pour ne pas saturer la bande.
5. **Pensions** : plus aucune entrée une fois celle du 29/05 retirée. Tu peux la garder exceptionnellement si tu veux que le thème reste visible.
6. **Finances, fiche 03** : le titre affiche « 54,1 % du PIB dépensés » (COFOG 2024), alors que l’accueil et le reste du dossier donnent 54,4 % (total 2025). La source est bien indiquée, mais la différence d’année peut dérouter.
7. **Budget fédéral (presse)** : l’article RTBF évoque une dette « au-delà de 110 % du PIB ». Ce chiffre n’est pas repris depuis la presse ; il correspond au chiffre officiel du T2 (110,2 %), cité dans l’entrée Eurostat.
