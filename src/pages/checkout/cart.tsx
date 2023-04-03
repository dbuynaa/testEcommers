import Layout from 'components/checkout/layout';
import Button from 'ui/Button';
import Link from 'next/link';
import { useItems } from 'modules/contextHooks';
import OrderItem from 'components/checkout/item';
import PrivateRoute from 'modules/auth/privateRoute';

const Cart = () => {
  const cart = useItems();
  return (
    <Layout
      action={
        <Button
          className="block w-full p-3 sum-buy"
          Component={Link}
          href="/checkout/address"
        >
          Худалдан авах
        </Button>
      }
    >
      {cart.map((item) => (
        <OrderItem {...item} key={item._id} />
      ))}
    </Layout>
  );
};

Cart.getLayout = (page) => <PrivateRoute>{page}</PrivateRoute>;

export default Cart;
