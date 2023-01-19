import { useMutation } from '@apollo/client';
import { queries, mutations } from 'modules/checkout/graphql';
import { toast } from 'react-toastify';

const useOrderCancel = (onCompleted?: (_id: string) => void) => {
  const [orderCancel, { loading }] = useMutation(mutations.orderCancel, {
    onCompleted(data) {
      const { _id } = (data || {}).ordersCancel || {};
      onCompleted && onCompleted(_id);
    },
    refetchQueries: [{ query: queries.lastOrder }, 'LastOrder'],
    onError(error) {
      toast.error(error.message);
    },
  });
  return { orderCancel, loading };
};

export default useOrderCancel;
