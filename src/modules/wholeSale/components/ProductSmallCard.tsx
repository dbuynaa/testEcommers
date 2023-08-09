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
    <div key={wholeProduct._id} className="relative flex group ">
      <Button onClick={goTo} className="flex flex-col gap-4 ">
        <p className="self-end text-lg text-gray-400 ">
          {isFinished ? 'Timer Finished' : countDown}
        </p>
        <div className="relative object-cover rounded-3lg">
          <Image
            src={readFile((wholeProduct.attachment || {}).url)}
            className={`${
              isFirst && !isFinished ? 'object-cover' : ''
            } group-hover:scale-105 transition duration-100 cursor-pointer ease-in w-fit h-fit object-cover `}
            fill
            width={400}
            height={400}
            alt="name"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-black">{wholeProduct.name}</span>
          <div className="flex gap-5 text-center">
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
