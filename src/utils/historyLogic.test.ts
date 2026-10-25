import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isKingdomActiveInYear,
  isKingdomInYearRange,
  filterKingdoms,
  filterSites,
  formatReignYear,
} from './historyLogic.ts';
import { kingdomsData } from '../data/kingdomsData.ts';
import { sitesData } from '../data/sitesData.ts';
import type { FilterState } from '../types/atlas.ts';

test('isKingdomActiveInYear correctly computes active kingdom in year 1300', () => {
  const pasai = kingdomsData.find((k) => k.id === 'kd-samudera-pasai')!;
  const demak = kingdomsData.find((k) => k.id === 'kd-demak')!;

  assert.equal(isKingdomActiveInYear(pasai, 1300), true);
  assert.equal(isKingdomActiveInYear(demak, 1300), false);
});

test('isKingdomInYearRange correctly filters overlapping reigns', () => {
  const banten = kingdomsData.find((k) => k.id === 'kd-banten')!; // 1526 - 1813
  assert.equal(isKingdomInYearRange(banten, 1600, 1700), true);
  assert.equal(isKingdomInYearRange(banten, 1200, 1400), false);
  assert.equal(isKingdomInYearRange(banten, 1850, 1900), false);
});

test('filterKingdoms works for region and keyword query', () => {
  const initialFilter: FilterState = {
    regions: ['Sumatra'],
    yearRange: [1200, 1950],
    siteTypes: [],
    certaintyLevels: [],
    searchQuery: 'Pasai',
    activeKingdomId: null,
  };

  const results = filterKingdoms(kingdomsData, initialFilter);
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'kd-samudera-pasai');
});

test('filterSites finds mosques associated with visible kingdoms', () => {
  const filter: FilterState = {
    regions: [],
    yearRange: [1200, 1950],
    siteTypes: ['Masjid Bersejarah'],
    certaintyLevels: [],
    searchQuery: '',
    activeKingdomId: 'kd-demak',
  };

  const results = filterSites(sitesData, filter);
  assert.ok(results.length >= 2);
  assert.ok(results.some((s) => s.name.includes('Masjid Agung Demak')));
  assert.ok(results.some((s) => s.name.includes('Menara Kudus')));
});

test('formatReignYear formats historical dates accurately', () => {
  assert.equal(formatReignYear(1267, 1297), '1267 — 1297 M');
  assert.equal(formatReignYear(1915, null), '1915 M — masa kini');
  assert.equal(formatReignYear(null, null), 'Tarikh tidak tercatat');
});
