import { ReactNode } from 'react';

import { StylesProvider } from './styles';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return <StylesProvider>{children}</StylesProvider>;
};

export * from './styles';
