import { ReactNode } from 'react';
import Header from 'components/header';
import ApolloProvider from 'modules/apolloClient';
import { StoreProvider } from 'modules/appContext';
import Footer from './footer';
import CurrentOrder from 'modules/checkout/currentOrder';
import CurrentUser from 'modules/auth/currentUser';
import NavigationBar from 'components/header/NavigationBar';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import Toast from 'ui/Toast';
import { CartProvider } from 'lib/CartContext';
import { content, headers } from 'lib/Settings';

const Layout = ({
  children,
  metaData,
  categories,
}: // font,
{
  children: ReactNode;
  mainCategories: any;
  categories: any;
  metaData: any;
}) => {
  return (
    <>
      <Head>
        <meta name="keywords" content="Bolovsrol" />
        <meta name="author" content={content.title} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <DefaultSeo
        title={headers.title}
        description={headers.description}
        facebook={{
          appId: '235931783264550',
        }}
        openGraph={{
          type: 'website',
          locale: 'mn_MN',
          url: 'https://bolovsrol-store.mn/',
          site_name: 'Bolovsrol app',
          images: [
            {
              url: '/images/logo.png',
              width: 1200,
              height: 630,
              alt: 'Image',
            },
          ],
        }}
        twitter={{
          handle: '@Bolovsrol store',
          site: '@Bolovsrol store',
          cardType: 'summary_large_image',
        }}
      />
      <ApolloProvider>
        <StoreProvider categories={categories}>
          <CartProvider>
            <CurrentUser>
              <CurrentOrder>
                <Header mainCategories={categories} contact={metaData?.contact} />
                <div className="layout">{children}</div>
                <Footer metaData={metaData} />
                <NavigationBar />
              </CurrentOrder>
            </CurrentUser>
          </CartProvider>
        </StoreProvider>
      </ApolloProvider>
      <Toast />
    </>
  );
};

export default Layout;
