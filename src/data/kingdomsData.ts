import type { Kingdom } from '../types/atlas.ts';
import kingdomsJson from './kingdoms.json' with { type: 'json' };

export const kingdomsData: Kingdom[] = kingdomsJson as unknown as Kingdom[];
