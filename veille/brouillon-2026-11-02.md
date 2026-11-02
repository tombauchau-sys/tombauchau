# Veille actualité – brouillon du lundi 2 novembre 2026

Rubrique **Questions** uniquement. Période couverte : 26 octobre au 2 novembre 2026 (Europe/Brussels).
Proposition complète au format de `src/actualite/actu.json` : `veille/actu-2026-11-02.json` (rien n’est modifié dans `src/`).

**Important : cette semaine, aucune page officielle n’a pu être lue.** Les pages d’Eurostat, de Statbel et de la BNB ont été refusées pendant cette exécution automatique (autorisation d’accès non accordée, ou redirection d’Eurostat vers sa page « sorry »). Je ne propose donc **aucun nouveau chiffre**. Les publications repérées sont listées au point 2, avec ce qu’il faut lire pour les ajouter.

**Base utilisée :** le fichier `src/actualite/actu.json` de la branche `veille/2026-10-26` (brouillon du 26/10 déjà appliqué), et non celui de `main`. Cette branche **n’a pas encore été fusionnée dans `main`** : en ligne, la bande d’actualité affiche toujours la version du 21/10.

## 1. Entrée proposée (1)

| Date | Type | Thème | Fait | Question liée | Source consultée |
|---|---|---|---|---|---|
| 02/11 | presse | finances | Budget fédéral : pas d’accord au comité ministériel restreint (nuit du 1er au 2/11). Selon des sources de la majorité citées par Belga, le Premier ministre devait se rendre chez le Roi lundi, « a priori » pour présenter sa démission. Aucun montant repris | `__FINANCES__#f-dette` | [Belga via Paris Match, 02/11 à 7h54](https://www.parismatch.be/actualites/politique/2026/11/02/bart-de-wever-sur-le-point-de-demissionner-toujours-pas-daccord-sur-le-budget-federal-le-premier-ministre-se-rend-chez-le-roi-ce-lundi-HIZ3AFBOSZDRLHZEF7HJJ5C6JY/) |

Elle remplace l’entrée presse du 22/10 sur le même sujet. Texte exact : voir le fichier JSON.

## 2. Publications officielles repérées mais NON LUES (à ajouter seulement après lecture)

Ces publications existent d’après les résultats de recherche (titres de pages officielles ou articles de presse). Aucun chiffre ci-dessous n’est confirmé par la page officielle.

| Date | Thème | Publication | Ce que dit seulement le titre | Question possible | À lire |
|---|---|---|---|---|---|
| 30/10 | emploi | Eurostat, chômage de septembre 2026 | Titre : « Euro area unemployment at 6.5% ». Chiffre belge inconnu | `__FICHE__` (comme l’entrée du 16/10) | [Eurostat 3-30102026-bp](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/3-30102026-bp) ou la table [une_rt_m](https://ec.europa.eu/eurostat/databrowser/view/une_rt_m/default/table?lang=fr) |
| 30/10 | finances | Eurostat, estimation rapide du PIB au 3e trimestre 2026 | Titre indexé : « GDP up by 0.4% in the euro area and by 0.5% in the EU ». **Attention :** c’est aussi exactement le titre du communiqué du 30/07 (2e trimestre) ; le moteur de recherche peut confondre. Chiffre belge inconnu | `__HOME__#atlas` (« Une hausse du PIB… ») | [Eurostat 2-30102026-ap](https://ec.europa.eu/eurostat/web/products-euro-indicators/w/2-30102026-ap) ; estimation belge : BNB |
| 29/10 | inégalités ? | Statbel, inflation d’octobre 2026 | La presse (VRT, Business AM) annonce 5,26 %, « le plus haut depuis plus de trois ans », tirée par le gaz et l’électricité. **Chiffre de presse, non repris** | Pas de question existante sur l’inflation (voir point 5 ci-dessous) | Page Statbel « Indice des prix à la consommation » |
| 30/10 ou 03/11 | — | Eurostat, inflation rapide d’octobre (zone euro) | Pas trouvé | — | calendrier Eurostat |

## 3. Entrées à retirer

- **Plus de 4 mois** (avant le 02/07/2026) : 12/06 (pacte migration et asile), 29/05 (réforme des pensions), 01/03 (réforme du chômage). *Déjà retirées sur la branche du 26/10 ; toujours présentes sur `main`.*
- **Dépassées par des chiffres révisés** : les deux entrées du 21/07 (T1 2026), remplacées par le T2. *Idem.*
- **Remplacée** : entrée presse du 22/10 (budget fédéral), par celle du 02/11.
- **Bientôt** : l’entrée du 03/07 (procédure de déficit excessif mise en suspens) dépassera 4 mois le 03/11. Je la laisse cette semaine ; à retirer la semaine prochaine, sauf si tu veux la garder comme repère.

## 4. Réponses de questions à mettre à jour

- Rien de vérifiable cette semaine : sans lecture des pages officielles, je ne peux pas dire si une réponse est devenue périmée.
- À surveiller dès lecture possible : la réponse de la fiche chômage (5,9 % en août, entrée du 16/10) pourrait être dépassée par le chiffre de septembre publié le 30/10.

## À vérifier par Tom

1. **Fusion en attente** : la branche `veille/2026-10-26` (brouillon appliqué le 26/10) n’est pas dans `main`. Si tu ne la fusionnes pas, ma proposition JSON contient quand même toutes ses entrées.
2. **Démission du Premier ministre** : à 7h54 ce lundi, Belga écrivait « a priori » et « selon plusieurs sources ». Je n’ai pas pu lire un second média (Le Soir, RTBF bloqués). Deux titres repérés en recherche ([Brussels Times](https://www.brusselstimes.com/belgium/2387762/belgian-pm-de-wever-to-offer-resignation-to-king-after-failed-budget-talks), [21 News](https://www.21news.be/pas-daccord-au-budget-federal-bart-de-wever-pret-a-remettre-sa-demission-au-roi/)) vont dans le même sens, non lus. Un site « The Belgium Times » titre qu’il « remet sa démission » : non lu, source inconnue. **Avant publication, vérifie ce qui s’est passé au Palais (communiqué du Palais royal ou de la Chancellerie)** et corrige le texte : démission présentée, acceptée ou tenue en suspens par le Roi.
3. **Montants du budget** : Clarinval parle de « plus de trois milliards d’euros d’impôts », contestés par d’autres partis ; l’article évoque aussi « environ deux milliards » de recettes en discussion et 10 milliards à trouver d’ici 2029. Montants contradictoires : non repris.
4. **Chiffres officiels du 29-30/10** (point 2) : chômage de septembre, PIB du 3e trimestre, inflation d’octobre. Je peux les rédiger si tu relances la tâche en autorisant l’accès à `ec.europa.eu`, `statbel.fgov.be` et `nbb.be`, ou tu peux les lire toi-même.
5. **Inflation** : aucune question du site ne porte directement sur l’inflation ou l’indexation. Si tu veux l’entrée Statbel, il faudra choisir un lien (par ex. `__PENSIONS__#f-niveau` pour l’indexation, ou `__HOME__#atlas`) ou créer une question.
6. **Thèmes absents** : pensions, logement, climat, éducation, fiscalité, inégalités n’ont aucune entrée dans la bande. Rien d’officiel trouvé sur ces thèmes cette semaine (recherche limitée par les accès).
