import { createContext, useContext, useEffect, useState } from 'react';
import type { Context, FC, ReactNode } from 'react';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { fetchNui } from '../utils/fetchNui';

interface Locale {
  ui_playerMoney: string;
  ui_buttonText: string;
  ui_reset: string;
}

const defaultLocale: Locale = {
  ui_playerMoney: 'Player Money',
  ui_buttonText: 'Get Player Money',
  ui_reset: 'Reset',
};

debugData(
  [
    {
      action: 'setLocale',
      data: defaultLocale,
    },
  ],
  2000
);

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locales: Locale) => void;
}

const LocaleCtx = createContext<LocaleContextValue | null>(null);

const LocaleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    fetchNui('loadLocale', {}, defaultLocale).catch(() => null);
  }, []);

  useNuiEvent('setLocale', async (data: Locale) => setLocale(data));

  return <LocaleCtx.Provider value={{ locale, setLocale }}>{children}</LocaleCtx.Provider>;
};

export default LocaleProvider;

export const useLocales = () =>
  useContext<LocaleContextValue>(LocaleCtx as Context<LocaleContextValue>);
