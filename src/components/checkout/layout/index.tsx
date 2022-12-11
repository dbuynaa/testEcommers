import OrderSteps from 'components/checkout/steps';
import PrivateRoute from 'modules/auth/privateRoute';
import Summary from 'components/checkout/summary';

const Layout = ({ children, action }: any) => {
  return (
    <PrivateRoute>
      <div className="container">
        <OrderSteps />
        <div className="row">
          <div className="col-8">{children}</div>
          <div className="col-4">
            <Summary />
            <div className="m-3">{action}</div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
