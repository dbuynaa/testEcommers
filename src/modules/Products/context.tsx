'use client';
import createFastContext from 'modules/createContext';

const { Provider, useStore } = createFastContext({
  activeCategoryName: '',
  productsCount: 0,
});

export const useProducts = useStore;

const ProductsContext = ({ children }: any) => {
  return <Provider>{children}</Provider>;
};

export default ProductsContext;
