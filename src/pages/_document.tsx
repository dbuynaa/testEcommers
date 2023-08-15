/* eslint-disable @next/next/next-script-for-ga */
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link href="/images/logo.png" rel="shortcut icon" />
          <link rel="preconnect" href="https://xos.techstore.mn" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
