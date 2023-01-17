export const theme = {
  colors: {
    purple: '#37188e',
    green: '#32746d',
    brown: '#402e2a',
    light: '#fbfcff',
    dark: '#231d36',
  },
  queries: {
    small: 'screen and (max-width: 600px)',
    medium: 'screen and (min-width: 600px) and (max-width: 768px)',
    mediumAndLower: 'screen and (max-width: 768px)',
    mediumAndGreater: 'screen and (min-width: 600px)',
    large: 'screen and (min-width: 768px) and (max-width: 992px)',
    largeAndLower: 'screen and (max-width: 992px)',
    largeAndGreater: 'screen and (min-width: 768px)',
    extraLarge: 'screen and (min-width: 992px)',
  },
};

export type Theme = typeof theme;
