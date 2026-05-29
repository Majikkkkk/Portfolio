export const FontFamily = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
} as const;

export const Typography = {
  headingLarge: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900' as const,
    letterSpacing: 0,
  },
  headingMedium: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900' as const,
    letterSpacing: 0,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  button: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800' as const,
    letterSpacing: 0,
  },
} as const;
