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
    plugin(function ({ theme, addBase, addUtilities, matchUtilities }) {
      const colorVariables = {};

      Object.entries(theme('colors')).forEach(([key, value]) => {
        colorVariables[`--${key}-color`] = value;
      });

      addBase({
        ':root': colorVariables,
      });

      addUtilities({
        '.transition-dark-mode': {
          transitionProperty:
            'color, background-color, border-color, text-decoration-color, fill, stroke',
          transitionDuration: '800ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      });

      matchUtilities({
        var: variable => {
          const [name, value] = variable.split(' ');

          return {
            [`--${name}`]: value,
          };
        },
      });
    }),
  ],
};
