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
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in',
      loading: 'loading 1.5s ease-in infinite',
    },
    keyframes: {
      fadeIn: {
        from: {
          opacity: '0',
        },
        to: {
          opacity: '1',
        },
      },
      loading: {
        '0%': {
          opacity: '1',
        },
        '40%': {
          opacity: '0.3',
        },
        '100%': {
          opacity: '1',
        },
      },
    },
  },
  plugins: [],
};
export default config;
