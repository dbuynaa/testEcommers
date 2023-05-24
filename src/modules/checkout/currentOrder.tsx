import { useCart, useCurrentUser, useCurrentOrder } from 'modules/appContext';
import useHandleOrder from 'lib/useHandleOrder';
import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { useEffect } from 'react';
import { addToCart, cleanCart } from 'utils';

const NEW = ['new'];

const CurrentOrder = ({ children }) => {
  const { cart, setCart } = useCart();
  const { currentUser } = useCurrentUser();
  const { setCurrentOrder, setLoadingCurrentOrder } = useCurrentOrder();
  const { handleOrder } = useHandleOrder();

  const { loading, data } = useQuery(queries.lastOrder, {
    fetchPolicy: 'network-only',
    variables: {
      statuses: NEW,
      customerId: (currentUser || {}).erxesCustomerId,
      perPage: 1,
      sortField: 'createdAt',
      sortDirection: -1,
    },
    skip: !currentUser,
    onCompleted: () => setLoadingCurrentOrder(false),
  });

  useEffect(() => {
    if (loading) return;

    const order = ((data || {}).fullOrders || [])[0];
    const { paidAmounts, mobileAmount, paidDate } = order || {};
    const sumAmount = (amounts: { amount: number }[]) =>
      (amounts || []).reduce(
        (sum: number, i: any) => Number(sum) + Number(i.amount),
        0
      );

    const totalPaid = sumAmount(paidAmounts) + mobileAmount;

    if (paidDate || totalPaid !== 0) {
      setCurrentOrder(null);
    } else {
      setCurrentOrder(order);
    }

    if ((cart || []).length > 0) {
      let currentCart = (order || {}).items || [];
      (cart || []).forEach((item) => {
        addToCart({
          cart: currentCart,
          product: { ...item, _id: item.productId },
          onCompleted: (newCart) => (currentCart = newCart),
        });
      });
      handleOrder({
        items: cleanCart(currentCart),
      });

      setCart([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return children;
};

export default CurrentOrder;
