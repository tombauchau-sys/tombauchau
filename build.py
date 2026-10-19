#!/usr/bin/env python3
"""Construit toutes les pages d’Au plus Juste à partir du dossier src/.

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
    '__FISCALITE__': ('dossier-fiscalite.html', 'https://claude.ai/artifact/T7v9dVfbcm6AYfiy8GYtqu'),
    '__REGISTRE__': ('registre-verification.html', 'https://claude.ai/artifact/Dg6d1Tr6wmDe1SFiUjHjYC'),
    '__COMPARER__': ('comparer.html', 'https://claude.ai/artifact/P1ppwNCEvjgmHgZ9VkbXmD'),
    '__LEXIQUE__': ('lexique.html', 'https://claude.ai/artifact/LQDyy5p1qNjdLvMPncXWce'),
    '__NOUVEAUTES__': ('nouveautes.html', 'https://claude.ai/artifact/MKkMEQ9idW3eqNF3dmgM98'),
    '__BIBLIO__': ('bibliographie.html', 'https://claude.ai/artifact/QTMzZD1FWW3XYzuJknJnrQ'),
}
FONTS = '''<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Caveat:wght@600&display=swap">
'''
DOSSIERS = {
    'emploi': ('Emploi et inactivité · Au plus Juste', 'Emploi et inactivité en Belgique : taux d’emploi, chômage, invalidité, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'finances': ('Finances publiques · Au plus Juste', 'Dette, déficit, dépenses par fonction, intérêts et notes des agences : les finances publiques belges en chiffres vérifiés, avec l’état de la recherche et des lectures plurielles.'),
    'immigration': ('Immigration et asile · Au plus Juste', 'Immigration et asile en Belgique : personnes nées à l’étranger, étrangers, demandes d’asile, emploi des immigrés, histoire depuis 1930, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'justice': ('Justice et sécurité · Au plus Juste', 'Justice et sécurité en Belgique : criminalité enregistrée et chiffre noir, prisons surpeuplées, récidive, histoire pénale, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'sante': ('Santé · Au plus Juste', 'Santé en Belgique : espérance de vie et années en bonne santé, dépenses et accès aux soins, mortalité évitable, inégalités sociales, histoire de l’assurance maladie, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'education': ('Éducation · Au plus Juste', 'Éducation en Belgique : compétences des élèves (PISA), redoublement, décrochage, diplômes et emploi, histoire de l’école, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'inegalites': ('Inégalités et pauvreté · Au plus Juste', 'Inégalités et pauvreté en Belgique : risque de pauvreté, privations, redistribution, Gini, patrimoine, écarts entre Régions, histoire de l’aide sociale, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'climat': ('Climat et énergie · Au plus Juste', 'Climat et énergie en Belgique : émissions de gaz à effet de serre par secteur, renouvelables, nucléaire, dépendance énergétique, prix de l’électricité, précarité énergétique, histoire, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'logement': ('Logement · Au plus Juste', 'Le logement en Belgique : prix, rapport prix/revenu, propriétaires et locataires, surcharge des coûts, logement social, sans-abrisme, jeunes chez leurs parents, histoire, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'fiscalite': ('Fiscalité · Au plus Juste', 'La fiscalité en Belgique : niveau des prélèvements depuis 1965, composition (travail, consommation, patrimoine), qui paie selon le salaire, transferts entre Régions, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
    'pensions': ('Pensions et vieillissement · Au plus Juste', 'Pensions et vieillissement en Belgique : dépenses, niveau des pensions, pauvreté des aînés, âge de départ, histoire du système, état de la recherche et lectures plurielles. Chiffres vérifiés et sourcés.'),
}
HOME_DESC = 'Au plus Juste, outil citoyen : des chiffres vérifiés sur la Belgique et les 27 pays de l’Union. Notes des agences, budget public par fonction, dette, pauvreté, commerce entre pays, classements, avec sources et limites.'
FICHE_DESC = 'Chômage en Belgique, 2025 : 6,2 % selon Statbel et Eurostat. Définition, sources croisées, ruptures de série, limites et sept lectures d’intellectuels.'


def read(p):
    return (SRC / p).read_text(encoding='utf-8')


def links(html, mode):
    for ph, (site, art) in PAGES.items():
        html = html.replace(ph, site if mode == 'site' else art)
    return html


BASE = 'https://auplusjuste.be/'
BUILD_DATE = __import__('datetime').date.today().isoformat()
# Titres pour les moteurs de recherche (60 caractères environ), par fichier
SEO_TITLES = {
    'index.html': 'Au plus Juste · chiffres vérifiés sur la Belgique et l’Europe',
    'fiche-chomage.html': 'Chômage en Belgique : définitions et chiffres · Au plus Juste',
    'dossier-emploi.html': 'Emploi et inactivité en Belgique · Au plus Juste',
    'dossier-finances.html': 'Dette et finances publiques belges · Au plus Juste',
    'dossier-pensions.html': 'Pensions et vieillissement en Belgique · Au plus Juste',
    'dossier-immigration.html': 'Immigration et asile en Belgique · Au plus Juste',
    'dossier-justice.html': 'Justice, criminalité et prisons en Belgique · Au plus Juste',
    'dossier-sante.html': 'Santé en Belgique : espérance de vie, soins · Au plus Juste',
    'dossier-education.html': 'Éducation en Belgique : PISA, diplômes · Au plus Juste',
    'dossier-inegalites.html': 'Inégalités et pauvreté en Belgique · Au plus Juste',
    'dossier-fiscalite.html': 'Impôts en Belgique : 45,1 % du PIB en 2024, composition, taux selon le salaire, impôts sur le patrimoine, transferts entre Régions. Chiffres vérifiés et sourcés.', 'dossier-climat.html': 'Climat et énergie en Belgique · Au plus Juste',
    'dossier-logement.html': 'Logement en Belgique : prix, loyers · Au plus Juste',
    'dossier-fiscalite.html': 'Impôts et fiscalité en Belgique : qui paie quoi · Au plus Juste',
    'comparer.html': 'Comparer les 27 pays de l’Union européenne · Au plus Juste',
    'nouveautes.html': 'Nouveautés et corrections · Au plus Juste',
    'lexique.html': 'Lexique politique, économique et européen · Au plus Juste',
    'registre-verification.html': 'Registre de vérification des chiffres · Au plus Juste',
    'bibliographie.html': 'Bibliographie complète, APA 7 et Chicago · Au plus Juste',
}
AUTHOR = {'@type': 'Person', 'name': 'Tom Bauchau'}
# Descriptions pour les moteurs de recherche (160 caractères au plus)
SEO_DESC = {'index.html': 'Outil citoyen : chiffres vérifiés sur la Belgique et l’Europe (dette, emploi, pauvreté, climat, logement), avec sources, définitions et limites.', 'comparer.html': 'Comparer les 27 pays de l’Union sur une trentaine d’indicateurs Eurostat : emploi, finances publiques, santé, éducation, pauvreté, climat, logement.', 'dossier-climat.html': 'Climat et énergie en Belgique : émissions par secteur, renouvelables, nucléaire, dépendance énergétique, prix de l’électricité. Chiffres vérifiés.', 'dossier-education.html': 'Éducation en Belgique : compétences des élèves (PISA), redoublement, décrochage, diplômes et emploi. Chiffres vérifiés, sources et limites.', 'dossier-finances.html': 'Dette, déficit, dépenses par fonction, intérêts et notes des agences : les finances publiques belges en chiffres vérifiés, avec leurs limites.', 'dossier-immigration.html': 'Immigration et asile en Belgique : personnes nées à l’étranger, titres de séjour, demandes d’asile, emploi. Chiffres vérifiés et sources.', 'dossier-inegalites.html': 'Inégalités et pauvreté en Belgique : risque de pauvreté, privations, redistribution, Gini, patrimoine. Chiffres vérifiés, sources et limites.', 'dossier-justice.html': 'Justice et sécurité en Belgique : criminalité enregistrée, chiffre noir, prisons surpeuplées, récidive. Chiffres vérifiés et sources.', 'dossier-logement.html': 'Logement en Belgique : prix, rapport prix/revenu, propriétaires et locataires, coût du logement, logement social. Chiffres vérifiés.', 'dossier-pensions.html': 'Pensions et vieillissement en Belgique : dépenses, niveau des pensions, pauvreté des aînés, âge de départ, réforme. Chiffres vérifiés.', 'dossier-sante.html': 'Santé en Belgique : espérance de vie, années en bonne santé, dépenses, accès aux soins, mortalité évitable. Chiffres vérifiés et sources.', 'lexique.html': 'Lexique de 166 termes politiques, économiques, sociaux et européens : institutions belges, traités (Maastricht, Lisbonne…), statistique.'}


def jsonld(fname, title, desc):
    url = BASE + ('' if fname == 'index.html' else fname)
    site = {'@type': 'WebSite', '@id': BASE + '#site', 'name': 'Au plus Juste', 'url': BASE, 'inLanguage': 'fr', 'author': AUTHOR,
            'description': 'Outil citoyen de chiffres vérifiés sur la Belgique et l’Europe, avec sources, définitions et limites.'}
    if fname == 'index.html':
        data = site
    else:
        data = {'@type': 'WebPage', 'name': title, 'url': url, 'description': desc, 'inLanguage': 'fr',
                'dateModified': BUILD_DATE, 'isPartOf': {'@id': BASE + '#site'}, 'author': AUTHOR}
        if fname == 'lexique.html':
            sys.path.insert(0, str(SRC / 'lexique'))
            import build_lexique as BL
            terms = BL.load()
            data = {'@type': 'DefinedTermSet', 'name': 'Lexique d’Au plus Juste', 'url': url, 'inLanguage': 'fr',
                    'description': desc, 'dateModified': BUILD_DATE, 'isPartOf': {'@id': BASE + '#site'},
                    'hasDefinedTerm': [{'@type': 'DefinedTerm', 'name': e['t'], 'description': e['d'],
                                        'url': url + '#t-' + BL.slug(e['t'])} for e in terms]}
        data = [site, data]
    return '<script type="application/ld+json">' + json.dumps({'@context': 'https://schema.org', '@graph': data if isinstance(data, list) else [data]}, ensure_ascii=False).replace('</', '<\\/') + '</script>\n'


def wrap(html, title, desc, fname='index.html'):
    """Version site : document HTML complet avec métadonnées pour les moteurs de recherche."""
    seo = SEO_TITLES.get(fname, title)
    desc = SEO_DESC.get(fname, desc)
    html = re.sub(r'<title>[^<]*</title>', '<title>' + seo.replace('\\', '') + '</title>', html, count=1)
    url = BASE + ('' if fname == 'index.html' else fname)
    i = html.index('</style>') + 8
    e = lambda t: t.replace('"', '&quot;')
    head = ('<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            f'<meta name="description" content="{e(desc)}">\n'
            '<meta name="robots" content="index, follow, max-snippet:-1">\n'
            '<meta name="google-site-verification" content="8CY4p_RIcIztYWd81ESIhaF0xvL9GLfE-ciBlfuM7q4">\n'
            f'<link rel="canonical" href="{url}">\n'
            f'<meta property="og:title" content="{e(seo)}">\n'
            f'<meta property="og:description" content="{e(desc)}">\n'
            f'<meta property="og:url" content="{url}">\n'
            f'<meta property="og:type" content="{"website" if fname == "index.html" else "article"}">\n'
            '<meta property="og:site_name" content="Au plus Juste">\n<meta property="og:locale" content="fr_BE">\n'
            '<meta name="twitter:card" content="summary">\n'
            + jsonld(fname, seo, desc))
    return head + html[:i] + '\n</head>\n<body>\n' + html[i:] + '</body>\n</html>\n'


def write_seo_files(fnames):
    """Plan du site et robots.txt pour les moteurs de recherche."""
    order = ['index.html'] + sorted(f for f in fnames if f != 'index.html')
    urls = ''.join(f'  <url><loc>{BASE + ("" if f == "index.html" else f)}</loc><lastmod>{BUILD_DATE}</lastmod></url>\n' for f in order)
    (ROOT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '</urlset>\n', encoding='utf-8')
    (ROOT / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: ' + BASE + 'sitemap.xml\n', encoding='utf-8')


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
    'fiscalite': ['tax', 'revenue', 'spend'],
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
    gate_html = src[src.index('<section class="gate grain"'):src.index('<nav class="top"')]
    body = read('accueil/body.html').replace('<div class="frame"><svg id="map"', '<div class="mframe"><svg id="map"')
    js = src[src.index('<script>', src.index('<nav class="top"')):]  # script principal (le premier <script> est celui de la page d’entrée)
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
    titles = {'emploi': 'Emploi et inactivité', 'finances': 'Finances publiques', 'pensions': 'Pensions et vieillissement', 'immigration': 'Immigration et asile', 'justice': 'Justice et sécurité', 'sante': 'Santé', 'education': 'Éducation', 'inegalites': 'Inégalités et pauvreté', 'climat': 'Climat et énergie', 'logement': 'Logement', 'fiscalite': 'Fiscalité'}
    groups = [{'t': titles[n], 'href': '__' + n.upper() + '__', 'ind': DOSSIER_IND[n]} for n in titles]
    allids = sorted({i for n in titles for i in DOSSIER_IND[n]})
    out += '<script>' + cmp_script(allids, 'CJC.home(' + json.dumps(groups, ensure_ascii=False) + ');') + '</script>\n'
    return out, 'Atlas Au plus Juste', HOME_DESC


def build_fiche():
    s = read('fiche/fiche-chomage.html')
    css = read('dossiers/dossier.css')
    v2 = css[css.index('/* ===== V2'):]  # composants pédagogiques partagés avec les dossiers
    s = s.replace('</style>', v2 + '</style>', 1)
    i = s.rindex('</script>')
    s = s[:i] + '\n' + read('dossiers/common.js') + s[i:]
    j = s.index('<script>') + 8
    s = s[:j] + read('dossiers/cjd.js') + '\n' + s[j:]
    s = add_cite(s, 'Le chômage : définitions et chiffres', 'fiche-chomage.html', 'fiche')
    return s, 'Chômage · Au plus Juste', FICHE_DESC


SELECTION_NOTE = ('<details class="cj-sel" data-r><summary>Comment ces études ont été choisies</summary>'
    '<p>Ce n’est pas une revue systématique : la sélection est raisonnée, pas exhaustive. Les études sont cherchées dans les revues de littérature et méta-analyses récentes, dans les bases d’articles et de documents de travail en sciences sociales (Google Scholar, RePEc, NBER, IZA) et dans les publications des institutions et centres de recherche belges (Banque nationale, Bureau fédéral du Plan, Conseil supérieur de l’emploi, universités).</p>'
    '<p><b>Retenues</b> : les études publiées (revue à comité de lecture, document de travail d’une institution reconnue ou rapport public), dont la méthode est décrite, portant sur la Belgique ou sur un pays comparable ; les études belges sont privilégiées quand elles existent. <b>Écartées</b> : les textes d’opinion, les études sans méthode décrite et celles qui n’ont pas pu être lues à la source. Quand des études sérieuses aboutissent à des conclusions opposées, le badge « Débattu » l’indique et les deux côtés sont cités.</p>'
    '<p>Une étude importante manque ? Signalez-la (voir la <a href="__HOME__#methode">méthode</a>, point 07).</p></details>')


MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']


def add_cite(body, titre, fname, genre):
    """Encadré « Comment citer » : référence complète, version datée (date de vérification), date de consultation remplie par le navigateur."""
    m = re.search(r'(?:Dossier|Fiche[^<]*?) vérifiée? le (\d{1,2}(?:er)? \w+ (\d{4}))', body)
    ver, an = (m.group(1), m.group(2)) if m else (None, BUILD_DATE[:4])
    url = BASE + fname
    ref = (f'Bauchau, T. ({an}). <i>{titre}</i> [{genre}]. Au plus Juste' + (f', version du {ver}' if ver else '') +
           f'. Consulté le <span class="cj-today">…</span>, à l’adresse {url}')
    box = ('<div class="cj-cite"><p class="cj-cite-t">Comment citer ce ' + genre + '</p>'
           '<p class="cj-ref">' + ref + '</p>'
           '<p class="cj-cite-n">Pour un chiffre précis, citez aussi sa source primaire (indiquée sous chaque graphique) : Au plus Juste rassemble et explique des données, il ne les produit pas. Les données de chaque graphique sont téléchargeables (« Voir les données du graphique »). Code et données du site : <a href="https://github.com/tombauchau-sys/tombauchau" target="_blank" rel="noopener">dépôt public GitHub</a>.</p>'
           '<button type="button" class="cj-copy">Copier la référence</button></div>')
    if genre == 'fiche':
        k = body.index('</div>\n</section>\n</main>')
        return body[:k] + box + body[k:]
    ms = list(re.finditer(r'<p class="maj">Journal des corrections.*?</p>', body, re.S)) or list(re.finditer(r'<p class="maj">.*?</p>', body, re.S))
    assert ms, fname
    e = ms[-1].end()
    return body[:e] + box + body[e:]


def verif_badge(body, name):
    """Badge de confiance en tête du dossier : date de vérification, nombre d’affirmations contrôlées, sources liées, registre."""
    import csv
    n_aff = sum(1 for r in csv.DictReader(open(ROOT / 'verif' / 'registre.csv', encoding='utf-8')) if name in [p.strip() for p in r['page'].split('/')])
    n_src = len({h for h in re.findall(r'href="(https?://[^"#]+)', body)})
    m = re.search(r'<p class="maj">Dossier vérifié le ([^·<]+?)\s*·\s*([^<]*)</p>', body)
    assert m, name
    date, nxt = m.group(1).strip(), m.group(2).strip()
    badge = ('<p class="maj verif-badge"><span class="vb-ok" aria-hidden="true">✓</span> <b>Dossier vérifié le ' + date + '</b>'
             f' · {n_aff} affirmations contrôlées à la source · {n_src} sources liées · <a href="__REGISTRE__">voir le registre</a>'
             ' · <a href="__NOUVEAUTES__">corrections</a><br><span class="vb-next">' + nxt[0].upper() + nxt[1:] + '</span></p>')
    return body[:m.start()] + badge + body[m.end():]


def _txt(h):
    import html as H
    return re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', h))).strip()


def search_index():
    """Index de la recherche globale, construit avec le site : dossiers (parties, fiches, chiffres clés), lexique, indicateurs, pages."""
    out = []
    def add(t, c, u, k):
        t, c = _txt(t), _txt(c)
        if t and (t, u) not in {(e[0], e[2]) for e in out}:
            out.append([t, c[:240], u, k])
    names = {'emploi': 'Emploi', 'finances': 'Finances publiques', 'pensions': 'Pensions', 'immigration': 'Immigration', 'justice': 'Justice', 'sante': 'Santé', 'education': 'Éducation', 'inegalites': 'Inégalités', 'climat': 'Climat', 'logement': 'Logement', 'fiscalite': 'Fiscalité'}
    if (SRC / 'dossiers' / 'fiscalite-body.html').exists():
        names['fiscalite'] = 'Fiscalité'
    for n in names:
        ph = '__' + n.upper() + '__'
        b = read(f'dossiers/{n}-body.html')
        add('Dossier ' + names[n], DOSSIERS[n][1], ph, 'Dossier')
        for sec in re.finditer(r'<section[^>]*aria-labelledby="([^"]+)"[^>]*>(.*?)</section>', b, re.S):
            hid, inner = sec.group(1), sec.group(2)
            h = re.search(r'<h[12][^>]*id="' + re.escape(hid) + r'"[^>]*>(.*?)</h[12]>', inner, re.S)
            if not h:
                continue
            p = re.search(r'<p class="(?:lede|ans|lead)[^"]*"[^>]*>(.*?)</p>', inner, re.S) or re.search(r'<p[^>]*>(.*?)</p>', inner, re.S)
            add(h.group(1), names[n] + ' · ' + (p.group(1) if p else ''), ph + '#' + hid, names[n])
            for card in re.finditer(r'<a href="#([^"]+)"><span class="n">\d+</span><h3>(.*?)</h3><p>(.*?)</p>', inner):
                add(card.group(2), names[n] + ' · ' + card.group(3), ph + '#' + card.group(1), names[n])
            for fact in re.finditer(r'<div><b>(.*?)</b><span>(.*?)</span>', inner):
                add(_txt(fact.group(1)) + ' ' + _txt(fact.group(2)), names[n] + ' · chiffre clé', ph + '#' + hid, 'Chiffre')
            for h3 in re.finditer(r'<h3[^>]*>(.*?)</h3>', inner):
                t = _txt(h3.group(1))
                if 12 < len(t) < 120 and not t.startswith(('Pourquoi la réponse', 'La confusion', 'Le mécanisme', 'Pour réutiliser')):
                    add(t, names[n], ph + '#' + hid, names[n])
    add('Fiche : le chômage', FICHE_DESC, '__FICHE__', 'Fiche')
    home = read('accueil/body.html')
    for sec in re.finditer(r'<section[^>]*id="([^"]+)"[^>]*aria-labelledby="([^"]+)"[^>]*>(.*?)</section>', home, re.S):
        sid, inner = sec.group(1), sec.group(3)
        h = re.search(r'<h2[^>]*>(.*?)</h2>', inner, re.S)
        if h:
            add(h.group(1), 'Accueil', '__HOME__#' + sid, 'Page')
        if sid in ('methode', 'apropos'):
            for h3 in re.finditer(r'<h3[^>]*>(?:<span[^>]*>\d+</span>)?(.*?)</h3>\s*(?:<p[^>]*>(.*?)</p>)?', inner, re.S):
                add(h3.group(1), ('Méthode · ' if sid == 'methode' else 'À propos · ') + (h3.group(2) or ''), '__HOME__#' + sid, 'Méthode')
    ind = json.loads(read('compare/indicators.json'))
    for k, v in ind.items():
        add(v.get('lab', k), 'Comparer les 27 pays · ' + v.get('def', '') + ' Source : ' + v.get('src', ''), '__COMPARER__', 'Indicateur')
    sys.path.insert(0, str(SRC / 'lexique'))
    import build_lexique as BL
    for e in BL.load():
        add(e['t'], e['d'], '__LEXIQUE__#t-' + BL.slug(e['t']), 'Lexique')
    add('Registre de vérification', 'Chaque affirmation contrôlée à sa source primaire', '__REGISTRE__', 'Page')
    add('Nouveautés et corrections', 'Journal des ajouts et corrections', '__NOUVEAUTES__', 'Page')
    add('Comparer les pays', 'Comparer les 27 pays de l’Union sur une trentaine d’indicateurs', '__COMPARER__', 'Page')
    return out


_SHARED = None
def shared(html):
    """Ajoute à chaque page le menu mobile, la recherche globale et le sommaire des dossiers."""
    global _SHARED
    if _SHARED is None:
        idx = json.dumps(search_index(), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
        _SHARED = (read('shared/site.css'), '<script>var CJS=' + idx + ';\n' + read('shared/site.js') + '</script>\n')
    css, js = _SHARED
    i = html.index('</style>')
    return html[:i] + css + html[i:] + js


def build_dossier(name):
    fiche = read('fiche/fiche-chomage.html')
    css = fiche[fiche.index('<style>') + 7:fiche.index('</style>')] + read('dossiers/dossier.css')
    title, desc = DOSSIERS[name]
    head = f'<title>{title}</title>\n' + FONTS + '<style>' + css + '</style>\n'
    nav = '''<button type="button" class="a11y" id="a11y" aria-pressed="false"><b>Désactivé</b>Mode accessibilité</button>
<nav class="top" aria-label="Navigation principale">
  <a href="__HOME__#atlas"><span class="lbl" data-t="Carte">Carte</span></a>
  <a href="__HOME__#classements"><span class="lbl" data-t="Classements">Classements</span></a>
  <a href="__HOME__" class="mark" aria-label="Au plus Juste, accueil"><span class="lg" aria-hidden="true"><span class="w1">Au plus </span>J<span class="q"><i class="qq">?</i><i class="uu">u</i></span><span class="w2">ste</span></span></a>
  <a href="__HOME__#dossiers" class="on"><span class="lbl" data-t="Dossiers">Dossiers</span></a>
  <a href="__HOME__#questions"><span class="lbl" data-t="Questions">Questions</span></a>
  <a href="__HOME__#methode"><span class="lbl" data-t="Méthode">Méthode</span></a>
  <a href="__HOME__#apropos" class="lang"><span class="lbl" data-t="À propos">À propos</span></a>
</nav>
'''
    js = read(f'dossiers/{name}.js').replace('__DATA__', read(f'dossiers/{name}-data.json'))
    body = read(f'dossiers/{name}-body.html')
    mk = '<div id="approfondir" aria-hidden="true"></div>'
    assert mk in body, name
    # « Et ailleurs en Europe ? » après les fiches, juste avant « Recherche » : on compare mieux ce qu’on a déjà compris
    r = body.index('id="recherche"')
    r0 = body.rindex('<section', 0, r)
    c0 = body.rfind('<!--', 0, r0)
    if c0 >= 0 and body[c0:r0].strip().endswith('-->') and '<' not in body[c0:r0].strip()[4:-3]:
        r0 = c0
    body = body[:r0] + read('compare/section.html') + '\n' + body[r0:]
    body = verif_badge(body, name)
    body = re.sub(r'(<p class="maj">Dossier vérifié[^<]*)</p>', r'\1 · <a href="#europe">Voir ce dossier pour un autre pays</a></p>', body, count=1)
    i = body.index('id="recherche"')
    j = body.index('</section>', i)
    k = body.rindex('</div>', i, j)
    body = body[:k] + SELECTION_NOTE + body[k:]
    body = add_cite(body, DOSSIERS[name][0].split(' · ')[0], 'dossier-' + name + '.html', 'dossier')
    cmp = cmp_script(DOSSIER_IND[name], 'CJC.dossier({ind:' + json.dumps(DOSSIER_IND[name]) + '});')
    return head + nav + body + '<script>' + read('dossiers/cjd.js') + '\n' + js + '\n' + read('dossiers/common.js') + '</script>\n<script>' + cmp + '</script>\n', title, desc


def build_registre():
    import csv
    names = {'emploi':'Emploi','finances':'Finances publiques','pensions':'Pensions','immigration':'Immigration','justice':'Justice','sante':'Santé','education':'Éducation','inegalites':'Inégalités','climat':'Climat et énergie','logement':'Logement','fiscalite':'Fiscalité','fiche':'Fiche chômage','accueil':'Accueil et carte'}
    rows = list(csv.DictReader(open(ROOT / 'verif' / 'registre.csv', encoding='utf-8')))
    data = [[names.get(r['page'], r['page']), r['affirmation'], r['valeur_site'], r['source_primaire'], r['valeur_source'], r['statut'], r['note']] for r in rows]
    js = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
    html = read('registre/registre.html').replace('__REGDATA__', js)
    return html, 'Registre de vérification · Au plus Juste', 'Chaque affirmation d’Au plus Juste contrôlée à sa source primaire : valeur affichée, source consultée, statut.'


NAV_SIMPLE = '''<button type="button" class="a11y" id="a11y" aria-pressed="false"><b>Désactivé</b>Mode accessibilité</button>
<nav class="top" aria-label="Navigation principale">
  <a href="__HOME__#atlas"><span class="lbl" data-t="Carte">Carte</span></a>
  <a href="__HOME__#classements"><span class="lbl" data-t="Classements">Classements</span></a>
  <a href="__HOME__" class="mark" aria-label="Au plus Juste, accueil"><span class="lg" aria-hidden="true"><span class="w1">Au plus </span>J<span class="q"><i class="qq">?</i><i class="uu">u</i></span><span class="w2">ste</span></span></a>
  <a href="__HOME__#dossiers"><span class="lbl" data-t="Dossiers">Dossiers</span></a>
  <a href="__HOME__#questions"><span class="lbl" data-t="Questions">Questions</span></a>
  <a href="__HOME__#methode"><span class="lbl" data-t="Méthode">Méthode</span></a>
  <a href="__HOME__#apropos" class="lang"><span class="lbl" data-t="À propos">À propos</span></a>
</nav>
'''
A11Y_INIT = ("(function(){var D=document,H=D.documentElement,ab=D.getElementById('a11y'),calm=false;H.classList.add('js');"
            "try{calm=localStorage.getItem('cj-a11y')==='1'}catch(e){}"
            "function set(on){calm=on;H.classList.toggle('calm',on);ab.setAttribute('aria-pressed',on);ab.querySelector('b').textContent=on?'Activé':'Désactivé';try{localStorage.setItem('cj-a11y',on?'1':'0')}catch(e){}}"
            "set(calm);ab.onclick=function(){set(!calm)};"
            ""
            "})();\n")


def build_comparer():
    fiche = read('fiche/fiche-chomage.html')
    css = fiche[fiche.index('<style>') + 7:fiche.index('</style>')] + read('dossiers/dossier.css') + '\n.cmp-page{padding-top:140px}.cmp-page .cmp-how{margin-top:56px;max-width:80ch}.cmp-page .cmp-how ul{font:17px/1.55 var(--sans);padding-left:1.2em;display:grid;gap:10px}\n'
    title = 'Comparer les pays · Au plus Juste'
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
    title = 'Lexique · Au plus Juste'
    desc = f'Lexique d’Au plus Juste : {n} définitions des termes politiques, économiques, sociaux et européens du débat public, des institutions belges aux traités de l’Union (Maastricht, Lisbonne…).'
    head = f'<title>{title}</title>\n' + FONTS + '<style>' + css + lcss + '</style>\n'
    return head + nav + body + '<script>' + js + '</script>\n', title, desc


def build_biblio():
    sys.path.insert(0, str(SRC / 'biblio'))
    import build_biblio as BB
    fiche = read('fiche/fiche-chomage.html')
    css = fiche[fiche.index('<style>') + 7:fiche.index('</style>')] + read('dossiers/dossier.css')
    body, bcss, js, n = BB.build(read, NAV_SIMPLE, A11Y_INIT)
    title = 'Bibliographie · Au plus Juste'
    desc = f'Les {n} sources d’Au plus Juste (statistiques officielles, textes, études, ouvrages, presse) en APA 7 et en Chicago, avec les dossiers où elles sont citées.'
    head = f'<title>{title}</title>\n' + FONTS + '<style>' + css + bcss + '</style>\n'
    return head + NAV_SIMPLE + body + '<script>' + js + '</script>\n', title, desc


def build_nouveautes():
    """Page « Nouveautés et corrections » : journal du site, journaux des dossiers (repris automatiquement) et calendrier des prochaines mises à jour."""
    import html as H
    sys.path.insert(0, str(SRC / 'nouveautes'))
    import nv_journal as SJ
    fiche = read('fiche/fiche-chomage.html')
    css = fiche[fiche.index('<style>') + 7:fiche.index('</style>')] + read('dossiers/dossier.css')
    css += """
.nv-page{padding-top:140px}
.nv-page h2.sub{margin-top:64px}
.nv-log{list-style:none;padding:0;margin:24px 0 0;max-width:90ch;font:17px/1.55 var(--sans)}
.nv-log>li{padding:18px 0;border-top:1px solid rgba(26,26,26,.18)}
.nv-log time{display:block;font-weight:700;margin-bottom:6px}
.nv-log ul{margin:0;padding-left:1.2em;display:grid;gap:6px}
.nv-log a{color:var(--ink)}
.nv-cal{width:100%;max-width:1000px;border-collapse:collapse;margin-top:24px;font:16px/1.45 var(--sans)}
.nv-cal th,.nv-cal td{text-align:left;padding:10px 12px;border-top:1px solid rgba(26,26,26,.18);vertical-align:top}
.nv-cal thead th{border-top:0;font-size:13px;letter-spacing:.06em;text-transform:uppercase}
.nv-cal a{color:var(--ink)}
.nv-how{max-width:80ch;font:17px/1.55 var(--sans)}
.nv-how ul{padding-left:1.2em;display:grid;gap:10px}
@media (max-width:640px){.nv-cal thead{display:none}.nv-cal tr{display:block;padding:10px 0;border-top:1px solid rgba(26,26,26,.18)}.nv-cal td,.nv-cal th{display:block;border:0;padding:2px 0}}
"""
    pages = [('fiche', 'Fiche chômage', '__FICHE__', fiche)] + [(n, DOSSIERS[n][0].split(' · ')[0], '__' + n.upper() + '__', read(f'dossiers/{n}-body.html')) for n in DOSSIERS]
    cal, logs = [], []
    for key, nom, ph, src in pages:
        txt = re.sub(r'<[^>]+>', '', src)
        mv = re.search(r'[Vv]érifiée? le (\d{1,2}(?:er)? \w+ \d{4})', txt)
        mn = re.search(r'prochaine mise à jour : ([^\n<]+)', src)
        cal.append(f'<tr><th scope="row"><a href="{ph}">{nom}</a></th><td>{mv.group(1) if mv else "—"}</td><td>{mn.group(1).strip() if mn else "—"}</td></tr>')
        mj = re.search(r'<p class="maj">Journal des corrections · (.*?)</p>', src, re.S)
        if mj:
            for d, t in re.findall(r'(\d{1,2}(?:er)? \w+ \d{4}) : (.*?)(?=\s\d{1,2}(?:er)? \w+ \d{4} : |$)', mj.group(1), re.S):
                logs.append((d, nom, ph, t.strip()))
    MO = {'octobre': 10, 'novembre': 11, 'décembre': 12, 'septembre': 9}
    def key_d(d):
        j, m, a = d.split(' ')
        return (int(a), MO.get(m, 0), int(j.replace('er', '')))
    dates = sorted({d for d, _ in SJ.SITE} | {l[0] for l in logs}, key=key_d, reverse=True)
    items = []
    for d in dates:
        lis = [f'<li>{H.escape(t)}</li>' for dd, ts in SJ.SITE if dd == d for t in ts]
        lis += [f'<li><a href="{ph}">{nom}</a> : {t}</li>' for dd, nom, ph, t in logs if dd == d]
        items.append(f'<li><time>{d}</time><ul>{"".join(lis)}</ul></li>')
    body = f"""<main id="top">
<section class="sec papier nv-page" aria-labelledby="nvT">
  <div class="wrap">
    <span class="kick">Nouveautés et corrections</span>
    <h1 class="giant" id="nvT">Ce qui a changé, <span>et quand.</span></h1>
    <p class="lede">Un chiffre corrigé n’est jamais remplacé en silence. Cette page rassemble les ajouts et les corrections de tout le site, du plus récent au plus ancien, et les prochaines publications attendues des sources. Le détail ligne par ligne des vérifications est dans le <a href="__REGISTRE__">registre de vérification</a>.</p>
    <h2 class="sub">Journal</h2>
    <ol class="nv-log">{''.join(items)}</ol>
    <h2 class="sub">Prochaines mises à jour</h2>
    <p class="nv-how">Les instituts publient à dates fixes : quand une nouvelle donnée paraît, le dossier est mis à jour et la date de vérification change. Une date ancienne invite à consulter la source, dont le lien figure sous chaque graphique.</p>
    <table class="nv-cal"><thead><tr><th scope="col">Page</th><th scope="col">Dernière vérification</th><th scope="col">Prochaine mise à jour attendue</th></tr></thead><tbody>{''.join(cal)}</tbody></table>
    <div class="nv-how">
      <h2 class="sub">Comment le site est tenu à jour</h2>
      <ul>
        <li><b>Chaque mois</b>, les tables utilisées (Eurostat et sources belges) sont comparées à leur dernière mise à jour publiée ; une nouvelle donnée ou une révision donne lieu à une vérification à la source, puis à une entrée dans ce journal.</li>
        <li><b>Les révisions comptent</b> : les instituts corrigent souvent les années récentes. Une valeur révisée est mise à jour et signalée ici, comme une erreur corrigée.</li>
        <li><b>Signaler une erreur</b> : voir la <a href="__HOME__#methode">méthode</a>, point 07.</li>
      </ul>
    </div>
  </div>
</section>
</main>

<footer>
  <div class="meta"><span>Au plus Juste · Nouveautés et corrections</span><span><a href="mailto:contact@auplusjuste.be?subject=Signaler%20une%20erreur">Signaler une erreur</a> · <a href="__HOME__#dossiers">Tous les dossiers →</a></span></div>
  <div class="wm" aria-hidden="true">Au plus Juste</div>
</footer>
"""
    title = 'Nouveautés et corrections · Au plus Juste'
    desc = 'Journal des ajouts et corrections d’Au plus Juste, et calendrier des prochaines mises à jour des sources.'
    head = f'<title>{title}</title>\n' + FONTS + '<style>' + css + '</style>\n'
    return head + NAV_SIMPLE + body + '<script>' + A11Y_INIT + '</script>\n', title, desc


def main():
    artifact = '--artifact' in sys.argv
    jobs = {'index.html': build_home, 'fiche-chomage.html': build_fiche, 'registre-verification.html': build_registre, 'comparer.html': build_comparer, 'lexique.html': build_lexique, 'nouveautes.html': build_nouveautes, 'bibliographie.html': build_biblio}
    for n in DOSSIERS:
        jobs[f'dossier-{n}.html'] = (lambda n=n: build_dossier(n))
    outdir = ROOT / '.artifacts'
    for fname, fn in jobs.items():
        html, title, desc = fn()
        html = shared(html)
        site = links(html, 'site')
        left = set(re.findall(r'__(?:HOME|FICHE|EMPLOI|FINANCES|PENSIONS|IMMIGRATION|JUSTICE|SANTE|EDUCATION|INEGALITES|CLIMAT|LOGEMENT|FISCALITE|REGISTRE|COMPARER|LEXIQUE|NOUVEAUTES|BIBLIO|MAP|DATA|WORLD)__', site))
        if left:
            sys.exit(f'{fname} : marqueurs non remplacés {left}')
        (ROOT / fname).write_text(wrap(site, title, desc, fname), encoding='utf-8')
        if artifact:
            outdir.mkdir(exist_ok=True)
            (outdir / fname).write_text(links(html, 'artifact'), encoding='utf-8')
        print('construit', fname)
    write_seo_files(list(jobs))


if __name__ == '__main__':
    main()
