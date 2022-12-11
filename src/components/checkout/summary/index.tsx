'use client';
import { ICartItem } from 'modules/types';
import { useCurrentOrder, useCart } from 'modules/appContext';

import { formatCurrency, cartTotalAmount } from 'utils';

const Summary = () => {
  const { currentOrder } = useCurrentOrder();
  const { cart: carti } = useCart();
  const cart = (currentOrder || {}).items || [];

  return (
    <div className="sum">
      <div className="mx-3 order-info p-3 rounded">
        {cart.map(({ _id, productName, count, unitPrice }: ICartItem) => (
          <div className="row mb-1 " key={_id}>
            <span className="col-6">{productName}</span>
            <div className="flex justify-between col-6">
              <span>x{count}</span>
              <span>{formatCurrency(unitPrice * count)}₮</span>
            </div>
          </div>
        ))}
        <div className="hr pt-2"></div>
        <div className="pt-3 flex justify-end">
          <b>Нийт дүн: {formatCurrency(cartTotalAmount(cart || []))}₮</b>
        </div>
      </div>
    </div>
  );
};

export default Summary;
