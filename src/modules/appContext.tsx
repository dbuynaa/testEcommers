import { useCallback, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { getLocal, setLocal } from 'utils';
import type { ICartItem, IOrder } from './types';

export interface State {
  cart: ICartItem[];
  currentUser: {
    email: string;
    erxesCompanyId: string;
    erxesCustomerId: string;
    firstName: string;
    lastName: string;
    phone: string;
    type: string;
    avatar:string;
    companyRegistrationNumber: string;
    _id: string;
  } | null;
  loadingCurrentUser: boolean;
  loadingCurrentOrder: boolean;
  currentOrder: IOrder | null;
  config: any;
  setCart: (cart: ICartItem[]) => void;
  setCurrentUser: (user: State['currentUser']) => void;
  setLoadingCurrentUser: (loading: boolean) => void;
  setCurrentOrder: (order: State['currentOrder']) => void;
  setConfig: (config: State['config']) => void;
  setLoadingCurrentOrder: (loading: boolean) => void;
}

const useStore = () => {
  const [cart, setCart] = useState<ICartItem[]>(getLocal('cart') || []);
  const [currentUser, setCurrentUser] = useState<State['currentUser']>(null);
  const [loadingCurrentUser, setLoadingCurrentUser] =
    useState<State['loadingCurrentUser']>(true);
  const [currentOrder, setCurrentOrder] = useState<State['currentOrder']>(null);
  const [loadingCurrentOrder, setLoadingCurrentOrder] =
    useState<State['loadingCurrentOrder']>(true);
  const [config, setConfig] = useState<State['config']>(null);

  return {
    cart,
    currentUser,
    loadingCurrentUser,
    currentOrder,
    config,
    loadingCurrentOrder,
    setCart: useCallback((cart: ICartItem[]) => {
      setCart(cart);
      setLocal('cart', cart);
    }, []),
    setCurrentUser: useCallback(
      (user: State['currentUser']) => setCurrentUser(user),
      []
    ),
    setLoadingCurrentUser: useCallback(
      (loading: boolean) => setLoadingCurrentUser(loading),
      []
    ),
    setCurrentOrder: useCallback(
      (order: State['currentOrder']) => setCurrentOrder(order),
      []
    ),
    setConfig: useCallback((config: State['config']) => setConfig(config), []),
    setLoadingCurrentOrder: useCallback(
      (loading: boolean) => setLoadingCurrentOrder(loading),
      []
    )
  };
};

export const StoreContext = createContext<State & { categories: any }>(
  {} as State & { categories: any }
);

export const StoreProvider = ({
  categories,
  children
}: {
  categories: any;
  children: React.ReactNode;
}) => {
  const store = useStore();
  return (
    <StoreContext.Provider value={{ ...store, categories }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContextSelector(StoreContext, (store) => store.cart);
  const setCart = useContextSelector(StoreContext, (store) => store.setCart);
  return { cart, setCart };
};

export const useCurrentUser = () => {
  const currentUser = useContextSelector(
    StoreContext,
    (store) => store?.currentUser
  );
  const setCurrentUser = useContextSelector(
    StoreContext,
    (store) => store?.setCurrentUser
  );
  const loadingCurrentUser = useContextSelector(
    StoreContext,
    (store) => store?.loadingCurrentUser
  );
  const setLoadingCurrentUser = useContextSelector(
    StoreContext,
    (store) => store?.setLoadingCurrentUser
  );
  return {
    currentUser,
    setCurrentUser,
    loadingCurrentUser,
    setLoadingCurrentUser
  };
};

export const useCurrentOrder = () => {
  const currentOrder = useContextSelector(
    StoreContext,
    (store) => store.currentOrder
  );
  const setCurrentOrder = useContextSelector(
    StoreContext,
    (store) => store.setCurrentOrder
  );
  const loadingCurrentOrder = useContextSelector(
    StoreContext,
    (store) => store.loadingCurrentOrder
  );
  const setLoadingCurrentOrder = useContextSelector(
    StoreContext,
    (store) => store.setLoadingCurrentOrder
  );
  return {
    currentOrder,
    setCurrentOrder,
    loadingCurrentOrder,
    setLoadingCurrentOrder
  };
};

export const useConfig = () => {
  const config = useContextSelector(StoreContext, (store) => store.config);
  const setConfig = useContextSelector(
    StoreContext,
    (store) => store.setConfig
  );
  return { config, setConfig };
};

export const useCategories = () => {
  const categories = useContextSelector(
    StoreContext,
    (store) => store.categories
  );
 
  return { categories };
};
