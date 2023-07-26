// import React, { useEffect, useState } from 'react';
// import dayjs from 'dayjs';

const Time = () => {
  // const [time, setTime] = useState(false);
  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   const target = new Date('2023-07-06T23:59:59');
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const difference = target.getTime() - now.getTime();

  //     const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  //     setDays(d);

  //     const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  //     setHours(h);

  //     const m = Math.floor((difference / (1000 * 60)) % 60);
  //     setMinutes(m);

  //     const s = Math.floor((difference / 1000) % 60);
  //     setSeconds(s);

  //     if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
  //       setTime(true);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // const endDate = '2023-07-25 12:00';
  // const startDate = '2023-07-20 10:30';

  // const parsedEndDate = dayjs(endDate);
  // const parsedStartDate = dayjs(startDate);

  // const duration = parsedEndDate.diff(parsedStartDate, 'day');
  // const formattedDuration = parsedEndDate.format('YYYY-MM-DD HH:mm');

  // console.log(duration); // Output: 5
  // console.log(formattedDuration); // Output: '2023-07-25 12:00'

  return (
    <div className="timer-wrapper">
      {' '}
      <h4 className="text-white">Дуусах хугацаа</h4>
      <div className="timer-inner ">
        <div className="timer-segment">
          <span className="time"></span>
          <span className="label">Өдөр</span>
        </div>
        <span className="divider">:</span>
        <div className="timer-segment">
          <span className="time"></span>
          <span className="label">Цаг </span>
        </div>
        <span className="divider">:</span>
        <div className="timer-segment">
          <span className="time"></span>
          <span className="label">Минут</span>
        </div>
        <span className="divider">:</span>
        <div className="timer-segment">
          <span className="time"></span>
          <span className="label">Секунд</span>
        </div>
      </div>
    </div>
  );
};

export default Time;
