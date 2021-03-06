export const theme = {
  colors: {
    primary: '#e75621',
    background: '#282a36',
    text: '#8be9fd',
  },
  fonts: {
    ubuntu: `font-family: 'Ubuntu', sans-serif;`,
    code: `font-family: 'Fira Code', sans-serif;`,
  },
  media: {
    sm: '@media screen and (max-width: 600px)',
    md: '@media screen and (max-width: 768px)',
    lg: '@media screen and (max-width: 992px)',
    xl: '@media screen and (max-width: 1200px)',
  },
};

export type Theme = typeof theme;
