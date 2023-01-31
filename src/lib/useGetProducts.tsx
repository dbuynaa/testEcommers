import { useLazyQuery } from '@apollo/client';
import { queries } from 'modules/Products/graphql';

const FETCH_MORE_PER_PAGE = 24;
const useGetProducts = ({
  category,
  onCountCompleted,
  searchValue,
  perPage = FETCH_MORE_PER_PAGE,
  sortField = 'createdAt',
  sortDirection = -1,
}: {
  category?: string | null;
  onCountCompleted?: any;
  searchValue?: string | null;
  perPage?: number;
  sortField?: string | null;
  sortDirection?: number | null;
}) => {
  const commonVariables = {
    categoryId: category,
    searchValue,
  };

  const [getProducts, { data, loading, fetchMore }] = useLazyQuery(
    queries.products,
    {
      variables: {
        ...commonVariables,
        sortField,
        sortDirection,
        perPage,
        page: 1,
      },
    }
  );

  const [getProductsCount, productsCountQuery] = useLazyQuery(
    queries.productsCount,
    {
      variables: commonVariables,
      onCompleted(data) {
        const productsCount = (data || {}).poscProductsTotalCount || 0;
        onCountCompleted && onCountCompleted(productsCount);
      },
    }
  );

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

  return {
    getProducts: () => {
      getProducts();
      getProductsCount();
    },
    loading: loading || productsCountQuery.loading,
    handleLoadMore,
    products,
    productsCount,
  };
};

export default useGetProducts;
