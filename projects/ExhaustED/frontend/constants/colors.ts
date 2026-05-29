import { useThemeStore } from '@/store/themeStore';

export type ThemeMode = 'light' | 'dark';

export type AppTheme = {
  mode: ThemeMode;
  mint: string;
  mintLight: string;
  mintDark: string;
  lavender: string;
  lavenderLight: string;
  coral: string;
  coralLight: string;
  amber: string;
  amberLight: string;
  red: string;
  redLight: string;
  white: string;
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceElevated: string;
  border: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  shadow: string;
  input: string;
  overlay: string;
};

export const LightTheme: AppTheme = {
  mode: 'light',
  mint: '#1D9E75',
  mintLight: '#E1F5EE',
  mintDark: '#085041',
  lavender: '#7F77DD',
  lavenderLight: '#EEEDFE',
  coral: '#D85A30',
  coralLight: '#FAECE7',
  amber: '#BA7517',
  amberLight: '#FAEEDA',
  red: '#E24B4A',
  redLight: '#FCEBEB',
  white: '#FFFFFF',
  background: '#F7FAF8',
  surface: '#FFFFFF',
  surfaceSecondary: '#EFF6F2',
  surfaceElevated: '#FFFFFF',
  border: 'rgba(16, 24, 40, 0.09)',
  borderStrong: 'rgba(16, 24, 40, 0.16)',
  textPrimary: '#17201C',
  textSecondary: '#5E6B66',
  textTertiary: '#8A9691',
  shadow: '#0F2921',
  input: '#FFFFFF',
  overlay: 'rgba(255,255,255,0.78)',
};

export const DarkTheme: AppTheme = {
  mode: 'dark',
  mint: '#4AD6A6',
  mintLight: '#173D32',
  mintDark: '#9CE9CC',
  lavender: '#AAA5FF',
  lavenderLight: '#292852',
  coral: '#FF8B66',
  coralLight: '#45251E',
  amber: '#F5B84B',
  amberLight: '#403018',
  red: '#FF7878',
  redLight: '#442124',
  white: '#FFFFFF',
  background: '#101614',
  surface: '#17201D',
  surfaceSecondary: '#202B27',
  surfaceElevated: '#1D2824',
  border: 'rgba(232, 245, 238, 0.10)',
  borderStrong: 'rgba(232, 245, 238, 0.18)',
  textPrimary: '#EEF7F2',
  textSecondary: '#BBCAC3',
  textTertiary: '#84938C',
  shadow: '#000000',
  input: '#121B18',
  overlay: 'rgba(16,22,20,0.78)',
};

export const Themes: Record<ThemeMode, AppTheme> = {
  light: LightTheme,
  dark: DarkTheme,
};

export const Colors = LightTheme;

export const RiskColors: Record<ThemeMode, Record<string, { bg: string; text: string; border: string }>> = {
  light: {
    'Low Risk': { bg: '#E1F5EE', text: '#085041', border: '#9FE1CB' },
    'Moderate Risk': { bg: '#FAEEDA', text: '#633806', border: '#FAC775' },
    'High Risk': { bg: '#FAECE7', text: '#712B13', border: '#F0997B' },
    'Severe Burnout': { bg: '#FCEBEB', text: '#501313', border: '#F7C1C1' },
  },
  dark: {
    'Low Risk': { bg: '#173D32', text: '#BFF3DD', border: '#2E7F63' },
    'Moderate Risk': { bg: '#403018', text: '#FFE1A8', border: '#9C6B21' },
    'High Risk': { bg: '#45251E', text: '#FFC3AE', border: '#9E5036' },
    'Severe Burnout': { bg: '#442124', text: '#FFC7C7', border: '#9B3D42' },
  },
};

export function useThemeColors(): AppTheme {
  const mode = useThemeStore((state) => state.mode);
  return Themes[mode];
}
