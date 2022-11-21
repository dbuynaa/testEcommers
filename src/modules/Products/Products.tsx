'use client';
import { useSearchParams } from 'next/navigation';
import Product from 'components/Products/Product';
import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { useEffect } from 'react';
import Loading from 'ui/Loading';
import { useInView } from 'react-intersection-observer';
import { useProducts } from './context';

const ProductsContainer = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search');
  const category = searchParams.get('category');
  const FETCH_MORE_PER_PAGE = 24;
  const [fieldValue, setStore] = useProducts((store) => store.productsCount);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const commonVariables = {
    categoryId: category,
    searchValue,
  };

  const { data, loading, refetch, fetchMore } = useQuery(queries.products, {
    variables: {
      ...commonVariables,
      perPage: FETCH_MORE_PER_PAGE,
      page: 1,
    },
  });

  const productsCountQuery = useQuery(queries.productsCount, {
    variables: commonVariables,
    onCompleted(data) {
      const productsCount = (data || {}).poscProductsTotalCount || 0;
      setStore({ productsCount });
    },
  });

  useEffect(() => {
    refetch({ categoryId: category });
    productsCountQuery.refetch({ categoryId: category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const products = (data || {}).poscProducts || [];
  const productsCount =
    (productsCountQuery.data || {}).poscProductsTotalCount || 0;

  const handleLoadMore = () => {
    if (productsCount > products.length) {
      fetchMore({
        variables: {
          page: Math.ceil(products.length / FETCH_MORE_PER_PAGE) + 1,
          perPage: FETCH_MORE_PER_PAGE,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            poscProducts: [
              ...(prev.poscProducts || []),
              ...fetchMoreResult.poscProducts,
            ],
          });
        },
      });
    }
  };

  useEffect(() => {
    inView && handleLoadMore();
  }, [products.length, inView]);

  if (loading || productsCountQuery.loading) return <Loading />;

  if (!products.length || !productsCount) return <div>hooseon</div>;

  return (
    <>
      {products.map((el: any) => (
        <Product key={el._id} {...el} />
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
