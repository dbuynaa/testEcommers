import { useQuery } from '@apollo/client';
import React from 'react';
import Loading from 'ui/Loading';
import { queries } from 'modules/Products/graphql';

const getPricingPlanProducts = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useQuery(queries.productPricingPlans, {
    variables: {
      status: 'active',
    },
  });
  if (loading) return <Loading />;
  const saleProductData = data.pricingPlans || [];
  return <></>;
};

export default getPricingPlanProducts;
