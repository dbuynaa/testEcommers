import React, { useState, useEffect } from 'react';

function CountDown({ endDate, big }: { endDate: string; big?: boolean }) {
  // Target date and time
  const targetDate = new Date(endDate || '').getTime();

  // Initialize state for the countdown timer
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true };
    }

    const days = String(Math.floor(timeDifference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((timeDifference % (1000 * 60)) / 1000)).padStart(2, '0');

    return { days, hours, minutes, seconds, isExpired: false };
  }

  return (
    <div className="countdown-wrapper">
      {big ? (
        timeLeft.isExpired ? (
          <div className="Time big">Хугацаа дууссан</div>
        ) : (
          <div className="Countdown big flex">
            <div className="Time">
              <span>{timeLeft.days}</span> өдөр
            </div>
            <div className="Time">
              <span>{timeLeft.hours}</span> цаг
            </div>
            <div className="Time">
              <span>{timeLeft.minutes}</span> минут
            </div>
            <div className="Time">
              <span>{timeLeft.seconds}</span> секунд
            </div>
          </div>
        )
      ) : timeLeft.isExpired ? (
        <div className="Time">Хугацаа дууссан</div>
      ) : (
        <div className="Countdown flex">
          <div className="Time">
            <span>{timeLeft.days}</span>:
          </div>
          <div className="Time">
            <span>{timeLeft.hours}</span>:
          </div>
          <div className="Time">
            <span>{timeLeft.minutes}</span>:
          </div>
          <div className="Time">
            <span>{timeLeft.seconds}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountDown;
