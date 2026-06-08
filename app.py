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

@app.route('/generate-surat', methods=['POST'])
def generate_surat():
    data = request.json
    tipe_subjek = data.get('tipeSubjek', 'perusahaan')
    
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
