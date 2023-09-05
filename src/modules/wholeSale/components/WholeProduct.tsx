import ProductSmallCard from './ProductSmallCard';
import ProductBigCard from './ProductBigCard';

const WholeProduct = ({ wholeProducts, endDate }: { wholeProducts: []; endDate: string }) => {
  // @ts-ignore
  const firstProduct = wholeProducts.length > 0 ? wholeProducts[0] : null;

  const remainingProducts = wholeProducts.length > 0 ? wholeProducts.slice(1) : [];
  console.log(endDate, 'endDateadsdas');
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="row products">
        {remainingProducts.map((wholeProduct: any, index: number) => (
          <ProductSmallCard key={index} wholeProduct={wholeProduct} endDate={endDate} />
        ))}
      </div>
      <div className=" sm:w-auto h-auto md:flex gap-10 ">
        <ProductBigCard wholeProduct={firstProduct} endDate={endDate} />
      </div>
    </div>
  );
};

export default WholeProduct;
