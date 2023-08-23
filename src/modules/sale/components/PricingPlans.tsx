import React from 'react';
import SaleListContainer from '../containers/SaleList';

const PricingPlans = ({ pricingPlans }: { pricingPlans: any }) => {
  return <SaleListContainer productIds={pricingPlans.productIds || []} />;
};

export default PricingPlans;
