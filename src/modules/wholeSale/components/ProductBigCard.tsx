import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'ui/Image';
import { readFile } from 'utils';
import Link from 'next/link';

const ProductBigCard = ({ wholeProduct, onComplete }) => {
  
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

    // Call updateDifference initially
    updateDifference();

    // Update the timer every second
    const timerInterval = setInterval(updateDifference, 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
      onComplete();
    };
  }, [onComplete, wholeProduct.endDate]);

  return (
    <div
      key={wholeProduct._id}
      className="relative flex sm:w-auto h-auto md:w-full"
    >
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
          className={`${!isFinished ? 'w-full h-full object-cover' : ''}  `}
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
            {isFinished
              ? 'Timer Finished'
              : `${difference.days}:${difference.hours}:${difference.minutes}:${difference.seconds}`}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductBigCard;
