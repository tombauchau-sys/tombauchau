# -*- coding: utf-8 -*-
"""Page « Gouvernements fédéraux depuis 1999 » : chronologie interactive.
HTML statique complet (lisible sans JavaScript : toutes les fiches sont dans la page) ;
le script ne fait que sélectionner la fiche affichée et filtrer les mesures."""
import html as H
import json
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
DOM = {'social': 'Social', 'eco': 'Économie et finances'}
V = {'officiel': ('off', 'Officiel'), 'reference': ('rf', 'Référence'), 'presse': ('pr', 'Presse'), 'a-verifier': ('av', 'À vérifier')}


def d(s):
    return date.fromisoformat(s)


def ftxt(s):
    x = d(s)
    return f'{"1er" if x.day == 1 else x.day} {MOIS[x.month - 1]} {x.year}'


def duree(a, b):
    n = (b - a).days
    y, r = divmod(n, 365)
    m = round(r / 30.44)
    if m == 12:
        y, m = y + 1, 0
    parts = ([f'{y} an' + ('s' if y > 1 else '')] if y else []) + ([f'{m} mois'] if m else [])
    return ' et '.join(parts) or f'{n} jours'


def ext(lab, url):
    return f'<a href="{url}" target="_blank" rel="noopener">{H.escape(lab)}<span class="ext" aria-hidden="true"> ↗</span><span class="sr"> (site externe, nouvel onglet)</span></a>'


def chips(g, P):
    out = []
    for p in g['partis']:
        i = P[p]
        pm = ' gv-pm' if p == g['pm_parti'] else ''
        out.append(f'<li class="gv-chip{pm}" title="{H.escape(i["nom"])}"><i style="background:{i["c"]}"></i>{H.escape(p)}<small>{i["g"]}</small></li>')
    return '<ul class="gv-chips">' + ''.join(out) + '</ul>'


def seats(g):
    s = g['sieges']
    maj = s >= 76
    return (f'<div class="gv-seats" role="img" aria-label="{s} sièges sur 150 ; majorité à 76"><div class="gv-bar"><span style="width:{s / 150 * 100:.2f}%" class="{"ok" if maj else "min"}"></span><em style="left:{76 / 150 * 100:.2f}%"></em></div>'
            f'<p><b>{s}</b> sièges sur 150 · {"majorité" if maj else "minorité"} (majorité absolue : 76)</p></div>')


def card(g, P, i, n, today):
    a, b = d(g['debut']), (d(g['fin']) if g['fin'] else today)
    badges = []
    if g['sieges'] < 76:
        badges.append('<span class="gv-b min">Minoritaire</span>')
    if 'intérimaire' in g['surnom']:
        badges.append('<span class="gv-b">Intérimaire</span>')
    if not g['fin']:
        badges.append('<span class="gv-b now">En fonction</span>')
    cc = sum((min(d(y), b) - d(x)).days for x, y in g['courantes'])
    if cc:
        badges.append(f'<span class="gv-b ac">{cc} jours en affaires courantes</span>')
    fin = ftxt(g['fin']) if g['fin'] else 'aujourd’hui'
    sur = f' <span class="gv-sur">« {H.escape(g["surnom"])} »</span>' if g['surnom'] and g['surnom'] not in ('minoritaire',) and 'affaires' not in g['surnom'] and 'pouvoirs' not in g['surnom'] and 'intérimaire' not in g['surnom'] else ''
    elec = d(g['election'])
    form = (a - elec).days
    h = [f'<article class="gv-card" id="g-{g["id"]}" data-i="{i}" aria-labelledby="gh-{g["id"]}">',
         f'<header class="gv-head"><p class="gv-n">{i + 1:02d} / {n}</p><h2 id="gh-{g["id"]}">Gouvernement {H.escape(g["nom"])}{sur}</h2>',
         f'<p class="gv-dates"><time datetime="{g["debut"]}">{ftxt(g["debut"])}</time> → ' + (f'<time datetime="{g["fin"]}">{fin}</time>' if g['fin'] else fin) + f' · {duree(a, b)}</p>',
         f'<p class="gv-pmline">Premier ministre : <b>{H.escape(g["pm"])}</b> ({H.escape(g["pm_parti"])})</p>',
         f'<div class="gv-badges">{"".join(badges)}</div></header>']
    # composition
    h.append('<section class="gv-sec"><h3>Composition</h3>' + chips(g, P) + seats(g) + f'<p class="gv-note">{H.escape(g["sieges_note"])}' +
             ((' Source : ' if not isinstance(g['sieges_src'][0], list) else ' Sources : ') + (ext(*g['sieges_src']) if not isinstance(g['sieges_src'][0], list) else ' · '.join(ext(*x) for x in g['sieges_src'])) if g.get('sieges_src') else '') + '</p>' +
             (f'<p class="gv-note">{ext("Composition détaillée des ministres (CRISP)", g["compo_url"])}</p>' if g.get('compo_url') else '') +
             (f'<p class="gv-note">Élections du {ftxt(g["election"])} · {form} jours entre le scrutin et la prestation de serment.</p>' if 20 < form < 600 else f'<p class="gv-note">Législature issue des élections du {ftxt(g["election"])}.</p>') +
             (f'<p class="gv-note">{H.escape(g["statut_note"])}' + (' Source : ' + ' · '.join(ext(*x) for x in g['statut_src']) if g.get('statut_src') else '') + '</p>' if g.get('statut_note') else '') + '</section>')
    # accord
    ac = g['accord']
    t = '<section class="gv-sec"><h3>Accord de gouvernement</h3>'
    t += f'<p class="gv-acc"><b>{H.escape(ac["titre"])}</b>' + (f'<span>{H.escape(ac["date"])}</span>' if ac['date'] else '') + '</p>'
    if ac['url']:
        t += f'<p class="gv-doc">{ext("Lire le texte officiel · " + ac["doc"], ac["url"])}</p>'
    if ac.get('url2'):
        t += f'<p class="gv-doc">{ext("Texte complet de l’accord (hébergé par la Chambre)", ac["url2"])}</p>'
    for lab, u in ac.get('liens', []):
        t += f'<p class="gv-doc">{ext(lab, u)}</p>'
    if ac['resume']:
        t += f'<p class="gv-k">{H.escape(ac.get("k", "Ce que la coalition s’engage à faire"))}</p><ul class="gv-res">' + ''.join(f'<li>{x}</li>' for x in ac['resume']) + '</ul>'
        if not ac.get('k'):
            t += '<p class="gv-note">Engagements tels qu’écrits dans l’accord, avec ses propres chiffres. Ce résumé ne dit pas s’ils ont été tenus : voir les mesures ci-dessous.</p>'
        if ac.get('note'):
            t += f'<p class="gv-verif">{H.escape(ac["note"])}</p>'
        if ac.get('chapitres'):
            t += '<details class="gv-chap"><summary>L’accord chapitre par chapitre</summary>' + ''.join(
                f'<div><h4>{H.escape(c["t"])} <small>p. {c["p"]}</small></h4><ul>' + ''.join(f'<li>{H.escape(x)}</li>' for x in c['pts']) + '</ul></div>' for c in ac['chapitres'])
            t += (f'<p class="gv-note">{H.escape(ac["lecture"])} Les pages renvoient au document de la Chambre.</p>' if ac.get('lecture') else '') + '</details>'
        elif ac.get('lecture'):
            t += f'<p class="gv-note">{H.escape(ac["lecture"])}</p>'
    elif ac['url']:
        t += '<p class="gv-todo">Résumé de l’accord : en préparation.</p>'
    h.append(t + '</section>')
    # contexte
    if g.get('contexte'):
        cx = ''
        for c in g['contexte']:
            src = (' ' + ' · '.join(ext(*s) for s in c['src'])) if c.get('src') else ''
            tag = ' <b class="pr">Presse</b>' if c.get('presse') else ''
            if c.get('srcnote'):
                src += f' <i class="gv-sn">Source : {H.escape(c["srcnote"])}</i>'
            cx += f'<li><span>{H.escape(c["date"])}</span>{H.escape(c["texte"])}{tag}{src}</li>'
        h.append(f'<section class="gv-sec"><h3>Contexte</h3><ul class="gv-ctx">{cx}</ul></section>')
    # mesures
    if g['mesures']:
        ms = sorted(g['mesures'], key=lambda m: m['date'])
        cnt = {k: sum(1 for m in ms if m['d'] == k) for k in DOM}
        flt = (f'<div class="gv-flt" role="group" aria-label="Filtrer les mesures"><button type="button" data-f="" aria-pressed="true">Toutes ({len(ms)})</button>'
               + ''.join(f'<button type="button" data-f="{k}" aria-pressed="false">{v} ({cnt[k]})</button>' for k, v in DOM.items()) + '</div>')
        li = ''
        for m in ms:
            c, l = V[m['v']]
            srcs = ' · '.join(ext(*s) for s in m['src'])
            ver = f'<p class="gv-verif">À vérifier : {H.escape(m["verif"])}</p>' if m.get('verif') else ''
            ref = f'<p class="gv-ref">{H.escape(m["ref"])}</p>' if m.get('ref') else ''
            li += (f'<li class="gv-m" data-d="{m["d"]}"><p class="gv-md"><time datetime="{m["date"]}">{H.escape(m["date_txt"])}</time><span class="gv-dom {m["d"]}">{DOM[m["d"]]}</span></p>'
                   f'<h4>{H.escape(m["titre"])}</h4><p>{H.escape(m["texte"])}</p>{ref}<p class="gv-src"><b class="{c}">{l}</b> {srcs}</p>{ver}</li>')
        h.append(f'<section class="gv-sec"><h3>Grandes mesures sociales et économiques</h3>{flt}<ol class="gv-ms">{li}</ol>'
                 '<p class="gv-note">Mesures adoptées pendant le mandat (loi votée, publiée ou entrée en vigueur), choisies pour leur portée. La liste n’est pas exhaustive et ne juge pas leurs effets.</p></section>')
    else:
        h.append('<section class="gv-sec"><h3>Grandes mesures sociales et économiques</h3><p class="gv-todo">En préparation. Les dates et la composition de ce gouvernement sont vérifiées ; ses grandes mesures seront ajoutées une à une, chacune avec sa source officielle.</p></section>')
    # annoncé et réalisé
    if g.get('compare'):
        h.append(compare(g['compare'], {m['titre']: m['src'] for m in g['mesures']}))
    # repères chiffrés
    if g.get('bilan'):
        b_ = g['bilan']
        rows = ''.join(f'<tr><th scope="row"><a href="{u}">{H.escape(n_)}</a></th><td>{x}</td><td>{y}</td></tr>' for n_, x, y, u in b_['lignes'])
        h.append(f'<section class="gv-sec"><h3>Repères chiffrés</h3><table class="gv-tab"><thead><tr><th></th><th>{b_["debut"]}</th><th>{b_["fin"]}</th></tr></thead><tbody>{rows}</tbody></table><p class="gv-note">{H.escape(b_["note"])}</p></section>')
    # fin
    fs = (' ' + ' · '.join(ext(*s) for s in g['fin_src'])) if g.get('fin_src') else ''
    h.append(f'<section class="gv-sec"><h3>{"Fin du gouvernement" if g["fin"] else "Situation"}</h3><p>{H.escape(g["fin_txt"])}{fs}</p></section>')
    h.append('<nav class="gv-pn" aria-label="Gouvernement précédent ou suivant">' +
             (f'<a href="#g-{PREV[g["id"]]}" data-go="{i - 1}">← Précédent</a>' if i else '<span></span>') +
             (f'<a href="#g-{NEXT[g["id"]]}" data-go="{i + 1}">Suivant →</a>' if i < n - 1 else '<span></span>') + '</nav>')
    return ''.join(h) + '</article>'


ST = {'adopte': 'Adopté comme annoncé', 'partiel': 'Adopté en partie ou modifié', 'abandon': 'Abandonné ou reporté', 'encours': 'En cours', 'non': 'Non retrouvé', 'chiffre': 'Objectif chiffré'}


def compare(cp, msrc=None):
    msrc = msrc or {}
    """Engagements de l'accord comparés aux textes adoptés : statut factuel, jamais « tenu » ou « trahi »."""
    its = cp['items']
    cnt = {k: sum(1 for x in its if x['statut'] == k) for k in ST}
    summ = ' · '.join(f'<span class="gv-st s-{k}">{v} : {cnt[k]}</span>' for k, v in ST.items() if cnt[k])
    li = ''
    for x in its:
        src = (' · '.join(ext(*s_) for s_ in x['src'])) if x.get('src') else ''
        mt = x.get('mesure', '')
        mes = (f'<p class="gv-ref">Mesure correspondante : {H.escape(mt if mt.startswith("«") else "« " + mt + " »")} (ci-dessus)</p>') if mt else ''
        ctx = f'<p class="gv-ref">Contexte : {H.escape(x["ctx"])}</p>' if x.get('ctx') else ''
        li += (f'<li class="gv-ari"><p class="gv-ark"><span class="gv-st s-{x["statut"]}">{ST[x["statut"]]}</span> <small>{H.escape(cp.get("plabel", "Accord"))}, p. {H.escape(x["p"])}</small></p>'
               f'<p class="gv-eng">{H.escape(x["eng"])}</p><p>{H.escape(x["constat"])}</p>{mes}{ctx}'
               + (f'<p class="gv-src">{src}</p>' if src else '') + '</li>')
    hors = ''
    if cp.get('hors'):
        hors = ('<h4 class="gv-h4">Décidé sans figurer dans l’accord</h4><ul class="gv-hors">'
                + ''.join(f'<li><b>{H.escape(h_[0])}</b> : {H.escape(h_[1])}' + (' ' + ' · '.join(ext(*x) for x in msrc.get(h_[2], [])) if len(h_) > 2 else '') + '</li>' for h_ in cp['hors']) + '</ul>')
    return (f'<section class="gv-sec gv-ar"><h3>Annoncé et réalisé</h3><p>{H.escape(cp["intro"])}</p>'
            f'<p class="gv-arsum">{summ}</p><ol class="gv-arl">{li}</ol>{hors}'
            '<p class="gv-note">Chaque engagement est cité d’après l’accord, page à l’appui, puis comparé aux textes adoptés pendant le mandat. '
            '« Non retrouvé » signifie qu’aucun texte n’a été trouvé à ce stade : ce n’est pas la preuve d’un abandon. « Abandonné ou reporté » n’est utilisé que si une source officielle le constate. '
            'Les objectifs chiffrés sont comparés aux chiffres actuels d’Eurostat, révisés depuis l’époque ; un écart ne dit pas à lui seul ce qui l’a causé.</p></section>')


PREV, NEXT = {}, {}


def timeline(G, P, today):
    t0, t1 = d('1999-07-01'), today
    span = (t1 - t0).days
    pc = lambda x: (x - t0).days / span * 100
    segs, ac, el, ticks = '', '', '', ''
    for i, g in enumerate(G):
        a, b = d(g['debut']), (d(g['fin']) if g['fin'] else today)
        col = P[g['pm_parti']]['c']
        stripes = ''.join(f'<i class="gv-acz" style="left:{(d(x) - a).days / max(1, (b - a).days) * 100:.3f}%;width:{(min(d(y), b) - d(x)).days / max(1, (b - a).days) * 100:.3f}%"></i>' for x, y in g['courantes'])
        lab = H.escape(g['nom'])
        narrow = ' gv-nar' if pc(b) - pc(a) < 2.2 else ''
        segs += (f'<button type="button" class="gv-seg{narrow}" data-i="{i}" style="left:{pc(a):.3f}%;width:{pc(b) - pc(a):.3f}%;--c:{col}" aria-controls="g-{g["id"]}" '
                 f'aria-label="Gouvernement {lab}, {ftxt(g["debut"])} à {ftxt(g["fin"]) if g["fin"] else "aujourd’hui"}">{stripes}<span>{lab}</span></button>')
    for e in sorted({g['election'] for g in G}):
        el += f'<i class="gv-el" style="left:{pc(d(e)):.3f}%" title="Élections du {ftxt(e)}"></i>'
    for y in range(2000, today.year + 1, 2):
        ticks += f'<span style="left:{pc(date(y, 1, 1)):.3f}%">{y}</span>'
    # liste compacte (mobile et lecture d’écran)
    lst = ''.join(f'<li><button type="button" data-i="{i}" style="--c:{P[g["pm_parti"]]["c"]}"><b>{H.escape(g["nom"])}</b><span>{d(g["debut"]).year}–{d(g["fin"]).year if g["fin"] else ""}</span></button></li>' for i, g in enumerate(G))
    leg = ''.join(f'<li><i style="background:{P[k]["c"]}"></i>{k}</li>' for k in ['VLD', 'CD&V', 'PS', 'MR', 'N-VA'] if k in P)
    return (f'<div class="gv-tl" aria-label="Chronologie des gouvernements fédéraux"><div class="gv-els">{el}</div><div class="gv-track">{segs}</div><div class="gv-ticks" aria-hidden="true">{ticks}</div></div>'
            f'<ol class="gv-list">{lst}</ol>'
            f'<div class="gv-leg"><span>Couleur : parti du Premier ministre</span><ul>{leg}</ul><span><i class="gv-legac"></i>affaires courantes</span><span><i class="gv-legel"></i>élections fédérales</span></div>')


CSS = '''
.gv-page{padding-top:140px}
.gv-tl{position:relative;margin:40px 0 6px;padding-top:22px}
.gv-els{position:absolute;inset:0 0 auto 0;height:22px}
.gv-el{position:absolute;top:4px;width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:11px solid var(--ink);transform:translateX(-7px)}
.gv-track{position:relative;height:96px;background:#fff;border:2px solid var(--line);border-radius:14px;overflow:hidden}
.gv-seg{position:absolute;top:0;bottom:0;background:var(--c);border:0;border-right:2px solid var(--line);cursor:pointer;padding:0;overflow:hidden;font:inherit;transition:filter .2s}
.gv-seg span{position:absolute;left:6px;bottom:8px;font:600 13px/1.1 var(--sans);color:#111;writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;text-shadow:0 0 3px rgba(255,255,255,.7)}
.gv-nar span{display:none}
.gv-seg:hover,.gv-seg:focus-visible{filter:brightness(1.12) saturate(1.1);outline:none}
.gv-seg[aria-current="true"]{box-shadow:inset 0 0 0 4px var(--line),inset 0 -8px 0 var(--line)}
.gv-acz{position:absolute;top:0;bottom:0;background:repeating-linear-gradient(135deg,rgba(255,255,255,.75) 0 5px,transparent 5px 10px)}
.gv-ticks{position:relative;height:26px;margin-top:6px}
.gv-ticks span{position:absolute;transform:translateX(-50%);font:500 13px var(--sans);color:var(--grey)}
.gv-list{display:none;list-style:none;padding:0;margin:24px 0 0;gap:8px;grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.gv-list button{width:100%;text-align:left;font:inherit;background:#fff;border:2px solid var(--line);border-left:10px solid var(--c);border-radius:10px;padding:8px 10px;cursor:pointer;display:grid}
.gv-list button[aria-current="true"]{background:var(--ink);color:#fff}
.gv-list b{font:600 15px var(--sans)}.gv-list span{font:13px var(--sans);opacity:.75}
.gv-leg{display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;font:14px var(--sans);color:var(--grey);margin:10px 0 0}
.gv-leg ul{display:flex;flex-wrap:wrap;gap:4px 12px;list-style:none;margin:0;padding:0}
.gv-leg li,.gv-leg span{display:inline-flex;align-items:center;gap:6px}
.gv-leg i{width:14px;height:14px;border-radius:4px;border:1.5px solid var(--line);display:inline-block}
.gv-leg .gv-legac{background:repeating-linear-gradient(135deg,#bbb 0 3px,#fff 3px 6px)}
.gv-leg .gv-legel{width:0;height:0;border:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:10px solid var(--ink);border-radius:0}
.gv-cards{margin-top:44px}
.js .gv-card{display:none}.js .gv-card.on{display:block}
.gv-card{background:#fff;border:2px solid var(--line);border-radius:20px;padding:34px 38px 26px;margin-bottom:34px;scroll-margin-top:90px}
.gv-n{font:600 13px var(--sans);letter-spacing:.08em;color:var(--grey);margin:0}
.gv-head h2{font-family:var(--serif);font-weight:400;font-size:clamp(38px,5vw,60px);line-height:1;margin:6px 0 10px}
.gv-sur{font-style:italic;color:var(--red-ink,#B8261A)}
.gv-dates{font:600 18px var(--sans);margin:0}
.gv-pmline{font:17px var(--sans);margin:6px 0 0}
.gv-badges{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.gv-b{font:600 12px var(--sans);letter-spacing:.05em;text-transform:uppercase;border:1.5px solid var(--line);border-radius:999px;padding:3px 10px}
.gv-b.min{background:#FDE6C8}.gv-b.ac{background:repeating-linear-gradient(135deg,#eee 0 4px,#fff 4px 8px)}.gv-b.now{background:#D6F0DA}
.gv-sec{border-top:1.5px solid var(--rule);margin-top:24px;padding-top:18px}
.gv-sec h3{font:600 13px var(--sans);letter-spacing:.09em;text-transform:uppercase;color:var(--grey);margin:0 0 12px}
.gv-sec p,.gv-sec li{font:17px/1.55 var(--sans)}
.gv-chips{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0;padding:0}
.gv-chip{display:inline-flex;align-items:center;gap:8px;border:1.5px solid var(--line);border-radius:999px;padding:5px 12px 5px 6px;font:600 15px var(--sans)}
.gv-chip i{width:18px;height:18px;border-radius:50%;border:1.5px solid var(--line)}
.gv-chip small{font:600 10.5px var(--sans);letter-spacing:.06em;color:var(--grey)}
.gv-chip.gv-pm{box-shadow:0 0 0 2px var(--line)}
.gv-seats{margin-top:16px;max-width:560px}
.gv-bar{position:relative;height:16px;border:2px solid var(--line);border-radius:999px;background:#F2EFE8;overflow:hidden}
.gv-bar span{position:absolute;left:0;top:0;bottom:0;background:var(--ink)}.gv-bar span.min{background:#E9A23B}
.gv-bar em{position:absolute;top:-2px;bottom:-2px;border-left:2px dashed var(--red,#E2402B)}
.gv-seats p{margin:6px 0 0;font:15px var(--sans)}
.gv-note{color:#4A4741;font-size:15px!important;margin:8px 0 0}
.gv-acc{display:grid;gap:2px}.gv-acc b{font:600 20px var(--sans)}.gv-acc span{font:15px var(--sans);color:var(--grey)}
.gv-doc{margin:6px 0 0}.gv-doc a,.gv-src a,.gv-ctx a,.gv-sec p a{color:var(--ink);text-underline-offset:3px}
.gv-k{font:600 13px var(--sans)!important;letter-spacing:.06em;text-transform:uppercase;color:var(--grey);margin:16px 0 4px}
.gv-res{padding-left:1.1em;margin:0;display:grid;gap:6px}
.gv-todo{background:#F7F6F2;border:1.5px dashed var(--rule);border-radius:10px;padding:10px 14px;color:#4A4741}
.gv-ctx{list-style:none;padding:0;margin:0;display:grid;gap:8px}.gv-ctx li span{font-weight:600;margin-right:10px}
.gv-flt{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.gv-flt button{font:600 14px var(--sans);border:1.5px solid var(--line);background:#fff;border-radius:999px;padding:6px 14px;cursor:pointer}
.gv-flt button[aria-pressed="true"]{background:var(--ink);color:#fff}
.gv-ms{list-style:none;margin:0;padding:0;display:grid;gap:0}
.gv-m{border-left:3px solid var(--line);padding:2px 0 18px 20px;position:relative}
.gv-m::before{content:'';position:absolute;left:-9px;top:6px;width:13px;height:13px;border-radius:50%;background:#fff;border:2.5px solid var(--line)}
.gv-m h4{font:600 19px/1.3 var(--sans);margin:4px 0}.gv-m p{margin:0}
.gv-md{display:flex;gap:10px;align-items:center;font:600 14px var(--sans)!important;color:var(--grey)}
.gv-dom{font:600 11px var(--sans);letter-spacing:.06em;text-transform:uppercase;border-radius:999px;padding:2px 8px;border:1.5px solid var(--line);color:var(--ink)}
.gv-dom.social{background:#F6D0E2}.gv-dom.eco{background:#CFE0F5}
.gv-src{font-size:14.5px!important;margin-top:6px!important;color:#4A4741}
.gv-src b,.gv-ctx b{font:600 11px var(--sans);letter-spacing:.05em;text-transform:uppercase;border-radius:4px;padding:1px 6px;margin-right:6px}
b.off{background:#D6F0DA}b.rf{background:#E4E1F7}b.pr{background:#FBE3C6}b.av{background:#F9C9C1}
.gv-ref{font:italic 14.5px/1.45 var(--sans)!important;color:#4A4741;margin-top:6px!important}
.gv-tab{border-collapse:collapse;font:16px var(--sans);min-width:min(520px,100%)}.gv-tab th,.gv-tab td{border-bottom:1.5px solid var(--rule);padding:8px 14px 8px 0;text-align:left}.gv-tab td{font-variant-numeric:tabular-nums;font-weight:600}.gv-tab thead th{font:600 13px var(--sans);color:var(--grey)}.gv-tab a{color:var(--ink)}
.gv-chap{margin-top:16px;border:1.5px solid var(--rule);border-radius:12px;padding:10px 16px}.gv-chap summary{font:600 16px var(--sans);cursor:pointer}.gv-chap h4{font:600 17px var(--sans);margin:16px 0 4px}.gv-chap h4 small{font:500 13px var(--sans);color:var(--grey)}.gv-chap ul{padding-left:1.1em;margin:0;display:grid;gap:4px}.gv-chap li{font-size:16px!important}
.gv-verif{font-size:14px!important;color:#9E2B1D;margin-top:4px!important}
.gv-st{display:inline-block;font:600 12px var(--sans);letter-spacing:.04em;text-transform:uppercase;border-radius:999px;padding:3px 10px;border:1.5px solid var(--line)}
.s-adopte{background:#D6F0DA}.s-partiel{background:#FBE3C6}.s-abandon{background:#F9C9C1}.s-non{background:#ECEAE4}.s-encours{background:#FFF3B8}.s-chiffre{background:#DCE8F7}
.gv-arsum{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 6px!important}
.gv-arl{list-style:none;padding:0;margin:14px 0 0}
.gv-ari{border-left:3px solid var(--rule);padding:2px 0 2px 14px;margin:0 0 18px}
.gv-ark{display:flex;flex-wrap:wrap;align-items:center;gap:10px}.gv-ark small{font:13px var(--sans);color:var(--grey)}
.gv-eng{font-weight:600!important;margin:6px 0 2px!important}
.gv-h4{font:600 16px var(--sans);margin:18px 0 8px}.gv-hors{padding-left:20px}
.gv-pn{display:flex;justify-content:space-between;margin-top:26px;border-top:1.5px solid var(--rule);padding-top:16px}
.gv-pn a{font:600 16px var(--sans);color:var(--ink)}
.gv-how{margin-top:64px;max-width:80ch}.gv-how ul{font:17px/1.55 var(--sans);padding-left:1.2em;display:grid;gap:10px}.gv-how a{color:var(--ink)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.ext{font-size:.85em}
@media (max-width:820px){.gv-tl{display:none}.gv-list{display:grid}.gv-card{padding:24px 18px 18px;border-radius:16px}}
'''

JS = r'''
(function(){
  var D=document,cards=D.querySelectorAll('.gv-card'),segs=D.querySelectorAll('.gv-seg,.gv-list button'),cur=-1;
  function show(i,scroll,init){
    if(i<0||i>=cards.length)return;cur=i;
    cards.forEach(function(c,k){c.classList.toggle('on',k===i)});
    segs.forEach(function(s){s.setAttribute('aria-current',+s.dataset.i===i?'true':'false')});
    if(scroll)cards[i].scrollIntoView({behavior:'smooth',block:'start'});
    if(!init&&history.replaceState)history.replaceState(null,'','#'+cards[i].id);
  }
  segs.forEach(function(s){s.addEventListener('click',function(){show(+s.dataset.i,true)})});
  D.querySelectorAll('[data-go]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();show(+a.dataset.go,true)})});
  D.querySelectorAll('.gv-flt').forEach(function(f){var bs=f.querySelectorAll('button'),ms=f.parentNode.querySelectorAll('.gv-m');
    bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b)});ms.forEach(function(m){m.hidden=b.dataset.f&&m.dataset.d!==b.dataset.f})})})});
  D.addEventListener('keydown',function(e){if(e.target.closest&&e.target.closest('input,textarea'))return;if(e.key==='ArrowLeft'&&e.target.classList.contains('gv-seg'))show(cur-1,false),segs[cur].focus();if(e.key==='ArrowRight'&&e.target.classList.contains('gv-seg'))show(cur+1,false),segs[cur].focus()});
  window.addEventListener('hashchange',function(){var x=location.hash.slice(1);cards.forEach(function(c,j){if(c.id===x&&j!==cur)show(j,true,true)})});
  var h=location.hash.slice(1),k=-1;cards.forEach(function(c,j){if(c.id===h)k=j});
  show(k>-1?k:cards.length-1,k>-1,true);
})();
'''


def build(read, nav, init_js):
    M = json.loads((HERE / 'gouvernements.json').read_text(encoding='utf-8'))
    G, P = M['gouvernements'], M['partis']
    today = date.fromisoformat(M['maj'])
    for i, g in enumerate(G):
        if i:
            PREV[g['id']] = G[i - 1]['id']
        if i < len(G) - 1:
            NEXT[g['id']] = G[i + 1]['id']
    cards = ''.join(card(g, P, i, len(G), today) for i, g in enumerate(G))
    body = (read('gouvernements/page.html').replace('__GVTL__', timeline(G, P, today)).replace('__GVCARDS__', cards)
            .replace('__GVN__', str(len(G))).replace('__GVMAJ__', M['maj_txt']))
    return body, CSS, init_js + JS, len(G)
