# Chiffre Juste

Site citoyen de chiffres vérifiés sur la Belgique et l’Europe : https://tombauchau-sys.github.io/tombauchau/

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

Textes et graphiques : Creative Commons Attribution 4.0 International (CC BY 4.0), https://creativecommons.org/licenses/by/4.0/deed.fr — réutilisation libre en citant « Chiffre Juste ». Les données restent soumises aux conditions de leurs producteurs (Eurostat, Statbel, etc.).
