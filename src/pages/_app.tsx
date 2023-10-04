import "styles/global.css";
import "nprogress/nprogress.css";
import "styles/styles.scss";
import React, { useEffect } from "react";

import Layout from "components/layout";
import NextApp from "next/app";
import getCategories from "lib/getCategories";
import { getFooter } from "lib/wp/page";
import "react-toastify/dist/ReactToastify.css";
import { Open_Sans } from "next/font/google";
import NProgress from "nprogress";
import { Router } from "next/router";
import Script from "next/script";

import localFont from "next/font/local";

// Font files can be colocated inside of `pages`

type Props = {
  pageProps: any;
  Component: any;
  router: any;
  menu: any;
  mainCategories: any;
  metaData: any;
  categories: any;
};

// If loading a variable font, you don't need to specify the font weight
// const open_sans = Open_Sans({ subsets: ["latin", "cyrillic", "cyrillic-ext"] });
// const myFont = localFont({ src: "/font/NeoSansProRegular.woff" });
const NeoSans = localFont({
  src: [
    {
      path: "../../font/NeoSansProRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../font/NeoSansProItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../font/NeoSansProBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../font/NeoSansProBoldIt.woff",
      weight: "700",
      style: "italic",
    },
  ],
});
function MyApp({
  Component,
  pageProps,
  router,
  mainCategories,
  metaData,
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

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", stop);
    Router.events.on("routeChangeError", stop);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", stop);
      Router.events.off("routeChangeError", stop);
    };
  }, []);

  return (
    <main className={NeoSans.className}>
      {/* <style jsx global>{`
        @import url("https://fonts.cdnfonts.com/css/neo-sans-pro");

        x html {
          font-family: "Neo Sans Pro", sans-serif;
        }
      `}</style> */}
      <Layout
        mainCategories={mainCategories}
        categories={categories}
        metaData={metaData}
        // font={myFont}
      >
        {getLayout(<Component {...pageProps} router={router} />)}
        <Script
          id="messenger"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.erxesSettings = {
            messenger: {
              brand_id: "NMoDpG",
            },
          };
      
          const script = document.createElement("script");
          script.src =
            "https://xos.techstore.mn/widgets/build/messengerWidget.bundle.js";
          script.async = true;
          const entry = document.getElementsByTagName("script")[0];
          entry.parentNode.insertBefore(script, entry);
        `,
          }}
        ></Script>
      </Layout>
    </main>
  );
}

MyApp.getInitialProps = async function (appContext: any) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { rootCatergories, categories } = await getCategories();
  const { page: metaData } = await getFooter();

  return {
    ...appProps,
    metaData,
    mainCategories: rootCatergories,
    categories,
  };
};

export default MyApp;
