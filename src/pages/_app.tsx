import React from 'react';
import Layout from 'components/layout';
import 'styles/styles.min.css';
import NextApp from 'next/app';
import getCategories from 'lib/getCategories';
import { getFooter } from 'lib/wp/page';
import 'react-toastify/dist/ReactToastify.css';
import { Rubik } from 'next/font/google';

type Props = {
  pageProps: any;
  Component: any;
  router: any;
  menu: any;
  mainCategories: any;
  footer: any;
};

// If loading a variable font, you don't need to specify the font weight
const rubik = Rubik({ subsets: ['latin', 'cyrillic', 'cyrillic-ext'] });

function MyApp({
  Component,
  pageProps,
  router,
  mainCategories,
  footer,
}: Props) {
  const getLayout = Component.getLayout || ((page: any) => page);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Layout mainCategories={mainCategories} footer={footer}>
        {getLayout(<Component {...pageProps} router={router} />)}
      </Layout>
    </>
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
