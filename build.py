#!/usr/bin/env python3
"""Construit toutes les pages de Chiffre Juste à partir du dossier src/.

Usage :  python3 build.py            -> pages du site à la racine du dépôt
         python3 build.py --artifact -> en plus, versions « Claude » dans .artifacts/

Chaque page est un fichier HTML autonome (styles, scripts et données intégrés),
compatible avec GitHub Pages sans serveur ni étape de compilation côté navigateur.
"""
import sys, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / 'src'

# Liens entre pages : nom de fichier sur le site / adresse de la version Claude
PAGES = {
    '__HOME__': ('index.html', 'https://claude.ai/artifact/XD7ZMXB6givx7yH22LywYt'),
    '__FICHE__': ('fiche-chomage.html', 'https://claude.ai/artifact/4PRPo6faVQSWYZNDLjxKdQ'),
    '__EMPLOI__': ('dossier-emploi.html', 'https://claude.ai/artifact/KVLD3kPfqnRJtKUtfcErgf'),
    '__FINANCES__': ('dossier-finances.html', 'https://claude.ai/artifact/WPBbNAM2GqtYxFxyxtMktY'),
    '__PENSIONS__': ('dossier-pensions.html', 'https://claude.ai/artifact/26mrVdApdUWPhEHz9zX6Le'),
    '__IMMIGRATION__': ('dossier-immigration.html', 'https://claude.ai/artifact/Rj99NrRs1NEzhhCE5StkW5'),
    '__JUSTICE__': ('dossier-justice.html', 'https://claude.ai/artifact/U2C7bMKnkAZnTHoGy5gFi6'),
    '__SANTE__': ('dossier-sante.html', 'https://claude.ai/artifact/RXGCYzDcLLLoNu9e1ZCFFg'),
    '__EDUCATION__': ('dossier-education.html', 'https://claude.ai/artifact/UqvRTHWAxQ3fmxoujdHYU3'),
    '__INEGALITES__': ('dossier-inegalites.html', 'https://claude.ai/artifact/1YHWYRbbFUwdpQybjQe92u'),
    '__CLIMAT__': ('dossier-climat.html', 'https://claude.ai/artifact/XeD7pKwARAY12Gqj6xhVqH'),
}
FONTS = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Caveat:wght@600&display=swap">
'''
DOSSIERS = {
    'emploi': ('Emploi et inactivité · Chiffre Juste', 'Emploi et inactivité en Belgique : taux d’emploi, chômage, invalidité, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'finances': ('Finances publiques · Chiffre Juste', 'Dette, déficit, dépenses par fonction, intérêts et notes des agences : les finances publiques belges en chiffres vérifiés, avec l’état de la recherche et des lectures plurielles.'),
    'immigration': ('Immigration et asile · Chiffre Juste', 'Immigration et asile en Belgique : personnes nées à l’étranger, étrangers, demandes d’asile, emploi des immigrés, histoire depuis 1930, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'justice': ('Justice et sécurité · Chiffre Juste', 'Justice et sécurité en Belgique : criminalité enregistrée et chiffre noir, prisons surpeuplées, récidive, histoire pénale, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'sante': ('Santé · Chiffre Juste', 'Santé en Belgique : espérance de vie et années en bonne santé, dépenses et accès aux soins, mortalité évitable, inégalités sociales, histoire de l’assurance maladie, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'education': ('Éducation · Chiffre Juste', 'Éducation en Belgique : compétences des élèves (PISA), redoublement, décrochage, diplômes et emploi, histoire de l’école, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'inegalites': ('Inégalités et pauvreté · Chiffre Juste', 'Inégalités et pauvreté en Belgique : risque de pauvreté, privations, redistribution, Gini, patrimoine, écarts entre Régions, histoire de l’aide sociale, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'climat': ('Climat et énergie · Chiffre Juste', 'Climat et énergie en Belgique : émissions de gaz à effet de serre par secteur, renouvelables, nucléaire, dépendance énergétique, prix de l’électricité, précarité énergétique, histoire, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'pensions': ('Pensions et vieillissement · Chiffre Juste', 'Pensions et vieillissement en Belgique : dépenses, niveau des pensions, pauvreté des aînés, âge de départ, histoire du système, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
}
HOME_DESC = 'Chiffre Juste : les 27 pays de l’Union en chiffres vérifiés. Notes des agences, budget public par fonction, dette, pauvreté, commerce entre pays, classements, avec sources et limites.'
FICHE_DESC = 'Chômage en Belgique, 2025 : 6,2 % selon Statbel et Eurostat. Définition, sources croisées, ruptures de série, limites et sept lectures d’intellectuels.'


def read(p):
    return (SRC / p).read_text(encoding='utf-8')


def links(html, mode):
    for ph, (site, art) in PAGES.items():
        html = html.replace(ph, site if mode == 'site' else art)
    return html


def wrap(html, title, desc):
    """Version site : document HTML complet avec métadonnées pour les moteurs de recherche."""
    i = html.index('</style>') + 8
    head = ('<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            f'<meta name="description" content="{desc}">\n'
            f'<meta property="og:title" content="{title}">\n'
            f'<meta property="og:description" content="{desc}">\n')
    return head + html[:i] + '\n</head>\n<body>\n' + html[i:] + '</body>\n</html>\n'


def build_home():
    src = read('accueil/head.html')
    head = src[:src.index('</style>')]
    add = read('accueil/atlas.css') + "\n.grow{transform:scaleY(0);transition:transform .8s var(--ease)}.play .grow{transform:none}html.calm .grow{transform:none!important}\n"
    gate_html = src[src.index('<div class="gate grain"'):src.index('<nav class="top"')]
    body = read('accueil/body.html').replace('<div class="frame"><svg id="map"', '<div class="mframe"><svg id="map"')
    js = src[src.index('<script>'):]
    pre = js[:js.index("  /* Lettres à faire monter */")].replace("var MAP=__MAP__;", "var MAP=__MAP__,DATA=__DATA__;")
    letters = """  /* Lettres à faire monter */
  (function(){var n=D.getElementById('fw'),t=n.textContent;n.textContent='';t.split('').forEach(function(c,i){var s=D.createElement('span');s.className='ch';s.textContent=c===' '?' ':c;s.setAttribute('aria-hidden','true');s.style.transitionDelay=(i*0.045)+'s';n.appendChild(s)})})();
"""
    gate = js[js.index("  /* Seuil d'entrée"):js.index("  /* Héros : disques")]
    start = "  function startHero(){var a=D.getElementById('atlas');a.classList.add('go')}\n"
    mid = js[js.index("  /* Bandeau défilant"):js.index("  /* Carte */")].replace("io.observe(D.getElementById('frame'));", "").replace(
        "e.target.closest('a,button,[data-cursor],.c,.tile')", "e.target.closest('a,button,input,[data-cursor],.c,.tile')")
    out = head + add + '</style>\n\n' + gate_html + body + '\n' + pre + letters + gate + start + mid + read('accueil/app.js') + '})();\n</script>\n'
    out = (out.replace('__MAP__', read('geo/map.json'))
              .replace('__WORLD__', read('geo/world.json'))
              .replace('__DATA__', read('data/cj-data.json')))
    return out, 'Atlas Chiffre Juste', HOME_DESC


def build_fiche():
    s = read('fiche/fiche-chomage.html')
    css = read('dossiers/dossier.css')
    v2 = css[css.index('/* ===== V2'):]  # composants pédagogiques partagés avec les dossiers
    s = s.replace('</style>', v2 + '</style>', 1)
    i = s.rindex('</script>')
    s = s[:i] + '\n' + read('dossiers/common.js') + s[i:]
    return s, 'Chômage · Chiffre Juste', FICHE_DESC


def build_dossier(name):
    fiche = read('fiche/fiche-chomage.html')
    css = fiche[fiche.index('<style>') + 7:fiche.index('</style>')] + read('dossiers/dossier.css')
    title, desc = DOSSIERS[name]
    head = f'<title>{title}</title>\n' + FONTS + '<style>' + css + '</style>\n'
    nav = '''<div class="cursor" id="cursor" aria-hidden="true"></div>
<button type="button" class="a11y" id="a11y" aria-pressed="false"><b>Désactivé</b>Mode accessibilité</button>
<nav class="top" aria-label="Navigation principale">
  <a href="__HOME__#atlas"><span class="lbl" data-t="Carte">Carte</span></a>
  <a href="__HOME__#classements"><span class="lbl" data-t="Classements">Classements</span></a>
  <a href="__HOME__" class="mark" aria-label="Chiffre Juste, accueil"><span></span></a>
  <a href="__HOME__#dossiers" class="on"><span class="lbl" data-t="Dossiers">Dossiers</span></a>
  <a href="__HOME__#methode"><span class="lbl" data-t="Méthode">Méthode</span></a>
  <a href="__HOME__#apropos" class="lang"><span class="lbl" data-t="À propos">À propos</span></a>
</nav>
'''
    js = read(f'dossiers/{name}.js').replace('__DATA__', read(f'dossiers/{name}-data.json'))
    return head + nav + read(f'dossiers/{name}-body.html') + '<script>' + js + '\n' + read('dossiers/common.js') + '</script>\n', title, desc


def main():
    artifact = '--artifact' in sys.argv
    jobs = {'index.html': build_home, 'fiche-chomage.html': build_fiche}
    for n in DOSSIERS:
        jobs[f'dossier-{n}.html'] = (lambda n=n: build_dossier(n))
    outdir = ROOT / '.artifacts'
    for fname, fn in jobs.items():
        html, title, desc = fn()
        site = links(html, 'site')
        left = set(re.findall(r'__(?:HOME|FICHE|EMPLOI|FINANCES|PENSIONS|IMMIGRATION|JUSTICE|SANTE|EDUCATION|INEGALITES|CLIMAT|MAP|DATA|WORLD)__', site))
        if left:
            sys.exit(f'{fname} : marqueurs non remplacés {left}')
        (ROOT / fname).write_text(wrap(site, title, desc), encoding='utf-8')
        if artifact:
            outdir.mkdir(exist_ok=True)
            (outdir / fname).write_text(links(html, 'artifact'), encoding='utf-8')
        print('construit', fname)


if __name__ == '__main__':
    main()
