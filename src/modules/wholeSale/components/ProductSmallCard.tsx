import { useRouter } from 'next/router';
import { useWholeSaleProductDetail } from 'modules/appContext';
import useCountDownTimer from 'lib/useCountDownHook';
import WholesaleProduct from 'components/Products/WholesaleProduct';

const ProductSmallCard = ({ wholeProduct, isFirst, onComplete }) => {
  const { isFinished, countDown } = useCountDownTimer(wholeProduct.endDate, onComplete);
  const router = useRouter();
  const { setWholeSaleProductDetail } = useWholeSaleProductDetail();

  const hi = wholeProduct?.productDetail?.quantityRules[0]?.discountValue;

  const disPrice = wholeProduct.unitPrice;
  const salePrice = disPrice - (disPrice * hi) / 100;

  const goTo = () => {
    setWholeSaleProductDetail(wholeProduct);
    router.push(`/products/${wholeProduct._id}?wholesale=true`);
  };

  return <WholesaleProduct {...wholeProduct} wrapped isFinished={isFinished} countDown={countDown} />;
};

export default ProductSmallCard;
