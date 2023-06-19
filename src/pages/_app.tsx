import App, { AppContext, AppProps } from 'next/app';
import { getCookie } from 'cookies-next';

import '~/styles/global.css';

import { ContextProvider } from '~/contexts';

type MyAppProps = AppProps & {
  themeMode: 'light' | 'dark';
};

const MyApp = ({ Component, pageProps, router, themeMode }: MyAppProps) => {
  return (
    <ContextProvider themeInitialMode={themeMode}>
      <Component key={router.pathname} {...pageProps} />
    </ContextProvider>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const { req, res } = context.ctx;

  const props = await App.getInitialProps(context);

  const themeMode = getCookie('theme-mode', { req, res }) || 'light';

  return {
    ...props,
    themeMode,
  } as MyAppProps;
};

export default MyApp;
