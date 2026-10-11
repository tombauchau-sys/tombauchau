# Dossier 09 · Climat et énergie · données vérifiées (10-11 octobre 2026)

Toutes les séries Eurostat ont été lues par requêtes API à une seule catégorie (sauf mention).

## Émissions de gaz à effet de serre
- sdg_13_10 (« Domestic net greenhouse gas emissions »), BE, src_crf TOTX4_MEMO (hors LULUCF et postes pour mémoire) :
  - Mt CO2e : 1990 145,5 … 2005 144,7 … 2009 125,8 · 2019 116,1 · 2020 106,7 · 2021 109,5 · 2022 102,6 · 2023 97,8 · 2024 98,0.
  - Indice 1990 = 100 : 2019 79,8 · 2020 73,4 · 2021 75,2 · 2022 70,6 · 2023 67,2 · 2024 67,4 (vérifié par requête unique).
  - Tonnes par habitant : 1990 14,6 → 2024 8,3 (requête unique).
- sdg_13_10, BE, TOTXMEMO (forêts et sols compris, « net ») 2024 : 97,4 Mt ; 8,2 t/hab. ; indice 68,3.
- env_air_gge, EU27_2020, GHG, TOTX4_MEMO, millions de tonnes : 1990 4 866,9 ; 2005 4 537,1 ; 2024 3 017,2 → indice 62,0 (calcul).
- BE par rapport à 2005 : −32,3 % ; UE : −33,5 % (calcul).
- Moyenne BE 2008-2012 (indice) : 87,9, soit −12 % (calcul sur Eurostat ; la comptabilité officielle de Kyoto suit des règles propres).
- Par habitant, net (cj-data.json, sdg_13_10) 2024 : BE 8,2 t, 9e plus élevé des 27 (IE 10,5, LU 10,1, EE 8,9, CY 8,9, PL 8,7, FI 8,7, DE 8,5, CZ 8,4).

## Par secteur (env_air_gge, BE, GHG, MIO_T, requêtes uniques)
| Secteur | 1990 | 2024 | Évolution | Part 2024 |
|---|---|---|---|---|
| CRF1A1 Production d'énergie | 29,7 | 14,8 | −50 % | 15,1 % |
| CRF1A2 Industrie (combustion) | 23,6 | 13,0 | −45 % | 13,3 % |
| CRF1A3 Transport | 21,0 | 24,9 | +19 % | 25,4 % |
| CRF1A4 Autres combustions (bâtiments, agriculture) | 28,2 | 19,8 | −30 % | 20,2 % |
| CRF2 Procédés industriels | 25,5 | 15,7 | −39 % | 16,0 % |
| CRF3 Agriculture | 11,3 | 8,3 | −27 % | 8,5 % |
| CRF5 Déchets | 4,8 | 1,2 | −76 % | 1,2 % |
Reste (émissions fugitives, etc.) : 1,5 Mt en 1990, 0,4 Mt en 2024.

## Renouvelables (nrg_ind_ren, REN, %)
- BE : 2004 1,9 → 2019 9,9 → 2020 13,0 → 2024 14,3 ; 2025 14,9 (provisoire).
- UE : 2004 9,6 → 2024 25,2 ; 2025 26,2 (provisoire).
- 2024 : BE le plus bas des 27 (LU 14,7 ; IE 16,1 ; MT 17,2).

## Dépendance énergétique (nrg_ind_id, TOTAL, %)
- BE : 1990 75,3 · 2014 80,2 · 2015 84,2 · 2016 76,0 · 2017 75,3 · 2018 83,0 · 2019 77,7 · 2020 78,1 · 2021 70,8 · 2022 73,7 · 2023 75,8 · 2024 75,4.
- UE : 2024 57,3.
- Convention : la chaleur nucléaire compte comme production primaire nationale.

## Électricité (nrg_bal_peh, GEP, GWh, requêtes uniques)
- Total : 2000 84 012 · 2015 69 705 · 2018 75 040 · 2021 100 482 · 2024 77 157.
- Nucléaire (N900H) : 2000 48 157 · 2014 33 703 · 2015 26 103 · 2018 28 597 · 2021 50 326 · 2024 31 255 → 40,5 % en 2024.
- Renouvelables (RA000) : 2000 1 044 → 2024 26 538 (34,4 %) ; éolien 13 825 et solaire PV 8 562 (requête multiple, non revérifiés un à un : non utilisés).
- Gaz (G3000) : 2024 14 160 (18,4 %).

## Prix de l'électricité, ménages (nrg_pc_204, bande DC 2 500-4 999 kWh, toutes taxes, EUR/kWh)
- BE : 2019-S1 0,2839 · 2021-S1 0,2702 · 2022-S2 0,4489 · 2023-S1 0,4350 · 2024-S2 0,3313 · 2025-S2 0,3499 · 2026-S1 0,3575.
- UE : 2019-S1 0,2168 · 2022-S2 0,2768 · 2025-S2 0,2896.
- 2025-S2 : BE 3e plus cher des 27 en euros courants (IE 0,4042 ; DE 0,3869).

## Précarité énergétique (ilc_mdes01, incapacité à chauffer convenablement le logement, %)
- BE ensemble : 2019 3,9 (rupture) · 2020 4,2 · 2021 3,5 · 2022 5,0 · 2023 6,0 · 2024 4,8 · 2025 4,2.
- BE sous le seuil de pauvreté : 2025 13,2 ; 2024 12,0.
- UE : 2021 6,9 · 2022 9,3 · 2023 10,6 · 2024 9,2 · 2025 8,8.

## Histoire et droit
- Kyoto : Belgique −7,5 % sur 2008-2012 par rapport à 1990 (Chambre, DOC 51 1034/001, 21 avril 2004).
- Loi de 2003 sur la sortie progressive du nucléaire : interdiction de nouvelles centrales, 40 ans d'exploitation, fermetures 2015-2025 (climate-laws.org).
- Doel 3 : déconnecté le 23 septembre 2022 (World Nuclear News). Tihange 2 : 31 janvier 2023 (La Libre). Doel 1 : 14 février 2025 (Engie Electrabel). Doel 2 : 30 novembre 2025 (Engie Electrabel, Enerdata). Tihange 1 : octobre 2025 (World Nuclear Association).
- Doel 4 et Tihange 3 : prolongation de dix ans négociée avec Engie (VRT, WNN). Dates de fin divergentes selon les sources : non reprises.
- Abrogation : vote de la Chambre le 15 mai 2025 (VRT, 16 mai 2025) ; Ecolo et Groen contre, PS et PTB abstention.
- Klimaatzaak : tribunal de première instance de Bruxelles, 17 juin 2021 (faute, pas d'objectif imposé) ; cour d'appel, 30 novembre 2023 : État fédéral, Flandre et Bruxelles condamnés à réduire de 55 % en 2030 par rapport à 1990 ; pas de faute de la Wallonie (VRT, 30 novembre 2023).
- Partage de l'effort (UE) : Belgique −47 % en 2030 par rapport à 2005 pour transport, bâtiments, agriculture, petite industrie, déchets (≈ 66 % des émissions de l'UE) (Commission européenne).

## Recherche
- Bayer et Aklin (2020), PNAS 117(16), 8804-8812 : SEQE-UE, plus d'un milliard de tonnes de CO2 évitées 2008-2016, −3,8 %.
- Andersson (2019), AEJ: Economic Policy 11(4), 1-30 : taxe carbone suédoise, transport −11 % environ, contrôle synthétique.
- Colmer, Martin, Muûls et Wagner (2025), Review of Economic Studies 92(3), 1625-1660 : −14 à −16 % pour les entreprises manufacturières soumises au SEQE, sans contraction détectable de l'activité.
- Fowlie, Greenstone et Wolfram (2018), QJE, doi 10.1093/qje/qjy005 : évaluation expérimentale, plus de 30 000 ménages ; économies projetées environ 2,5 fois trop élevées ; coûts environ deux fois les économies réelles.
- Gillingham, Rapson et Wagner (2014), RFF DP 14-39 : peu d'appui à l'hypothèse d'un effet rebond « total » (backfire).
- Douenne et Fabre (2022), AEJ: Economic Policy 14(1), 81-110 : les Français surestiment leurs pertes et jugent à tort la taxe carbone avec dividende régressive.
