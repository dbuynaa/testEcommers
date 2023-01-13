'use client';
import OrderItem from 'components/checkout/item';
import useOrderData from 'lib/useOrderData';
import Layout from 'components/checkout/layout';
import Button from 'ui/Button';
import Link from 'next/link';
import { useCart } from 'modules/appContext';

const Cart = () => {
  const { cart } = useOrderData();
  const { cart: carti } = useCart();
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

export default Cart;
