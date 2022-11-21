'use client';
import { useState } from 'react';
import Button from 'ui/Button';
import Counter from 'ui/Counter';
import { useCart } from 'modules/appContext';
import { IProductBase } from 'modules/types';

const Actions = (props: IProductBase & { productImageUrl: string }) => {
  const { changeCount, addItem } = useCart();
  const [count, setCount] = useState<number>(1);

  return (
    <div className="flex items-center -controls pt-5">
      <Counter count={count} setCount={setCount} />
      <Button variant="slim" onClick={() => addItem({ ...props, count })}>
        Сагсанд нэмэх
      </Button>
      <Button>Худалдан авах</Button>
    </div>
  );
};

export default Actions;
