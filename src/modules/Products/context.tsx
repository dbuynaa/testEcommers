'use client';
import createFastContext from 'modules/createContext';

const { Provider, useStore } = createFastContext({
  activeCategoryName: '',
  productsCount: '',
});

export const useProducts = useStore;

const ProductsContext = ({ children }: any) => {
  return <Provider>{children}</Provider>;
};

export default ProductsContext;
