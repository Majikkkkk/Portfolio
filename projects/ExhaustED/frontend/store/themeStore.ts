import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ThemeMode } from '@/constants/colors';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      isDark: false,
      setTheme: (mode) => set({ mode, isDark: mode === 'dark' }),
      toggleTheme: () => {
        const nextMode: ThemeMode = get().mode === 'dark' ? 'light' : 'dark';
        set({ mode: nextMode, isDark: nextMode === 'dark' });
      },
    }),
    {
      name: 'exhausted_theme',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode, isDark: state.isDark }),
    }
  )
);
