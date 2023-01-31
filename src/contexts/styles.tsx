import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, GlobalStyles, lightTheme, Theme } from '~/styles';

export type StylesContextType = {
  theme: Theme;
  mode: 'light' | 'dark';
  setMode: Dispatch<SetStateAction<'light' | 'dark'>>;
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
  const [mode, setMode] = useState(initialMode);

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <StylesContext.Provider value={{ theme, mode, setMode }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StylesContext.Provider>
  );
};

export const useStylesContext = () => useContext(StylesContext);
