# Manajemen Sanksi OJK

Aplikasi web untuk mengelola, memonitor, dan menghasilkan draf surat sanksi administratif Otoritas Jasa Keuangan (OJK). Aplikasi ini dibuat menggunakan Python (Flask) untuk backend dan HTML/CSS/JS murni untuk frontend.

## Fitur Utama
- **Dashboard Monitoring**: Memantau status seluruh surat sanksi (Draft, Dalam Proses, Sudah Approve).
- **Auto-fill Data PUJK & Individu**: Integrasi data dari master Excel untuk pengisian form secara instan.
- **Perhitungan Denda Otomatis**: Secara otomatis mengalkulasi nominal denda berdasarkan jumlah hari keterlambatan sesuai regulasi.
- **Live Document Preview**: Menampilkan pratinjau dokumen surat sanksi dalam format `.docx` langsung di browser menggunakan `docx-preview`.
- **Alur Persetujuan (Approval Workflow)**: Mengelola peran (Drafter, Verifikator, Approver) beserta riwayat dan catatan persetujuannya.

## Persyaratan Sistem
- Python 3.x
- `pip` (Python package manager)

## Instalasi dan Persiapan

1. **Clone repositori atau ekstrak file proyek ini.**
2. **Buka terminal/command prompt di dalam folder proyek.**
3. **Instal dependensi Python yang dibutuhkan:**
   ```bash
   pip install flask pandas openpyxl
   ```
   *(Catatan: `openpyxl` dibutuhkan oleh pandas untuk membaca file Excel)*

## Cara Menjalankan Aplikasi

1. Jalankan server Flask dengan perintah berikut:
   ```bash
   python app.py
   ```
2. Aplikasi akan berjalan di port 8080.
3. Buka browser dan akses URL berikut:
   ```
   http://127.0.0.1:8080/ataulocalhost:8080/
   ```

## Skrip Utilitas (Data Master)
Aplikasi ini dilengkapi dengan beberapa skrip Python untuk memperbarui JSON (sebagai database sementara) dari file Excel:
- `generate_dummy.py`: Menghasilkan dummy riwayat sanksi awal ke dalam `data.json` berdasarkan sheet *Dummy* di `SANKSI.xlsx`.
- `update_laporan.py`: Memperbarui data referensi laporan (`laporan_data.json`) dari Excel.
- `convert_bank.py` / `convert_riwayat.py`: Skrip konversi data pelengkap lainnya.

*(Jika data master di file `SANKSI.xlsx` diubah, jalankan skrip konversi yang relevan agar `data.json` atau referensi JSON lainnya terbarui.)*
