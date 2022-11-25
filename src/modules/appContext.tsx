'use client';
import createFastContext from './createContext';
import type { ICartItem } from './types';
import { IProductBase } from './types';
import { useShowCart } from 'ui/context';

export interface State {
  cart: ICartItem[];
  currentUser: any;
  loadingCurrentUser: boolean;
}

const { Provider: AppProvider, useStore } = createFastContext({
  cart: [],
  currentUser: null,
  loadingCurrentUser: true,
} as State);

export const useCart = () => {
  const [cart, setCart] = useStore((store) => store.cart);
  const { changeShowCart } = useShowCart();

  const changeCart = (newCart: ICartItem[]) => setCart({ cart: newCart });

  const changeCount = ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }) => {
    const currentCart = cart.slice();
    const foundItem: any = currentCart.find(
      (item: ICartItem) => item.productId === productId
    );
    if (foundItem) {
      if (count > 0) {
        foundItem.count = count;
        setCart({ cart: currentCart });
      } else {
        const index = currentCart.indexOf(foundItem);
        currentCart.splice(index, 1);
        setCart({
          cart: currentCart,
        });
      }
      return changeShowCart();
    }
  };

  const addItem = (
    product: IProductBase & { productImageUrl: string; count: number }
  ) => {
    const currentCart = cart.slice();

    const foundItem = currentCart.find((i) => i.productId === product._id);

    if (foundItem) {
      const { productId, count } = foundItem;
      return changeCount({ productId, count: count + product.count });
    }
    const cartItem = {
      ...product,
      _id: Math.random().toString(),
      productId: product._id,
      isTake: 'delivery',
    };

    currentCart.push(cartItem);
    setCart({ cart: currentCart });
    return changeShowCart();
  };

  return { cart, changeCart, changeCount, addItem };
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useStore((store) => store.currentUser);

  return {
    currentUser,
    setCurrentUser: (cu: State['currentUser']) => {
      setCurrentUser({ currentUser: cu });
    },
  };
};

export const useLoadingCurrentUser = () => {
  const [loading, setLoadingCurrentUser] = useStore(
    (store) => store.loadingCurrentUser
  );
  return {
    loading,
    setLoadingCurrentUser: (cuLoading: State['loadingCurrentUser']) => {
      setLoadingCurrentUser({ loadingCurrentUser: cuLoading });
    },
  };
};

export default AppProvider;
