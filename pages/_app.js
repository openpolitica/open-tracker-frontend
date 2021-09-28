import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import theme from 'theme';
import Fonts from 'theme/fonts';
import { pageview } from 'lib/gtag';

function MyOPApp({ Component, pageProps }) {
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
      <ChakraProvider resetCSS theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </Fragment>
  );
}

export default MyOPApp;
