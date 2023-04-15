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
    },
  },
  plugins: [],
};
