import Layout from 'components/checkout/layout';
import Button from 'ui/Button';
import Link from 'next/link';
import { useItems } from 'modules/contextHooks';
import OrderItem from 'modules/checkout/OrderItem';
import PrivateRoute from 'modules/auth/privateRoute';
import Summary from 'components/checkout/summary';
import Grid from 'components/checkout/layout/Grid';
import ScrollWrapper from 'components/header/Wrapper';

const Cart = () => {
  const cart = useItems();

  return (
    <Layout title="Таны сагс">
      <Grid
        side={
          <ScrollWrapper className="mx-md-3 order-summary scroll">
            <Summary />
            <Button
              className="block w-full p-3 sum-buy"
              Component={Link}
              href="/checkout/address"
            >
              Худалдан авах
            </Button>
          </ScrollWrapper>
        }
      >
        {cart.map((item) => (
          <OrderItem {...item} key={item._id} />
        ))}
      </Grid>
    </Layout>
  );
};

Cart.getLayout = (page) => <PrivateRoute>{page}</PrivateRoute>;

export default Cart;
