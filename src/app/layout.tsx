/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-page-custom-font */
import 'styles/styles.min.css';
import Header from 'components/header';
import ApolloProvider from 'modules/apolloClient';
import AppProvider from 'modules/appContext';
import UIProvider from 'ui/context';
import CurrentUser from 'modules/auth/currentUser';
import 'react-toastify/dist/ReactToastify.min.css';
import Toast from 'ui/Toast';
import CurrentOrder from 'modules/checkout/currentOrder';
import Footer from 'components/footer';
import Config from 'modules/auth/Config';
import NavigationBar from 'components/header/NavigationBar';
import Script from 'next/script';
import { Partytown } from '@builder.io/partytown/react';

export const revalidate = 600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <head>
        <title>Techstore</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="The official distributor of Xiami" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <Partytown debug={true} forward={['dataLayer.push']} />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KWD7T33')`,
          }}
        />
      </head>
      <body>
        <ApolloProvider>
          <AppProvider>
            <UIProvider>
              <Config>
                <Header />
                <div className="layout">
                  <CurrentUser>
                    <CurrentOrder>{children}</CurrentOrder>
                  </CurrentUser>
                </div>
                <Footer />
                <NavigationBar />
              </Config>
            </UIProvider>
          </AppProvider>
        </ApolloProvider>
        <Toast />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWD7T33"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
      </body>
    </html>
  );
}
