import React, { useEffect } from 'react';
import Layout from 'components/layout';
import 'nprogress/nprogress.css';
import 'styles/styles.min.css';
import NextApp from 'next/app';
import getCategories from 'lib/getCategories';
import { getFooter } from 'lib/wp/page';
import 'react-toastify/dist/ReactToastify.css';
import { Open_Sans } from 'next/font/google';
import NProgress from 'nprogress';

import { Router } from 'next/router';

type Props = {
  pageProps: any;
  Component: any;
  router: any;
  menu: any;
  mainCategories: any;
  footer: any;
  categories: any;
};

// If loading a variable font, you don't need to specify the font weight
const open_sans = Open_Sans({ subsets: ['latin', 'cyrillic', 'cyrillic-ext'] });

function MyApp({
  Component,
  pageProps,
  router,
  mainCategories,
  footer,
  categories,
}: Props) {
  const getLayout = Component.getLayout || ((page: any) => page);

  useEffect(() => {
    const start = () => {
      NProgress.start();
    };
    const stop = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', stop);
    Router.events.on('routeChangeError', stop);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', stop);
      Router.events.off('routeChangeError', stop);
    };
  }, []);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${open_sans.style.fontFamily};
        }
      `}</style>
      <Layout
        mainCategories={mainCategories}
        categories={categories}
        footer={footer}
      >
        {getLayout(<Component {...pageProps} router={router} />)}
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async function (appContext: any) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { rootCatergories, categories } = await getCategories();
  const { page: footer } = await getFooter();

  return {
    ...appProps,
    footer,
    mainCategories: rootCatergories,
    categories,
  };
};

export default MyApp;
