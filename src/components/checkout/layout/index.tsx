import OrderSteps from 'components/checkout/steps';
import PrivateRoute from 'modules/auth/privateRoute';
import Summary from 'components/checkout/summary';

const Layout = ({ children, action }: any) => {
  return (
    <div className="container  min-height-screen">
      <OrderSteps />
      <div className="row">
        <div className="col-md-8 col-12 mb-3">{children}</div>
        <div className="col-md-4 col-12">
          <div className="mx-md-3 order-summary">
            <Summary />
            {action}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
