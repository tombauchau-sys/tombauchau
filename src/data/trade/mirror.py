import csv
C='AT BE BG CY CZ DE DK EE ES FI FR GR HR HU IE IT LT LU LV MT NL PL PT RO SE SI SK'.split()
X={c:{r['partner']:int(r['value']) for r in csv.DictReader(open(c+'.csv'))} for c in C}
M={c:{r['partner']:int(r['value']) for r in csv.DictReader(open('imp/'+c+'.csv'))} for c in C}
fl=[]
for a in C:
  for b in C:
    if a==b: continue
    x=X[a][b]; m=M[b][a]; r=x/m if m else 99
    if max(x,m)>20e6 and (r>2.2 or r<0.45): fl.append((a,b,x,m,round(r,2)))
for f in sorted(fl,key=lambda f:-max(f[2],f[3])): print(*f)
print(len(fl))
