import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import useHotjar from 'react-use-hotjar';
import theme from 'theme';
import Fonts from 'theme/fonts';
import { pageview } from 'lib/gtag';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function Tracker({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Fragment>
      <Head>
        <title>Tuku.pe</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <Fonts />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </Fragment>
  );
}

const logger = value =>
  console.info(`%c${value}`, 'background: #222; color: #bada55');

const withHotjar = Component => props => {
  const { initHotjar } = useHotjar();

  useEffect(() => {
    initHotjar(
      process.env.hotjar.id,
      process.env.hotjar.version,
      false,
      logger,
    );
  }, [initHotjar]);

  return <Component {...props} />;
};

export default process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
  ? Tracker
  : withHotjar(Tracker);
