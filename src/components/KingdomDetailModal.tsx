import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Crown,
  Landmark,
  BookOpen,
  Map,
  ShieldCheck,
  History,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Kingdom, Ruler, HeritageSite, Territory, HistoricalEvent, Source } from '../types/atlas';

interface KingdomDetailModalProps {
  kingdom: Kingdom | null;
  onClose: () => void;
  rulers: Ruler[];
  sites: HeritageSite[];
  territories: Territory[];
  events: HistoricalEvent[];
  sources: Source[];
  onSelectSiteOnMap: (site: HeritageSite) => void;
}

type TabKey = 'overview' | 'rulers' | 'events' | 'territory' | 'sites' | 'sources';

export const KingdomDetailModal: React.FC<KingdomDetailModalProps> = ({
  kingdom,
  onClose,
  rulers,
  sites,
  territories,
  events,
  sources,
  onSelectSiteOnMap,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  if (!kingdom) return null;

  const kingdomRulers = rulers.filter((r) => r.kingdom_id === kingdom.id);
  const kingdomSites = sites.filter((s) => s.kingdom_ids.includes(kingdom.id));
  const kingdomTerritories = territories.filter((t) => t.kingdom_id === kingdom.id);
  const kingdomEvents = events.filter((e) => e.kingdom_id === kingdom.id);
  const kingdomSources = sources.filter((s) => kingdom.source_ids.includes(s.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-kingdom-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-[#F4F0E6] text-[#172B36] w-full max-w-4xl rounded-2xl shadow-2xl border-2 border-[#B58B4D] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* HERO SECTION */}
        <div className="relative bg-[#172B36] text-[#F4F0E6] p-6 sm:p-8 border-b-2 border-[#B58B4D]">
          {/* Subtle archival geometric background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B58B4D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F4F0E6]/70 hover:text-white bg-[#12222b] hover:bg-black/40 p-2 rounded-full transition-colors"
            aria-label="Tutup halaman detail"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-2xl">{kingdom.emblem_symbol || '👑'}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B58B4D]/30 text-[#B58B4D] border border-[#B58B4D]/50 uppercase tracking-wider">
                  {kingdom.region}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-600/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {kingdom.founded_certainty === 'verified'
                    ? 'Tarikh Terverifikasi Epigrafi'
                    : 'Tarikh Estimasi Sumber Naskah'}
                </span>
              </div>
              
              <h1 id="modal-kingdom-title" className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#F4F0E6]">
                {kingdom.name}
              </h1>

              {kingdom.alternate_names.length > 0 && (
                <p className="text-sm text-[#B58B4D] italic mt-1">
                  Nama alternatif & kronik: {kingdom.alternate_names.join(', ')}
                </p>
              )}
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-row md:flex-col gap-2 shrink-0 text-xs">
              <div className="bg-[#12222b] px-3 py-2 rounded-lg border border-[#B58B4D]/30">
                <span className="text-[10px] text-[#B58B4D] block uppercase">Periode Kedaulatan</span>
                <span className="font-bold text-sm text-[#F4F0E6]">
                  {kingdom.founded ? `${kingdom.founded} M` : '?'} &mdash;{' '}
                  {kingdom.ended ? `${kingdom.ended} M` : 'Status Budaya'}
                </span>
              </div>
              <div className="bg-[#12222b] px-3 py-2 rounded-lg border border-[#B58B4D]/30">
                <span className="text-[10px] text-[#B58B4D] block uppercase">Pusat Pemerintahan</span>
                <span className="font-semibold text-[#F4F0E6] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#426B60]" />
                  {kingdom.capital}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-[#eae3d2] px-4 sm:px-6 border-b border-[#B58B4D]/30 flex space-x-1 sm:space-x-3 overflow-x-auto no-scrollbar text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Ikhtisar Sejarah</span>
          </button>

          <button
            onClick={() => setActiveTab('rulers')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'rulers'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Crown className="w-4 h-4 text-[#B58B4D]" />
            <span>Silsilah & Sultan ({kingdomRulers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#426B60]" />
            <span>Kronologi Peristiwa ({kingdomEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('territory')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'territory'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Wilayah Kekuasaan</span>
          </button>

          <button
            onClick={() => setActiveTab('sites')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sites'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <Landmark className="w-4 h-4 text-[#426B60]" />
            <span>Situs Terkait ({kingdomSites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-[#B58B4D] text-[#172B36] font-bold bg-[#F4F0E6]'
                : 'border-transparent text-[#172B36]/70 hover:text-[#172B36]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#B58B4D]" />
            <span>Sumber Akademik ({kingdomSources.length})</span>
          </button>
        </div>

        {/* TAB CONTENTS (Scrollable) */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-220px)] text-sm space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white/80 p-5 rounded-xl border border-[#B58B4D]/30 space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#172B36]">Deskripsi Historis</h3>
                <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-line">
                  {kingdom.history_summary}
                </p>
              </div>

              {/* Founding and Ending Specifics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 p-4 rounded-xl border border-emerald-600/30">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Latar Belakang Berdirinya</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {kingdom.founded_note}
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-amber-600/30">
                  <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                    <History className="w-4 h-4" />
                    <span>Perubahan Pemerintahan & Akhir Politik</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {kingdom.ended_note}
                  </p>
                </div>
              </div>

              {/* Status Hari Ini */}
              <div className="bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/40">
                <h4 className="font-serif font-bold text-base text-[#172B36] mb-1">
                  Status Institusi dan Pelestarian Budaya Hari Ini
                </h4>
                <p className="text-xs text-gray-800">
                  {kingdom.current_status}. Peninggalan fisik dilindungi oleh Undang-Undang Republik Indonesia Nomor 11 Tahun 2010 tentang Cagar Budaya.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: RULERS / SULTANS */}
          {activeTab === 'rulers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#172B36]">
                  Daftar Sultan & Penguasa Terverifikasi
                </h3>
                <span className="text-xs text-gray-500">
                  Disusun berdasarkan naskah kronik resmi dan batu nisan
                </span>
              </div>

              {kingdomRulers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kingdomRulers.map((ruler) => (
                    <div
                      key={ruler.id}
                      className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-2 hover:border-[#B58B4D] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#172B36]">
                            {ruler.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#B58B4D] block mt-0.5">
                            {ruler.reign_start} – {ruler.reign_end} M
                          </span>
                        </div>
                        <Crown className="w-5 h-5 text-[#B58B4D] shrink-0" />
                      </div>

                      <div className="text-xs text-gray-600 bg-[#F4F0E6] p-2 rounded">
                        <span className="font-semibold text-[#172B36]">Gelar Resmi: </span>
                        {ruler.titles}
                      </div>

                      {ruler.reign_note && (
                        <p className="text-xs text-gray-700 italic">
                          "{ruler.reign_note}"
                        </p>
                      )}

                      <div className="text-[11px] text-gray-700 border-t border-gray-100 pt-2">
                        <span className="font-medium text-[#172B36]">Catatan Suksesi: </span>
                        {ruler.succession_notes}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40">
                  <Crown className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Daftar sultan sedang dalam tahap verifikasi transliterasi naskah lokal.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#172B36]">
                Kronologi Peristiwa Penting
              </h3>

              {kingdomEvents.length > 0 ? (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#B58B4D]/40">
                  {kingdomEvents.map((event) => (
                    <div key={event.id} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#B58B4D] border-2 border-white shadow" />
                      <div className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6]">
                            {event.year_label}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#172B36]">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {event.description}
                        </p>
                        <div className="text-[11px] text-[#426B60] font-medium pt-1">
                          Signifikansi: {event.significance}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40">
                  <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Belum ada peristiwa khusus yang diindeks secara kronologis dalam dataset ini.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TERRITORY */}
          {activeTab === 'territory' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#172B36]">
                Wilayah Kekuasaan & Rekonstruksi Kartografi
              </h3>

              <div className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 space-y-2">
                <h4 className="font-semibold text-sm text-[#172B36]">Cakupan Geografis & Geopolitik</h4>
                <p className="text-xs text-gray-800 leading-relaxed">
                  {kingdom.territory_notes}
                </p>
              </div>

              {kingdomTerritories.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-base text-[#172B36]">
                    Lapisan Spasial / Poligon Teritori ({kingdomTerritories.length})
                  </h4>
                  {kingdomTerritories.map((t) => (
                    <div
                      key={t.id}
                      className="bg-[#eae3d2] p-4 rounded-xl border border-[#B58B4D]/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#172B36]">{t.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-900 text-emerald-100">
                          {t.certainty}
                        </span>
                      </div>
                      <div className="text-xs text-gray-700">
                        <span className="font-semibold">Rentang Rekonstruksi: </span>
                        {t.period_start} – {t.period_end} M
                      </div>
                      <div className="text-xs text-gray-700 bg-white/70 p-2.5 rounded border border-[#B58B4D]/20">
                        <span className="font-semibold text-[#172B36]">Metode Rekonstruksi: </span>
                        {t.reconstruction_method}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900">
                  <p className="font-semibold mb-1">Catatan Integritas Kartografi:</p>
                  <p>
                    Batas wilayah poligon untuk kesultanan ini belum dimasukkan karena keterbatasan sumber primer yang teruji. Sesuai prinsip metodologi digital atlas, batas fiktif tidak digambar sembarangan demi menjaga akurasi ilmiah.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: HERITAGE SITES */}
          {activeTab === 'sites' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-[#172B36]">
                  Situs Peninggalan Sejarah ({kingdomSites.length})
                </h3>
                <span className="text-xs text-gray-500">
                  Masjid kuno, keraton, makam, dan benteng pertahanan
                </span>
              </div>

              {kingdomSites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kingdomSites.map((site) => (
                    <div
                      key={site.id}
                      className="bg-white rounded-xl border border-[#B58B4D]/30 overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div className="h-36 overflow-hidden relative">
                        <img
                          src={site.image}
                          alt={site.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#172B36]/90 text-[#F4F0E6] border border-[#B58B4D]/50">
                          {site.site_type}
                        </span>
                      </div>
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#172B36]">
                            {site.name}
                          </h4>
                          <p className="text-[11px] text-[#426B60] font-medium flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {site.regency}, {site.province}
                          </p>
                          <p className="text-xs text-gray-700 line-clamp-2 mt-1.5">
                            {site.description}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                            {site.preservation_status}
                          </span>
                          <button
                            onClick={() => {
                              onClose();
                              onSelectSiteOnMap(site);
                            }}
                            className="text-xs font-semibold text-[#B58B4D] hover:underline flex items-center gap-1"
                          >
                            <span>Lihat di Peta</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-white/60 rounded-xl border border-dashed border-[#B58B4D]/40">
                  <Landmark className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Belum ada rekaman situs fisik terverifikasi untuk entitas ini.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SOURCES */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#172B36]">
                Rujukan & Sumber Sejarah
              </h3>
              <p className="text-xs text-gray-600">
                Setiap klaim kronologi, figur kepemimpinan, dan rekonstruksi spasial didukung oleh kajian akademik dan naskah kuno yang dapat ditelusuri.
              </p>

              {kingdomSources.length > 0 ? (
                <div className="space-y-3">
                  {kingdomSources.map((source) => (
                    <div
                      key={source.id}
                      className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-[#172B36]">{source.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6] shrink-0">
                          {source.source_type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700">
                        <strong>Penulis / Penyunting:</strong> {source.authors} ({source.publication_year}) &bull; {source.publisher} {source.pages && `&bull; ${source.pages}`}
                      </p>
                      <p className="text-xs text-[#426B60] bg-[#eae3d2] p-2 rounded border border-[#B58B4D]/20">
                        <strong>Fakta yang Didukung:</strong> {source.supports}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">Rujukan tersimpan pada indeks bibliografi utama.</p>
              )}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex justify-between items-center text-xs">
          <span className="text-gray-600 text-[11px]">
            Data arsip Atlas Islam Nusantara &bull; Lisensi Sains Terbuka
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#172B36] text-[#F4F0E6] rounded-lg font-medium hover:bg-[#12222b] transition-colors"
          >
            Tutup Halaman
          </button>
        </div>
      </div>
    </div>
  );
};
