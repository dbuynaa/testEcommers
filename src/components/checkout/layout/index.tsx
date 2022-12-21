import OrderSteps from 'components/checkout/steps';
import PrivateRoute from 'modules/auth/privateRoute';
import Summary from 'components/checkout/summary';

const Layout = ({ children, action }: any) => {
  return (
    <div className="container  min-height-screen">
      <OrderSteps />
      <div className="row">
        <div className="col-8">{children}</div>
        <div className="col-4">
          <Summary />
          <div className="m-3">{action}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
