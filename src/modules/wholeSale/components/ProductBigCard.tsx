import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "ui/Image";
import { readFile } from "utils";
import Link from "next/link";

const ProductBigCard = ({ wholeProduct, onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [difference, setDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endDate = dayjs(wholeProduct.endDate);

    const updateDifference = () => {
      const now = dayjs();
      const timeDifference = endDate.diff(now, "second");

      if (timeDifference <= 0) {
        setIsFinished(true);
      } else {
        const days = endDate.diff(now, "day");
        const hours = endDate.diff(now, "hour") % 24;
        const minutes = endDate.diff(now, "minute") % 60;
        const seconds = endDate.diff(now, "second") % 60;

        setDifference({
          days,
          hours,
          minutes,
          seconds,
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
  }, [wholeProduct.endDate]);


  return (
    <div key={wholeProduct._id} className={`relative ${!isFinished ? "h-full w-full" : "h-56 w-full"} flex flex-wrap gap-10 pb-10 `}>
      <Link
        href={{
          pathname: `/wholesale/[id]`,
          query: {
            data: JSON.stringify(wholeProduct),
          },
        }}
        as={`/wholesale/${encodeURIComponent(wholeProduct._id)}`}
      >
        <div className="flex justify-center bg-slate-600">
          <Image
            src={readFile((wholeProduct.attachment || {}).url)}
            className={`${!isFinished ? "w-full h-full object-cover" : ""} hover:scale-105 transition duration-100 cursor-pointer ease-in pt-3 pb-3 `}
            fill={false}
            alt="name"
          />
        </div>

        <p className="flex justify-self-end pl-40 text-lg text-red-500">{isFinished ? "Timer Finished" : `${difference.days}:${difference.hours}:${difference.minutes}:${difference.seconds}`}</p>
        <div className="flex flex-wrap flex-col gap-3 justify-center pt-32 "></div>
      </Link>
    </div>
  );
};

export default ProductBigCard;
