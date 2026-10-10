import sys
K=set('EU27_2020 BE BG CZ DK DE EE IE EL ES FR HR IT CY LV LT LU HU MT NL AT PL PT RO SI SK FI SE'.split())
lines=[l.strip() for l in sys.stdin if l.strip() and not l.startswith('```')]
out=[lines[0]]+[l for l in lines[1:] if l.split(',')[0] in K]
open(sys.argv[1],'w').write('\n'.join(out)+'\n'); print(sys.argv[1],len(out)-1)
