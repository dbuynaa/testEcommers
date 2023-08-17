import React from 'react';
import { useQuery } from '@apollo/client';
import { getPricingPlans } from 'modules/wholeSale/graphql/queries';
import Loading from 'ui/Loading';
import PricingPlans from '../components/PricingPlans';

const PricingPlansContainer = () => {
  const { data, loading, refetch, error } = useQuery(getPricingPlans, {
    variables: {
      status: 'active',
    },
  });

  if (loading) return <Loading />;
  if (error) return <div></div>;

  const pricingPlans = data.pricingPlans || [];
  console.log(pricingPlans, 'pricingPlans');
  const props = {
    pricingPlans,
  };
  return <PricingPlans {...props} />;
};

export default PricingPlansContainer;
