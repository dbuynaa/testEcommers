/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Product from 'components/Products/Product';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Loading from 'ui/Loading';
import { useInView } from 'react-intersection-observer';
import { useProducts } from './context';
import useGetProducts from 'lib/useGetProducts';

const ProductsContainer = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search');
  const category = searchParams.get('category');
  const sortField = searchParams.get('sortField');
  const sortDirection = searchParams.get('sortDirection');
  const [, setStore] = useProducts((store) => store.productsCount);

  const { handleLoadMore, loading, products, productsCount, getProducts } =
    useGetProducts({
      searchValue,
      category,
      sortField,
      sortDirection: Number(sortDirection),
      onCountCompleted: (productsCount: number) => setStore({ productsCount }),
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

  if (loading) return <Loading className="min-height-screen" />;

  if (!products.length || !productsCount) return <div>Хоосон байна</div>;

  return (
    <>
      {products.map((el: any) => (
        <div className="col-6 col-md-3 col-xl-20 pb-5 px-2" key={el._id}>
          <Product {...el} />
        </div>
      ))}
      {productsCount > products.length && (
        <div className="products-loadmore my-5 p-3 text-center" ref={ref}>
          <h6>
            <b>Ачаалж байна</b>
          </h6>
        </div>
      )}
    </>
  );
};

export default ProductsContainer;
