import json
# code: [S&P, outlook, date], [Moody's...], [Fitch...]
R={
'AT':[['AA+','stable','2026-02'],['Aa1','négative','2025-08'],['AA','stable','2025-12']],
'BE':[['AA-','stable','2026-04'],['A1','stable','2026-04'],['A+','stable','2026-05']],
'BG':[['BBB+','positive','2026-05'],['Baa1','stable','2025-01'],['BBB+','positive','2026-09']],
'HR':[['A','stable','2026-03'],['A3','stable','2026-10'],['A-','stable','2026-07']],
'CY':[['A','positive','2026-09'],['A3','stable','2026-05'],['A-','positive','2026-05']],
'CZ':[['AA-','positive','2026-09'],['Aa3','stable','2025-07'],['AA-','stable','2026-07']],
'DK':[['AAA','stable','2026-08'],['Aaa','stable','2026-07'],['AAA','stable','2026-09']],
'EE':[None,['A1','stable','2026-08'],['A+','stable','2026-06']],
'FI':[['AA+','négative','2026-04'],['Aa1','stable','2026-06'],['AA','stable','2026-07']],
'FR':[['A+','stable','2026-05'],['Aa3','négative','2026-04'],['A+','stable','2026-08']],
'DE':[['AAA','stable','2026-04'],['Aaa','stable','2026-09'],['AAA','stable','2026-05']],
'EL':[['BBB','stable','2026-04'],['Baa3','positive','2026-09'],['BBB','stable','2026-05']],
'HU':[['BBB-','négative','2026-05'],['Baa2','négative','2026-05'],['BBB','négative','2026-06']],
'IE':[['AA+','stable','2026-03'],['Aa2','positive','2026-08'],['AA','stable','2026-05']],
'IT':[['BBB+','positive','2026-05'],['Baa2','stable','2025-11'],['BBB+','stable','2026-09']],
'LV':[['A','stable','2026-05'],['A3','stable','2026-07'],['A-','stable','2026-04']],
'LT':[['A','stable','2026-05'],['A2','stable','2026-04'],['A+','stable','2026-04']],
'LU':[['AAA','stable','2026-07'],['Aaa','stable','2026-08'],['AAA','stable','2026-04']],
'MT':[['A-','stable','2026-06'],['A2','stable','2026-04'],['A+','stable','2026-08']],
'NL':[['AAA','stable',None],['Aaa','stable','2025-03'],['AAA','stable',None]],
'PL':[['A-','stable','2026-05'],['A3','stable','2026-09'],['A-','négative','2026-08']],
'PT':[['A+','positive','2026-08'],['A3','stable','2026-05'],['A+','stable','2026-09']],
'RO':[['BBB-','négative','2026-10'],['Baa3','négative','2026-08'],['BBB-','négative','2026-07']],
'SK':[['A','stable','2026-04'],['A3','stable','2026-06'],['A-','stable','2026-05']],
'SI':[['AA','stable','2026-09'],['A2','stable','2026-03'],['A+','stable','2026-09']],
'ES':[['A+','stable','2026-09'],['A3','stable','2025-09'],['A','stable','2026-03']],
'SE':[['AAA','stable','2026-06'],['Aaa','stable','2026-02'],['AAA','stable','2025-09']],
}
SP=['AAA','AA+','AA','AA-','A+','A','A-','BBB+','BBB','BBB-','BB+','BB','BB-']
MO=['Aaa','Aa1','Aa2','Aa3','A1','A2','A3','Baa1','Baa2','Baa3','Ba1','Ba2','Ba3']
out={}
for c,v in R.items():
    rows=[];sc=[]
    for i,a in enumerate(v):
        if a is None: rows.append(None);continue
        n=(MO if i==1 else SP).index(a[0])+1;sc.append(n);rows.append({'r':a[0],'o':a[1],'d':a[2],'n':n})
    out[c]={'sp':rows[0],'mo':rows[1],'fi':rows[2],'avg':round(sum(sc)/len(sc),2)}
json.dump(out,open('ratings.json','w'),ensure_ascii=False)
print(sorted(((v['avg'],k) for k,v in out.items())))
