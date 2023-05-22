import { useState } from 'react';
import Button from 'ui/Button';
import Counter from 'ui/Counter';
import { useHandleCart, useItems } from 'modules/contextHooks';
import { ICartItem, IProduct } from 'modules/types';
import useHandleBuy from 'lib/useHandleBuy';
import { toast } from 'react-toastify';
import { useDetailContext } from './Context';

const Actions = () => {
  const { name, unitPrice, attachment, _id, remainder } = useDetailContext();
  const [count, setCount] = useState<number>(1);
  const cart = useItems();
  const { handleBuy } = useHandleBuy();
  const { handleAddToCart, loading } = useHandleCart();

  const quantityInCart =
    cart.find((item: ICartItem) => item.productId === _id)?.count || 0;

  const handleAdd = () => {
    if (!remainder || remainder < count + quantityInCart) {
      toast.error('Бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна');
      return;
    }

    return handleAddToCart({ name, unitPrice, attachment, _id, count });
  };

  return (
    <div className="row items-center -controls pt-4 mt-2">
      <Counter count={count} setCount={setCount} />
      <Button variant="slim" onClick={handleAdd} loading={loading}>
        {!loading && 'Сагсанд нэмэх'}
      </Button>
      <Button
        onClick={() => {
          handleAdd();
          handleBuy();
        }}
      >
        Худалдан авах
      </Button>
    </div>
  );
};

export default Actions;
