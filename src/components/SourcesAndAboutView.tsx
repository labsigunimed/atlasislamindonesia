import React from 'react';
import { BookOpen, ShieldCheck, Database, Compass, CheckCircle2, AlertTriangle, FileText, Code2 } from 'lucide-react';
import { sourcesData } from '../data/sourcesData';

export const SourcesAndAboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40">
          Metodologi Digital Humanities
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B36]">
          Metodologi, Historiografi & Sumber Data
        </h2>
        <p className="text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Atlas Islam Nusantara dirancang untuk memadukan ketelitian ilmiah kajian sejarah dengan visualisasi geospasial modern (WebGIS), dengan mengedepankan keterbukaan data dan transparansi atas ketidakpastian sumber.
        </p>
      </div>

      {/* Section 1: Certainty Rubric & Methodology */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#B58B4D]/40 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <ShieldCheck className="w-6 h-6 text-[#426B60]" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#172B36]">
            Standar Verifikasi & Rubrik Kepastian Data
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Historiografi kerajaan Islam di Nusantara memiliki tantangan tersendiri: perbedaan kronik naskah lokal (babad/hikayat), konversi kalender Hijriah ke Masehi, nisan makam bertarikh, serta catatan pengelana asing (Tiongkok, Arab, Portugis, Belanda). Kami membagi tingkat kepastian data menjadi tiga tingkatan tegas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tingkat A: Terverifikasi</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Memiliki bukti epigrafi primer tak terbantahkan (seperti batu nisan berangka tahun jelas), naskah perjanjian resmi sezaman, atau kesepakatan konsensus para sejarawan utama.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Tingkat B: Estimasi Primer</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Disimpulkan berdasarkan rekonsiliasi naskah historiografi lokal (Babad Tanah Jawi, Hikayat Banjar) dan laporan saksi mata asing (Tomé Pires, Ibnu Battuta). Terdapat selisih beberapa tahun antar sumber.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-blue-900 text-sm">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Tingkat C: Rekonstruksi Spasial</span>
            </div>
            <p className="text-blue-800 leading-relaxed">
              Batas teritorial maritim masa lampau tidak mengenal batas garis tegas ala negara modern (Westphalian). Poligon wilayah menggambarkan zona pengaruh hegemoni dan jaringan upeti pelabuhan.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Batasan Rekonstruksi Wilayah Historis */}
      <div className="bg-[#172B36] text-[#F4F0E6] p-6 sm:p-8 rounded-2xl border-2 border-[#B58B4D] shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#B58B4D]" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F4F0E6]">
            Prinsip Ketat Rekonstruksi Wilayah (Anti-Spekulasi)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#F4F0E6]/85 leading-relaxed">
          Dalam proyek Atlas Islam Nusantara, kami memegang komitmen ilmiah: <strong>"Tidak menggambar batas poligon wilayah historis yang tidak didukung data riil."</strong> Untuk kerajaan yang catatan teritorialnya belum cukup kuat, kami hanya menampilkan titik pusat pemerintahan (ibu kota) dan situs peninggalan fisiknya. Hal ini mencegah kekeliruan anakronistik dan klaim sejarah yang berlebihan.
        </p>
      </div>

      {/* Section 3: Antigravity WebGIS Readiness */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#B58B4D]/40 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Code2 className="w-6 h-6 text-[#172B36]" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#172B36]">
            Kesiapan Integrasi Google Antigravity & Standar GeoJSON
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Seluruh entitas spasial dirancang sesuai spesifikasi RFC 7946 (GeoJSON FeatureCollection) dan schema data terstruktur (Kingdoms, Rulers, Sites, Territories, Events, Sources). Arsitektur ini siap dialirkan ke pustaka Leaflet lanjutan, OpenLayers, maupun pipeline Google Antigravity WebGIS untuk visualisasi analitik tingkat lanjut.
        </p>
        <div className="bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/30 text-xs font-mono text-[#172B36]">
          <code>
            {`// Struktur Schema: kingdoms [1:N] rulers, sites, territories, sources
{
  "id": "kd-samudera-pasai",
  "geometry": { "type": "Point", "coordinates": [97.2038, 5.1275] },
  "territories": ["ter-pasai-1"],
  "certainty": "verified"
}`}
          </code>
        </div>
      </div>

      {/* Section 4: Full Academic Bibliography */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#B58B4D]" />
          <h3 className="font-serif text-2xl font-bold text-[#172B36]">
            Daftar Pustaka & Bibliografi Akademik
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {sourcesData.map((src, index) => (
            <div
              key={src.id}
              className="bg-white p-4 sm:p-5 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-1.5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold text-sm text-[#172B36]">
                  [{index + 1}] {src.title}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6] shrink-0">
                  {src.source_type}
                </span>
              </div>
              <p className="text-xs text-gray-700">
                <strong>Penulis:</strong> {src.authors} ({src.publication_year}) &bull; {src.publisher} {src.pages && `&bull; ${src.pages}`}
              </p>
              <div className="text-xs text-[#426B60] bg-[#F4F0E6] p-2 rounded border border-[#B58B4D]/20">
                <span className="font-semibold text-[#172B36]">Dukungan Fakta: </span>
                {src.supports}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
