# -*- coding: utf-8 -*-
"""Page « Bibliographie » : toutes les sources du site, en APA 7e édition et en Chicago (auteur-date, 17e édition).

Les références sont des données (refs.json, eurostat.json) ; ce module ne fait que les mettre en forme.
Les deux styles sont écrits dans la page HTML : le choix du lecteur ne fait que masquer l’un ou l’autre,
la page reste lisible sans JavaScript (les deux styles s’affichent alors l’un sous l’autre)."""
import html as H
import json
import re
import unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
E = H.escape
ORGFLAG = {}
DOSSIER_LINK = {'Emploi': '__EMPLOI__', 'Finances': '__FINANCES__', 'Pensions': '__PENSIONS__', 'Immigration': '__IMMIGRATION__',
                'Justice': '__JUSTICE__', 'Santé': '__SANTE__', 'Éducation': '__EDUCATION__', 'Inégalités': '__INEGALITES__',
                'Climat': '__CLIMAT__', 'Logement': '__LOGEMENT__', 'Fiscalité': '__FISCALITE__', 'Lexique': '__LEXIQUE__',
                'Fiche chômage': '__FICHE__', 'Accueil': '__HOME__', 'Carte': '__HOME__#atlas',
                'Classements': '__HOME__#classements', 'Comparer': '__COMPARER__'}
SECTIONS = [('stat', 'Statistiques officielles', 'Jeux de données et tableaux d’Eurostat, puis des autres producteurs publics de statistiques. Le titre est celui du catalogue officiel.'),
            ('inst', 'Institutions, droit et textes officiels', 'Traités, lois, décisions, rapports et pages des institutions belges, européennes et internationales.'),
            ('rech', 'Recherche', 'Articles de revues à comité de lecture, documents de travail, rapports de recherche et thèses.'),
            ('livre', 'Ouvrages et œuvres de référence', 'Livres, classiques de la pensée politique, économique et sociale. Pour les classiques, l’année est celle de la première publication.'),
            ('media', 'Documentaires', 'Programmes audiovisuels présentés dans les dossiers comme supports de discussion, avec une lecture critique ; ils ne valent jamais preuve.'),
            ('presse', 'Presse', 'Articles de presse utilisés uniquement pour dater un événement en cours ; ils ne valent pas confirmation officielle.')]


def fold(s):
    s = unicodedata.normalize('NFD', (s or '').lower())
    return ''.join(c for c in s if unicodedata.category(c) != 'Mn')


# ---------------- auteurs ----------------
def people(a, org=False):
    """'Nom, Prénom; Nom, P.' -> [(nom, prénom)] ; institution -> [(nom, '')]. Retourne aussi et_al."""
    if org:
        return [(a, '')], False
    etal = a.endswith(' et al.')
    if etal:
        a = a[:-7]
    out = []
    for p in a.split(';'):
        p = p.strip()
        if not p:
            continue
        if ', ' in p and not re.search(r'\b(Bureau|Centre|Commission|Conseil|Organisation|Office|Parlement|Service|SPF|Union|Banque)\b', p.split(', ')[0]):
            f, g = p.split(', ', 1)
            out.append((f, g))
        else:
            out.append((p, ''))
    return out, etal


def initials(g):
    parts = re.split(r'(\s+|-)', g.strip())
    out = ''
    for x in parts:
        if not x.strip():
            out += ' '
        elif x == '-':
            out = out.rstrip() + '-'
        else:
            out += (x if re.fullmatch(r'[A-ZÀ-ÖØ-Þ][a-z]?\.', x) else x[0] + '.')
    return re.sub(r'\s+', ' ', out).strip()


def apa_authors(a):
    ps, etal = people(a, ORGFLAG.get(a, False))
    names = [f + (', ' + initials(g) if g else '') for f, g in ps]
    if etal:
        return names[0] + ' et al.'
    if len(names) > 20:
        names = names[:19] + ['… ' + names[-1]]
    if len(names) == 1:
        return names[0]
    return ', '.join(names[:-1]) + ' et ' + names[-1]


def chi_authors(a):
    ps, etal = people(a, ORGFLAG.get(a, False))
    names = []
    for i, (f, g) in enumerate(ps):
        names.append((f + (', ' + g if g else '')) if i == 0 else ((g + ' ' if g else '') + f))
    if etal:
        return names[0] + ' et al.'
    if len(names) > 10:
        names = names[:7] + ['et al.']
        return ', '.join(names[:-1]) + ' ' + names[-1]
    if len(names) == 1:
        return names[0]
    return ', '.join(names[:-1]) + ' et ' + names[-1]


def end(s):
    s = s.rstrip()
    return s if re.search(r'[.?!»…]$', s) else s + '.'


def link(u):
    return f'<a href="{E(u)}" target="_blank" rel="noopener">{E(u)}</a>'


def doi_or_url(d):
    if d.get('doi'):
        return link('https://doi.org/' + d['doi'])
    if d.get('url'):
        return link(d['url'])
    return ''


def tend(d):
    t = title_it(d)
    return t if re.search(r'[.?!…](</i>)?$', t) else t + '.'


def title_it(d):
    t = d['ti']
    return E(t) if d.get('desc') else f'<i>{E(t)}</i>'


# ---------------- APA 7 ----------------
def apa(d):
    t = d['t']
    who = E(apa_authors(d['a'])) if d.get('a') else ''
    yr = d.get('y') or 's. d.'
    date = f'({E(yr)}{", " + E(d["date"]) if d.get("date") else ""})'
    if t == 'art':
        vol = ''
        if d.get('j'):
            vol = f'<i>{E(d["j"])}</i>'
            if d.get('v'):
                vol += f', <i>{E(d["v"])}</i>'
                if d.get('n'):
                    vol += f'({E(d["n"])})'
            elif d.get('n'):
                vol += f', n° {E(d["n"])}'
            if d.get('p'):
                vol += f', {E(d["p"])}'
            vol += '.'
        s = f'{end(who)} {date}. {end(E(d["ti"]))} {vol}'
    elif t == 'chap':
        s = f'{end(who)} {date}. {end(E(d["ti"]))} Dans <i>{E(d.get("in_", ""))}</i>.'
        if d.get('pub'):
            s += f' {end(E(d["pub"]))}'
    elif t == 'book':
        s = f'{end(who)} {date}. {tend(d)}'
        if d.get('pub'):
            s += f' {end(E(d["pub"]))}'
    elif t == 'press':
        s = f'{end(who)} {date}. {end(E(d["ti"]))}'
    else:  # rep, thesis, web, off, law, stat
        s = f'{end(who)} {date}. {title_it(d)}'
        if d.get('num'):
            s += f' ({E(d["num"])})'
        if t == 'thesis':
            s += ' [Thèse de doctorat]'
        s = s if re.search(r'[.?!](</i>)?$', s) else s + '.'
        if d.get('pub') and d.get('pub') != d.get('a'):
            s += f' {end(E(d["pub"]))}'
    if d.get('note'):
        s += f' ({E(d["note"])}).'
    u = doi_or_url(d)
    return (s + (' ' + u if u else '')).replace('..', '.')


# ---------------- Chicago auteur-date (17e) ----------------
def chi(d):
    t = d['t']
    who = E(chi_authors(d['a'])) if d.get('a') else ''
    yr = E(d.get('y') or 's. d.')
    if t == 'art':
        s = f'{end(who)} {yr}. « {end(E(d["ti"]))} »'
        if d.get('j'):
            s += f' <i>{E(d["j"])}</i>'
            if d.get('v'):
                s += f' {E(d["v"])}'
            if d.get('n'):
                s += f' ({E(d["n"])})' if d.get('v') else f', n° {E(d["n"])}'
            if d.get('p'):
                s += f' : {E(d["p"])}'
            s += '.'
    elif t == 'chap':
        s = f'{end(who)} {yr}. « {end(E(d["ti"]))} » Dans <i>{E(d.get("in_", ""))}</i>.'
        if d.get('pub'):
            s += f' {end(E(d["pub"]))}'
    elif t == 'book':
        s = f'{end(who)} {yr}. {tend(d)}'
        if d.get('pub'):
            s += f' {end(E(d["pub"]))}'
    elif t == 'press':
        s = f'{end(who)} {yr}. « {end(E(d["ti"]))} »' + (f' {E(d["date"])}.' if d.get('date') else '')
    else:
        s = f'{end(who)} {yr}. {tend(d)}'
        if d.get('num'):
            s += f' {end(E(d["num"]))}'
        if t == 'thesis':
            s += ' Thèse de doctorat.'
        if d.get('pub') and d.get('pub') != d.get('a'):
            s += f' {end(E(d["pub"]))}'
    if d.get('note'):
        s += f' {end(E(d["note"][0].upper() + d["note"][1:]))}'
    u = doi_or_url(d)
    return (s + (' ' + u if u else '')).replace('..', '.')


def dataset_entries():
    D = json.loads((HERE / 'eurostat.json').read_text(encoding='utf-8'))
    out = []
    for code, v in D.items():
        if code.startswith('_'):
            continue
        ti, typ, upd = v
        y = upd[-4:]
        kind = 'Jeu de données' if typ == 'dataset' else 'Tableau'
        out.append(dict(t='data', a='Eurostat', y=y, ti=ti, code=code, kind=kind, upd=upd,
                        url=f'https://ec.europa.eu/eurostat/databrowser/view/{code}/default/table?lang=fr', cat='stat', src=[]))
    return out


def apa_data(d):
    return (f'Eurostat. ({d["y"]}). <i>{E(d["ti"])}</i> ({E(d["code"])}) [{d["kind"]}]. '
            f'Dernière mise à jour des données : {d["upd"].replace(".", "/")}. {link(d["url"])}')


def chi_data(d):
    return (f'Eurostat. {d["y"]}. « {end(E(d["ti"]))} » {d["kind"]} {E(d["code"])}, données mises à jour le {d["upd"].replace(".", "/")}. {link(d["url"])}')


def sortkey(d):
    return (fold(people(d.get('a') or '', d.get('org'))[0][0][0] if d.get('a') else ''), d.get('y') or '0', fold(d.get('a') or ''), fold(d['ti']))


def where(d):
    out = []
    for s in d.get('src', []):
        h = DOSSIER_LINK.get(s)
        out.append(f'<a href="{h}">{E(s)}</a>' if h else E(s))
    return ' · '.join(out)


def item(d, a, c):
    k = fold(' '.join([d.get('a') or '', d['ti'], d.get('y') or '', d.get('code', ''), d.get('j', '') or '']))
    srcs = ' '.join(fold(s) for s in d.get('src', []))
    badge = ''
    if d.get('ok') == 'crossref':
        badge = '<span class="bb-ok" title="Auteurs, revue, volume, numéro et pages contrôlés dans la base Crossref le 19 octobre 2026">métadonnées vérifiées</span>'
    if d.get('check'):
        badge += f'<span class="bb-chk">{E(d["check"])}</span>'
    w = where(d)
    return (f'<li data-k="{E(k)}" data-s="{E(srcs)}"><p class="bb-apa">{a}</p><p class="bb-chi">{c}</p>'
            + (f'<p class="bb-w">{badge}{"<b>Cité dans</b> " + w if w else ""}</p>' if (w or badge) else '') + '</li>')


def build(read, nav, init_js):
    refs = json.loads((HERE / 'refs.json').read_text(encoding='utf-8'))
    for d in refs:
        if d.get('org'):
            ORGFLAG[d['a']] = True
    data = dataset_entries()
    n_cr = sum(1 for d in refs if d.get('ok') == 'crossref')
    secs = []
    total = 0
    for key, lab, intro in SECTIONS:
        items = []
        if key == 'stat':
            items += [item(d, apa_data(d), chi_data(d)) for d in sorted(data, key=lambda d: d['code'])]
        rs = sorted([d for d in refs if d['cat'] == key], key=sortkey)
        items += [item(d, apa(d), chi(d)) for d in rs]
        total += len(items)
        secs.append(f'<section class="bb-sec" id="b-{key}" aria-labelledby="bh-{key}"><h2 class="sub" id="bh-{key}">{lab} <span class="bb-n">{len(items)}</span></h2>'
                    f'<p class="bb-intro">{intro}</p><ol class="bb-list">{"".join(items)}</ol></section>')
    used = sorted({s for d in refs for s in d.get('src', [])}, key=fold)
    opts = ''.join(f'<option value="{E(fold(s))}">{E(s)}</option>' for s in used)
    toc = ''.join(f'<a href="#b-{k}">{l}</a>' for k, l, _ in SECTIONS)
    body = (read('biblio/page.html').replace('__BBLIST__', ''.join(secs)).replace('__BBN__', str(total))
            .replace('__BBOPTS__', opts).replace('__BBTOC__', toc).replace('__BBCR__', str(n_cr))
            .replace('__BBDATA__', str(len(data))))
    return body, CSS, init_js + JS, total


CSS = '''
.bb-page{padding-top:140px}
.bb-tools{position:sticky;top:64px;z-index:5;background:var(--off);padding:16px 0 12px;margin-top:30px;border-bottom:2px solid var(--line);display:grid;gap:12px}
.bb-row{display:flex;flex-wrap:wrap;gap:12px 22px;align-items:end}
.bb-tools label{display:grid;gap:6px;font:600 13px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--grey)}
.bb-tools input,.bb-tools select{font:500 17px var(--sans);letter-spacing:0;text-transform:none;color:var(--ink);background:#fff;border:2px solid var(--line);border-radius:12px;padding:10px 12px}
.bb-tools input{width:min(420px,100%)}
.bb-style{display:flex;gap:6px;flex-wrap:wrap}
.bb-style span{font:600 13px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--grey);align-self:center;margin-right:4px}
.bb-style button{font:600 15px var(--sans);padding:9px 14px;border-radius:999px;border:2px solid var(--line);background:#fff;color:var(--ink);cursor:pointer}
.bb-style button[aria-pressed="true"]{background:var(--ink);color:#fff}
.bb-style button:focus-visible,.bb-tools input:focus-visible,.bb-tools select:focus-visible{outline:3px solid var(--copper,#C9773A);outline-offset:2px}
.bb-toc{display:flex;flex-wrap:wrap;gap:6px 16px;font:600 15px var(--sans)}
.bb-toc a{color:var(--ink);text-underline-offset:3px}
.bb-count{font:14px var(--sans);color:var(--grey);margin:0}
.bb-sec{margin-top:56px;scroll-margin-top:260px}
.bb-n{font:600 15px var(--sans);color:var(--grey);margin-left:6px}
.bb-intro{font:16px/1.5 var(--sans);color:#3D3A35;max-width:80ch;margin:6px 0 10px}
.bb-list{list-style:none;margin:0;padding:0}
.bb-list li{border-top:1.5px solid var(--rule);padding:12px 0 12px 2.2em;text-indent:-2.2em}
.bb-list p{margin:0;font:16.5px/1.55 var(--sans);color:var(--ink);overflow-wrap:anywhere}
.bb-list a{color:var(--ink);text-underline-offset:3px}
.bb-list .bb-w{text-indent:0;font-size:13.5px;color:var(--grey);margin-top:4px;display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline}
.bb-w b{font:600 11.5px var(--sans);letter-spacing:.06em;text-transform:uppercase;margin-right:4px}
.bb-w a{color:var(--grey)}
.bb-ok,.bb-chk{font:600 11px var(--sans);letter-spacing:.05em;text-transform:uppercase;border-radius:999px;padding:2px 8px;border:1.5px solid var(--rule)}
.bb-chk{border-color:var(--red-ink,#B3261E);color:var(--red-ink,#B3261E)}
html.js .bb-page[data-style="apa"] .bb-chi,html.js .bb-page[data-style="chi"] .bb-apa{display:none}
html:not(.js) .bb-chi::before{content:"Chicago : ";font-weight:600}html:not(.js) .bb-apa::before{content:"APA : ";font-weight:600}
.bb-none{font:17px var(--sans);margin-top:30px}
.bb-how{margin-top:72px;max-width:80ch}
.bb-how ul{font:17px/1.55 var(--sans);padding-left:1.2em;display:grid;gap:10px}
.bb-how a{color:var(--ink)}
[hidden]{display:none!important}
@media (max-width:820px){.bb-tools{position:static}.bb-sec{scroll-margin-top:80px}.bb-list li{padding-left:1.2em;text-indent:-1.2em}}
'''

JS = r'''
(function(){
  var D=document,pg=D.getElementById('bbPage'),q=D.getElementById('bbQ'),f=D.getElementById('bbF'),n=D.getElementById('bbN'),none=D.getElementById('bbNone'),items=D.querySelectorAll('.bb-list li'),bs=D.querySelectorAll('.bb-style button');
  function fold(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
  function setStyle(s){pg.setAttribute('data-style',s);bs.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.s===s)});try{localStorage.setItem('apj-bib',s)}catch(e){}}
  bs.forEach(function(b){b.onclick=function(){setStyle(b.dataset.s)}});
  var st='apa';try{st=localStorage.getItem('apj-bib')||'apa'}catch(e){}setStyle(st==='chi'?'chi':'apa');
  function run(){var t=fold(q.value.trim()),s=f.value,k=0;
    items.forEach(function(it){var ok=(!t||it.dataset.k.indexOf(t)>-1)&&(!s||(' '+it.dataset.s+' ').indexOf(s)>-1);it.hidden=!ok;if(ok)k++});
    D.querySelectorAll('.bb-sec').forEach(function(x){x.hidden=!x.querySelector('li:not([hidden])')});
    n.textContent=k+(k>1?' références affichées':' référence affichée');none.hidden=k>0}
  q.addEventListener('input',run);f.addEventListener('change',run);run();
})();
'''
