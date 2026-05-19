export type ThemeKey = 'dark' | 'light';

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  card: string;
  border: string;
  text: string;
  sub: string;
  muted: string;
  accent: string;
  acDark: string;
  gold: string;
  green: string;
  warn: string;
  danger: string;
  navBg: string;
  navBorder: string;
  statusBar: 'light' | 'dark';
  heroBg: string[];
  stepCircleBg: string;
  stepCircleBorder: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  shadowColor: string;
  shadowOpacity: number;
}

export const DARK: ThemeColors = {
  bg: '#060C18',
  bgAlt: '#090F1C',
  card: '#0C1A2E',
  border: '#152847',
  text: '#FFFFFF',
  sub: '#7A95B8',
  muted: '#3D5570',
  accent: '#2570FF',
  acDark: '#1050CC',
  gold: '#F59E0B',
  green: '#22C55E',
  warn: '#F59E0B',
  danger: '#EF4444',
  navBg: '#060C18',
  navBorder: '#152847',
  statusBar: 'light',
  heroBg: ['#102040', '#0A1830'],
  stepCircleBg: 'rgba(37,112,255,0.12)',
  stepCircleBorder: 'rgba(37,112,255,0.35)',
  inputBg: '#0D1B2E',
  inputBorder: '#152847',
  inputText: '#FFFFFF',
  inputPlaceholder: '#3D5570',
  shadowColor: '#000000',
  shadowOpacity: 0,
};

export const LIGHT: ThemeColors = {
  bg: '#F8FAFF',
  bgAlt: '#EEF5FF',
  card: '#FFFFFF',
  border: '#DBEAFE',
  text: '#0F172A',
  sub: '#475569',
  muted: '#94A3B8',
  accent: '#2570FF',
  acDark: '#1050CC',
  gold: '#D97706',
  green: '#16A34A',
  warn: '#D97706',
  danger: '#DC2626',
  navBg: '#FFFFFF',
  navBorder: '#E2E8F0',
  statusBar: 'dark',
  heroBg: ['#C8DCFF', '#D8EAFF'],
  stepCircleBg: '#FFFFFF',
  stepCircleBorder: '#BFDBFE',
  inputBg: '#FFFFFF',
  inputBorder: '#DBEAFE',
  inputText: '#0F172A',
  inputPlaceholder: '#94A3B8',
  shadowColor: '#1A3060',
  shadowOpacity: 0.08,
};
