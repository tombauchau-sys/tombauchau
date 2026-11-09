# Veille actualité – brouillon du lundi 9 novembre 2026

Rubrique **Questions** uniquement. Période couverte : 2 au 9 novembre 2026 (Europe/Brussels).
Proposition complète au format de `src/actualite/actu.json` : `veille/actu-2026-11-09.json` (rien n’est modifié dans `src/`).

**Base utilisée :** la proposition `veille/actu-2026-11-02.json` (branche `veille/2026-11-02`), qui reprend déjà celle du 26/10. **Ni l’une ni l’autre n’est fusionnée dans `main`** : en ligne, la bande d’actualité affiche toujours la version du 21/10.

**Comme la semaine dernière, aucune page officielle n’a pu être lue.** Eurostat, Statbel et la BNB ont été refusés pendant cette exécution automatique (demande d’autorisation restée sans réponse). Je ne propose donc **aucun nouveau chiffre**.

## 1. Entrée proposée (1)

| Date | Type | Thème | Fait | Question liée | Sources lues |
|---|---|---|---|---|---|
| 06/11 | presse | finances | Le Roi refuse la démission du Premier ministre, présentée le 2/11 après l’échec des négociations budgétaires ; les cinq présidents de parti de la majorité s’engagent à conclure ; rapport au Roi le **16 novembre**. Aucun montant repris | `__FINANCES__#f-dette` | [L’Avenir, 06/11](https://www.lavenir.net/actu/belgique/politique/2026/11/06/le-roi-refuse-la-demission-de-bart-de-wever-les-negociations-budgetaires-vont-reprendre-O76ZXQA33JDXVBYGN3ZIJ6E4GQ/) ; [Paris Match, 06/11](https://www.parismatch.be/actualites/politique/2026/11/06/le-roi-a-refuse-la-demission-de-bart-de-wever-IPPE6LHZGFCVHI44PQL3YGXC6E/) |

Elle **remplace** l’entrée presse du 02/11 (démission « a priori », non confirmée à l’époque). Les deux articles concordent et citent un communiqué du Palais (« Tous ont réaffirmé leur détermination à parvenir à un accord sur une trajectoire budgétaire solide pour les trois prochaines années »). Texte exact : voir le fichier JSON.

## 2. Publications officielles repérées mais NON LUES

| Date | Thème | Publication | Ce que l’on sait | À lire |
|---|---|---|---|---|
| 30/10 | emploi | Eurostat, chômage de septembre 2026 | Chiffre belge inconnu | [3-30102026-bp](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/3-30102026-bp) ou [une_rt_m](https://ec.europa.eu/eurostat/databrowser/view/une_rt_m/default/table?lang=fr) |
| 30/10 | finances | Eurostat, PIB 3e trimestre 2026 (estimation rapide) | Chiffre belge inconnu ; trimestre non confirmé | [2-30102026-ap](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-30102026-ap) ; BNB |
| 29/10 | — | Statbel, inflation d’octobre 2026 | VRT NWS (lu) attribue à Statbel **5,26 %** (4,69 % en septembre) et un indice santé à 4,53 %. **Chiffres de presse, non repris** | [Statbel, IPC](https://statbel.fgov.be/fr/themes/prix-a-la-consommation/indice-des-prix-la-consommation) |
| ~27/11 | — | Statbel, inflation de novembre | À venir | — |

## 3. Entrées à retirer

- **Plus de 4 mois** : l’entrée du **03/07** (procédure de déficit excessif mise en suspens) — retirée de la proposition.
- **Remplacée** : entrée presse du 02/11 (budget), par celle du 06/11.
- Rappel (déjà fait sur les branches précédentes, toujours présent sur `main`) : 21/07 ×2, 12/06, 29/05, 01/03.
- Prochaine échéance : 01/09 (Code pénal) atteindra 4 mois le 01/01/2027.

## 4. Réponses de questions à mettre à jour

- Rien de vérifiable sans lecture des pages officielles. À contrôler dès que possible : fiche chômage (5,9 % en août) face au chiffre de septembre ; question PIB face au 3e trimestre.

## À vérifier par Tom

1. **Fusion en attente** : `veille/2026-10-26` et `veille/2026-11-02` ne sont pas dans `main`. La proposition du 09/11 contient toutes leurs entrées encore valables ; tu peux ne fusionner que celle-ci.
2. **Communiqué du Palais** : je ne l’ai lu que cité par la presse. Si possible, lie directement le communiqué du Palais royal (monarchie.be) plutôt que la presse — l’entrée pourrait alors passer en type « officiel ».
3. **Douzièmes provisoires** : Paris Match écrit que 2027 commencera sous douzièmes provisoires, confirmé par le Premier ministre à la Chambre jeudi 5/11. Une seule source : non repris. À vérifier dans le compte rendu de la Chambre si tu veux l’ajouter.
4. **Montants** : Paris Match cite un effort de « 10 milliards d’euros d’ici à 2029 » et un déficit qui « dépasse les 5 % ». Non repris (montant de presse ; le déficit officiel est déjà dans la bande : 5,2 % en 2025 selon Eurostat).
5. **Grève générale fin novembre** : une menace évoquée en septembre (Paris Match, 08/09) ; date 2026 non confirmée par mes recherches (les résultats portaient surtout sur la grève de novembre 2025). Rien proposé.
6. **Chiffres officiels du 29-30/10** (point 2) : pour que je puisse les rédiger, il faudrait autoriser l’accès à `ec.europa.eu`, `statbel.fgov.be` et `nbb.be` pour cette tâche planifiée — c’est la deuxième semaine de suite qu’ils sont bloqués.
7. **Inflation** : toujours aucune question du site sur l’inflation ou l’indexation (voir brouillon du 02/11, point 5).
