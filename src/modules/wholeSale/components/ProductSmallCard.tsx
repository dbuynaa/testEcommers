import { useRouter } from 'next/router';
import { useWholeSaleProductDetail } from 'modules/appContext';
import WholesaleProduct from 'components/Products/WholesaleProduct';

const ProductSmallCard = ({ wholeProduct, endDate }) => {
  console.log('sdasdas');
  const router = useRouter();
  const { setWholeSaleProductDetail } = useWholeSaleProductDetail();

  return <WholesaleProduct {...wholeProduct} wrapped endDate={endDate} countDown={true} />;
};

export default ProductSmallCard;
