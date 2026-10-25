import { Territory } from '../types/atlas';
import territoriesGeoJson from './territories.geojson';

export const territoriesData: Territory[] = territoriesGeoJson.features.map((f: any) => ({
  id: f.id,
  kingdom_id: f.properties.kingdom_id,
  name: f.properties.name,
  period_start: f.properties.temporal_start_year,
  period_end: f.properties.temporal_end_year,
  geometry_type: f.geometry.type,
  // Convert standard GeoJSON [lng, lat] to Leaflet [lat, lng]
  coordinates: f.geometry.coordinates[0].map(([lng, lat]: [number, number]) => [lat, lng]),
  reconstruction_method: f.properties.evidence_summary,
  certainty: f.properties.verification_status === 'verified'
    ? 'Tinggi (Terverifikasi Sumber Primer)'
    : 'Sedang (Rekonstruksi Kartografi)',
  verification_status: f.properties.verification_status,
  source_ids: f.properties.source_ids || [],
  uncertainty_notes: f.properties.uncertainty_notes || [],
}));
