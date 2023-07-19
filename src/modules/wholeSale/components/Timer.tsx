import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Image from 'ui/Image';
const Timer = ({ wholeProduct, isFirst }) => {
  const [difference, setDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const endDate = dayjs(wholeProduct.endDate);

    setInterval(() => {
      const days = endDate.diff(dayjs(), 'day');
      const hours = endDate.diff(dayjs(), 'hour');
      const minutes = endDate.diff(dayjs(), 'minute');
      const seconds = endDate.diff(dayjs(), 'second');
      setDifference({
        days: days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    }, 1000);
  }, [wholeProduct.endDate]);

  return (
    <div
      key={wholeProduct._id}
      className={`relative ${isFirst ? 'h-full' : 'h-50'} flex gap-5 `}
    >
      <Image
        src={wholeProduct.attachment.url}
        className={`${
          isFirst ? 'w-full h-full object-cover' : ''
        } hover:scale-105 transition duration-100 cursor-pointer ease-in`}
        fill={false}
        alt="name"
      />

      <p className="item-end">
        {difference.days}:{difference.hours}:{difference.minutes}:
        {difference.seconds}
      </p>
      <div className="pt-40 items-center">
        <p>{wholeProduct.name}</p>
        <p> {wholeProduct.unitPrice}</p>
      </div>
    </div>
  );
};

export default Timer;
