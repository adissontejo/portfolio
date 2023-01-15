import { createContext, ReactNode, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, Theme, theme } from '~/styles';

export type StylesContextType = {
  theme: Theme;
};

export const StylesContext = createContext({} as StylesContextType);

export const StylesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export const useStyles = () => useContext(StylesContext);
