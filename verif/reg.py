import csv,sys,os
F='registre.csv'
def add(page,claim,site,source,src_val,status,note=''):
    new=not os.path.exists(F)
    with open(F,'a',newline='') as f:
        w=csv.writer(f)
        if new: w.writerow(['page','affirmation','valeur_site','source_primaire','valeur_source','statut','note'])
        w.writerow([page,claim,site,source,src_val,status,note])
if __name__=='__main__':
    for line in sys.stdin:
        if line.strip(): add(*[x.strip() for x in line.rstrip('\n').split('|')])
