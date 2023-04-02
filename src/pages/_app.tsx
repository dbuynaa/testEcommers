import React from 'react';
import Layout from 'components/layout';
import 'styles/styles.min.css';
import NextApp from 'next/app';
import getCategories from 'lib/getCategories';
import { getFooter } from 'lib/wp/page';

type Props = {
  pageProps: any;
  Component: any;
  router: any;
  menu: any;
  mainCategories: any;
  footer: any;
};

function MyApp({
  Component,
  pageProps,
  router,
  mainCategories,
  footer,
}: Props) {
  const getLayout = Component.getLayout || ((page: any) => page);
  return (
    <Layout mainCategories={mainCategories} footer={footer}>
      {getLayout(<Component {...pageProps} router={router} />)}
    </Layout>
  );
}

MyApp.getInitialProps = async function (appContext: any) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { rootCatergories } = await getCategories();
  const { page: footer } = await getFooter();

  return {
    ...appProps,
    footer,
    mainCategories: rootCatergories,
  };
};

export default MyApp;
