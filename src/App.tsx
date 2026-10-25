/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MapGIS } from './components/MapGIS';
import { FilterPanel } from './components/FilterPanel';
import { KingdomSummaryDrawer } from './components/KingdomSummaryDrawer';
import { KingdomDetailModal } from './components/KingdomDetailModal';
import { SiteDetailModal } from './components/SiteDetailModal';
import { TimelineView } from './components/TimelineView';
import { SitesCatalogView } from './components/SitesCatalogView';
import { SourcesAndAboutView } from './components/SourcesAndAboutView';

import { kingdomsData } from './data/kingdomsData';
import { sitesData } from './data/sitesData';
import { territoriesData } from './data/territoriesData';
import { rulersData } from './data/rulersData';
import { eventsData } from './data/eventsData';
import { sourcesData } from './data/sourcesData';

import { Kingdom, HeritageSite, FilterState } from './types/atlas';
import { filterKingdoms, filterSites, getAtlasStats } from './utils/historyLogic';
import { Compass, Sparkles, MapPin, Landmark } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'timeline' | 'sites' | 'sources'>('map');

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    regions: [],
    yearRange: [1200, 1950],
    siteTypes: [],
    certaintyLevels: [],
    searchQuery: '',
    activeKingdomId: null,
  });

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Selected Entities
  const [selectedKingdom, setSelectedKingdom] = useState<Kingdom | null>(null);
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [deepDiveKingdom, setDeepDiveKingdom] = useState<Kingdom | null>(null);

  // Map Navigation Focus
  const [focusLocation, setFocusLocation] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  // Filtered Data Computation
  const filteredKingdoms = useMemo(() => {
    return filterKingdoms(kingdomsData, filter);
  }, [filter]);

  const visibleKingdomIds = useMemo(() => {
    return new Set(filteredKingdoms.map((k) => k.id));
  }, [filteredKingdoms]);

  const filteredSites = useMemo(() => {
    return filterSites(sitesData, filter, visibleKingdomIds);
  }, [filter, visibleKingdomIds]);

  const filteredTerritories = useMemo(() => {
    return territoriesData.filter((t) => visibleKingdomIds.has(t.kingdom_id));
  }, [visibleKingdomIds]);

  // Overall Statistics from authentic database
  const stats = useMemo(() => {
    return getAtlasStats(kingdomsData, sitesData, territoriesData);
  }, []);

  // Handlers
  const handleSelectKingdom = (kingdom: Kingdom) => {
    setSelectedKingdom(kingdom);
    setFilter((prev) => ({ ...prev, activeKingdomId: kingdom.id }));
    setFocusLocation({ lat: kingdom.latitude, lng: kingdom.longitude, zoom: 8 });
  };

  const handleSelectSite = (site: HeritageSite) => {
    setSelectedSite(site);
  };

  const handleViewSiteOnMap = (site: HeritageSite) => {
    setActiveTab('map');
    setSelectedSite(site);
    setFocusLocation({ lat: site.latitude, lng: site.longitude, zoom: 11 });
  };

  const handleFocusKingdomSites = (kingdom: Kingdom) => {
    const kingdomSites = sitesData.filter((s) => s.kingdom_ids.includes(kingdom.id));
    if (kingdomSites.length > 0) {
      setFocusLocation({ lat: kingdomSites[0].latitude, lng: kingdomSites[0].longitude, zoom: 10 });
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
      activeKingdomId: null,
    });
    setFocusLocation({ lat: -2.5, lng: 118.0, zoom: 5 });
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#172B36] flex flex-col font-sans">
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filter={filter}
        setFilter={setFilter}
        onResetMap={handleResetMap}
        totalKingdoms={filteredKingdoms.length}
        totalSites={filteredSites.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* VIEW 1: EXPLORE ATLAS MAP */}
        {activeTab === 'map' && (
          <div className="flex-1 flex flex-col relative w-full" style={{ height: 'calc(100vh - 110px)', minHeight: '600px' }}>
            
            {/* Context Sub-header Banner */}
            <div className="bg-[#172B36]/95 text-[#F4F0E6] px-4 py-2 border-b border-[#B58B4D]/30 z-10 hidden sm:flex items-center justify-between text-xs shrink-0">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#B58B4D]" />
                <h1 className="font-serif font-bold text-sm tracking-wide text-[#F4F0E6]">
                  Menelusuri Jejak Kerajaan Islam di Nusantara
                </h1>
                <span className="text-gray-400">&bull;</span>
                <span className="text-gray-300">
                  Menghubungkan titik spasial, kronologi tarikh, suksesi sultan, dan peninggalan arsitektur bersejarah.
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-medium text-[#B58B4D]">
                <span>Data Kurasi: {stats.totalKingdoms} Kerajaan</span>
                <span>&bull;</span>
                <span>{stats.totalSites} Cagar Budaya Terverifikasi</span>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
              {/* Filter Panel Drawer */}
              <FilterPanel
                filter={filter}
                setFilter={setFilter}
                isOpen={isFilterPanelOpen}
                setIsOpen={setIsFilterPanelOpen}
                filteredKingdomsCount={filteredKingdoms.length}
                filteredSitesCount={filteredSites.length}
              />

              {/* Leaflet WebGIS Map Component */}
              <MapGIS
                kingdoms={filteredKingdoms}
                sites={filteredSites}
                territories={filteredTerritories}
                selectedKingdom={selectedKingdom}
                onSelectKingdom={handleSelectKingdom}
                onSelectSite={handleSelectSite}
                focusLocation={focusLocation}
                onResetFocus={() => setFocusLocation(null)}
              />

              {/* Kingdom Summary Floating Drawer */}
              {selectedKingdom && (
                <KingdomSummaryDrawer
                  kingdom={selectedKingdom}
                  onClose={() => setSelectedKingdom(null)}
                  onOpenFullDetail={(kd) => setDeepDiveKingdom(kd)}
                  onFocusSites={handleFocusKingdomSites}
                  rulers={rulersData}
                  sites={sitesData}
                />
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="flex-1 overflow-y-auto">
            <TimelineView
              kingdoms={kingdomsData}
              events={eventsData}
              onSelectKingdomOnMap={(kd) => {
                setActiveTab('map');
                handleSelectKingdom(kd);
              }}
              onOpenKingdomDetail={(kd) => setDeepDiveKingdom(kd)}
            />
          </div>
        )}

        {/* VIEW 3: HERITAGE SITES CATALOG */}
        {activeTab === 'sites' && (
          <div className="flex-1 overflow-y-auto">
            <SitesCatalogView
              sites={sitesData}
              kingdoms={kingdomsData}
              onSelectSiteOnMap={handleViewSiteOnMap}
              onOpenSiteDetail={(site) => setSelectedSite(site)}
            />
          </div>
        )}

        {/* VIEW 4: SOURCES & ABOUT */}
        {activeTab === 'sources' && (
          <div className="flex-1 overflow-y-auto">
            <SourcesAndAboutView />
          </div>
        )}

      </main>

      {/* FULL MODALS */}
      {/* 1. Deep Dive Kingdom Detail Modal */}
      {deepDiveKingdom && (
        <KingdomDetailModal
          kingdom={deepDiveKingdom}
          onClose={() => setDeepDiveKingdom(null)}
          rulers={rulersData}
          sites={sitesData}
          territories={territoriesData}
          events={eventsData}
          sources={sourcesData}
          onSelectSiteOnMap={handleViewSiteOnMap}
        />
      )}

      {/* 2. Heritage Site Detail Modal */}
      {selectedSite && (
        <SiteDetailModal
          site={selectedSite}
          onClose={() => setSelectedSite(null)}
          kingdoms={kingdomsData}
          sources={sourcesData}
          onViewOnMap={handleViewSiteOnMap}
          onSelectKingdom={(k) => {
            setSelectedSite(null);
            handleSelectKingdom(k);
          }}
        />
      )}

    </div>
  );
}
