import OrderSteps from 'components/checkout/steps';
import PrivateRoute from 'modules/auth/privateRoute';

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
        <OrderSteps />
        {title && <h5 className="pb-3">{title}</h5>}
        {children}
      </div>
    </PrivateRoute>
  );
};

export default Layout;
