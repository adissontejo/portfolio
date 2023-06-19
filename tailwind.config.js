const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: '#37188e',
        green: '#32746d',
        brown: '#402e2a',
        light: '#fbfcff',
        dark: '#231d36',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      addBase({
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',

          fontFamily: "'Noto Sans Khmer', sans-serif",
          fontWeight: 400,
        },

        'button, label': {
          '-webkit-tap-highlight-color': 'transparent',
          border: 'none',
          background: 'none',
        },

        '#__next': {
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        },
      });

      addUtilities({
        '.transition-dark-mode': {
          transitionProperty:
            'color, background-color, border-color, text-decoration-color, fill, stroke',
          transitionDuration: '800ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      });
    }),
  ],
};
