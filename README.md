# Au plus Juste

Site citoyen de chiffres vérifiés sur la Belgique et l’Europe : https://auplusjuste.be/

## Organisation

- `index.html`, `dossier-*.html`, `fiche-chomage.html` : pages publiées (générées, ne pas modifier à la main).
- `src/` : sources du site.
  - `accueil/` : page d’accueil (porte d’entrée, carte, classements, dossiers, méthode).
  - `dossiers/` : textes (`*-body.html`), scripts et graphiques (`*.js`), données vérifiées (`*-data.json`), styles communs (`dossier.css`).
  - `fiche/` : fiche chômage (sert aussi de base de style aux dossiers).
  - `geo/` : fonds de carte (Natural Earth) et scripts qui les produisent.
  - `data/` : données Eurostat brutes (CSV) et fichier consolidé `cj-data.json` utilisé par la carte.
- `donnees/` : copie publique des données de la carte.
- `build.py` : construit toutes les pages.

## Mettre à jour le site

1. Modifier les fichiers dans `src/`.
2. Lancer `python3 build.py` (aucune dépendance) : les pages sont régénérées à la racine.
3. Publier (commit et push) : GitHub Pages met le site à jour en une minute environ.

Chaque page est autonome (styles, scripts et données intégrés) : pas de serveur, pas d’appel réseau pour les données.

## Règles éditoriales

Voir la charte éditoriale et la page Méthode : chaque chiffre est daté et relié à sa source primaire, aucune donnée manquante n’est remplacée par zéro ou estimée, les corrections sont publiées.

## Licence

Textes et graphiques : Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/deed.fr — réutilisation libre en citant « Au plus Juste ». Les données restent soumises aux conditions de leurs producteurs (Eurostat, Statbel, etc.).

## Citer et reproduire

- Référence : voir `CITATION.cff` (GitHub affiche un bouton « Cite this repository »). Chaque dossier contient aussi un encadré « Comment citer ».
- Données : sous chaque graphique, « Voir les données du graphique » affiche et télécharge en CSV les valeurs exactes dessinées (registre `CJD`, fichier `src/dossiers/cjd.js`).
- Vérifications : `verif/registre.csv` (une ligne par affirmation contrôlée) ; journal public des changements : page `nouveautes.html` (source `src/nouveautes/nv_journal.py` et journaux des dossiers).
- Identifiant pérenne (DOI) : à obtenir en reliant le dépôt à Zenodo et en publiant une « release » GitHub.


## Charte graphique

Une règle courte, pour que les pages restent cohérentes :

- **Sombre = récit, clair = données.** Les sections brunes racontent (histoire, recherche, décisions, lectures) ; les sections papier présentent les chiffres et leurs définitions.
- **Une couleur par dossier** sur l'accueil (variable `--cc`), reprise pour le dossier.
- **Les mêmes graphiques partout** : axes titrés avec leur unité, phrase-titre qui dit ce que montre le graphique, source sous le graphique, données téléchargeables, valeur au survol, ruptures de série marquées d'une croix rouge.
- **Le texte n'est jamais animé en transparence** : seules les courbes se dessinent.
- **Le chiffre d'abord, la source juste dessous**, et le pictogramme « presse » quand la source primaire n'a pas pu être consultée.
