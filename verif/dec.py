import json,sys
EU27=['BE','BG','CZ','DK','DE','EE','IE','EL','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE']
def load(name):
    d=json.load(open(f'raw/{name}.json'))
    geo=d['geo'];time=d['time'];nt=len(time);val={int(k):v for k,v in d['value'].items()};st={int(k):v for k,v in d.get('status',{}).items()}
    pre=d.get('pre',0)  # offset for other dims (index*ngeo*ntime)
    ng=len(geo)
    def get(g,t,block=0):
        if g not in geo or str(t) not in time:return None
        k=block*ng*nt+geo[g]*nt+time[str(t)]
        return val.get(k), st.get(k,'')
    return get,geo,time
def series(name,g,block=0):
    get,geo,time=load(name);return {int(t) if t.isdigit() else t:get(g,t,block) for t in time}
def rank(name,t,block=0,desc=True):
    get,geo,time=load(name)
    r=[(get(g,t,block)[0],g) for g in EU27 if get(g,t,block) and get(g,t,block)[0] is not None]
    r.sort(reverse=desc);return r
