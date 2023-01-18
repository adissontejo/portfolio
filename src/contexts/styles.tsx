import { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, GlobalStyles, lightTheme, Theme } from '~/styles';

export type StylesContextType = {
  theme: Theme;
};

export const StylesContext = createContext({} as StylesContextType);

export type StylesProviderProps = {
  children: ReactNode;
  initialMode: 'light' | 'dark';
};

export const StylesProvider = ({
  children,
  initialMode,
}: StylesProviderProps) => {
  const [mode] = useState(initialMode);

  const theme = mode === 'light' ? lightTheme : darkTheme;

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
