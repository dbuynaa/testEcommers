import { useMutation, ApolloError } from '@apollo/client';
import { mutations, queries } from 'modules/checkout/graphql';
import { useCurrentUser, useCurrentOrder } from 'modules/appContext';
import { getTotalValue, filterItems } from 'utils';
import { toast } from 'react-toastify';

const useHandleOrder = (onCompleted?: (_id: string) => void) => {
  const { currentUser } = useCurrentUser();
  const { currentOrder } = useCurrentOrder();
  const { registerNumber, items, billType, deliveryInfo } = currentOrder || {};
  const [ordersAdd, { loading }] = useMutation(mutations.ordersAdd);
  const [ordersUpdate, { loading: loadingUpdate }] = useMutation(
    mutations.ordersEdit
  );
  const [ordersCancel, { loading: loadingCancel }] = useMutation(
    mutations.ordersCancel
  );

  const refetchQueries = [{ query: queries.lastOrder }, 'LastOrder'];

  const onError = (error: ApolloError) => {
    toast.error(error.message);
  };

  const common = {
    customerId: (currentUser || {}).erxesCustomerId,
    type: 'delivery',
    registerNumber,
    items: filterItems(items || []),
    totalAmount: getTotalValue(items || []),
    billType,
    deliveryInfo,
  };

  const handleOrder = (orderData: any) => {
    if (!common.customerId) return;

    const data = {
      ...common,
      ...orderData,
      deliveryInfo: { ...deliveryInfo, ...orderData.deliveryInfo },
    };

    if (currentOrder) {
      if ((data.items || []).length === 0) {
        return ordersCancel({
          variables: { id: currentOrder._id },
          refetchQueries,
          onError,
        });
      }
      return ordersUpdate({
        variables: { _id: currentOrder._id, ...data },
        refetchQueries,
        onCompleted(data) {
          const { _id } = (data || {}).ordersEdit || {};
          return onCompleted && onCompleted(_id);
        },
        onError,
      });
    }

    return ordersAdd({
      variables: { ...common, ...orderData },
      refetchQueries,
      onCompleted(data) {
        const { _id } = (data || {}).ordersAdd || {};
        onCompleted && onCompleted(_id);
      },
      onError,
    });
  };

  return { handleOrder, loading: loading || loadingUpdate || loadingCancel };
};

export default useHandleOrder;
