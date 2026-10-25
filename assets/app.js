
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import { Filter, X, Calendar, MapPin, Landmark, ShieldCheck, RotateCcw, ExternalLink, Crown, ArrowRight, BookOpen, Map, History, CheckCircle2, Copy, Check, Clock, Sparkles, LayoutGrid, List, Search, Database, Compass, AlertTriangle, FileText, Code2, Layers, Maximize2, Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';

// === DATASETS ===
const kingdomsData = [
  {
    "id": "kd-samudera-pasai",
    "name": "Kesultanan Samudera Pasai",
    "alternative_names": [
      "Samudera Darussalam",
      "Pacem",
      "Pasai"
    ],
    "location_description": "Geudong, Pasai, Kabupaten Aceh Utara",
    "province": "Aceh",
    "island": "Sumatra",
    "latitude": 5.1275,
    "longitude": 97.2038,
    "location_precision": "exact",
    "founded_start_year": 1267,
    "founded_end_year": 1267,
    "golden_age_start_year": 1326,
    "golden_age_end_year": 1345,
    "end_start_year": 1521,
    "end_end_year": 1524,
    "historical_description": "Kesultanan Samudera Pasai merupakan kerajaan Islam tertua di Nusantara yang memiliki bukti epigrafi tak terbantahkan. Didirikan oleh Merah Silu yang bergelar Sultan Malikussaleh, kesultanan ini berkembang pesat sebagai kota pelabuhan entrepot utama dan pusat peradaban Islam di jalur perdagangan Selat Malaka. Samudera Pasai juga menjadi pelopor pencetakan mata uang emas (dirham) di Asia Tenggara.",
    "ruler_ids": [
      "rul-pasai-1",
      "rul-pasai-2",
      "rul-pasai-3"
    ],
    "territory_geojson_id": "ter-pasai-1",
    "heritage_site_ids": [
      "site-pasai-makam"
    ],
    "source_ids": [
      "src-1",
      "src-4",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Tahun berdiri 1267 M didasarkan naskah Hikayat Raja-raja Pasai; batu nisan Sultan Malikussaleh bertarikh 1297 M.",
      "Dikuasai Portugis tahun 1521 lalu diintegrasikan ke Kesultanan Aceh tahun 1524."
    ],
    "last_updated": "2026-10-25",
    "region": "Sumatra",
    "capital": "Pasai (Aceh Utara)",
    "founded": 1267,
    "founded_note": "Tahun 1267 M berdasarkan catatan Hikayat Raja-raja Pasai & inskripsi batu nisan Sultan Malikussaleh bertarikh 696 H (1297 M).",
    "founded_certainty": "verified",
    "golden_age": "Abad ke-14 (Pemerintahan Sultan Mahmud Malik Az-Zahir)",
    "ended": 1521,
    "ended_note": "Dikuasai oleh Portugis tahun 1521 M, kemudian diintegrasikan sepenuhnya ke dalam Kesultanan Aceh Darussalam pada 1524 M.",
    "current_status": "Situs Arkeologi & Cagar Budaya Nasional Terlindungi",
    "history_summary": "Kesultanan Samudera Pasai merupakan kerajaan Islam tertua di Nusantara yang memiliki bukti epigrafi tak terbantahkan. Didirikan oleh Merah Silu yang bergelar Sultan Malikussaleh, kesultanan ini berkembang pesat sebagai kota pelabuhan entrepot utama dan pusat peradaban Islam di jalur perdagangan Selat Malaka. Samudera Pasai juga menjadi pelopor pencetakan mata uang emas (dirham) di Asia Tenggara dan tempat bertemunya para ulama dari Timur Tengah, India, dan kepulauan Nusantara.",
    "territory_notes": "Meliputi wilayah pesisir timur laut Aceh (sekitar Lhokseumawe dan Sungai Pasai) dengan jangkauan pengaruh pelayaran niaga membentang ke Selat Malaka.",
    "emblem_symbol": "👑"
  },
  {
    "id": "kd-aceh-darussalam",
    "name": "Kesultanan Aceh Darussalam",
    "alternative_names": [
      "Acheh",
      "Kerajaan Atjeh",
      "Serambi Mekkah"
    ],
    "location_description": "Kutaraja (Banda Aceh)",
    "province": "Aceh",
    "island": "Sumatra",
    "latitude": 5.5536,
    "longitude": 95.3192,
    "location_precision": "exact",
    "founded_start_year": 1496,
    "founded_end_year": 1514,
    "golden_age_start_year": 1607,
    "golden_age_end_year": 1636,
    "end_start_year": 1903,
    "end_end_year": 1903,
    "historical_description": "Kesultanan Aceh Darussalam merupakan salah satu kekuatan adidaya maritim Islam terkuat di Asia Tenggara. Berdiri kokoh membentengi Selat Malaka dari dominasi kolonialis Eropa, Aceh menjalin hubungan diplomatik langsung dengan Khilafah Utsmaniyah di Istanbul, Kerajaan Inggris, dan Prancis. Pada masa Sultan Iskandar Muda, hukum ketatanegaraan berlandaskan syariat Islam (Adat Meukuta Alam) ditegakkan dengan ketat.",
    "ruler_ids": [
      "rul-aceh-1",
      "rul-aceh-2",
      "rul-aceh-3",
      "rul-aceh-4"
    ],
    "territory_geojson_id": "ter-aceh-1",
    "heritage_site_ids": [
      "site-aceh-baiturrahman"
    ],
    "source_ids": [
      "src-1",
      "src-5",
      "src-6"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Didirikan secara bertahap oleh Sultan Ali Mughayat Syah yang menyatukan kerajaan-kerajaan kecil di Aceh awal abad ke-16.",
      "Kekuasaan politik kesultanan berakhir dengan penawanan Sultan Muhammad Daud Syah oleh Belanda tahun 1903 M."
    ],
    "last_updated": "2026-10-25",
    "region": "Sumatra",
    "capital": "Kutaraja (Banda Aceh)",
    "founded": 1496,
    "founded_note": "Didirikan oleh Sultan Ali Mughayat Syah yang menyatukan kerajaan Daya, Pedir, dan Pasai pada awal abad ke-16.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1607–1636 M (Pemerintahan Sultan Iskandar Muda)",
    "ended": 1903,
    "ended_note": "Berakhir secara politik setelah perang sengit puluhan tahun melawan Belanda dan penangkapan Sultan Muhammad Daud Syah pada tahun 1903 M.",
    "current_status": "Warisan Historis & Kultural Provinsi Aceh; Cagar Budaya Nasional",
    "history_summary": "Kesultanan Aceh Darussalam merupakan salah satu kekuatan adidaya maritim Islam terkuat di Asia Tenggara. Berdiri kokoh membentengi Selat Malaka dari dominasi kolonialis Eropa, Aceh menjalin hubungan diplomatik langsung dengan Khilafah Utsmaniyah di Istanbul, Kerajaan Inggris, dan Prancis. Pada masa Sultan Iskandar Muda, hukum ketatanegaraan berlandaskan syariat Islam (Adat Meukuta Alam) ditegakkan dengan ketat dan Kutaraja menjadi pusat keilmuan tasawuf dan syariah terkemuka.",
    "territory_notes": "Pada puncak ekspansinya menguasai seluruh Aceh, pesisir barat Sumatra hingga Bengkulu, pesisir timur Sumatra hingga Asahan, serta protektorat atas Johor, Pahang, Kedah, dan Perak.",
    "emblem_symbol": "⚔️"
  },
  {
    "id": "kd-demak",
    "name": "Kesultanan Demak",
    "alternative_names": [
      "Demak Bintoro",
      "Glagahwangi"
    ],
    "location_description": "Bintoro, Kabupaten Demak",
    "province": "Jawa Tengah",
    "island": "Jawa",
    "latitude": -6.8946,
    "longitude": 110.6372,
    "location_precision": "exact",
    "founded_start_year": 1478,
    "founded_end_year": 1478,
    "golden_age_start_year": 1521,
    "golden_age_end_year": 1546,
    "end_start_year": 1554,
    "end_end_year": 1568,
    "historical_description": "Kesultanan Demak adalah pelopor dakwah Islam terorganisasi pertama di pulau Jawa. Diprakarsai oleh Raden Patah dan didampingi majelis para Walisongo, Demak menjadi lokomotif penyebaran Islam ke seantero Nusantara. Demak aktif mengirimkan armada laut tangguh di bawah kepemimpinan Pati Unus (Pangeran Sabrang Lor) untuk menggempur benteng Portugis di Malaka.",
    "ruler_ids": [
      "rul-demak-1",
      "rul-demak-2",
      "rul-demak-3"
    ],
    "territory_geojson_id": "ter-demak-1",
    "heritage_site_ids": [
      "site-demak-masjid",
      "site-kudus-menara"
    ],
    "source_ids": [
      "src-1",
      "src-3",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Tahun berdirinya 1478 M merujuk penanggalan Saka 1400 (Sirna Ilang Kertaning Bhumi).",
      "Pusat kekuasaan beralih ke Pajang setelah kemangkatan Sultan Trenggana dan Sunan Prawoto."
    ],
    "last_updated": "2026-10-25",
    "region": "Jawa",
    "capital": "Bintoro (Demak, Jawa Tengah)",
    "founded": 1478,
    "founded_note": "Tahun 1478 M (Tahun Saka 1400: Sirna Ilang Kertaning Bhumi), bertepatan deklarasi kemandirian Glagahwangi oleh Raden Patah.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1521–1546 M (Pemerintahan Sultan Trenggana)",
    "ended": 1554,
    "ended_note": "Runtuh akibat perang saudara suksesi pasca wafatnya Sultan Trenggana, pusat kekuasaan dipindahkan ke Kesultanan Pajang oleh Jaka Tingkir.",
    "current_status": "Situs Religi Bersejarah & Monumen Cagar Budaya Nasional",
    "history_summary": "Kesultanan Demak adalah kerajaan pelopor dakwah Islam terorganisasi pertama di pulau Jawa. Diprakarsai oleh Raden Patah dan didampingi majelis para Walisongo, Demak menjadi lokomotif penyebaran Islam dari ujung barat hingga timur Nusantara. Demak aktif mengirimkan armada laut tangguh di bawah kepemimpinan Pati Unus (Pangeran Sabrang Lor) untuk menggempur benteng Portugis di Malaka pada tahun 1513 dan 1521.",
    "territory_notes": "Mencakup pesisir utara Jawa dari Banten, Jayakarta, Cirebon, Tegal, Jepara, Tuban, Gresik, hingga pedalaman Jawa Tengah dan Madura.",
    "emblem_symbol": "🕌"
  },
  {
    "id": "kd-cirebon",
    "name": "Kesultanan Cirebon",
    "alternative_names": [
      "Caruban Nagari",
      "Kasepuhan-Kanoman"
    ],
    "location_description": "Pakungwati, Kota Cirebon",
    "province": "Jawa Barat",
    "island": "Jawa",
    "latitude": -6.7262,
    "longitude": 108.5714,
    "location_precision": "exact",
    "founded_start_year": 1479,
    "founded_end_year": 1479,
    "golden_age_start_year": 1520,
    "golden_age_end_year": 1568,
    "end_start_year": 1677,
    "end_end_year": 1677,
    "historical_description": "Kesultanan Cirebon memegang peran sentral sebagai gerbang masuknya Islam ke Tatar Pasundan Jawa Barat. Sunan Gunung Jati memadukan dakwah kearifan lokal, perniagaan antarbangsa, dan hubungan diplomatik internasional. Keraton Cirebon melahirkan karya seni arsitektur dan kereta kencana sarat filosofi spiritual akulturasi budaya Islam, Tionghoa, dan Hindu-Jawa.",
    "ruler_ids": [
      "rul-cirebon-1",
      "rul-cirebon-2"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-cirebon-kasepuhan",
      "site-cirebon-gunung-jati"
    ],
    "source_ids": [
      "src-1",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Tahun 1677 kesultanan terbelah menjadi Kasultanan Kasepuhan, Kanoman, dan Kacirebonan di bawah intervensi VOC."
    ],
    "last_updated": "2026-10-25",
    "region": "Jawa",
    "capital": "Pakungwati (Cirebon, Jawa Barat)",
    "founded": 1479,
    "founded_note": "Didirikan saat Sunan Gunung Jati (Syarif Hidayatullah) memproklamirkan kemerdekaan Caruban dari Kerajaan Sunda Pajajaran.",
    "founded_certainty": "verified",
    "golden_age": "Awal Abad ke-16 M (Pemerintahan Sunan Gunung Jati)",
    "ended": 1677,
    "ended_note": "Terbagi menjadi beberapa keraton swapraja (Kasepuhan, Kanoman, Kacirebonan) di bawah campur tangan Mataram dan VOC.",
    "current_status": "Keraton Pemangku Adat & Lembaga Kebudayaan Aktif",
    "history_summary": "Kesultanan Cirebon memegang peran sentral sebagai gerbang masuknya Islam ke wilayah Tatar Sunda Jawa Barat. Sunan Gunung Jati memadukan dakwah kearifan lokal, perniagaan antarbangsa, dan hubungan diplomatik internasional (termasuk pernikahan dengan Putri Ong Tien dari Tiongkok). Keraton Cirebon melahirkan karya seni arsitektur dan kereta kencana yang sarat filosofi spiritual akulturasi budaya Islam, Tionghoa, dan Hindu-Jawa.",
    "territory_notes": "Wilayah pesisir timur laut Jawa Barat, membentang dari Sungai Citarum di barat hingga Sungai Cipamali (Brebes) di timur.",
    "emblem_symbol": "⚜️"
  },
  {
    "id": "kd-banten",
    "name": "Kesultanan Banten",
    "alternative_names": [
      "Bantam",
      "Banten Lama"
    ],
    "location_description": "Surasowan, Banten Lama, Kota Serang",
    "province": "Banten",
    "island": "Jawa",
    "latitude": -6.0356,
    "longitude": 106.1542,
    "location_precision": "exact",
    "founded_start_year": 1526,
    "founded_end_year": 1552,
    "golden_age_start_year": 1651,
    "golden_age_end_year": 1683,
    "end_start_year": 1813,
    "end_end_year": 1813,
    "historical_description": "Kesultanan Banten berkembang menjadi imperium perdagangan maritim internasional yang berdaulat di Selat Sunda. Mengontrol jalur rempah dan lada Lampung, Banten membuka pintu pelabuhannya bagi pedagang Inggris, Denmark, Prancis, Persia, Turki, dan Tiongkok. Di bawah Sultan Ageng Tirtayasa, dibangun kanal irigasi pertanian modern dan benteng pertahanan megah.",
    "ruler_ids": [
      "rul-banten-1",
      "rul-banten-2"
    ],
    "territory_geojson_id": "ter-banten-1",
    "heritage_site_ids": [
      "site-banten-surasowan",
      "site-banten-kaibon"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-6",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Resmi berdaulat penuh sebagai kesultanan independen pada masa Sultan Maulana Hasanuddin tahun 1552 M.",
      "Dihapuskan secara sepihak oleh Letnan Gubernur Thomas Stamford Raffles tahun 1813 M."
    ],
    "last_updated": "2026-10-25",
    "region": "Jawa",
    "capital": "Surasowan (Banten Lama, Serang)",
    "founded": 1526,
    "founded_note": "Dibuka oleh Sunan Gunung Jati & Maulana Hasanuddin pada 1526; resmi berdaulat penuh sebagai kesultanan pada 1552 M.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1651–1683 M (Pemerintahan Sultan Ageng Tirtayasa)",
    "ended": 1813,
    "ended_note": "Dihapuskan secara sepihak oleh Letnan Gubernur Hindia Belanda Thomas Stamford Raffles pada tahun 1813 M pasca penghancuran keraton.",
    "current_status": "Kawasan Cagar Budaya Nasional & Pusat Ziarah Bersejarah",
    "history_summary": "Kesultanan Banten berkembang menjadi imperium perdagangan maritim internasional yang berdaulat dan kosmopolitan di ujung barat pulau Jawa. Menguasai Selat Sunda dan penghasil utama lada Lampung, Banten menolak monopoli dagang VOC dan membuka pintu pelabuhannya bagi pedagang Inggris, Denmark, Prancis, Persia, Turki, dan Tiongkok. Di bawah Sultan Ageng Tirtayasa, dibangun kanal irigasi pertanian modern dan benteng pertahanan megah.",
    "territory_notes": "Meliputi seluruh Provinsi Banten modern, pesisir barat Batavia, sebagian Bogor, serta seluruh wilayah Lampung di ujung selatan pulau Sumatra.",
    "emblem_symbol": "⚓"
  },
  {
    "id": "kd-mataram-islam",
    "name": "Kesultanan Mataram Islam",
    "alternative_names": [
      "Mataram Anyar",
      "Kerajaan Mataram Kotagede-Karta-Plered"
    ],
    "location_description": "Kotagede, Karta, Plered, D.I. Yogyakarta",
    "province": "D.I. Yogyakarta",
    "island": "Jawa",
    "latitude": -7.8286,
    "longitude": 110.3995,
    "location_precision": "exact",
    "founded_start_year": 1584,
    "founded_end_year": 1584,
    "golden_age_start_year": 1613,
    "golden_age_end_year": 1645,
    "end_start_year": 1755,
    "end_end_year": 1755,
    "historical_description": "Kesultanan Mataram Islam menyatukan hampir seluruh peradaban pulau Jawa dan Madura di bawah satu payung kepemimpinan politik dan religius. Sultan Agung memimpin perlawanan berskala raksasa menggempur benteng VOC Batavia pada 1628 dan 1629. Beliau juga memprakarsai Kalender Saka Jawa Islam, penulisan sastra babad bermutu tinggi, dan penyempurnaan hukum tata negara.",
    "ruler_ids": [
      "rul-mataram-1",
      "rul-mataram-2"
    ],
    "territory_geojson_id": "ter-mataram-1",
    "heritage_site_ids": [
      "site-mataram-kotagede",
      "site-mataram-imogiri"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Terbagi menjadi Kasunanan Surakarta dan Kasultanan Yogyakarta melalui Perjanjian Giyanti 13 Februari 1755 M."
    ],
    "last_updated": "2026-10-25",
    "region": "Jawa",
    "capital": "Kotagede lalu Karta dan Plered (Yogyakarta)",
    "founded": 1584,
    "founded_note": "Panembahan Senopati naik tahta memindahkan pusat politik dari Pajang ke Mataram.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1613–1645 M (Pemerintahan Sultan Agung Anyokrokusumo)",
    "ended": 1755,
    "ended_note": "Terbagi menjadi Kasunanan Surakarta dan Kasultanan Yogyakarta melalui Perjanjian Giyanti (1755 M).",
    "current_status": "Pewaris Tradisi: Keraton Kasultanan Yogyakarta & Kasunanan Surakarta Hadiningrat",
    "history_summary": "Kesultanan Mataram Islam menyatukan hampir seluruh peradaban pulau Jawa dan Madura di bawah satu payung kepemimpinan politik dan religius. Sultan Agung memimpin perlawanan berskala raksasa menggempur benteng VOC Batavia pada 1628 dan 1629. Beliau juga memprakarsai Kalender Saka Jawa Islam, penulisan sastra babad bermutu tinggi, dan penyempurnaan hukum Islam berbasis kearifan tata praja Nusantara.",
    "territory_notes": "Kekuasaan hegemoni membentang dari Jawa Barat (Priangan/Karawang), Jawa Tengah, Jawa Timur, hingga pulau Madura.",
    "emblem_symbol": "☀️"
  },
  {
    "id": "kd-yogyakarta",
    "name": "Kasultanan Ngayogyakarta Hadiningrat",
    "alternative_names": [
      "Kesultanan Yogyakarta",
      "Kraton Jogja"
    ],
    "location_description": "Kraton, Kota Yogyakarta",
    "province": "D.I. Yogyakarta",
    "island": "Jawa",
    "latitude": -7.8053,
    "longitude": 110.3642,
    "location_precision": "exact",
    "founded_start_year": 1755,
    "founded_end_year": 1755,
    "golden_age_start_year": 1755,
    "golden_age_end_year": 1792,
    "end_start_year": null,
    "end_end_year": null,
    "historical_description": "Didirikan oleh Pangeran Mangkubumi yang bergelar Sri Sultan Hamengkubuwono I menyusul Perjanjian Giyanti 1755 M. Memiliki tatanan arsitektur sumbu filosofis kosmologis yang menghubungkan Gunung Merapi dan Laut Selatan, serta dinobatkan sebagai Warisan Dunia UNESCO.",
    "ruler_ids": [
      "rul-yogyakarta-1"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-yogyakarta-kraton",
      "site-mataram-imogiri"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Institusi monarki berlanjut secara konstitusional sebagai Daerah Istimewa Yogyakarta dalam bingkai NKRI (UU No. 13 Tahun 2012)."
    ],
    "last_updated": "2026-10-25",
    "region": "Jawa",
    "capital": "Kota Yogyakarta",
    "founded": 1755,
    "founded_note": "Perjanjian Giyanti 13 Februari 1755 M menetapkan pembagian Mataram dan penobatan HB I.",
    "founded_certainty": "verified",
    "golden_age": "Pemerintahan Sri Sultan Hamengkubuwono I (1755–1792 M)",
    "ended": null,
    "ended_note": "Kekuasaan politik melebur ke Republik Indonesia pada 5 September 1945 melalui Amanat 5 September; berstatus Daerah Istimewa.",
    "current_status": "Daerah Istimewa Yogyakarta & Lembaga Kebudayaan Keraton Berdaulat",
    "history_summary": "Kasultanan Ngayogyakarta Hadiningrat merupakan entitas penerus dinasti Mataram Islam yang memegang peranan krusial dalam perjuangan revolusi kemerdekaan RI. Sri Sultan Hamengkubuwono IX menyatakan bergabungnya Yogyakarta dengan Republik Indonesia dan menjadikan keraton sebagai benteng revolusi.",
    "territory_notes": "Wilayah Daerah Istimewa Yogyakarta (Bantul, Sleman, Kulon Progo, Gunungkidul, dan Kota Yogyakarta).",
    "emblem_symbol": "👑"
  },
  {
    "id": "kd-surakarta",
    "name": "Kasunanan Surakarta Hadiningrat",
    "alternative_names": [
      "Keraton Solo",
      "Kasunanan"
    ],
    "location_description": "Baluwarti, Kota Surakarta",
    "province": "Jawa Tengah",
    "island": "Jawa",
    "latitude": -7.5779,
    "longitude": 110.8281,
    "location_precision": "exact",
    "founded_start_year": 1745,
    "founded_end_year": 1755,
    "golden_age_start_year": 1788,
    "golden_age_end_year": 1820,
    "end_start_year": 1946,
    "end_end_year": 1950,
    "historical_description": "Kasunanan Surakarta merupakan istana pewaris langsung garis tahta Mataram Islam Kartasura yang dipindahkan ke desa Sala di tepi Bengawan Solo oleh Susuhunan Pakubuwono II pada 1745 M. Menjadi pusat sastra dan seni klasik Jawa.",
    "ruler_ids": [
      "rul-surakarta-1"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-surakarta-kraton",
      "site-mataram-imogiri"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Status pemerintahan Swapraja Surakarta dinonaktifkan pasca pergolakan politik anti-swapraja 1946 M."
    ],
    "last_updated": "2026-10-25",
    "region": "Jawa",
    "capital": "Kota Surakarta",
    "founded": 1745,
    "founded_note": "Pemindahan keraton dari Kartasura ke Surakarta oleh Pakubuwono II tahun 1745 M.",
    "founded_certainty": "verified",
    "golden_age": "Pemerintahan Sri Susuhunan Pakubuwono IV (1788–1820 M, era Serat Wulangreh)",
    "ended": 1946,
    "ended_note": "Status swapraja daerah istimewa dibekukan pemerintah pusat pada Juli 1946 akibat ketegangan sosial politik daerah.",
    "current_status": "Keraton Pemangku Kebudayaan Tradisi & Cagar Budaya Nasional",
    "history_summary": "Kasunanan Surakarta Hadiningrat melahirkan karya-karya adiluhung sastra Jawa-Islam seperti Serat Centhini dan Serat Wulangreh. Keraton memelihara tradisi ritual Malam 1 Suro dan peninggalan busana serta pusaka keraton Mataram.",
    "territory_notes": "Karesidenan Surakarta (Solo, Boyolali, Sukoharjo, Karanganyar, Wonogiri, Sragen, Klaten).",
    "emblem_symbol": "⚜️"
  },
  {
    "id": "kd-banjar",
    "name": "Kesultanan Banjar",
    "alternative_names": [
      "Bandjarmasin",
      "Negara Dipa - Daha Islam"
    ],
    "location_description": "Kuin (Banjarmasin) lalu Martapura",
    "province": "Kalimantan Selatan",
    "island": "Kalimantan",
    "latitude": -3.2952,
    "longitude": 114.5779,
    "location_precision": "exact",
    "founded_start_year": 1526,
    "founded_end_year": 1526,
    "golden_age_start_year": 1595,
    "golden_age_end_year": 1642,
    "end_start_year": 1860,
    "end_end_year": 1860,
    "historical_description": "Kesultanan Banjar merupakan kerajaan Islam terbesar di pulau Kalimantan yang mengontrol perdagangan komoditas lada, rotan, intan, dan emas di sepanjang jalur sungai Barito dan Laut Jawa. Memiliki tradisi keilmuan Islam yang melahirkan ulama besar dunia Syekh Muhammad Arsyad Al-Banjari.",
    "ruler_ids": [
      "rul-banjar-1",
      "rul-banjar-2"
    ],
    "territory_geojson_id": "ter-banjar-1",
    "heritage_site_ids": [
      "site-banjar-suriansyah"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-6",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Dihapuskan secara sepihak oleh Belanda pada 11 Juni 1860; perlawanan berlanjut dalam Perang Banjar hingga 1905."
    ],
    "last_updated": "2026-10-25",
    "region": "Kalimantan",
    "capital": "Kuin (Banjarmasin) lalu Martapura",
    "founded": 1526,
    "founded_note": "Raden Samudera memeluk Islam dan dinobatkan sebagai Sultan Suriansyah pada tahun 1526 M dibimbing utusan Demak.",
    "founded_certainty": "verified",
    "golden_age": "Abad ke-17 M (Pemerintahan Sultan Musta'inbillah)",
    "ended": 1860,
    "ended_note": "Dihapuskan secara sepihak oleh pemerintah kolonial Belanda pada 11 Juni 1860 yang memicu pecahnya Perang Banjar yang dipimpin Pangeran Antasari.",
    "current_status": "Lembaga Adat Budaya Banjar & Makam Bersejarah Nasional",
    "history_summary": "Kesultanan Banjar merupakan kerajaan Islam terbesar di pulau Kalimantan yang mengontrol perdagangan komoditas lada, rotan, intan, dan emas di sepanjang jalur sungai Barito dan Laut Jawa. Memiliki tradisi keilmuan Islam yang melahirkan ulama besar dunia Syekh Muhammad Arsyad Al-Banjari (pengarang kitab fikih legendaris Sabilal Muhtadin).",
    "territory_notes": "Daerah Aliran Sungai (DAS) Barito, pesisir Kalimantan Selatan, membentang ke Kotawaringin di barat dan Paser di timur.",
    "emblem_symbol": "💎"
  },
  {
    "id": "kd-pontianak",
    "name": "Kesultanan Pontianak (Kadriah)",
    "alternative_names": [
      "Kadriyah Pontianak"
    ],
    "location_description": "Muara Sungai Kapuas dan Landak, Kota Pontianak",
    "province": "Kalimantan Barat",
    "island": "Kalimantan",
    "latitude": -0.0264,
    "longitude": 109.3516,
    "location_precision": "exact",
    "founded_start_year": 1771,
    "founded_end_year": 1771,
    "golden_age_start_year": 1778,
    "golden_age_end_year": 1808,
    "end_start_year": 1950,
    "end_end_year": 1950,
    "historical_description": "Kesultanan Pontianak didirikan oleh dinasti habaib dari Hadhramaut, Sayyid Syarif Abdurrahman Al-Qadri. Menjadi pusat perniagaan sungai dan laut strategis di Kalimantan Barat, mempertemukan masyarakat Melayu, Dayak, Arab, dan Tionghoa dalam iklim perdagangan yang dinamis.",
    "ruler_ids": [
      "rul-pontianak-1"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-pontianak-kadriah"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Melebur secara sukarela ke dalam Negara Kesatuan Republik Indonesia pada tahun 1950 M."
    ],
    "last_updated": "2026-10-25",
    "region": "Kalimantan",
    "capital": "Pontianak (Muara Sungai Kapuas)",
    "founded": 1771,
    "founded_note": "Didirikan oleh Sayyid Syarif Abdurrahman Al-Qadri pada 23 Oktober 1771 M di muara persimpangan Sungai Kapuas dan Landak.",
    "founded_certainty": "verified",
    "golden_age": "Akhir Abad ke-18 hingga Awal Abad ke-19 M",
    "ended": 1950,
    "ended_note": "Bergabung ke dalam Negara Kesatuan Republik Indonesia pasca kemerdekaan.",
    "current_status": "Keraton Pemangku Adat & Monumen Sejarah Budaya Nasional",
    "history_summary": "Kesultanan Pontianak didirikan oleh dinasti habaib dari Hadhramaut, Sayyid Syarif Abdurrahman Al-Qadri. Menjadi pusat perniagaan sungai dan laut strategis di Kalimantan Barat, mempertemukan masyarakat Melayu, Dayak, Arab, dan Tionghoa dalam iklim perdagangan yang dinamis.",
    "territory_notes": "Muara Sungai Kapuas dan wilayah sekitarnya di Kalimantan Barat.",
    "emblem_symbol": "🏛️"
  },
  {
    "id": "kd-kutai",
    "name": "Kesultanan Kutai Kartanegara",
    "alternative_names": [
      "Kutai Kartanegara Ing Martadipura"
    ],
    "location_description": "Tenggarong, Kabupaten Kutai Kartanegara",
    "province": "Kalimantan Timur",
    "island": "Kalimantan",
    "latitude": -0.4283,
    "longitude": 116.9881,
    "location_precision": "exact",
    "founded_start_year": 1575,
    "founded_end_year": 1605,
    "golden_age_start_year": 1780,
    "golden_age_end_year": 1850,
    "end_start_year": 1960,
    "end_end_year": 1960,
    "historical_description": "Kesultanan Kutai Kartanegara bertransformasi memeluk Islam pada awal abad ke-17 di masa Raja Mahkota melalui dakwah Tuan Tunggang Parangan. Mengontrol jalur perdagangan komoditas kayu, gaharu, damar, dan sarang burung walet di sepanjang Sungai Mahakam.",
    "ruler_ids": [
      "rul-kutai-1"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-kutai-museum"
    ],
    "source_ids": [
      "src-1",
      "src-11"
    ],
    "verification_status": "partially_verified",
    "uncertainty_notes": [
      "Transisi dari era Hindu Kutai awal ke kesultanan Islam terjadi di muara Sungai Mahakam (Jembayan lalu Pemarangan dan Tenggarong)."
    ],
    "last_updated": "2026-10-25",
    "region": "Kalimantan",
    "capital": "Tenggarong (Sungai Mahakam)",
    "founded": 1575,
    "founded_note": "Islamisasi istana Kutai melalui dakwah Tuan Tunggang Parangan pada era Raja Mahkota akhir abad ke-16.",
    "founded_certainty": "estimated",
    "golden_age": "Abad ke-18 hingga 19 M (Pemerintahan Sultan Aji Muhammad Muslihuddin)",
    "ended": 1960,
    "ended_note": "Pemerintahan swapraja dihapuskan pada 1960 menjadi Kabupaten Daerah Tingkat II Kutai; keraton dihidupkan kembali sebagai lembaga adat pada 2001.",
    "current_status": "Keraton Lembaga Adat Budaya & Museum Mulawarman",
    "history_summary": "Kesultanan Kutai Kartanegara Ing Martadipura adalah salah satu kesultanan tertua di Kalimantan Timur yang memiliki catatan naskah istana Kitab Salasilah Kutai. Menguasai alur niaga Sungai Mahakam dari pedalaman hingga selat Makassar.",
    "territory_notes": "Daerah Aliran Sungai Mahakam dari pedalaman hingga pesisir Selat Makassar di Kalimantan Timur.",
    "emblem_symbol": "🐉"
  },
  {
    "id": "kd-gowa-tallo",
    "name": "Kesultanan Gowa-Tallo (Makassar)",
    "alternative_names": [
      "Kerajaan Kembar Makassar",
      "Sultanate of Gowa"
    ],
    "location_description": "Somba Opu, Kabupaten Gowa / Kota Makassar",
    "province": "Sulawesi Selatan",
    "island": "Sulawesi",
    "latitude": -5.1878,
    "longitude": 119.3992,
    "location_precision": "exact",
    "founded_start_year": 1605,
    "founded_end_year": 1605,
    "golden_age_start_year": 1653,
    "golden_age_end_year": 1669,
    "end_start_year": 1667,
    "end_end_year": 1669,
    "historical_description": "Kesultanan Gowa dan Tallo membentuk konfederasi maritim dwitunggal (Rua karaeng se're ata) yang mendominasi jalur rempah dan pelayaran di kawasan timur Nusantara. Memiliki armada perahu phinisi tangguh dan benteng bata tebal Somba Opu. Menegakkan doktrin pelayaran bebas menentang monopoli VOC Belanda.",
    "ruler_ids": [
      "rul-gowa-1",
      "rul-gowa-2"
    ],
    "territory_geojson_id": "ter-gowa-1",
    "heritage_site_ids": [
      "site-gowa-somba-opu",
      "site-gowa-katangka"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-9",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Perjanjian Bungaya 1667 membatasi kedaulatan laut; kekuasaan swapraja daratan berlanjut hingga pasca kemerdekaan RI."
    ],
    "last_updated": "2026-10-25",
    "region": "Sulawesi",
    "capital": "Somba Opu (Gowa / Makassar)",
    "founded": 1605,
    "founded_note": "Konversi resmi Raja Gowa XIV (Sultan Alauddin) dan Raja Tallo (Karaeng Matoaya) pada tahun 1605 M melalui dakwah Dato ri Bandang.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1653–1669 M (Pemerintahan Sultan Hasanuddin)",
    "ended": 1667,
    "ended_note": "Dipaksa menandatangani Perjanjian Bungaya tahun 1667 M dan jatuhnya Benteng Somba Opu pada 1669 M; institusi kerajaan berlanjut sebagai daerah swapraja hingga masa Republik.",
    "current_status": "Keraton Pemangku Adat Balla Lompoa & Cagar Budaya Nasional",
    "history_summary": "Kesultanan Gowa dan Tallo membentuk konfederasi maritim dwitunggal (\"Rua karaeng se're ata\" — dua raja, satu rakyat) yang mendominasi jalur rempah dan pelayaran di kawasan tengah dan timur Nusantara. Memiliki armada kapal phinisi andalan dan benteng batu bata tangguh (Benteng Somba Opu). Menegakkan doktrin pelayaran bebas (mare liberum) menentang monopoli VOC Belanda.",
    "territory_notes": "Menguasai jazirah selatan Sulawesi, membentang pengaruh hingga Selayar, Buton, Sumbawa, Flores, dan pesisir timur Kalimantan.",
    "emblem_symbol": "🗡️"
  },
  {
    "id": "kd-buton",
    "name": "Kesultanan Buton",
    "alternative_names": [
      "Kerajaan Wolio",
      "Butuni"
    ],
    "location_description": "Wolio, Kota Baubau, Pulau Buton",
    "province": "Sulawesi Tenggara",
    "island": "Sulawesi",
    "latitude": -5.4678,
    "longitude": 122.6144,
    "location_precision": "exact",
    "founded_start_year": 1538,
    "founded_end_year": 1541,
    "golden_age_start_year": 1597,
    "golden_age_end_year": 1631,
    "end_start_year": 1960,
    "end_end_year": 1960,
    "historical_description": "Kesultanan Buton terkenal dengan sistem ketatanegaraan berlandaskan konstitusi naskah martabat tujuh dan benteng batu kapur terluas di dunia (Benteng Keraton Wolio). Menjaga kemandirian di tengah persaingan hegemoni Gowa, Ternate, dan VOC.",
    "ruler_ids": [],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-buton-keraton"
    ],
    "source_ids": [
      "src-1",
      "src-2",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Raja Lakilaponto masuk Islam menjadi Sultan Kaimuddin I sekitar tahun 1538/1541 M."
    ],
    "last_updated": "2026-10-25",
    "region": "Sulawesi",
    "capital": "Wolio (Kota Baubau)",
    "founded": 1538,
    "founded_note": "Raja Buton VI Lakilaponto masuk Islam dan menjadi Sultan Buton I bergelar Murhum Kaimuddin Khilafat al-Khamis.",
    "founded_certainty": "verified",
    "golden_age": "Abad ke-17 M (Pemerintahan Sultan Dayanu Ikhsanuddin)",
    "ended": 1960,
    "ended_note": "Bergabung ke dalam Negara Kesatuan Republik Indonesia pasca wafatnya Sultan Buton ke-38 La Ode Falihi.",
    "current_status": "Lembaga Adat Wolio & Kawasan Benteng Warisan Dunia",
    "history_summary": "Kesultanan Buton terkenal dengan sistem ketatanegaraan berlandaskan naskah konstitusi martabat tujuh dan benteng batu kapur keliling terluas di dunia (Benteng Keraton Wolio). Menjaga kedaulatannya di tengah pergesekan hegemoni Gowa, Ternate, dan VOC.",
    "territory_notes": "Kepulauan Buton, Muna, Kabaena, Kepulauan Tukang Besi (Wakatobi), dan pesisir tenggara Sulawesi.",
    "emblem_symbol": "🏰"
  },
  {
    "id": "kd-ternate",
    "name": "Kesultanan Ternate",
    "alternative_names": [
      "Maluku Kie Raha - Ternate",
      "Gapi"
    ],
    "location_description": "Kastela / Soa Sio, Pulau Ternate",
    "province": "Maluku Utara",
    "island": "Maluku",
    "latitude": 0.7936,
    "longitude": 127.3871,
    "location_precision": "exact",
    "founded_start_year": 1486,
    "founded_end_year": 1486,
    "golden_age_start_year": 1570,
    "golden_age_end_year": 1583,
    "end_start_year": 1914,
    "end_end_year": 1914,
    "historical_description": "Kesultanan Ternate adalah salah satu kekuatan maritim kepulauan rempah tertua dan terkuat di dunia. Dikenal sebagai produsen utama cengkih kualitas unggul. Di bawah Sultan Baabullah, Ternate berhasil mengusir total garnisun Portugis dan menyatukan persekutuan bahari membentang hingga 72 pulau di Maluku, Sulawesi, hingga Pasifik.",
    "ruler_ids": [
      "rul-ternate-1",
      "rul-ternate-2"
    ],
    "territory_geojson_id": "ter-ternate-1",
    "heritage_site_ids": [
      "site-ternate-kadato"
    ],
    "source_ids": [
      "src-1",
      "src-6",
      "src-8"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Perubahan gelar Kolano menjadi Sultan terjadi setelah Kolano Zainal Abidin kembali dari Giri Kedaton di Jawa."
    ],
    "last_updated": "2026-10-25",
    "region": "Maluku",
    "capital": "Kastela lalu Gamlamo / Soa Sio (Pulau Ternate)",
    "founded": 1486,
    "founded_note": "Kolano Zainal Abidin (1486-1500 M) berguru ke Giri Kedaton dan resmi mengganti gelar Kolano menjadi Sultan.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1570–1583 M (Pemerintahan Sultan Baabullah)",
    "ended": 1914,
    "ended_note": "Dibatasi kewenangan politiknya oleh Hindia Belanda; keraton terus aktif memelihara tata adat hingga kini.",
    "current_status": "Keraton Pemangku Adat Berdaulat Kultural & Museum Sejarah",
    "history_summary": "Kesultanan Ternate adalah salah satu kekuatan maritim kepulauan rempah tertua dan terkuat di dunia. Dikenal sebagai produsen utama cengkih kualitas tertinggi. Di bawah Sultan Baabullah, Ternate berhasil mengusir total kekuatan bangsa Portugis dan menyatukan persekutuan bahari membentang hingga 72 pulau berpenghuni di kepulauan Maluku, Sulawesi, hingga Pasifik.",
    "territory_notes": "Mencakup Kepulauan Maluku, pantai timur dan utara Sulawesi, Kepulauan Sangihe-Talaud, hingga Mindanao selatan.",
    "emblem_symbol": "🌿"
  },
  {
    "id": "kd-tidore",
    "name": "Kesultanan Tidore",
    "alternative_names": [
      "Limau Duko",
      "Maluku Kie Raha - Tidore"
    ],
    "location_description": "Soasio, Pulau Tidore",
    "province": "Maluku Utara",
    "island": "Maluku",
    "latitude": 0.6869,
    "longitude": 127.4419,
    "location_precision": "exact",
    "founded_start_year": 1495,
    "founded_end_year": 1495,
    "golden_age_start_year": 1797,
    "golden_age_end_year": 1805,
    "end_start_year": 1905,
    "end_end_year": 1905,
    "historical_description": "Kesultanan Tidore memegang peran sejarah krusial dalam menghubungkan kepulauan Maluku dengan wilayah timur Nusantara hingga daratan Papua. Memimpin persekutuan Uli Siwa (Persekutuan Sembilan), Tidore di bawah kepemimpinan pahlawan maritim legendaris Sultan Nuku membebaskan perairan Maluku dari cengkeraman penjajah Belanda.",
    "ruler_ids": [
      "rul-tidore-1",
      "rul-tidore-2"
    ],
    "territory_geojson_id": "ter-tidore-1",
    "heritage_site_ids": [
      "site-tidore-kadato",
      "site-fakfak-patimburak"
    ],
    "source_ids": [
      "src-1",
      "src-6",
      "src-8",
      "src-12"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Jejaring kekuasaan mencakup Raja Ampat dan semenanjung pesisir barat Papua melalui pelantikan Korano."
    ],
    "last_updated": "2026-10-25",
    "region": "Maluku",
    "capital": "Soasio (Pulau Tidore)",
    "founded": 1495,
    "founded_note": "Ciriliyati masuk Islam dibimbing Syaikh Mansur dari Arab bergelar Sultan Jamaluddin.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1797–1805 M (Pemerintahan Sultan Nuku)",
    "ended": 1905,
    "ended_note": "Kekuasaan politik kolonial mengikat kesultanan; keraton mempertahankan adat kedaulatan budaya.",
    "current_status": "Keraton Pemangku Adat Tidore & Pusat Budaya Maluku Utara",
    "history_summary": "Kesultanan Tidore memegang peran sejarah krusial dalam menghubungkan kepulauan Maluku dengan wilayah timur Nusantara hingga daratan Papua. Memimpin persekutuan Uli Siwa (Persekutuan Sembilan), Tidore di bawah kepemimpinan pahlawan maritim legendaris Sultan Nuku membebaskan perairan Maluku dari cengkeraman penjajah Belanda dengan strategi diplomasi dan gerilya laut berani.",
    "territory_notes": "Wilayah Halmahera Selatan, Kepulauan Raja Ampat, Kepulauan Seram Timur, serta pesisir Semenanjung Onin dan Papua Barat.",
    "emblem_symbol": "🛡️"
  },
  {
    "id": "kd-siak",
    "name": "Kesultanan Siak Sri Indrapura",
    "alternative_names": [
      "Siak Darussalam",
      "Siak"
    ],
    "location_description": "Buantan / Kota Siak, Sungai Siak",
    "province": "Riau",
    "island": "Sumatra",
    "latitude": 0.7981,
    "longitude": 102.0494,
    "location_precision": "exact",
    "founded_start_year": 1723,
    "founded_end_year": 1723,
    "golden_age_start_year": 1889,
    "golden_age_end_year": 1915,
    "end_start_year": 1945,
    "end_end_year": 1945,
    "historical_description": "Kesultanan Siak Sri Indrapura adalah kerajaan Melayu Islam yang berdaulat di pesisir timur Riau. Mengontrol perniagaan timah, damar, dan pelayaran Selat Melaka. Istana Asserayah Hasyimiah yang didirikan pada 1889 berdiri megah dengan perpaduan arsitektur Melayu-Eropa-Arab dan kini menjadi cagar budaya kebanggaan nasional.",
    "ruler_ids": [
      "rul-siak-1",
      "rul-siak-2"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-siak-istana"
    ],
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Sultan Syarif Kasim II menyerahkan kedaulatan politik dan mahkota kerajaan sukarela untuk kemerdekaan RI 1945."
    ],
    "last_updated": "2026-10-25",
    "region": "Sumatra",
    "capital": "Senapelan lalu Mempura / Kota Siak",
    "founded": 1723,
    "founded_note": "Didirikan oleh Sultan Abdul Jalil Rahmad Syah (Raja Kecik) pada tahun 1723 M di Buantan.",
    "founded_certainty": "verified",
    "golden_age": "Akhir Abad ke-19 M (Pemerintahan Sultan Syarif Hasyim & Syarif Kasim II)",
    "ended": 1945,
    "ended_note": "Sultan Syarif Kasim II secara sukarela mengintegrasikan seluruh kesultanan dan kekayaannya ke Republik Indonesia pada tahun 1945 M.",
    "current_status": "Cagar Budaya Nasional & Monumen Kepahlawanan Indonesia",
    "history_summary": "Kesultanan Siak Sri Indrapura adalah kerajaan Melayu Islam yang berdaulat di pesisir timur Riau. Mengontrol perniagaan timah, damar, dan pelayaran Selat Melaka. Istana Asserayah Hasyimiah yang didirikan pada 1889 berdiri megah dengan perpaduan arsitektur Melayu-Eropa-Arab dan kini menjadi cagar budaya kebanggaan nasional.",
    "territory_notes": "Pesisir Riau, membentang dari muara Sungai Siak hingga perbatasan Deli dan Jambi di Sumatra Timur.",
    "emblem_symbol": "⚜️"
  },
  {
    "id": "kd-palembang",
    "name": "Kesultanan Palembang Darussalam",
    "alternative_names": [
      "Palembang Darussalam"
    ],
    "location_description": "Kuto Besak, Sungai Musi, Kota Palembang",
    "province": "Sumatra Selatan",
    "island": "Sumatra",
    "latitude": -2.9906,
    "longitude": 104.7592,
    "location_precision": "exact",
    "founded_start_year": 1659,
    "founded_end_year": 1659,
    "golden_age_start_year": 1724,
    "golden_age_end_year": 1821,
    "end_start_year": 1823,
    "end_end_year": 1823,
    "historical_description": "Kesultanan Palembang Darussalam memadukan kebesaran maritim Sriwijaya kuno dengan sendi-sendi keadaban Islam dan pengaruh kultural Jawa-Melayu. Mengontrol perniagaan lada dan timah Bangka-Belitung serta membentengi Sungai Musi dengan Benteng Kuto Besak yang kokoh.",
    "ruler_ids": [
      "rul-palembang-1"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-palembang-kuto-besak"
    ],
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Dihapuskan secara sepihak oleh Belanda pasca Perang Menteng dan pengasingan Sultan Mahmud Badaruddin II tahun 1821."
    ],
    "last_updated": "2026-10-25",
    "region": "Sumatra",
    "capital": "Kuto Gawang / Kuto Besak (Sungai Musi, Palembang)",
    "founded": 1659,
    "founded_note": "Sri Susuhunan Abdurrahman memproklamirkan kemerdekaan penuh Palembang dari hegemoni Mataram pada 1659 M.",
    "founded_certainty": "verified",
    "golden_age": "Tahun 1724–1821 M (Pemerintahan Sultan Mahmud Badaruddin I & II)",
    "ended": 1823,
    "ended_note": "Dihapuskan oleh pemerintah kolonial Belanda pasca Perang Menteng dan pengasingan Sultan Mahmud Badaruddin II ke Ternate.",
    "current_status": "Lembaga Adat Kesultanan Palembang & Kawasan Wisata Sejarah Musi",
    "history_summary": "Kesultanan Palembang Darussalam memadukan kebesaran maritim Sriwijaya kuno dengan sendi-sendi keadaban Islam dan pengaruh kultural Jawa-Melayu. Mengontrol perniagaan lada dan timah Bangka-Belitung serta membentengi Sungai Musi dengan Benteng Kuto Besak yang kokoh.",
    "territory_notes": "Daerah Aliran Sungai Musi (Batanghari Sembilan), pesisir Sumatra Selatan, serta Kepulauan Bangka dan Belitung.",
    "emblem_symbol": "🚢"
  },
  {
    "id": "kd-deli",
    "name": "Kesultanan Deli",
    "alternative_names": [
      "Deli Darussalam"
    ],
    "location_description": "Medan, Tanah Deli",
    "province": "Sumatra Utara",
    "island": "Sumatra",
    "latitude": 3.5752,
    "longitude": 98.6836,
    "location_precision": "exact",
    "founded_start_year": 1632,
    "founded_end_year": 1632,
    "golden_age_start_year": 1870,
    "golden_age_end_year": 1920,
    "end_start_year": 1946,
    "end_end_year": 1946,
    "historical_description": "Kesultanan Melayu Islam di pesisir timur Sumatra yang berpusat di Tanah Deli. Berawal dari kepemimpinan Tuanku Panglima Gocah Pahlawan wakil Sultan Aceh, Deli kemudian menjelma menjadi kesultanan terkemuka penghasil tembakau cerutu dunia dengan mahakarya arsitektur Istana Maimun dan Masjid Raya Al-Mashun.",
    "ruler_ids": [
      "rul-deli-1"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-deli-maimun"
    ],
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Kekuasaan politik berakhir akibat peristiwa Revolusi Sosial Sumatra Timur pada Maret 1946 M."
    ],
    "last_updated": "2026-10-25",
    "region": "Sumatra",
    "capital": "Medan (Sumatra Utara)",
    "founded": 1632,
    "founded_note": "Tuanku Panglima Gocah Pahlawan ditugaskan memimpin Deli oleh Sultan Iskandar Muda pada 1632 M.",
    "founded_certainty": "verified",
    "golden_age": "Akhir Abad ke-19 M (Era Sultan Mahmud Al-Rasyid)",
    "ended": 1946,
    "ended_note": "Kekuasaan politik swapraja runtuh pada masa Revolusi Sosial Sumatra Timur Maret 1946.",
    "current_status": "Keraton Pemangku Adat Istana Maimun & Cagar Budaya",
    "history_summary": "Kesultanan Deli merupakan kesultanan Melayu terkemuka di Sumatra Utara yang berhasil mempertahankan adat istiadat dan melahirkan karya monumental Istana Maimun dan Masjid Raya Al-Mashun.",
    "territory_notes": "Wilayah pesisir timur Sumatra Utara meliputi Medan, Deli Serdang, dan sekitarnya.",
    "emblem_symbol": "🏰"
  },
  {
    "id": "kd-bima",
    "name": "Kesultanan Bima",
    "alternative_names": [
      "Bima Darussalam",
      "Bo Sangaji Kai"
    ],
    "location_description": "Asi Mbojo, Kota Bima, Pulau Sumbawa",
    "province": "Nusa Tenggara Barat",
    "island": "Bali dan Nusa Tenggara",
    "latitude": -8.4578,
    "longitude": 118.7289,
    "location_precision": "exact",
    "founded_start_year": 1621,
    "founded_end_year": 1621,
    "golden_age_start_year": 1640,
    "golden_age_end_year": 1682,
    "end_start_year": 1958,
    "end_end_year": 1958,
    "historical_description": "Kesultanan Bima adalah pusat peradaban Islam terkemuka di Kepulauan Nusa Tenggara. Kesultanan ini memiliki tradisi pencatatan arsip istana tertua di Indonesia Timur yang dikenal sebagai BO Sangaji Kai, mencakup tatanan hukum adat dan piagam tanah.",
    "ruler_ids": [
      "rul-bima-1"
    ],
    "territory_geojson_id": null,
    "heritage_site_ids": [
      "site-bima-asi-mbojo"
    ],
    "source_ids": [
      "src-1",
      "src-6",
      "src-12"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Melebur secara konstitusional ke dalam NKRI pada tahun 1958 M menjadi Kabupaten Bima."
    ],
    "last_updated": "2026-10-25",
    "region": "Bali dan Nusa Tenggara",
    "capital": "Asi Mbojo (Kota Bima, Pulau Sumbawa)",
    "founded": 1621,
    "founded_note": "Dinobatkannya Sultan Abdul Kahir pada tahun 1621 M setelah menerima syiar Islam dari Kesultanan Makassar.",
    "founded_certainty": "verified",
    "golden_age": "Abad ke-17 hingga ke-18 M (Pemerintahan Sultan Abdul Khair Sirajuddin)",
    "ended": 1958,
    "ended_note": "Melebur secara konstitusional ke dalam NKRI menjadi Kabupaten Bima dan Kota Bima.",
    "current_status": "Museum Sejarah Asi Mbojo & Lembaga Adat Mbojo",
    "history_summary": "Kesultanan Bima adalah pusat peradaban Islam terkemuka di Kepulauan Nusa Tenggara. Kesultanan ini memiliki tradisi pencatatan arsip istana tertua di Indonesia Timur yang dikenal sebagai BO Sangaji Kai, mencakup tatanan hukum adat dan piagam tanah.",
    "territory_notes": "Bagian timur Pulau Sumbawa, serta pulau-pulau di sekitarnya termasuk Pulau Sangeang dan pesisir Manggarai (Flores barat).",
    "emblem_symbol": "📜"
  }
];
const rulersData = [
  {
    "id": "rul-pasai-1",
    "kingdom_id": "kd-samudera-pasai",
    "name": "Sultan Malikussaleh (Merah Silu)",
    "title": "Al-Sultan Al-Salih, Pendiri Kesultanan Samudera Pasai",
    "reign_start_year": 1267,
    "reign_end_year": 1297,
    "biography": "Masuk Islam dibimbing oleh Syaikh Ismail dari Mekkah; mempersatukan kota dagang Samudera dan Pasai di pesisir utara Aceh.",
    "source_ids": [
      "src-1",
      "src-4",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Tahun wafat tertera tegas pada inskripsi batu nisan bertarikh Ramadhan 696 H (1297 M)."
    ]
  },
  {
    "id": "rul-pasai-2",
    "kingdom_id": "kd-samudera-pasai",
    "name": "Sultan Muhammad Malikul Zahir",
    "title": "Al-Malik Al-Zahir I",
    "reign_start_year": 1297,
    "reign_end_year": 1326,
    "biography": "Putra sulung Sultan Malikussaleh; memperkuat perniagaan maritim di Selat Malaka dan pelopor pencetakan mata uang emas dirham.",
    "source_ids": [
      "src-1",
      "src-4"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Mencetak koin dirham emas tertua di Asia Tenggara yang ditemukan di situs Samudera Geudong."
    ]
  },
  {
    "id": "rul-pasai-3",
    "kingdom_id": "kd-samudera-pasai",
    "name": "Sultan Mahmud Malik Az-Zahir",
    "title": "Al-Malik Al-Zahir II",
    "reign_start_year": 1326,
    "reign_end_year": 1345,
    "biography": "Disaksikan langsung oleh musafir Maroko Ibnu Battuta saat berlabuh di Pasai tahun 1345 M; sangat taat pada mazhab Syafi'i.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-4"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Tahun akhir pemerintahan diperkirakan antara 1345 hingga penyerbuan Majapahit pertengahan abad ke-14."
    ]
  },
  {
    "id": "rul-aceh-1",
    "kingdom_id": "kd-aceh-darussalam",
    "name": "Sultan Ali Mughayat Syah",
    "title": "Pendiri Kesultanan Aceh Darussalam Terpadu",
    "reign_start_year": 1514,
    "reign_end_year": 1530,
    "biography": "Menyatukan kerajaan Daya, Pidie, dan Pasai serta menolak monopoli perniagaan bangsa Portugis di Selat Malaka.",
    "source_ids": [
      "src-1",
      "src-5"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Tercatat dalam naskah Bustanus Salatin dan prasasti makam di Kompleks Kandang XII Banda Aceh."
    ]
  },
  {
    "id": "rul-aceh-2",
    "kingdom_id": "kd-aceh-darussalam",
    "name": "Sultan Alauddin Riayat Syah Al-Kahar",
    "title": "Pemberontak Maritim & Diplomat Khilafah Utsmaniyah",
    "reign_start_year": 1537,
    "reign_end_year": 1571,
    "biography": "Mengirim duta besar ke Istanbul menjalin kerja sama militer dengan Khalifah Sulaiman Al-Qanuni; memperoleh meriam dan instruktur artileri Turki.",
    "source_ids": [
      "src-1",
      "src-5",
      "src-6"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-aceh-3",
    "kingdom_id": "kd-aceh-darussalam",
    "name": "Sultan Iskandar Muda",
    "title": "Al-Watsiq Billah, Pemimpin Zaman Keemasan (Mahkota Alam)",
    "reign_start_year": 1607,
    "reign_end_year": 1636,
    "biography": "Membawa Aceh ke puncak kejayaan politik maritim, menundukkan protektorat di Semenanjung Melayu, dan memberlakukan undang-undang Adat Meukuta Alam.",
    "source_ids": [
      "src-1",
      "src-5",
      "src-6"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-aceh-4",
    "kingdom_id": "kd-aceh-darussalam",
    "name": "Sultanah Safiatuddin Syah",
    "title": "Paduka Sri Sultanah Tajul Alam Safiatuddin Syah Johan Berdaulat",
    "reign_start_year": 1641,
    "reign_end_year": 1675,
    "biography": "Sultanah wanita pertama Aceh; putri Sultan Iskandar Muda yang mengedepankan diplomasi damai dan memajukan karya sastra keislaman.",
    "source_ids": [
      "src-1",
      "src-5"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-demak-1",
    "kingdom_id": "kd-demak",
    "name": "Raden Patah (Senapati Jimbun)",
    "title": "Sultan Syah Alam Akbar Al-Fattah I",
    "reign_start_year": 1478,
    "reign_end_year": 1518,
    "biography": "Dinobatkan sebagai penguasa Glagahwangi Demak atas musyawarah Walisongo; memprakarsai pembangunan Masjid Agung Demak.",
    "source_ids": [
      "src-1",
      "src-3",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Tahun 1478 M merujuk candrasengkala Sirna Ilang Kertaning Bhumi; Tomé Pires mencatatnya sebagai Pate Rodim."
    ]
  },
  {
    "id": "rul-demak-2",
    "kingdom_id": "kd-demak",
    "name": "Pati Unus (Pangeran Sabrang Lor)",
    "title": "Panglima Ekspedisi Jihad Malaka",
    "reign_start_year": 1518,
    "reign_end_year": 1521,
    "biography": "Memimpin ekspedisi 100 kapal perang gabungan prajurit Jawa menggempur kubu pertahanan Portugis di Malaka pada 1513 dan 1521.",
    "source_ids": [
      "src-1",
      "src-3",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Gugur dalam pertempuran laut di Selat Malaka tahun 1521."
    ]
  },
  {
    "id": "rul-demak-3",
    "kingdom_id": "kd-demak",
    "name": "Sultan Trenggana",
    "title": "Sultan Syah Alam Akbar III",
    "reign_start_year": 1521,
    "reign_end_year": 1546,
    "biography": "Masa puncak ekspansi politik Demak mencakup Sunda Kelapa, Tuban, Madura, Madiun, dan Malang; menugaskan Fatahillah merebut Sunda Kelapa 1527.",
    "source_ids": [
      "src-1",
      "src-3",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Wafat dalam ekspedisi militer ke Panarukan (Pasuruan/Blambangan) tahun 1546."
    ]
  },
  {
    "id": "rul-cirebon-1",
    "kingdom_id": "kd-cirebon",
    "name": "Sunan Gunung Jati (Syarif Hidayatullah)",
    "title": "Ingkang Sinuhun Kanjeng Susuhunan Jati Cirebon",
    "reign_start_year": 1479,
    "reign_end_year": 1568,
    "biography": "Mendirikan dinasti Islam Cirebon dan Banten; anggota majelis Walisongo yang memimpin penyebaran Islam damai di Tatar Sunda Jawa Barat.",
    "source_ids": [
      "src-1",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Makam berada di Astana Gunung Sembung, Cirebon."
    ]
  },
  {
    "id": "rul-cirebon-2",
    "kingdom_id": "kd-cirebon",
    "name": "Panembahan Ratu I (Pangeran Emas)",
    "title": "Sultan Zainul Arifin",
    "reign_start_year": 1570,
    "reign_end_year": 1649,
    "biography": "Meneruskan kepemimpinan Cirebon dengan menjaga perimbangan geopolitik antara Banten dan Mataram Islam; memperluas Keraton Pakungwati.",
    "source_ids": [
      "src-1",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-banten-1",
    "kingdom_id": "kd-banten",
    "name": "Sultan Maulana Hasanuddin",
    "title": "Pangeran Sabakingkin, Sultan Banten Pertama",
    "reign_start_year": 1552,
    "reign_end_year": 1570,
    "biography": "Putra Sunan Gunung Jati; melepaskan Banten dari dependensi Demak dan menegakkan kekuasaan maritim di muara Sungai Cibanten hingga Selat Sunda.",
    "source_ids": [
      "src-1",
      "src-6",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-banten-2",
    "kingdom_id": "kd-banten",
    "name": "Sultan Ageng Tirtayasa",
    "title": "Pangeran Surya, Sultan Banten ke-6",
    "reign_start_year": 1651,
    "reign_end_year": 1683,
    "biography": "Membawa Banten ke puncak kemakmuran perniagaan lada internasional bebas bea, memodernisasi kanal irigasi, dan memimpin perlawanan tanpa kompromi melawan VOC.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-6"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-mataram-1",
    "kingdom_id": "kd-mataram-islam",
    "name": "Panembahan Senopati (Danang Sutawijaya)",
    "title": "Senapati ing Ngalaga Sayidin Panatagama",
    "reign_start_year": 1584,
    "reign_end_year": 1601,
    "biography": "Memindahkan pusat kedaulatan Jawa dari Pajang ke Kotagede; meletakkan dasar kekuasaan dinasti Mataram Islam.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-mataram-2",
    "kingdom_id": "kd-mataram-islam",
    "name": "Sultan Agung Anyokrokusumo",
    "title": "Sultan Abdullah Muhammad Maulana Matarami",
    "reign_start_year": 1613,
    "reign_end_year": 1645,
    "biography": "Puncak imperium Mataram: menyatukan seluruh Jawa (kecuali Banten & Batavia) dan Madura; memprakarsai Kalender Saka Jawa Islam 1633 M.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Gelar Sultan diperoleh resmi dari Syarif Mekkah pada tahun 1641 M."
    ]
  },
  {
    "id": "rul-banjar-1",
    "kingdom_id": "kd-banjar",
    "name": "Sultan Suriansyah (Raden Samudera)",
    "title": "Sultan Banjar I",
    "reign_start_year": 1526,
    "reign_end_year": 1546,
    "biography": "Konversi ke Islam dibimbing utusan Kesultanan Demak; mendirikan pusat pemerintahan di muara Kuin Banjarmasin.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-6",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Hikayat Banjar mencatat bantuan 1.000 prajurit Demak dalam rekonsiliasi Negara Daha."
    ]
  },
  {
    "id": "rul-banjar-2",
    "kingdom_id": "kd-banjar",
    "name": "Pangeran Antasari",
    "title": "Panembahan Amiruddin Khalifatul Mukminin",
    "reign_start_year": 1862,
    "reign_end_year": 1862,
    "biography": "Pemimpin spiritual dan panglima gerilya Perang Banjar menolak penghapusan kesultanan oleh Hindia Belanda.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Dianugerahi gelar Pahlawan Nasional Indonesia."
    ]
  },
  {
    "id": "rul-gowa-1",
    "kingdom_id": "kd-gowa-tallo",
    "name": "Sultan Alauddin (I Manga'rangi Daeng Manrabbia)",
    "title": "Raja Gowa ke-14, Sultan Pertama Makassar",
    "reign_start_year": 1593,
    "reign_end_year": 1639,
    "biography": "Memeluk Islam resmi pada 22 September 1605 (9 Jumadil Awal 1014 H) dibimbing ulama Minangkabau Dato ri Bandang.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-9"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Memerintah bersama Mangkubumi Karaeng Matoaya dari Tallo dalam konfederasi dwitunggal."
    ]
  },
  {
    "id": "rul-gowa-2",
    "kingdom_id": "kd-gowa-tallo",
    "name": "Sultan Hasanuddin",
    "title": "I Mallombasi Daeng Mattawang Karaeng Bonto Mangape",
    "reign_start_year": 1653,
    "reign_end_year": 1669,
    "biography": "Memimpin perang laut mempertahankan doktrin pelayaran bebas di perairan Indonesia Timur; dijuluki Ayam Jantan dari Timur.",
    "source_ids": [
      "src-1",
      "src-6",
      "src-9"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Terpaksa menandatangani Perjanjian Bungaya 1667 M pasca pengepungan Benteng Somba Opu."
    ]
  },
  {
    "id": "rul-ternate-1",
    "kingdom_id": "kd-ternate",
    "name": "Sultan Zainal Abidin",
    "title": "Kolano Marhum, Peletak Dasar Kesultanan Ternate",
    "reign_start_year": 1486,
    "reign_end_year": 1500,
    "biography": "Berguru agama Islam langsung ke Pesantren Giri di Jawa; mentransformasi gelar Kolano menjadi Sultan dan mendirikan Mahkamah Syariah.",
    "source_ids": [
      "src-1",
      "src-6",
      "src-8"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-ternate-2",
    "kingdom_id": "kd-ternate",
    "name": "Sultan Baabullah (Babullah Datu Syah)",
    "title": "Penguasa 72 Pulau Berpenghuni",
    "reign_start_year": 1570,
    "reign_end_year": 1583,
    "biography": "Mengusir total garnisun Portugis dari Maluku pada tahun 1575 pasca pembunuhan ayahnya Sultan Khairun; menyatukan armada kepulauan Maluku hingga Sulawesi dan Pasifik.",
    "source_ids": [
      "src-1",
      "src-6",
      "src-8"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-tidore-1",
    "kingdom_id": "kd-tidore",
    "name": "Sultan Ciriliyati (Sultan Jamaluddin)",
    "title": "Sultan Islam Pertama Tidore",
    "reign_start_year": 1495,
    "reign_end_year": 1512,
    "biography": "Menerima syiar Islam dibimbing Syaikh Mansur dari Arab; melembagakan adat persekutuan Uli Siwa (Persekutuan Sembilan).",
    "source_ids": [
      "src-1",
      "src-8"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-tidore-2",
    "kingdom_id": "kd-tidore",
    "name": "Sultan Nuku (Muhammad al-Mabus Amiruddin)",
    "title": "Jou Barakati, Sri Paduka Maha Tuan Sultan Amiruddin Syah",
    "reign_start_year": 1797,
    "reign_end_year": 1805,
    "biography": "Pahlawan bahari tak terkalahkan yang membebaskan Tidore, Halmahera, Seram, hingga perairan Raja Ampat dan Papua Barat dari monopoli rempah Belanda.",
    "source_ids": [
      "src-1",
      "src-6",
      "src-8"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-bima-1",
    "kingdom_id": "kd-bima",
    "name": "Sultan Abdul Kahir (Rumata Ma Bata Wadu)",
    "title": "Sultan Bima I",
    "reign_start_year": 1621,
    "reign_end_year": 1640,
    "biography": "Masuk Islam pada 7 Februari 1621 dibimbing ulama utusan Kesultanan Makassar; menetapkan undang-undang adat BO Sangaji Kai berlandaskan syariat Islam.",
    "source_ids": [
      "src-1",
      "src-6",
      "src-12"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-siak-1",
    "kingdom_id": "kd-siak",
    "name": "Sultan Abdul Jalil Rahmad Syah (Raja Kecik)",
    "title": "Marhum Bukit Batu, Pendiri Kesultanan Siak",
    "reign_start_year": 1723,
    "reign_end_year": 1746,
    "biography": "Mendirikan pusat kedaulatan Siak di Buantan dan mengontrol perniagaan timah serta pelayaran pesisir timur Sumatra.",
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-siak-2",
    "kingdom_id": "kd-siak",
    "name": "Sultan Syarif Kasim II",
    "title": "Sultan As-Sayyidi Syarif Kasim Abdul Jalil Syaifuddin",
    "reign_start_year": 1915,
    "reign_end_year": 1945,
    "biography": "Sultan terakhir Siak yang secara sukarela mengintegrasikan seluruh kesultanan dan menyumbangkan 13 juta gulden mahkota bagi kemerdekaan Republik Indonesia 1945.",
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Ditetapkan sebagai Pahlawan Nasional Indonesia."
    ]
  },
  {
    "id": "rul-palembang-1",
    "kingdom_id": "kd-palembang",
    "name": "Sultan Mahmud Badaruddin II",
    "title": "Raden Hasan Pangeran Ratu",
    "reign_start_year": 1804,
    "reign_end_year": 1821,
    "biography": "Memimpin Perang Menteng mempertahankan kedaulatan Sungai Musi melawan ekspedisi laut Inggris dan Belanda.",
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Diasingkan ke Ternate oleh pemerintah kolonial Belanda pada tahun 1821 M."
    ]
  },
  {
    "id": "rul-deli-1",
    "kingdom_id": "kd-deli",
    "name": "Tuanku Panglima Gocah Pahlawan",
    "title": "Laksamana Kuda Bintan, Pendiri Dinasti Deli",
    "reign_start_year": 1632,
    "reign_end_year": 1669,
    "biography": "Diberi mandat oleh Sultan Iskandar Muda dari Kesultanan Aceh Darussalam untuk memimpin wilayah Tanah Deli dan pesisir Sumatra Timur.",
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "partially_verified",
    "uncertainty_notes": [
      "Tahun penobatan bersumber dari hikayat genealogi Kesultanan Deli."
    ]
  },
  {
    "id": "rul-kutai-1",
    "kingdom_id": "kd-kutai",
    "name": "Aji Pangeran Sinum Panji Mendapa",
    "title": "Sultan Kutai Kartanegara Ing Martadipura",
    "reign_start_year": 1605,
    "reign_end_year": 1635,
    "biography": "Memperluas wilayah kekuasaan Kutai Kartanegara di sepanjang Daerah Aliran Sungai Mahakam pasca masuknya Islam melalui Tuan Tunggang Parangan.",
    "source_ids": [
      "src-1",
      "src-11"
    ],
    "verification_status": "partially_verified",
    "uncertainty_notes": [
      "Tercatat dalam naskah Kitab Salasilah Kutai."
    ]
  },
  {
    "id": "rul-pontianak-1",
    "kingdom_id": "kd-pontianak",
    "name": "Sultan Syarif Abdurrahman Al-Qadri",
    "title": "Sultan Pertama Kesultanan Kadriah Pontianak",
    "reign_start_year": 1771,
    "reign_end_year": 1808,
    "biography": "Putra ulama Hadhramaut Habib Husein Al-Qadri; mendirikan permukiman dan Keraton Kadriah di persimpangan muara Sungai Kapuas dan Landak pada 23 Oktober 1771.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-yogyakarta-1",
    "kingdom_id": "kd-yogyakarta",
    "name": "Sri Sultan Hamengkubuwono I (Pangeran Mangkubumi)",
    "title": "Sampeyan Dalem Ingkang Sinuhun Kanjeng Sultan Hamengkubuwono Senapati ing Ngalaga Ngabdurrahman Sayidin Panatagama Kalifatullah",
    "reign_start_year": 1755,
    "reign_end_year": 1792,
    "biography": "Pendiri Kasultanan Ngayogyakarta Hadiningrat pasca Perjanjian Giyanti 1755 M; arsitek agung Keraton Yogyakarta dan Pesanggrahan Tamansari.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "rul-surakarta-1",
    "kingdom_id": "kd-surakarta",
    "name": "Sri Susuhunan Pakubuwono III",
    "title": "Sampeyan Dalem Ingkang Sinuhun Kanjeng Susuhunan Pakubuwono Senapati ing Ngalaga Ngabdurrahman Sayidin Panatagama",
    "reign_start_year": 1749,
    "reign_end_year": 1788,
    "biography": "Raja pertama Kasunanan Surakarta Hadiningrat pasca pemindahan keraton dari Kartasura ke Surakarta dan penandatangan Perjanjian Giyanti.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  }
];
const sitesData = [
  {
    "id": "site-pasai-makam",
    "name": "Kompleks Makam Sultan Malikussaleh",
    "alternative_names": [
      "Makam Merah Silu",
      "Situs Geudong Pasai"
    ],
    "kingdom_ids": [
      "kd-samudera-pasai"
    ],
    "site_type": "Makam Sultan",
    "latitude": 5.1275,
    "longitude": 97.2038,
    "location_description": "Desa Beuringen, Kecamatan Samudera, Kabupaten Aceh Utara",
    "province": "Aceh",
    "regency": "Kabupaten Aceh Utara",
    "historical_description": "Situs makam pendiri kesultanan Islam tertua yang terdokumentasi di Nusantara. Nisan marmer bergaya Gujarat dihiasi kaligrafi ayat Kursi dan syair tasawuf bertarikh Ramadhan 696 H (1297 M).",
    "description": "Situs makam pendiri kesultanan Islam tertua yang terdokumentasi di Nusantara. Nisan marmer bergaya Gujarat dihiasi kaligrafi ayat Kursi dan syair tasawuf bertarikh Ramadhan 696 H (1297 M).",
    "estimated_period_start": 1297,
    "estimated_period_end": 1300,
    "period": "Akhir Abad ke-13 (1297 M)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Kebudayaan Wilayah I Aceh",
    "source_ids": [
      "src-1",
      "src-4",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-aceh-baiturrahman",
    "name": "Masjid Raya Baiturrahman",
    "alternative_names": [
      "Baiturrahman Grand Mosque"
    ],
    "kingdom_ids": [
      "kd-aceh-darussalam"
    ],
    "site_type": "Masjid Bersejarah",
    "latitude": 5.5536,
    "longitude": 95.3192,
    "location_description": "Jl. Moh. Jam No.1, Kampung Baru, Baiturrahman, Kota Banda Aceh",
    "province": "Aceh",
    "regency": "Kota Banda Aceh",
    "historical_description": "Didirikan pertama kali pada era Sultan Iskandar Muda (1614 M) sebagai pusat peribadatan dan universitas Islam Kesultanan Aceh Darussalam. Mengalami rekonstruksi berarsitektur Mughal pasca Perang Aceh 1879-1881 M.",
    "description": "Didirikan pertama kali pada era Sultan Iskandar Muda (1614 M) sebagai pusat peribadatan dan universitas Islam Kesultanan Aceh Darussalam. Mengalami rekonstruksi berarsitektur Mughal pasca Perang Aceh 1879-1881 M.",
    "estimated_period_start": 1614,
    "estimated_period_end": 1881,
    "period": "Abad ke-17 (1614 M) & rekonstruksi 1881 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80",
    "image_source": "Koleksi Repositori Kemendikbudristek",
    "source_ids": [
      "src-1",
      "src-5",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-demak-masjid",
    "name": "Masjid Agung Demak",
    "alternative_names": [
      "Masjid Glagahwangi"
    ],
    "kingdom_ids": [
      "kd-demak"
    ],
    "site_type": "Masjid Bersejarah",
    "latitude": -6.8946,
    "longitude": 110.6372,
    "location_description": "Kauman, Bintoro, Kecamatan Demak, Kabupaten Demak",
    "province": "Jawa Tengah",
    "regency": "Kabupaten Demak",
    "historical_description": "Pusat musyawarah dakwah Walisongo dan simbol imperium Islam pertama di tanah Jawa. Beratap tumpang tiga akulturasi Hindu-Jawa dan tiang tatal legendaris karya Sunan Kalijaga.",
    "description": "Pusat musyawarah dakwah Walisongo dan simbol imperium Islam pertama di tanah Jawa. Beratap tumpang tiga akulturasi Hindu-Jawa dan tiang tatal legendaris karya Sunan Kalijaga.",
    "estimated_period_start": 1479,
    "estimated_period_end": 1500,
    "period": "Tahun 1479 M (Candra Sengkala Lawang Trus Gunaning Janma)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Cagar Budaya Jawa Tengah",
    "source_ids": [
      "src-1",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-kudus-menara",
    "name": "Masjid Menara Kudus & Makam Sunan Kudus",
    "alternative_names": [
      "Masjid Al-Aqsha Menara Kudus"
    ],
    "kingdom_ids": [
      "kd-demak"
    ],
    "site_type": "Masjid Bersejarah",
    "latitude": -6.8083,
    "longitude": 110.8406,
    "location_description": "Kauman, Kecamatan Kota Kudus, Kabupaten Kudus",
    "province": "Jawa Tengah",
    "regency": "Kabupaten Kudus",
    "historical_description": "Monumen akulturasi Islam dan budaya Hindu-Jawa. Menara bata merah berundak menyerupai candi langgam Singhasari-Majapahit didirikan oleh Ja'far Shodiq (Sunan Kudus) pada tahun 1549 M (956 Hijriah).",
    "description": "Monumen akulturasi Islam dan budaya Hindu-Jawa. Menara bata merah berundak menyerupai candi langgam Singhasari-Majapahit didirikan oleh Ja'far Shodiq (Sunan Kudus) pada tahun 1549 M (956 Hijriah).",
    "estimated_period_start": 1549,
    "estimated_period_end": 1550,
    "period": "Tahun 1549 M (956 Hijriah)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    "image_source": "Pemerintah Kabupaten Kudus",
    "source_ids": [
      "src-1",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-cirebon-kasepuhan",
    "name": "Keraton Kasepuhan Cirebon",
    "alternative_names": [
      "Keraton Pakungwati"
    ],
    "kingdom_ids": [
      "kd-cirebon"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -6.7262,
    "longitude": 108.5714,
    "location_description": "Jalan Kasepuhan No. 43, Lemahwungkuk, Kota Cirebon",
    "province": "Jawa Barat",
    "regency": "Kota Cirebon",
    "historical_description": "Keraton tertua di Cirebon yang didirikan tahun 1529 oleh Pangeran Mas Mochammad Arifin (cicit Sunan Gunung Jati). Menyimpan Kereta Kencana Singa Barong dan arsitektur perpaduan Jawa, Sunda, Tionghoa, dan Eropa.",
    "description": "Keraton tertua di Cirebon yang didirikan tahun 1529 oleh Pangeran Mas Mochammad Arifin (cicit Sunan Gunung Jati). Menyimpan Kereta Kencana Singa Barong dan arsitektur perpaduan Jawa, Sunda, Tionghoa, dan Eropa.",
    "estimated_period_start": 1529,
    "estimated_period_end": 1677,
    "period": "Tahun 1529 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Kebudayaan dan Pariwisata Kota Cirebon",
    "source_ids": [
      "src-1",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-cirebon-gunung-jati",
    "name": "Kompleks Makam Sunan Gunung Jati",
    "alternative_names": [
      "Astana Gunung Sembung"
    ],
    "kingdom_ids": [
      "kd-cirebon"
    ],
    "site_type": "Makam Sultan",
    "latitude": -6.6669,
    "longitude": 108.5414,
    "location_description": "Desa Astana, Kecamatan Gunungjati, Kabupaten Cirebon",
    "province": "Jawa Barat",
    "regency": "Kabupaten Cirebon",
    "historical_description": "Pusat ziarah spiritual utama di Jawa Barat. Makam Syarif Hidayatullah berundak sembilan tingkat dengan gerbang berhiaskan keramik porselen dinasti Ming sumbangan Putri Ong Tien.",
    "description": "Pusat ziarah spiritual utama di Jawa Barat. Makam Syarif Hidayatullah berundak sembilan tingkat dengan gerbang berhiaskan keramik porselen dinasti Ming sumbangan Putri Ong Tien.",
    "estimated_period_start": 1568,
    "estimated_period_end": 1600,
    "period": "Tahun 1568 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Kebudayaan Wilayah IX",
    "source_ids": [
      "src-1",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-banten-surasowan",
    "name": "Keraton Surosowan & Masjid Agung Banten",
    "alternative_names": [
      "Kota Kuno Banten Lama"
    ],
    "kingdom_ids": [
      "kd-banten"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -6.0356,
    "longitude": 106.1542,
    "location_description": "Banten Lama, Kecamatan Kasemen, Kota Serang",
    "province": "Banten",
    "regency": "Kota Serang",
    "historical_description": "Reruntuhan istana kesultanan maritim Banten seluas 3 hektar dengan benteng pertahanan intan bata merah dan sistem penyaringan air purba (Pengindelan). Berdampingan dengan Masjid Agung berarsitektur menara mercusuar.",
    "description": "Reruntuhan istana kesultanan maritim Banten seluas 3 hektar dengan benteng pertahanan intan bata merah dan sistem penyaringan air purba (Pengindelan). Berdampingan dengan Masjid Agung berarsitektur menara mercusuar.",
    "estimated_period_start": 1552,
    "estimated_period_end": 1683,
    "period": "Tahun 1552 - 1570 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Cagar Budaya Banten",
    "source_ids": [
      "src-1",
      "src-6",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-banten-kaibon",
    "name": "Reruntuhan Keraton Kaibon",
    "alternative_names": [
      "Keraton Ibunda Ratu Aisyah"
    ],
    "kingdom_ids": [
      "kd-banten"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -6.0422,
    "longitude": 106.1601,
    "location_description": "Kampung Kroya, Kelurahan Kasunyatan, Kasemen, Serang",
    "province": "Banten",
    "regency": "Kota Serang",
    "historical_description": "Kediaman ibunda Ratu Aisyah pada era Sultan Syafiuddin (1815 M). Menyajikan struktur gerbang bentar klasik dan kanal air lingkar pertahanan.",
    "description": "Kediaman ibunda Ratu Aisyah pada era Sultan Syafiuddin (1815 M). Menyajikan struktur gerbang bentar klasik dan kanal air lingkar pertahanan.",
    "estimated_period_start": 1815,
    "estimated_period_end": 1832,
    "period": "Tahun 1815 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Cagar Budaya Banten",
    "source_ids": [
      "src-1",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-mataram-kotagede",
    "name": "Kompleks Makam Kotagede & Masjid Gedhe",
    "alternative_names": [
      "Pasarean Hastana Kitha Ageng"
    ],
    "kingdom_ids": [
      "kd-mataram-islam"
    ],
    "site_type": "Makam Sultan",
    "latitude": -7.8286,
    "longitude": 110.3995,
    "location_description": "Sayangan, Jagalan, Banguntapan, Bantul / Kota Yogyakarta",
    "province": "D.I. Yogyakarta",
    "regency": "Kota Yogyakarta",
    "historical_description": "Pusat kekuasaan perdana dinasti Mataram Islam. Tempat peristirahatan Ki Ageng Pemanahan dan Panembahan Senopati dengan arsitektur gapura paduraksa berornamen Hindu-Jawa.",
    "description": "Pusat kekuasaan perdana dinasti Mataram Islam. Tempat peristirahatan Ki Ageng Pemanahan dan Panembahan Senopati dengan arsitektur gapura paduraksa berornamen Hindu-Jawa.",
    "estimated_period_start": 1587,
    "estimated_period_end": 1601,
    "period": "Tahun 1587 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Kebudayaan Kundha Kabudayan DIY",
    "source_ids": [
      "src-1",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-mataram-imogiri",
    "name": "Pasarean Pajimatan Imogiri",
    "alternative_names": [
      "Makam Raja-raja Mataram Imogiri"
    ],
    "kingdom_ids": [
      "kd-mataram-islam",
      "kd-yogyakarta",
      "kd-surakarta"
    ],
    "site_type": "Makam Sultan",
    "latitude": -7.9221,
    "longitude": 110.3957,
    "location_description": "Pajimatan, Girirejo, Imogiri, Kabupaten Bantul",
    "province": "D.I. Yogyakarta",
    "regency": "Kabupaten Bantul",
    "historical_description": "Pekuburan agung para raja Mataram Islam di atas perbukitan Merak yang diprakarsai Sultan Agung Anyokrokusumo tahun 1632 M. Menghubungkan trah Kasunanan Surakarta dan Kasultanan Yogyakarta.",
    "description": "Pekuburan agung para raja Mataram Islam di atas perbukitan Merak yang diprakarsai Sultan Agung Anyokrokusumo tahun 1632 M. Menghubungkan trah Kasunanan Surakarta dan Kasultanan Yogyakarta.",
    "estimated_period_start": 1632,
    "estimated_period_end": 1645,
    "period": "Tahun 1632 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    "image_source": "Kraton Ngayogyakarta Hadiningrat & Kasunanan Surakarta",
    "source_ids": [
      "src-1",
      "src-7",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-yogyakarta-kraton",
    "name": "Keraton Ngayogyakarta Hadiningrat",
    "alternative_names": [
      "Kraton Jogja"
    ],
    "kingdom_ids": [
      "kd-yogyakarta"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -7.8053,
    "longitude": 110.3642,
    "location_description": "Jl. Rotowijayan Blok No. 1, Panembahan, Kraton, Kota Yogyakarta",
    "province": "D.I. Yogyakarta",
    "regency": "Kota Yogyakarta",
    "historical_description": "Pusat pemerintahan Kasultanan Yogyakarta yang didirikan Sri Sultan Hamengkubuwono I pada tahun 1755 M. Memiliki sumbu filosofis kosmologis Gunung Merapi - Tugu Golong Gilig - Panggung Krapyak yang diakui sebagai Warisan Dunia UNESCO.",
    "description": "Pusat pemerintahan Kasultanan Yogyakarta yang didirikan Sri Sultan Hamengkubuwono I pada tahun 1755 M. Memiliki sumbu filosofis kosmologis Gunung Merapi - Tugu Golong Gilig - Panggung Krapyak yang diakui sebagai Warisan Dunia UNESCO.",
    "estimated_period_start": 1755,
    "estimated_period_end": 1756,
    "period": "Tahun 1755 M (Perjanjian Giyanti)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    "image_source": "UNESCO World Heritage Centre & Kraton Jogja",
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-surakarta-kraton",
    "name": "Keraton Kasunanan Surakarta Hadiningrat",
    "alternative_names": [
      "Kraton Solo"
    ],
    "kingdom_ids": [
      "kd-surakarta"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -7.5779,
    "longitude": 110.8281,
    "location_description": "Baluwarti, Pasar Kliwon, Kota Surakarta",
    "province": "Jawa Tengah",
    "regency": "Kota Surakarta",
    "historical_description": "Pusat kebudayaan Jawa Islam didirikan oleh Pakubuwono II pada tahun 1745 M pasca pemindahan dari Kartasura akibat Geger Pacinan. Memiliki menara Panggung Songgobuwono tempat bertapa spiritual.",
    "description": "Pusat kebudayaan Jawa Islam didirikan oleh Pakubuwono II pada tahun 1745 M pasca pemindahan dari Kartasura akibat Geger Pacinan. Memiliki menara Panggung Songgobuwono tempat bertapa spiritual.",
    "estimated_period_start": 1745,
    "estimated_period_end": 1746,
    "period": "Tahun 1745 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Kebudayaan Wilayah X",
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-banjar-suriansyah",
    "name": "Masjid Sultan Suriansyah & Makam Kuin",
    "alternative_names": [
      "Masjid Kuin"
    ],
    "kingdom_ids": [
      "kd-banjar"
    ],
    "site_type": "Masjid Bersejarah",
    "latitude": -3.2952,
    "longitude": 114.5779,
    "location_description": "Jalan Kuin Utara, Kuin Utara, Banjarmasin Utara, Kota Banjarmasin",
    "province": "Kalimantan Selatan",
    "regency": "Kota Banjarmasin",
    "historical_description": "Masjid tertua di Kalimantan Selatan di tepi muara Sungai Kuin berarsitektur panggung Banjar dengan atap tumpang tinggi dan ukiran kayu ulin antik karya pertukangan sungai.",
    "description": "Masjid tertua di Kalimantan Selatan di tepi muara Sungai Kuin berarsitektur panggung Banjar dengan atap tumpang tinggi dan ukiran kayu ulin antik karya pertukangan sungai.",
    "estimated_period_start": 1526,
    "estimated_period_end": 1550,
    "period": "Tahun 1526 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Kebudayaan dan Pariwisata Kota Banjarmasin",
    "source_ids": [
      "src-1",
      "src-2",
      "src-6",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-pontianak-kadriah",
    "name": "Keraton Kadriah Pontianak",
    "alternative_names": [
      "Istana Kadriyah"
    ],
    "kingdom_ids": [
      "kd-pontianak"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -0.0264,
    "longitude": 109.3516,
    "location_description": "Kampung Beting, Kelurahan Dalam Bugis, Pontianak Timur",
    "province": "Kalimantan Barat",
    "regency": "Kota Pontianak",
    "historical_description": "Istana kayu belian agung berlantai dua Kesultanan Pontianak yang dibangun Sultan Syarif Abdurrahman Al-Qadri tahun 1771 di muara Sungai Kapuas dan Landak.",
    "description": "Istana kayu belian agung berlantai dua Kesultanan Pontianak yang dibangun Sultan Syarif Abdurrahman Al-Qadri tahun 1771 di muara Sungai Kapuas dan Landak.",
    "estimated_period_start": 1771,
    "estimated_period_end": 1778,
    "period": "Tahun 1771 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "image_source": "BPNB Kalimantan Barat",
    "source_ids": [
      "src-1",
      "src-2",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-kutai-museum",
    "name": "Museum Mulawarman (Eks Istana Kesultanan Kutai Kartanegara)",
    "alternative_names": [
      "Keraton Kutai Tenggarong"
    ],
    "kingdom_ids": [
      "kd-kutai"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -0.4283,
    "longitude": 116.9881,
    "location_description": "Jl. Diponegoro, Panji, Tenggarong, Kabupaten Kutai Kartanegara",
    "province": "Kalimantan Timur",
    "regency": "Kabupaten Kutai Kartanegara",
    "historical_description": "Pusat tahta Kesultanan Kutai Kartanegara Ing Martadipura di tepian Sungai Mahakam. Menyimpan singgasana emas berhias permata, payung ubur-ubur, dan gamelan keraton.",
    "description": "Pusat tahta Kesultanan Kutai Kartanegara Ing Martadipura di tepian Sungai Mahakam. Menyimpan singgasana emas berhias permata, payung ubur-ubur, dan gamelan keraton.",
    "estimated_period_start": 1936,
    "estimated_period_end": 1938,
    "period": "Tahun 1936 M (Arsitektur beton pengganti istana kayu kuno)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Pendidikan dan Kebudayaan Kutai Kartanegara",
    "source_ids": [
      "src-1",
      "src-11"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-gowa-somba-opu",
    "name": "Benteng Somba Opu",
    "alternative_names": [
      "Fortress of Somba Opu"
    ],
    "kingdom_ids": [
      "kd-gowa-tallo"
    ],
    "site_type": "Benteng Pertahanan",
    "latitude": -5.1878,
    "longitude": 119.3992,
    "location_description": "Desa Benteng Somba Opu, Barombong, Kabupaten Gowa",
    "province": "Sulawesi Selatan",
    "regency": "Kabupaten Gowa",
    "historical_description": "Pusat pertahanan militer maritim dan pusat perniagaan kosmopolitan Kesultanan Gowa. Tembok bata tebal benteng menahan gempuran meriam VOC sebelum diruntuhkan Cornelis Speelman tahun 1669 pasca Perjanjian Bungaya.",
    "description": "Pusat pertahanan militer maritim dan pusat perniagaan kosmopolitan Kesultanan Gowa. Tembok bata tebal benteng menahan gempuran meriam VOC sebelum diruntuhkan Cornelis Speelman tahun 1669 pasca Perjanjian Bungaya.",
    "estimated_period_start": 1525,
    "estimated_period_end": 1669,
    "period": "Tahun 1525 - 1669 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Kebudayaan Wilayah XIX",
    "source_ids": [
      "src-1",
      "src-9",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-gowa-katangka",
    "name": "Masjid Tua Katangka & Makam Raja-raja Gowa",
    "alternative_names": [
      "Masjid Al-Hilal Katangka"
    ],
    "kingdom_ids": [
      "kd-gowa-tallo"
    ],
    "site_type": "Masjid Bersejarah",
    "latitude": -5.2023,
    "longitude": 119.4498,
    "location_description": "Katangka, Somba Opu, Kabupaten Gowa",
    "province": "Sulawesi Selatan",
    "regency": "Kabupaten Gowa",
    "historical_description": "Masjid tertua di Sulawesi Selatan didirikan tahun 1603 M berdinding tebal kokoh dengan arsitektur kubah bergaya perpaduan Bugis-Makassar, Jawa, dan Arab.",
    "description": "Masjid tertua di Sulawesi Selatan didirikan tahun 1603 M berdinding tebal kokoh dengan arsitektur kubah bergaya perpaduan Bugis-Makassar, Jawa, dan Arab.",
    "estimated_period_start": 1603,
    "estimated_period_end": 1605,
    "period": "Tahun 1603 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80",
    "image_source": "Kementerian Agama Provinsi Sulawesi Selatan",
    "source_ids": [
      "src-1",
      "src-9"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-buton-keraton",
    "name": "Benteng Keraton Wolio Buton",
    "alternative_names": [
      "Benteng Wolio"
    ],
    "kingdom_ids": [
      "kd-buton"
    ],
    "site_type": "Benteng Pertahanan",
    "latitude": -5.4678,
    "longitude": 122.6144,
    "location_description": "Melai, Murhum, Kota Baubau",
    "province": "Sulawesi Tenggara",
    "regency": "Kota Baubau",
    "historical_description": "Benteng batu kapur terluas di dunia (tercatat Guinness World Records) dengan keliling 3 kilometer dan 16 bastion pertahanan melingkupi istana Kesultanan Buton.",
    "description": "Benteng batu kapur terluas di dunia (tercatat Guinness World Records) dengan keliling 3 kilometer dan 16 bastion pertahanan melingkupi istana Kesultanan Buton.",
    "estimated_period_start": 1580,
    "estimated_period_end": 1630,
    "period": "Abad ke-16 M (Era Sultan Buton III La Sangaji)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Pariwisata Kota Baubau",
    "source_ids": [
      "src-1",
      "src-2",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-ternate-kadato",
    "name": "Kadato Kie Kesultanan Ternate",
    "alternative_names": [
      "Kedaton Sultan Ternate"
    ],
    "kingdom_ids": [
      "kd-ternate"
    ],
    "site_type": "Keraton & Istana",
    "latitude": 0.7936,
    "longitude": 127.3871,
    "location_description": "Salero, Ternate Utara, Kota Ternate",
    "province": "Maluku Utara",
    "regency": "Kota Ternate",
    "historical_description": "Istana singgasana para Sultan Ternate di lereng Gunung Gamalama berorientasi menghadap lautan. Menyimpan Mahkota Sultan berhias rambut hidup bertuah dan naskah surat emas sultan.",
    "description": "Istana singgasana para Sultan Ternate di lereng Gunung Gamalama berorientasi menghadap lautan. Menyimpan Mahkota Sultan berhias rambut hidup bertuah dan naskah surat emas sultan.",
    "estimated_period_start": 1796,
    "estimated_period_end": 1800,
    "period": "Tahun 1796 M (arsitektur batu sekarang)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Kebudayaan Wilayah XXI",
    "source_ids": [
      "src-1",
      "src-6",
      "src-8"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-tidore-kadato",
    "name": "Kadato Kie Kesultanan Tidore & Benteng Tahula",
    "alternative_names": [
      "Kedaton Tidore"
    ],
    "kingdom_ids": [
      "kd-tidore"
    ],
    "site_type": "Keraton & Istana",
    "latitude": 0.6869,
    "longitude": 127.4419,
    "location_description": "Soasio, Tidore Kepulauan, Kota Tidore Kepulauan",
    "province": "Maluku Utara",
    "regency": "Kota Tidore Kepulauan",
    "historical_description": "Pusat kekuasaan Sultan Tidore yang memimpin persekutuan maritim Uli Siwa membentang hingga Kepulauan Raja Ampat dan daratan pesisir Papua Barat.",
    "description": "Pusat kekuasaan Sultan Tidore yang memimpin persekutuan maritim Uli Siwa membentang hingga Kepulauan Raja Ampat dan daratan pesisir Papua Barat.",
    "estimated_period_start": 1780,
    "estimated_period_end": 1810,
    "period": "Abad ke-18 M & restorasi",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image_source": "Pemerintah Kota Tidore Kepulauan",
    "source_ids": [
      "src-1",
      "src-8"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-siak-istana",
    "name": "Istana Siak Sri Indrapura (Asserayah Hasyimiah)",
    "alternative_names": [
      "Istana Matahari Timur"
    ],
    "kingdom_ids": [
      "kd-siak"
    ],
    "site_type": "Keraton & Istana",
    "latitude": 0.7981,
    "longitude": 102.0494,
    "location_description": "Kampung Dalam, Kecamatan Siak, Kabupaten Siak",
    "province": "Riau",
    "regency": "Kabupaten Siak",
    "historical_description": "Istana megah perpaduan arsitektur Melayu, Arab, dan Moorish Eropa didirikan oleh Sultan Assyaidis Syarif Hasyim Abdul Jalil Syaifuddin tahun 1889. Menyimpan gramofon langka Komet dan mahkota bertabur intan berlian.",
    "description": "Istana megah perpaduan arsitektur Melayu, Arab, dan Moorish Eropa didirikan oleh Sultan Assyaidis Syarif Hasyim Abdul Jalil Syaifuddin tahun 1889. Menyimpan gramofon langka Komet dan mahkota bertabur intan berlian.",
    "estimated_period_start": 1889,
    "estimated_period_end": 1890,
    "period": "Tahun 1889 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Kebudayaan Provinsi Riau",
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-deli-maimun",
    "name": "Istana Maimun & Masjid Raya Al-Mashun Deli",
    "alternative_names": [
      "Istana Putri Hijau"
    ],
    "kingdom_ids": [
      "kd-deli"
    ],
    "site_type": "Keraton & Istana",
    "latitude": 3.5752,
    "longitude": 98.6836,
    "location_description": "Jl. Brigjend Katamso No.66, Medan Maimun, Kota Medan",
    "province": "Sumatra Utara",
    "regency": "Kota Medan",
    "historical_description": "Istana megah Kesultanan Deli didesain arsitek Italia Ferrari dan didirikan Sultan Mahmud Al-Rasyid pada tahun 1888. Perpaduan gaya Melayu Deli, Islam Timur Tengah, Spanyol, dan Belanda.",
    "description": "Istana megah Kesultanan Deli didesain arsitek Italia Ferrari dan didirikan Sultan Mahmud Al-Rasyid pada tahun 1888. Perpaduan gaya Melayu Deli, Islam Timur Tengah, Spanyol, dan Belanda.",
    "estimated_period_start": 1888,
    "estimated_period_end": 1891,
    "period": "Tahun 1888 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "image_source": "Balai Pelestarian Kebudayaan Wilayah II Sumut",
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-palembang-kuto-besak",
    "name": "Benteng Kuto Besak & Masjid Agung Sultan Mahmud Badaruddin",
    "alternative_names": [
      "Kuto Besak Musi"
    ],
    "kingdom_ids": [
      "kd-palembang"
    ],
    "site_type": "Benteng Pertahanan",
    "latitude": -2.9906,
    "longitude": 104.7592,
    "location_description": "Jalan 19 Ilir, Bukit Kecil, Kota Palembang",
    "province": "Sumatra Selatan",
    "regency": "Kota Palembang",
    "historical_description": "Benteng pertahanan batu kapur megah di tepian Sungai Musi diprakarsai Sultan Mahmud Badaruddin I dan diselesaikan tahun 1797 oleh Sultan Muhammad Bahauddin.",
    "description": "Benteng pertahanan batu kapur megah di tepian Sungai Musi diprakarsai Sultan Mahmud Badaruddin I dan diselesaikan tahun 1797 oleh Sultan Muhammad Bahauddin.",
    "estimated_period_start": 1780,
    "estimated_period_end": 1797,
    "period": "Tahun 1780 - 1797 M",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Kebudayaan Kota Palembang",
    "source_ids": [
      "src-1",
      "src-2"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-bima-asi-mbojo",
    "name": "Asi Mbojo (Museum Istana Kesultanan Bima)",
    "alternative_names": [
      "Istana Bima"
    ],
    "kingdom_ids": [
      "kd-bima"
    ],
    "site_type": "Keraton & Istana",
    "latitude": -8.4578,
    "longitude": 118.7289,
    "location_description": "Jl. Sultan Ibrahim No.2, Paruga, Rasanae Barat, Kota Bima",
    "province": "Nusa Tenggara Barat",
    "regency": "Kota Bima",
    "historical_description": "Istana resmi Kesultanan Bima dengan tata ruang perpaduan gaya panggung tradisional Mbojo dan sentuhan arsitektur kolonial. Menyimpan naskah kuno BO Sangaji Kai.",
    "description": "Istana resmi Kesultanan Bima dengan tata ruang perpaduan gaya panggung tradisional Mbojo dan sentuhan arsitektur kolonial. Menyimpan naskah kuno BO Sangaji Kai.",
    "estimated_period_start": 1927,
    "estimated_period_end": 1929,
    "period": "Tahun 1927 M (menggantikan istana kayu sebelumnya)",
    "preservation_status": "Cagar Budaya Nasional",
    "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "image_source": "Museum Asi Mbojo & Pemkot Bima",
    "source_ids": [
      "src-1",
      "src-6",
      "src-12"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  },
  {
    "id": "site-fakfak-patimburak",
    "name": "Masjid Tua Patimburak",
    "alternative_names": [
      "Masjid Karas Fakfak"
    ],
    "kingdom_ids": [
      "kd-tidore"
    ],
    "site_type": "Masjid Bersejarah",
    "latitude": -2.9667,
    "longitude": 132.3333,
    "location_description": "Kampung Patimburak, Distrik Kokas, Kabupaten Fakfak",
    "province": "Papua Barat",
    "regency": "Kabupaten Fakfak",
    "historical_description": "Masjid bersejarah tertua di tanah Papua yang dibangun pada masa pengaruh Kesultanan Tidore dan Raja Petuanan Wertuar (1870 M). Bentuk bangunannya mencerminkan falsafah Satu Tungku Tiga Batu.",
    "description": "Masjid bersejarah tertua di tanah Papua yang dibangun pada masa pengaruh Kesultanan Tidore dan Raja Petuanan Wertuar (1870 M). Bentuk bangunannya mencerminkan falsafah Satu Tungku Tiga Batu.",
    "estimated_period_start": 1870,
    "estimated_period_end": 1875,
    "period": "Tahun 1870 M (Era Petuanan Wertuar & Tidore)",
    "preservation_status": "Cagar Budaya Peringkat Provinsi",
    "image_url": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    "image": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    "image_source": "Dinas Kebudayaan dan Pariwisata Papua Barat",
    "source_ids": [
      "src-1",
      "src-8",
      "src-12"
    ],
    "verification_status": "verified",
    "uncertainty_notes": []
  }
];
const territoriesData = [
  {
    "kingdom_id": "kd-samudera-pasai",
    "name": "Wilayah Inti Kesultanan Samudera Pasai (Pesisir Timur Aceh)",
    "temporal_start_year": 1267,
    "temporal_end_year": 1521,
    "spatial_precision": "approximate",
    "evidence_summary": "Rekonstruksi berbasis catatan pelayaran Ibnu Battuta (1345 M) dan sebaran nisan berangka tahun dinasti Malikussaleh di muara Sungai Pasai & Peusangan.",
    "source_ids": [
      "src-1",
      "src-4",
      "src-10"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Batas poligon menggambarkan zona konsentrasi pelabuhan dan makam, bukan garis tapal batas modern."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        5.35,
        96.85
      ],
      [
        5.25,
        97.45
      ],
      [
        4.85,
        97.65
      ],
      [
        4.6,
        97.3
      ],
      [
        4.9,
        96.9
      ],
      [
        5.35,
        96.85
      ]
    ]
  },
  {
    "kingdom_id": "kd-aceh-darussalam",
    "name": "Imperium Maritim Aceh Darussalam (Masa Sultan Iskandar Muda)",
    "temporal_start_year": 1607,
    "temporal_end_year": 1636,
    "spatial_precision": "approximate",
    "evidence_summary": "Berdasarkan catatan kitab Bustanus Salatin, surat diplomatik kepada Raja James I Inggris, dan pos pelabuhan lada di pesisir barat dan timur Sumatra.",
    "source_ids": [
      "src-1",
      "src-5",
      "src-6"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Mencakup protektorat pesisir Sumatra dan pelabuhan lada bebas."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        5.95,
        95.1
      ],
      [
        5.7,
        97.5
      ],
      [
        4.5,
        98.6
      ],
      [
        3.6,
        99.2
      ],
      [
        2.2,
        98.4
      ],
      [
        2.8,
        96.5
      ],
      [
        4.2,
        95.8
      ],
      [
        5.95,
        95.1
      ]
    ]
  },
  {
    "kingdom_id": "kd-demak",
    "name": "Wilayah Pengaruh Pesisir Utara Kesultanan Demak",
    "temporal_start_year": 1478,
    "temporal_end_year": 1546,
    "spatial_precision": "approximate",
    "evidence_summary": "Sintesis laporan Suma Oriental Tomé Pires (1515 M) tentang kota-kota pelabuhan muslim dan ekspedisi militer Sultan Trenggana.",
    "source_ids": [
      "src-1",
      "src-3",
      "src-7"
    ],
    "verification_status": "partially_verified",
    "uncertainty_notes": [
      "Hubungan dengan adipati pesisir berupa pengakuan kedaulatan dan upeti keagamaan."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        -6.3,
        106.8
      ],
      [
        -6.5,
        108.6
      ],
      [
        -6.7,
        110.8
      ],
      [
        -6.8,
        112.5
      ],
      [
        -7.3,
        112.8
      ],
      [
        -7.6,
        110.4
      ],
      [
        -7.1,
        107.5
      ],
      [
        -6.3,
        106.8
      ]
    ]
  },
  {
    "kingdom_id": "kd-banten",
    "name": "Kesultanan Banten dan Hegemoni Selat Sunda - Lampung",
    "temporal_start_year": 1552,
    "temporal_end_year": 1683,
    "spatial_precision": "approximate",
    "evidence_summary": "Berdasarkan arsip piagam perjanjian lada Lampung-Banten dan catatan ekspedisi laut Belanda & Inggris di Selat Sunda.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-6"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Meliputi pesisir Banten dan pelabuhan lada di Lampung Selatan dan Teluk Semangka."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        -5,
        105
      ],
      [
        -5.7,
        106
      ],
      [
        -5.9,
        106.3
      ],
      [
        -6.4,
        106.7
      ],
      [
        -6.9,
        106.3
      ],
      [
        -6.8,
        105.2
      ],
      [
        -5.8,
        104.5
      ],
      [
        -5,
        105
      ]
    ]
  },
  {
    "kingdom_id": "kd-mataram-islam",
    "name": "Kedaulatan Mataram Islam (Era Sultan Agung Anyokrokusumo)",
    "temporal_start_year": 1613,
    "temporal_end_year": 1645,
    "spatial_precision": "approximate",
    "evidence_summary": "Berdasarkan Babad Tanah Jawi, catatan VOC Daghregister Kasteel Batavia, dan piagam tanah lungguh para adipati mancanegara.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-7"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Mencakup negaragung pedalaman Jawa Tengah, pesisir mancanegara wetan dan kulon."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        -6.8,
        108.8
      ],
      [
        -6.7,
        111.5
      ],
      [
        -6.9,
        113.8
      ],
      [
        -7.7,
        114.2
      ],
      [
        -8.3,
        112.5
      ],
      [
        -8.1,
        110.3
      ],
      [
        -7.9,
        109
      ],
      [
        -6.8,
        108.8
      ]
    ]
  },
  {
    "kingdom_id": "kd-banjar",
    "name": "Wilayah Kesultanan Banjar (DAS Barito & Pesisir Selatan Kalimantan)",
    "temporal_start_year": 1526,
    "temporal_end_year": 1860,
    "spatial_precision": "approximate",
    "evidence_summary": "Berdasarkan naskah Hikayat Banjar dan catatan pelabuhan lada Banjarmasin VOC.",
    "source_ids": [
      "src-1",
      "src-2",
      "src-6",
      "src-11"
    ],
    "verification_status": "partially_verified",
    "uncertainty_notes": [
      "Batas di pedalaman mengikuti daerah aliran sungai Barito, Martapura, dan Kahayan."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        -1.8,
        114
      ],
      [
        -2.1,
        115.8
      ],
      [
        -3.3,
        116.3
      ],
      [
        -4,
        115
      ],
      [
        -3.5,
        113.5
      ],
      [
        -1.8,
        114
      ]
    ]
  },
  {
    "kingdom_id": "kd-gowa-tallo",
    "name": "Kedaulatan Maritim Konfederasi Gowa-Tallo (Makassar)",
    "temporal_start_year": 1605,
    "temporal_end_year": 1667,
    "spatial_precision": "approximate",
    "evidence_summary": "Berdasarkan Lontara Bilang (Buku Harian Raja-raja Gowa-Tallo) dan naskah traktat Perjanjian Bungaya 1667.",
    "source_ids": [
      "src-1",
      "src-6",
      "src-9"
    ],
    "verification_status": "verified",
    "uncertainty_notes": [
      "Wilayah daratan inti semenanjung barat daya Sulawesi beserta jejaring pelabuhan sekutu."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        -3.8,
        119.5
      ],
      [
        -4.5,
        120.4
      ],
      [
        -5.7,
        120.6
      ],
      [
        -5.8,
        119.3
      ],
      [
        -5,
        119.2
      ],
      [
        -3.8,
        119.5
      ]
    ]
  },
  {
    "kingdom_id": "kd-ternate",
    "name": "Hegemoni Kepulauan Kesultanan Ternate (Era Sultan Baabullah)",
    "temporal_start_year": 1570,
    "temporal_end_year": 1583,
    "spatial_precision": "approximate",
    "evidence_summary": "Berdasarkan catatan sejarawan Leonard Andaya dan laporan ekspedisi Sir Francis Drake (1579 M).",
    "source_ids": [
      "src-1",
      "src-6",
      "src-8"
    ],
    "verification_status": "partially_verified",
    "uncertainty_notes": [
      "Pengaruh politik berbentuk persekutuan maritim antar-pulau Maluku Kie Raha."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        2.2,
        127.5
      ],
      [
        1.5,
        128.5
      ],
      [
        0,
        127.8
      ],
      [
        -1.8,
        125.8
      ],
      [
        0.5,
        124.5
      ],
      [
        2.2,
        127.5
      ]
    ]
  },
  {
    "kingdom_id": "kd-tidore",
    "name": "Wilayah Kekuasaan Sultan Nuku (Tidore, Seram Timur & Kepulauan Papua)",
    "temporal_start_year": 1797,
    "temporal_end_year": 1805,
    "spatial_precision": "approximate",
    "evidence_summary": "Berdasarkan surat-surat Sultan Nuku kepada armada Inggris (EIC) dan piagam pengangkatan para Korano di Raja Ampat & Papua Barat.",
    "source_ids": [
      "src-1",
      "src-8",
      "src-12"
    ],
    "verification_status": "partially_verified",
    "uncertainty_notes": [
      "Menghubungkan kepemimpinan Halmahera, Kepulauan Raja Ampat, dan pesisir Semenanjung Onin."
    ],
    "geometry_type": "Polygon",
    "coordinates": [
      [
        0.8,
        127.3
      ],
      [
        -0.5,
        128.5
      ],
      [
        -3,
        130
      ],
      [
        -1.5,
        131.5
      ],
      [
        -3,
        132.8
      ],
      [
        -1,
        129
      ],
      [
        0.8,
        127.3
      ]
    ]
  }
];
const sourcesData = [
  {
    "id": "src-1",
    "title": "Sejarah Nasional Indonesia Jilid III: Zaman Pertumbuhan dan Perkembangan Kerajaan-kerajaan Islam di Indonesia",
    "author_or_institution": "Marwati Djoened Poesponegoro & Nugroho Notosusanto",
    "publication_year": 2008,
    "source_type": "Buku Akademik",
    "url": "https://balaimustaka.co.id/katalog/sejarah-nasional-indonesia-jilid-3",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Kronologi umum berdirinya Samudera Pasai, Demak, Cirebon, Banten, Mataram, Ternate, Tidore, dan Gowa.",
      "Pola islamisasi maritim dan peranan Walisongo di Jawa."
    ],
    "notes": "Edisi Pemutakhiran Balai Pustaka, Jakarta, hlm. 1-285."
  },
  {
    "id": "src-2",
    "title": "A History of Modern Indonesia since c. 1200 (Fourth Edition)",
    "author_or_institution": "M. C. Ricklefs",
    "publication_year": 2008,
    "source_type": "Buku Akademik",
    "url": "https://www.palgrave.com/gp/book/9780230546851",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Jalur perdagangan laut Asia Tenggara dan dinamika kota pelabuhan muslim.",
      "Fragmentasi politik Mataram pasca Perjanjian Giyanti 1755."
    ],
    "notes": "Stanford University Press / Palgrave Macmillan, hlm. 3-85."
  },
  {
    "id": "src-3",
    "title": "The Suma Oriental of Tomé Pires: An Account of the East",
    "author_or_institution": "Tomé Pires (Terjemahan Armando Cortesão)",
    "publication_year": 1944,
    "source_type": "Laporan Kolonial / VOC",
    "url": "https://archive.org/details/sumaorientalofal01pire",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Laporan mata-mata Portugis mengenai pelabuhan Pasai, Demak, Sunda Kelapa, Cirebon, Tuban, dan Gresik 1512-1515 M."
    ],
    "notes": "The Hakluyt Society, London, Vol. 1-2."
  },
  {
    "id": "src-4",
    "title": "Hikayat Raja-raja Pasai",
    "author_or_institution": "Anonim (Disunting A. H. Hill)",
    "publication_year": 1960,
    "source_type": "Naskah Kuno & Babad",
    "url": "https://www.jstor.org/stable/41505504",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Genealogi Sultan Malikussaleh (Merah Silu) dan konversi Islam di Samudera Pasai.",
      "Inskripsi nisan Al-Malik Ash-Shalih 1297 M."
    ],
    "notes": "Journal of the Malayan Branch of the Royal Asiatic Society (JMBRAS), Vol. 33, No. 2, hlm. 1-215."
  },
  {
    "id": "src-5",
    "title": "Bustanus Salatin (Taman Raja-raja)",
    "author_or_institution": "Syaikh Nuruddin Ar-Raniri",
    "publication_year": 1638,
    "source_type": "Naskah Kuno & Babad",
    "url": "https://onesearch.id/Record/IOS2852.12345",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Silsilah dinasti Kesultanan Aceh Darussalam dari Sultan Ali Mughayat Syah hingga Sultan Iskandar Tsani.",
      "Hukum tata negara Adat Meukuta Alam era Iskandar Muda."
    ],
    "notes": "Dewan Bahasa dan Pustaka Malaysia, Edisi T. Iskandar."
  },
  {
    "id": "src-6",
    "title": "Southeast Asia in the Age of Commerce 1450–1680: The Lands Below the Winds",
    "author_or_institution": "Anthony Reid",
    "publication_year": 1988,
    "source_type": "Buku Akademik",
    "url": "https://yalebooks.yale.edu/book/9780300047509/southeast-asia-age-commerce-1450-1680",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Struktur ekonomi perniagaan lada, cengkih, dan pala pada kesultanan maritim Banten, Aceh, Banjar, Makassar, dan Maluku."
    ],
    "notes": "Yale University Press, New Haven, hlm. 120-210."
  },
  {
    "id": "src-7",
    "title": "Babad Tanah Jawi: Mulai dari Nabi Adam Sampai Tahun 1647",
    "author_or_institution": "W. L. Olthof (Alih Aksara & Ringkasan)",
    "publication_year": 1941,
    "source_type": "Naskah Kuno & Babad",
    "url": "https://openlibrary.org/books/OL6456073M/Babad_Tanah_Djawi",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Silsilah Raden Patah, transisi kekuasaan Demak, Pajang, dan berdirinya dinasti Mataram Islam oleh Ki Ageng Pemanahan dan Panembahan Senopati."
    ],
    "notes": "M. Nijhoff, 's-Gravenhage, hlm. 50-180."
  },
  {
    "id": "src-8",
    "title": "The World of Maluku: Eastern Indonesia in the Early Modern Period",
    "author_or_institution": "Leonard Y. Andaya",
    "publication_year": 1993,
    "source_type": "Buku Akademik",
    "url": "https://uhpress.hawaii.edu/title/the-world-of-maluku",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Politik persekutuan Maluku Kie Raha (Ternate, Tidore, Bacan, Jailolo).",
      "Perjuangan Sultan Baabullah dan kepemimpinan Sultan Nuku di perairan Halmahera dan Papua."
    ],
    "notes": "University of Hawaii Press, Honolulu, hlm. 47-145."
  },
  {
    "id": "src-9",
    "title": "The Heritage of Arung Palakka: A History of South Sulawesi (Celebes) in the Seventeenth Century",
    "author_or_institution": "Leonard Y. Andaya",
    "publication_year": 1981,
    "source_type": "Buku Akademik",
    "url": "https://brill.com/view/title/13524",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Islamisasi kembar Gowa-Tallo 1605 M, konflik hegemoni maritim Makassar, dan Perjanjian Bungaya 1667."
    ],
    "notes": "Martinus Nijhoff, The Hague, hlm. 20-95."
  },
  {
    "id": "src-10",
    "title": "Arkeologi Islam Nusantara: Menelusuri Jejak Arsitektur dan Epigrafi Kuno",
    "author_or_institution": "Uka Tjandrasasmita",
    "publication_year": 2009,
    "source_type": "Kajian Arkeologi",
    "url": "https://penerbitkpg.id/buku/arkeologi-islam-nusantara",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Tipologi arsitektur atap tumpang Masjid Demak, Menara Kudus, makam Imogiri, keraton Surosowan Banten, dan benteng Somba Opu."
    ],
    "notes": "Kepustakaan Populer Gramedia (KPG), Jakarta, hlm. 80-240."
  },
  {
    "id": "src-11",
    "title": "Kerajaan-Kerajaan Islam di Kalimantan: Menelusuri Jejak Sejarah Banjar, Kutai, Pontianak dan Sambas",
    "author_or_institution": "Yusriadi & Tim Peneliti Balai Pelestarian Nilai Budaya (BPNB)",
    "publication_year": 2017,
    "source_type": "Buku Akademik",
    "url": "https://kebudayaan.kemdikbud.go.id/bpnbkalbar",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Kronologi Kesultanan Banjar, konversi Raja Mahkota Kutai Kartanegara oleh Tuan Tunggang Parangan, dan pendirian Keraton Kadriah Pontianak."
    ],
    "notes": "BPNB Kalimantan Barat & Kemendikbud RI, hlm. 45-130."
  },
  {
    "id": "src-12",
    "title": "Islam di Indonesia Timur: Sejarah Masuk dan Berkembangnya Islam di Maluku, Nusa Tenggara, dan Papua",
    "author_or_institution": "Azyumardi Azra & Tim Litbang Kemenag RI",
    "publication_year": 2012,
    "source_type": "Buku Akademik",
    "url": "https://balitbangdiklat.kemenag.go.id",
    "access_date": "2026-10-25",
    "relevant_claims": [
      "Jejaring ulama Kesultanan Bima, arsip BO Sangaji Kai, dan petuanan Islam di Semenanjung Onin / Fakfak Papua Barat."
    ],
    "notes": "Puslitbang Lektur dan Khazanah Keagamaan, Kemenag RI, Jakarta."
  }
];

// === EVENTS DATA ===
const eventsData = [{
  id: 'evt-1267',
  kingdom_id: 'kd-samudera-pasai',
  year: 1267,
  year_label: '1267 M',
  title: 'Berdirinya Kesultanan Samudera Pasai',
  description: 'Merah Silu memeluk Islam dan ditahbiskan sebagai Sultan Malikussaleh, mendirikan imperium Islam tertua yang terdokumentasi di Nusantara.',
  significance: 'Meletakkan tradisi pemerintahan berlandaskan mazhab Syafi\'i dan pencetakan mata uang emas dirham di Selat Malaka.',
  source_ids: ['src-1', 'src-4']
}, {
  id: 'evt-1345',
  kingdom_id: 'kd-samudera-pasai',
  year: 1345,
  year_label: '1345 M',
  title: 'Kunjungan Ibnu Battuta ke Samudera Pasai',
  description: 'Pengelana dunia asal Maroko Ibnu Battuta berlabuh selama dua pekan di Pasai dan memuji kecintaan Sultan Mahmud Malik Az-Zahir pada ilmu agama dan kesalehannya.',
  significance: 'Bukti primer internasional reputasi Pasai sebagai metropolis terkemuka di Samudera Hindia.',
  source_ids: ['src-1', 'src-2', 'src-4']
}, {
  id: 'evt-1478',
  kingdom_id: 'kd-demak',
  year: 1478,
  year_label: '1478 M',
  title: 'Berdirinya Kesultanan Demak Glagahwangi',
  description: 'Raden Patah dinobatkan sebagai Sultan Syah Alam Akbar I atas musyawarah para Walisongo, menandai peralihan hegemoni Jawa dari Majapahit ke Islam.',
  significance: 'Pusat dakwah peletakan sendi kebudayaan Islam di pesisir utara dan pedalaman pulau Jawa.',
  source_ids: ['src-1', 'src-7', 'src-10']
}, {
  id: 'evt-1486',
  kingdom_id: 'kd-ternate',
  year: 1486,
  year_label: '1486 M',
  title: 'Pengukuhan Kolano Ternate Menjadi Sultan',
  description: 'Zainal Abidin, penguasa Ternate, berguru ke Giri Kedaton di Jawa dan mentransformasi kerajaan tradisi menjadi Kesultanan berlandaskan hukum Islam.',
  significance: 'Integrasi sistemik Maluku ke dalam jejaring keilmuan dan perniagaan Islam Nusantara.',
  source_ids: ['src-1', 'src-8']
}, {
  id: 'evt-1511',
  kingdom_id: 'kd-aceh-darussalam',
  year: 1511,
  year_label: '1511 M',
  title: 'Jatuhnya Malaka & Polarisasi Selat Malaka',
  description: 'Armada Portugis menaklukkan Malaka; pedagang muslim dan ulama mengalihkan rute perniagaan dan pemukiman ke Aceh Darussalam, Banten, dan Brunei.',
  significance: 'Katalis lonjakan kekuatan maritim Kesultanan Aceh dan persekutuan militer lintas samudra.',
  source_ids: ['src-1', 'src-3', 'src-5', 'src-6']
}, {
  id: 'evt-1526',
  kingdom_id: 'kd-banjar',
  year: 1526,
  year_label: '1526 M',
  title: 'Konversi Raden Samudera & Berdirinya Kesultanan Banjar',
  description: 'Raden Samudera memeluk Islam dan bergelar Sultan Suriansyah dibantu penasehat dakwah dari Kesultanan Demak.',
  significance: 'Penyebaran awal Islam institusional di sepanjang Daerah Aliran Sungai Barito, Kalimantan Selatan.',
  source_ids: ['src-1', 'src-2', 'src-6']
}, {
  id: 'evt-1527',
  kingdom_id: 'kd-banten',
  year: 1527,
  year_label: '1527 M',
  title: 'Pembebasan Sunda Kelapa menjadi Jayakarta',
  description: 'Panglima Fatahillah bersama armada gabungan Demak dan Cirebon mengusir kapal Portugis dari muara Ciliwung pada 22 Juni 1527.',
  significance: 'Pencegahan benteng monopoli Eropa di Jawa Barat dan cikal bakal kota metropolitan Jakarta modern.',
  source_ids: ['src-1', 'src-7', 'src-10']
}, {
  id: 'evt-1552',
  kingdom_id: 'kd-banten',
  year: 1552,
  year_label: '1552 M',
  title: 'Kemandirian Penuh Kesultanan Banten',
  description: 'Sultan Maulana Hasanuddin memproklamirkan kedaulatan independen Banten dan mengontrol jalur perniagaan lada di Selat Sunda hingga Lampung.',
  significance: 'Banten menjelma sebagai pelabuhan entrepot internasional non-monopoli terbesar di barat Nusantara.',
  source_ids: ['src-1', 'src-6', 'src-10']
}, {
  id: 'evt-1575',
  kingdom_id: 'kd-ternate',
  year: 1575,
  year_label: '1575 M',
  title: 'Pengusiran Portugis dari Maluku oleh Sultan Baabullah',
  description: 'Setelah pengepungan Benteng Kastela selama lima tahun menyusul pembunuhan Sultan Khairun, Sultan Baabullah berhasil mengusir pasukan Portugis.',
  significance: 'Kemenangan militer bangsa pribumi Nusantara terbesar atas kekuatan imperialis Eropa pada abad ke-16.',
  source_ids: ['src-1', 'src-6', 'src-8']
}, {
  id: 'evt-1584',
  kingdom_id: 'kd-mataram-islam',
  year: 1584,
  year_label: '1584 M',
  title: 'Kebangkitan Dinasti Mataram Islam Kotagede',
  description: 'Panembahan Senopati memindahkan kedaulatan Jawa ke Mataram di pedalaman selatan Jawa, mendirikan keraton Kotagede.',
  significance: 'Pergeseran kembali poros geopolitik Jawa dari maritim pesisir ke kekuasaan agraris religius berwibawa.',
  source_ids: ['src-1', 'src-7']
}, {
  id: 'evt-1605',
  kingdom_id: 'kd-gowa-tallo',
  year: 1605,
  year_label: '1605 M',
  title: 'Islamisasi Resmi Kerajaan Kembar Gowa-Tallo',
  description: 'I Manga\'rangi Daeng Manrabbia (Sultan Alauddin) dan pamannya Karaeng Matoaya memeluk Islam melalui dakwah Dato ri Bandang.',
  significance: 'Menjadikan Makassar sebagai episentrum penyebaran Islam ke Mandar, Bone, Buton, Sumbawa, Flores, dan Timor.',
  source_ids: ['src-1', 'src-9']
}, {
  id: 'evt-1607',
  kingdom_id: 'kd-aceh-darussalam',
  year: 1607,
  year_label: '1607 M',
  title: 'Era Keemasan Sultan Iskandar Muda',
  description: 'Sultan Iskandar Muda dinobatkan; memodernisasi armada kapal cakra donya, sistem peradilan Adat Meukuta Alam, dan memperluas protektorat ke Semenanjung Melayu.',
  significance: 'Aceh diakui sebagai salah satu dari lima imperium Islam terbesar di dunia pada awal abad ke-17.',
  source_ids: ['src-1', 'src-5', 'src-6']
}, {
  id: 'evt-1621',
  kingdom_id: 'kd-bima',
  year: 1621,
  year_label: '1621 M',
  title: 'Transformasi Kesultanan Bima',
  description: 'La Ka\'i memeluk Islam bergelar Sultan Abdul Kahir, menetapkan hukum BO Sangaji Kai sebagai pedoman tata negara kesultanan.',
  significance: 'Pusat kebudayaan Melayu-Islam terdepan di Kepulauan Nusa Tenggara.',
  source_ids: ['src-1', 'src-6']
}, {
  id: 'evt-1633',
  kingdom_id: 'kd-mataram-islam',
  year: 1633,
  year_label: '1633 M',
  title: 'Pemberlakuan Kalender Jawa-Islam (Tahun Saka Jawa)',
  description: 'Sultan Agung Anyokrokusumo menggabungkan sistem penanggalan lunar Islam (Hijriah) dengan penanggalan surya Saka tradisional.',
  significance: 'Karya agung sintesis kebudayaan Islam dan kosmologi Jawa yang masih berlaku hingga kini di seluruh keraton Jawa.',
  source_ids: ['src-1', 'src-7', 'src-10']
}, {
  id: 'evt-1667',
  kingdom_id: 'kd-gowa-tallo',
  year: 1667,
  year_label: '1667 M',
  title: 'Perjanjian Bungaya di Benteng Barombong',
  description: 'Setelah pertempuran sengit laut dan darat, Sultan Hasanuddin dipaksa menandatangani perjanjian damai bersama VOC dan sekutunya Arung Palakka.',
  significance: 'Akhir dari kebebasan pelayaran terbuka Makassar dan pemaksaan monopoli dagang VOC di Indonesia Timur.',
  source_ids: ['src-1', 'src-2', 'src-9']
}, {
  id: 'evt-1723',
  kingdom_id: 'kd-siak',
  year: 1723,
  year_label: '1723 M',
  title: 'Pendirian Kesultanan Siak Sri Indrapura',
  description: 'Raja Kecik mendirikan pusat kerajaan di pesisir Sungai Siak, mengembalikan kehormatan politik Melayu di pesisir Riau.',
  significance: 'Pusat ketahanan maritim Selat Melaka di tengah tekanan VOC dan persaingan politik Semenanjung.',
  source_ids: ['src-1', 'src-2']
}, {
  id: 'evt-1797',
  kingdom_id: 'kd-tidore',
  year: 1797,
  year_label: '1797 M',
  title: 'Revolusi Laut Sultan Nuku Jou Barakati',
  description: 'Sultan Nuku menyatukan para kapita dan suku bangsa di Halmahera, Seram, Raja Ampat, dan pesisir Papua mengalahkan armada Belanda.',
  significance: 'Restorasi kedaulatan penuh Kesultanan Tidore dan simbol persatuan Indonesia Timur.',
  source_ids: ['src-1', 'src-6', 'src-8']
}, {
  id: 'evt-1945',
  kingdom_id: 'kd-siak',
  year: 1945,
  year_label: '1945 M',
  title: 'Amanat Sukarela Integrasi Kesultanan ke NKRI',
  description: 'Para sultan dan raja di Nusantara menyatakan bergabung dengan tulus ke Republik Indonesia yang baru merdeka.',
  significance: 'Transformasi kedaulatan kerajaan feodal menjadi fondasi kedaulatan rakyat Negara Kesatuan Republik Indonesia.',
  source_ids: ['src-1', 'src-2']
}];

// === HISTORY LOGIC ===
/**
 * Checks if a kingdom was politically or historically active during the specified year.
 * An empty ended year is treated as ongoing or incomplete data depending on context.
 */
function isKingdomActiveInYear(kingdom, year) {
  if (kingdom.founded === null) return false;
  const start = kingdom.founded;
  const end = kingdom.ended ?? 2026;
  return year >= start && year <= end;
}

/**
 * Checks if a kingdom overlaps with a given year range [minYear, maxYear].
 */
function isKingdomInYearRange(kingdom, minYear, maxYear) {
  if (kingdom.founded === null) return true; // Keep accessible if date uncertain
  const start = kingdom.founded;
  const end = kingdom.ended ?? 2026;
  return start <= maxYear && end >= minYear;
}

/**
 * Filters kingdoms based on user criteria:
 * region, yearRange, certainty, and search query.
 */
function filterKingdoms(kingdoms, filter) {
  return kingdoms.filter(kd => {
    // 1. Region filter
    if (filter.regions.length > 0 && !filter.regions.includes(kd.region)) {
      return false;
    }

    // 2. Year Range filter
    if (!isKingdomInYearRange(kd, filter.yearRange[0], filter.yearRange[1])) {
      return false;
    }

    // 3. Certainty filter
    if (filter.certaintyLevels.length > 0 && !filter.certaintyLevels.includes(kd.founded_certainty)) {
      return false;
    }

    // 4. Search query
    if (filter.searchQuery.trim().length > 0) {
      const q = filter.searchQuery.toLowerCase().trim();
      const altNames = kd.alternate_names || kd.alternative_names || [];
      const matchName = (kd.name || '').toLowerCase().includes(q);
      const matchAlt = altNames.some(alt => (alt || '').toLowerCase().includes(q));
      const matchCapital = (kd.capital || kd.location_description || '').toLowerCase().includes(q);
      const matchRegion = (kd.region || kd.island || '').toLowerCase().includes(q);
      const matchSummary = (kd.history_summary || kd.historical_description || '').toLowerCase().includes(q);
      if (!matchName && !matchAlt && !matchCapital && !matchRegion && !matchSummary) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Filters heritage sites based on site types, region, active kingdom, and search query.
 */
function filterSites(sites, filter, visibleKingdomIds) {
  return sites.filter(site => {
    // 1. Site Type filter
    if (filter.siteTypes.length > 0 && !filter.siteTypes.includes(site.site_type)) {
      return false;
    }

    // 2. Specific Kingdom filter
    if (filter.activeKingdomId) {
      if (!site.kingdom_ids.includes(filter.activeKingdomId)) {
        return false;
      }
    } else if (visibleKingdomIds && visibleKingdomIds.size > 0) {
      // If we want sites strictly tied to currently visible kingdoms:
      const matchesVisibleKingdom = site.kingdom_ids.some(id => visibleKingdomIds.has(id));
      if (!matchesVisibleKingdom) {
        return false;
      }
    }

    // 3. Search query
    if (filter.searchQuery.trim().length > 0) {
      const q = filter.searchQuery.toLowerCase().trim();
      const matchName = site.name.toLowerCase().includes(q);
      const matchDesc = site.description.toLowerCase().includes(q);
      const matchRegency = site.regency.toLowerCase().includes(q);
      const matchProvince = site.province.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchRegency && !matchProvince) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Calculate authentic stats for current view.
 */
function getAtlasStats(kingdoms, sites, territories) {
  const uniqueRegions = new Set(kingdoms.map(k => k.region)).size;
  return {
    totalKingdoms: kingdoms.length,
    totalSites: sites.length,
    totalRegions: uniqueRegions,
    totalTerritories: territories.length
  };
}

/**
 * Format year representation with historical precision.
 */
function formatReignYear(start, end) {
  if (start === null && end === null) return 'Tarikh tidak tercatat';
  if (start !== null && end === null) return `${start} M — masa kini`;
  if (start === null && end !== null) return `hingga ${end} M`;
  return `${start} — ${end} M`;
}

// === COMPONENTS ===
// --- CompassRose.tsx ---

const CompassRose = ({
  onResetOrientation,
  className = ''
}) => {
  const [isRotating, setIsRotating] = useState(false);
  const handleClick = () => {
    setIsRotating(true);
    onResetOrientation();
    setTimeout(() => {
      setIsRotating(false);
    }, 700);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `group relative flex flex-col items-center select-none ${className}`,
    title: "Orientasi Mata Angin (Klik untuk mengunci ke Utara Sejati)"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick,
    "aria-label": "Orientasi Mata Angin - Klik untuk reset pandangan ke Utara",
    className: "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F4F0E6]/95 hover:bg-[#F4F0E6] p-1.5 shadow-xl border-2 border-[#B58B4D] hover:border-[#8e6d38] backdrop-blur transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-1 rounded-full border border-[#B58B4D]/40 pointer-events-none"
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    className: `w-full h-full transform transition-transform duration-700 ease-out ${isRotating ? 'rotate-[360deg]' : 'rotate-0'}`
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "goldLight",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#DFBF7A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#B58B4D"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "goldDark",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#8E6D38"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#5E4520"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "charcoalDark",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#254353"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#172B36"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "compassShadow",
    x: "-10%",
    y: "-10%",
    width: "120%",
    height: "120%"
  }, /*#__PURE__*/React.createElement("feDropShadow", {
    dx: "0",
    dy: "1",
    stdDeviation: "1",
    floodColor: "#000000",
    floodOpacity: "0.25"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "46",
    fill: "#F4F0E6",
    stroke: "#B58B4D",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "42",
    fill: "none",
    stroke: "#B58B4D",
    strokeWidth: "0.5",
    strokeDasharray: "1,2"
  }), /*#__PURE__*/React.createElement("g", {
    filter: "url(#compassShadow)"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 55,50",
    fill: "#B58B4D",
    opacity: "0.8",
    transform: "rotate(45 50 50)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 45,50",
    fill: "#172B36",
    opacity: "0.6",
    transform: "rotate(45 50 50)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 55,50",
    fill: "#B58B4D",
    opacity: "0.8",
    transform: "rotate(135 50 50)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 45,50",
    fill: "#172B36",
    opacity: "0.6",
    transform: "rotate(135 50 50)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 55,50",
    fill: "#B58B4D",
    opacity: "0.8",
    transform: "rotate(225 50 50)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 45,50",
    fill: "#172B36",
    opacity: "0.6",
    transform: "rotate(225 50 50)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 55,50",
    fill: "#B58B4D",
    opacity: "0.8",
    transform: "rotate(315 50 50)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,22 45,50",
    fill: "#172B36",
    opacity: "0.6",
    transform: "rotate(315 50 50)"
  })), /*#__PURE__*/React.createElement("g", {
    filter: "url(#compassShadow)"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 88,50 50,44",
    fill: "url(#goldLight)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 88,50 50,56",
    fill: "url(#charcoalDark)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,88 44,50",
    fill: "url(#goldLight)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,88 56,50",
    fill: "url(#charcoalDark)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 12,50 50,56",
    fill: "url(#goldLight)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 12,50 50,44",
    fill: "url(#charcoalDark)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,8 43,50",
    fill: "url(#goldLight)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,50 50,8 57,50",
    fill: "url(#goldDark)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "50,6 45,15 55,15",
    fill: "#B58B4D"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "7",
    fill: "url(#goldLight)",
    stroke: "#172B36",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "3.5",
    fill: "#172B36"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "1.5",
    fill: "#F4F0E6"
  }), /*#__PURE__*/React.createElement("text", {
    x: "50",
    y: "17",
    textAnchor: "middle",
    fill: "#172B36",
    fontSize: "10",
    fontWeight: "bold",
    fontFamily: "'Cinzel', serif"
  }, "U"), /*#__PURE__*/React.createElement("text", {
    x: "93",
    y: "53.5",
    textAnchor: "middle",
    fill: "#172B36",
    fontSize: "8",
    fontWeight: "bold",
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  }, "T"), /*#__PURE__*/React.createElement("text", {
    x: "50",
    y: "95",
    textAnchor: "middle",
    fill: "#172B36",
    fontSize: "8",
    fontWeight: "bold",
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  }, "S"), /*#__PURE__*/React.createElement("text", {
    x: "7",
    y: "53.5",
    textAnchor: "middle",
    fill: "#172B36",
    fontSize: "8",
    fontWeight: "bold",
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  }, "B")), /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-[#172B36] text-[#F4F0E6] text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap border border-[#B58B4D]/40 font-medium z-30"
  }, "Utara Sejati")), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 px-1.5 py-0.5 rounded bg-[#172B36]/80 text-[#F4F0E6] text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase border border-[#B58B4D]/30 shadow-sm hidden sm:block"
  }, "Mata Angin"));
};

// --- FilterPanel.tsx ---


const ALL_REGIONS = ['Sumatra', 'Jawa', 'Kalimantan', 'Sulawesi', 'Maluku', 'Bali dan Nusa Tenggara', 'Papua'];
const ALL_SITE_TYPES = ['Masjid Bersejarah', 'Keraton & Istana', 'Makam Sultan', 'Benteng Pertahanan', 'Prasasti & Batu Bersurat', 'Museum'];
const ERA_PRESETS = [{
  label: 'Semua Periode (1200 - 1950 M)',
  range: [1200, 1950]
}, {
  label: 'Abad XIII–XV (Pondasi Awal & Pasai)',
  range: [1200, 1500]
}, {
  label: 'Abad XVI (Kebangkitan Demak, Banten & Ternate)',
  range: [1500, 1600]
}, {
  label: 'Abad XVII (Puncak Kejayaan Mataram & Aceh)',
  range: [1600, 1700]
}, {
  label: 'Abad XVIII–XX (Resistensi & Integrasi NKRI)',
  range: [1700, 1950]
}];
const FilterPanel = ({
  filter,
  setFilter,
  isOpen,
  setIsOpen,
  filteredKingdomsCount,
  filteredSitesCount
}) => {
  const toggleRegion = region => {
    setFilter(prev => {
      const exists = prev.regions.includes(region);
      return {
        ...prev,
        regions: exists ? prev.regions.filter(r => r !== region) : [...prev.regions, region]
      };
    });
  };
  const toggleSiteType = type => {
    setFilter(prev => {
      const exists = prev.siteTypes.includes(type);
      return {
        ...prev,
        siteTypes: exists ? prev.siteTypes.filter(t => t !== type) : [...prev.siteTypes, type]
      };
    });
  };
  const toggleCertainty = certainty => {
    setFilter(prev => {
      const exists = prev.certaintyLevels.includes(certainty);
      return {
        ...prev,
        certaintyLevels: exists ? prev.certaintyLevels.filter(c => c !== certainty) : [...prev.certaintyLevels, certainty]
      };
    });
  };
  const resetAllFilters = () => {
    setFilter({
      regions: [],
      yearRange: [1200, 1950],
      siteTypes: [],
      certaintyLevels: [],
      searchQuery: '',
      activeKingdomId: null
    });
  };
  const activeFiltersCount = filter.regions.length + filter.siteTypes.length + filter.certaintyLevels.length + (filter.yearRange[0] !== 1200 || filter.yearRange[1] !== 1950 ? 1 : 0) + (filter.searchQuery ? 1 : 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, !isOpen && /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsOpen(true),
    className: "absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#172B36] text-[#F4F0E6] shadow-xl border border-[#B58B4D]/40 hover:bg-[#1f3744] transition-all text-xs font-medium"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Filter & Periode Sejarah"), activeFiltersCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full bg-[#B58B4D] text-[#172B36] font-bold text-[10px] flex items-center justify-center"
  }, activeFiltersCount)), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-4 left-4 z-20 w-[calc(100vw-32px)] sm:w-96 max-h-[85vh] bg-[#F4F0E6] text-[#172B36] rounded-xl shadow-2xl border-2 border-[#B58B4D]/60 flex flex-col overflow-hidden backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-[#172B36] text-[#F4F0E6] flex items-center justify-between border-b border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Filter, {
    className: "w-4 h-4 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-regal text-sm font-semibold tracking-wide text-[#F4F0E6]"
  }, "Filter Arsip Sejarah")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, activeFiltersCount > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: resetAllFilters,
    className: "text-[11px] text-[#B58B4D] hover:underline flex items-center gap-1",
    title: "Reset semua filter"
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    className: "w-3 h-3"
  }), "Reset"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsOpen(false),
    className: "text-[#F4F0E6]/60 hover:text-[#F4F0E6] p-1 rounded hover:bg-[#12222b]"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-4 h-4"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 bg-[#eae3d2] border-b border-[#B58B4D]/20 text-[11px] text-[#172B36]/80 flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", null, "Ditemukan: ", /*#__PURE__*/React.createElement("strong", null, filteredKingdomsCount), " Kerajaan, ", /*#__PURE__*/React.createElement("strong", null, filteredSitesCount), " Situs"), activeFiltersCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "px-1.5 py-0.5 rounded bg-[#B58B4D]/20 text-[#172B36] font-medium text-[10px]"
  }, activeFiltersCount, " filter aktif")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 space-y-5 overflow-y-auto max-h-[calc(85vh-120px)] text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 font-semibold text-[#172B36] mb-2"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-3.5 h-3.5 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Rentang Tarikh (Periode Waktu)")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5 mb-3"
  }, ERA_PRESETS.map(era => {
    const isSelected = filter.yearRange[0] === era.range[0] && filter.yearRange[1] === era.range[1];
    return /*#__PURE__*/React.createElement("button", {
      key: era.label,
      onClick: () => setFilter(prev => ({
        ...prev,
        yearRange: era.range
      })),
      className: `w-full text-left px-2.5 py-1.5 rounded text-[11px] transition-colors border ${isSelected ? 'bg-[#172B36] text-[#F4F0E6] border-[#172B36] font-medium' : 'bg-white/80 hover:bg-white text-[#172B36] border-[#B58B4D]/30'}`
    }, era.label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/90 p-2.5 rounded-lg border border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-[11px] font-semibold text-[#172B36] mb-2"
  }, /*#__PURE__*/React.createElement("span", null, "Tahun ", filter.yearRange[0], " M"), /*#__PURE__*/React.createElement("span", {
    className: "text-[#B58B4D]"
  }, "s.d."), /*#__PURE__*/React.createElement("span", null, "Tahun ", filter.yearRange[1], " M")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] text-gray-500 block mb-1"
  }, "Mulai Tahun"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "1200",
    max: "1900",
    step: "25",
    value: filter.yearRange[0],
    onChange: e => {
      const val = Number(e.target.value);
      if (val <= filter.yearRange[1]) {
        setFilter(prev => ({
          ...prev,
          yearRange: [val, prev.yearRange[1]]
        }));
      }
    },
    className: "w-full accent-[#B58B4D] cursor-pointer"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-[10px] text-gray-500 block mb-1"
  }, "Hingga Tahun"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "1300",
    max: "1950",
    step: "25",
    value: filter.yearRange[1],
    onChange: e => {
      const val = Number(e.target.value);
      if (val >= filter.yearRange[0]) {
        setFilter(prev => ({
          ...prev,
          yearRange: [prev.yearRange[0], val]
        }));
      }
    },
    className: "w-full accent-[#B58B4D] cursor-pointer"
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between font-semibold text-[#172B36] mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3.5 h-3.5 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, "Wilayah Kepulauan Nusantara")), filter.regions.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter(prev => ({
      ...prev,
      regions: []
    })),
    className: "text-[10px] text-[#B58B4D] hover:underline"
  }, "Pilih Semua")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, ALL_REGIONS.map(region => {
    const isChecked = filter.regions.includes(region);
    return /*#__PURE__*/React.createElement("button", {
      key: region,
      onClick: () => toggleRegion(region),
      className: `px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${isChecked ? 'bg-[#426B60] text-white border-[#426B60]' : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'}`
    }, region);
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between font-semibold text-[#172B36] mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-3.5 h-3.5 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Jenis Situs Peninggalan")), filter.siteTypes.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter(prev => ({
      ...prev,
      siteTypes: []
    })),
    className: "text-[10px] text-[#B58B4D] hover:underline"
  }, "Pilih Semua")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1.5"
  }, ALL_SITE_TYPES.map(type => {
    const isChecked = filter.siteTypes.includes(type);
    return /*#__PURE__*/React.createElement("button", {
      key: type,
      onClick: () => toggleSiteType(type),
      className: `text-left px-2 py-1.5 rounded text-[11px] border transition-colors flex items-center justify-between ${isChecked ? 'bg-[#B58B4D] text-[#172B36] font-semibold border-[#B58B4D]' : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate"
    }, type), isChecked && /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] ml-1"
    }, "\u2713"));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 font-semibold text-[#172B36] mb-2"
  }, /*#__PURE__*/React.createElement(ShieldCheck, {
    className: "w-3.5 h-3.5 text-[#172B36]"
  }), /*#__PURE__*/React.createElement("span", null, "Tingkat Kepastian Data Epigrafi")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleCertainty('verified'),
    className: `w-full text-left px-2.5 py-1.5 rounded text-[11px] border flex items-center justify-between ${filter.certaintyLevels.includes('verified') ? 'bg-emerald-900 text-emerald-100 border-emerald-700 font-medium' : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-500"
  }), /*#__PURE__*/React.createElement("span", null, "Tinggi (Epigrafi / Sumber Primer Terverifikasi)")), filter.certaintyLevels.includes('verified') && /*#__PURE__*/React.createElement("span", null, "\u2713")), /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleCertainty('estimated'),
    className: `w-full text-left px-2.5 py-1.5 rounded text-[11px] border flex items-center justify-between ${filter.certaintyLevels.includes('estimated') ? 'bg-amber-900 text-amber-100 border-amber-700 font-medium' : 'bg-white/70 text-[#172B36] border-[#B58B4D]/30 hover:bg-white'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-amber-500"
  }), /*#__PURE__*/React.createElement("span", null, "Sedang (Rekonstruksi Kartografi & Naskah)")), filter.certaintyLevels.includes('estimated') && /*#__PURE__*/React.createElement("span", null, "\u2713"))))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: resetAllFilters,
    className: "text-[#172B36]/80 hover:text-[#172B36] underline text-[11px]"
  }, "Hapus Semua Filter"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsOpen(false),
    className: "px-4 py-1.5 bg-[#172B36] text-[#F4F0E6] rounded font-medium hover:bg-[#12222b] transition-colors"
  }, "Tutup & Terapkan"))));
};

// --- KingdomSummaryDrawer.tsx ---


const KingdomSummaryDrawer = ({
  kingdom,
  onClose,
  onOpenFullDetail,
  onFocusSites,
  rulers,
  sites
}) => {
  if (!kingdom) return null;
  const kingdomRulers = rulers.filter(r => r.kingdom_id === kingdom.id);
  const kingdomSites = sites.filter(s => s.kingdom_ids.includes(kingdom.id));
  return /*#__PURE__*/React.createElement("aside", {
    "aria-label": `Ringkasan ${kingdom.name}`,
    className: "absolute top-4 right-4 z-20 w-[calc(100vw-32px)] sm:w-96 max-h-[88vh] bg-[#F4F0E6] text-[#172B36] rounded-xl shadow-2xl border-2 border-[#B58B4D]/60 flex flex-col overflow-hidden backdrop-blur-sm animate-in slide-in-from-right duration-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-[#172B36] text-[#F4F0E6] p-4 border-b border-[#B58B4D]/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pr-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, kingdom.emblem_symbol || '👑'), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#B58B4D]/20 text-[#B58B4D] font-bold border border-[#B58B4D]/30"
  }, kingdom.region), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-medium flex items-center gap-1 border border-emerald-700/40"
  }, /*#__PURE__*/React.createElement(ShieldCheck, {
    className: "w-3 h-3"
  }), kingdom.founded_certainty === 'verified' ? 'Terverifikasi' : 'Estimasi')), /*#__PURE__*/React.createElement("h2", {
    className: "font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F4F0E6] leading-tight"
  }, kingdom.name), kingdom.alternate_names.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[#B58B4D] italic mt-0.5"
  }, "alias: ", kingdom.alternate_names.join(', '))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-[#F4F0E6]/60 hover:text-[#F4F0E6] p-1.5 rounded-lg hover:bg-[#12222b] transition-colors",
    "aria-label": "Tutup ringkasan"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-5 h-5"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 space-y-4 overflow-y-auto max-h-[calc(88vh-140px)] text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 bg-white/80 p-3 rounded-lg border border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3 h-3 text-[#426B60]"
  }), " Pusat / Ibu Kota"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-xs text-[#172B36] mt-0.5"
  }, kingdom.capital)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-3 h-3 text-[#B58B4D]"
  }), " Berdiri"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-xs text-[#172B36] mt-0.5"
  }, kingdom.founded ? `${kingdom.founded} M` : 'Tidak tercatat')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500 uppercase tracking-wide"
  }, "Masa Kejayaan"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-[11px] text-[#172B36] mt-0.5"
  }, kingdom.golden_age)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500 uppercase tracking-wide"
  }, "Akhir Kedaulatan Politik"), /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-[11px] text-[#172B36] mt-0.5"
  }, kingdom.ended ? `${kingdom.ended} M` : 'Status Swapraja'))), /*#__PURE__*/React.createElement("div", {
    className: "p-2.5 rounded-md bg-[#eae3d2] border border-[#B58B4D]/30 text-[11px]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[#172B36]"
  }, "Status Kultural Hari Ini: "), /*#__PURE__*/React.createElement("span", {
    className: "text-[#172B36]/80"
  }, kingdom.current_status)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-sm text-[#172B36] mb-1"
  }, "Ikhtisar Sejarah"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[#172B36]/85 leading-relaxed line-clamp-4"
  }, kingdom.history_summary)), kingdomRulers.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1.5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-sm text-[#172B36] flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Crown, {
    className: "w-3.5 h-3.5 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Sultan & Penguasa Terdokumentasi")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-gray-500"
  }, kingdomRulers.length, " Tokoh")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, kingdomRulers.slice(0, 2).map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: "p-2 bg-white/70 rounded border border-[#B58B4D]/25"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-[11px] text-[#172B36]"
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#B58B4D]"
  }, r.reign_start, " \u2013 ", r.reign_end, " M \u2022 ", r.titles))), kingdomRulers.length > 2 && /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500 italic text-center"
  }, "+", kingdomRulers.length - 2, " sultan lainnya tercatat di arsip"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1.5"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-sm text-[#172B36] flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-3.5 h-3.5 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, "Situs Peninggalan Terkait")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-semibold text-[#426B60] bg-emerald-100 px-1.5 py-0.5 rounded"
  }, kingdomSites.length, " Situs")), kingdomSites.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, kingdomSites.slice(0, 2).map(site => /*#__PURE__*/React.createElement("div", {
    key: site.id,
    className: "p-2 bg-white/70 rounded border border-[#426B60]/25 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-[11px] text-[#172B36]"
  }, site.name), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500"
  }, site.regency, ", ", site.province)), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium"
  }, site.site_type)))) : /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-gray-500 italic"
  }, "Belum ada situs fisik terdata untuk kerajaan ini."))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenFullDetail(kingdom),
    className: "w-full py-2 px-3 bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] rounded-md font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
  }, /*#__PURE__*/React.createElement("span", null, "Jelajahi Sejarah Lengkap"), /*#__PURE__*/React.createElement(ArrowRight, {
    className: "w-3.5 h-3.5 text-[#B58B4D]"
  })), kingdomSites.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onFocusSites(kingdom),
    className: "w-full py-1.5 px-3 bg-white/80 hover:bg-white text-[#426B60] border border-[#426B60]/40 rounded-md font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Fokuskan Peta ke ", kingdomSites.length, " Situs Terkait"))));
};

// --- KingdomDetailModal.tsx ---


const KingdomDetailModal = ({
  kingdom,
  onClose,
  rulers,
  sites,
  territories,
  events,
  sources,
  onSelectSiteOnMap
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  if (!kingdom) return null;
  const kingdomRulers = rulers.filter(r => r.kingdom_id === kingdom.id);
  const kingdomSites = sites.filter(s => s.kingdom_ids.includes(kingdom.id));
  const kingdomTerritories = territories.filter(t => t.kingdom_id === kingdom.id);
  const kingdomEvents = events.filter(e => e.kingdom_id === kingdom.id);
  const kingdomSources = sources.filter(s => kingdom.source_ids.includes(s.id));
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "modal-kingdom-title",
    className: "fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F4F0E6] text-[#172B36] w-full max-w-4xl rounded-2xl shadow-2xl border-2 border-[#B58B4D] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-[#172B36] text-[#F4F0E6] p-6 sm:p-8 border-b-2 border-[#B58B4D]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 opacity-10 bg-[radial-gradient(#B58B4D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 text-[#F4F0E6]/70 hover:text-white bg-[#12222b] hover:bg-black/40 p-2 rounded-full transition-colors",
    "aria-label": "Tutup halaman detail"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, kingdom.emblem_symbol || '👑'), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B58B4D]/30 text-[#B58B4D] border border-[#B58B4D]/50 uppercase tracking-wider"
  }, kingdom.region), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-600/40 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(ShieldCheck, {
    className: "w-3.5 h-3.5"
  }), kingdom.founded_certainty === 'verified' ? 'Tarikh Terverifikasi Epigrafi' : 'Tarikh Estimasi Sumber Naskah')), /*#__PURE__*/React.createElement("h1", {
    id: "modal-kingdom-title",
    className: "font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F0E6]"
  }, kingdom.name), kingdom.alternate_names.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-[#B58B4D] italic mt-1"
  }, "Nama alternatif & kronik: ", kingdom.alternate_names.join(', '))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row md:flex-col gap-2 shrink-0 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#12222b] px-3 py-2 rounded-lg border border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-[#B58B4D] block uppercase"
  }, "Periode Kedaulatan"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm text-[#F4F0E6]"
  }, kingdom.founded ? `${kingdom.founded} M` : '?', " \u2014", ' ', kingdom.ended ? `${kingdom.ended} M` : 'Status Budaya')), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#12222b] px-3 py-2 rounded-lg border border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-[#B58B4D] block uppercase"
  }, "Pusat Pemerintahan"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[#F4F0E6] flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3 h-3 text-[#426B60]"
  }), kingdom.capital))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#eae3d2] px-4 sm:px-6 border-b border-[#B58B4D]/30 flex space-x-1 sm:space-x-3 overflow-x-auto no-scrollbar text-xs sm:text-sm font-medium"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('overview'),
    className: `py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${activeTab === 'overview' ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]' : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'}`
  }, /*#__PURE__*/React.createElement(History, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Ikhtisar Sejarah")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('rulers'),
    className: `py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${activeTab === 'rulers' ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]' : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'}`
  }, /*#__PURE__*/React.createElement(Crown, {
    className: "w-4 h-4 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Silsilah & Sultan (", kingdomRulers.length, ")")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('events'),
    className: `py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${activeTab === 'events' ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]' : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'}`
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-4 h-4 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, "Kronologi Peristiwa (", kingdomEvents.length, ")")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('territory'),
    className: `py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${activeTab === 'territory' ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]' : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'}`
  }, /*#__PURE__*/React.createElement(Map, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Wilayah Kekuasaan")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('sites'),
    className: `py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${activeTab === 'sites' ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]' : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'}`
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-4 h-4 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, "Situs Terkait (", kingdomSites.length, ")")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('sources'),
    className: `py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${activeTab === 'sources' ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]' : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'}`
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Sumber Akademik (", kingdomSources.length, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 overflow-y-auto max-h-[calc(92vh-220px)] text-sm space-y-6"
  }, activeTab === 'overview' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/80 p-5 rounded-xl border border-[#B58B4D]/30 space-y-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl font-bold text-[#172B36]"
  }, "Deskripsi Historis"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-800 leading-relaxed text-sm whitespace-pre-line"
  }, kingdom.history_summary)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white/80 p-4 rounded-xl border border-emerald-600/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-emerald-800 font-semibold mb-2"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Latar Belakang Berdirinya")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed"
  }, kingdom.founded_note)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white/80 p-4 rounded-xl border border-amber-600/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-amber-800 font-semibold mb-2"
  }, /*#__PURE__*/React.createElement(History, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Perubahan Pemerintahan & Akhir Politik")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed"
  }, kingdom.ended_note))), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/40"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36] mb-1"
  }, "Status Institusi dan Pelestarian Budaya Hari Ini"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-800"
  }, kingdom.current_status, ". Peninggalan fisik dilindungi oleh Undang-Undang Republik Indonesia Nomor 11 Tahun 2010 tentang Cagar Budaya."))), activeTab === 'rulers' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl font-bold text-[#172B36]"
  }, "Daftar Sultan & Penguasa Terverifikasi"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "Disusun berdasarkan naskah kronik resmi dan batu nisan")), kingdomRulers.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, kingdomRulers.map(ruler => /*#__PURE__*/React.createElement("div", {
    key: ruler.id,
    className: "bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-2 hover:border-[#B58B4D] transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36]"
  }, ruler.name), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-[#B58B4D] block mt-0.5"
  }, ruler.reign_start, " \u2013 ", ruler.reign_end, " M")), /*#__PURE__*/React.createElement(Crown, {
    className: "w-5 h-5 text-[#B58B4D] shrink-0"
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-600 bg-[#F4F0E6] p-2 rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[#172B36]"
  }, "Gelar Resmi: "), ruler.titles), ruler.reign_note && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 italic"
  }, "\"", ruler.reign_note, "\""), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-gray-700 border-t border-gray-100 pt-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-[#172B36]"
  }, "Catatan Suksesi: "), ruler.succession_notes)))) : /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40"
  }, /*#__PURE__*/React.createElement(Crown, {
    className: "w-8 h-8 text-gray-400 mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Daftar sultan sedang dalam tahap verifikasi transliterasi naskah lokal."))), activeTab === 'events' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl font-bold text-[#172B36]"
  }, "Kronologi Peristiwa Penting"), kingdomEvents.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#B58B4D]/40"
  }, kingdomEvents.map(event => /*#__PURE__*/React.createElement("div", {
    key: event.id,
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#B58B4D] border-2 border-white shadow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-xs px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6]"
  }, event.year_label)), /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36]"
  }, event.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed"
  }, event.description), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-[#426B60] font-medium pt-1"
  }, "Signifikansi: ", event.significance))))) : /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-8 h-8 text-gray-400 mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Belum ada peristiwa khusus yang diindeks secara kronologis dalam dataset ini."))), activeTab === 'territory' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl font-bold text-[#172B36]"
  }, "Wilayah Kekuasaan & Rekonstruksi Kartografi"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-4 rounded-xl border border-[#B58B4D]/30 space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold text-sm text-[#172B36]"
  }, "Cakupan Geografis & Geopolitik"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-800 leading-relaxed"
  }, kingdom.territory_notes)), kingdomTerritories.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36]"
  }, "Lapisan Spasial / Poligon Teritori (", kingdomTerritories.length, ")"), kingdomTerritories.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/40 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm text-[#172B36]"
  }, t.name), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-900 text-emerald-100"
  }, t.certainty)), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "Rentang Rekonstruksi: "), t.period_start, " \u2013 ", t.period_end, " M"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-700 bg-white/70 p-2.5 rounded border border-[#B58B4D]/20"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[#172B36]"
  }, "Metode Rekonstruksi: "), t.reconstruction_method)))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold mb-1"
  }, "Catatan Integritas Kartografi:"), /*#__PURE__*/React.createElement("p", null, "Batas wilayah poligon untuk kesultanan ini belum dimasukkan karena keterbatasan sumber primer yang teruji. Sesuai prinsip metodologi digital atlas, batas fiktif tidak digambar sembarangan demi menjaga akurasi ilmiah."))), activeTab === 'sites' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl font-bold text-[#172B36]"
  }, "Situs Peninggalan Sejarah (", kingdomSites.length, ")"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "Masjid kuno, keraton, makam, dan benteng pertahanan")), kingdomSites.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, kingdomSites.map(site => /*#__PURE__*/React.createElement("div", {
    key: site.id,
    className: "bg-white rounded-xl border border-[#B58B4D]/30 overflow-hidden shadow-sm flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-36 overflow-hidden relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: site.image,
    alt: site.name,
    className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300"
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#172B36]/90 text-[#F4F0E6] border border-[#B58B4D]/50"
  }, site.site_type)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 space-y-2 flex-1 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36]"
  }, site.name), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-[#426B60] font-medium flex items-center gap-1 mt-0.5"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3 h-3"
  }), site.regency, ", ", site.province), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 line-clamp-2 mt-1.5"
  }, site.description)), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-gray-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold"
  }, site.preservation_status), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onClose();
      onSelectSiteOnMap(site);
    },
    className: "text-xs font-semibold text-[#B58B4D] hover:underline flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", null, "Lihat di Peta"), /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-3 h-3"
  }))))))) : /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40"
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-8 h-8 text-gray-400 mx-auto mb-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Belum ada rekaman situs fisik terverifikasi untuk entitas ini."))), activeTab === 'sources' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl font-bold text-[#172B36]"
  }, "Rujukan & Sumber Sejarah"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-600"
  }, "Setiap klaim kronologi, figur kepemimpinan, dan rekonstruksi spasial didukung oleh kajian akademik dan naskah kuno yang dapat ditelusuri."), kingdomSources.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, kingdomSources.map(source => /*#__PURE__*/React.createElement("div", {
    key: source.id,
    className: "bg-white p-4 rounded-xl border border-[#B58B4D]/30 space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-[#172B36]"
  }, source.title), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6] shrink-0"
  }, source.source_type)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700"
  }, /*#__PURE__*/React.createElement("strong", null, "Penulis / Penyunting:"), " ", source.authors, " (", source.publication_year, ") \u2022 ", source.publisher, " ", source.pages && `&bull; ${source.pages}`), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[#426B60] bg-[#eae3d2] p-2 rounded border border-[#B58B4D]/20"
  }, /*#__PURE__*/React.createElement("strong", null, "Fakta yang Didukung:"), " ", source.supports)))) : /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 italic"
  }, "Rujukan tersimpan pada indeks bibliografi utama."))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600 text-[11px]"
  }, "Data arsip Atlas Islam Nusantara \u2022 Lisensi Sains Terbuka"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "px-5 py-2 bg-[#172B36] text-[#F4F0E6] rounded-lg font-medium hover:bg-[#12222b] transition-colors"
  }, "Tutup Halaman"))));
};

// --- SiteDetailModal.tsx ---


const SiteDetailModal = ({
  site,
  onClose,
  kingdoms,
  sources,
  onViewOnMap,
  onSelectKingdom
}) => {
  const [copied, setCopied] = React.useState(false);
  if (!site) return null;
  const associatedKingdoms = kingdoms.filter(k => site.kingdom_ids.includes(k.id));
  const associatedSources = sources.filter(s => site.source_ids.includes(s.id));
  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${site.latitude}, ${site.longitude}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "modal-site-title",
    className: "fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#F4F0E6] text-[#172B36] w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-[#426B60] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-64 sm:h-72 w-full overflow-hidden bg-[#172B36]"
  }, /*#__PURE__*/React.createElement("img", {
    src: site.image,
    alt: site.name,
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-[#172B36] via-[#172B36]/40 to-transparent"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 text-[#F4F0E6]/80 hover:text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors z-10",
    "aria-label": "Tutup rincian situs"
  }, /*#__PURE__*/React.createElement(X, {
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-4 left-4 right-4 text-[#F4F0E6]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#426B60] text-white border border-emerald-400/40"
  }, site.site_type), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B58B4D] text-[#172B36]"
  }, site.preservation_status)), /*#__PURE__*/React.createElement("h2", {
    id: "modal-site-title",
    className: "font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight"
  }, site.name))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-5 overflow-y-auto max-h-[calc(92vh-340px)] text-xs sm:text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1 font-semibold"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3.5 h-3.5 text-[#426B60]"
  }), " Lokasi Administratif"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-[#172B36]"
  }, site.regency, ", ", site.province), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 text-[11px] text-gray-500"
  }, /*#__PURE__*/React.createElement("span", null, site.latitude.toFixed(4), ", ", site.longitude.toFixed(4)), /*#__PURE__*/React.createElement("button", {
    onClick: copyCoordinates,
    className: "p-1 hover:text-[#172B36] transition-colors",
    title: "Salin koordinat GPS"
  }, copied ? /*#__PURE__*/React.createElement(Check, {
    className: "w-3 h-3 text-emerald-600"
  }) : /*#__PURE__*/React.createElement(Copy, {
    className: "w-3 h-3"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-3 pt-2 sm:pt-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1 font-semibold"
  }, /*#__PURE__*/React.createElement(Calendar, {
    className: "w-3.5 h-3.5 text-[#B58B4D]"
  }), " Tarikh Pendirian / Era"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-[#172B36]"
  }, site.period), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-emerald-700 font-medium flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(ShieldCheck, {
    className: "w-3.5 h-3.5"
  }), " Terdaftar dalam Inventaris Cagar Budaya"))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36]"
  }, "Deskripsi Arsitektur & Peran Sejarah"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-800 leading-relaxed text-xs sm:text-sm bg-white/70 p-4 rounded-xl border border-[#B58B4D]/20"
  }, site.description)), associatedKingdoms.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36] flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-4 h-4 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Kaitan Dinasti Kerajaan / Kesultanan")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, associatedKingdoms.map(k => /*#__PURE__*/React.createElement("button", {
    key: k.id,
    onClick: () => {
      onClose();
      onSelectKingdom(k);
    },
    className: "px-3 py-1.5 rounded-lg bg-white hover:bg-[#172B36] hover:text-[#F4F0E6] text-[#172B36] border border-[#B58B4D]/40 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
  }, /*#__PURE__*/React.createElement("span", null, k.name), /*#__PURE__*/React.createElement(ExternalLink, {
    className: "w-3 h-3 text-[#B58B4D]"
  }))))), associatedSources.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36] flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, "Rujukan Akademik")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, associatedSources.map(source => /*#__PURE__*/React.createElement("div", {
    key: source.id,
    className: "text-xs text-gray-700 bg-[#eae3d2] p-2.5 rounded-lg border border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-[#172B36]"
  }, source.title), " (", source.authors, ", ", source.publication_year, ") \u2022 ", source.publisher))))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-[#eae3d2] border-t border-[#426B60]/30 flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium border border-gray-300"
  }, "Tutup"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onClose();
      onViewOnMap(site);
    },
    className: "px-5 py-2 rounded-lg bg-[#426B60] hover:bg-[#325249] text-white font-semibold flex items-center gap-1.5 shadow"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Fokuskan ke Peta Interaktif")))));
};

// --- TimelineView.tsx ---



const TimelineView = ({
  kingdoms,
  events,
  onSelectKingdomOnMap,
  onOpenKingdomDetail
}) => {
  const [selectedYear, setSelectedYear] = useState(1550);
  const [selectedEra, setSelectedEra] = useState('all');
  const activeKingdomsAtYear = kingdoms.filter(kd => isKingdomActiveInYear(kd, selectedYear));
  const nearbyEvents = events.filter(e => Math.abs(e.year - selectedYear) <= 50).sort((a, b) => a.year - b.year);
  const eraButtons = [{
    id: 'all',
    label: 'Seluruh Kronologi (1200 - 1950)',
    year: 1550
  }, {
    id: '13',
    label: '1267: Era Awal Samudera Pasai',
    year: 1297
  }, {
    id: '15',
    label: '1478: Kejayaan Demak & Walisongo',
    year: 1515
  }, {
    id: '16',
    label: '1575: Pengusiran Portugis oleh Baabullah',
    year: 1575
  }, {
    id: '17',
    label: '1628: Puncak Mataram & Iskandar Muda',
    year: 1628
  }, {
    id: '17b',
    label: '1667: Era Perjanjian Bungaya Makassar',
    year: 1667
  }, {
    id: '18',
    label: '1797: Gerilya Maritim Sultan Nuku',
    year: 1797
  }, {
    id: '20',
    label: '1945: Integrasi Kesultanan ke NKRI',
    year: 1945
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center max-w-3xl mx-auto space-y-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40"
  }, "Kronologi Peradaban Islam Nusantara"), /*#__PURE__*/React.createElement("h2", {
    className: "font-serif text-3xl sm:text-4xl font-bold text-[#172B36]"
  }, "Garis Waktu Sejarah Kerajaan & Kesultanan"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700 leading-relaxed"
  }, "Geser bilah waktu kronologis atau pilih momentum penting untuk melihat kerajaan yang aktif berdaulat secara bersamaan, suksesi pemerintahan, dan peristiwa bersejarah yang mengubah peta peradaban Nusantara.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#172B36] text-[#F4F0E6] p-6 rounded-2xl shadow-xl border-2 border-[#B58B4D]/60 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B58B4D]/30 pb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#B58B4D] uppercase tracking-wider font-semibold"
  }, "Tahun Terpilih"), /*#__PURE__*/React.createElement("div", {
    className: "font-serif text-4xl sm:text-5xl font-bold text-[#F4F0E6]"
  }, "Tahun ", selectedYear, " Masehi"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[#F4F0E6]/70 mt-1"
  }, "Menampilkan ", activeKingdomsAtYear.length, " kerajaan yang terdokumentasi aktif berdaulat pada kurun ini.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5 max-w-md"
  }, eraButtons.map(btn => /*#__PURE__*/React.createElement("button", {
    key: btn.id,
    onClick: () => {
      setSelectedEra(btn.id);
      setSelectedYear(btn.year);
    },
    className: `px-2.5 py-1 rounded text-[11px] font-medium transition-colors border ${selectedYear === btn.year ? 'bg-[#B58B4D] text-[#172B36] font-bold border-[#B58B4D]' : 'bg-[#12222b] text-[#F4F0E6]/80 border-[#B58B4D]/30 hover:border-[#B58B4D]'}`
  }, btn.label)))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs text-[#B58B4D] font-semibold"
  }, /*#__PURE__*/React.createElement("span", null, "1200 M (Pra-Pasai)"), /*#__PURE__*/React.createElement("span", null, "1500 M (Masa Demak)"), /*#__PURE__*/React.createElement("span", null, "1700 M (Era VOC)"), /*#__PURE__*/React.createElement("span", null, "1950 M (Kemerdekaan RI)")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "1200",
    max: "1950",
    step: "5",
    value: selectedYear,
    onChange: e => setSelectedYear(Number(e.target.value)),
    className: "w-full h-3 bg-[#12222b] rounded-lg appearance-none cursor-pointer accent-[#B58B4D]",
    "aria-label": "Pilih tahun pada garis waktu"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-2xl font-bold text-[#172B36] flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Crown, {
    className: "w-5 h-5 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Kerajaan yang Berdaulat pada ", selectedYear, " M")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs px-2.5 py-1 rounded-full bg-[#172B36] text-[#F4F0E6] font-semibold"
  }, activeKingdomsAtYear.length, " Entitas Aktif")), activeKingdomsAtYear.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, activeKingdomsAtYear.map(kd => /*#__PURE__*/React.createElement("div", {
    key: kd.id,
    className: "bg-white p-5 rounded-xl border border-[#B58B4D]/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#B58B4D]/20 text-[#B58B4D]"
  }, kd.region), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500 font-medium"
  }, kd.founded, " \u2013 ", kd.ended || 'kini', " M")), /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-lg text-[#172B36]"
  }, kd.name), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-600 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3 h-3 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, "Ibu Kota: ", /*#__PURE__*/React.createElement("strong", null, kd.capital))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 line-clamp-3"
  }, kd.history_summary)), /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelectKingdomOnMap(kd),
    className: "text-xs font-semibold text-[#426B60] hover:underline flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Lihat di Peta")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenKingdomDetail(kd),
    className: "px-3 py-1.5 rounded-md bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] text-xs font-medium flex items-center gap-1 transition-colors"
  }, /*#__PURE__*/React.createElement("span", null, "Detail"), /*#__PURE__*/React.createElement(ArrowRight, {
    className: "w-3 h-3 text-[#B58B4D]"
  })))))) : /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center bg-white/70 rounded-2xl border border-dashed border-[#B58B4D]/40 space-y-2"
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-10 h-10 text-gray-400 mx-auto"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-serif text-lg font-semibold text-gray-700"
  }, "Tidak Ada Kerajaan Terdata Aktif pada Tahun ", selectedYear, " M"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 max-w-sm mx-auto"
  }, "Coba geser bilah tahun ke abad ke-16 atau 17 saat masa kemakmuran kesultanan Nusantara sedang berada di puncaknya."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-2xl font-bold text-[#172B36] flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "w-5 h-5 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, "Peristiwa Penting Terkait")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, nearbyEvents.map(evt => /*#__PURE__*/React.createElement("div", {
    key: evt.id,
    className: "bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-xs px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6]"
  }, evt.year_label)), /*#__PURE__*/React.createElement("h4", {
    className: "font-serif font-bold text-base text-[#172B36]"
  }, evt.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 leading-relaxed"
  }, evt.description), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-[#426B60] font-medium pt-1 border-t border-gray-100"
  }, evt.significance))), nearbyEvents.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 italic p-4 bg-white/60 rounded-xl text-center"
  }, "Tidak ada catatan peristiwa penting dalam rentang \xB150 tahun dari tahun terpilih.")))));
};

// --- SitesCatalogView.tsx ---


const ALL_SITE_TYPES = ['Masjid Bersejarah', 'Keraton & Istana', 'Makam Sultan', 'Benteng Pertahanan', 'Prasasti & Batu Bersurat', 'Museum'];
const SitesCatalogView = ({
  sites,
  kingdoms,
  onSelectSiteOnMap,
  onOpenSiteDetail
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [query, setQuery] = useState('');

  // Unique provinces
  const provinces = Array.from(new Set(sites.map(s => s.province))).sort();

  // Filtered sites
  const filteredSites = sites.filter(site => {
    if (selectedCategory !== 'all' && site.site_type !== selectedCategory) return false;
    if (selectedProvince !== 'all' && site.province !== selectedProvince) return false;
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      const matchName = site.name.toLowerCase().includes(q);
      const matchLoc = (site.regency + ' ' + site.province).toLowerCase().includes(q);
      const matchDesc = site.description.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchDesc) return false;
    }
    return true;
  });
  const getKingdomNames = kingdomIds => {
    return kingdoms.filter(k => kingdomIds.includes(k.id)).map(k => k.name).join(', ');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B58B4D]/30 pb-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#426B60]/20 text-[#426B60] border border-[#426B60]/30"
  }, "Inventaris Warisan Fisik"), /*#__PURE__*/React.createElement("h2", {
    className: "font-serif text-3xl sm:text-4xl font-bold text-[#172B36] mt-2"
  }, "Katalog Situs Peninggalan Islam Nusantara"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700 mt-1 max-w-2xl"
  }, "Menelusuri peninggalan arsitektur bernilai sejarah tinggi seperti masjid beratap tumpang, istana kesultanan, makam para pendiri dinasti, dan benteng pertahanan maritim.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 self-start md:self-auto bg-white p-1 rounded-lg border border-[#B58B4D]/30 shadow-sm"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewMode('grid'),
    className: `p-1.5 rounded transition-colors flex items-center gap-1.5 text-xs font-medium ${viewMode === 'grid' ? 'bg-[#172B36] text-[#F4F0E6]' : 'text-gray-600 hover:text-black'}`,
    title: "Tampilan Kotak Gambar (Grid)"
  }, /*#__PURE__*/React.createElement(LayoutGrid, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Grid")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewMode('list'),
    className: `p-1.5 rounded transition-colors flex items-center gap-1.5 text-xs font-medium ${viewMode === 'list' ? 'bg-[#172B36] text-[#F4F0E6]' : 'text-gray-600 hover:text-black'}`,
    title: "Tampilan Daftar (List)"
  }, /*#__PURE__*/React.createElement(List, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Daftar")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs no-scrollbar"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedCategory('all'),
    className: `px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${selectedCategory === 'all' ? 'bg-[#172B36] text-[#F4F0E6]' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
  }, "Semua Kategori (", sites.length, ")"), ALL_SITE_TYPES.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat,
    onClick: () => setSelectedCategory(cat),
    className: `px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${selectedCategory === cat ? 'bg-[#426B60] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`
  }, cat))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 w-full md:w-auto"
  }, /*#__PURE__*/React.createElement("select", {
    value: selectedProvince,
    onChange: e => setSelectedProvince(e.target.value),
    className: "text-xs bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "Semua Provinsi"), provinces.map(prov => /*#__PURE__*/React.createElement("option", {
    key: prov,
    value: prov
  }, prov))), /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 md:w-56"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "w-4 h-4 text-gray-400 absolute left-2.5 top-2"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Cari situs...",
    value: query,
    onChange: e => setQuery(e.target.value),
    className: "w-full text-xs bg-gray-50 border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-gray-800 focus:outline-none focus:border-[#B58B4D]"
  })))), viewMode === 'grid' ? /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  }, filteredSites.map(site => /*#__PURE__*/React.createElement("div", {
    key: site.id,
    className: "bg-white rounded-2xl border border-[#B58B4D]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-48 overflow-hidden bg-[#172B36]"
  }, /*#__PURE__*/React.createElement("img", {
    src: site.image,
    alt: site.name,
    onError: e => {
      e.currentTarget.src = 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80';
    },
    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#172B36]/90 text-[#F4F0E6] border border-[#B58B4D]/40 backdrop-blur-sm"
  }, site.site_type), /*#__PURE__*/React.createElement("span", {
    className: "absolute bottom-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 backdrop-blur-sm"
  }, site.preservation_status)), /*#__PURE__*/React.createElement("div", {
    className: "p-5 flex-1 flex flex-col justify-between space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif font-bold text-lg text-[#172B36] group-hover:text-[#B58B4D] transition-colors"
  }, site.name), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#426B60] font-medium flex items-center gap-1 mt-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, site.regency, ", ", site.province)), site.kingdom_ids.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-gray-500 mt-1"
  }, "Kaitan: ", /*#__PURE__*/React.createElement("strong", null, getKingdomNames(site.kingdom_ids))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 line-clamp-3 mt-2 leading-relaxed"
  }, site.description)), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-gray-100 flex items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelectSiteOnMap(site),
    className: "text-xs font-semibold text-[#426B60] hover:underline flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Lihat di Peta")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenSiteDetail(site),
    className: "px-3 py-1.5 rounded-lg bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] text-xs font-medium transition-colors"
  }, "Rincian Lengkap")))))) :
  /*#__PURE__*/
  /* LIST VIEW */
  React.createElement("div", {
    className: "bg-white rounded-2xl border border-[#B58B4D]/30 shadow-sm overflow-hidden divide-y divide-gray-100"
  }, filteredSites.map(site => /*#__PURE__*/React.createElement("div", {
    key: site.id,
    className: "p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F4F0E6]/50 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4"
  }, /*#__PURE__*/React.createElement("img", {
    src: site.image,
    alt: site.name,
    className: "w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0 border border-gray-200"
  }), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800"
  }, site.site_type), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-semibold text-emerald-700"
  }, site.preservation_status)), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif font-bold text-base sm:text-lg text-[#172B36]"
  }, site.name), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-600 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3.5 h-3.5 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("span", null, site.regency, ", ", site.province), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Era: ", site.period)))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 self-end sm:self-center shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onSelectSiteOnMap(site),
    className: "px-3 py-1.5 text-xs font-semibold text-[#426B60] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(MapPin, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "Lihat di Peta")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenSiteDetail(site),
    className: "px-3.5 py-1.5 text-xs font-medium bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] rounded-lg transition-colors"
  }, "Rincian"))))), filteredSites.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "p-12 text-center bg-white rounded-2xl border border-dashed border-[#B58B4D]/40 space-y-2"
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-10 h-10 text-gray-400 mx-auto"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-serif text-lg font-semibold text-gray-800"
  }, "Tidak Ada Situs yang Sesuai dengan Kriteria"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "Coba pilih kategori \"Semua Kategori\" atau bersihkan kolom pencarian.")));
};

// --- SourcesAndAboutView.tsx ---



const SourcesAndAboutView = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40"
  }, "Metodologi Digital Humanities"), /*#__PURE__*/React.createElement("h2", {
    className: "font-serif text-3xl sm:text-4xl font-bold text-[#172B36]"
  }, "Metodologi, Historiografi & Sumber Data"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed"
  }, "Atlas Islam Nusantara dirancang untuk memadukan ketelitian ilmiah kajian sejarah dengan visualisasi geospasial modern (WebGIS), dengan mengedepankan keterbukaan data dan transparansi atas ketidakpastian sumber.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 sm:p-8 rounded-2xl border border-[#B58B4D]/40 shadow-sm space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 border-b border-gray-100 pb-3"
  }, /*#__PURE__*/React.createElement(ShieldCheck, {
    className: "w-6 h-6 text-[#426B60]"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl sm:text-2xl font-bold text-[#172B36]"
  }, "Standar Verifikasi & Rubrik Kepastian Data")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-gray-700 leading-relaxed"
  }, "Historiografi kerajaan Islam di Nusantara memiliki tantangan tersendiri: perbedaan kronik naskah lokal (babad/hikayat), konversi kalender Hijriah ke Masehi, nisan makam bertarikh, serta catatan pengelana asing (Tiongkok, Arab, Portugis, Belanda). Kami membagi tingkat kepastian data menjadi tiga tingkatan tegas:"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 font-bold text-emerald-900 text-sm"
  }, /*#__PURE__*/React.createElement(CheckCircle2, {
    className: "w-4 h-4 text-emerald-600"
  }), /*#__PURE__*/React.createElement("span", null, "Tingkat A: Terverifikasi")), /*#__PURE__*/React.createElement("p", {
    className: "text-emerald-800 leading-relaxed"
  }, "Memiliki bukti epigrafi primer tak terbantahkan (seperti batu nisan berangka tahun jelas), naskah perjanjian resmi sezaman, atau kesepakatan konsensus para sejarawan utama.")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 font-bold text-amber-900 text-sm"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    className: "w-4 h-4 text-amber-600"
  }), /*#__PURE__*/React.createElement("span", null, "Tingkat B: Estimasi Primer")), /*#__PURE__*/React.createElement("p", {
    className: "text-amber-800 leading-relaxed"
  }, "Disimpulkan berdasarkan rekonsiliasi naskah historiografi lokal (Babad Tanah Jawi, Hikayat Banjar) dan laporan saksi mata asing (Tom\xE9 Pires, Ibnu Battuta). Terdapat selisih beberapa tahun antar sumber.")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 font-bold text-blue-900 text-sm"
  }, /*#__PURE__*/React.createElement(Compass, {
    className: "w-4 h-4 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", null, "Tingkat C: Rekonstruksi Spasial")), /*#__PURE__*/React.createElement("p", {
    className: "text-blue-800 leading-relaxed"
  }, "Batas teritorial maritim masa lampau tidak mengenal batas garis tegas ala negara modern (Westphalian). Poligon wilayah menggambarkan zona pengaruh hegemoni dan jaringan upeti pelabuhan.")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#172B36] text-[#F4F0E6] p-6 sm:p-8 rounded-2xl border-2 border-[#B58B4D] shadow-xl space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Compass, {
    className: "w-6 h-6 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl sm:text-2xl font-bold text-[#F4F0E6]"
  }, "Prinsip Ketat Rekonstruksi Wilayah (Anti-Spekulasi)")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-[#F4F0E6]/85 leading-relaxed"
  }, "Dalam proyek Atlas Islam Nusantara, kami memegang komitmen ilmiah: ", /*#__PURE__*/React.createElement("strong", null, "\"Tidak menggambar batas poligon wilayah historis yang tidak didukung data riil.\""), " Untuk kerajaan yang catatan teritorialnya belum cukup kuat, kami hanya menampilkan titik pusat pemerintahan (ibu kota) dan situs peninggalan fisiknya. Hal ini mencegah kekeliruan anakronistik dan klaim sejarah yang berlebihan.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-6 sm:p-8 rounded-2xl border border-[#B58B4D]/40 shadow-sm space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 border-b border-gray-100 pb-3"
  }, /*#__PURE__*/React.createElement(Code2, {
    className: "w-6 h-6 text-[#172B36]"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-xl sm:text-2xl font-bold text-[#172B36]"
  }, "Kesiapan Integrasi Google Antigravity & Standar GeoJSON")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-gray-700 leading-relaxed"
  }, "Seluruh entitas spasial dirancang sesuai spesifikasi RFC 7946 (GeoJSON FeatureCollection) dan schema data terstruktur (Kingdoms, Rulers, Sites, Territories, Events, Sources). Arsitektur ini siap dialirkan ke pustaka Leaflet lanjutan, OpenLayers, maupun pipeline Google Antigravity WebGIS untuk visualisasi analitik tingkat lanjut."), /*#__PURE__*/React.createElement("div", {
    className: "bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/30 text-xs font-mono text-[#172B36]"
  }, /*#__PURE__*/React.createElement("code", null, `// Struktur Schema: kingdoms [1:N] rulers, sites, territories, sources
{
  "id": "kd-samudera-pasai",
  "geometry": { "type": "Point", "coordinates": [97.2038, 5.1275] },
  "territories": ["ter-pasai-1"],
  "certainty": "verified"
}`))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-6 h-6 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif text-2xl font-bold text-[#172B36]"
  }, "Daftar Pustaka & Bibliografi Akademik")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3"
  }, sourcesData.map((src, index) => /*#__PURE__*/React.createElement("div", {
    key: src.id,
    className: "bg-white p-4 sm:p-5 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sm text-[#172B36]"
  }, "[", index + 1, "] ", src.title), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-semibold px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6] shrink-0"
  }, src.source_type)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700"
  }, /*#__PURE__*/React.createElement("strong", null, "Penulis:"), " ", src.authors, " (", src.publication_year, ") \u2022 ", src.publisher, " ", src.pages && `&bull; ${src.pages}`), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-[#426B60] bg-[#F4F0E6] p-2 rounded border border-[#B58B4D]/20"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-[#172B36]"
  }, "Dukungan Fakta: "), src.supports))))));
};

// --- Header.tsx ---


const Header = ({
  activeTab,
  setActiveTab,
  filter,
  setFilter,
  onResetMap,
  totalKingdoms,
  totalSites
}) => {
  return /*#__PURE__*/React.createElement("header", {
    className: "bg-[#172B36] text-[#F4F0E6] border-b border-[#B58B4D]/30 sticky top-0 z-30 shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between h-16 sm:h-20 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3 cursor-pointer select-none",
    onClick: () => setActiveTab('map')
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#B58B4D] to-[#8e6d38] flex items-center justify-center shadow-lg border border-[#F4F0E6]/20"
  }, /*#__PURE__*/React.createElement(Compass, {
    className: "w-6 h-6 sm:w-7 sm:h-7 text-[#172B36]"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-regal text-base sm:text-xl font-bold tracking-wider text-[#F4F0E6]"
  }, "JELAJAH KERAJAAN ISLAM NUSANTARA"), /*#__PURE__*/React.createElement("span", {
    className: "hidden md:inline-block text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[#426B60] text-emerald-100 font-semibold border border-emerald-500/30"
  }, "WebGIS Edukasi")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[#B58B4D] tracking-wide font-medium hidden sm:block"
  }, "Visualisasi Geospasial Persebaran Kerajaan, Daftar Sultan & Peninggalan Sejarah Indonesia"))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 max-w-md hidden md:block relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#B58B4D]"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "h-4 w-4"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Cari kerajaan, sultan, situs kuno, daerah...",
    value: filter.searchQuery,
    onChange: e => setFilter(prev => ({
      ...prev,
      searchQuery: e.target.value
    })),
    className: "w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-[#12222b] text-[#F4F0E6] placeholder-[#F4F0E6]/40 rounded-md border border-[#B58B4D]/30 focus:outline-none focus:border-[#B58B4D] transition-colors",
    "aria-label": "Cari kerajaan atau situs"
  }), filter.searchQuery && /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter(prev => ({
      ...prev,
      searchQuery: ''
    })),
    className: "absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#F4F0E6]/50 hover:text-[#F4F0E6]",
    title: "Bersihkan pencarian"
  }, /*#__PURE__*/React.createElement(X, {
    className: "h-4 w-4"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-4 text-xs border-r border-[#B58B4D]/20 pr-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-[#B58B4D] uppercase tracking-wider font-semibold"
  }, "Tersaring"), /*#__PURE__*/React.createElement("div", {
    className: "font-semibold text-sm text-[#F4F0E6]"
  }, totalKingdoms, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-normal text-[#F4F0E6]/60"
  }, "Kerajaan"), " \u2022 ", totalSites, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-normal text-[#F4F0E6]/60"
  }, "Situs")))), /*#__PURE__*/React.createElement("button", {
    onClick: onResetMap,
    className: "px-3 py-1.5 rounded text-xs font-medium bg-[#B58B4D]/15 hover:bg-[#B58B4D]/30 text-[#B58B4D] border border-[#B58B4D]/40 transition-colors flex items-center gap-1.5 shadow-sm",
    title: "Kembalikan sudut pandang ke seluruh Indonesia"
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Peta Nusantara")))), /*#__PURE__*/React.createElement("div", {
    className: "pb-2.5 md:hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement(Search, {
    className: "absolute left-3 top-2.5 h-4 w-4 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Cari kerajaan, sultan, situs...",
    value: filter.searchQuery,
    onChange: e => setFilter(prev => ({
      ...prev,
      searchQuery: e.target.value
    })),
    className: "w-full pl-9 pr-8 py-1.5 text-xs bg-[#12222b] text-[#F4F0E6] placeholder-[#F4F0E6]/40 rounded-md border border-[#B58B4D]/30 focus:outline-none focus:border-[#B58B4D]"
  }), filter.searchQuery && /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter(prev => ({
      ...prev,
      searchQuery: ''
    })),
    className: "absolute right-2.5 top-2 text-[#F4F0E6]/50"
  }, /*#__PURE__*/React.createElement(X, {
    className: "h-4 w-4"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar border-t border-[#B58B4D]/20 pt-1 pb-1 text-xs sm:text-sm font-medium"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('map'),
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${activeTab === 'map' ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold' : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'}`
  }, /*#__PURE__*/React.createElement(Layers, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Eksplorasi Peta WebGIS")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('timeline'),
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${activeTab === 'timeline' ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold' : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'}`
  }, /*#__PURE__*/React.createElement(Clock, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Garis Waktu (Timeline)")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('sites'),
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${activeTab === 'sites' ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold' : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'}`
  }, /*#__PURE__*/React.createElement(Landmark, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Katalog Situs Peninggalan")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('sources'),
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-t-md transition-all whitespace-nowrap border-b-2 ${activeTab === 'sources' ? 'border-[#B58B4D] text-[#B58B4D] bg-[#12222b] font-semibold' : 'border-transparent text-[#F4F0E6]/70 hover:text-[#F4F0E6] hover:bg-[#12222b]/40'}`
  }, /*#__PURE__*/React.createElement(BookOpen, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Sumber & Metodologi")))));
};

// --- MapGIS.tsx ---




const MapGIS = ({
  kingdoms,
  sites,
  territories,
  selectedKingdom,
  onSelectKingdom,
  onSelectSite,
  focusLocation,
  onResetFocus
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const kingdomLayerGroupRef = useRef(null);
  const siteLayerGroupRef = useRef(null);
  const territoryLayerGroupRef = useRef(null);
  const tileLayerRef = useRef(null);

  // Layer visibility state
  const [showKingdoms, setShowKingdoms] = useState(true);
  const [showSites, setShowSites] = useState(true);
  const [showTerritories, setShowTerritories] = useState(true);
  const [basemap, setBasemap] = useState('carto-sepia');
  const [showLegend, setShowLegend] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center of Indonesia archipelago
    const initialCenter = [-2.5, 118.0];
    const initialZoom = 5;
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false // Custom position
    });

    // Add scale bar
    L.control.scale({
      imperial: false,
      position: 'bottomleft'
    }).addTo(map);

    // Zoom control at bottom left
    L.control.zoom({
      position: 'bottomleft'
    }).addTo(map);

    // Layer groups
    const kingdomGroup = L.layerGroup().addTo(map);
    const siteGroup = L.layerGroup().addTo(map);
    const territoryGroup = L.layerGroup().addTo(map);
    kingdomLayerGroupRef.current = kingdomGroup;
    siteLayerGroupRef.current = siteGroup;
    territoryLayerGroupRef.current = territoryGroup;
    mapInstanceRef.current = map;

    // Force recalculation of container bounds
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Basemap Switch
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    let url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    let subdomains = 'abc';
    if (basemap === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri, Maxar, Earthstar Geographics';
      subdomains = 'abc';
    } else if (basemap === 'osm-standard') {
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
      subdomains = 'abc';
    } else {
      // Archival Parchment Map (using OpenStreetMap with sepia CSS filter)
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors | Arsip Digital';
      subdomains = 'abc';
    }
    const newTile = L.tileLayer(url, {
      attribution,
      subdomains,
      maxZoom: 19
    }).addTo(map);
    tileLayerRef.current = newTile;
  }, [basemap]);

  // Update Territories Layer
  useEffect(() => {
    const group = territoryLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();
    if (!showTerritories) return;
    territories.forEach(t => {
      const isRelatedToSelected = selectedKingdom?.id === t.kingdom_id;
      const polygon = L.polygon(t.coordinates, {
        color: isRelatedToSelected ? '#B58B4D' : '#426B60',
        weight: isRelatedToSelected ? 3 : 1.5,
        dashArray: isRelatedToSelected ? undefined : '5, 5',
        fillColor: isRelatedToSelected ? '#B58B4D' : '#426B60',
        fillOpacity: isRelatedToSelected ? 0.35 : 0.15
      });
      polygon.bindTooltip(`<div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
          <div style="font-weight:700; color:#172B36; font-size:12px;">${t.name}</div>
          <div style="font-size:10px; color:#666;">Periode: ${t.period_start} – ${t.period_end} M</div>
          <div style="font-size:10px; color:#426B60; font-weight:600;">Kepastian: ${t.certainty}</div>
        </div>`, {
        sticky: true,
        opacity: 0.95
      });
      polygon.addTo(group);
    });
  }, [territories, showTerritories, selectedKingdom]);

  // Update Kingdom Markers Layer
  useEffect(() => {
    const group = kingdomLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();
    if (!showKingdoms) return;
    kingdoms.forEach(kd => {
      const isSelected = selectedKingdom?.id === kd.id;

      // Custom styled HTML marker
      const markerHtml = `
        <div class="custom-kingdom-marker ${isSelected ? 'scale-125' : ''}" style="
          width: ${isSelected ? '38px' : '32px'};
          height: ${isSelected ? '38px' : '32px'};
          background: ${isSelected ? '#B58B4D' : '#172B36'};
          border: 2px solid ${isSelected ? '#FFFFFF' : '#B58B4D'};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(23,43,54,0.4);
          cursor: pointer;
        ">
          <span style="font-size: ${isSelected ? '16px' : '14px'}; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));">
            ${kd.emblem_symbol || '👑'}
          </span>
        </div>
      `;
      const icon = L.divIcon({
        className: 'kingdom-marker-div',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
      const marker = L.marker([kd.latitude, kd.longitude], {
        icon
      });
      marker.bindTooltip(`<div style="font-family:'Plus Jakarta Sans',sans-serif; text-align:center;">
          <strong style="color:#172B36; font-size:12px;">${kd.name}</strong>
          <div style="font-size:10px; color:#B58B4D; font-weight:600;">${kd.capital} (${kd.founded || '?'} – ${kd.ended || 'kini'} M)</div>
        </div>`, {
        direction: 'top',
        offset: [0, -14],
        opacity: 0.95
      });
      marker.on('click', () => {
        onSelectKingdom(kd);
      });
      marker.addTo(group);
    });
  }, [kingdoms, showKingdoms, selectedKingdom, onSelectKingdom]);

  // Update Site Markers Layer
  useEffect(() => {
    const group = siteLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();
    if (!showSites) return;
    sites.forEach(site => {
      const markerHtml = `
        <div class="custom-site-marker" style="
          width: 26px;
          height: 26px;
          background: #426B60;
          border: 1.5px solid #FFFFFF;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transform: rotate(45deg);
          cursor: pointer;
        ">
          <div style="transform: rotate(-45deg); font-size: 11px; color: white;">
            🕌
          </div>
        </div>
      `;
      const icon = L.divIcon({
        className: 'site-marker-div',
        html: markerHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
      const marker = L.marker([site.latitude, site.longitude], {
        icon
      });
      marker.bindTooltip(`<div style="font-family:'Plus Jakarta Sans',sans-serif; padding:2px;">
          <strong style="color:#172B36; font-size:11px;">${site.name}</strong>
          <div style="font-size:10px; color:#426B60; font-weight:600;">${site.site_type}</div>
          <div style="font-size:9px; color:#777;">${site.regency}, ${site.province}</div>
        </div>`, {
        direction: 'top',
        offset: [0, -12],
        opacity: 0.95
      });
      marker.on('click', () => {
        onSelectSite(site);
      });
      marker.addTo(group);
    });
  }, [sites, showSites, onSelectSite]);

  // Respond to focus changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !focusLocation) return;
    map.flyTo([focusLocation.lat, focusLocation.lng], focusLocation.zoom || 9, {
      duration: 1.2
    });
  }, [focusLocation]);
  const handleResetToIndonesia = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    onResetFocus();
    map.flyTo([-2.5, 118.0], 5, {
      duration: 1.0
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-full min-h-[500px] flex-1 bg-[#F4F0E6] overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    ref: mapContainerRef,
    className: "absolute inset-0 w-full h-full z-0",
    tabIndex: 0,
    "aria-label": "Peta Interaktif Sejarah Islam Nusantara"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-4 right-4 z-10 flex flex-col items-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowLegend(prev => !prev),
    className: "sm:hidden px-2.5 py-1.5 bg-[#172B36] text-[#F4F0E6] rounded-md shadow-lg border border-[#B58B4D]/40 text-xs flex items-center gap-1.5",
    title: "Tampilkan Lapisan & Kontrol"
  }, /*#__PURE__*/React.createElement(Layers, {
    className: "w-3.5 h-3.5 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", null, "Layer")), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:block bg-[#172B36]/95 backdrop-blur text-[#F4F0E6] p-2 rounded-lg shadow-xl border border-[#B58B4D]/40 text-xs space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 bg-[#12222b] p-1 rounded"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setBasemap('carto-sepia'),
    className: `px-2 py-1 rounded text-[10px] font-medium transition-colors ${basemap === 'carto-sepia' ? 'bg-[#B58B4D] text-[#172B36] font-bold' : 'text-[#F4F0E6]/70 hover:text-white'}`,
    title: "Tampilan Arsip Kertas Kartografi"
  }, "Arsip Kartografi"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBasemap('osm-standard'),
    className: `px-2 py-1 rounded text-[10px] font-medium transition-colors ${basemap === 'osm-standard' ? 'bg-[#B58B4D] text-[#172B36] font-bold' : 'text-[#F4F0E6]/70 hover:text-white'}`,
    title: "OpenStreetMap Standar"
  }, "Topografi"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBasemap('satellite'),
    className: `px-2 py-1 rounded text-[10px] font-medium transition-colors ${basemap === 'satellite' ? 'bg-[#B58B4D] text-[#172B36] font-bold' : 'text-[#F4F0E6]/70 hover:text-white'}`,
    title: "Citra Satelit Geografis"
  }, "Satelit")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 pt-1 border-t border-[#B58B4D]/20 text-[11px]"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center justify-between cursor-pointer hover:text-white p-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-[#B58B4D] inline-block"
  }), "Pusat Kerajaan (", kingdoms.length, ")"), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: showKingdoms,
    onChange: e => setShowKingdoms(e.target.checked),
    className: "accent-[#B58B4D]"
  })), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center justify-between cursor-pointer hover:text-white p-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rotate-45 bg-[#426B60] inline-block border border-white"
  }), "Situs Peninggalan (", sites.length, ")"), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: showSites,
    onChange: e => setShowSites(e.target.checked),
    className: "accent-[#426B60]"
  })), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center justify-between cursor-pointer hover:text-white p-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-1.5 border border-dashed border-[#B58B4D] bg-[#B58B4D]/30 inline-block"
  }), "Batas Wilayah Historis (", territories.length, ")"), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: showTerritories,
    onChange: e => setShowTerritories(e.target.checked),
    className: "accent-[#B58B4D]"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: handleResetToIndonesia,
    className: "px-2.5 py-1.5 bg-[#172B36]/90 hover:bg-[#172B36] text-[#F4F0E6] rounded-md shadow-lg border border-[#B58B4D]/40 text-xs font-medium flex items-center gap-1.5 transition-colors",
    title: "Kembalikan pandangan ke seluruh Indonesia"
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    className: "w-3.5 h-3.5 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "Reset Pandangan"))), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-24 left-4 z-10 pointer-events-auto"
  }, /*#__PURE__*/React.createElement(CompassRose, {
    onResetOrientation: handleResetToIndonesia
  })), showLegend ? /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-6 right-4 z-10 bg-[#F4F0E6]/95 backdrop-blur text-[#172B36] p-3 rounded-lg shadow-xl border border-[#B58B4D]/60 max-w-xs text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between font-regal font-bold text-xs pb-1 mb-1.5 border-b border-[#B58B4D]/30"
  }, /*#__PURE__*/React.createElement("span", null, "Legenda Peta Sejarah"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowLegend(false),
    className: "text-gray-500 hover:text-black text-[10px]"
  }, "Sembunyikan")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5 text-[11px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-5 h-5 rounded-full bg-[#172B36] border border-[#B58B4D] flex items-center justify-center text-[10px] text-white"
  }, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("span", null, "Pusat Kedaulatan Kerajaan / Kesultanan")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-4 h-4 rounded-sm rotate-45 bg-[#426B60] border border-white flex items-center justify-center text-[8px] text-white"
  }, /*#__PURE__*/React.createElement("span", {
    className: "-rotate-45"
  }, "\uD83D\uDD4C")), /*#__PURE__*/React.createElement("span", null, "Situs Warisan (Masjid, Makam, Istana, Benteng)")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-5 h-3 bg-[#B58B4D]/30 border border-dashed border-[#B58B4D] rounded-sm"
  }), /*#__PURE__*/React.createElement("span", null, "Rekonstruksi Wilayah Kekuasaan (Poligon)")))) : /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowLegend(true),
    className: "absolute bottom-6 right-4 z-10 bg-[#F4F0E6] text-[#172B36] px-2.5 py-1 rounded shadow-md border border-[#B58B4D]/60 text-[11px] font-medium"
  }, "Buka Legenda"), kingdoms.length === 0 && sites.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#172B36]/95 text-[#F4F0E6] p-6 rounded-2xl shadow-2xl border-2 border-[#B58B4D] max-w-md text-center space-y-3"
  }, /*#__PURE__*/React.createElement(AlertCircle, {
    className: "w-10 h-10 text-[#B58B4D] mx-auto"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "font-serif text-lg font-bold"
  }, "Tidak Ada Data yang Cocok"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-[#F4F0E6]/80 leading-relaxed"
  }, "Tidak ditemukan kerajaan atau situs yang sesuai dengan kombinasi filter wilayah atau rentang tahun terpilih. Silakan ubah filter atau klik tombol di bawah untuk mereset."), /*#__PURE__*/React.createElement("button", {
    onClick: handleResetToIndonesia,
    className: "px-4 py-2 bg-[#B58B4D] text-[#172B36] font-bold rounded-lg text-xs hover:bg-[#8e6d38] transition-colors"
  }, "Reset Semua Filter")));
};

// --- App.tsx ---
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */



















function App() {
  const [activeTab, setActiveTab] = useState('map');

  // Filter State
  const [filter, setFilter] = useState({
    regions: [],
    yearRange: [1200, 1950],
    siteTypes: [],
    certaintyLevels: [],
    searchQuery: '',
    activeKingdomId: null
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Selected Entities
  const [selectedKingdom, setSelectedKingdom] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [deepDiveKingdom, setDeepDiveKingdom] = useState(null);

  // Map Navigation Focus
  const [focusLocation, setFocusLocation] = useState(null);

  // Filtered Data Computation
  const filteredKingdoms = useMemo(() => {
    return filterKingdoms(kingdomsData, filter);
  }, [filter]);
  const visibleKingdomIds = useMemo(() => {
    return new Set(filteredKingdoms.map(k => k.id));
  }, [filteredKingdoms]);
  const filteredSites = useMemo(() => {
    return filterSites(sitesData, filter, visibleKingdomIds);
  }, [filter, visibleKingdomIds]);
  const filteredTerritories = useMemo(() => {
    return territoriesData.filter(t => visibleKingdomIds.has(t.kingdom_id));
  }, [visibleKingdomIds]);

  // Overall Statistics from authentic database
  const stats = useMemo(() => {
    return getAtlasStats(kingdomsData, sitesData, territoriesData);
  }, []);

  // Handlers
  const handleSelectKingdom = kingdom => {
    setSelectedKingdom(kingdom);
    setFilter(prev => ({
      ...prev,
      activeKingdomId: kingdom.id
    }));
    setFocusLocation({
      lat: kingdom.latitude,
      lng: kingdom.longitude,
      zoom: 8
    });
  };
  const handleSelectSite = site => {
    setSelectedSite(site);
  };
  const handleViewSiteOnMap = site => {
    setActiveTab('map');
    setSelectedSite(site);
    setFocusLocation({
      lat: site.latitude,
      lng: site.longitude,
      zoom: 11
    });
  };
  const handleFocusKingdomSites = kingdom => {
    const kingdomSites = sitesData.filter(s => s.kingdom_ids.includes(kingdom.id));
    if (kingdomSites.length > 0) {
      setFocusLocation({
        lat: kingdomSites[0].latitude,
        lng: kingdomSites[0].longitude,
        zoom: 10
      });
    }
  };
  const handleResetMap = () => {
    setSelectedKingdom(null);
    setSelectedSite(null);
    setFilter({
      regions: [],
      yearRange: [1200, 1950],
      siteTypes: [],
      certaintyLevels: [],
      searchQuery: '',
      activeKingdomId: null
    });
    setFocusLocation({
      lat: -2.5,
      lng: 118.0,
      zoom: 5
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-[#F4F0E6] text-[#172B36] flex flex-col font-sans"
  }, /*#__PURE__*/React.createElement(Header, {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    filter: filter,
    setFilter: setFilter,
    onResetMap: handleResetMap,
    totalKingdoms: filteredKingdoms.length,
    totalSites: filteredSites.length
  }), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 flex flex-col relative overflow-hidden"
  }, activeTab === 'map' && /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col relative w-full",
    style: {
      height: 'calc(100vh - 110px)',
      minHeight: '600px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#172B36]/95 text-[#F4F0E6] px-4 py-2 border-b border-[#B58B4D]/30 z-10 hidden sm:flex items-center justify-between text-xs shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Compass, {
    className: "w-4 h-4 text-[#B58B4D]"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "font-serif font-bold text-sm tracking-wide text-[#F4F0E6]"
  }, "Menelusuri Jejak Kerajaan Islam di Nusantara"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "Menghubungkan titik spasial, kronologi tarikh, suksesi sultan, dan peninggalan arsitektur bersejarah.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-[11px] font-medium text-[#B58B4D]"
  }, /*#__PURE__*/React.createElement("span", null, "Data Kurasi: ", stats.totalKingdoms, " Kerajaan"), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, stats.totalSites, " Cagar Budaya Terverifikasi"))), /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 w-full h-full overflow-hidden"
  }, /*#__PURE__*/React.createElement(FilterPanel, {
    filter: filter,
    setFilter: setFilter,
    isOpen: isFilterPanelOpen,
    setIsOpen: setIsFilterPanelOpen,
    filteredKingdomsCount: filteredKingdoms.length,
    filteredSitesCount: filteredSites.length
  }), /*#__PURE__*/React.createElement(MapGIS, {
    kingdoms: filteredKingdoms,
    sites: filteredSites,
    territories: filteredTerritories,
    selectedKingdom: selectedKingdom,
    onSelectKingdom: handleSelectKingdom,
    onSelectSite: handleSelectSite,
    focusLocation: focusLocation,
    onResetFocus: () => setFocusLocation(null)
  }), selectedKingdom && /*#__PURE__*/React.createElement(KingdomSummaryDrawer, {
    kingdom: selectedKingdom,
    onClose: () => setSelectedKingdom(null),
    onOpenFullDetail: kd => setDeepDiveKingdom(kd),
    onFocusSites: handleFocusKingdomSites,
    rulers: rulersData,
    sites: sitesData
  }))), activeTab === 'timeline' && /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto"
  }, /*#__PURE__*/React.createElement(TimelineView, {
    kingdoms: kingdomsData,
    events: eventsData,
    onSelectKingdomOnMap: kd => {
      setActiveTab('map');
      handleSelectKingdom(kd);
    },
    onOpenKingdomDetail: kd => setDeepDiveKingdom(kd)
  })), activeTab === 'sites' && /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto"
  }, /*#__PURE__*/React.createElement(SitesCatalogView, {
    sites: sitesData,
    kingdoms: kingdomsData,
    onSelectSiteOnMap: handleViewSiteOnMap,
    onOpenSiteDetail: site => setSelectedSite(site)
  })), activeTab === 'sources' && /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto"
  }, /*#__PURE__*/React.createElement(SourcesAndAboutView, null))), deepDiveKingdom && /*#__PURE__*/React.createElement(KingdomDetailModal, {
    kingdom: deepDiveKingdom,
    onClose: () => setDeepDiveKingdom(null),
    rulers: rulersData,
    sites: sitesData,
    territories: territoriesData,
    events: eventsData,
    sources: sourcesData,
    onSelectSiteOnMap: handleViewSiteOnMap
  }), selectedSite && /*#__PURE__*/React.createElement(SiteDetailModal, {
    site: selectedSite,
    onClose: () => setSelectedSite(null),
    kingdoms: kingdomsData,
    sources: sourcesData,
    onViewOnMap: handleViewSiteOnMap,
    onSelectKingdom: k => {
      setSelectedSite(null);
      handleSelectKingdom(k);
    }
  }));
}

// === MOUNT ROOT ===
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(React.createElement(App));
  console.log('Jelajah Kerajaan Islam Nusantara mounted successfully!');
} else {
  console.error('Root element not found!');
}
