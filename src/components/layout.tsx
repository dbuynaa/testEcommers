import { ReactNode } from 'react';
import Header from 'components/header';
import ApolloProvider from 'modules/apolloClient';
import { StoreProvider } from 'modules/appContext';
import Footer from './footer';
import CurrentOrder from 'modules/checkout/currentOrder';
import CurrentUser from 'modules/auth/currentUser';
import NavigationBar from 'components/header/NavigationBar';

const Layout = ({
  children,
  mainCategories,
  footer,
}: {
  children: ReactNode;
  mainCategories: any;
  footer: any;
}) => {
  return (
    <ApolloProvider>
      <StoreProvider>
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
  );
};

export default Layout;
