/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useCurrentUser, useCurrentOrder, useCart } from 'modules/appContext';
import { addToCart, cleanCart } from 'utils';
import { queries } from './graphql';
import { ICartItem } from '../types';
import useOrderCU from 'lib/useOrderCU';
import useOrderData from 'lib/useOrderData';

const CurrentOrder = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useCurrentUser();
  const { setCurrentOrder } = useCurrentOrder();
  const { orderCU } = useOrderCU();
  const orderData = useOrderData();
  const { cart } = useCart();
  const NEW = ['new'];

  const [getCurrentOrder, { loading }] = useLazyQuery(queries.lastOrder, {
    fetchPolicy: 'network-only',
    onCompleted({ fullOrders }) {
      const order = (fullOrders || [])[0];
      if (!(order || {}).paidDate) {
        setCurrentOrder(order);
      }

      if ((cart || []).length > 0) {
        let currentCart = (order || {}).items || [];
        (cart || []).forEach((item) =>
          addToCart({
            cart: currentCart,
            product: item,
            onCompleted: (newCart: ICartItem[]) => (currentCart = newCart),
          })
        );
        orderCU({ variables: { ...orderData, items: cleanCart(currentCart) } });
      }
    },
  });

  useEffect(() => {
    (currentUser || {}).erxesCustomerId &&
      getCurrentOrder({
        variables: {
          statuses: NEW,
          customerId: (currentUser || {}).erxesCustomerId,
          perPage: 1,
          sortField: 'createdAt',
          sortDirection: -1,
        },
      });
  }, [currentUser]);

  if (loading) return null;

  return <>{children}</>;
};

export default CurrentOrder;
