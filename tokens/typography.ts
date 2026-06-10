export const typography = {
  serif: 'BuheungJuwon', // 문장 카드 + 로고
  sans: 'System',

  size: {
    xs: 11,
    sm: 12,
    base: 14,
    md: 15,
    lg: 18,
    xl: 23,
    xxl: 34,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.9,
  },
} as const;
