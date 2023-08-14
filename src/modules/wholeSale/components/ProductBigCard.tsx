import Image from 'ui/Image';
import { readFile } from 'utils';
import Link from 'next/link';
import useCountDownTimer from 'lib/useCountDownHook';

const ProductBigCard = ({ wholeProduct, onComplete }) => {
  const { isFinished, countDown } = useCountDownTimer(wholeProduct.endDate, onComplete);
  console.log(wholeProduct, 'whp');
  return (
    <div key={wholeProduct._id} className="wholesale-big-card">
      <Link
        href={{
          pathname: `/products/${wholeProduct._id}?wholesale=true`,
          query: {
            data: JSON.stringify(wholeProduct),
          },
        }}
        as={`/products/${encodeURIComponent(wholeProduct._id)}?wholesale=true`}
      >
        <h6>{wholeProduct.unitPrice}</h6>
        <div className="wholesale-bg">
          <Image src={readFile((wholeProduct.attachment || {}).url)} height={800} width={400} alt="name" />
          <div className="caption">
            <h5>Дуусах хугацаа</h5>
            <div className="wholesale-countdown">{isFinished ? 'Хугацаа дууссан' : countDown}</div>
          </div>
        </div>
        {/* 
        <div className=" w-60 h-60 px-80 py-9 bg-gradient-to-r from-blue-900 to-indigo-800 rounded-tl-full rounded-tr-full rounded-bl-3xl rounded-br-3xl justify-center items-center inline-flex">
          <div className="self-stretch flex-col justify-start items-center inline-flex ">
            <div className="text-white text-3xl font-bold leading-10 tracking-tight  ">
              Дуусах хугацаа
            </div>

            <div className=" text-white text-opacity-95 text-8xl font-extrabold">
              {isFinished ? 'Timer Finished' : countDown}
            </div>
          </div>
        </div> */}
      </Link>
    </div>
  );
};

export default ProductBigCard;
