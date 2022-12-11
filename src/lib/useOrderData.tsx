import { useCurrentOrder, useCurrentUser } from 'modules/appContext';
import { cartTotalAmount } from 'utils';
import type { ICartItem, IOrder } from 'modules/types';

const useOrderData = () => {
  const { currentOrder } = useCurrentOrder();
  const { currentUser } = useCurrentUser();

  const cart: ICartItem[] = (currentOrder || {}).items || [];
  const type: string = 'delivery';
  const registerNumber = currentOrder?.registerNumber;
  const billType = currentOrder?.billType || '1';
  const totalAmount = cartTotalAmount(cart);
  const deliveryInfo = currentOrder?.deliveryInfo || { description: '' };
  const customerId = currentUser?.erxesCustomerId;
  const _id = currentOrder?._id;

  return {
    cart,
    type,
    registerNumber,
    billType,
    totalAmount,
    deliveryInfo,
    customerId,
    _id,
  };
};

export default useOrderData;
