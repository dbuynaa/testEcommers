import PricingPlansContainer from 'modules/sale/containers/PricingPlans';
import SaleListContainer from 'modules/sale/containers/SaleList';
import React from 'react';

const index = () => {
  return (
    <div>
      <div className="container">
        <SaleListContainer />
        <PricingPlansContainer />
      </div>
    </div>
  );
};

export default index;
