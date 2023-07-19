import { useMutation, useQuery } from '@apollo/client';
import { useCurrentUser } from 'modules/appContext';
import { mutations, queries } from './graphql';
import ProductsSkeleton from 'components/Products/Skeleton';
import Empty from 'ui/Empty';
import { AnimatePresence, motion } from 'framer-motion';
import Product, { PRODUCT_WRAPPER_CLASS } from 'components/Products/Product';
import clsx from 'clsx';
import Button from 'ui/Button';
import Xmark from 'icons/Xmark';

const ViewedItemsContainer = () => {
  const { currentUser } = useCurrentUser();
  const { data, loading } = useQuery(queries.getLastProductView, {
    variables: {
      limit: 10,
      customerId: currentUser?.erxesCustomerId
    },
    skip: !currentUser?.erxesCustomerId
  });

  const [remove, { loading: loadingRemove }] = useMutation(
    mutations.removeLastView,
    {
      refetchQueries: [
        { query: queries.getLastProductView },
        'LastViewedItems'
      ],
      onCompleted(data) {
        const { _id } = data?.lastViewedItemRemove;
        if (_id) {
        }
      }
    }
  );

  if (loading) return <ProductsSkeleton wrapped />;

  const lastSeen = data?.lastViewedItems || [];

  if (!(lastSeen || []).length)
    return (
      <div className="row justify-center">
        <Empty message="" size="10rem" />
      </div>
    );

  return (
    <div className="row products">
      {lastSeen?.map((el: any) => (
        <AnimatePresence key={el._id}>
          <motion.div
            className={clsx(PRODUCT_WRAPPER_CLASS, 'relative')}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, width: 0 }}
          >
            <Product {...el?.product} />
            <Button
              className="wishlist-remove"
              variant="ghost"
              disabled={loadingRemove}
              onClick={() => remove({ variables: { id: el._id } })}
            >
              <Xmark />
            </Button>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ViewedItemsContainer;
