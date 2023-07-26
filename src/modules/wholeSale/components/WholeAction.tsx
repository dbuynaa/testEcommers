import { useState } from 'react';
import Button from 'ui/Button';

import { useHandleCart, useItems } from 'modules/contextHooks';
import { ICartItem } from 'modules/types';
import useHandleBuy from 'lib/useHandleBuy';

import Storepay from 'components/ProductDetail/Storepay';
import TechLeasing from 'components/ProductDetail/Techleasing';
import { useDetailContext } from 'components/ProductDetail/Context';


const Actions = () => {
  const { name, unitPrice, attachment, _id} = useDetailContext();

  const [buy, setBuy] = useState(false);
  const cart = useItems();
  const { handleBuy } = useHandleBuy();

  const { handleAddToCart, loading } = useHandleCart();

  const quantityInCart =
    cart.find((item: ICartItem) => item.productId === _id)?.count || 0;

  const handleAdd = (go: boolean) => {
   
    handleAddToCart({ name, unitPrice, attachment, _id });
    if (go) return handleBuy();
    return;
  };

  const renderBuy = () => (
    <Button
      onClick={() => {
        setBuy(true);
       
      }}
      className="buy-btn"
      loading={buy && loading}
    >
      Худалдан авах
    </Button>
  );

  return (
    <>
      <Storepay>{renderBuy()}</Storepay>
      <TechLeasing>{renderBuy()}</TechLeasing>
      <div className="row items-center -controls pt-4 mt-2">
        
        <Button
          variant="slim"
          onClick={() => {
            handleAdd(false);
          }}
          loading={!buy && loading}
        >
          Сагсанд нэмэх
        </Button>
        {renderBuy()}
      </div>
    </>
  );
};

export default Actions;