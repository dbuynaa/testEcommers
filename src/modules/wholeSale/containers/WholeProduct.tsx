import React from 'react';
import { useQuery } from '@apollo/client';
import WholeProduct from '../components/WholeProduct';
import { getProducts } from '../graphql/queries';

const WholeProductContainer = ({ productIds, wholeSales }) => {
  const { loading, error, data, refetch } = useQuery(getProducts, {
    variables: {
      status: 'active',
      ids: productIds
    }
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  const wholeProducts = data.poscProducts || [];


  return (
    <WholeProduct
      wholeProducts={wholeProducts}
      wholeSales={wholeSales}
      refetch={refetch}
    />
  );
};

export default WholeProductContainer;
