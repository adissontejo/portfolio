import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

import { ContextProvider } from '~/contexts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <ContextProvider>
      <AnimatePresence mode="sync" initial={false}>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </ContextProvider>
  );
};

export default MyApp;
