export const colors = {
  light: {
    bg: '#F8F8F7',
    bgSub: '#F0EFEE',
    surface: '#FFFFFF',
    ink: '#1C1C1B',
    inkMuted: '#787774',
    inkSubtle: '#AEACA8',
    accent: '#37352F',
    highlight: '#ECEAE8',
    line: '#E3E2E0',
  },
  dark: {
    bg: '#191919',
    bgSub: '#202020',
    surface: '#252525',
    ink: '#EBEBEA',
    inkMuted: '#787774',
    inkSubtle: '#4A4A48',
    accent: '#AEACA8',
    highlight: '#2A2A28',
    line: '#2F2F2D',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type ColorKey = keyof typeof colors.light;
