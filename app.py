from flask import Flask, send_from_directory
import os
import webbrowser
from threading import Timer
import io
from flask import request, send_file
import docx
from python_docx_replace.paragraph import Paragraph

app = Flask(__name__, static_url_path='', static_folder='.')

@app.route('/')
def root():
    return send_from_directory('.', 'index.html')

from datetime import datetime

def format_date_indo(date_str):
    if not date_str or date_str == '-':
        return '-'
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        return f"{dt.day} {months[dt.month]} {dt.year}"
    except ValueError:
        return date_str

@app.route('/generate-surat', methods=['POST'])
def generate_surat():
    data = request.json
    tipe_subjek = data.get('tipeSubjek', 'perusahaan')
    jenis_sanksi = data.get('Jenis Sanksi Pengawas')
    if not jenis_sanksi or jenis_sanksi == '-':
        jenis_sanksi = data.get('Jenis Sanksi', '')
    data['Jenis Sanksi'] = jenis_sanksi
    print(f"DEBUG: Jenis Sanksi received = '{jenis_sanksi}'")
    
    sanksi_tipe_1_2 = [
        'Sanksi peringatan dan teguran - Peringatan tertulis',
        'Sanksi peringatan dan teguran - Teguran tertulis',
        'Sanksi denda - Denda',
        'Sanksi denda - Denda yaitu kewajiban untuk membayar sejumlah uang tertentu'
    ]
    
    if 'sanksi denda' in jenis_sanksi.lower() and jenis_sanksi not in sanksi_tipe_1_2:
        template_path = 'Konsep Usulan Surat Pengenaan Sanksi Denda.docx'
        
        # Date mapping
        now = datetime.now()
        months = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        today_indo = f"{now.day} {months[now.month]} {now.year}"
        
        # Report name processing
        nama_laporan = data.get('Nama Laporan', '')
        if nama_laporan.lower().startswith('laporan '):
            nama_laporan = nama_laporan[8:]
        elif 'laporan' in nama_laporan.lower():
            import re
            nama_laporan = re.sub(r'(?i)\blaporan\b', '', nama_laporan).strip()
            
        nominal_denda = data.get('Nominal Denda Pengawas')
        if not nominal_denda or nominal_denda == '-':
            nominal_denda = data.get('Nominal Denda', '0')
            
        # Placeholders override
        data['Nomor Surat'] = ''
        if tipe_subjek == 'individu':
            data['Nama PUJK'] = data.get('Nama Perusahaan Menjabat', '')
            data['Nama Jabatan Penandatangan'] = data.get('Jabatan', '')
            data['Nama Pejabat'] = data.get('Nama Individu', '')
        else:
            data['Nama PUJK'] = data.get('Nama Perusahaan', '')
            data['Nama Jabatan Penandatangan'] = ''
            data['Nama Pejabat'] = ''
            
        data['ketentuan yang diacu'] = f"{data.get('Nomor Peraturan', '')} {data.get('Pasal Pelanggaran', '')}".strip()
        data['jenis laporan'] = nama_laporan
        data['batas waktu penyampaian yang ditetapkan'] = format_date_indo(data.get('Tanggal Batas Lapor', ''))
        data['tanggal penerimaan laporan'] = format_date_indo(data.get('Tanggal Lapor', ''))
        data['jumlah hari'] = '30'
        data['Nominal Denda'] = nominal_denda
        data['Sanksi Lain/Jika Ada'] = ''
        data['Ketentuan Tata Cara Penagihan Sanksi Denda'] = ''
        data['Tempat'] = 'Jakarta'
        data['Tanggal'] = today_indo
        data['tanda tangan'] = ''
    else:
        if tipe_subjek == 'perusahaan':
            template_path = 'Surat_Sanksi_Tipe1_Perusahaan.docx'
        else:
            template_path = 'Surat_Sanksi_Tipe2_Individu.docx'
        
    doc = docx.Document(template_path)
    
    # Process the dictionary directly to replace placeholders
    for key, value in data.items():
        placeholder = f"[{key}]"
        for p in Paragraph.get_all(doc):
            paragraph = Paragraph(p)
            paragraph.replace_key(placeholder, str(value))
            
    file_stream = io.BytesIO()
    doc.save(file_stream)
    file_stream.seek(0)
    
    return send_file(
        file_stream,
        as_attachment=True,
        download_name='Review_Surat_Sanksi.docx',
        mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )

import json
@app.route('/add-riwayat', methods=['POST'])
def add_riwayat():
    data = request.json
    try:
        with open('riwayat.json', 'r') as f:
            riwayat = json.load(f)
    except FileNotFoundError:
        riwayat = []
    
    # Generate new No for the specific profile
    profil_name = data.get('Nama Profil')
    profil_riwayat = [item for item in riwayat if item.get('Nama Profil') == profil_name]
    new_no = len(profil_riwayat) + 1
    data['No'] = new_no
    
    riwayat.append(data)
    
    with open('riwayat.json', 'w') as f:
        json.dump(riwayat, f)
        
    return {"status": "success"}

def open_browser():
    webbrowser.open_new("http://127.0.0.1:8080")

if __name__ == '__main__':
    print("Memulai Server Manajemen Surat Sanksi OJK di http://127.0.0.1:8080")
    # Buka browser secara otomatis setelah 1 detik
    Timer(1, open_browser).start()
    app.run(port=8080, debug=False)
