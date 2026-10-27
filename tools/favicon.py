"""Génère le favicon d'Au plus Juste à partir du logo (« J » et « ? » en Instrument Sans gras).

Usage : python3 tools/favicon.py <instrument-sans-latin-700-normal.woff>
Produit favicon.svg (coins arrondis) et icon-full.svg (fond plein, pour Apple et Android) à la racine ;
tools/favicon-render.js en tire ensuite les PNG et favicon.ico.
"""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parent.parent
INK, CREAM, RED = '#1E1914', '#EDE6DC', '#E2402B'   # couleurs du menu et du logo du site

def main(font):
    f = TTFont(font); gs = f.getGlyphSet(); cmap = f.getBestCmap()
    def glyph(ch):
        n = cmap[ord(ch)]; p = SVGPathPen(gs); gs[n].draw(p); b = BoundsPen(gs); gs[n].draw(b)
        return p.getCommands(), b.bounds
    J, bJ = glyph('J'); Q, bQ = glyph('?')
    xJ = -bJ[0]; xQ = xJ + bJ[2] - 20 - bQ[0]
    w = xQ + bQ[2]; top = max(bJ[3], bQ[3]); h = top - min(bJ[1], bQ[1])
    def svg(inner, rx):
        sc = inner / max(w, h); ox = (100 - w * sc) / 2; oy = (100 - h * sc) / 2
        g = lambda d, dx, c: f'<path fill="{c}" transform="translate({ox + dx * sc:.2f} {oy + top * sc:.2f}) scale({sc:.5f} {-sc:.5f})" d="{d}"/>'
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><title>Au plus Juste</title>'
                f'<rect width="100" height="100" rx="{rx}" fill="{INK}"/>{g(J, xJ, CREAM)}{g(Q, xQ, RED)}</svg>\n')
    (ROOT / 'favicon.svg').write_text(svg(78, 18), encoding='utf-8')
    (ROOT / 'tools' / 'icon-full.svg').write_text(svg(62, 0), encoding='utf-8')

if __name__ == '__main__':
    main(sys.argv[1])
