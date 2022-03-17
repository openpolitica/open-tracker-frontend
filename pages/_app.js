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

const meta = {
  title: 'Tuku.pe',
  description: 'Toda la información sobre el Congreso y las leyes que produce.',
  image: 'https://tuku.pe/images/banner.png',
  type: 'website',
  websiteUrl: 'https://tuku.pe/',
};

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
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={meta.websiteUrl} />
        <link rel="canonical" href={meta.websiteUrl} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@openpolitica" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
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
