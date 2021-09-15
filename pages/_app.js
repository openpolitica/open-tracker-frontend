import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { Fragment } from 'react';
import theme from 'theme';
import Fonts from 'theme/fonts';

function MyOPApp({ Component, pageProps }) {
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
