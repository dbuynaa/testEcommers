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
        {/* <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
          partytown = {
            lib: "/_next/static/~partytown/",
            forward: ["gtag"]           
          };
        `,
          }}
        /> */}
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
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', { 
                page_path: window.location.pathname,
            });
        `,
          }}
        />
        <Script
          strategy="worker"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
      </body>
    </html>
  );
}

const gtag = {
  GA_TRACKING_ID: 'GTM-KWD7T33',
};
