/* eslint-disable @next/next/next-script-for-ga */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Partytown } from '@builder.io/partytown/react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1"
          />
          <link href="/images/logo.png" rel="shortcut icon" />

          <Partytown forward={['dataLayer.push']} />
          <script
            type="text/partytown"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PKNHQBP')`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PKNHQBP"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        </body>
      </Html>
    );
  }
}
