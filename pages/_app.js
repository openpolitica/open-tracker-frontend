import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';
import Fonts from 'theme/fonts';

function MyOPApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyOPApp;
