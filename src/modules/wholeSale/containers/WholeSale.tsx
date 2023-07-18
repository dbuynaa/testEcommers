import React from 'react';

import { useQuery } from '@apollo/client';

import { getPricingPlans } from '../graphql/queries';
import Loading from 'ui/Loading';
import WholeSale from '../components/WholeSale';

const WholeSaleContainer = () => {
  const { data, loading} = useQuery(getPricingPlans, {
    variables: {
      status: 'active'
    }
  });
  if (loading) return <Loading />;
  console.log('data', data);


  const wholeSales = data.pricingPlans || [];
  const updateProps = { wholeSales };
  return <WholeSale {...updateProps} />;
};

export default WholeSaleContainer;
