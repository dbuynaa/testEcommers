import React from 'react';
import WholeProductContainer from '../containers/WholeProduct';

const WholeSale = ({ wholeSales }: any) => {
  const productIds = wholeSales[0].productIds || [];
  const endDate = wholeSales[0].endDate || '';
  // const endDate = '2021-09-30T00:00:00.000Z';
  return (
    <div className="container flex">
      <WholeProductContainer productIds={productIds} endDate={endDate} />
    </div>
  );
};

export default WholeSale;
