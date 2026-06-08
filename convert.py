import pandas as pd
import json
import math

df = pd.read_excel('Nama PUJK.xlsx')
res = {}
cur_s1 = ''
cur_s2 = ''
cur_s3 = ''

for idx, r in df.iterrows():
    nama = r['Nama']
    if pd.isna(nama): continue
    sandi = r['Sandi PUJK']
    if pd.isna(sandi): continue
    
    stripped = str(nama).lstrip('\xa0 ')
    spaces = len(str(nama)) - len(stripped)
    
    if spaces == 0:
        cur_s1 = stripped
        cur_s2 = ''
        cur_s3 = ''
    elif spaces == 4:
        cur_s2 = stripped
        cur_s3 = ''
    elif spaces >= 8:
        cur_s3 = stripped
        
    res[str(sandi)] = {
        'nama': stripped,
        'sektor': cur_s1,
        'sub_sektor': cur_s2,
        'sub_sub_sektor': cur_s3
    }

with open('pujk_data.json', 'w') as f:
    json.dump(res, f, indent=2)
