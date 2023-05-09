import OrderSteps from 'components/checkout/steps';
import PrivateRoute from 'modules/auth/privateRoute';
import Checkpage from './Checkpage';

const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  title?: string;
  summaryClass?: string;
}) => {
  return (
    <PrivateRoute>
      <div className="container  min-height-screen">
        <Checkpage>
          <OrderSteps />
          {title && <h5 className="pb-3">{title}</h5>}
          {children}
        </Checkpage>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
