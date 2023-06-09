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

const Layout = ({
  children,
  mainCategories,
  footer,
  categories,
}: {
  children: ReactNode;
  mainCategories: any;
  categories: any;
  footer: any;
}) => {
  console.log(mainCategories, categories);
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="Технологийн дэлгүүр,  Xiaomi, ухаалаг утас, зурагт, угаалгын машин, Amazefit, mi, oneplus"
        />
        <meta name="author" content="Techstore" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
      </Head>
      <DefaultSeo
        title="Techstore | Технологийн дэлгүүр"
        description="Технологийн дэвшлийг Тechstore -оос..."
        facebook={{
          appId: '235931783264550',
        }}
        openGraph={{
          type: 'website',
          locale: 'mn_MN',
          url: 'https://techstore.mn/',
          site_name: 'Techstore',
          images: [
            {
              url: '/images/og.jpg',
              width: 1200,
              height: 630,
              alt: 'Techstore',
            },
          ],
        }}
        twitter={{
          handle: '@techstore',
          site: '@techstore',
          cardType: 'summary_large_image',
        }}
      />
      <ApolloProvider>
        <StoreProvider categories={categories}>
          <CurrentUser>
            <CurrentOrder>
              <Header mainCategories={mainCategories} />
              <div className="layout">{children}</div>
              <Footer footer={footer} />
              <NavigationBar />
            </CurrentOrder>
          </CurrentUser>
        </StoreProvider>
      </ApolloProvider>
      <Toast />
    </>
  );
};

export default Layout;
