import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'fill-1': 'repeat(auto-fill, minmax(150px, 1fr))',
        'fill-2': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in',
        loading: 'loading 2s ease-in infinite',
      },
      keyframes: {
        loading: {
          '0%': {
            opacity: '1',
          },
          '40%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
