import { useCurrentUser } from 'modules/appContext';
import { useRouter } from 'next/router';

const useHandleBuy = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const handleBuy = () => {
    if (!currentUser) {
      return router.push({
        pathname: '/auth/[type]',
        query: { from: '/checkout/cart', type: 'login' },
      });
    }

    return router.push(`/checkout/cart`);
  };
  return { handleBuy };
};

export default useHandleBuy;
