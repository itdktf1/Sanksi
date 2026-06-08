import json
import re

with open('riwayat.json', 'r') as f:
    data = json.load(f)

for d in data:
    if d.get('Status Konseptor') == 'Drafter':
        nama_pujk = re.sub(r'\(.*?\)', '', d['Nama Profil'])
        d['Catatan'] = re.sub(r'Dari:.*?<br>Isi Catatan:', f'Dari: {nama_pujk}<br>Isi Catatan:', d['Catatan'])

with open('riwayat.json', 'w') as f:
    json.dump(data, f)
