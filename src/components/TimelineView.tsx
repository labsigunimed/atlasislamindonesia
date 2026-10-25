import React, { useState } from 'react';
import { Calendar, Crown, Clock, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { Kingdom, HistoricalEvent } from '../types/atlas';
import { isKingdomActiveInYear } from '../utils/historyLogic';

interface TimelineViewProps {
  kingdoms: Kingdom[];
  events: HistoricalEvent[];
  onSelectKingdomOnMap: (kingdom: Kingdom) => void;
  onOpenKingdomDetail: (kingdom: Kingdom) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  kingdoms,
  events,
  onSelectKingdomOnMap,
  onOpenKingdomDetail,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(1550);
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const activeKingdomsAtYear = kingdoms.filter((kd) => isKingdomActiveInYear(kd, selectedYear));
  const nearbyEvents = events
    .filter((e) => Math.abs(e.year - selectedYear) <= 50)
    .sort((a, b) => a.year - b.year);

  const eraButtons = [
    { id: 'all', label: 'Seluruh Kronologi (1200 - 1950)', year: 1550 },
    { id: '13', label: '1267: Era Awal Samudera Pasai', year: 1297 },
    { id: '15', label: '1478: Kejayaan Demak & Walisongo', year: 1515 },
    { id: '16', label: '1575: Pengusiran Portugis oleh Baabullah', year: 1575 },
    { id: '17', label: '1628: Puncak Mataram & Iskandar Muda', year: 1628 },
    { id: '17b', label: '1667: Era Perjanjian Bungaya Makassar', year: 1667 },
    { id: '18', label: '1797: Gerilya Maritim Sultan Nuku', year: 1797 },
    { id: '20', label: '1945: Integrasi Kesultanan ke NKRI', year: 1945 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#B58B4D]/20 text-[#B58B4D] border border-[#B58B4D]/40">
          Kronologi Peradaban Islam Nusantara
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B36]">
          Garis Waktu Sejarah Kerajaan & Kesultanan
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Geser bilah waktu kronologis atau pilih momentum penting untuk melihat kerajaan yang aktif berdaulat secara bersamaan, suksesi pemerintahan, dan peristiwa bersejarah yang mengubah peta peradaban Nusantara.
        </p>
      </div>

      {/* Interactive Year Scrubber Panel */}
      <div className="bg-[#172B36] text-[#F4F0E6] p-6 rounded-2xl shadow-xl border-2 border-[#B58B4D]/60 space-y-6">
        
        {/* Big Display Year */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B58B4D]/30 pb-4">
          <div>
            <div className="text-xs text-[#B58B4D] uppercase tracking-wider font-semibold">Tahun Terpilih</div>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#F4F0E6]">
              Tahun {selectedYear} Masehi
            </div>
            <p className="text-xs text-[#F4F0E6]/70 mt-1">
              Menampilkan {activeKingdomsAtYear.length} kerajaan yang terdokumentasi aktif berdaulat pada kurun ini.
            </p>
          </div>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap gap-1.5 max-w-md">
            {eraButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setSelectedEra(btn.id);
                  setSelectedYear(btn.year);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors border ${
                  selectedYear === btn.year
                    ? 'bg-[#B58B4D] text-[#172B36] font-bold border-[#B58B4D]'
                    : 'bg-[#12222b] text-[#F4F0E6]/80 border-[#B58B4D]/30 hover:border-[#B58B4D]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Slider Control */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#B58B4D] font-semibold">
            <span>1200 M (Pra-Pasai)</span>
            <span>1500 M (Masa Demak)</span>
            <span>1700 M (Era VOC)</span>
            <span>1950 M (Kemerdekaan RI)</span>
          </div>
          <input
            type="range"
            min="1200"
            max="1950"
            step="5"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full h-3 bg-[#12222b] rounded-lg appearance-none cursor-pointer accent-[#B58B4D]"
            aria-label="Pilih tahun pada garis waktu"
          />
        </div>
      </div>

      {/* Grid: Active Kingdoms at this year vs Concurrent Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Active Kingdoms Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#172B36] flex items-center gap-2">
              <Crown className="w-5 h-5 text-[#B58B4D]" />
              <span>Kerajaan yang Berdaulat pada {selectedYear} M</span>
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#172B36] text-[#F4F0E6] font-semibold">
              {activeKingdomsAtYear.length} Entitas Aktif
            </span>
          </div>

          {activeKingdomsAtYear.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeKingdomsAtYear.map((kd) => (
                <div
                  key={kd.id}
                  className="bg-white p-5 rounded-xl border border-[#B58B4D]/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#B58B4D]/20 text-[#B58B4D]">
                        {kd.region}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {kd.founded} – {kd.ended || 'kini'} M
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-lg text-[#172B36]">
                      {kd.name}
                    </h4>

                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#426B60]" />
                      <span>Ibu Kota: <strong>{kd.capital}</strong></span>
                    </div>

                    <p className="text-xs text-gray-700 line-clamp-3">
                      {kd.history_summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-4">
                    <button
                      onClick={() => onSelectKingdomOnMap(kd)}
                      className="text-xs font-semibold text-[#426B60] hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Lihat di Peta</span>
                    </button>

                    <button
                      onClick={() => onOpenKingdomDetail(kd)}
                      className="px-3 py-1.5 rounded-md bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3 text-[#B58B4D]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white/70 rounded-2xl border border-dashed border-[#B58B4D]/40 space-y-2">
              <Clock className="w-10 h-10 text-gray-400 mx-auto" />
              <h4 className="font-serif text-lg font-semibold text-gray-700">
                Tidak Ada Kerajaan Terdata Aktif pada Tahun {selectedYear} M
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Coba geser bilah tahun ke abad ke-16 atau 17 saat masa kemakmuran kesultanan Nusantara sedang berada di puncaknya.
              </p>
            </div>
          )}
        </div>

        {/* Right Col: Timeline Milestones (Events in proximity) */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#172B36] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#426B60]" />
            <span>Peristiwa Penting Terkait</span>
          </h3>

          <div className="space-y-3">
            {nearbyEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs px-2 py-0.5 rounded bg-[#172B36] text-[#F4F0E6]">
                    {evt.year_label}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#172B36]">
                  {evt.title}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {evt.description}
                </p>
                <div className="text-[11px] text-[#426B60] font-medium pt-1 border-t border-gray-100">
                  {evt.significance}
                </div>
              </div>
            ))}

            {nearbyEvents.length === 0 && (
              <p className="text-xs text-gray-500 italic p-4 bg-white/60 rounded-xl text-center">
                Tidak ada catatan peristiwa penting dalam rentang &plusmn;50 tahun dari tahun terpilih.
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
