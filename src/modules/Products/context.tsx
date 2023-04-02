

import { useCallback, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

export interface State {
  activeCategoryName: string;
  productsCount: number;
  setActiveCategoryName: (name: string) => void;
  setProductsCount: (count: number) => void;
}

const useStore = () => {
  const [activeCategoryName, setActiveCategoryName] = useState('');
  const [productsCount, setProductsCount] = useState(0);

  return {
    activeCategoryName,
    productsCount,
    setActiveCategoryName: useCallback(
      (name: string) => setActiveCategoryName(name),
      []
    ),
    setProductsCount: useCallback(
      (count: number) => setProductsCount(count),
      []
    ),
  };
}

const ProductsContext = createContext<State>({} as State);

export const ProductsContextProvider = ({ children }: any) => {
  const store = useStore();

  return (
    <ProductsContext.Provider value={store}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsCount = () => {
  return useContextSelector(ProductsContext, (v) => v.productsCount);
} 

export const useActiveCategoryName = () => {
  return useContextSelector(ProductsContext, (v) => v.activeCategoryName);
}

export const useSetProductsCount = () => {
  return useContextSelector(ProductsContext, (v) => v.setProductsCount);
}

export const useSetActiveCategoryName = () => {
  return useContextSelector(ProductsContext, (v) => v.setActiveCategoryName);
}

