import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeKey } from '../constants/themes';

const STORAGE_KEY = '@carnet_theme';

interface ThemeStore {
  theme: ThemeKey;
  toggleTheme: () => Promise<void>;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',

  toggleTheme: async () => {
    const next: ThemeKey = get().theme === 'dark' ? 'light' : 'dark';
    set({ theme: next });
    try { await AsyncStorage.setItem(STORAGE_KEY, next); } catch {}
  },

  loadTheme: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') set({ theme: saved });
    } catch {}
  },
}));
