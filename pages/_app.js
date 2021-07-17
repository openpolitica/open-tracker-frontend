import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import theme from 'theme';
import Fonts from 'theme/fonts';

function MyOPApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Open Tracker</title>
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyOPApp;
