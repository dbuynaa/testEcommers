import React from 'react';
import SaleListContainer from '../containers/SaleList';

const PricingPlans = ({ pricingPlans }: { pricingPlans: any }) => {
  const mergedProductIds = pricingPlans.reduce((merged, obj) => {
    return merged.concat(obj.productIds);
  }, []);

  mergedProductIds.sort((a, b) => {
    const aValue = pricingPlans.find((obj) => obj.productIds.includes(a)).value;
    const bValue = pricingPlans.find((obj) => obj.productIds.includes(b)).value;
    return bValue - aValue;
  });

  const productsWithValue = mergedProductIds.map((productId) => {
    const obj = pricingPlans.find((item) => item.productIds.includes(productId));
    // console.log(obj, 'obj');
    return {
      value: obj.value,
      productId: productId,
    };
  });

  console.log(pricingPlans, productsWithValue, 'pricingPlans');
  // console.log(productsWithValue, 'productsWithValue', mergedProductIds);

  return <SaleListContainer productIds={mergedProductIds || []} productsWithValue={productsWithValue} />;
};

export default PricingPlans;
