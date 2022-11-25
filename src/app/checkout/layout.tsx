import OrderSteps from 'components/checkout/steps';
import PrivateRoute from 'modules/auth/privateRoute';

const Layout = ({ children }: any) => {
  return (
    <PrivateRoute>
      <div className="container">
        <OrderSteps />
        <div className="row">
          <div className="col-8">{children}</div>
          <div className="col-4">hi</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
