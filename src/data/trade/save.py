import sys,csv,io
rep=sys.argv[1]
lines=[l.strip() for l in sys.stdin if l.strip() and not l.startswith('```')]
d={}
for l in lines[1:]:
    k,v=l.split(',');
    if v: d[k]=int(v)
eu=sum(v for k,v in d.items() if len(k)==2 and k not in('US','CN'))
print(rep,'sumEU',eu,'INT',d.get('INT_EU27_2020'),'diff%',round((eu-d['INT_EU27_2020'])/d['INT_EU27_2020']*100,3),'n',sum(1 for k in d if len(k)==2 and k not in('US','CN')), 'W-check',round((d['INT_EU27_2020']+d['EXT_EU27_2020']-d['WORLD'])/d['WORLD']*100,3))
open(rep+'.csv','w').write('partner,value\n'+'\n'.join(f'{k},{v}' for k,v in d.items())+'\n')
