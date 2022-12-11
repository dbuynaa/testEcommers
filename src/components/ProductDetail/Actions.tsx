'use client';

import { useState } from 'react';
import Button from 'ui/Button';
import Counter from 'ui/Counter';
import { useCart } from 'modules/appContext';
import { IProductBase } from 'modules/types';
import useAddToCart from 'lib/useAddToCart';

const Actions = (props: IProductBase & { productImgUrl: string }) => {
  const [count, setCount] = useState<number>(1);
  const { addToCart, loading } = useAddToCart();

  return (
    <div className="flex items-center -controls pt-5">
      <Counter count={count} setCount={setCount} />
      <Button
        variant="slim"
        onClick={() => addToCart({ ...props, count })}
        loading={loading}
      >
        Сагсанд нэмэх
      </Button>
      <Button>Худалдан авах</Button>
    </div>
  );
};

export default Actions;
