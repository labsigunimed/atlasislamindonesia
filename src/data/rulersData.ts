import { Ruler } from '../types/atlas';
import rulersJson from './rulers.json';

export const rulersData: Ruler[] = (rulersJson as any[]).map((r) => ({
  ...r,
  titles: r.titles || r.title || 'Penguasa Kesultanan',
  reign_start: r.reign_start !== undefined ? r.reign_start : r.reign_start_year,
  reign_end: r.reign_end !== undefined ? r.reign_end : r.reign_end_year,
  succession_notes: r.succession_notes || r.biography || '',
})) as Ruler[];
