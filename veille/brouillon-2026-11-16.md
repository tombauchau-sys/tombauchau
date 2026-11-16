# Veille actualité – brouillon du lundi 16 novembre 2026

Rubrique **Questions** uniquement. Période couverte : 9 au 16 novembre 2026 (Europe/Brussels), recherche faite le 16/11 vers 9 h, donc **avant** l’entrevue du Premier ministre avec le Roi (11 h 30).
Proposition complète au format de `src/actualite/actu.json` : `veille/actu-2026-11-16.json` (rien n’est modifié dans `src/`).

**Base utilisée :** `veille/actu-2026-11-09.json` (branche `veille/2026-11-09`), qui reprend les propositions du 26/10 et du 02/11. **Aucune n’est fusionnée dans `main`** : en ligne, la bande d’actualité affiche toujours la version du 21/10. Cette branche part de `veille/2026-11-09` : tu peux ne fusionner que le fichier du 16/11.

**Pour la troisième semaine, aucune page officielle n’a pu être lue** : les pages Eurostat (communiqués du 30/10 sur le chômage et le PIB) ont été refusées pendant l’exécution automatique (demande d’autorisation restée sans réponse). Je ne propose donc **aucun nouveau chiffre**.

## 1. Entrée proposée (1)

| Date | Type | Thème | Fait | Question liée | Sources lues |
|---|---|---|---|---|---|
| 15/11 | presse | finances | Le « kern » du dimanche 15/11 se termine sans accord sur le budget pluriannuel. Quatre partis acceptent la proposition du Premier ministre, Vooruit la refuse (effort des « épaules les plus larges » jugé insuffisant). Le Premier ministre est attendu chez le Roi le 16/11. Aucun montant repris | `__FINANCES__#f-dette` | [L’Avenir (Belga), 15/11, 22 h 07](https://www.lavenir.net/actu/belgique/politique/2026/11/15/le-kern-est-termine-sans-accord-sur-le-budget-vooruit-vise-par-les-autres-partenaires-6K4HIHOGA5B4LPBL62YCASX2T4/) ; [La Libre, 15/11, 20 h 40](https://www.lalibre.be/belgique/politique-belge/2026/11/15/budget-federal-le-kern-de-ce-dimanche-se-termine-sans-accord-PLORY4TSNJHC3EKGIZNX7YFZSI/) |

Elle **remplace** l’entrée presse du 06/11 (refus de la démission par le Roi), dont le contexte est repris en une phrase. Les trois articles lus (L’Avenir, La Libre — partie gratuite seulement —, RTBF) concordent sur l’absence d’accord, le partage quatre partis / Vooruit et le rendez-vous au Palais à 11 h 30. Contexte de la semaine (non repris comme entrée) : [RTBF, 11/11](https://www.rtbf.be/article/budget-federal-pas-d-armistice-au-sein-du-gouvernement-l-agenda-sera-charge-avant-le-16-novembre-11814258) — le Roi avait fixé au 16/11 l’échéance pour arrêter les chiffres.

Texte exact : voir le fichier JSON.

## 2. Publications officielles repérées mais NON LUES

| Date | Thème | Publication | À lire |
|---|---|---|---|
| 30/10 | emploi | Eurostat, chômage de septembre 2026 | [3-30102026-bp](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/3-30102026-bp) ; [une_rt_m](https://ec.europa.eu/eurostat/databrowser/view/une_rt_m/default/table?lang=fr) |
| 30/10 | finances | Eurostat, PIB 3e trimestre 2026 (estimation rapide ; trimestre non confirmé) | [2-30102026-ap](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-30102026-ap) |
| 29/10 | — | Statbel, inflation d’octobre 2026 (chiffres de presse non repris) | [Statbel, IPC](https://statbel.fgov.be/fr/themes/prix-a-la-consommation/indice-des-prix-la-consommation) |
| début déc. (à confirmer) | emploi | Eurostat, chômage d’octobre 2026 | à venir |
| ~27/11 | — | Statbel, inflation de novembre | à venir |

## 3. Entrées à retirer

- **Remplacée** : entrée presse du 06/11 (budget), par celle du 15/11.
- **Plus de 4 mois** : aucune nouvelle cette semaine (la plus ancienne de la proposition date du 01/09 ; elle atteindra 4 mois le 01/01/2027).
- Rappel (toujours présentes sur `main`) : 21/07 ×2, 03/07, 12/06, 29/05, 01/03.

## 4. Réponses de questions à mettre à jour

- Rien de vérifiable sans lecture des pages officielles. À contrôler dès que possible : chômage (5,9 % en août) face à septembre ; question PIB face au 3e trimestre.

## À vérifier par Tom

1. **Entrevue au Palais du 16/11 (11 h 30)** : son issue n’était pas connue lors de la recherche. Si un communiqué du Palais ou du Premier ministre est publié aujourd’hui, l’entrée du 15/11 devra être actualisée (et pourrait passer en « officiel » si tu lies le communiqué lui-même).
2. **Fusion en attente** : les branches `veille/2026-10-26`, `-11-02` et `-11-09` ne sont pas dans `main`. Le fichier `veille/actu-2026-11-16.json` contient toutes leurs entrées encore valables.
3. **Durée du kern** : RTBF écrit « cinq heures de discussions », L’Avenir 14 h – 20 h 30. Détail non repris.
4. **Douzièmes provisoires** : toujours une seule source de presse (Paris Match, 06/11) ; aucune trace trouvée sur le site de la Chambre. Non repris.
5. **Accès bloqués** : `ec.europa.eu` refusé pour la 3e semaine (statbel et nbb non retentés). Pour que la veille propose des chiffres, il faudrait autoriser ces domaines pour cette tâche planifiée.
6. **Inflation** : toujours aucune question du site sur l’inflation ou l’indexation (brouillon du 02/11, point 5).
