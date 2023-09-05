import React from 'react';
import { useQuery } from '@apollo/client';
import { getPricingPlans } from '../graphql/queries';
import Loading from 'ui/Loading';
import WholeSale from '../components/WholeSale';

const WholeSaleContainer = () => {
  const now = new Date();
  const { data, loading } = useQuery(getPricingPlans, {
    variables: {
      status: 'active',
      // productId: productId,
      findOne: false,
      // date: now,
    },
  });

  if (loading) return <Loading />;

  const wholeSales = data?.pricingPlans || [];

  return <WholeSale wholeSales={wholeSales} />;
};

export default WholeSaleContainer;
