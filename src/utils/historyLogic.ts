import type { Kingdom, HeritageSite, FilterState, Territory } from '../types/atlas.ts';

/**
 * Checks if a kingdom was politically or historically active during the specified year.
 * An empty ended year is treated as ongoing or incomplete data depending on context.
 */
export function isKingdomActiveInYear(kingdom: Kingdom, year: number): boolean {
  if (kingdom.founded === null) return false;
  const start = kingdom.founded;
  const end = kingdom.ended ?? 2026;
  return year >= start && year <= end;
}

/**
 * Checks if a kingdom overlaps with a given year range [minYear, maxYear].
 */
export function isKingdomInYearRange(kingdom: Kingdom, minYear: number, maxYear: number): boolean {
  if (kingdom.founded === null) return true; // Keep accessible if date uncertain
  const start = kingdom.founded;
  const end = kingdom.ended ?? 2026;
  return start <= maxYear && end >= minYear;
}

/**
 * Filters kingdoms based on user criteria:
 * region, yearRange, certainty, and search query.
 */
export function filterKingdoms(kingdoms: Kingdom[], filter: FilterState): Kingdom[] {
  return kingdoms.filter((kd) => {
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
      const matchAlt = altNames.some((alt) => (alt || '').toLowerCase().includes(q));
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
export function filterSites(
  sites: HeritageSite[],
  filter: FilterState,
  visibleKingdomIds?: Set<string>
): HeritageSite[] {
  return sites.filter((site) => {
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
      const matchesVisibleKingdom = site.kingdom_ids.some((id) => visibleKingdomIds.has(id));
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
export function getAtlasStats(
  kingdoms: Kingdom[],
  sites: HeritageSite[],
  territories: Territory[]
) {
  const uniqueRegions = new Set(kingdoms.map((k) => k.region)).size;
  return {
    totalKingdoms: kingdoms.length,
    totalSites: sites.length,
    totalRegions: uniqueRegions,
    totalTerritories: territories.length,
  };
}

/**
 * Format year representation with historical precision.
 */
export function formatReignYear(start: number | null, end: number | null): string {
  if (start === null && end === null) return 'Tarikh tidak tercatat';
  if (start !== null && end === null) return `${start} M — masa kini`;
  if (start === null && end !== null) return `hingga ${end} M`;
  return `${start} — ${end} M`;
}
