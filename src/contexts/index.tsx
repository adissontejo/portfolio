import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { DrawersProvider } from './drawers';
import { ScreenProvider } from './screen';
import { StylesProvider } from './styles';

export type ContextProviderProps = {
  children: ReactNode;
  themeInitialMode: 'light' | 'dark';
};

export const ContextProvider = ({
  children,
  themeInitialMode,
}: ContextProviderProps) => {
  const router = useRouter();

  return (
    <StylesProvider initialMode={themeInitialMode}>
      <DrawersProvider>
        <ScreenProvider key={router.pathname} pathname={router.pathname}>
          {children}
        </ScreenProvider>
      </DrawersProvider>
    </StylesProvider>
  );
};

export * from './drawers';
export * from './screen';
export * from './styles';
