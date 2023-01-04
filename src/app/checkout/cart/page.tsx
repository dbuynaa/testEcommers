'use client';
import OrderItem from 'components/checkout/item';
import useOrderData from 'lib/useOrderData';
import Layout from 'components/checkout/layout';
import Button from 'ui/Button';
import Link from 'next/link';

const Cart = () => {
  const { cart } = useOrderData();
  return (
    <Layout
      action={
        <Button
          className="block w-full p-3 sum-buy"
          Component={Link}
          prefetch={false}
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
