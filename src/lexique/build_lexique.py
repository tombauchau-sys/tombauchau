# -*- coding: utf-8 -*-
"""Construit la page Lexique (HTML statique : lisible sans JavaScript, la recherche n'est qu'un filtre)."""
import html as H
import importlib.util
import re
import unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
CATS = [('pol', 'Politique belge'), ('eur', 'Europe et traités'), ('eco', 'Économie et finances'),
        ('soc', 'Société'), ('env', 'Climat et énergie'), ('met', 'Statistique et méthode')]
CATN = dict(CATS)


def load():
    spec = importlib.util.spec_from_file_location('termes', HERE / 'termes.py')
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.L


def fold(s):
    s = unicodedata.normalize('NFD', s.lower())
    return ''.join(c for c in s if unicodedata.category(c) != 'Mn').replace('’', "'")


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', fold(s)).strip('-')


def entry(e):
    e_ = H.escape
    key = fold(' '.join([e['t']] + e['al']))
    out = [f'<article class="lx" id="t-{slug(e["t"])}" data-c="{e["c"]}" data-k="{e_(key)}">',
           f'<h3>{e_(e["t"])}<span class="lx-tag">{CATN[e["c"]]}</span></h3>',
           f'<p class="lx-d">{e_(e["d"])}</p>']
    if e['ex']:
        out.append(f'<p class="lx-ex"><b>Repère</b>{e_(e["ex"])}</p>')
    if e['al']:
        out.append(f'<p class="lx-al"><b>Aussi</b>{e_(" · ".join(e["al"]))}</p>')
    if e['v']:
        links = ' · '.join(f'<a href="{href}">{e_(lab)}</a>' for lab, href in e['v'])
        out.append(f'<p class="lx-v"><b>Sur le site</b>{links}</p>')
    for lab, url in e['s']:
        out.append(f'<p class="lx-s"><b>Texte</b><a href="{url}" target="_blank" rel="noopener">{e_(lab)}</a></p>')
    out.append('</article>')
    return ''.join(out)


CSS = '''
.lx-page{padding-top:140px}
.lx-tools{position:sticky;top:64px;z-index:5;background:var(--off);padding:18px 0 12px;margin-top:36px;border-bottom:2px solid var(--line)}
.lx-search{display:grid;gap:6px;font:600 13px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--grey);max-width:520px}
.lx-search input{font:500 18px var(--sans);letter-spacing:0;text-transform:none;color:var(--ink);background:#fff;border:2px solid var(--line);border-radius:12px;padding:12px 14px;width:100%}
.lx-cats{margin-top:14px}
.lx-az{display:flex;flex-wrap:wrap;gap:4px;margin-top:14px}
.lx-az a{font:600 14px var(--sans);color:var(--ink);text-decoration:none;min-width:30px;height:30px;display:inline-grid;place-items:center;border-radius:8px;border:1.5px solid var(--rule)}
.lx-az a:hover,.lx-az a:focus-visible{border-color:var(--line)}
.lx-az span{font:600 14px var(--sans);color:#B5B1A8;min-width:30px;height:30px;display:inline-grid;place-items:center}
.lx-count{font:14px var(--sans);color:var(--grey);margin:10px 0 0}
.lx-letter{font-family:var(--serif);font-size:56px;line-height:1;margin:48px 0 8px;scroll-margin-top:260px}
.lx-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
.lx{border-top:1.5px solid var(--rule);padding:18px 0 20px;scroll-margin-top:260px}
.lx h3{font:600 21px/1.25 var(--sans);margin:0 0 8px;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px}
.lx-tag{font:600 11.5px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--grey);border:1.5px solid var(--rule);border-radius:999px;padding:2px 9px}
.lx-d{font:17px/1.55 var(--sans);margin:0;color:var(--ink)}
.lx-ex,.lx-al,.lx-v,.lx-s{font:15px/1.5 var(--sans);margin:8px 0 0;color:#3D3A35}
.lx-ex b,.lx-al b,.lx-v b,.lx-s b{font:600 11.5px var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--grey);margin-right:8px}
.lx-ex{background:#fff;border-left:4px solid var(--red-ink);padding:6px 10px}
.lx a{color:var(--ink);text-underline-offset:3px}
.lx:target{background:#fff;box-shadow:0 0 0 2px var(--line);border-radius:6px;padding-inline:12px}
.lx-none{font:17px var(--sans);margin-top:30px}
.lx-how{margin-top:72px;max-width:80ch}
.lx-how ul{font:17px/1.55 var(--sans);padding-left:1.2em;display:grid;gap:10px}
.lx-how a{color:var(--ink)}
[hidden]{display:none!important}
@media (max-width:820px){.lx-grid{grid-template-columns:1fr}.lx-tools{position:static}.lx-letter{scroll-margin-top:80px}.lx{scroll-margin-top:80px}}
'''

JS = r'''
(function(){
  var D=document,q=D.getElementById('lxQ'),bs=D.querySelectorAll('.lx-cats button'),items=D.querySelectorAll('.lx'),cat='',n=D.getElementById('lxN'),none=D.getElementById('lxNone');
  function fold(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/’/g,"'")}
  function run(){
    var t=fold(q.value.trim()),k=0;
    items.forEach(function(it){var ok=(!cat||it.dataset.c===cat)&&(!t||it.dataset.k.indexOf(t)>-1||fold(it.querySelector('.lx-d').textContent).indexOf(t)>-1&&t.length>3);it.hidden=!ok;if(ok)k++});
    D.querySelectorAll('.lx-sec').forEach(function(s){s.hidden=!s.querySelector('.lx:not([hidden])')});
    n.textContent=k+(k>1?' termes affichés':' terme affiché');none.hidden=k>0;
  }
  q.addEventListener('input',run);
  bs.forEach(function(b){b.onclick=function(){cat=b.dataset.c;bs.forEach(function(x){x.setAttribute('aria-pressed',x===b)});run()}});
  run();
})();
'''


def build(read, nav, init_js):
    L = load()
    L.sort(key=lambda e: fold(e['t']))
    groups = {}
    for e in L:
        groups.setdefault(fold(e['t'])[0].upper(), []).append(e)
    lst = ''.join(f'<section class="lx-sec" id="l-{k}" aria-labelledby="lh-{k}"><h2 class="lx-letter" id="lh-{k}">{k}</h2><div class="lx-grid">'
                  + ''.join(entry(e) for e in v) + '</div></section>' for k, v in groups.items())
    az = ''.join(f'<a href="#l-{c}">{c}</a>' if c in groups else f'<span aria-hidden="true">{c}</span>' for c in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    cats = ''.join(f'<button type="button" data-c="{k}" aria-pressed="false">{v}</button>' for k, v in CATS)
    body = (read('lexique/page.html').replace('__LXLIST__', lst).replace('__LXAZ__', az)
            .replace('__LXCATS__', cats).replace('__LXN__', str(len(L))))
    return body, CSS, init_js + JS, len(L)
