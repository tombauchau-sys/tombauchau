# Décisions récentes (lois, règlements, arrêts) : rendu commun à l'accueil et aux pages Actualités.
import json
from pathlib import Path
F = Path(__file__).resolve().parent / 'mesures.json'
LAB = {'officiel': ('off', 'Officiel'), 'presse': ('pr', 'Presse'), 'ref': ('rf', 'Référence')}

def load():
    return json.loads(F.read_text(encoding='utf-8'))

def items_html(items):
    items = sorted(items, key=lambda i: i['date'], reverse=True)
    out = []
    for i in items:
        c, l = LAB[i['type']]
        out.append(f'<li><span class="mdt"><time datetime="{i["date"]}">{i["date_txt"]}</time><span class="mlv">{i["niveau"]}</span></span>'
                   f'<span class="mtx">{i["texte"]} <b class="{c}">{l}</b> <span class="msrc">{i["source"]}</span></span></li>')
    return '<ul class="mes">' + ''.join(out) + '</ul>'

def group_block(g):
    M = load()
    its = [i for i in M['items'] if i['groupe'] == g]
    if not its:
        return ''
    return ('<details class="mesd" data-r><summary>Les décisions récentes sur ce thème</summary>' + items_html(its) +
            f'<p class="mnote">Lois, règlements et arrêts, du plus récent au plus ancien ; liste vérifiée le {M["maj_txt"]}. <b class="off">Officiel</b> : texte ou communiqué d’une institution. <b class="rf">Référence</b> : base de données juridique ou organisme professionnel. <b class="pr">Presse</b> : article de presse, pour dater un événement en cours.</p></details>')

def dossier_block(name):
    M = load()
    its = [i for i in M['items'] if name in i['dossiers']]
    if not its:
        return ''
    return items_html(its)
