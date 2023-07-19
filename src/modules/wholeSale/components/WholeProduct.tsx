import Timer from './Timer';
import { useMemo } from 'react';

const WholeProduct = ({
  wholeProducts,
  wholeSales
}: {
  wholeProducts: [];
  wholeSales: [];
}) => {
  console.log(wholeProducts, '<---');

  const wholeData = useMemo(() => {
    let list = wholeProducts.map((wholeProduct: any) => {
      const wholeSale: any = wholeSales.find(
        (a: any) => !!a.products.find((b: any) => b === wholeProduct._id)
      );
      return {
        ...wholeProduct,
        endDate: wholeSale?.endDate
      };
    });
    let first = list.shift();
    return {
      first,
      list: [...list, ...list, ...list]
    };
  }, [wholeSales, wholeProducts]);

  return (
    <div className="grid grid-cols-2 ">
      <div className="grid grid-cols-2 grid-rows-3 ">
        {wholeData?.list?.map((wholeProduct: any, index: number) => (
          <Timer
            key={'asdasd' + index}
            wholeProduct={wholeProduct}
            isFirst={false}
          />
        ))}
      </div>
      <div className="h-full">
        <Timer wholeProduct={wholeData?.first} isFirst={true} />
      </div>
    </div>
  );
};

export default WholeProduct;
