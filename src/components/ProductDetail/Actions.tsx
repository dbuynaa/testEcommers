/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import Button from 'ui/Button';
import Counter from 'ui/Counter';
import { useHandleCart, useItems } from 'modules/contextHooks';
import { ICartItem } from 'modules/types';
import useHandleBuy from 'lib/useHandleBuy';
import { toast } from 'react-toastify';
import { useDetailContext } from './Context';
import Storepay from './Storepay';
import TechLeasing from './Techleasing';
import { useRouter } from 'next/router';
import { getPricingPlans } from 'modules/wholeSale/graphql/queries';
import { useQuery } from '@apollo/client';

const Actions = ({ productId }) => {
  const { name, unitPrice, attachment, _id, remainder } = useDetailContext();
  const [count, setCount] = useState<number>(1);
  const [buy, setBuy] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cart = useItems();
  const { handleBuy } = useHandleBuy();

  const { handleAddToCart, loading } = useHandleCart();
  const router = useRouter();

  const { data: pricingData } = useQuery(getPricingPlans, {
    variables: {
      productId,
      status: 'active',
    },
  });

  const quantityInCart = cart.find((item: ICartItem) => item.productId === _id)?.count || 0;

  const totalQuantity = pricingData?.pricingPlans[0]?.quantityRules[0]?.value || 0;

  const handleAdd = (go: boolean) => {
    if (!remainder || remainder < count + quantityInCart) {
      toast.error('Бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна');
      return;
    }
    handleAddToCart({ name, unitPrice, attachment, _id, count });
    if (go) return handleBuy();
    return;
  };

  const renderBuy = () => (
    <Button
      onClick={() => {
        setBuy(true);
        handleAdd(true);
      }}
      className="buy-btn"
      loading={buy && loading}
    >
      Худалдан авах
    </Button>
  );
  console.log(showCart, 'ss');
  return (
    <>
      <Storepay>{renderBuy()}</Storepay>
      <TechLeasing>{renderBuy()}</TechLeasing>
      <div className="row items-center -controls pt-4 mt-2">
        <Counter count={count} setCount={setCount} />
        <Button
          variant="slim"
          onClick={() => {
            handleAdd(false);
            setShowCart(true);
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
