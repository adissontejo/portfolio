import { ReactNode } from 'react';

import { DrawersProvider } from './drawers';
import { StylesProvider } from './styles';

export type ContextProviderProps = {
  children: ReactNode;
  themeInitialMode: 'light' | 'dark';
};

export const ContextProvider = ({
  children,
  themeInitialMode,
}: ContextProviderProps) => {
  return (
    <StylesProvider initialMode={themeInitialMode}>
      <DrawersProvider>{children}</DrawersProvider>
    </StylesProvider>
  );
};

export * from './drawers';
export * from './styles';
