import { useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import { toast } from 'react-toastify';
import { useCurrentOrder, useCart } from 'modules/appContext';

const useOrderCU = (onCompleted?: any) => {
  const { currentOrder } = useCurrentOrder();
  const { changeCart } = useCart();

  const [ordersAdd, { loading }] = useMutation(mutations.ordersAdd, {
    onCompleted(data) {
      const { _id } = (data || {}).ordersAdd || {};
      changeCart([]);
      onCompleted && onCompleted(_id);
    },
    refetchQueries: [{ query: queries.lastOrder }, 'LastOrder'],
    onError(error) {
      toast.error(error.message);
    },
  });

  const [ordersEdit, { loading: loadingEdit }] = useMutation(
    mutations.ordersEdit,
    {
      onCompleted(data) {
        const { _id } = (data || {}).ordersEdit || {};
        changeCart([]);
        return onCompleted && onCompleted(_id);
      },
      refetchQueries: [{ query: queries.lastOrder }, 'LastOrder'],
      onError(error) {
        toast.error(error.message);
      },
    }
  );
  return {
    loading: loading || loadingEdit,
    orderCU: !!currentOrder ? ordersEdit : ordersAdd,
  };
};

export default useOrderCU;
