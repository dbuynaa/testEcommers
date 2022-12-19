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
  const [fieldValue, setStore] = useProducts((store) => store.productsCount);

  const { handleLoadMore, loading, products, productsCount } = useGetProducts({
    searchValue,
    category,
    onCountCompleted: (productsCount: number) => setStore({ productsCount }),
  });

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    inView && handleLoadMore();
  }, [products.length, inView]);

  if (loading) return <Loading />;

  if (!products.length || !productsCount) return <div>Хоосон байна</div>;

  return (
    <>
      {products.map((el: any) => (
        <div className="col-4 pb-4" key={el._id}>
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
