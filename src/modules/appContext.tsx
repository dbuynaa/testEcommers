'use client';
import createFastContext from './createContext';
import type { ICartItem, IProductBase, IOrder } from './types';
import { useShowCart } from 'ui/context';
import { addToCart, changeCount } from 'utils';

export interface State {
  cart: ICartItem[] | null;
  currentUser: {
    email: string;
    erxesCompanyId: string;
    erxesCustomerId: string;
    firstName: string;
    lastName: string;
    phone: string;
    type: string;
    companyRegistrationNumber: string;
    _id: string;
  } | null;
  loadingCurrentUser: boolean;
  currentOrder: IOrder | null;
  config: any;
}

const { Provider: AppProvider, useStore } = createFastContext({
  cart: null,
  currentUser: null,
  loadingCurrentUser: true,
  currentOrder: null,
  config: null,
} as State);

export const useCart = () => {
  const [cart, setCart] = useStore((store) => store.cart);
  const { changeShowCart } = useShowCart();

  const changeCart = (newCart: ICartItem[]) => setCart({ cart: newCart });

  const onCompleted = (currentCart: ICartItem[]) => {
    setCart({ cart: currentCart });
    return changeShowCart();
  };

  const changeItemCount = ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }) =>
    changeCount({
      cart,
      product: { productId, count },
      onCompleted,
    });

  const addItem = (
    product: IProductBase & { productImgUrl: string; count: number }
  ) =>
    addToCart({
      cart,
      product,
      onCompleted,
    });

  return { cart, changeCart, changeCount: changeItemCount, addItem };
};

export const useLoadingCurrentUser = () => {
  const [loadingCurrentUser, setLoadingCurrentUser] = useStore(
    (store) => store.loadingCurrentUser
  );

  return {
    loadingCurrentUser,
    setLoadingCurrentUser: (loading: State['loadingCurrentUser']) => {
      setLoadingCurrentUser({ loadingCurrentUser: loading });
    },
  };
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

export const useCurrentOrder = () => {
  const [currentOrder, setCurrentOrder] = useStore(
    (store) => store.currentOrder
  );

  return {
    currentOrder,
    setCurrentOrder: (order: any) => setCurrentOrder({ currentOrder: order }),
  };
};

export const useConfig = () => {
  const [config, setConfig] = useStore((store) => store.config);
  return {
    config,
    setConfig: (conf: any) => setConfig({ config: conf }),
  };
};

export default AppProvider;
