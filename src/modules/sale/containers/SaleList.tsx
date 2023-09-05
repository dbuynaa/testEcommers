import React from 'react';
import SaleList from '../components/SaleList';
import { useQuery } from '@apollo/client';
import { getProducts } from 'modules/wholeSale/graphql/queries';
import Loading from 'ui/Loading';

const SaleListContainer = ({ productIds, productsWithValue }: { productIds: [string]; productsWithValue: any }) => {
  const ids = productsWithValue.map((item: any) => item.productId);
  const { loading, data, error } = useQuery(getProducts, {
    variables: {
      ids,
    },
  });

  if (loading) return <Loading />;
  if (error) return <div></div>;

  const saleProducts = data.poscProducts || [];
  console.log(saleProducts, 'saleProducts');
  const props = {
    saleProducts,
    productsWithValue,
  };
  return <SaleList {...props} />;
};

export default SaleListContainer;
