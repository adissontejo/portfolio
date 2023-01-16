import { ReactNode } from 'react';

import { DrawersProvider } from './drawers';
import { StylesProvider } from './styles';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StylesProvider>
      <DrawersProvider>{children}</DrawersProvider>
    </StylesProvider>
  );
};

export * from './drawers';
export * from './styles';
