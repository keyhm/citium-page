import { cache } from 'react';
import type { Dictionary } from '../types/dictionary';

export const getDictionary = cache(async (
  locale: 'en' | 'es'
): Promise<Dictionary> => {
  const dictionaries = {
    en: () => import('../dictionaries/en.json').then((m) => m.default),
    es: () => import('../dictionaries/es.json').then((m) => m.default),
  };

  return dictionaries[locale]();
});