import React, { useMemo } from 'react';
import WholeProductContainer from '../containers/WholeProduct';

const WholeSale = ({ wholeSales }: any) => {
  console.log('whooooooo===========', wholeSales);
  const products = useMemo(() => {
    let returnVal: any = [];
    wholeSales?.map((el: any) => {
      returnVal = [...returnVal, ...el.products];
    });
    return returnVal;
  }, [wholeSales]);

  return (
    <div className="container flex">
      <WholeProductContainer productIds={products} wholeSales={wholeSales} />
    </div>
  );
};

export default WholeSale;
