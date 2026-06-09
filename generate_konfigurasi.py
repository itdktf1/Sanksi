import pandas as pd
import json

def generate():
    df = pd.read_excel('SANKSI.xlsx', sheet_name='FULL')
    
    data = []
    for idx, row in df.iterrows():
        item = {
            "id": idx,
            "sandiPujk": str(row.get('Sandi PUJK', '')).strip() if pd.notna(row.get('Sandi PUJK')) else "",
            "sumberAplikasi": str(row.get('Sumber Aplikasi', '')).strip() if pd.notna(row.get('Sumber Aplikasi')) else "",
            "sektor": str(row.get('Sektor', '')).strip() if pd.notna(row.get('Sektor')) else "",
            "subSektor": str(row.get('Sub Sektor', '')).strip() if pd.notna(row.get('Sub Sektor')) else "",
            "subSubSektor": str(row.get('Sub Sub Sektor', '')).strip() if pd.notna(row.get('Sub Sub Sektor')) else "",
            "namaMenu": str(row.get('Nama Menu', '')).strip() if pd.notna(row.get('Nama Menu')) else "",
            "kodeLaporan": str(row.get('Kode Laporan', '')).strip() if pd.notna(row.get('Kode Laporan')) else "",
            "namaLaporan": str(row.get('Nama Laporan', '')).strip() if pd.notna(row.get('Nama Laporan')) else "",
            "nomorPeraturan": str(row.get('Nomor Peraturan', '')).strip() if pd.notna(row.get('Nomor Peraturan')) else "",
            "pasalPelanggaran": str(row.get('Pasal Pelanggaran', '')).strip() if pd.notna(row.get('Pasal Pelanggaran')) else "",
            "frekuensiPelaporan": str(row.get('Frekuensi Pelaporan', '')).strip() if pd.notna(row.get('Frekuensi Pelaporan')) else "",
            "batasWaktu": str(row.get('Batas Waktu Pelaporan (sesuai dengan bahasa ketentuan)', '')).strip() if pd.notna(row.get('Batas Waktu Pelaporan (sesuai dengan bahasa ketentuan)')) else "",
            "batasWaktuLibur": str(row.get('Batas Waktu Pelaporan pada Hari Libur', '')).strip() if pd.notna(row.get('Batas Waktu Pelaporan pada Hari Libur')) else "",
            "ketentuanKahar": str(row.get('Ketentuan Keadaan Kahar', '')).strip() if pd.notna(row.get('Ketentuan Keadaan Kahar')) else "",
            "jenisSanksi": str(row.get('Jenis Sanksi', '')).strip() if pd.notna(row.get('Jenis Sanksi')) else "",
            "status": str(row.get('Status', '')).strip() if pd.notna(row.get('Status')) else ""
        }
        data.append(item)
        
    with open('konfigurasi_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        
    print(f"Generated {len(data)} items into konfigurasi_data.json")

if __name__ == '__main__':
    generate()
