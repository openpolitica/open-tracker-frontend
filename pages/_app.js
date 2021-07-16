import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';

function MyOPApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyOPApp;
