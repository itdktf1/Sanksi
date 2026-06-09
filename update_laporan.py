import pandas as pd
import json
import datetime

def update_laporan():
    excel_file = 'SANKSI.xlsx'
    
    # Read existing laporan data
    with open('laporan_data.json', 'r') as f:
        laporan_data = json.load(f)
        
    # Read sheet Dummy
    df = pd.read_excel(excel_file, sheet_name='Dummy')
    
    added_count = 0
    for idx, row in df.iterrows():
        kode = str(row.get('Kode Laporan', '')).strip()
        if not kode or pd.isna(row.get('Kode Laporan')):
            continue
            
        # Format date correctly if it's a timestamp
        tgl_batas = row.get('Tanggal Batas Pelaporan')
        tgl_lapor = row.get('Tanggal Lapor')
        
        if isinstance(tgl_batas, datetime.datetime):
            tgl_batas = tgl_batas.strftime('%Y-%m-%d')
        elif pd.notna(tgl_batas):
            tgl_batas = str(tgl_batas).strip()
        else:
            tgl_batas = ""
            
        if isinstance(tgl_lapor, datetime.datetime):
            tgl_lapor = tgl_lapor.strftime('%Y-%m-%d')
        elif pd.notna(tgl_lapor):
            tgl_lapor = str(tgl_lapor).strip()
        else:
            tgl_lapor = ""

        # Map to dict structure
        laporan_data[kode] = {
            "Nama Laporan": str(row.get('Nama Laporan', '')).strip() if pd.notna(row.get('Nama Laporan')) else "",
            "Periode Laporan": str(row.get('Periode Laporan', '')).strip() if pd.notna(row.get('Periode Laporan')) else "",
            "Sumber Aplikasi": (str(row.get('Sumber Aplikasi', '')).strip() if pd.notna(row.get('Sumber Aplikasi')) else "").replace('Apollo', 'APOLO'),
            "Tanggal Batas Pelaporan": tgl_batas,
            "Tanggal Lapor": tgl_lapor,
            "Jumlah Hari Keterlambatan": int(row.get('Jumlah Hari Keterlambatan', 0)) if pd.notna(row.get('Jumlah Hari Keterlambatan')) else 0,
            "Jenis Pelanggaran": str(row.get('Jenis Pelanggaran', '')).strip() if pd.notna(row.get('Jenis Pelanggaran')) else "",
            "Sub Jenis Pelanggaran": str(row.get('Sub Jenis Pelanggaran', '')).strip() if pd.notna(row.get('Sub Jenis Pelanggaran')) else "",
            "Sub Sub Jenis Pelanggaran": str(row.get('Sub Sub Jenis Pelanggaran', '')).strip() if pd.notna(row.get('Sub Sub Jenis Pelanggaran')) else "",
            "Jenis Peraturan": str(row.get('Jenis Peraturan', '')).strip() if pd.notna(row.get('Jenis Peraturan')) else "",
            "Nomor Peraturan": str(row.get('Nomor Peraturan', '')).strip() if pd.notna(row.get('Nomor Peraturan')) else "",
            "Pasal Pelanggaran": str(row.get('Pasal Pelanggaran', '')).strip() if pd.notna(row.get('Pasal Pelanggaran')) else ""
        }
        added_count += 1
        
    with open('laporan_data.json', 'w') as f:
        json.dump(laporan_data, f, indent=2)
        
    print(f"Successfully added/updated {added_count} records in laporan_data.json")

if __name__ == '__main__':
    update_laporan()
