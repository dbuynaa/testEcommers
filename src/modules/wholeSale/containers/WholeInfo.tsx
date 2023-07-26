import React from 'react';
import WholeInfo from 'modules/wholeSale/components/WholeInfo';
import Loading from 'ui/Loading';
import { useQuery } from '@apollo/client';
import { getPricingPlans } from '../graphql/queries';

export default function WholeInfoContainer({ id }) {

    const { data, loading, refetch } = useQuery(getPricingPlans, {
        variables: {
          status: "active",
        },
      });
    
      if (loading) return <Loading />;
    
      console.log("data", data);
    
      const wholeSales = data.pricingPlans || [];
    //   const wholeSale = wholeSales.filter() wholeSale[0] : [{}]

  return <WholeInfo productId="" />;
}