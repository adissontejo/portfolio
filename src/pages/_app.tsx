import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';

import { ContextProvider } from '~/contexts';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ContextProvider themeInitialMode="light">
      <AnimatePresence mode="sync">
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
    </ContextProvider>
  );
};

export default MyApp;
