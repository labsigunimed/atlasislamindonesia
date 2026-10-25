import React, { useState } from 'react';
import { Landmark, MapPin, LayoutGrid, List, Search, ExternalLink, ShieldCheck } from 'lucide-react';
import { HeritageSite, Kingdom, SiteType, Region } from '../types/atlas';

interface SitesCatalogViewProps {
  sites: HeritageSite[];
  kingdoms: Kingdom[];
  onSelectSiteOnMap: (site: HeritageSite) => void;
  onOpenSiteDetail: (site: HeritageSite) => void;
}

const ALL_SITE_TYPES: SiteType[] = [
  'Masjid Bersejarah',
  'Keraton & Istana',
  'Makam Sultan',
  'Benteng Pertahanan',
  'Prasasti & Batu Bersurat',
  'Museum',
];

export const SitesCatalogView: React.FC<SitesCatalogViewProps> = ({
  sites,
  kingdoms,
  onSelectSiteOnMap,
  onOpenSiteDetail,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [query, setQuery] = useState('');

  // Unique provinces
  const provinces = Array.from(new Set(sites.map((s) => s.province))).sort();

  // Filtered sites
  const filteredSites = sites.filter((site) => {
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

  const getKingdomNames = (kingdomIds: string[]) => {
    return kingdoms
      .filter((k) => kingdomIds.includes(k.id))
      .map((k) => k.name)
      .join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#B58B4D]/30 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-[#426B60]/20 text-[#426B60] border border-[#426B60]/30">
            Inventaris Warisan Fisik
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#172B36] mt-2">
            Katalog Situs Peninggalan Islam Nusantara
          </h2>
          <p className="text-sm text-gray-700 mt-1 max-w-2xl">
            Menelusuri peninggalan arsitektur bernilai sejarah tinggi seperti masjid beratap tumpang, istana kesultanan, makam para pendiri dinasti, dan benteng pertahanan maritim.
          </p>
        </div>

        {/* View Switcher (Grid vs List) */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-white p-1 rounded-lg border border-[#B58B4D]/30 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors flex items-center gap-1.5 text-xs font-medium ${
              viewMode === 'grid'
                ? 'bg-[#172B36] text-[#F4F0E6]'
                : 'text-gray-600 hover:text-black'
            }`}
            title="Tampilan Kotak Gambar (Grid)"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors flex items-center gap-1.5 text-xs font-medium ${
              viewMode === 'list'
                ? 'bg-[#172B36] text-[#F4F0E6]'
                : 'text-gray-600 hover:text-black'
            }`}
            title="Tampilan Daftar (List)"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Daftar</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#B58B4D]/30 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
              selectedCategory === 'all'
                ? 'bg-[#172B36] text-[#F4F0E6]'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Semua Kategori ({sites.length})
          </button>
          {ALL_SITE_TYPES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-[#426B60] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Province Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none"
          >
            <option value="all">Semua Provinsi</option>
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>

          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Cari situs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-gray-800 focus:outline-none focus:border-[#B58B4D]"
            />
          </div>
        </div>
      </div>

      {/* SITES DISPLAY */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-2xl border border-[#B58B4D]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden bg-[#172B36]">
                <img
                  src={site.image}
                  alt={site.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#172B36]/90 text-[#F4F0E6] border border-[#B58B4D]/40 backdrop-blur-sm">
                  {site.site_type}
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 backdrop-blur-sm">
                  {site.preservation_status}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#172B36] group-hover:text-[#B58B4D] transition-colors">
                    {site.name}
                  </h3>
                  <div className="text-xs text-[#426B60] font-medium flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{site.regency}, {site.province}</span>
                  </div>
                  {site.kingdom_ids.length > 0 && (
                    <div className="text-[11px] text-gray-500 mt-1">
                      Kaitan: <strong>{getKingdomNames(site.kingdom_ids)}</strong>
                    </div>
                  )}
                  <p className="text-xs text-gray-700 line-clamp-3 mt-2 leading-relaxed">
                    {site.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectSiteOnMap(site)}
                    className="text-xs font-semibold text-[#426B60] hover:underline flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Lihat di Peta</span>
                  </button>

                  <button
                    onClick={() => onOpenSiteDetail(site)}
                    className="px-3 py-1.5 rounded-lg bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] text-xs font-medium transition-colors"
                  >
                    Rincian Lengkap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-[#B58B4D]/30 shadow-sm overflow-hidden divide-y divide-gray-100">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F4F0E6]/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0 border border-gray-200"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                      {site.site_type}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700">
                      {site.preservation_status}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#172B36]">
                    {site.name}
                  </h3>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#426B60]" />
                    <span>{site.regency}, {site.province}</span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-500">Era: {site.period}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onSelectSiteOnMap(site)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#426B60] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Lihat di Peta</span>
                </button>
                <button
                  onClick={() => onOpenSiteDetail(site)}
                  className="px-3.5 py-1.5 text-xs font-medium bg-[#172B36] hover:bg-[#12222b] text-[#F4F0E6] rounded-lg transition-colors"
                >
                  Rincian
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredSites.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-[#B58B4D]/40 space-y-2">
          <Landmark className="w-10 h-10 text-gray-400 mx-auto" />
          <h4 className="font-serif text-lg font-semibold text-gray-800">
            Tidak Ada Situs yang Sesuai dengan Kriteria
          </h4>
          <p className="text-xs text-gray-500">
            Coba pilih kategori "Semua Kategori" atau bersihkan kolom pencarian.
          </p>
        </div>
      )}
    </div>
  );
};
