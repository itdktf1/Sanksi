import pandas as pd
import json

df = pd.read_excel('SANKSI.xlsx', sheet_name='Bank')
res = {}

for idx, r in df.iterrows():
    kode = r['Kode Bank']
    if pd.isna(kode): continue
    
    # Clean and convert
    kode_str = str(kode).strip()
    if kode_str.endswith('.0'):
        kode_str = kode_str[:-2]
        
    res[kode_str] = {
        'nama': str(r.get('Nama Bank', '')).strip(),
        'email': str(r.get('Email', '')).strip(),
        'nomor_identitas': str(r.get('Nomor Identitas', '')).strip(),
        'nomor_telepon': str(r.get('Nomor Telepon', '')).strip(),
        'sektor': str(r.get('Sektor', '')).strip(),
        'sub_sektor': str(r.get('Sub Sektor', '')).strip(),
        'sub_sub_sektor': str(r.get('Sub Sub Sektor', '')).strip()
    }

with open('bank_data.json', 'w') as f:
    json.dump(res, f, indent=2)
print("bank_data.json created successfully.")
