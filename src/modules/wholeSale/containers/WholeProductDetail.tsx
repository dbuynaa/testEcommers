import { useQuery } from '@apollo/client';
import React from 'react';
import Loading from 'ui/Loading';

import { getPricingPlanDetail } from '../graphql/queries';
import WholeProductDetail from '../components/WholeProductDetail';

const WholeProductDetailContainer = () => {
  const { data, loading, refetch } = useQuery(getPricingPlanDetail, {
    variables: {
      pricingPlanDetailId: 'b2d6p5tLCviMJdr6A'
    }
  });

  if (loading) return <Loading />;

  console.log('Pricing Product', data);

  const wholeProductDetails = data?.pricingPlanDetail || []; //=> [{},{}]

  return <WholeProductDetail wholeProductDetails={wholeProductDetails} />;
};

export default WholeProductDetailContainer;
