/* eslint-disable react-hooks/exhaustive-deps */

import Product from 'components/Products/Product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSetProductsCount } from './context';
import useGetProducts from 'lib/useGetProducts';
import ProductsSkeleton from 'components/Products/Skeleton';
import Empty from 'ui/Empty';

const ProductsContainer = () => {
  const setCount = useSetProductsCount();
  const router = useRouter();
  const { searchValue, category, sub, sortField, sortDirection } = router.query;

  const { handleLoadMore, loading, products, productsCount, getProducts } = useGetProducts({
    searchValue: (searchValue || '').toString(),
    category: (sub || category || '').toString(),
    sortField: (sortField || '').toString(),
    sortDirection: Number(sortDirection),
    onCountCompleted: (productsCount: number) => setCount(productsCount),
  });

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    inView && handleLoadMore();
  }, [products.length, inView]);

  if (loading) return <ProductsSkeleton wrapped />;

  if (!products.length || !productsCount)
    // cart-empty cart-items
    return <Empty className="cart-empty cart-items" message="Бүтээгдэхүүн олдсонгүй" />;

  return (
    <div className="row products">
      {products.map((el: any) => (
        <Product {...el} key={el._id} wrapped />
      ))}
      {productsCount > products.length && (
        <>
          <div className="row" ref={ref} />
          <ProductsSkeleton max={8} />
        </>
      )}
    </div>
  );
};

export default ProductsContainer;
