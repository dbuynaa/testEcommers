import OrderSteps from 'components/checkout/steps';
import Summary from 'components/checkout/summary';
import ScrollWrapper from 'components/header/Wrapper';

const Layout = ({ children, action }: any) => {
  return (
    <div className="container  min-height-screen">
      <OrderSteps />
      <div className="row">
        <div className="col-md-8 col-12 mb-3">{children}</div>
        <div className="col-md-4 col-12">
          <ScrollWrapper className="mx-md-3 order-summary scroll">
            <Summary />
            {action}
          </ScrollWrapper>
        </div>
      </div>
    </div>
  );
};

export default Layout;
