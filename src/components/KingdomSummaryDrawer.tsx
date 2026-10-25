import React from 'react';
import { X, ExternalLink, Calendar, MapPin, Crown, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';
import { Kingdom, Ruler, HeritageSite } from '../types/atlas';

interface KingdomSummaryDrawerProps {
  kingdom: Kingdom | null;
  onClose: () => void;
  onOpenFullDetail: (kingdom: Kingdom) => void;
  onFocusSites: (kingdom: Kingdom) => void;
  rulers: Ruler[];
  sites: HeritageSite[];
}

export const KingdomSummaryDrawer: React.FC<KingdomSummaryDrawerProps> = ({
  kingdom,
  onClose,
  onOpenFullDetail,
  onFocusSites,
  rulers,
  sites,
}) => {
  if (!kingdom) return null;

  const kingdomRulers = rulers.filter((r) => r.kingdom_id === kingdom.id);
  const kingdomSites = sites.filter((s) => s.kingdom_ids.includes(kingdom.id));

  return (
    <aside
      aria-label={`Ringkasan ${kingdom.name}`}
      className="absolute top-4 right-4 z-20 w-[calc(100vw-32px)] sm:w-96 max-h-[88vh] bg-[#F4F0E6] text-[#172B36] rounded-xl shadow-2xl border-2 border-[#B58B4D]/60 flex flex-col overflow-hidden backdrop-blur-sm animate-in slide-in-from-right duration-300"
    >
      {/* Drawer Header with Archival Emblem & Close Button */}
      <div className="relative bg-[#172B36] text-[#F4F0E6] p-4 border-b border-[#B58B4D]/40">
        <div className="flex items-start justify-between">
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{kingdom.emblem_symbol || '👑'}</span>
              <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[#B58B4D]/20 text-[#B58B4D] font-bold border border-[#B58B4D]/30">
                {kingdom.region}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-medium flex items-center gap-1 border border-emerald-700/40">
                <ShieldCheck className="w-3 h-3" />
                {kingdom.founded_certainty === 'verified' ? 'Terverifikasi' : 'Estimasi'}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F4F0E6] leading-tight">
              {kingdom.name}
            </h2>
            {kingdom.alternate_names.length > 0 && (
              <p className="text-xs text-[#B58B4D] italic mt-0.5">
                alias: {kingdom.alternate_names.join(', ')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#F4F0E6]/60 hover:text-[#F4F0E6] p-1.5 rounded-lg hover:bg-[#12222b] transition-colors"
            aria-label="Tutup ringkasan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(88vh-140px)] text-xs">
        
        {/* Core Quick Facts Grid */}
        <div className="grid grid-cols-2 gap-2 bg-white/80 p-3 rounded-lg border border-[#B58B4D]/30">
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#426B60]" /> Pusat / Ibu Kota
            </div>
            <div className="font-semibold text-xs text-[#172B36] mt-0.5">{kingdom.capital}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#B58B4D]" /> Berdiri
            </div>
            <div className="font-semibold text-xs text-[#172B36] mt-0.5">
              {kingdom.founded ? `${kingdom.founded} M` : 'Tidak tercatat'}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Masa Kejayaan</div>
            <div className="font-medium text-[11px] text-[#172B36] mt-0.5">{kingdom.golden_age}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wide">Akhir Kedaulatan Politik</div>
            <div className="font-medium text-[11px] text-[#172B36] mt-0.5">
              {kingdom.ended ? `${kingdom.ended} M` : 'Status Swapraja'}
            </div>
          </div>
        </div>

        {/* Current Heritage Status */}
        <div className="p-2.5 rounded-md bg-[#eae3d2] border border-[#B58B4D]/30 text-[11px]">
          <span className="font-semibold text-[#172B36]">Status Kultural Hari Ini: </span>
          <span className="text-[#172B36]/80">{kingdom.current_status}</span>
        </div>

        {/* Brief Historical Summary */}
        <div>
          <h4 className="font-serif font-bold text-sm text-[#172B36] mb-1">Ikhtisar Sejarah</h4>
          <p className="text-xs text-[#172B36]/85 leading-relaxed line-clamp-4">
            {kingdom.history_summary}
          </p>
        </div>

        {/* Key Sultans Preview */}
        {kingdomRulers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-serif font-bold text-sm text-[#172B36] flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#B58B4D]" />
                <span>Sultan & Penguasa Terdokumentasi</span>
              </h4>
              <span className="text-[10px] text-gray-500">{kingdomRulers.length} Tokoh</span>
            </div>
            <div className="space-y-1.5">
              {kingdomRulers.slice(0, 2).map((r) => (
                <div key={r.id} className="p-2 bg-white/70 rounded border border-[#B58B4D]/25">
                  <div className="font-semibold text-[11px] text-[#172B36]">{r.name}</div>
                  <div className="text-[10px] text-[#B58B4D]">
                    {r.reign_start} – {r.reign_end} M &bull; {r.titles}
                  </div>
                </div>
              ))}
              {kingdomRulers.length > 2 && (
                <div className="text-[10px] text-gray-500 italic text-center">
                  +{kingdomRulers.length - 2} sultan lainnya tercatat di arsip
                </div>
              )}
            </div>
          </div>
        )}

        {/* Heritage Sites Associated */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-serif font-bold text-sm text-[#172B36] flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-[#426B60]" />
              <span>Situs Peninggalan Terkait</span>
            </h4>
            <span className="text-[10px] font-semibold text-[#426B60] bg-emerald-100 px-1.5 py-0.5 rounded">
              {kingdomSites.length} Situs
            </span>
          </div>
          {kingdomSites.length > 0 ? (
            <div className="space-y-1.5">
              {kingdomSites.slice(0, 2).map((site) => (
                <div key={site.id} className="p-2 bg-white/70 rounded border border-[#426B60]/25 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[11px] text-[#172B36]">{site.name}</div>
                    <div className="text-[10px] text-gray-500">{site.regency}, {site.province}</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                    {site.site_type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-gray-500 italic">Belum ada situs fisik terdata untuk kerajaan ini.</p>
          )}
        </div>
      </div>

      {/* Drawer Action Buttons */}
      <div className="p-3 bg-[#eae3d2] border-t border-[#B58B4D]/30 flex flex-col gap-2">
        <button
          onClick={() => onOpenFullDetail(kingdom)}
          className="w-full py-2 px-3 bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] rounded-md font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Jelajahi Sejarah Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B58B4D]" />
        </button>

        {kingdomSites.length > 0 && (
          <button
            onClick={() => onFocusSites(kingdom)}
            className="w-full py-1.5 px-3 bg-white/80 hover:bg-white text-[#426B60] border border-[#426B60]/40 rounded-md font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Fokuskan Peta ke {kingdomSites.length} Situs Terkait</span>
          </button>
        )}
      </div>
    </aside>
  );
};
