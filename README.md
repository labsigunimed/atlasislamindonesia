# Jelajah Kerajaan Islam Nusantara
### WebGIS Sejarah Kerajaan dan Kesultanan Indonesia — Panduan Praktikum Digital Humanities & SIG Sejarah

[![Status Validasi Data](https://img.shields.io/badge/Data%20Validation-100%25%20Passed-emerald.svg)](scripts/validate-data.ts)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](tsconfig.json)
[![React](https://img.shields.io/badge/React-19-cyan.svg)](package.json)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green.svg)](package.json)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](package.json)

---

## 1. Pendahuluan & Tujuan Pembelajaran

**Jelajah Kerajaan Islam Nusantara** adalah platform WebGIS interaktif dan digital humanities yang dirancang untuk memetakan persebaran kerajaan dan kesultanan Islam di Nusantara (khususnya wilayah kepulauan Indonesia) dari abad ke-13 hingga pertengahan abad ke-20 Masehi.

Platform ini memadukan estetika kartografi historis (*Modern Historical Digital Atlas*), data spasial akurat, kronologi pemerintahan sultan, katalog situs cagar budaya, serta rujukan akademis yang dapat ditelusuri dan diverifikasi.

### Capaian Pembelajaran Praktikum Mahasiswa:
1. **Pemahaman Spasial Sejarah**: Mampu menganalisis persebaran geopolitik kesultanan maritim dan agraris di 7 kawasan utama kepulauan Nusantara.
2. **Rekonstruksi Wilayah Kekuasaan**: Mampu membedakan pusat kedaulatan kuta/keraton (*point of sovereignty*) dengan proyeksi wilayah pengaruh/hegemoni (*territorial sphere of influence*) menggunakan layer GeoJSON beranotasi kepastian.
3. **Kurasi & Validasi Data Sejarah**: Mampu menyusun entitas basis data historis relasional (`kingdoms`, `rulers`, `heritageSites`, `territories`, `sources`) tanpa fabrikasi data (*no historical hallucination*).
4. **Implementasi WebGIS Modern**: Memahami pemanfaatan React, TypeScript, Leaflet, GeoJSON, dan Tailwind CSS dalam visualisasi geospasial tematik.

---

## 2. Fitur Utama Aplikasi

- **Peta Interaktif Nusantara**:
  - Penanda pusat kedaulatan kesultanan dengan ikon mahkota kencana.
  - Penanda situs cagar budaya (masjid kuno, makam sultan, keraton, benteng) dengan ikon zamrud.
  - Layer poligon rekonstruksi batas wilayah kekuasaan dengan metode rekonstruksi dan tingkat kepastian.
  - **Orientasi Mata Angin (Nautical Compass Rose)**: Indikator mata angin kartografis bergaya klasik dengan arah mata angin Nusantara (U = Utara, T = Timur, S = Selatan, B = Barat), animasi putaran derajat, dan fitur sekali klik untuk mereset orientasi kamera ke Utara Sejati serta tampilan kepulauan Indonesia.
  - Skala grafis metrik dan pilihan 3 jenis peta dasar (*basemap*): **Arsip Kertas Kuno (Parchment Sepia)**, **OpenStreetMap Standar**, dan **Citra Satelit Bumi**.
- **Panel Drawer & Deep-Dive Modal**:
  - Ringkasan cepat saat marker diklik (drawer samping).
  - Modal investigasi komprehensif berisi 6 tab: Ikhtisar Sejarah, Silsilah Sultan, Wilayah Kekuasaan, Situs Peninggalan, Garis Waktu Peristiwa, dan Bibliografi Sumber.
- **Pencarian & Filter Cerdas**:
  - Pencarian teks lengkap berdasarkan nama kerajaan, nama alternatif, ibu kota, pulau, atau nama sultan.
  - Filter menurut 7 region Nusantara (Sumatra, Jawa, Kalimantan, Sulawesi, Maluku, Bali & Nusa Tenggara, Papua).
  - Penggeser rentang tahun dinamis (1200 M – 1950 M).
  - Filter tipe cagar budaya dan tingkat kepastian kronologi.
- **Linimasa Kronologis Interaktif**:
  - Visualisasi rentang hidup kesultanan dari masa Samudera Pasai (1267 M) hingga integrasi Kesultanan Siak ke NKRI (1945 M).
- **Katalog Situs Peninggalan Sejarah**:
  - Tampilan grid dan list untuk mengeksplorasi cagar budaya lengkap dengan status pelestarian (SK Cagar Budaya Nasional/Provinsi), koordinat, dan dokumentasi foto.
- **Skrip Validasi Integritas Data Spasial**:
  - Memastikan seluruh relasi ID antar-berkas JSON valid, tidak ada koordinat terbalik (*inverted lat/long*), serta poligon GeoJSON tertutup sempurna (*closed linear rings*).

---

## 3. Identitas Visual & Estetika Kartografi

Aplikasi mengadopsi palet warna klasik dokumen arsip digital Nusantara:
- **Biru Arang (`#172B36`)**: Navigasi, teks utama, dan latar panel kedaulatan.
- **Emas Antik (`#B58B4D` / `#8E6D38`)**: Garis waktu, ornamen kompas, sorotan kedaulatan, dan batas wilayah historis.
- **Kertas Arsip (`#F4F0E6`)**: Latar belakang kartu sejarah, kompas, dan kontras teks.
- **Hijau Zamrud (`#426B60`)**: Penanda situs cagar budaya, masjid bersejarah, dan elemen ekologis.

---

## 4. Struktur Direktori Proyek

```
Atlas-Islam-Nusantara/
├── index.html                   # Entry HTML aplikasi
├── package.json                 # Konfigurasi dependensi dan skrip
├── tsconfig.json                # Konfigurasi TypeScript bundler & module resolution
├── vite.config.ts               # Konfigurasi Vite & Tailwind CSS
├── scripts/
│   └── validate-data.ts         # Skrip audit & validasi integritas dataset
├── src/
│   ├── main.tsx                 # Entry point React 19
│   ├── App.tsx                  # Controller utama & state aplikasi
│   ├── index.css                # Style global, filter sepia arsip, tipografi
│   ├── types/
│   │   └── atlas.ts             # Definisi tipe TypeScript (Kingdom, Ruler, Site, Source, dsb.)
│   ├── data/
│   │   ├── kingdoms.json        # Dataset utama 19 Kerajaan Islam
│   │   ├── rulers.json          # Dataset 33 Sultan & Penguasa
│   │   ├── heritageSites.json   # Dataset 25 Situs Cagar Budaya & Arkeologi
│   │   ├── territories.geojson  # FeatureCollection poligon batas wilayah historis
│   │   ├── sources.json         # Dataset 12 Sumber Ilmiah & Babad Terverifikasi
│   │   ├── kingdomsData.ts      # Re-export bertipe untuk kingdoms.json
│   │   ├── rulersData.ts        # Re-export bertipe untuk rulers.json
│   │   ├── sitesData.ts         # Re-export bertipe untuk heritageSites.json
│   │   ├── territoriesData.ts   # Re-export bertipe untuk territories.geojson
│   │   └── sourcesData.ts       # Re-export bertipe untuk sources.json
│   ├── utils/
│   │   ├── historyLogic.ts      # Logika filter waktu, wilayah, pencarian, & format tarikh
│   │   └── historyLogic.test.ts # Pengujian unit untuk logika kronologis & filter
│   └── components/
│       ├── Header.tsx           # Navigasi atas, judul, & tab mode tampilan
│       ├── MapGIS.tsx           # Peta Leaflet, marker custom, poligon, & layer basemap
│       ├── CompassRose.tsx      # Orientasi Mata Angin (Nautical Compass Rose SVG)
│       ├── FilterBar.tsx        # Filter wilayah, penggeser linimasa tahun, & input pencarian
│       ├── KingdomDrawer.tsx    # Drawer ringkasan cepat kerajaan
│       ├── KingdomDeepDiveModal.tsx # Modal mendalam 6-tab detail kerajaan
│       ├── SiteModal.tsx        # Modal peninjauan cagar budaya
│       ├── TimelineView.tsx     # Tampilan pita waktu 1200–1950 M
│       ├── SitesCatalogView.tsx # Katalog komprehensif situs sejarah
│       └── VerificationBadge.tsx# Lencana status verifikasi ilmiah
└── README.md                    # Panduan praktikum mahasiswa ini
```

---

## 5. Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js versi 18 ke atas (atau menggunakan runtime `agy-node` / Node v24).
- Package manager: `npm` atau `pnpm`.

### Langkah-langkah:

1. **Unduh atau Buka Workspace Proyek**:
   ```bash
   cd Atlas-Islam-Nusantara
   ```

2. **Instalasi Dependensi** (jika belum terpasang):
   ```bash
   npm install
   ```

3. **Menjalankan Server Pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   *Buka peramban pada alamat `http://localhost:3000` (atau port yang ditampilkan di terminal).*

4. **Menjalankan Pengujian Logika Kronologis**:
   ```bash
   npm test
   # Atau langsung dengan Node runner bawaan:
   node --test --experimental-strip-types src/utils/historyLogic.test.ts
   ```

5. **Menjalankan Audit & Validasi Dataset Spasial**:
   ```bash
   npm run validate-data
   # Atau langsung dengan Node runner bawaan:
   node --experimental-strip-types scripts/validate-data.ts
   ```

---

## 6. Rubrik Status Verifikasi Sejarah

Dalam digital humanities dan kartografi sejarah, klaim kronologi dan batas wilayah tidak boleh dibuat secara sembarangan. Setiap entitas dalam dataset dilengkapi dengan atribut `verification_status` atau `certainty`:

| Status | Makna Akademik | Contoh Kasus |
| :--- | :--- | :--- |
| **`verified`** | Terverifikasi kuat oleh inskripsi primer (prasasti, naskah sezaman, makam berangka tahun) dan konsensus sejarawan. | Sultan Malikussaleh wafat 1297 M (nisan Samudera Pasai); Piagam pendirian Masjid Demak. |
| **`partially_verified`** | Didukung oleh historiografi lokal/tradisi lisan dan kronik sekunder, dengan estimasi tahun yang logis. | Kronologi berdirinya Kesultanan Buton atau Ternate abad ke-13/14 M. |
| **`disputed`** | Terdapat perdebatan aktif antar-sejarawan mengenai tahun awal berdirinya atau legitimasi garis suksesi. | Tarikh pasti beralihnya Kesultanan Cirebon ke Islam (versi Carita Purwaka Caruban Nagari vs laporan Portugis Tomé Pires). |
| **`unverified`** | Informasi hipotesis dari literatur populer yang belum diteliti secara kritis oleh arkeolog/filolog. | Klaim wilayah taklukan maritim yang hanya tercatat sepintas tanpa bukti benteng/pos dagang. |
| **`unavailable`** | Catatan arsip telah hilang atau musnah akibat kebakaran keraton atau perang kolonial. | Tahun tepat wafatnya beberapa sultan generasi awal. |

---

## 7. Panduan Praktikum Mahasiswa: Menambah Dataset Baru

Mahasiswa ditugaskan memperkaya dataset dengan menambahkan kerajaan, sultan, cagar budaya, atau poligon wilayah baru. Ikuti format baku di bawah ini agar lolos uji validasi skrip.

### A. Menambahkan Kerajaan Baru (`src/data/kingdoms.json`)

Buka `src/data/kingdoms.json`, tambahkan objek baru pada array:
```json
{
  "id": "kd-bima",
  "name": "Kesultanan Bima",
  "alternative_names": ["Bima", "Mbojo"],
  "alternate_names": ["Bima", "Mbojo"],
  "region": "Bali dan Nusa Tenggara",
  "island": "Sumbawa",
  "province": "Nusa Tenggara Barat",
  "capital": "Bima (Rasanae)",
  "location_description": "Teluk Bima, Pulau Sumbawa bagian timur",
  "latitude": -8.4552,
  "longitude": 118.7275,
  "location_precision": "exact",
  "founded_start_year": 1620,
  "founded_end_year": 1621,
  "founded": 1620,
  "founded_note": "Resmi menjadi kesultanan Islam setelah Raja La Ka'i memeluk Islam dan bergelar Sultan Abdul Kahir.",
  "founded_certainty": "verified",
  "golden_age": "Abad ke-17 M di bawah pengaruh hubungan persahabatan maritim dengan Gowa-Tallo.",
  "golden_age_start_year": 1640,
  "golden_age_end_year": 1682,
  "ended": 1958,
  "ended_note": "Melebur ke dalam Negara Kesatuan Republik Indonesia sebagai Swapraja Bima.",
  "history_summary": "Kesultanan Islam terkemuka di Pulau Sumbawa yang mengontrol jalur maritim Flores-Sumbawa...",
  "peak_influence": "Menguasai pesisir timur Sumbawa, Pulau Sangeang, hingga pengaruh ke Manggarai (Flores barat).",
  "sovereignty_notes": "Berdaulat penuh sebelum diikat perjanjian monopoli dagang dengan VOC pasca-Perjanjian Bongaya.",
  "islamic_tradition": "Madzhab Syafi'i dengan tradisi adat marapu pra-Islam yang diislamkan secara damai.",
  "verification_status": "verified",
  "source_ids": ["src-ricklefs", "src-vlekke"]
}
```

> **Aturan Penting**:
> - `id` harus diawali dengan `kd-` dan menggunakan huruf kecil serta tanda hubung (`-`).
> - Koordinat WGS84: `latitude` (antara -11.5 dan 6.5) dan `longitude` (antara 94.5 dan 141.5 untuk Indonesia).
> - Seluruh nilai dalam `source_ids` harus terdaftar di `sources.json`.

---

### B. Menambahkan Penguasa / Sultan Baru (`src/data/rulers.json`)

Buka `src/data/rulers.json`:
```json
{
  "id": "ruler-bima-abdul-kahir",
  "kingdom_id": "kd-bima",
  "name": "Sultan Abdul Kahir (Rumata Ma Bata Wadu)",
  "title": "Sultan Bima I",
  "titles": "Rumata Ma Bata Wadu",
  "reign_start_year": 1620,
  "reign_end_year": 1640,
  "reign_start": 1620,
  "reign_end": 1640,
  "reign_note": "1620 — 1640 M",
  "biography": "Raja Bima ke-27 sekaligus Sultan Bima pertama yang memeluk agama Islam di bawah bimbingan para mubaligh asal Gowa.",
  "succession_notes": "Digantikan oleh putranya, Sultan Abil Khair Sirajuddin.",
  "verification_status": "verified",
  "source_ids": ["src-ricklefs"]
}
```

> **Aturan Penting**:
> - `kingdom_id` harus cocok persis dengan `id` kerajaan yang ada di `kingdoms.json`.

---

### C. Menambahkan Situs Peninggalan Sejarah (`src/data/heritageSites.json`)

Buka `src/data/heritageSites.json`:
```json
{
  "id": "site-asi-mbojo",
  "name": "Istana Asi Mbojo (Museum Kesultanan Bima)",
  "alternative_names": ["Istana Bima"],
  "kingdom_ids": ["kd-bima"],
  "site_type": "Keraton & Istana",
  "latitude": -8.4578,
  "longitude": 118.7288,
  "location_description": "Pusat Kota Bima, Rasanae",
  "province": "Nusa Tenggara Barat",
  "regency": "Kota Bima",
  "description": "Istana Kesultanan Bima berarsitektur perpaduan gaya Bima, Bugis, dan kolonial.",
  "historical_description": "Pusat administrasi Kesultanan Bima serta kediaman resmi para sultan Bima sejak era modernisasi arsitektur istana.",
  "period": "Abad ke-19 M",
  "estimated_period_start": 1888,
  "estimated_period_end": 1927,
  "preservation_status": "Cagar Budaya Nasional",
  "image": "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&q=80&w=800",
  "verification_status": "verified",
  "source_ids": ["src-kemdikbud-cagar"]
}
```

> **Pilihan `site_type` yang valid**:
> - `Masjid Bersejarah`
> - `Keraton & Istana`
> - `Makam Sultan`
> - `Benteng Pertahanan`
> - `Prasasti & Batu Bersurat`
> - `Museum`

---

### D. Menambahkan Batas Wilayah GeoJSON (`src/data/territories.geojson`)

Buka `src/data/territories.geojson`, tambahkan Feature poligon ke dalam `features`:
```geojson
{
  "type": "Feature",
  "properties": {
    "id": "poly-bima-inti",
    "kingdom_id": "kd-bima",
    "name": "Wilayah Inti Kesultanan Bima",
    "period_start": 1620,
    "period_end": 1800,
    "certainty": "Sedang (Rekonstruksi Kartografi)",
    "reconstruction_method": "Berdasarkan naskah Bo' Sangaji Kai dan sebaran distrik kejeniusan Bima timur.",
    "evidence_summary": "Mencakup lembah Bima, pelabuhan Sape, dan pulau satelit.",
    "verification_status": "partially_verified",
    "source_ids": ["src-ricklefs"]
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [118.60, -8.35],
        [118.90, -8.35],
        [119.10, -8.65],
        [118.80, -8.80],
        [118.55, -8.65],
        [118.60, -8.35]
      ]
    ]
  }
}
```

> **Aturan Format GeoJSON**:
> - Urutan koordinat GeoJSON standar (RFC 7946) adalah `[longitude, latitude]`, BUKAN `[lat, lng]`.
> - Poligon harus memiliki *closed ring*: koordinat titik awal harus sama persis dengan koordinat titik akhir.

---

### E. Melakukan Audit Validasi Data

Setelah mahasiswa menambahkan data baru, jalankan skrip audit untuk memverifikasi keabsahan data:
```bash
npm run validate-data
```
Jika ada kesalahan (misalnya ID duplikat, `kingdom_id` tidak ditemukan, koordinat terbalik, atau referensi sumber tidak ada), skrip akan memberikan pesan kesalahan spesifik beserta nama berkas dan barisnya.

---

## 8. Catatan Kartografi dan Geospasial

1. **Orientasi Mata Angin (Nautical Compass Rose)**:
   - Menampilkan penunjuk arah kardinal Nusantara:
     - **U** = Utara (0° / 360°)
     - **T** = Timur (90°)
     - **S** = Selatan (180°)
     - **B** = Barat (270°)
   - Berfungsi sebagai instrumen navigasi kartografi historis serta tombol re-orientasi kamera.
2. **Sistem Proyeksi & Koordinat**:
   - Sistem Referensi Geodesi: **WGS84 (EPSG:4326)**.
   - Peta interaktif Leaflet diproyeksikan menggunakan **Web Mercator (EPSG:3857)**.
3. **Peringatan Ilmiah Terkait Poligon Batas Wilayah**:
   - Batas wilayah kerajaan pra-modern di Asia Tenggara menganut konsep *mandala* atau hegemoni jaringan perairan (*maritime web*), bukan batas garis keras garis batas negara bangsa modern (*Westphalian border*). Poligon dalam WebGIS ini merepresentasikan **rekonstruksi wilayah pengaruh terkuat** berdasarkan keberadaan pos pelabuhan, benteng, dan piagam pengakuan upeti, bukan batas kawat berduri modern.

---

## 9. Lisensi & Etika Sitasi

Proyek ini dikembangkan untuk tujuan edukasi akademik dan penelitian sejarah digital. 
Seluruh kutipan naskah, gambar peninggalan, dan rujukan jurnal tunduk pada ketentuan penggunaan wajar (*fair use*) untuk penelitian dan pembelajaran.

Jika menggunakan platform ini untuk karya tulis ilmiah atau tesis, silakan sitasi sebagai:
> *Tim Pengembang Digital Humanities. (2026). Jelajah Kerajaan Islam Nusantara: WebGIS Sejarah Kerajaan dan Kesultanan Indonesia. Repositori Digital Atlas Islam Nusantara.*
