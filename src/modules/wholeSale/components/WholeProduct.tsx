import { useMemo } from 'react';
import ProductSmallCard from './ProductSmallCard';
import ProductBigCard from './ProductBigCard';
import { useWholeSaleProductDetail } from 'modules/appContext';

const WholeProduct = ({
  wholeProducts,
  wholeSales,
  refetch
}: {
  wholeProducts: [];
  wholeSales: [];
  refetch: Function;
}) => {
  const { setWholeSaleProductDetail } = useWholeSaleProductDetail();
  const wholeData = useMemo(() => {
    let list = wholeProducts.map((wholeProduct: any) => {
      const wholeSale: any = wholeSales.find(
        (a: any) => !!a.products.find((b: any) => b === wholeProduct._id)
      );
      return {
        ...wholeProduct,
        productDetail: wholeSale,
        endDate: wholeSale?.endDate
      };
    });

    let first = list.shift();

    return {
      first,
      list: [...list]
    };
  }, [wholeSales, wholeProducts]);

  setWholeSaleProductDetail(wholeData);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-rows-3">
        {wholeData?.list?.map((wholeProduct: any, index: number) => (
          <ProductSmallCard
            key={index}
            wholeProduct={wholeProduct}
            isFirst={false}
            onComplete={refetch}
          />
        ))}
      </div>
      <div className=" sm:w-auto h-auto md: flex gap-10 ">
        <ProductBigCard wholeProduct={wholeData.first} onComplete={refetch} />
      </div>
    </div>
  );
};

export default WholeProduct;
