import { createContext, ReactNode, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, Theme, theme } from '~/styles';

export type StylesContextType = {
  theme: Theme;
};

export const StylesContext = createContext({} as StylesContextType);

export const StylesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StylesContext.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StylesContext.Provider>
  );
};

export const useStylesContext = () => useContext(StylesContext);
