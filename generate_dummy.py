import pandas as pd
import json
import datetime
import math

df_dummy = pd.read_excel('SANKSI.xlsx', sheet_name='Dummy')
df_profil = pd.read_excel('SANKSI.xlsx', sheet_name='Profil')

history = []

for idx, row in df_dummy.iterrows():
    if idx >= 4:
        break
    
    prof_row = df_profil.iloc[idx]
    
    # Dates
    tgl_batas = row.get('Tanggal Batas Pelaporan')
    tgl_lapor = row.get('Tanggal Lapor')
    tgl_lahir = prof_row.get('Tanggal Lahir')
    
    tgl_batas_str = ''
    if pd.notnull(tgl_batas):
        if isinstance(tgl_batas, datetime.datetime) or type(tgl_batas) == pd.Timestamp:
            tgl_batas_str = tgl_batas.strftime('%Y-%m-%d')
        else:
            tgl_batas_str = str(tgl_batas)
            
    tgl_lapor_str = ''
    if pd.notnull(tgl_lapor):
        if isinstance(tgl_lapor, datetime.datetime) or type(tgl_lapor) == pd.Timestamp:
            tgl_lapor_str = tgl_lapor.strftime('%Y-%m-%d')
        else:
            tgl_lapor_str = str(tgl_lapor)
            
    tgl_lahir_str = ''
    if pd.notnull(tgl_lahir):
        if isinstance(tgl_lahir, datetime.datetime) or type(tgl_lahir) == pd.Timestamp:
            tgl_lahir_str = tgl_lahir.strftime('%Y-%m-%d')
        else:
            tgl_lahir_str = str(tgl_lahir)

    # Convert string fields
    def get_str(r, col):
        val = r.get(col, '')
        return str(val) if pd.notnull(val) else ''

    # Dummy fields
    hari_telat = get_str(row, 'Jumlah Hari Keterlambatan')
    if hari_telat and hari_telat.endswith('.0'):
        hari_telat = hari_telat[:-2]
        
    kode = get_str(row, 'Kode Laporan')
    nama_lap = get_str(row, 'Nama Laporan')
    periode = get_str(row, 'Periode Laporan')
    sumber = get_str(row, 'Sumber Aplikasi').replace('Apollo', 'APOLO')
    jns_pel = get_str(row, 'Jenis Pelanggaran')
    sub_pel = get_str(row, 'Sub Jenis Pelanggaran')
    sub_sub_pel = get_str(row, 'Sub Sub Jenis Pelanggaran')
    jns_per = get_str(row, 'Jenis Peraturan')
    no_per = get_str(row, 'Nomor Peraturan')
    pasal = get_str(row, 'Pasal Pelanggaran')

    status_ket = ''
    if hari_telat and hari_telat.isdigit():
        days = int(hari_telat)
        if 1 <= days <= 30:
            status_ket = 'Keterlambatan'
        elif days > 30:
            status_ket = 'Tidak Menyampaikan'
    elif sub_sub_pel == 'Tidak Menyampaikan':
        status_ket = 'Tidak Menyampaikan'
        
    tgl_surat = datetime.datetime.now().strftime('%d %B %Y')

    # Profil fields
    profil_type = get_str(prof_row, 'Profil').strip().lower()
    is_individu = (profil_type == 'individu')
    
    nama_subjek = get_str(prof_row, 'Nama (Individu/ Perusahaan)')
    kewarganegaraan = get_str(prof_row, 'Kewarganegaraan')
    jenis_identitas = get_str(prof_row, 'Jenis Identitas')
    nomor_identitas = get_str(prof_row, 'Nomor Identitas')
    if nomor_identitas and nomor_identitas.endswith('.0'):
        nomor_identitas = nomor_identitas[:-2]
    
    email = get_str(prof_row, 'Email')
    alamat = get_str(prof_row, 'Alamat')
    telepon = get_str(prof_row, 'Nomor Telepon')
    if telepon and telepon.endswith('.0'):
        telepon = telepon[:-2]
        
    jabatan = get_str(prof_row, 'Jabatan')
    npwp = get_str(prof_row, 'Nomor NPWP Perusahaan')
    nama_bank = get_str(prof_row, 'Nama Bank')
    
    sandi_pujk = get_str(prof_row, 'Sandi PUJK')
    if sandi_pujk and sandi_pujk.endswith('.0'):
        sandi_pujk = sandi_pujk[:-2]
    # Pad to 3 digits if it's a number
    if sandi_pujk.isdigit():
        sandi_pujk = sandi_pujk.zfill(3)
        
    sektor = get_str(prof_row, 'Sektor')
    sub_sektor = get_str(prof_row, 'Sub Sektor')
    sub_sub_sektor = get_str(prof_row, 'Sub Sub Sektor')

    denda_value = 0
    if status_ket == 'Keterlambatan' and hari_telat and hari_telat.isdigit():
        denda_value = int(hari_telat) * 50000
    elif status_ket == 'Tidak Menyampaikan':
        denda_value = 1500000

    form_state = {
        "tipeSubjek": "individu" if is_individu else "perusahaan",
        
        "kodeLaporan": kode,
        "namaLaporan": nama_lap,
        "periodeLaporan": periode,
        "sumberAplikasi": sumber,
        "tanggalBatasPelaporan": tgl_batas_str,
        "tanggalLapor": tgl_lapor_str,
        "jumlahHariKeterlambatan": hari_telat,
        "jenisPelanggaran": jns_pel,
        "subJenisPelanggaran": sub_pel,
        "subSubJenisPelanggaran": sub_sub_pel,
        "jenisPeraturan": jns_per,
        "nomorPeraturan": no_per,
        "pasalPelanggaran": pasal,
        "jenisSanksi": "Sanksi denda - Denda administratif",
        "nominalDenda": denda_value,
        "statusKeterlambatan": status_ket
    }
    
    if is_individu:
        form_state.update({
            "namaIndividu": nama_subjek,
            "kewarganegaraan": kewarganegaraan,
            "jenisIdentitasIndividu": jenis_identitas,
            "nomorIdentitasIndividu": nomor_identitas,
            "tanggalLahir": tgl_lahir_str,
            "emailIndividu": email,
            "alamatIndividu": alamat,
            "teleponIndividu": telepon,
            "jabatan": jabatan,
            "namaPerusahaanMenjabat": nama_bank,
            "npwpPerusahaanMenjabat": npwp,
            "sandiPujkIndividu": sandi_pujk,
            "sektorPujkIndividu": sektor,
            "subSektorPujkIndividu": sub_sektor,
            "subSubSektorPujkIndividu": sub_sub_sektor
        })
    else:
        form_state.update({
            "namaPerusahaan": nama_subjek,
            "jenisIdentitasPerusahaan": jenis_identitas,
            "nomorIdentitasPerusahaan": nomor_identitas,
            "emailPerusahaan": email,
            "teleponPerusahaan": telepon,
            "sandiPujkPerusahaan": sandi_pujk,
            "sektorPujkPerusahaan": sektor,
            "subSektorPujkPerusahaan": sub_sektor,
            "subSubSektorPujkPerusahaan": sub_sub_sektor
        })

    item = {
        "id": f"S-NEW-00{idx+1}/OJK/2026",
        "tanggal": tgl_surat,
        "nama": nama_subjek,
        "sanksi": "Sanksi denda - Denda administratif",
        "denda": denda_value,
        "status": "Draft",
        "statusClass": "draft",
        "formState": form_state
    }
    history.append(item)

data = {
    "stats": {
        "pending": 0,
        "sent": 0,
        "done": 0
    },
    "history": history
}

with open('data.json', 'w') as f:
    json.dump(data, f, indent=4)

print(f"Generated {len(history)} dummy items with profile into data.json")
