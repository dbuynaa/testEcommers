
import createFastContext from 'modules/createContext';

export interface State {
  showCart: boolean;
}

const { Provider: UIProvider, useStore } = createFastContext({
  showCart: false,
} as State);

export const useUI = useStore;

export const useShowCart = () => {
  const [showCart, setShowCart] = useUI((store) => store.showCart);

  const changeShowCart = () => setShowCart({ showCart: !showCart });
  return { showCart, changeShowCart };
};

export default UIProvider;
