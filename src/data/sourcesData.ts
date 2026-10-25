import { Source } from '../types/atlas';
import sourcesJson from './sources.json';

export const sourcesData: Source[] = (sourcesJson as any[]).map((src) => ({
  ...src,
  authors: src.authors || src.author_or_institution || 'Arsip Sejarah',
  publisher: src.publisher || src.notes || 'Publikasi Akademik',
  supports: src.supports || (src.relevant_claims ? src.relevant_claims.join('; ') : ''),
})) as Source[];
