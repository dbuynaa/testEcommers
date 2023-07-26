import React from 'react';
import { useQuery } from '@apollo/client';
import { getPricingPlans } from '../graphql/queries';
import Loading from 'ui/Loading';
import WholeSale from '../components/WholeSale';

const WholeSaleContainer = () => {
  const { data, loading, refetch } = useQuery(getPricingPlans, {
    variables: {
      status: 'active'
    }
  });

  if (loading) return <Loading />;

  console.log('data', data);

  const wholeSales = data.pricingPlans || []; //=> [{},{}]

  return <WholeSale wholeSales={wholeSales} refetch={refetch} />;
};

export default WholeSaleContainer;
