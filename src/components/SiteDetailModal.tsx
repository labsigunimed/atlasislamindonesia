import React from 'react';
import { X, MapPin, Landmark, Calendar, ShieldCheck, BookOpen, ExternalLink, Copy, Check } from 'lucide-react';
import { HeritageSite, Kingdom, Source } from '../types/atlas';

interface SiteDetailModalProps {
  site: HeritageSite | null;
  onClose: () => void;
  kingdoms: Kingdom[];
  sources: Source[];
  onViewOnMap: (site: HeritageSite) => void;
  onSelectKingdom: (kingdom: Kingdom) => void;
}

export const SiteDetailModal: React.FC<SiteDetailModalProps> = ({
  site,
  onClose,
  kingdoms,
  sources,
  onViewOnMap,
  onSelectKingdom,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!site) return null;

  const associatedKingdoms = kingdoms.filter((k) => site.kingdom_ids.includes(k.id));
  const associatedSources = sources.filter((s) => site.source_ids.includes(s.id));

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${site.latitude}, ${site.longitude}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-site-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="bg-[#F4F0E6] text-[#172B36] w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-[#426B60] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Photo Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#172B36]">
          <img
            src={site.image}
            alt={site.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172B36] via-[#172B36]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F4F0E6]/80 hover:text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors z-10"
            aria-label="Tutup rincian situs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Badges */}
          <div className="absolute bottom-4 left-4 right-4 text-[#F4F0E6]">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#426B60] text-white border border-emerald-400/40">
                {site.site_type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B58B4D] text-[#172B36]">
                {site.preservation_status}
              </span>
            </div>
            <h2 id="modal-site-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {site.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(92vh-340px)] text-xs sm:text-sm">
          
          {/* Location & Period Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-[#B58B4D]/30">
            <div className="space-y-1">
              <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#426B60]" /> Lokasi Administratif
              </div>
              <div className="font-semibold text-[#172B36]">
                {site.regency}, {site.province}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <span>{site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}</span>
                <button
                  onClick={copyCoordinates}
                  className="p-1 hover:text-[#172B36] transition-colors"
                  title="Salin koordinat GPS"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-3 pt-2 sm:pt-0">
              <div className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#B58B4D]" /> Tarikh Pendirian / Era
              </div>
              <div className="font-semibold text-[#172B36]">{site.period}</div>
              <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Terdaftar dalam Inventaris Cagar Budaya
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-[#172B36]">
              Deskripsi Arsitektur & Peran Sejarah
            </h4>
            <p className="text-gray-800 leading-relaxed text-xs sm:text-sm bg-white/70 p-4 rounded-xl border border-[#B58B4D]/20">
              {site.description}
            </p>
          </div>

          {/* Associated Kingdoms */}
          {associatedKingdoms.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-base text-[#172B36] flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-[#B58B4D]" />
                <span>Kaitan Dinasti Kerajaan / Kesultanan</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {associatedKingdoms.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => {
                      onClose();
                      onSelectKingdom(k);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#172B36] hover:text-[#F4F0E6] text-[#172B36] border border-[#B58B4D]/40 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{k.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#B58B4D]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {associatedSources.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-base text-[#172B36] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#426B60]" />
                <span>Rujukan Akademik</span>
              </h4>
              <div className="space-y-1.5">
                {associatedSources.map((source) => (
                  <div key={source.id} className="text-xs text-gray-700 bg-[#eae3d2] p-2.5 rounded-lg border border-[#B58B4D]/30">
                    <span className="font-bold text-[#172B36]">{source.title}</span> ({source.authors}, {source.publication_year}) &bull; {source.publisher}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#eae3d2] border-t border-[#426B60]/30 flex justify-between items-center text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium border border-gray-300"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              onClose();
              onViewOnMap(site);
            }}
            className="px-5 py-2 rounded-lg bg-[#426B60] hover:bg-[#325249] text-white font-semibold flex items-center gap-1.5 shadow"
          >
            <MapPin className="w-4 h-4" />
            <span>Fokuskan ke Peta Interaktif</span>
          </button>
        </div>
      </div>
    </div>
  );
};
