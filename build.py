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
    '__LOGEMENT__': ('dossier-logement.html', 'https://claude.ai/artifact/KnCCYmNraookxjwkZf9twj'),
    '__REGISTRE__': ('registre-verification.html', 'https://claude.ai/artifact/Dg6d1Tr6wmDe1SFiUjHjYC'),
    '__COMPARER__': ('comparer.html', 'https://claude.ai/artifact/P1ppwNCEvjgmHgZ9VkbXmD'),
    '__LEXIQUE__': ('lexique.html', 'https://claude.ai/artifact/LQDyy5p1qNjdLvMPncXWce'),
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
    'logement': ('Logement · Chiffre Juste', 'Le logement en Belgique : prix, rapport prix/revenu, propriétaires et locataires, surcharge des coûts, logement social, sans-abrisme, jeunes chez leurs parents, histoire, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
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


# ---------- Comparaison entre pays ----------
DOSSIER_IND = {
    'emploi': ['emp', 'unemp', 'youth', 'ltu', 'paygap'],
    'finances': ['debt', 'deficit', 'spend', 'revenue', 'tax', 'interest'],
    'pensions': ['olddep', 'gf10', 'medage'],
    'immigration': ['netmig', 'emp'],
    'justice': ['prison', 'prisocc', 'gf03'],
    'sante': ['lifeexp', 'hly65', 'gf07'],
    'education': ['tertiary', 'earlyleave', 'adultlearn', 'gf09'],
    'inegalites': ['arope', 'gini', 'depriv'],
    'climat': ['ghg', 'renew', 'gf05'],
    'logement': ['hpi', 'overburden', 'overcrowd'],
}
MEMBERS = ['BE','BG','CZ','DK','DE','EE','IE','EL','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE','EU27_2020']


def _csv(name):
    import csv
    vals, flags = {}, {}
    for r in csv.DictReader(open(SRC / 'data' / 'extra' / f'{name}.csv', encoding='utf-8')):
        g = r.pop('geo')
        for y, cell in r.items():
            cell = cell.strip()
            if not cell:
                continue
            f = ''.join(ch for ch in cell if ch.isalpha())
            vals.setdefault(g, {})[y] = float(cell.rstrip('bepu'))
            if f:
                flags.setdefault(g, {})[y] = f
    return vals, flags


def cmp_data(ids):
    meta = json.loads(read('compare/indicators.json'))
    cj = json.loads(read('data/cj-data.json'))['c']
    extra = {n: _csv(n) for n in ('hpi', 'overburden', 'overcrowd', 'prison', 'prison_cap')}
    pv, pc = extra['prison'][0], extra['prison_cap'][0]
    occ = {g: {y: round(pv[g][y] / pc[g][y] * 100) for y in pv[g] if g in pc and y in pc[g] and pc[g][y]} for g in pv}
    extra['prisocc'] = (occ, {})
    out = {'n': {g: cj[g]['name'] for g in MEMBERS}, 'i': {}}
    for i in ids:
        m = dict(meta[i]); key = m.pop('key', i); v, f = {}, {}
        if key.startswith('x.'):
            v, f = extra[key[2:]]
        else:
            for g in MEMBERS:
                node = cj.get(g, {})
                for part in key.split('.'):
                    node = node.get(part, {}) if isinstance(node, dict) else {}
                if node:
                    v[g] = node
        m['v'] = {g: s for g, s in v.items() if g in MEMBERS}
        m['f'] = {g: s for g, s in f.items() if g in MEMBERS}
        out['i'][i] = m
    return out


def cmp_script(ids, init):
    return ('var CMP=' + json.dumps(cmp_data(ids), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + ';\n'
            + read('compare/compare.js') + '\n' + init + '\n')


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
    titles = {'emploi': 'Emploi et inactivité', 'finances': 'Finances publiques', 'pensions': 'Pensions et vieillissement', 'immigration': 'Immigration et asile', 'justice': 'Justice et sécurité', 'sante': 'Santé', 'education': 'Éducation', 'inegalites': 'Inégalités et pauvreté', 'climat': 'Climat et énergie', 'logement': 'Logement'}
    groups = [{'t': titles[n], 'href': '__' + n.upper() + '__', 'ind': DOSSIER_IND[n]} for n in titles]
    allids = sorted({i for n in titles for i in DOSSIER_IND[n]})
    out += '<script>' + cmp_script(allids, 'CJC.home(' + json.dumps(groups, ensure_ascii=False) + ');') + '</script>\n'
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
    body = read(f'dossiers/{name}-body.html')
    mk = '<div id="approfondir" aria-hidden="true"></div>'
    assert mk in body, name
    body = body.replace(mk, read('compare/section.html') + mk, 1)
    body = re.sub(r'(<p class="maj">Dossier vérifié[^<]*)</p>', r'\1 · <a href="#europe">Voir ce dossier pour un autre pays</a></p>', body, count=1)
    cmp = cmp_script(DOSSIER_IND[name], 'CJC.dossier({ind:' + json.dumps(DOSSIER_IND[name]) + '});')
    return head + nav + body + '<script>' + js + '\n' + read('dossiers/common.js') + '</script>\n<script>' + cmp + '</script>\n', title, desc


def build_registre():
    import csv
    names = {'emploi':'Emploi','finances':'Finances publiques','pensions':'Pensions','immigration':'Immigration','justice':'Justice','sante':'Santé','education':'Éducation','inegalites':'Inégalités','climat':'Climat et énergie','logement':'Logement','fiche':'Fiche chômage','accueil':'Accueil et carte'}
    rows = list(csv.DictReader(open(ROOT / 'verif' / 'registre.csv', encoding='utf-8')))
    data = [[names.get(r['page'], r['page']), r['affirmation'], r['valeur_site'], r['source_primaire'], r['valeur_source'], r['statut'], r['note']] for r in rows]
    js = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
    html = read('registre/registre.html').replace('__REGDATA__', js)
    return html, 'Registre de vérification · Chiffre Juste', 'Chaque affirmation de Chiffre Juste contrôlée à sa source primaire : valeur affichée, source consultée, statut.'


NAV_SIMPLE = '''<div class="cursor" id="cursor" aria-hidden="true"></div>
<button type="button" class="a11y" id="a11y" aria-pressed="false"><b>Désactivé</b>Mode accessibilité</button>
<nav class="top" aria-label="Navigation principale">
  <a href="__HOME__#atlas"><span class="lbl" data-t="Carte">Carte</span></a>
  <a href="__HOME__#classements"><span class="lbl" data-t="Classements">Classements</span></a>
  <a href="__HOME__" class="mark" aria-label="Chiffre Juste, accueil"><span></span></a>
  <a href="__HOME__#dossiers"><span class="lbl" data-t="Dossiers">Dossiers</span></a>
  <a href="__HOME__#methode"><span class="lbl" data-t="Méthode">Méthode</span></a>
  <a href="__HOME__#apropos" class="lang"><span class="lbl" data-t="À propos">À propos</span></a>
</nav>
'''
A11Y_INIT = ("(function(){var D=document,H=D.documentElement,ab=D.getElementById('a11y'),calm=false;H.classList.add('js');"
            "try{calm=localStorage.getItem('cj-a11y')==='1'}catch(e){}"
            "function set(on){calm=on;H.classList.toggle('calm',on);ab.setAttribute('aria-pressed',on);ab.querySelector('b').textContent=on?'Activé':'Désactivé';try{localStorage.setItem('cj-a11y',on?'1':'0')}catch(e){}}"
            "set(calm);ab.onclick=function(){set(!calm)};"
            "var c=D.getElementById('cursor'),x=0,y=0,cx=0,cy=0;D.addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY;c.classList.add('on');c.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,input,select,label')))});"
            "(function loop(){cx+=(x-cx)*.22;cy+=(y-cy)*.22;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();})();\n")


def build_comparer():
    fiche = read('fiche/fiche-chomage.html')
    css = fiche[fiche.index('<style>') + 7:fiche.index('</style>')] + read('dossiers/dossier.css') + '\n.cmp-page{padding-top:140px}.cmp-page .cmp-how{margin-top:56px;max-width:80ch}.cmp-page .cmp-how ul{font:17px/1.55 var(--sans);padding-left:1.2em;display:grid;gap:10px}\n'
    title = 'Comparer les pays · Chiffre Juste'
    desc = 'Comparer les 27 pays de l’Union sur une trentaine d’indicateurs Eurostat : emploi, finances publiques, santé, éducation, pauvreté, climat, logement, justice. Pays à cocher, graphiques et tableaux.'
    head = f'<title>{title}</title>\n' + FONTS + '<style>' + css + '</style>\n'
    nav = NAV_SIMPLE
    ids = list(json.loads(read('compare/indicators.json')).keys())
    init = (A11Y_INIT +
            "CJC.page(" + json.dumps(ids) + ");")
    return head + nav + read('compare/page-body.html') + '<script>' + cmp_script(ids, init) + '</script>\n', title, desc


def build_lexique():
    sys.path.insert(0, str(SRC / 'lexique'))
    import build_lexique as BL
    fiche = read('fiche/fiche-chomage.html')
    css = fiche[fiche.index('<style>') + 7:fiche.index('</style>')] + read('dossiers/dossier.css')
    nav = NAV_SIMPLE
    init = A11Y_INIT
    body, lcss, js, n = BL.build(read, nav, init)
    title = 'Lexique · Chiffre Juste'
    desc = f'Lexique de Chiffre Juste : {n} définitions des termes politiques, économiques, sociaux et européens du débat public, des institutions belges aux traités de l’Union (Maastricht, Lisbonne…).'
    head = f'<title>{title}</title>\n' + FONTS + '<style>' + css + lcss + '</style>\n'
    return head + nav + body + '<script>' + js + '</script>\n', title, desc


def main():
    artifact = '--artifact' in sys.argv
    jobs = {'index.html': build_home, 'fiche-chomage.html': build_fiche, 'registre-verification.html': build_registre, 'comparer.html': build_comparer, 'lexique.html': build_lexique}
    for n in DOSSIERS:
        jobs[f'dossier-{n}.html'] = (lambda n=n: build_dossier(n))
    outdir = ROOT / '.artifacts'
    for fname, fn in jobs.items():
        html, title, desc = fn()
        site = links(html, 'site')
        left = set(re.findall(r'__(?:HOME|FICHE|EMPLOI|FINANCES|PENSIONS|IMMIGRATION|JUSTICE|SANTE|EDUCATION|INEGALITES|CLIMAT|LOGEMENT|REGISTRE|COMPARER|LEXIQUE|MAP|DATA|WORLD)__', site))
        if left:
            sys.exit(f'{fname} : marqueurs non remplacés {left}')
        (ROOT / fname).write_text(wrap(site, title, desc), encoding='utf-8')
        if artifact:
            outdir.mkdir(exist_ok=True)
            (outdir / fname).write_text(links(html, 'artifact'), encoding='utf-8')
        print('construit', fname)


if __name__ == '__main__':
    main()
