import { useCart, useCurrentOrder, useCurrentUser } from 'modules/appContext';
import useHandleOrder from 'lib/useHandleOrder';
import { addToCart, changeCount, filterItems, formatItems } from 'utils';
import { useCallback } from 'react';
import { ICartItem } from './types';

export const useItems = () => {
  const { cart } = useCart();
  const { currentUser } = useCurrentUser();
  const { currentOrder } = useCurrentOrder() || {};

  if (!currentUser) return cart;

  return formatItems((currentOrder || {}).items || []);
};

export const useItemsCount = () => {
  const items = useItems();

  return (items || []).reduce(
    (acc: number, item: ICartItem) => acc + item.count,
    0
  );
};

export const useItemsTotal = () => {
  const items = useItems();

  return items.reduce((acc, item) => acc + item.count * item.unitPrice, 0);
};

export const useHandleCart = () => {
  const { currentUser } = useCurrentUser();
  const { setCart } = useCart();
  const cart = useItems();

  const { handleOrder, loading } = useHandleOrder();

  const handleAddToCart = useCallback(
    (product) => {
      const { attachment, name, ...rest } = product;

      if (!currentUser) {
        return addToCart({ cart, onCompleted: setCart, product });
      }

      return handleOrder({
        items: addToCart({ product: rest, cart: filterItems(cart) }),
      });
    },
    [cart, handleOrder, setCart, currentUser]
  );

  const handleUpdateCart = useCallback(
    (product) => {
      if (!currentUser)
        return changeCount({ cart, onCompleted: setCart, product });
      const { attachment, name, ...rest } = product;
      return handleOrder({
        items: changeCount({ product: rest, cart: filterItems(cart) }),
      });
    },
    [cart, handleOrder, setCart, currentUser]
  );

  const handleRemoveFromCart = useCallback(
    (productId) => handleUpdateCart({ productId: productId, count: 0 }),
    [handleUpdateCart]
  );

  const removeAllFromCart = useCallback(() => {
    if (!currentUser) return setCart([]);
    return handleOrder({ items: [] });
  }, [currentUser, handleOrder, setCart]);

  return {
    handleAddToCart,
    loading,
    handleUpdateCart,
    handleRemoveFromCart,
    removeAllFromCart,
  };
};
