import { ReactNode } from "react";
import Header from "components/header";
import ApolloProvider from "modules/apolloClient";
import { StoreProvider } from "modules/appContext";
import Footer from "./footer";
import CurrentOrder from "modules/checkout/currentOrder";
import CurrentUser from "modules/auth/currentUser";
import NavigationBar from "components/header/NavigationBar";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import Toast from "ui/Toast";
import { CartProvider } from "lib/CartContext";
import Script from "next/script";

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
  // font: any;
}) => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <DefaultSeo
        title="Techstore | Технологийн дэлгүүр"
        description="Технологийн дэвшлийг Тechstore -оос..."
        facebook={{
          appId: "235931783264550",
        }}
        openGraph={{
          type: "website",
          locale: "mn_MN",
          url: "https://techstore.mn/",
          site_name: "Techstore",
          images: [
            {
              url: "/images/og.jpg",
              width: 1200,
              height: 630,
              alt: "Techstore",
            },
          ],
        }}
        twitter={{
          handle: "@techstore",
          site: "@techstore",
          cardType: "summary_large_image",
        }}
      />
      <ApolloProvider>
        <StoreProvider categories={categories}>
          <CartProvider>
            <CurrentUser>
              <CurrentOrder>
                <Header
                  mainCategories={categories}
                  contact={metaData?.contact}
                />
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
