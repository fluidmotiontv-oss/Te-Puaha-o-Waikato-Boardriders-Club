import { useState } from 'react';

export type LanguageMode = 'reo' | 'en';

const translations: Record<string, Record<LanguageMode, string>> = {
  sovereign: {
    en: 'Sovereign Mesh Active',
    reo: 'Toa Mesh Whakariterite'
  },
  welcome: {
    en: 'Welcome to Boardriders Club',
    reo: 'Nau mai ki te Rōpū Eke Ngaru'
  }
};

export function useBilingual() {
  const [lang, setLang] = useState<LanguageMode>('reo');

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'reo' : 'en'));
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || translations[key]?.['en'] || key;
  };

  return { lang, toggleLang, setLang, t };
}
