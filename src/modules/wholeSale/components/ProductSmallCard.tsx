import Image from 'ui/Image';
import { readFile } from 'utils';
import { useRouter } from 'next/router';
import { useWholeSaleProductDetail } from 'modules/appContext';
import Button from 'ui/Button';
import useCountDownTimer from 'lib/useCountDownHook';

const ProductSmallCard = ({ wholeProduct, isFirst, onComplete }) => {
  const { isFinished, countDown } = useCountDownTimer(
    wholeProduct.endDate,
    onComplete
  );
  const router = useRouter();
  const { setWholeSaleProductDetail } = useWholeSaleProductDetail();

  const hi = wholeProduct?.productDetail?.quantityRules[0]?.discountValue;

  const disPrice = wholeProduct.unitPrice;
  const salePrice = disPrice - (disPrice * hi) / 100;

  const goTo = () => {
    setWholeSaleProductDetail(wholeProduct);
    router.push(`/products/${wholeProduct._id}?wholesale=true`);
  };

  return (
    <div key={wholeProduct._id} className="relative flex h-[400px] w-[350px] ">
      <Button onClick={goTo}>
        <Image
          src={readFile((wholeProduct.attachment || {}).url)}
          className={`${
            isFirst && !isFinished ? 'object-cover' : ''
          } hover:scale-105 transition duration-100 cursor-pointer ease-in`}
          fill={false}
          alt="name"
        />

        <p className="flex pl-40 text-lg text-gray-400 pb-72 ">
          {isFinished ? 'Timer Finished' : countDown}
        </p>

        <div className="flex flex-col pt-64 items-center pl-5 absolute ">
          <span className="pb-1 pt-5 text-black">{wholeProduct.name}</span>
          <div className="flex gap-10 text-center text-[10 px]">
            {' '}
            <span className=" text-black line-through">
              {wholeProduct.unitPrice}
            </span>
            <span className="text-red-500 ">{salePrice}</span>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default ProductSmallCard;
