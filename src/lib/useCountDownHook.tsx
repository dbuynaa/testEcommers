import dayjs from 'dayjs';
import  { useEffect, useState } from 'react';

const makeTwoChar = (v) => {
  return ('0' + v).slice(-2);
};

const useCountDownTimer = (endDate, onComplete) => {
  const [isFinished, setIsFinished] = useState(false);
  const [countDown, setCountDown] = useState('0:00:00:00');

  useEffect(() => {
    const finallyDate = dayjs(endDate);

    const updateDifference = () => {
      const now = dayjs();
      const timeDifference = finallyDate.diff(now, 'second');

      if (timeDifference <= 0) {
        setIsFinished(true);
      } else {
        const days = finallyDate.diff(now, 'day');
        const hours = finallyDate.diff(now, 'hour') % 24;
        const minutes = finallyDate.diff(now, 'minute') % 60;
        const seconds = finallyDate.diff(now, 'second') % 60;

        setCountDown(
          `${days}:${makeTwoChar(hours)}:${makeTwoChar(minutes)}:${makeTwoChar(
            seconds
          )}`
        );
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
  }, [onComplete, endDate]);
  return { isFinished, countDown };
};

export default useCountDownTimer;
