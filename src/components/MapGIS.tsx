import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, MapPin, Maximize2, Shield, Eye, EyeOff, RotateCcw, AlertCircle } from 'lucide-react';
import { Kingdom, HeritageSite, Territory } from '../types/atlas';
import { CompassRose } from './CompassRose';

interface MapGISProps {
  kingdoms: Kingdom[];
  sites: HeritageSite[];
  territories: Territory[];
  selectedKingdom: Kingdom | null;
  onSelectKingdom: (kingdom: Kingdom) => void;
  onSelectSite: (site: HeritageSite) => void;
  focusLocation: { lat: number; lng: number; zoom?: number } | null;
  onResetFocus: () => void;
}

type BasemapType = 'carto-sepia' | 'osm-standard' | 'satellite';

export const MapGIS: React.FC<MapGISProps> = ({
  kingdoms,
  sites,
  territories,
  selectedKingdom,
  onSelectKingdom,
  onSelectSite,
  focusLocation,
  onResetFocus,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const kingdomLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const siteLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const territoryLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Layer visibility state
  const [showKingdoms, setShowKingdoms] = useState(true);
  const [showSites, setShowSites] = useState(true);
  const [showTerritories, setShowTerritories] = useState(true);
  const [basemap, setBasemap] = useState<BasemapType>('carto-sepia');
  const [showLegend, setShowLegend] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center of Indonesia archipelago
    const initialCenter: [number, number] = [-2.5, 118.0];
    const initialZoom = 5;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false, // Custom position
    });

    // Add scale bar
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Zoom control at bottom left
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

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
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = newTile;
  }, [basemap]);

  // Update Territories Layer
  useEffect(() => {
    const group = territoryLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!showTerritories) return;

    territories.forEach((t) => {
      const isRelatedToSelected = selectedKingdom?.id === t.kingdom_id;

      const polygon = L.polygon(t.coordinates, {
        color: isRelatedToSelected ? '#B58B4D' : '#426B60',
        weight: isRelatedToSelected ? 3 : 1.5,
        dashArray: isRelatedToSelected ? undefined : '5, 5',
        fillColor: isRelatedToSelected ? '#B58B4D' : '#426B60',
        fillOpacity: isRelatedToSelected ? 0.35 : 0.15,
      });

      polygon.bindTooltip(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
          <div style="font-weight:700; color:#172B36; font-size:12px;">${t.name}</div>
          <div style="font-size:10px; color:#666;">Periode: ${t.period_start} – ${t.period_end} M</div>
          <div style="font-size:10px; color:#426B60; font-weight:600;">Kepastian: ${t.certainty}</div>
        </div>`,
        { sticky: true, opacity: 0.95 }
      );

      polygon.addTo(group);
    });
  }, [territories, showTerritories, selectedKingdom]);

  // Update Kingdom Markers Layer
  useEffect(() => {
    const group = kingdomLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!showKingdoms) return;

    kingdoms.forEach((kd) => {
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
        iconAnchor: [16, 16],
      });

      const marker = L.marker([kd.latitude, kd.longitude], { icon });

      marker.bindTooltip(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif; text-align:center;">
          <strong style="color:#172B36; font-size:12px;">${kd.name}</strong>
          <div style="font-size:10px; color:#B58B4D; font-weight:600;">${kd.capital} (${kd.founded || '?'} – ${kd.ended || 'kini'} M)</div>
        </div>`,
        { direction: 'top', offset: [0, -14], opacity: 0.95 }
      );

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

    sites.forEach((site) => {
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
        iconAnchor: [13, 13],
      });

      const marker = L.marker([site.latitude, site.longitude], { icon });

      marker.bindTooltip(
        `<div style="font-family:'Plus Jakarta Sans',sans-serif; padding:2px;">
          <strong style="color:#172B36; font-size:11px;">${site.name}</strong>
          <div style="font-size:10px; color:#426B60; font-weight:600;">${site.site_type}</div>
          <div style="font-size:9px; color:#777;">${site.regency}, ${site.province}</div>
        </div>`,
        { direction: 'top', offset: [0, -12], opacity: 0.95 }
      );

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
      duration: 1.2,
    });
  }, [focusLocation]);

  const handleResetToIndonesia = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    onResetFocus();
    map.flyTo([-2.5, 118.0], 5, { duration: 1.0 });
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex-1 bg-[#F4F0E6] overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" tabIndex={0} aria-label="Peta Interaktif Sejarah Islam Nusantara" />

      {/* Top Right Map Control Bar */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
        {/* Mobile controls toggle button */}
        <button
          onClick={() => setShowLegend((prev) => !prev)}
          className="sm:hidden px-2.5 py-1.5 bg-[#172B36] text-[#F4F0E6] rounded-md shadow-lg border border-[#B58B4D]/40 text-xs flex items-center gap-1.5"
          title="Tampilkan Lapisan & Kontrol"
        >
          <Layers className="w-3.5 h-3.5 text-[#B58B4D]" />
          <span>Layer</span>
        </button>

        {/* Basemap Switcher & Layer Toggles Panel (visible on sm: or when toggled) */}
        <div className="hidden sm:block bg-[#172B36]/95 backdrop-blur text-[#F4F0E6] p-2 rounded-lg shadow-xl border border-[#B58B4D]/40 text-xs space-y-2">
          {/* Basemap buttons */}
          <div className="flex items-center gap-1 bg-[#12222b] p-1 rounded">
            <button
              onClick={() => setBasemap('carto-sepia')}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                basemap === 'carto-sepia'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/70 hover:text-white'
              }`}
              title="Tampilan Arsip Kertas Kartografi"
            >
              Arsip Kartografi
            </button>
            <button
              onClick={() => setBasemap('osm-standard')}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                basemap === 'osm-standard'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/70 hover:text-white'
              }`}
              title="OpenStreetMap Standar"
            >
              Topografi
            </button>
            <button
              onClick={() => setBasemap('satellite')}
              className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                basemap === 'satellite'
                  ? 'bg-[#B58B4D] text-[#172B36] font-bold'
                  : 'text-[#F4F0E6]/70 hover:text-white'
              }`}
              title="Citra Satelit Geografis"
            >
              Satelit
            </button>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="space-y-1 pt-1 border-t border-[#B58B4D]/20 text-[11px]">
            <label className="flex items-center justify-between cursor-pointer hover:text-white p-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B58B4D] inline-block"></span>
                Pusat Kerajaan ({kingdoms.length})
              </span>
              <input
                type="checkbox"
                checked={showKingdoms}
                onChange={(e) => setShowKingdoms(e.target.checked)}
                className="accent-[#B58B4D]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white p-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rotate-45 bg-[#426B60] inline-block border border-white"></span>
                Situs Peninggalan ({sites.length})
              </span>
              <input
                type="checkbox"
                checked={showSites}
                onChange={(e) => setShowSites(e.target.checked)}
                className="accent-[#426B60]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer hover:text-white p-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1.5 border border-dashed border-[#B58B4D] bg-[#B58B4D]/30 inline-block"></span>
                Batas Wilayah Historis ({territories.length})
              </span>
              <input
                type="checkbox"
                checked={showTerritories}
                onChange={(e) => setShowTerritories(e.target.checked)}
                className="accent-[#B58B4D]"
              />
            </label>
          </div>
        </div>

        {/* Reset View Button */}
        <button
          onClick={handleResetToIndonesia}
          className="px-2.5 py-1.5 bg-[#172B36]/90 hover:bg-[#172B36] text-[#F4F0E6] rounded-md shadow-lg border border-[#B58B4D]/40 text-xs font-medium flex items-center gap-1.5 transition-colors"
          title="Kembalikan pandangan ke seluruh Indonesia"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#B58B4D]" />
          <span className="hidden sm:inline">Reset Pandangan</span>
        </button>
      </div>

      {/* Orientasi Mata Angin (Nautical Compass Rose) */}
      <div className="absolute bottom-24 left-4 z-10 pointer-events-auto">
        <CompassRose onResetOrientation={handleResetToIndonesia} />
      </div>

      {/* Floating Dynamic Legend at Bottom Right */}
      {showLegend ? (
        <div className="absolute bottom-6 right-4 z-10 bg-[#F4F0E6]/95 backdrop-blur text-[#172B36] p-3 rounded-lg shadow-xl border border-[#B58B4D]/60 max-w-xs text-xs">
          <div className="flex items-center justify-between font-regal font-bold text-xs pb-1 mb-1.5 border-b border-[#B58B4D]/30">
            <span>Legenda Peta Sejarah</span>
            <button
              onClick={() => setShowLegend(false)}
              className="text-gray-500 hover:text-black text-[10px]"
            >
              Sembunyikan
            </button>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#172B36] border border-[#B58B4D] flex items-center justify-center text-[10px] text-white">
                👑
              </div>
              <span>Pusat Kedaulatan Kerajaan / Kesultanan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm rotate-45 bg-[#426B60] border border-white flex items-center justify-center text-[8px] text-white">
                <span className="-rotate-45">🕌</span>
              </div>
              <span>Situs Warisan (Masjid, Makam, Istana, Benteng)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 bg-[#B58B4D]/30 border border-dashed border-[#B58B4D] rounded-sm"></div>
              <span>Rekonstruksi Wilayah Kekuasaan (Poligon)</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowLegend(true)}
          className="absolute bottom-6 right-4 z-10 bg-[#F4F0E6] text-[#172B36] px-2.5 py-1 rounded shadow-md border border-[#B58B4D]/60 text-[11px] font-medium"
        >
          Buka Legenda
        </button>
      )}

      {/* Empty State Banner if 0 items match filter */}
      {kingdoms.length === 0 && sites.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#172B36]/95 text-[#F4F0E6] p-6 rounded-2xl shadow-2xl border-2 border-[#B58B4D] max-w-md text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-[#B58B4D] mx-auto" />
          <h4 className="font-serif text-lg font-bold">Tidak Ada Data yang Cocok</h4>
          <p className="text-xs text-[#F4F0E6]/80 leading-relaxed">
            Tidak ditemukan kerajaan atau situs yang sesuai dengan kombinasi filter wilayah atau rentang tahun terpilih. Silakan ubah filter atau klik tombol di bawah untuk mereset.
          </p>
          <button
            onClick={handleResetToIndonesia}
            className="px-4 py-2 bg-[#B58B4D] text-[#172B36] font-bold rounded-lg text-xs hover:bg-[#8e6d38] transition-colors"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};
