'use client';

import { useState } from 'react';
import Button from 'ui/Button';
import Counter from 'ui/Counter';
import { useCart } from 'modules/appContext';
import { IProductBase } from 'modules/types';
import useAddToCart from 'lib/useAddToCart';
import { findItem } from 'utils';
import { useRouter } from 'next/navigation';

const Actions = (props: IProductBase & { productImgUrl: string }) => {
  const router = useRouter();
  const [count, setCount] = useState<number>(1);
  const { addToCart, loading } = useAddToCart();
  const { cart } = useCart();

  const handleBuy = () => {
    if (!findItem(cart, props._id)) {
      addToCart({ ...props, count });
    }
    return router.push('/checkout/cart');
  };

  return (
    <div className="row items-center -controls pt-5">
      <Counter count={count} setCount={setCount} />
      <Button
        variant="slim"
        onClick={() => addToCart({ ...props, count })}
        loading={loading}
      >
        Сагсанд нэмэх
      </Button>
      <Button onClick={handleBuy}>Худалдан авах</Button>
    </div>
  );
};

export default Actions;
