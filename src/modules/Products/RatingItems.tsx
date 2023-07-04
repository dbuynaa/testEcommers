// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { queries } from './graphql';
// import { useCurrentUser } from 'modules/appContext';
// // import Link from 'next/link';
// import clsx from 'clsx';
// import { AnimatePresence, motion } from 'framer-motion';

// import Product, { PRODUCT_WRAPPER_CLASS } from 'components/Products/Product';

// const RatingItems = () => {
//   const { currentUser } = useCurrentUser();
//   const { data, loading } = useQuery(queries.getProductReviews, {
//     variables: {
//       customerId: currentUser?.erxesCustomerId
//     },
//     skip: !currentUser?.erxesCustomerId
//   });

//   if (loading) return null;
//   const Rating = data?.productreviews || [];
//   if (!Rating.length) return null;
//   return (
//     <div className=" container my-3 my-md-4  ">
//       <div className="text-blue mb-2 font-bold">
//         <h5> Бүтээгдэхүүний үнэлгээ</h5>
//       </div>
//       <>
//         <div className="order-[100] flex gap-10 item-center ">
//           {Rating?.map((el: any) => (
//             <AnimatePresence key={el._id}>
//               <motion.div
//                 className={clsx(PRODUCT_WRAPPER_CLASS, 'relative')}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10, width: 0 }}
//               >
//                 <Product {...el?.product} />
//               </motion.div>
//             </AnimatePresence>
//           )) || <div>No items</div>}
//         </div>
//       </>
//     </div>
//   );
// };

// export default RatingItems;
