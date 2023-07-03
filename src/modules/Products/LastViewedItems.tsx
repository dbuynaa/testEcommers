import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';

import Link from 'next/link';
import clsx from 'clsx';
import ProductsSkeleton from 'components/Products/Skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import Product, { PRODUCT_WRAPPER_CLASS } from 'components/Products/Product';

const LastViewedItems = () => {
  const { currentUser } = useCurrentUser();
  const { data, loading } = useQuery(queries.getLastProductView, {
    variables: {
      limit: 10,
      customerId: currentUser?.erxesCustomerId,
      createdAd:'createdAt '
    },
    skip: !currentUser?.erxesCustomerId
  });

  if (loading) return <ProductsSkeleton wrapped />;
  const lastSeen = data?.lastViewedItems || [];

  if (!lastSeen.length) return null;
  return (
    <div className=" container my-3 my-md-4  ">
      <div className="text-blue mb-2 font-bold">
        <h5> Сүүлд үзсэн бүтээгдэхүүн</h5>
      </div>
      <Link href={{ pathname: 'Wholesale' }}>
        <div className="order-[100] flex gap-10 item-center ">
          {lastSeen?.map((el: any) => (
            <AnimatePresence key={el._id}>
              <motion.div
                className={clsx(PRODUCT_WRAPPER_CLASS, 'relative')}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, width: 0 }}
              >
                <Product {...el?.product} />
              </motion.div>
            </AnimatePresence>
        
          )) || <div>No items</div>}
        </div>
      </Link>
    </div>
  );
};

export default LastViewedItems;
