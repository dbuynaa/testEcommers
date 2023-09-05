import React from 'react';
import { useQuery } from '@apollo/client';
import WholeProduct from '../components/WholeProduct';
import { getProducts } from '../graphql/queries';
import Loading from 'ui/Loading';

const WholeProductContainer = ({ productIds = [], endDate }) => {
  const { loading, error, data } = useQuery(getProducts, {
    variables: {
      ids: productIds,
    },
  });

  if (loading) return <Loading />;

  if (error) return <div></div>;

  const wholeProducts = data.poscProducts || [];
  return <WholeProduct wholeProducts={wholeProducts} endDate={endDate} />;
};

export default WholeProductContainer;
