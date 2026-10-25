export type Region = 
  | 'Sumatra' 
  | 'Jawa' 
  | 'Kalimantan' 
  | 'Sulawesi' 
  | 'Maluku' 
  | 'Bali dan Nusa Tenggara' 
  | 'Papua';

export type VerificationStatus = 
  | 'verified'
  | 'partially_verified'
  | 'disputed'
  | 'unverified'
  | 'unavailable';

export type CertaintyLevel = 'verified' | 'estimated' | 'debated';

export type LocationPrecision = 'exact' | 'approximate' | 'unknown';

export type SiteType = 
  | 'Masjid Bersejarah' 
  | 'Keraton & Istana' 
  | 'Makam Sultan' 
  | 'Benteng Pertahanan' 
  | 'Prasasti & Batu Bersurat' 
  | 'Museum';

export type PreservationStatus = 
  | 'Cagar Budaya Nasional' 
  | 'Cagar Budaya Peringkat Provinsi' 
  | 'Terawat Aktif' 
  | 'Reruntuhan Terlindungi';

export type SourceType = 
  | 'Buku Akademik' 
  | 'Naskah Kuno & Babad' 
  | 'Laporan Kolonial / VOC' 
  | 'Jurnal Sejarah' 
  | 'Kajian Arkeologi';

export interface Source {
  id: string;
  title: string;
  author_or_institution?: string | null;
  authors?: string;
  publication_year: number | string | null;
  publisher?: string;
  url?: string | null;
  doi?: string;
  pages?: string;
  source_type: SourceType | string;
  access_date?: string | null;
  accessed_at?: string;
  relevant_claims?: string[];
  supports?: string;
  notes?: string;
}

export interface Ruler {
  id: string;
  kingdom_id: string;
  name: string;
  title?: string | null;
  titles?: string;
  reign_start_year?: number | null;
  reign_end_year?: number | null;
  reign_start?: number | null;
  reign_end?: number | null;
  reign_note?: string;
  biography?: string;
  succession_notes?: string;
  source_ids: string[];
  verification_status?: VerificationStatus;
  uncertainty_notes?: string[];
}

export interface HeritageSite {
  id: string;
  name: string;
  alternative_names?: string[];
  kingdom_ids: string[];
  site_type: SiteType | string;
  latitude: number;
  longitude: number;
  location_description?: string | null;
  province: string;
  regency: string;
  description?: string;
  historical_description?: string;
  period?: string;
  estimated_period_start?: number | null;
  estimated_period_end?: number | null;
  preservation_status: PreservationStatus | string;
  image: string;
  image_url?: string | null;
  image_source?: string | null;
  source_ids: string[];
  verification_status?: VerificationStatus;
  uncertainty_notes?: string[];
}

export interface Territory {
  id: string;
  kingdom_id: string;
  name: string;
  period_start: number;
  period_end: number;
  geometry_type: 'Polygon' | 'MultiPolygon';
  coordinates: [number, number][]; // [lat, lng] array for Leaflet
  reconstruction_method?: string;
  evidence_summary?: string;
  certainty: 'Tinggi (Terverifikasi Sumber Primer)' | 'Sedang (Rekonstruksi Kartografi)' | 'Hipotesis Hegemoni Maritim' | string;
  verification_status?: VerificationStatus;
  source_ids: string[];
  uncertainty_notes?: string[];
}

export interface HistoricalEvent {
  id: string;
  kingdom_id: string;
  year: number;
  year_label: string;
  title: string;
  description: string;
  significance: string;
  source_ids: string[];
}

export interface Kingdom {
  id: string;
  name: string;
  alternative_names?: string[];
  alternate_names: string[];
  location_description?: string | null;
  province?: string | null;
  island?: string | null;
  region: Region;
  capital: string;
  latitude: number;
  longitude: number;
  location_precision?: LocationPrecision;
  founded_start_year?: number | null;
  founded_end_year?: number | null;
  founded: number | null;
  founded_note: string;
  founded_certainty: CertaintyLevel;
  golden_age_start_year?: number | null;
  golden_age_end_year?: number | null;
  golden_age: string;
  end_start_year?: number | null;
  end_end_year?: number | null;
  ended: number | null;
  ended_note: string;
  current_status: string;
  history_summary: string;
  historical_description?: string;
  territory_notes: string;
  ruler_ids: string[];
  territory_geojson_id?: string | null;
  heritage_site_ids?: string[];
  site_ids: string[];
  territory_ids: string[];
  source_ids: string[];
  emblem_symbol?: string;
  verification_status?: VerificationStatus;
  uncertainty_notes?: string[];
  last_updated?: string | null;
}

export interface FilterState {
  regions: Region[];
  yearRange: [number, number];
  siteTypes: SiteType[];
  certaintyLevels: CertaintyLevel[];
  searchQuery: string;
  activeKingdomId: string | null;
}
