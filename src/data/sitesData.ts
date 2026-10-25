import type { HeritageSite } from '../types/atlas.ts';
import sitesJson from './heritageSites.json' with { type: 'json' };

export const sitesData: HeritageSite[] = (sitesJson as any[]).map((s) => ({
  ...s,
  description: s.description || s.historical_description || '',
  image: s.image || s.image_url || 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
})) as HeritageSite[];
