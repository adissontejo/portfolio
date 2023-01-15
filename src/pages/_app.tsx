import { AppProps } from 'next/app';
import { ContextProvider } from '~/contexts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
};

export default MyApp;
