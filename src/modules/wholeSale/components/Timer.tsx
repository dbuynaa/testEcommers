import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'ui/Image';
import { readFile } from 'utils';
const Timer = ({ wholeProduct, isFirst }) => {
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
    return () => clearInterval(timerInterval);
  }, [wholeProduct.endDate]);

  return (
    <div
      key={wholeProduct._id}
      className={`relative ${
        isFirst && !isFinished ? 'h-full w-full' : 'h-56 w-full'
      } flex flex-wrap gap-10 pb-10 `}
    >
      <div className="flex justify-center bg-slate-600">
        <Image
          src={readFile((wholeProduct.attachment || {}).url)}
          className={`${
            isFirst && !isFinished ? 'w-full h-full object-cover' : ''
          } hover:scale-105 transition duration-100 cursor-pointer ease-in pt-3 pb-3 `}
          fill={false}
          alt="name"
          sizes="(max-width: 768px) 50vw, (max-width: 1500px) 25vw, 20vw"
        />
      </div>

      <p className="flex justify-self-end pl-40 text-lg text-red-500">
        {isFinished
          ? 'Timer Finished'
          : `${difference.days}:${difference.hours}:${difference.minutes}:${difference.seconds}`}
      </p>
      <div className="flex flex-wrap flex-col gap-3 justify-center pt-32 ">
        <span className="text-center pt-1 pl-2 text-xs">
          {wholeProduct.name}
        </span>
        <span className="text-center text-xs ">{wholeProduct.unitPrice}</span>
      </div>
    </div>
  );
};

export default Timer;

// import dayjs from 'dayjs';
// import React, { useEffect, useState } from 'react';
// import Image from 'ui/Image';
// const Timer = ({ wholeProduct, isFirst }) => {
//   const [difference, setDifference] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });

//   useEffect(() => {
//     const endDate = dayjs(wholeProduct.endDate);

//     setInterval(() => {
//       const days = endDate.diff(dayjs(), 'day');
//       const hours = endDate.diff(dayjs(), 'hour');
//       const minutes = endDate.diff(dayjs(), 'minute');
//       const seconds = endDate.diff(dayjs(), 'second');
//       setDifference({
//         days: days,
//         hours: hours % 24,
//         minutes: minutes % 60,
//         seconds: seconds % 60
//       });
//     }, 1000);
//   }, [wholeProduct.endDate]);

//   return (
//     <div
//       key={wholeProduct._id}
//       className={`relative ${isFirst ? 'h-full' : 'h-50'} flex gap-5 `}
//     >
//       <Image
//         src={wholeProduct.attachment.url}
//         className={`${
//           isFirst ? 'w-full h-full object-cover' : ''
//         } hover:scale-105 transition duration-100 cursor-pointer ease-in`}
//         fill={false}
//         alt="name"
//       />

//       <p className="item-end">
//         {difference.days}:{difference.hours}:{difference.minutes}:
//         {difference.seconds}
//       </p>
//       <div className="pt-40 items-center">
//         <p>{wholeProduct.name}</p>
//         <p> {wholeProduct.unitPrice}</p>
//       </div>
//     </div>
//   );
// };

// export default Timer;
