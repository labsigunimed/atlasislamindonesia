/**
 * Data Validation Script for Jelajah Kerajaan Islam Nusantara
 * Checks for ID duplicates, broken references, coordinates out of range,
 * chronological sanity, and GeoJSON validity.
 */

import fs from 'fs';
import path from 'path';

interface ValidationResult {
  errors: string[];
  warnings: string[];
  stats: Record<string, number>;
}

function runValidation(): ValidationResult {
  const result: ValidationResult = {
    errors: [],
    warnings: [],
    stats: {},
  };

  const dataDir = path.resolve(process.cwd(), 'src/data');

  // Load JSON & GeoJSON files
  const kingdoms = JSON.parse(fs.readFileSync(path.join(dataDir, 'kingdoms.json'), 'utf-8'));
  const rulers = JSON.parse(fs.readFileSync(path.join(dataDir, 'rulers.json'), 'utf-8'));
  const sites = JSON.parse(fs.readFileSync(path.join(dataDir, 'heritageSites.json'), 'utf-8'));
  const territories = JSON.parse(fs.readFileSync(path.join(dataDir, 'territories.geojson'), 'utf-8'));
  const sources = JSON.parse(fs.readFileSync(path.join(dataDir, 'sources.json'), 'utf-8'));

  result.stats = {
    totalKingdoms: kingdoms.length,
    totalRulers: rulers.length,
    totalSites: sites.length,
    totalTerritories: territories.features.length,
    totalSources: sources.length,
  };

  const kingdomIds = new Set<string>();
  const rulerIds = new Set<string>();
  const siteIds = new Set<string>();
  const sourceIds = new Set<string>();
  const territoryIds = new Set<string>();

  // 1. Validate Sources
  sources.forEach((s: any, idx: number) => {
    if (!s.id) result.errors.push(`Source #${idx} missing id`);
    if (sourceIds.has(s.id)) result.errors.push(`Duplicate source id: ${s.id}`);
    sourceIds.add(s.id);

    if (!s.title || s.title.trim().length === 0) {
      result.errors.push(`Source ${s.id} has no title`);
    }
  });

  // 2. Validate Kingdoms
  kingdoms.forEach((k: any, idx: number) => {
    if (!k.id) result.errors.push(`Kingdom #${idx} missing id`);
    if (kingdomIds.has(k.id)) result.errors.push(`Duplicate kingdom id: ${k.id}`);
    kingdomIds.add(k.id);

    // Coordinate checks (Indonesia bounds roughly lat -11 to 6, lng 95 to 141)
    if (k.latitude !== null && (k.latitude < -12 || k.latitude > 7)) {
      result.errors.push(`Kingdom ${k.id} latitude out of bounds: ${k.latitude}`);
    }
    if (k.longitude !== null && (k.longitude < 94 || k.longitude > 142)) {
      result.errors.push(`Kingdom ${k.id} longitude out of bounds: ${k.longitude}`);
    }

    // Chronology check
    if (k.founded_start_year && k.end_start_year && k.founded_start_year > k.end_start_year) {
      result.errors.push(`Kingdom ${k.id} founded year (${k.founded_start_year}) is after end year (${k.end_start_year})`);
    }

    // Check source references
    (k.source_ids || []).forEach((srcId: string) => {
      if (!sourceIds.has(srcId)) {
        result.errors.push(`Kingdom ${k.id} references non-existent source: ${srcId}`);
      }
    });
  });

  // 3. Validate Rulers
  rulers.forEach((r: any, idx: number) => {
    if (!r.id) result.errors.push(`Ruler #${idx} missing id`);
    if (rulerIds.has(r.id)) result.errors.push(`Duplicate ruler id: ${r.id}`);
    rulerIds.add(r.id);

    // Foreign key check
    if (!kingdomIds.has(r.kingdom_id)) {
      result.errors.push(`Ruler ${r.id} references non-existent kingdom: ${r.kingdom_id}`);
    }

    // Chronology check
    if (r.reign_start_year && r.reign_end_year && r.reign_start_year > r.reign_end_year) {
      result.errors.push(`Ruler ${r.id} reign start (${r.reign_start_year}) > end (${r.reign_end_year})`);
    }

    // Check sources
    (r.source_ids || []).forEach((srcId: string) => {
      if (!sourceIds.has(srcId)) {
        result.errors.push(`Ruler ${r.id} references non-existent source: ${srcId}`);
      }
    });
  });

  // 4. Validate Sites
  sites.forEach((site: any, idx: number) => {
    if (!site.id) result.errors.push(`Site #${idx} missing id`);
    if (siteIds.has(site.id)) result.errors.push(`Duplicate site id: ${site.id}`);
    siteIds.add(site.id);

    // Coordinate checks
    if (site.latitude === null || site.longitude === null) {
      result.errors.push(`Site ${site.id} missing mandatory coordinates`);
    } else {
      if (site.latitude < -12 || site.latitude > 7) {
        result.errors.push(`Site ${site.id} latitude out of bounds: ${site.latitude}`);
      }
      if (site.longitude < 94 || site.longitude > 142) {
        result.errors.push(`Site ${site.id} longitude out of bounds: ${site.longitude}`);
      }
    }

    // Associated kingdoms check
    (site.kingdom_ids || []).forEach((kId: string) => {
      if (!kingdomIds.has(kId)) {
        result.errors.push(`Site ${site.id} references non-existent kingdom: ${kId}`);
      }
    });

    // Check sources
    (site.source_ids || []).forEach((srcId: string) => {
      if (!sourceIds.has(srcId)) {
        result.errors.push(`Site ${site.id} references non-existent source: ${srcId}`);
      }
    });
  });

  // 5. Validate GeoJSON Territories
  if (territories.type !== 'FeatureCollection') {
    result.errors.push('territories.geojson is not a valid FeatureCollection');
  }

  territories.features.forEach((f: any, idx: number) => {
    if (!f.id) result.errors.push(`Territory #${idx} missing feature id`);
    if (territoryIds.has(f.id)) result.errors.push(`Duplicate territory feature id: ${f.id}`);
    territoryIds.add(f.id);

    if (!f.properties?.kingdom_id || !kingdomIds.has(f.properties.kingdom_id)) {
      result.errors.push(`Territory ${f.id} has invalid kingdom_id: ${f.properties?.kingdom_id}`);
    }

    if (!f.geometry || f.geometry.type !== 'Polygon') {
      result.errors.push(`Territory ${f.id} geometry must be a valid Polygon`);
    } else {
      const coords = f.geometry.coordinates?.[0];
      if (!Array.isArray(coords) || coords.length < 4) {
        result.errors.push(`Territory ${f.id} polygon has invalid ring coordinates (< 4 points)`);
      } else {
        // Verify closed ring: first point == last point
        const first = coords[0];
        const last = coords[coords.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          result.warnings.push(`Territory ${f.id} polygon first and last point do not match exactly`);
        }

        // Verify GeoJSON order [longitude, latitude]
        coords.forEach(([lng, lat]: [number, number]) => {
          if (lng < 90 || lng > 145 || lat < -15 || lat > 10) {
            result.errors.push(`Territory ${f.id} coordinate outside Indonesia [lng=${lng}, lat=${lat}]`);
          }
        });
      }
    }
  });

  return result;
}

// Execution
const res = runValidation();

console.log('========================================================');
console.log('   JELAJAH KERAJAAN ISLAM NUSANTARA - VALIDASI DATA    ');
console.log('========================================================');
console.log(`Kerajaan Terdaftar : ${res.stats.totalKingdoms}`);
console.log(`Penguasa / Sultan  : ${res.stats.totalRulers}`);
console.log(`Situs Peninggalan  : ${res.stats.totalSites}`);
console.log(`Wilayah GeoJSON    : ${res.stats.totalTerritories}`);
console.log(`Sumber Referensi   : ${res.stats.totalSources}`);
console.log('--------------------------------------------------------');

if (res.warnings.length > 0) {
  console.log(`⚠️  Peringatan (${res.warnings.length}):`);
  res.warnings.forEach((w) => console.log(`   - ${w}`));
}

if (res.errors.length > 0) {
  console.error(`❌ Terdeteksi ${res.errors.length} Kesalahan Integritas Data:`);
  res.errors.forEach((err) => console.error(`   - ${err}`));
  process.exit(1);
} else {
  console.log('✅ Semua dataset valid dan lulus uji integritas referensi!');
  console.log('========================================================');
  process.exit(0);
}
