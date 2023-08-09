import Image from 'ui/Image';
import { readFile } from 'utils';
import Link from 'next/link';
import useCountDownTimer from 'lib/useCountDownHook';

const ProductBigCard = ({ wholeProduct, onComplete }) => {
  const { isFinished, countDown } = useCountDownTimer(
    wholeProduct.endDate,
    onComplete
  );

  return (
    <div key={wholeProduct._id}>
      <Link
        href={{
          pathname: `/products/${wholeProduct._id}?wholesale=true`,
          query: {
            data: JSON.stringify(wholeProduct)
          }
        }}
        as={`/products/${encodeURIComponent(wholeProduct._id)}?wholesale=true`}
      >
        <Image
          src={readFile((wholeProduct.attachment || {}).url)}
          className={`${
            !isFinished
              ? 'w-full h-96 origin-top-left rotate-90 rounded-3xl object-fit  px-80 py-9'
              : ''
          } `}
          fill={false}
          alt="name"
        />

        <div className=" w-60 h-60 px-80 py-9 bg-gradient-to-r from-blue-900 to-indigo-800 rounded-tl-full rounded-tr-full rounded-bl-3xl rounded-br-3xl justify-center items-center inline-flex">
          <div className="self-stretch flex-col justify-start items-center inline-flex ">
            <div className="text-white text-3xl font-bold leading-10 tracking-tight  ">
              Дуусах хугацаа
            </div>

            <div className=" text-white text-opacity-95 text-8xl font-extrabold">
              {isFinished ? 'Timer Finished' : countDown}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductBigCard;
function setWholeSaleProductDetail(wholeProduct: any) {
  throw new Error('Function not implemented.');
}
