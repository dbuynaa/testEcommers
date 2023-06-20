import { useLazyQuery, useMutation } from '@apollo/client';
import { mutations, queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';
import ProductsSkeleton from 'components/Products/Skeleton';
import Empty from 'ui/Empty';
import Product, { PRODUCT_WRAPPER_CLASS } from 'components/Products/Product';
import Button from 'ui/Button';
import Xmark from 'icons/Xmark';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
// import Counter from 'modules/checkout/Counter';

const WishlistContainer = () => {
  const { currentUser } = useCurrentUser();
  const { erxesCustomerId: customerId } = currentUser || {};
  const [getWishlist, { data, loading }] = useLazyQuery(queries.wishlist, {
    variables: {
      customerId
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (customerId) {
      getWishlist();
    }
  }, [customerId, getWishlist]);

  const [remove, { loading: loadingRemove }] = useMutation(
    mutations.wishlistRemove,
    {
      refetchQueries: [{ query: queries.wishlist }, 'Wishlist'],
      onCompleted(data) {
        const { _id } = data?.wishlistRemove;
        if (_id) {
          toast.success('Амжилттай хаслаа');
        }
      }
    }
  );

  if (loading) return <ProductsSkeleton wrapped />;

  const { wishlist } = data || {};

  if (!(wishlist || []).length)
    return (
      <div className="row justify-center">
        <Empty message="Хүслийн жагсаалт хоосон байна" size="10rem" />
      </div>
    );

  return (
    <div className="row products">
      {wishlist.map((el: any) => (
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
              {/* <Counter count={0} productId={''} /> */}
            </Button>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default WishlistContainer;
