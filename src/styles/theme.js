export const lightColors = {
  background: '#fffdf5',
  card: '#ffffff',
  main: '#FFF099',
  point: '#fa8e73',
  sub: '#c7a58b',
  text: '#2f2a24',
  textMuted: '#78695d',
  border: '#f1e6d2',
  success: '#6ca581',
};

export const darkColors = {
  background: '#14171d',
  card: '#1d2430',
  main: '#4f4b2f',
  point: '#f6c0b2',
  sub: '#c9ad9a',
  text: '#f3f6fb',
  textMuted: '#a9b1bf',
  border: '#2b3444',
  success: '#7fc29a',
};

export const colors = lightColors;

export function getPalette(isDark) {
  return isDark ? darkColors : lightColors;
}

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
};

export const shadows = {
  card: {
    shadowColor: '#5c4d41',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 3,
  },
};
