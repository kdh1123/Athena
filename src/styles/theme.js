export const lightColors = {
  background: '#f7f8fa',
  card: '#ffffff',
  main: '#e9eef8',
  point: '#dd6b57',
  sub: '#6f8fb8',
  text: '#24272d',
  textMuted: '#6f7682',
  border: '#e3e7ee',
  success: '#4f9569',
};

export const darkColors = {
  background: '#111419',
  card: '#1b2028',
  main: '#263142',
  point: '#f08a76',
  sub: '#93abc9',
  text: '#f4f6f9',
  textMuted: '#a9b0bc',
  border: '#2d3541',
  success: '#78bf8d',
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

export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
};

export const shadows = {
  card: {
    shadowColor: '#1f2937',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
};
