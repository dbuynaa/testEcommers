import React from 'react';
import { useQuery } from '@apollo/client';
import WholeProduct from '../components/WholeProduct';
import { getProducts } from '../graphql/queries';
import Loading from 'ui/Loading';

const WholeProductContainer = ({ productIds = [], wholeSales }) => {
  const { loading, error, data, refetch } = useQuery(getProducts, {
    variables: {
      ids: productIds,
    },
  });

  if (loading) return <Loading />;

  if (error) return <div></div>;

  const wholeProducts = data.poscProducts || [];

  return <WholeProduct wholeProducts={wholeProducts} wholeSales={wholeSales} refetch={refetch} />;
};

export default WholeProductContainer;
