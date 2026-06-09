document.addEventListener('DOMContentLoaded', () => {
    // Auth
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const passphraseInput = document.getElementById('passphrase-input');
    const loginError = document.getElementById('login-error');
    const appDiv = document.getElementById('app');

    async function checkAuth() {
        const res = await fetch('/check-auth');
        const data = await res.json();
        if (data.authenticated) {
            loginOverlay.classList.add('hidden');
            appDiv.style.display = '';
        } else {
            loginOverlay.classList.remove('hidden');
            appDiv.style.display = 'none';
            passphraseInput.focus();
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.style.display = 'none';
        const res = await fetch('/verify-passphrase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passphrase: passphraseInput.value })
        });
        if (res.ok) {
            passphraseInput.value = '';
            loginOverlay.classList.add('hidden');
            appDiv.style.display = '';
        } else {
            loginError.style.display = 'block';
            passphraseInput.value = '';
            passphraseInput.focus();
        }
    });

    checkAuth();

    // DOM Elements
    const pageDashboard = document.getElementById('page-dashboard');
    const pageEditor = document.getElementById('page-editor');
    const btnCreate = document.getElementById('btn-create');
    const btnBack = document.getElementById('btn-back');
    const tableBody = document.getElementById('table-body');
    const btnDraftForm = document.getElementById('btn-draft-form');
    const btnReviewForm = document.getElementById('btn-review-form');
    const btnKirimForm = document.getElementById('btn-kirim-form');

    // Stats Elements
    const statDraft = document.getElementById('stat-draft');
    const statPending = document.getElementById('stat-pending');
    const statSelesai = document.getElementById('stat-selesai');

    // Sidebar Elements
    const dashboardSidebar = document.getElementById('dashboard-sidebar');
    const btnCloseSidebar = document.getElementById('btn-close-sidebar');
    const btnOpenSidebar = document.getElementById('btn-open-sidebar');
    const menuDashboard = document.getElementById('menu-dashboard');
    const menuManajemenSanksi = document.getElementById('menu-manajemen-sanksi');
    const menuKonfigurasi = document.getElementById('menu-konfigurasi');
    
    // View Elements
    const viewSipDashboard = document.getElementById('view-sip-dashboard');
    const viewManajemenSanksi = document.getElementById('view-manajemen-sanksi');
    const viewKonfigurasi = document.getElementById('view-konfigurasi');
    const headerTitle = document.getElementById('header-title');

    if (btnCloseSidebar && dashboardSidebar && btnOpenSidebar) {
        btnCloseSidebar.addEventListener('click', () => {
            dashboardSidebar.classList.add('closed');
            btnOpenSidebar.style.display = 'inline-flex';
        });

        btnOpenSidebar.addEventListener('click', () => {
            dashboardSidebar.classList.remove('closed');
            btnOpenSidebar.style.display = 'none';
        });
    }

    if (menuDashboard && menuManajemenSanksi && viewSipDashboard && viewManajemenSanksi) {
        menuDashboard.addEventListener('click', () => {
            menuDashboard.classList.add('active');
            menuManajemenSanksi.classList.remove('active');
            if (menuKonfigurasi) menuKonfigurasi.classList.remove('active');
            
            viewSipDashboard.style.display = 'flex';
            viewManajemenSanksi.style.display = 'none';
            if (viewKonfigurasi) viewKonfigurasi.style.display = 'none';
            if (headerTitle) headerTitle.textContent = 'Dashboard';
            if (btnCreate) btnCreate.style.display = 'none';
        });

        menuManajemenSanksi.addEventListener('click', () => {
            menuManajemenSanksi.classList.add('active');
            menuDashboard.classList.remove('active');
            if (menuKonfigurasi) menuKonfigurasi.classList.remove('active');
            
            viewSipDashboard.style.display = 'none';
            viewManajemenSanksi.style.display = '';
            if (viewKonfigurasi) viewKonfigurasi.style.display = 'none';
            if (headerTitle) headerTitle.textContent = 'Manajemen Sanksi';
            if (btnCreate) btnCreate.style.display = '';
        });

        if (menuKonfigurasi && viewKonfigurasi) {
            menuKonfigurasi.addEventListener('click', () => {
                menuKonfigurasi.classList.add('active');
                menuDashboard.classList.remove('active');
                menuManajemenSanksi.classList.remove('active');
                
                viewSipDashboard.style.display = 'none';
                viewManajemenSanksi.style.display = 'none';
                viewKonfigurasi.style.display = 'flex';
                if (headerTitle) headerTitle.textContent = 'Konfigurasi Parameter Denda Administratif';
                if (btnCreate) btnCreate.style.display = 'none';
            });
        }
    }

    // Form Inputs
    const formInputs = {
        namaPerusahaan: document.getElementById('nama-perusahaan'),
        jenisIdentitasPerusahaan: document.getElementById('jenis-identitas-perusahaan'),
        nomorIdentitasPerusahaan: document.getElementById('nomor-identitas-perusahaan'),
        emailPerusahaan: document.getElementById('email-perusahaan'),
        teleponPerusahaan: document.getElementById('telepon-perusahaan'),
        sandiPujkPerusahaan: document.getElementById('sandi-pujk-perusahaan'),
        sektorPujkPerusahaan: document.getElementById('sektor-pujk-perusahaan'),
        subSektorPujkPerusahaan: document.getElementById('sub-sektor-pujk-perusahaan'),
        subSubSektorPujkPerusahaan: document.getElementById('sub-sub-sektor-pujk-perusahaan'),
        
        namaIndividu: document.getElementById('nama-individu'),
        kewarganegaraan: document.getElementById('kewarganegaraan'),
        jenisIdentitasIndividu: document.getElementById('jenis-identitas-individu'),
        nomorIdentitasIndividu: document.getElementById('nomor-identitas-individu'),
        tanggalLahir: document.getElementById('tanggal-lahir'),
        emailIndividu: document.getElementById('email-individu'),
        alamatIndividu: document.getElementById('alamat-individu'),
        teleponIndividu: document.getElementById('telepon-individu'),
        jabatan: document.getElementById('jabatan'),
        namaPerusahaanMenjabat: document.getElementById('nama-perusahaan-menjabat'),
        npwpPerusahaanMenjabat: document.getElementById('npwp-perusahaan-menjabat'),
        sandiPujkIndividu: document.getElementById('sandi-pujk-individu'),
        sektorPujkIndividu: document.getElementById('sektor-pujk-individu'),
        subSektorPujkIndividu: document.getElementById('sub-sektor-pujk-individu'),
        subSubSektorPujkIndividu: document.getElementById('sub-sub-sektor-pujk-individu'),
        
        kodeLaporan: document.getElementById('kode-laporan'),
        namaLaporan: document.getElementById('nama-laporan'),
        periodeLaporan: document.getElementById('periode-laporan'),
        sumberAplikasi: document.getElementById('sumber-aplikasi'),
        statusKeterlambatan: document.getElementById('status-keterlambatan'),
        tanggalLapor: document.getElementById('tanggal-lapor'),
        tanggalBatasPelaporan: document.getElementById('tanggal-batas-pelaporan'),
        jumlahHariKeterlambatan: document.getElementById('jumlah-hari-keterlambatan'),
        tandaBuktiLapor: document.getElementById('tanda-bukti-lapor'),
        
        statusKeterlambatanPengawas: document.getElementById('status-keterlambatan-pengawas'),
        tanggalLaporPengawas: document.getElementById('tanggal-lapor-pengawas'),
        tanggalBatasPelaporanPengawas: document.getElementById('tanggal-batas-pelaporan-pengawas'),
        jumlahHariKeterlambatanPengawas: document.getElementById('jumlah-hari-keterlambatan-pengawas'),
        checkboxSesuaiSistem: document.getElementById('checkbox-sesuai-sistem'),
        
        jenisPelanggaran: document.getElementById('jenis-pelanggaran'),
        subJenisPelanggaran: document.getElementById('sub-jenis-pelanggaran'),
        subSubJenisPelanggaran: document.getElementById('sub-sub-jenis-pelanggaran'),
        jenisPeraturan: document.getElementById('jenis-peraturan'),
        nomorPeraturan: document.getElementById('nomor-peraturan'),
        pasalPelanggaran: document.getElementById('pasal-pelanggaran'),
        deskripsiPelanggaran: document.getElementById('deskripsi-pelanggaran'),
        
        jenisSanksi: document.getElementById('jenis-sanksi'),
        nominalDenda: document.getElementById('nominal-denda'),
        
        jenisSanksiPengawas: document.getElementById('jenis-sanksi-pengawas'),
        nominalDendaPengawas: document.getElementById('nominal-denda-pengawas'),
        catatanSanksiPengawas: document.getElementById('catatan-sanksi-pengawas'),
        checkboxSesuaiSistemSanksi: document.getElementById('checkbox-sesuai-sistem-sanksi'),
        
        rolePengawas: document.getElementById('role-pengawas'),
        catatanPengawas: document.getElementById('catatan-pengawas'),
        lampiranPengawas: document.getElementById('lampiran-pengawas')
    };

    // Preview Elements
    const previewEls = {
        nomor: document.getElementById('prev-nomor'),
        nama: document.getElementById('prev-nama'),
        alamat: document.getElementById('prev-alamat'),
        selaku: document.getElementById('prev-selaku'),
        sanksi: document.getElementById('prev-sanksi'),
        jenisDenda: document.getElementById('prev-jenisdenda'),
        jumlah: document.getElementById('prev-jumlah'),
        deskripsi: document.getElementById('prev-deskripsi'),
        date: document.getElementById('prev-date'),
        ttd: document.getElementById('prev-ttd'),
        ttdSpacer: document.getElementById('prev-ttd-spacer'),
        docLogo: document.getElementById('doc-logo')
    };

    // Global Data State
    let globalData = {
        stats: { draft: 0, pending: 0, selesai: 0 },
        history: []
    };
    let pujkData = {};
    let bankData = {};
    let laporanData = {};
    let konfigurasiData = [];
    let currentEditIndex = null;

    // Helper Functions for Periode
    const indonesianMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    function formatPeriodeIndo(yyyymm) {
        if (!yyyymm) return '';
        if (yyyymm.includes(' ')) return yyyymm;
        
        const parts = yyyymm.split('-');
        if (parts.length === 2) {
            const year = parts[0];
            const monthIndex = parseInt(parts[1], 10) - 1;
            if (monthIndex >= 0 && monthIndex < 12) {
                return `${indonesianMonths[monthIndex]} ${year}`;
            }
        }
        return yyyymm;
    }

    function parsePeriodeIndo(indoStr) {
        if (!indoStr) return '';
        if (indoStr.includes('-')) return indoStr;
        
        const parts = indoStr.split(' ');
        if (parts.length === 2) {
            const monthName = parts[0];
            const year = parts[1];
            const monthIndex = indonesianMonths.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
            if (monthIndex !== -1) {
                const mm = String(monthIndex + 1).padStart(2, '0');
                return `${year}-${mm}`;
            }
        }
        return indoStr;
    }

    // Toggle Tipe Subjek
    const radioTipeSubjek = document.querySelectorAll('input[name="tipe-subjek"]');
    const sectionPerusahaan = document.getElementById('section-perusahaan');
    const sectionIndividu = document.getElementById('section-individu');
    const tabBtnProfil = document.getElementById('tab-btn-profil');

    radioTipeSubjek.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'perusahaan') {
                sectionPerusahaan.style.display = 'block';
                sectionIndividu.style.display = 'none';
                if (tabBtnProfil) tabBtnProfil.textContent = 'Profil-Perusahaan';
            } else {
                sectionPerusahaan.style.display = 'none';
                sectionIndividu.style.display = 'block';
                if (tabBtnProfil) tabBtnProfil.textContent = 'Profil-Individu';
            }
            updatePreview(); // Update preview in case it depends on this
        });
    });

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Navigation Logic
    function navigateTo(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }

    function setFieldsReadonly(isReadonly) {
        const fields = [
            formInputs.namaIndividu,
            formInputs.kewarganegaraan,
            formInputs.jenisIdentitasIndividu,
            formInputs.nomorIdentitasIndividu,
            formInputs.tanggalLahir,
            formInputs.emailIndividu,
            formInputs.alamatIndividu,
            formInputs.teleponIndividu,
            formInputs.jabatan,
            formInputs.npwpPerusahaanMenjabat,
            formInputs.jenisIdentitasPerusahaan,
            formInputs.periodeLaporan,
            formInputs.tanggalBatasPelaporan,
            formInputs.tanggalLapor,
            formInputs.statusKeterlambatan,
            formInputs.jenisPelanggaran,
            formInputs.subJenisPelanggaran,
            formInputs.subSubJenisPelanggaran,
            formInputs.jenisPeraturan,
            formInputs.nomorPeraturan,
            formInputs.pasalPelanggaran,
            formInputs.statusKeterlambatanPengawas,
            formInputs.tanggalLaporPengawas,
            formInputs.tanggalBatasPelaporanPengawas
        ];

        fields.forEach(field => {
            if (field) {
                field.disabled = isReadonly;
                if (isReadonly) {
                    field.style.background = '#e9ecef';
                    field.style.cursor = 'not-allowed';
                } else {
                    field.style.background = '';
                    field.style.cursor = '';
                }
            }
        });
    }

    function updatePengawasFieldsState() {
        if (!formInputs.checkboxSesuaiSistem) return;
        const isChecked = formInputs.checkboxSesuaiSistem.checked;
        
        const pengawasFields = [
            formInputs.statusKeterlambatanPengawas,
            formInputs.tanggalLaporPengawas,
            formInputs.tanggalBatasPelaporanPengawas
        ];
        
        pengawasFields.forEach(field => {
            if (field) {
                field.disabled = isChecked;
                if (isChecked) {
                    field.style.background = '#e9ecef';
                    field.style.cursor = 'not-allowed';
                } else {
                    field.style.background = '#ffffff';
                    field.style.cursor = 'text';
                }
            }
        });

        if (isChecked) {
            if (formInputs.statusKeterlambatan && formInputs.statusKeterlambatanPengawas) {
                formInputs.statusKeterlambatanPengawas.value = formInputs.statusKeterlambatan.value;
            }
            if (formInputs.tanggalLapor && formInputs.tanggalLaporPengawas) {
                formInputs.tanggalLaporPengawas.value = formInputs.tanggalLapor.value;
            }
            if (formInputs.tanggalBatasPelaporan && formInputs.tanggalBatasPelaporanPengawas) {
                formInputs.tanggalBatasPelaporanPengawas.value = formInputs.tanggalBatasPelaporan.value;
            }
            if (formInputs.jumlahHariKeterlambatan && formInputs.jumlahHariKeterlambatanPengawas) {
                formInputs.jumlahHariKeterlambatanPengawas.value = formInputs.jumlahHariKeterlambatan.value;
            }
        }
    }

    if (formInputs.checkboxSesuaiSistem) {
        formInputs.checkboxSesuaiSistem.addEventListener('change', updatePengawasFieldsState);
    }
    
    [formInputs.statusKeterlambatan, formInputs.tanggalLapor, formInputs.tanggalBatasPelaporan, formInputs.jumlahHariKeterlambatan].forEach(field => {
        if (field) {
            field.addEventListener('input', () => {
                if (formInputs.checkboxSesuaiSistem && formInputs.checkboxSesuaiSistem.checked) {
                    updatePengawasFieldsState();
                }
            });
            field.addEventListener('change', () => {
                if (formInputs.checkboxSesuaiSistem && formInputs.checkboxSesuaiSistem.checked) {
                    updatePengawasFieldsState();
                }
            });
        }
    });

    function updatePengawasSanksiFieldsState() {
        if (!formInputs.checkboxSesuaiSistemSanksi) return;
        const isChecked = formInputs.checkboxSesuaiSistemSanksi.checked;
        
        const pengawasFields = [
            formInputs.jenisSanksiPengawas,
            formInputs.nominalDendaPengawas,
            formInputs.catatanSanksiPengawas
        ];
        
        pengawasFields.forEach(field => {
            if (field) {
                field.disabled = isChecked;
                if (isChecked) {
                    field.style.background = '#e9ecef';
                    field.style.cursor = 'not-allowed';
                } else {
                    field.style.background = '#ffffff';
                    field.style.cursor = 'text';
                }
            }
        });

        if (isChecked) {
            if (formInputs.jenisSanksi && formInputs.jenisSanksiPengawas) {
                formInputs.jenisSanksiPengawas.value = formInputs.jenisSanksi.value;
            }
            if (formInputs.nominalDenda && formInputs.nominalDendaPengawas) {
                formInputs.nominalDendaPengawas.value = formInputs.nominalDenda.value;
            }
        }
    }

    if (formInputs.checkboxSesuaiSistemSanksi) {
        formInputs.checkboxSesuaiSistemSanksi.addEventListener('change', updatePengawasSanksiFieldsState);
    }
    
    [formInputs.jenisSanksi, formInputs.nominalDenda].forEach(field => {
        if (field) {
            field.addEventListener('input', () => {
                if (formInputs.checkboxSesuaiSistemSanksi && formInputs.checkboxSesuaiSistemSanksi.checked) {
                    updatePengawasSanksiFieldsState();
                }
            });
            field.addEventListener('change', () => {
                if (formInputs.checkboxSesuaiSistemSanksi && formInputs.checkboxSesuaiSistemSanksi.checked) {
                    updatePengawasSanksiFieldsState();
                }
            });
        }
    });

    if (formInputs.nominalDendaPengawas) {
        formInputs.nominalDendaPengawas.addEventListener('input', function(e) {
            const val = unformatCurrency(e.target.value);
            e.target.value = val > 0 ? formatCurrency(val) : '';
        });
    }

    btnCreate.addEventListener('click', () => {
        const form = document.getElementById('editor-form');
        if(form) form.reset();
        
        const secPerusahaan = document.getElementById('section-perusahaan');
        const secIndividu = document.getElementById('section-individu');
        const tabBtnProfil = document.getElementById('tab-btn-profil');
        const tipeSubjekGroup = document.getElementById('tipe-subjek-group');
        const pengawasFieldsContainer = document.getElementById('pengawas-fields-container');
        const statusKeterlambatanGroup = document.getElementById('status-keterlambatan-group');
        const pengawasSanksiContainer = document.getElementById('pengawas-sanksi-container');
        
        if (secPerusahaan) secPerusahaan.style.display = 'block';
        if (secIndividu) secIndividu.style.display = 'none';
        if (tabBtnProfil) tabBtnProfil.textContent = 'Profil-Perusahaan';
        if (tipeSubjekGroup) tipeSubjekGroup.style.display = 'block';
        if (pengawasFieldsContainer) pengawasFieldsContainer.style.display = 'none';
        if (statusKeterlambatanGroup) statusKeterlambatanGroup.style.breakBefore = 'auto';
        if (pengawasSanksiContainer) pengawasSanksiContainer.style.display = 'none';
        
        currentEditIndex = null;
        setFieldsReadonly(false);
        if (formInputs.rolePengawas) formInputs.rolePengawas.value = 'Drafter';
        navigateTo('page-editor');
        if (typeof updatePreview === 'function') updatePreview();
    });

    btnBack.addEventListener('click', () => {
        navigateTo('page-dashboard');
    });

    // Preview Elements and Signature Upload handled dynamically elsewhere (removed signature block)

    // Handle Add New Data
    function addDataToHistory(action, kirimMeta) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        
        let status = 'Draft';
        let statusClass = 'draft';
        
        if (action === 'Kirim') {
            if (kirimMeta && kirimMeta.tipe === 'Approval') {
                status = 'Dalam Proses Approve';
            } else if (kirimMeta && kirimMeta.tipe === 'Verifikasi') {
                status = 'Dalam Proses Verifikasi';
            } else {
                status = 'Dalam Proses';
            }
            statusClass = 'pending';
            globalData.stats.pending += 1;
        } else if (action === 'Kembalikan') {
            status = 'Draft';
            statusClass = 'draft';
            globalData.stats.draft += 1;
        } else {
            globalData.stats.draft += 1;
        }

        let isPerusahaan = true;
        const checkedRadio = document.querySelector('input[name="tipe-subjek"]:checked');
        if (checkedRadio) {
            isPerusahaan = checkedRadio.value === 'perusahaan';
        }

        const itemName = isPerusahaan ? formInputs.namaPerusahaan.value : formInputs.namaIndividu.value;

        const newItem = {
            id: formInputs.nomorSuratSanksi ? (formInputs.nomorSuratSanksi.value || `S-NEW-${Math.floor(Math.random()*1000)}/OJK/2026`) : `S-NEW-${Math.floor(Math.random()*1000)}/OJK/2026`,
            tanggal: formInputs.tanggalSuratSanksi ? (formInputs.tanggalSuratSanksi.value || today.toLocaleDateString('id-ID', options)) : today.toLocaleDateString('id-ID', options),
            nama: itemName || 'PT Karya Investasi Bersama',
            sanksi: formInputs.jenisPeraturan.value || 'Pelanggaran',
            denda: unformatCurrency(formInputs.nominalDenda.value) || 0,
            status: status,
            statusClass: statusClass,
            kirimMeta: kirimMeta || null,
            formState: {
                tipeSubjek: isPerusahaan ? 'perusahaan' : 'individu',
                namaPerusahaan: formInputs.namaPerusahaan.value,
                jenisIdentitasPerusahaan: formInputs.jenisIdentitasPerusahaan.value,
                nomorIdentitasPerusahaan: formInputs.nomorIdentitasPerusahaan.value,
                emailPerusahaan: formInputs.emailPerusahaan.value,
                teleponPerusahaan: formInputs.teleponPerusahaan.value,
                sandiPujkPerusahaan: formInputs.sandiPujkPerusahaan.value,
                sektorPujkPerusahaan: formInputs.sektorPujkPerusahaan.value,
                subSektorPujkPerusahaan: formInputs.subSektorPujkPerusahaan.value,
                subSubSektorPujkPerusahaan: formInputs.subSubSektorPujkPerusahaan.value,
                namaIndividu: formInputs.namaIndividu.value,
                kewarganegaraan: formInputs.kewarganegaraan.value,
                jenisIdentitasIndividu: formInputs.jenisIdentitasIndividu.value,
                nomorIdentitasIndividu: formInputs.nomorIdentitasIndividu.value,
                tanggalLahir: formInputs.tanggalLahir.value,
                emailIndividu: formInputs.emailIndividu.value,
                alamatIndividu: formInputs.alamatIndividu.value,
                teleponIndividu: formInputs.teleponIndividu.value,
                jabatan: formInputs.jabatan.value,
                namaPerusahaanMenjabat: formInputs.namaPerusahaanMenjabat.value,
                npwpPerusahaanMenjabat: formInputs.npwpPerusahaanMenjabat.value,
                sandiPujkIndividu: formInputs.sandiPujkIndividu.value,
                sektorPujkIndividu: formInputs.sektorPujkIndividu.value,
                subSektorPujkIndividu: formInputs.subSektorPujkIndividu.value,
                subSubSektorPujkIndividu: formInputs.subSubSektorPujkIndividu.value,
                kodeLaporan: formInputs.kodeLaporan.value,
                namaLaporan: formInputs.namaLaporan.value,
                periodeLaporan: formatPeriodeIndo(formInputs.periodeLaporan.value),
                sumberAplikasi: formInputs.sumberAplikasi.value,
                statusKeterlambatan: formInputs.statusKeterlambatan.value,
                tanggalLapor: formInputs.tanggalLapor.value,
                tanggalBatasPelaporan: formInputs.tanggalBatasPelaporan.value,
                jumlahHariKeterlambatan: formInputs.jumlahHariKeterlambatan.value,
                statusKeterlambatanPengawas: formInputs.statusKeterlambatanPengawas ? formInputs.statusKeterlambatanPengawas.value : '',
                tanggalLaporPengawas: formInputs.tanggalLaporPengawas ? formInputs.tanggalLaporPengawas.value : '',
                tanggalBatasPelaporanPengawas: formInputs.tanggalBatasPelaporanPengawas ? formInputs.tanggalBatasPelaporanPengawas.value : '',
                jumlahHariKeterlambatanPengawas: formInputs.jumlahHariKeterlambatanPengawas ? formInputs.jumlahHariKeterlambatanPengawas.value : '',
                sesuaiSistem: formInputs.checkboxSesuaiSistem ? formInputs.checkboxSesuaiSistem.checked : true,
                jenisPelanggaran: formInputs.jenisPelanggaran.value,
                subJenisPelanggaran: formInputs.subJenisPelanggaran.value,
                subSubJenisPelanggaran: formInputs.subSubJenisPelanggaran.value,
                jenisPeraturan: formInputs.jenisPeraturan.value,
                nomorPeraturan: formInputs.nomorPeraturan.value,
                pasalPelanggaran: formInputs.pasalPelanggaran.value,
                deskripsiPelanggaran: formInputs.deskripsiPelanggaran.value,
                jenisSanksi: formInputs.jenisSanksi.value,
                nominalDenda: formInputs.nominalDenda.value,
                jenisSanksiPengawas: formInputs.jenisSanksiPengawas ? formInputs.jenisSanksiPengawas.value : '',
                nominalDendaPengawas: formInputs.nominalDendaPengawas ? formInputs.nominalDendaPengawas.value : '',
                catatanSanksiPengawas: formInputs.catatanSanksiPengawas ? formInputs.catatanSanksiPengawas.value : '',
                sesuaiSistemSanksi: formInputs.checkboxSesuaiSistemSanksi ? formInputs.checkboxSesuaiSistemSanksi.checked : true,
                rolePengawas: formInputs.rolePengawas ? formInputs.rolePengawas.value : '',
                catatanPengawas: formInputs.catatanPengawas ? formInputs.catatanPengawas.value : '',
                lampiranPengawas: formInputs.lampiranPengawas && formInputs.lampiranPengawas.files[0] ? formInputs.lampiranPengawas.files[0].name : ''
            }
        };

        if ((action === 'Kirim' && kirimMeta) || action === 'Kembalikan') {
            let profilName = '';
            if (isPerusahaan) {
                const nama = formInputs.namaPerusahaan.value.trim();
                profilName = nama ? `${nama}(Perusahaan)` : '';
            } else {
                const nama = formInputs.namaIndividu.value.trim();
                profilName = nama ? `${nama}(Individu)` : '';
            }
            const role = formInputs.rolePengawas ? formInputs.rolePengawas.value : '';
            const catatan = formInputs.catatanPengawas ? formInputs.catatanPengawas.value : '';
            
            if (profilName) {
                let formattedCatatan = catatan;
                if (action === 'Kembalikan') {
                    formattedCatatan = catatan || 'Dikembalikan ke Drafter';
                } else if (!catatan) {
                    formattedCatatan = `Dikirim ke ${kirimMeta.tipe} (${kirimMeta.assignees.join(', ')})`;
                }

                if (role === 'Drafter') {
                    const namaPujk = isPerusahaan ? formInputs.namaPerusahaan.value.trim() : formInputs.namaIndividu.value.trim();
                    formattedCatatan = `Dari: ${namaPujk}<br>Isi Catatan: ${formattedCatatan}`;
                }

                const riwayatData = {
                    "Nama Profil": profilName,
                    "Status Konseptor": role || "Drafter",
                    "Catatan": formattedCatatan,
                    "Tanggal": today.toLocaleDateString('id-ID', options)
                };
                fetch('/add-riwayat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(riwayatData)
                }).catch(e => console.error(e));
            }
        }

        if (currentEditIndex !== null) {
            const oldItem = globalData.history[currentEditIndex];
            if (oldItem.statusClass === 'draft') {
                globalData.stats.draft = Math.max(0, globalData.stats.draft - 1);
            } else if (oldItem.statusClass === 'pending') {
                globalData.stats.pending = Math.max(0, globalData.stats.pending - 1);
            } else if (oldItem.statusClass === 'selesai' || oldItem.statusClass === 'done') {
                globalData.stats.selesai = Math.max(0, globalData.stats.selesai - 1);
            }
            
            newItem.id = oldItem.id;
            // We do not inherit the old date so it will use today's date
            
            // Remove the old item and push the updated item to the top
            globalData.history.splice(currentEditIndex, 1);
            globalData.history.unshift(newItem);
            
            currentEditIndex = null;
        } else {
            globalData.history.unshift(newItem); // Add to top
        }

        renderTable();
        navigateTo('page-dashboard');

        // Notifikasi singkat
        if (action === 'Kirim' && kirimMeta) {
            const nama = kirimMeta.assignees.join(', ');
            setTimeout(() => alert(`Surat berhasil dikirim untuk ${kirimMeta.tipe} kepada: ${nama}`), 100);
        }
    }

    btnDraftForm.addEventListener('click', () => {
        addDataToHistory('Draft');
    });

    if (btnReviewForm) {
        btnReviewForm.addEventListener('click', async () => {
            const checkedRadio = document.querySelector('input[name="tipe-subjek"]:checked');
            const isPerusahaan = checkedRadio ? (checkedRadio.value === 'perusahaan') : true;
            const state = {
                tipeSubjek: isPerusahaan ? 'perusahaan' : 'individu',
                'Nama Perusahaan': formInputs.namaPerusahaan.value || '-',
                'Jenis Identitas': formInputs.jenisIdentitasPerusahaan.value || '-',
                'Nomor Identitas': formInputs.nomorIdentitasPerusahaan.value || '-',
                'Email': formInputs.emailPerusahaan.value || '-',
                'Nomor Telepon': formInputs.teleponPerusahaan.value || '-',
                'Sandi PUJK': formInputs.sandiPujkPerusahaan.value || '-',
                'Sektor PUJK': formInputs.sektorPujkPerusahaan.value || '-',
                'Sub Sektor PUJK': formInputs.subSektorPujkPerusahaan.value || '-',
                'Sub Sub Sektor PUJK': formInputs.subSubSektorPujkPerusahaan.value || '-',
                
                'Nama Individu': formInputs.namaIndividu.value || '-',
                'Kewarganegaraan': formInputs.kewarganegaraan.value || '-',
                'Tanggal Lahir': formInputs.tanggalLahir.value || '-',
                'Jabatan': formInputs.jabatan.value || '-',
                'Nama Perusahaan Menjabat': formInputs.namaPerusahaanMenjabat.value || '-',
                'Alamat': formInputs.alamatIndividu.value || '-',
                'Nomor NPWP Perusahaan': formInputs.npwpPerusahaanMenjabat.value || '-',
                
                'Kode Laporan': formInputs.kodeLaporan.value || '-',
                'Nama Laporan': formInputs.namaLaporan.value || '-',
                'Periode Laporan': formatPeriodeIndo(formInputs.periodeLaporan.value) || '-',
                'Sumber Aplikasi': formInputs.sumberAplikasi.value || '-',
                'Status Keterlambatan': formInputs.statusKeterlambatan.value || '-',
                'Tanggal Lapor': formInputs.tanggalLapor.value || '-',
                'Tanggal Batas Lapor': formInputs.tanggalBatasPelaporan.value || '-',
                
                'Jenis Pelanggaran': formInputs.jenisPelanggaran.value || '-',
                'Sub Jenis Pelanggaran': formInputs.subJenisPelanggaran.value || '-',
                'Sub Sub Jenis Pelanggaran': formInputs.subSubJenisPelanggaran.value || '-',
                'Jenis Peraturan': formInputs.jenisPeraturan.value || '-',
                'Nomor Peraturan': formInputs.nomorPeraturan.value || '-',
                'Pasal Pelanggaran': formInputs.pasalPelanggaran.value || '-',
                
                'Jenis Sanksi': formInputs.jenisSanksi.value || '-',
                'Nominal Denda': formInputs.nominalDenda.value || '0'
            };
            
            // Format nominal denda to be readable in document if not 0
            if (state['Nominal Denda'] !== '0' && state['Nominal Denda'] !== '-') {
                const rawNominal = unformatCurrency(state['Nominal Denda']);
                
                // Terbilang sederhana
                let terbilang = "";
                if (rawNominal == 50000) terbilang = "lima puluh ribu rupiah";
                else if (rawNominal == 100000) terbilang = "seratus ribu rupiah";
                else if (rawNominal == 250000) terbilang = "dua ratus lima puluh ribu rupiah";
                else if (rawNominal == 500000) terbilang = "lima ratus ribu rupiah";
                else if (rawNominal == 1000000) terbilang = "satu juta rupiah";
                else if (rawNominal == 1500000) terbilang = "satu juta lima ratus ribu rupiah";
                else if (rawNominal == 2000000) terbilang = "dua juta rupiah";
                else if (rawNominal > 0) terbilang = rawNominal + " rupiah";
                
                state['terbilang'] = terbilang;
            } else {
                state['terbilang'] = '-';
            }

            try {
                btnReviewForm.textContent = 'Memproses...';
                const response = await fetch('/generate-surat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(state)
                });
                
                if (response.ok) {
                    const blob = await response.blob();
                    
                    const modalPreviewDoc = document.getElementById('modal-preview-doc');
                    const container = document.getElementById('docx-container');
                    
                    container.innerHTML = '<p style="text-align: center; margin-top: 20px;">Memuat dokumen...</p>';
                    modalPreviewDoc.style.display = 'flex'; // Tampilkan modal segera
                    
                    try {
                        await docx.renderAsync(blob, container, null, {
                            className: "docx", 
                            inWrapper: true, 
                            ignoreWidth: false, 
                            ignoreHeight: false, 
                            ignoreFonts: false, 
                            breakPages: true, 
                            ignoreLastRenderedPageBreak: true,
                            experimental: false,
                            trimXmlDeclaration: true,
                            debug: false,
                        });
                    } catch (e) {
                        console.error("Error rendering docx:", e);
                        container.innerHTML = '<p style="text-align: center; color: red;">Gagal memuat pratinjau dokumen.</p>';
                    }
                } else {
                    alert('Gagal membuat dokumen surat. Pastikan backend server berjalan.');
                }
            } catch (err) {
                console.error(err);
                alert('Terjadi kesalahan saat memproses surat.');
            } finally {
                btnReviewForm.textContent = 'Review Surat';
            }
        });
    }

    // Modal Preview Doc Close Listener
    const btnModalPreviewClose = document.getElementById('btn-modal-preview-close');
    const modalPreviewDoc = document.getElementById('modal-preview-doc');
    
    if (btnModalPreviewClose && modalPreviewDoc) {
        btnModalPreviewClose.addEventListener('click', () => {
            modalPreviewDoc.style.display = 'none';
        });

        // Tutup saat klik di luar modal box
        modalPreviewDoc.addEventListener('click', (e) => {
            if (e.target === modalPreviewDoc) {
                modalPreviewDoc.style.display = 'none';
            }
        });
    }

    // ── Modal Kirim ──────────────────────────────────────────
    const modalKirim          = document.getElementById('modal-kirim');
    const btnModalClose       = document.getElementById('btn-modal-close');
    const modalStep1          = document.getElementById('modal-step-1');
    const modalStepApproval   = document.getElementById('modal-step-approval');
    const modalStepVerifikasi = document.getElementById('modal-step-verifikasi');

    // ── Custom Combobox Logic ────────────────────────────────
    function initCombobox(inputId) {
        const input    = document.getElementById(inputId);
        if (!input) return;
        const wrapper  = input.closest('.combobox-wrapper');
        const dropdown = wrapper.querySelector('.combobox-dropdown');
        const options  = dropdown.querySelectorAll('.combobox-option');

        // Buka dropdown
        function openDropdown() {
            // Tutup semua combobox lain dulu
            document.querySelectorAll('.combobox-wrapper.open').forEach(w => {
                if (w !== wrapper) w.classList.remove('open');
            });
            wrapper.classList.add('open');
            filterOptions(input.value);
        }

        // Tutup dropdown
        function closeDropdown() {
            wrapper.classList.remove('open');
        }

        // Filter opsi berdasarkan teks input
        function filterOptions(query) {
            const q = query.toLowerCase().trim();
            let hasResult = false;
            options.forEach(opt => {
                const match = opt.textContent.toLowerCase().includes(q);
                opt.classList.toggle('hidden', !match);
                if (match) hasResult = true;
            });
            // Tampilkan "tidak ada hasil" jika semua tersembunyi
            let noResult = dropdown.querySelector('.combobox-no-result');
            if (!hasResult) {
                if (!noResult) {
                    noResult = document.createElement('div');
                    noResult.className = 'combobox-no-result';
                    noResult.textContent = 'Nama tidak ditemukan';
                    dropdown.appendChild(noResult);
                }
                noResult.style.display = 'block';
            } else {
                if (noResult) noResult.style.display = 'none';
            }
        }

        // Klik pada input → buka/tutup
        input.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.contains('open') ? closeDropdown() : openDropdown();
        });

        // Fokus → buka dropdown
        input.addEventListener('focus', () => openDropdown());

        // Ketik → filter
        input.addEventListener('input', () => {
            filterOptions(input.value);
            if (!wrapper.classList.contains('open')) openDropdown();
        });

        // Klik opsi → isi input dan tutup
        options.forEach(opt => {
            opt.addEventListener('mousedown', (e) => {
                e.preventDefault(); // Cegah blur sebelum klik selesai
                input.value = opt.textContent.trim();
                closeDropdown();
            });
        });

        // Tutup saat blur (klik di luar)
        input.addEventListener('blur', () => {
            setTimeout(() => closeDropdown(), 150);
        });
    }

    // Inisialisasi semua combobox di modal
    ['dropdown-approval-1', 'dropdown-verif-1', 'dropdown-verif-2', 'dropdown-verif-3']
        .forEach(id => initCombobox(id));

    // Tutup semua dropdown saat klik di luar
    document.addEventListener('click', () => {
        document.querySelectorAll('.combobox-wrapper.open')
            .forEach(w => w.classList.remove('open'));
    });

    // ── Modal Open/Close ─────────────────────────────────────
    function openModal() {
        modalStep1.style.display = 'block';
        modalStepApproval.style.display = 'none';
        modalStepVerifikasi.style.display = 'none';
        // Reset semua combobox input
        ['dropdown-approval-1','dropdown-verif-1','dropdown-verif-2','dropdown-verif-3']
            .forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
        document.querySelectorAll('.combobox-wrapper.open')
            .forEach(w => w.classList.remove('open'));
        modalKirim.classList.add('active');
    }

    function closeModal() {
        modalKirim.classList.remove('active');
    }

    btnKirimForm.addEventListener('click', openModal);
    btnModalClose.addEventListener('click', closeModal);

    // Tutup saat klik overlay luar
    modalKirim.addEventListener('click', (e) => {
        if (e.target === modalKirim) closeModal();
    });

    // Navigasi step
    document.getElementById('btn-pilih-verifikasi').addEventListener('click', () => {
        modalStep1.style.display = 'none';
        modalStepVerifikasi.style.display = 'block';
    });

    document.getElementById('btn-pilih-approval').addEventListener('click', () => {
        modalStep1.style.display = 'none';
        modalStepApproval.style.display = 'block';
    });

    const btnKembalikanDrafter = document.getElementById('btn-kembalikan-drafter');
    if (btnKembalikanDrafter) {
        btnKembalikanDrafter.addEventListener('click', () => {
            closeModal();
            addDataToHistory('Kembalikan');
            alert('Surat dikembalikan ke Drafter dengan status Draft.');
        });
    }

    document.getElementById('btn-back-approval').addEventListener('click', () => {
        modalStepApproval.style.display = 'none';
        modalStep1.style.display = 'block';
    });

    document.getElementById('btn-back-verifikasi').addEventListener('click', () => {
        modalStepVerifikasi.style.display = 'none';
        modalStep1.style.display = 'block';
    });

    // Submit Approval (1 wajib)
    document.getElementById('btn-submit-approval').addEventListener('click', () => {
        const approver = document.getElementById('dropdown-approval-1').value.trim();
        if (!approver) {
            alert('Harap pilih atau masukkan nama approver.');
            return;
        }
        closeModal();
        addDataToHistory('Kirim', { tipe: 'Approval', assignees: [approver] });
    });

    // Submit Verifikasi
    document.getElementById('btn-submit-verifikasi').addEventListener('click', () => {
        const v1El = document.getElementById('dropdown-verif-1');
        const v2El = document.getElementById('dropdown-verif-2');
        const v3El = document.getElementById('dropdown-verif-3');

        const v1 = v1El ? v1El.value.trim() : '';
        const v2 = v2El ? v2El.value.trim() : '';
        const v3 = v3El ? v3El.value.trim() : '';

        // Tandai field yang kosong dengan border merah
        if (v1El) v1El.style.borderColor = v1 ? '' : '#e53e3e';
        if (v2El) v2El.style.borderColor = v2 ? '' : '#e53e3e';
        if (v3El) v3El.style.borderColor = v3 ? '' : '#e53e3e';

        if (!v1 || (v2El && !v2) || (v3El && !v3)) {
            alert('Semua verifikator wajib diisi.');
            return;
        }
        
        const assignees = [v1];
        if (v2) assignees.push(v2);
        if (v3) assignees.push(v3);

        closeModal();
        addDataToHistory('Kirim', { tipe: 'Verifikasi', assignees: assignees });
    });



    // Render Table
    function renderTableKonfigurasi() {
        const tbodyKonf = document.getElementById('table-body-konfigurasi');
        if (!tbodyKonf) return;
        tbodyKonf.innerHTML = '';
        
        if (!konfigurasiData || konfigurasiData.length === 0) {
            tbodyKonf.innerHTML = '<tr><td colspan="7" class="text-center">Data kosong</td></tr>';
            return;
        }

        konfigurasiData.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.sumberAplikasi || '-'}</td>
                <td>${item.sektor || '-'}</td>
                <td>${item.namaLaporan || '-'}</td>
                <td>${item.frekuensiPelaporan || '-'}</td>
                <td>${item.jenisSanksi || '-'}</td>
                <td><span class="badge ${item.status === 'Aktif' ? 'selesai' : 'draft'}">${item.status || '-'}</span></td>
                <td style="white-space: nowrap;">
                    <button class="btn btn-ghost btn-icon" onclick="editKonfigurasi(${index})" title="Edit">✏️</button>
                </td>
            `;
            tbodyKonf.appendChild(tr);
        });
    }

    function renderTable() {
        // Update Stats
        if(statDraft) statDraft.textContent = globalData.stats.draft || 0;
        if(statPending) statPending.textContent = globalData.stats.pending || 0;
        if(statSelesai) statSelesai.textContent = globalData.stats.selesai || 0;

        // Update Table
        tableBody.innerHTML = '';
        
        if (!globalData.history || globalData.history.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="10" class="empty-state">Belum ada data surat sanksi.</td></tr>';
            return;
        }

        globalData.history.forEach((item, index) => {
            const tr = document.createElement('tr');
            
            let dendaValue = item.denda;
            let displayJenisSanksi = item.formState?.jenisSanksi || item.sanksi || '-';
            
            if (item.formState) {
                if (item.formState.sesuaiSistemSanksi === false) {
                    if (item.formState.nominalDendaPengawas) {
                        dendaValue = item.formState.nominalDendaPengawas;
                    }
                    if (item.formState.jenisSanksiPengawas) {
                        displayJenisSanksi = item.formState.jenisSanksiPengawas;
                    }
                } else if (item.formState.nominalDenda) {
                    dendaValue = item.formState.nominalDenda;
                }
            }
            
            const formattedDenda = formatCurrency(dendaValue);
            
            let displayNama = item.nama;
            if (item.formState) {
                if (item.formState.tipeSubjek === 'individu' && item.formState.namaIndividu) {
                    displayNama = item.formState.namaIndividu;
                } else {
                    displayNama = item.formState.namaPerusahaan || item.formState.namaPerusahaanMenjabat || item.nama;
                }
            }
            
            tr.innerHTML = `
                <td>${item.tanggal}</td>
                <td><strong>${displayNama}</strong></td>
                <td>${item.formState?.sektorPujkPerusahaan || item.formState?.sektorPujkIndividu || '-'}</td>
                <td>${item.formState?.namaLaporan || '-'}</td>
                <td>${item.formState?.periodeLaporan || '-'}</td>
                <td>${item.formState?.statusKeterlambatan || '-'}</td>
                <td>${displayJenisSanksi}</td>
                <td>${formattedDenda}</td>
                <td><span class="badge ${item.statusClass}">${item.status}</span></td>
                <td style="white-space: nowrap;">
                    <button class="btn btn-ghost btn-icon btn-edit-row" data-index="${index}" title="Edit">✏️</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Add event listeners for dynamic buttons
        document.querySelectorAll('.btn-delete-row').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                    const idx = this.getAttribute('data-index');
                    const deletedItem = globalData.history[idx];
                    
                    // Reduce stat
                    if(deletedItem.statusClass === 'draft') {
                        globalData.stats.draft = Math.max(0, globalData.stats.draft - 1);
                    } else if (deletedItem.statusClass === 'pending') {
                        globalData.stats.pending = Math.max(0, globalData.stats.pending - 1);
                    } else if (deletedItem.statusClass === 'selesai' || deletedItem.statusClass === 'done') {
                        globalData.stats.selesai = Math.max(0, globalData.stats.selesai - 1);
                    }

                    globalData.history.splice(idx, 1);
                    renderTable();
                }
            });
        });

        document.querySelectorAll('.btn-view-row').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = this.getAttribute('data-index');
                const item = globalData.history[idx];
                loadFormState(item.formState);
                setFieldsReadonly(true);
                navigateTo('page-editor');
                // Optional: hide action buttons for viewing
                btnDraftForm.style.display = 'none';
                btnKirimForm.style.display = 'none';
                const tipeSubjekGroup = document.getElementById('tipe-subjek-group');
                if (tipeSubjekGroup) tipeSubjekGroup.style.display = 'none';
                const pengawasFieldsContainer = document.getElementById('pengawas-fields-container');
                const statusKeterlambatanGroup = document.getElementById('status-keterlambatan-group');
                const pengawasSanksiContainer = document.getElementById('pengawas-sanksi-container');
                if (pengawasFieldsContainer) pengawasFieldsContainer.style.display = 'block';
                if (statusKeterlambatanGroup) statusKeterlambatanGroup.style.breakBefore = 'column';
                if (pengawasSanksiContainer) pengawasSanksiContainer.style.display = 'block';
            });
        });

        document.querySelectorAll('.btn-edit-row').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-index'), 10);
                currentEditIndex = idx;
                const item = globalData.history[idx];
                loadFormState(item.formState);
                setFieldsReadonly(true);
                navigateTo('page-editor');
                // Restore action buttons
                btnDraftForm.style.display = 'block';
                btnKirimForm.style.display = 'block';
                const tipeSubjekGroup = document.getElementById('tipe-subjek-group');
                if (tipeSubjekGroup) tipeSubjekGroup.style.display = 'none';
                const pengawasFieldsContainer = document.getElementById('pengawas-fields-container');
                const statusKeterlambatanGroup = document.getElementById('status-keterlambatan-group');
                const pengawasSanksiContainer = document.getElementById('pengawas-sanksi-container');
                if (pengawasFieldsContainer) pengawasFieldsContainer.style.display = 'block';
                if (statusKeterlambatanGroup) statusKeterlambatanGroup.style.breakBefore = 'column';
                if (pengawasSanksiContainer) pengawasSanksiContainer.style.display = 'block';
                if (typeof updatePengawasFieldsState === 'function') updatePengawasFieldsState();
                if (typeof updatePengawasSanksiFieldsState === 'function') updatePengawasSanksiFieldsState();
            });
        });

    }
    
    // Load state into form
    function loadFormState(state) {
        if(!state) return;
        
        // Restore radio selection and toggle sections
        let isIndividu = false;
        if (state.tipeSubjek) {
            isIndividu = state.tipeSubjek === 'individu';
        } else {
            // Fallback for old data without tipeSubjek
            isIndividu = state.namaIndividu && !state.namaPerusahaan;
        }

        const radioPerusahaan = document.querySelector('input[name="tipe-subjek"][value="perusahaan"]');
        const radioIndividu = document.querySelector('input[name="tipe-subjek"][value="individu"]');
        const secPerusahaan = document.getElementById('section-perusahaan');
        const secIndividu = document.getElementById('section-individu');
        const tabBtnProfil = document.getElementById('tab-btn-profil');
        
        if (isIndividu) {
            if (radioIndividu) radioIndividu.checked = true;
            if (secPerusahaan) secPerusahaan.style.display = 'none';
            if (secIndividu) secIndividu.style.display = 'block';
            if (tabBtnProfil) tabBtnProfil.textContent = 'Profil-Individu';
        } else {
            if (radioPerusahaan) radioPerusahaan.checked = true;
            if (secPerusahaan) secPerusahaan.style.display = 'block';
            if (secIndividu) secIndividu.style.display = 'none';
            if (tabBtnProfil) tabBtnProfil.textContent = 'Profil-Perusahaan';
        }

        formInputs.namaPerusahaan.value = state.namaPerusahaan || '';
        formInputs.jenisIdentitasPerusahaan.value = state.jenisIdentitasPerusahaan || 'NPWP';
        formInputs.nomorIdentitasPerusahaan.value = state.nomorIdentitasPerusahaan || '';
        formInputs.emailPerusahaan.value = state.emailPerusahaan || '';
        formInputs.teleponPerusahaan.value = state.teleponPerusahaan || '';
        formInputs.sandiPujkPerusahaan.value = state.sandiPujkPerusahaan || '';
        updatePujkFieldsPerusahaan(); // Force synchronization with Sandi PUJK
        
        // Sektor fields are overridden by updatePujkFieldsPerusahaan if Sandi PUJK exists, 
        // but we can still load them as fallback if Sandi PUJK is empty.
        if (!formInputs.sandiPujkPerusahaan.value) {
            formInputs.sektorPujkPerusahaan.value = state.sektorPujkPerusahaan || '';
            formInputs.subSektorPujkPerusahaan.value = state.subSektorPujkPerusahaan || '';
            formInputs.subSubSektorPujkPerusahaan.value = state.subSubSektorPujkPerusahaan || '';
        }

        formInputs.namaIndividu.value = state.namaIndividu || '';
        formInputs.kewarganegaraan.value = state.kewarganegaraan || 'WNI';
        updateJenisIdentitasIndividu();
        formInputs.jenisIdentitasIndividu.value = state.jenisIdentitasIndividu || 'KTP';
        formInputs.nomorIdentitasIndividu.value = state.nomorIdentitasIndividu || '';
        formInputs.tanggalLahir.value = state.tanggalLahir || '';
        formInputs.emailIndividu.value = state.emailIndividu || '';
        formInputs.alamatIndividu.value = state.alamatIndividu || '';
        formInputs.teleponIndividu.value = state.teleponIndividu || '';
        formInputs.jabatan.value = state.jabatan || '';
        
        formInputs.sandiPujkIndividu.value = state.sandiPujkIndividu || '';
        updatePujkFieldsIndividu(); // Force synchronization with Sandi PUJK
        
        if (!formInputs.sandiPujkIndividu.value) {
            formInputs.namaPerusahaanMenjabat.value = state.namaPerusahaanMenjabat || '';
            formInputs.npwpPerusahaanMenjabat.value = state.npwpPerusahaanMenjabat || '';
            formInputs.sektorPujkIndividu.value = state.sektorPujkIndividu || '';
            formInputs.subSektorPujkIndividu.value = state.subSektorPujkIndividu || '';
            formInputs.subSubSektorPujkIndividu.value = state.subSubSektorPujkIndividu || '';
        } else {
            formInputs.npwpPerusahaanMenjabat.value = state.npwpPerusahaanMenjabat || '';
        }
        formInputs.kodeLaporan.value = state.kodeLaporan || '';
        formInputs.namaLaporan.value = state.namaLaporan || '';
        formInputs.periodeLaporan.value = parsePeriodeIndo(state.periodeLaporan) || '';
        formInputs.sumberAplikasi.value = state.sumberAplikasi || '';
        formInputs.statusKeterlambatan.value = state.statusKeterlambatan || '';
        formInputs.tanggalLapor.value = state.tanggalLapor || '';
        formInputs.tanggalBatasPelaporan.value = state.tanggalBatasPelaporan || '';
        if (formInputs.jumlahHariKeterlambatan) {
            formInputs.jumlahHariKeterlambatan.value = state.jumlahHariKeterlambatan || '';
        }
        if (formInputs.checkboxSesuaiSistem) {
            formInputs.checkboxSesuaiSistem.checked = state.sesuaiSistem !== undefined ? state.sesuaiSistem : true;
        }
        if (formInputs.statusKeterlambatanPengawas) formInputs.statusKeterlambatanPengawas.value = state.statusKeterlambatanPengawas || '';
        if (formInputs.tanggalLaporPengawas) formInputs.tanggalLaporPengawas.value = state.tanggalLaporPengawas || '';
        if (formInputs.tanggalBatasPelaporanPengawas) formInputs.tanggalBatasPelaporanPengawas.value = state.tanggalBatasPelaporanPengawas || '';
        if (formInputs.jumlahHariKeterlambatanPengawas) formInputs.jumlahHariKeterlambatanPengawas.value = state.jumlahHariKeterlambatanPengawas || '';
        formInputs.jenisPelanggaran.value = state.jenisPelanggaran || '';
        formInputs.subJenisPelanggaran.value = state.subJenisPelanggaran || '';
        formInputs.subSubJenisPelanggaran.value = state.subSubJenisPelanggaran || '';
        formInputs.jenisPeraturan.value = state.jenisPeraturan || 'Undang Undang';
        formInputs.nomorPeraturan.value = state.nomorPeraturan || '';
        formInputs.pasalPelanggaran.value = state.pasalPelanggaran || '';
        formInputs.deskripsiPelanggaran.value = state.deskripsiPelanggaran || '';
        formInputs.jenisSanksi.value = state.jenisSanksi || '';
        updateNominalDendaState(); // Ensure the input is enabled/disabled correctly
        formInputs.nominalDenda.value = state.nominalDenda || '';
        
        if (formInputs.checkboxSesuaiSistemSanksi) {
            formInputs.checkboxSesuaiSistemSanksi.checked = state.sesuaiSistemSanksi !== undefined ? state.sesuaiSistemSanksi : true;
        }
        if (formInputs.jenisSanksiPengawas) formInputs.jenisSanksiPengawas.value = state.jenisSanksiPengawas || '';
        if (formInputs.nominalDendaPengawas) formInputs.nominalDendaPengawas.value = state.nominalDendaPengawas || '';
        if (formInputs.catatanSanksiPengawas) formInputs.catatanSanksiPengawas.value = state.catatanSanksiPengawas || '';
        
        updatePreviewButtonVisibility();
        if (formInputs.rolePengawas) {
            let derivedRole = 'Drafter';
            if (currentEditIndex !== null && globalData.history[currentEditIndex]) {
                const status = globalData.history[currentEditIndex].status;
                if (status === 'Dalam Proses Verifikasi') {
                    derivedRole = 'Verifikator';
                } else if (status === 'Dalam Proses Approve' || status === 'Sudah Approve') {
                    derivedRole = 'Approver';
                }
            }
            formInputs.rolePengawas.value = derivedRole;
        }
        if (formInputs.catatanPengawas) {
            formInputs.catatanPengawas.value = state.catatanPengawas || '';
        }
        if (formInputs.lampiranPengawas) {
            formInputs.lampiranPengawas.value = ''; // cannot restore file input securely
        }
        
        // Removed signature loading since it's deleted
        
        updatePreview();
        hitungKeterlambatan();
    }

    // Fetch Initial Data
    async function loadData() {
        try {
            try {
                const konfRes = await fetch('konfigurasi_data.json');
                if (konfRes.ok) {
                    konfigurasiData = await konfRes.json();
                    renderTableKonfigurasi();
                }
            } catch (e) {
                console.error("Error loading konfigurasi data:", e);
            }

            const lapRes = await fetch('laporan_data.json');
            if (lapRes.ok) {
                laporanData = await lapRes.json();
            }

            const pujkRes = await fetch('pujk_data.json');
            if (pujkRes.ok) {
                pujkData = await pujkRes.json();
                // Do not overwrite HTML select options here
            }

            try {
                const bankRes = await fetch('bank_data.json');
                if (bankRes.ok) {
                    bankData = await bankRes.json();
                }
            } catch (e) {
                console.error("Error loading bank data:", e);
            }

            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const defaultData = await response.json();
            globalData.history = defaultData.history || [];
            
            // Re-map old data history to have draft/pending statuses
            globalData.history.forEach(item => {
                if(item.statusClass === 'sent' || item.statusClass === 'terkirim' || item.statusClass === 'pending') {
                    if (item.kirimMeta && item.kirimMeta.tipe === 'Approval') {
                        item.status = 'Dalam Proses Approve';
                    } else if (item.kirimMeta && item.kirimMeta.tipe === 'Verifikasi') {
                        item.status = 'Dalam Proses Verifikasi';
                    } else {
                        item.status = 'Dalam Proses';
                    }
                    item.statusClass = 'pending';
                } else if(item.statusClass === 'selesai' || item.statusClass === 'done') {
                    item.status = 'Sudah Approve';
                    item.statusClass = 'selesai';
                }
            });
            
            // Recalculate stats dynamically based on history
            globalData.stats = { draft: 0, pending: 0, selesai: 0 };
            globalData.history.forEach(item => {
                if(item.statusClass === 'draft') globalData.stats.draft++;
                else if(item.statusClass === 'pending') globalData.stats.pending++;
                else if(item.statusClass === 'selesai' || item.statusClass === 'done') globalData.stats.selesai++;
            });

            renderTable();
        } catch (error) {
            console.error("Error loading JSON data:", error);
            renderTable(); 
        }
    }

    // Format Currency
    function formatCurrency(amount) {
        const num = unformatCurrency(amount);
        if (num === 0 && amount !== 0 && amount !== '0') return '';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    }

    function unformatCurrency(str) {
        if (typeof str === 'number') return str;
        if (!str) return 0;
        return parseInt(str.toString().replace(/[^0-9]/g, ''), 10) || 0;
    }

    // Live Preview Logic
    function updatePreview() {
        let isPerusahaan = true;
        const checkedRadio = document.querySelector('input[name="tipe-subjek"]:checked');
        if (checkedRadio) {
            isPerusahaan = checkedRadio.value === 'perusahaan';
        }

        previewEls.nomor.textContent = formInputs.nomorSuratSanksi ? formInputs.nomorSuratSanksi.value : '______________';
        previewEls.nama.textContent = isPerusahaan ? (formInputs.namaPerusahaan.value || '___________________________') : (formInputs.namaIndividu.value || '___________________________');
        
        if (!isPerusahaan && formInputs.alamatIndividu.value) {
            previewEls.alamat.innerHTML = formInputs.alamatIndividu.value.replace(/\n/g, '<br>');
        } else {
            previewEls.alamat.innerHTML = '___________________________';
        }

        previewEls.selaku.textContent = formInputs.jabatan.value || '__________________';
        previewEls.sanksi.textContent = formInputs.deskripsiPelanggaran.value || '__________________';
        previewEls.jenisDenda.textContent = 'Denda Administratif';
        previewEls.jumlah.textContent = formatCurrency(formInputs.nominalDenda.value || 0);

        previewEls.deskripsi.innerHTML = '';

        // Set Date dynamically
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        previewEls.date.textContent = 'Jakarta, ' + today.toLocaleDateString('id-ID', options);
    }

    // Dynamic dropdown for Jenis Identitas Individu based on Kewarganegaraan
    function updateJenisIdentitasIndividu() {
        const kewarganegaraan = formInputs.kewarganegaraan.value;
        const select = formInputs.jenisIdentitasIndividu;
        select.innerHTML = ''; // Clear options
        
        if (kewarganegaraan === 'WNI') {
            select.innerHTML = '<option value="KTP">KTP</option>';
        } else {
            select.innerHTML = '<option value="Paspor">Paspor</option><option value="KITAS">KITAS</option>';
        }
    }

    // Add Event Listeners for Live Preview and Dropdowns
    Object.values(formInputs).forEach(input => {
        if(input && input.id !== 'upload-ttd') {
            input.addEventListener('input', updatePreview);
            input.addEventListener('change', updatePreview);
        }
    });

    function updatePujkFieldsPerusahaan() {
        const select = formInputs.sandiPujkPerusahaan;
        const selectedOption = select.options[select.selectedIndex];
        
        if (selectedOption && selectedOption.dataset.nama) {
            formInputs.namaPerusahaan.value = selectedOption.dataset.nama;
            updatePreview();
        } else if (select.value === "") {
            formInputs.namaPerusahaan.value = "";
            updatePreview();
        }

        const key = select.value;
        if (selectedOption && selectedOption.dataset.sektor) {
            formInputs.sektorPujkPerusahaan.value = selectedOption.dataset.sektor;
            formInputs.subSektorPujkPerusahaan.value = selectedOption.dataset.sub;
            formInputs.subSubSektorPujkPerusahaan.value = selectedOption.dataset.subsub;
        } else if (pujkData[key]) {
            formInputs.namaPerusahaan.value = pujkData[key].nama || '';
            formInputs.sektorPujkPerusahaan.value = pujkData[key].sektor || '';
            formInputs.subSektorPujkPerusahaan.value = pujkData[key].sub_sektor || '';
            formInputs.subSubSektorPujkPerusahaan.value = pujkData[key].sub_sub_sektor || '';
            updatePreview();
        } else {
            formInputs.sektorPujkPerusahaan.value = '';
            formInputs.subSektorPujkPerusahaan.value = '';
            formInputs.subSubSektorPujkPerusahaan.value = '';
        }

        // Autofill bank details
        const bankKey = key ? parseInt(key, 10).toString() : '';
        if (bankData && bankData[bankKey]) {
            if (formInputs.nomorIdentitasPerusahaan) formInputs.nomorIdentitasPerusahaan.value = bankData[bankKey].nomor_identitas || '';
            if (formInputs.emailPerusahaan) formInputs.emailPerusahaan.value = bankData[bankKey].email || '';
            if (formInputs.teleponPerusahaan) formInputs.teleponPerusahaan.value = bankData[bankKey].nomor_telepon || '';
            if (formInputs.jenisIdentitasPerusahaan) formInputs.jenisIdentitasPerusahaan.value = 'NPWP';
        } else {
            if (formInputs.nomorIdentitasPerusahaan) formInputs.nomorIdentitasPerusahaan.value = '';
            if (formInputs.emailPerusahaan) formInputs.emailPerusahaan.value = '';
            if (formInputs.teleponPerusahaan) formInputs.teleponPerusahaan.value = '';
        }
    }

    function updatePujkFieldsIndividu() {
        const select = formInputs.sandiPujkIndividu;
        const selectedOption = select.options[select.selectedIndex];
        
        if (selectedOption && selectedOption.dataset.nama) {
            formInputs.namaPerusahaanMenjabat.value = selectedOption.dataset.nama;
            updatePreview();
        } else if (select.value === "") {
            formInputs.namaPerusahaanMenjabat.value = "";
            updatePreview();
        }

        const key = select.value;
        if (selectedOption && selectedOption.dataset.sektor) {
            formInputs.sektorPujkIndividu.value = selectedOption.dataset.sektor;
            formInputs.subSektorPujkIndividu.value = selectedOption.dataset.sub;
            formInputs.subSubSektorPujkIndividu.value = selectedOption.dataset.subsub;
        } else if (pujkData[key]) {
            formInputs.namaPerusahaanMenjabat.value = pujkData[key].nama || '';
            formInputs.sektorPujkIndividu.value = pujkData[key].sektor || '';
            formInputs.subSektorPujkIndividu.value = pujkData[key].sub_sektor || '';
            formInputs.subSubSektorPujkIndividu.value = pujkData[key].sub_sub_sektor || '';
            updatePreview();
        } else {
            formInputs.sektorPujkIndividu.value = '';
            formInputs.subSektorPujkIndividu.value = '';
            formInputs.subSubSektorPujkIndividu.value = '';
        }
    }

    function updatePreviewButtonVisibility() {
        const btnContainer = document.getElementById('preview-surat-container');
        if (!btnContainer) return;
        
        const jenis = formInputs.jenisSanksi ? formInputs.jenisSanksi.value : '';
        const jenisPengawas = formInputs.jenisSanksiPengawas && !formInputs.jenisSanksiPengawas.disabled ? formInputs.jenisSanksiPengawas.value : '';
        
        // Hide if either is "Tidak dikenakan sanksi", but check if it's the active one
        // If "Sesuai Sistem" is checked, we only care about `jenis`.
        // The safest approach is just: if either one that is active is "Tidak dikenakan sanksi", hide it.
        const activeJenis = (formInputs.checkboxSesuaiSistemSanksi && formInputs.checkboxSesuaiSistemSanksi.checked) 
            ? jenis 
            : (jenisPengawas || jenis);

        if (jenis === 'Tidak dikenakan sanksi' || jenisPengawas === 'Tidak dikenakan sanksi') {
            btnContainer.style.display = 'none';
        } else {
            btnContainer.style.display = 'block';
        }
    }

    function updateNominalDendaState() {
        const jenis = formInputs.jenisSanksi.value;
        const requiresDenda = [
            'Sanksi denda - Denda',
            'Sanksi denda - Denda yaitu kewajiban untuk membayar sejumlah uang tertentu',
            'Sanksi denda - Denda administratif'
        ].includes(jenis);

        if (requiresDenda) {
            formInputs.nominalDenda.disabled = false;
            formInputs.nominalDenda.style.background = '';
            formInputs.nominalDenda.style.cursor = 'text';
        } else {
            formInputs.nominalDenda.disabled = true;
            formInputs.nominalDenda.style.background = '#e9ecef';
            formInputs.nominalDenda.style.cursor = 'not-allowed';
            formInputs.nominalDenda.value = ''; // Optional, clear the value if disabled
        }
    }

    // Initialize App
    updateJenisIdentitasIndividu();
    updateNominalDendaState();
    updatePreviewButtonVisibility();
    formInputs.kewarganegaraan.addEventListener('change', updateJenisIdentitasIndividu);
    formInputs.sandiPujkPerusahaan.addEventListener('change', updatePujkFieldsPerusahaan);
    if(formInputs.sandiPujkIndividu)
        formInputs.sandiPujkIndividu.addEventListener('change', updatePujkFieldsIndividu);

    function updateLaporanFields() {
        if (!formInputs.kodeLaporan) return;
        const kode = formInputs.kodeLaporan.value.trim();
        if (laporanData[kode]) {
            const data = laporanData[kode];
            
            formInputs.namaLaporan.value = data['Nama Laporan'] || '';
            
            if (data['Periode Laporan']) {
                formInputs.periodeLaporan.value = parsePeriodeIndo(data['Periode Laporan']) || '';
            } else {
                formInputs.periodeLaporan.value = '';
            }
            
            formInputs.sumberAplikasi.value = data['Sumber Aplikasi'] || '';
            formInputs.tanggalBatasPelaporan.value = data['Tanggal Batas Pelaporan'] || '';
            formInputs.tanggalLapor.value = data['Tanggal Lapor'] || '';
            
            formInputs.jenisPelanggaran.value = data['Jenis Pelanggaran'] || '';
            formInputs.subJenisPelanggaran.value = data['Sub Jenis Pelanggaran'] || '';
            formInputs.subSubJenisPelanggaran.value = data['Sub Sub Jenis Pelanggaran'] || '';
            
            let jpData = data['Jenis Peraturan'] || '';
            let jpVal = '';
            if (jpData.toLowerCase().replace('-', ' ') === 'undang undang') {
                jpVal = 'Undang Undang';
            } else if (jpData.toLowerCase() === 'pojk') {
                jpVal = 'POJK';
            } else if (jpData.toLowerCase() === 'peraturan regulator lainnya') {
                jpVal = 'Peraturan Regulator Lainnya';
            } else {
                jpVal = jpData; // fallback
            }
            formInputs.jenisPeraturan.value = jpVal;
            
            formInputs.nomorPeraturan.value = data['Nomor Peraturan'] || '';
            formInputs.pasalPelanggaran.value = data['Pasal Pelanggaran'] || '';
            
            hitungKeterlambatan();
        }
    }

    if(formInputs.kodeLaporan) {
        formInputs.kodeLaporan.addEventListener('change', updateLaporanFields);
    }
    formInputs.jenisSanksi.addEventListener('change', () => {
        updateNominalDendaState();
        updatePreviewButtonVisibility();
    });
    if(formInputs.jenisSanksiPengawas) {
        formInputs.jenisSanksiPengawas.addEventListener('change', updatePreviewButtonVisibility);
    }

    function hitungNominalDenda() {
        if (!formInputs.statusKeterlambatan || !formInputs.nominalDenda) return;
        
        const status = formInputs.statusKeterlambatan.value;
        if (status === 'Keterlambatan') {
            const hari = parseInt(formInputs.jumlahHariKeterlambatan.value) || 0;
            const denda = hari > 0 ? hari * 50000 : 0;
            formInputs.nominalDenda.value = denda > 0 ? formatCurrency(denda) : '';
        } else if (status === 'Tidak Menyampaikan') {
            formInputs.nominalDenda.value = formatCurrency(1500000);
        }
        
        updatePreview();
    }

    if (formInputs.nominalDenda) {
        formInputs.nominalDenda.addEventListener('input', function(e) {
            const val = unformatCurrency(e.target.value);
            e.target.value = val > 0 ? formatCurrency(val) : '';
            updatePreview();
        });
    }

    function hitungKeterlambatan() {
        const tglLapor = new Date(formInputs.tanggalLapor.value);
        const tglBatas = new Date(formInputs.tanggalBatasPelaporan.value);
        
        if (!isNaN(tglLapor) && !isNaN(tglBatas)) {
            const diffTime = tglLapor - tglBatas;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (formInputs.jumlahHariKeterlambatan) {
                formInputs.jumlahHariKeterlambatan.value = diffDays;
            }
            if (formInputs.statusKeterlambatan) {
                if (diffDays >= 1 && diffDays <= 30) {
                    formInputs.statusKeterlambatan.value = 'Keterlambatan';
                } else if (diffDays > 30) {
                    formInputs.statusKeterlambatan.value = 'Tidak Menyampaikan';
                } else {
                    formInputs.statusKeterlambatan.value = '';
                }
            }
        } else {
            if (formInputs.jumlahHariKeterlambatan) {
                formInputs.jumlahHariKeterlambatan.value = '';
            }
            if (formInputs.statusKeterlambatan) {
                formInputs.statusKeterlambatan.value = '';
            }
        }
        hitungNominalDenda();
    }

    formInputs.tanggalLapor.addEventListener('change', hitungKeterlambatan);
    formInputs.tanggalBatasPelaporan.addEventListener('change', hitungKeterlambatan);
    formInputs.statusKeterlambatan.addEventListener('change', hitungNominalDenda);

    // Modal Riwayat Persetujuan
    const modalRiwayat = document.getElementById('modal-riwayat');
    const btnRiwayat = document.getElementById('btn-riwayat');
    const btnModalRiwayatClose = document.getElementById('btn-modal-riwayat-close');
    const riwayatTableBody = document.getElementById('riwayat-table-body');

    if (btnRiwayat && modalRiwayat) {
        btnRiwayat.addEventListener('click', async () => {
            const isPerusahaan = document.querySelector('input[name="tipe-subjek"][value="perusahaan"]').checked;
            let profilName = '';
            if (isPerusahaan) {
                const nama = formInputs.namaPerusahaan.value.trim();
                profilName = nama ? `${nama}(Perusahaan)` : '';
            } else {
                const nama = formInputs.namaIndividu.value.trim();
                profilName = nama ? `${nama}(Individu)` : '';
            }

            try {
                const response = await fetch('/riwayat.json');
                const data = await response.json();
                
                riwayatTableBody.innerHTML = '';
                const filteredData = data.filter(item => item['Nama Profil'] === profilName);
                
                if (filteredData.length === 0) {
                    riwayatTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Tidak ada riwayat persetujuan untuk profil ini.</td></tr>';
                } else {
                    filteredData.forEach(item => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${item['No'] || '-'}</td>
                            <td>${item['Tanggal'] || '-'}</td>
                            <td>${item['Status Konseptor'] || '-'}</td>
                            <td>${item['Catatan'] || '-'}</td>
                        `;
                        riwayatTableBody.appendChild(tr);
                    });
                }
                modalRiwayat.style.display = 'flex';
            } catch (err) {
                console.error("Gagal memuat riwayat", err);
                alert("Gagal memuat riwayat persetujuan.");
            }
        });

        btnModalRiwayatClose.addEventListener('click', () => {
            modalRiwayat.style.display = 'none';
        });

        modalRiwayat.addEventListener('click', (e) => {
            if (e.target === modalRiwayat) {
                modalRiwayat.style.display = 'none';
            }
        });
    }

    window.editKonfigurasi = function(index) {
        const item = konfigurasiData[index];
        if (!item) return;
        

        document.getElementById('konf-sumberAplikasi').value = item.sumberAplikasi || '';
        document.getElementById('konf-sektor').value = item.sektor || '';
        document.getElementById('konf-subSektor').value = item.subSektor || '';
        document.getElementById('konf-subSubSektor').value = item.subSubSektor || '';
        document.getElementById('konf-namaMenu').value = item.namaMenu || '';
        document.getElementById('konf-kodeLaporan').value = item.kodeLaporan || '';
        document.getElementById('konf-namaLaporan').value = item.namaLaporan || '';
        document.getElementById('konf-nomorPeraturan').value = item.nomorPeraturan || '';
        document.getElementById('konf-pasalPelanggaran').value = item.pasalPelanggaran || '';
        document.getElementById('konf-frekuensiPelaporan').value = item.frekuensiPelaporan || '';
        document.getElementById('konf-batasWaktu').value = item.batasWaktu || '';
        document.getElementById('konf-batasWaktuLibur').value = item.batasWaktuLibur || '';
        document.getElementById('konf-ketentuanKahar').value = item.ketentuanKahar || '';
        document.getElementById('konf-jenisSanksi').value = item.jenisSanksi || '';
        document.getElementById('konf-status').value = item.status || '';
        
        document.getElementById('page-dashboard').classList.remove('active');
        document.getElementById('page-dashboard').style.display = 'none';
        document.getElementById('page-editor-konfigurasi').style.display = 'block';
    };

    const btnBackKonfigurasi = document.getElementById('btn-back-konfigurasi');
    if (btnBackKonfigurasi) {
        btnBackKonfigurasi.addEventListener('click', () => {
            document.getElementById('page-editor-konfigurasi').style.display = 'none';
            document.getElementById('page-dashboard').style.display = 'block';
            document.getElementById('page-dashboard').classList.add('active');
        });
    }

    const btnSimpanKonfigurasi = document.getElementById('btn-simpan-konfigurasi');
    if (btnSimpanKonfigurasi) {
        btnSimpanKonfigurasi.addEventListener('click', () => {
            alert('Konfigurasi berhasil disimpan!');
            document.getElementById('page-editor-konfigurasi').style.display = 'none';
            document.getElementById('page-dashboard').style.display = 'block';
            document.getElementById('page-dashboard').classList.add('active');
        });
    }

    loadData();
    updatePreview(); 
});
