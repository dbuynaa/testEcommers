import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'ui/Image';
import { readFile } from 'utils';
import Link from 'next/link';

const ProductSmallCard = ({ wholeProduct, isFirst, onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [difference, setDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const endDate = dayjs(wholeProduct.endDate);

    const updateDifference = () => {
      const now = dayjs();
      const timeDifference = endDate.diff(now, 'second');

      if (timeDifference <= 0) {
        setIsFinished(true);
      } else {
        const days = endDate.diff(now, 'day');
        const hours = endDate.diff(now, 'hour') % 24;
        const minutes = endDate.diff(now, 'minute') % 60;
        const seconds = endDate.diff(now, 'second') % 60;

        setDifference({
          days,
          hours,
          minutes,
          seconds
        });
      }
    };

    updateDifference();

    const timerInterval = setInterval(updateDifference, 1000);

    return () => {
      clearInterval(timerInterval);
      onComplete();
    };
  }, [onComplete, wholeProduct.endDate]);

  const hi = wholeProduct?.productDetail.quantityRules[0]?.discountValue;

  const disPrice = wholeProduct.unitPrice;
  const salePrice = disPrice - (disPrice * hi) / 100;
  console.log('salePrice', salePrice);
  return (
    <div key={wholeProduct._id} className="relative flex h-80 w-80 gap-5 ">
      <Link
        href={{
          pathname: `/wholesale/[id]`,
          query: {
            data: JSON.stringify(wholeProduct)
          }
        }}
        as={`/wholesale/${encodeURIComponent(wholeProduct._id)}`}
      >
        <Image
          src={readFile((wholeProduct.attachment || {}).url)}
          className={`${
            isFirst && !isFinished ? 'w-full h-full object-cover' : ''
          } hover:scale-105 transition duration-100 cursor-pointer ease-in pt-3 pb-3 `}
          fill={false}
          alt="name"
        />
        <div>
          <p className="flex justify-self-end pl-40 text-lg text-gray-400 pt-1">
            {isFinished
              ? 'Timer Finished'
              : `${difference.days}:${difference.hours}:${difference.minutes}:${difference.seconds}`}
          </p>
        </div>

        <div className="flex flex-col pt-64 items-center pl-5 absolute ">
          <span className="pt-1 pl-2 text-black">{wholeProduct.name}</span>
          <div className="flex gap-10 text-center">
            {' '}
            <span className="text-md text-black pt-1 line-through">
              {wholeProduct.unitPrice}
            </span>
            <span className="text-md text-red-500 pt-1 ">{salePrice}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductSmallCard;
