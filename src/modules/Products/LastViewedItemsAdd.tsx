import { useMutation } from '@apollo/client';
import { mutations } from './graphql';
import { useEffect } from 'react';
import { useCurrentUser } from 'modules/appContext';

const LastViewedItemsAdd = ({ productId }: { productId: string }) => {
  const { currentUser } = useCurrentUser();
  const [add, { loading }] = useMutation(mutations.addToLastView);

  useEffect(() => {
    if (!loading && currentUser?.erxesCustomerId) {
      add({
        variables: {
          customerId: currentUser?.erxesCustomerId,
          productId,
        },
        
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default LastViewedItemsAdd;
