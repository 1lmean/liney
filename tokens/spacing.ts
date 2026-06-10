// tokens/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 14,
  card: 22,
  cardL: 28,
  pill: 999,
} as const;

export const shadow = {
  chip: {
    boxShadow: '0px 3px 10px rgba(28,28,27,0.09), 0px 1px 2px rgba(28,28,27,0.05)',
    shadowColor: '#1C1C1B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },
  card: {
    boxShadow: '0px 8px 26px rgba(28,28,27,0.09)',
    shadowColor: '#1C1C1B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 26,
    elevation: 8,
  },
  fab: {
    boxShadow: '0px 10px 26px rgba(0,0,0,0.22)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 26,
    elevation: 16,
  },
} as const;
