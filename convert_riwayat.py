import pandas as pd
import json

def convert_riwayat():
    excel_file = 'SANKSI.xlsx'
    
    # Read sheet Riwayat
    df = pd.read_excel(excel_file, sheet_name='Riwayat')
    
    riwayat_list = []
    
    for idx, row in df.iterrows():
        # Read values
        nama_profil = str(row.get('Nama Profil', '')).strip()
        no_val = row.get('No')
        catatan = str(row.get('Catatan', '')).strip()
        status_konseptor = str(row.get('Status Konseptor', '')).strip()
        tanggal = str(row.get('Tanggal', '')).strip()
        
        # Normalize Nama Profil by removing space before (Perusahaan) or (Individu)
        nama_profil = nama_profil.replace(' (Perusahaan)', '(Perusahaan)')
        nama_profil = nama_profil.replace(' (Individu)', '(Individu)')
        
        # Format Catatan: Add <br> before "Isi Catatan:" if it's there and not already formatted
        if "Isi Catatan:" in catatan and "<br>Isi Catatan:" not in catatan:
            catatan = catatan.replace("Isi Catatan:", "<br>Isi Catatan:")
            
        # Clean up No value to int if possible
        try:
            no_val = int(no_val)
        except (ValueError, TypeError):
            pass
            
        riwayat_list.append({
            "Nama Profil": nama_profil,
            "No": no_val,
            "Catatan": catatan,
            "Status Konseptor": status_konseptor,
            "Tanggal": tanggal
        })
        
    # Write to riwayat.json
    with open('riwayat.json', 'w') as f:
        json.dump(riwayat_list, f)
        
    print(f"Successfully converted {len(riwayat_list)} rows and wrote to riwayat.json.")

if __name__ == '__main__':
    convert_riwayat()
