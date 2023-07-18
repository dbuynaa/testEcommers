import React, { useMemo } from 'react';
import WholeProductContainer from '../containers/WholeProduct';
import dayjs from 'dayjs';
const WholeSale = ({ wholeSales }: any) => {
  console.log(wholeSales, 'wholeeeeee');

  const products = useMemo(() => {
    let returnVal: any = [];
    wholeSales?.map((el: any) => {
      returnVal = [...returnVal, ...el.products];
    });
    return returnVal;
  }, [wholeSales]);

  const endDate = dayjs(wholeSales.endDate);

  const days = endDate.diff(endDate, 'day');
  const formattedDuration = endDate.format('YYYY-MM-DD HH:mm');
  console.log(days, 'days');

  console.log(formattedDuration);
  const item = (sale) => {
    return <></>;
  };
  return (
    <div className="container flex ">
      {wholeSales && wholeSales.map((wholeSale: any) => item(wholeSale))}

      <WholeProductContainer productIds={products} wholeSales={wholeSales}/>
    </div>
  );
};

export default WholeSale;
