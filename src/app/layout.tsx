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
import NavigationBar from 'components/header/NavigationBar';
import { Partytown } from '@builder.io/partytown/react';
import { Inter as FontSans } from '@next/font/google';
import clsx from 'clsx';

export const revalidate = 600;

const fontSans = FontSans({
  subsets: ['latin', 'cyrillic-ext', 'cyrillic'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={clsx('font-sans', fontSans.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Partytown />
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
              <Header />
              <div className="layout">
                <CurrentUser>
                  <CurrentOrder>{children}</CurrentOrder>
                </CurrentUser>
              </div>
              <Footer />
              <NavigationBar />
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
