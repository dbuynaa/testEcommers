import { useEffect, useState } from 'react';
import { PRODUCT_WRAPPER_CLASS } from './Product';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

const ProductsSkeleton = ({
  type,
  max = 6,
  wrapped,
}: {
  max?: number;
  wrapped?: boolean;
  type?: string;
}) => {
  const [stateValue, setStateValue] = useState<number[]>([1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stateValue.length < max) {
        setStateValue((prevState) => [...prevState, prevState.length + 1]);
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [max, stateValue]);

  const renderCats = (className?: string) =>
    stateValue.map((element, index) => (
      <motion.div
        initial={{ opacity: 0, x: 10, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className={clsx(
          'category skeleton skeleton-text mb-3',
          index % 5 !== 0 ? 'ms-4' : 'ms-2 mb-3 bigger',
          className
        )}
        key={index}
      />
    ));

  if (type === 'mobile-cats')
    return (
      <div className="mobile-cats flex items-center mb-3">
        {Array.from({ length: 6 }).map((el, idx) => (
          <div className="btn slim" key={idx}>
            <div className="skeleton skeleton-text" style={{ width: 100 }} />
          </div>
        ))}
      </div>
    );

  if (type === 'categories')
    return (
      <>
        <b className="block text-blue products-cat-title text-mid-gray">
          Бүтээгдэхүүний ангилал
        </b>
        <div className="tree">{renderCats('col-6')}</div>
      </>
    );

  const render = () =>
    stateValue.map((element, index) => (
      <div className={PRODUCT_WRAPPER_CLASS} key={index}>
        <AnimatePresence>
          <motion.div
            className="product skeleton"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="img-wrap skeleton"></div>
            <div className="py-4"></div>
          </motion.div>
        </AnimatePresence>
      </div>
    ));

  return wrapped ? (
    <div className="row products">{render()}</div>
  ) : (
    <>{render()}</>
  );
};

export default ProductsSkeleton;
