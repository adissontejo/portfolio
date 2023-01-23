import { AppProps } from 'next/app';

import { ContextProvider } from '~/contexts';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ContextProvider themeInitialMode="light">
      <Component key={router.pathname} {...pageProps} />
    </ContextProvider>
  );
};

export default MyApp;
