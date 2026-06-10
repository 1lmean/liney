/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Light
        cream: '#F5F0E8',
        'cream-sub': '#EDE8DC',
        'cream-line': '#DDD8CC',
        ink: '#1A1714',
        'ink-muted': '#8C8478',
        'ink-subtle': '#B5AFA4',
        accent: '#C8873A',
        highlight: '#F0E4A0',

        // Dark
        'dark-bg': '#161412',
        'dark-sub': '#1E1B18',
        'dark-surface': '#242018',
        'dark-ink': '#F0EBE2',
        'dark-line': '#2C2820',
      },
      fontFamily: {
        serif: ['BuheungJuwon'],
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '22px',
        'card-l': '28px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
