import { useCart, useCurrentUser } from 'modules/appContext';
import { IProductBase } from 'modules/types';
import useOrderCU from './useOrderCU';
import useOrderData from './useOrderData';
import { addToCart, cleanCart } from 'utils';

const useAddToCart = (onCompleted?: any) => {
  const { currentUser } = useCurrentUser();
  const { changeCount, addItem } = useCart();
  const { orderCU, loading } = useOrderCU();
  const orderData = useOrderData();
  const { cart } = orderData;
  const addCart = (
    orderItem: IProductBase & { productImgUrl: string; count: number }
  ) => {
    if (currentUser) {
      return orderCU({
        variables: {
          ...orderData,
          items: cleanCart(addToCart({ product: orderItem, cart })),
        },
      });
    }
    return addItem(orderItem);
  };

  return { addToCart: addCart, loading };
};

export default useAddToCart;
