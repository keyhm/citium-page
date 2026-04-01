import type { Dictionary } from '../types/types';

export const getDictionary = async (
  locale: 'en' | 'es'
): Promise<Dictionary> => {
  const dictionaries = {
    en: () => import('../dictionaries/en.json').then((m) => m.default),
    es: () => import('../dictionaries/es.json').then((m) => m.default),
  };

  return dictionaries[locale]();
};