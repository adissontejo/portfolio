import App, { AppContext, AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';

import { ContextProvider } from '~/contexts';

type MyAppProps = AppProps & { themeMode: 'light' | 'dark' };

const MyApp = ({ Component, pageProps, router, themeMode }: MyAppProps) => {
  return (
    <ContextProvider themeInitialMode={themeMode}>
      <AnimatePresence mode="sync" initial={false}>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </ContextProvider>
  );
};

MyApp.getInitialProps = async (ctx: AppContext) => {
  const props = await App.getInitialProps(ctx);

  return {
    ...props,
    themeMode: 'light',
  } as MyAppProps;
};

export default MyApp;
