import { useQuery } from '@apollo/client';
import React from 'react';
import Loading from 'ui/Loading';
import { queries } from './graphql';

const SaleProduct = () => {
  const { data, loading } = useQuery(queries.productPricingPlans, {
    variables: {
      status: 'active'
    }
  });
  if (loading) return <Loading />;
  const saleProductData = data.pricingPlans || [];
  console.log('saleProductData', saleProductData);
  return <></>;
};

export default SaleProduct;
