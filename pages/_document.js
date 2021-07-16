import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Open Tracker</title>
          <link
            href="favicon/favicon.ico"
            rel="icon"
            type="image/png"
            sizes="48x48"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
