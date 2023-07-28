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
    <div
      key={wholeProduct._id}
      className="relative flex sm:w-auto h-auto md:w-full"
    >
      <Link
        href={{
          pathname: `/products/[id]`,
          query: {
            data: JSON.stringify(wholeProduct)
          }
        }}
        as={`/product/${encodeURIComponent(wholeProduct._id)}`}
      >
        <Image
          src={readFile((wholeProduct.attachment || {}).url)}
          className={`${!isFinished ? 'w-96 h-96 object-cover' : ''}  `}
          fill={false}
          alt="name"
        />

        <div className="timer-wrapper text-white ">
          <p className="text-[40px] flex justify-center">Дуусах хугацаа</p>
          <p className="flex text-4xl text-center pl-16 pt-1">
            {' '}
            Өдөр : Цаг : Минут : Секунд
          </p>
          <p className="flex   absolute pt-[10px] text-[90px] justify-center items-center z-10 pl-24">
            {isFinished ? 'Timer Finished' : countDown}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductBigCard;
