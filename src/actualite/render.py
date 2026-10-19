# -*- coding: utf-8 -*-
"""Bande « actualité » : faits datés (officiel / presse), rendus en HTML statique.
Les données sont dans actu.json ; la tâche hebdomadaire de veille propose les mises à jour, Tom les valide."""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
LAB = {'officiel': ('off', 'Officiel'), 'presse': ('pr', 'Presse')}


def load():
    return json.loads((HERE / 'actu.json').read_text(encoding='utf-8'))


def items_html(items, home):
    out = []
    for it in sorted(items, key=lambda x: x['date'], reverse=True):
        cls, lab = LAB[it['type']]
        q = it['question'].replace('__HOME__#', '#') if home else it['question']
        out.append(f'<li><time datetime="{it["date"]}">{it["date_txt"]}</time><span class="{cls}">{lab}</span>'
                   f'<p>{it["texte"]}</p><p class="qaq">Question liée : {q}</p><p class="qas">Source : {it["source"]}</p></li>')
    return '<ol class="qalist">' + ''.join(out) + '</ol>'


def home_list():
    return items_html(load()['items'], True)


def theme_block(theme):
    A = load()
    its = [i for i in A['items'] if i['theme'] == theme]
    if not its:
        return ''
    return ('<section class="sec papier actu qdeb" id="actualite" aria-labelledby="tAc"><div class="wrap">'
            '<span class="kick" data-r>Actualité · faits datés et sourcés</span>'
            f'<h2 class="giant" id="tAc" data-r>Ce qui vient <span>de se passer.</span></h2>'
            f'<p class="lede" data-r>Faits récents liés à ce thème, mis à jour le {A["maj_txt"]}. <b class="off">Officiel</b> : publication d’une institution. '
            '<b class="pr">Presse</b> : article de presse, utilisé seulement pour dater un événement en cours. '
            'Toute l’actualité est réunie dans la <a href="__HOME__#questions">rubrique Questions</a>.</p>'
            + items_html(its, False) + '</div></section>\n')
