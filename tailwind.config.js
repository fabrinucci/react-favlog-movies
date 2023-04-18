/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in',
      loading: 'loading 1.5s ease-in infinite',
    },
    keyframes: {
      fadeIn: {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
      loading: {
        '0%': {
          opacity: 1,
        },
        '40%': {
          opacity: 0.3,
        },
        '100%': {
          opacity: 1,
        },
      },
    },
  },
  plugins: [],
};
