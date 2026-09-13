import React, { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';

export const CountdownSection: React.FC = () => {
  const targetDateStr = weddingData.hero.wedding_date;

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDateStr));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateStr));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  function calculateTimeLeft(dateString: string) {
    const difference = +new Date(dateString) - +new Date();
    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days: days.toString(),
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    };
  }

  return (
    <section className="wed010-countdown-section" id="countdown" aria-label="Wedding Countdown">
      <div className="wed010-countdown-content">
        <h2 className="wed010-countdown-title">Let the Countdown begins</h2>
        <div className="wed010-countdown-wrapper">
          <div className="shared-countdown" role="timer">
            <div className="time-box">
              <span className="num" id="countdown-days">{timeLeft.days}</span>
              <span className="label">Days</span>
            </div>
            <div className="time-box">
              <span className="num" id="countdown-hours">{timeLeft.hours}</span>
              <span className="label">Hrs</span>
            </div>
            <div className="time-box">
              <span className="num" id="countdown-minutes">{timeLeft.minutes}</span>
              <span className="label">Mins</span>
            </div>
            <div className="time-box">
              <span className="num" id="countdown-seconds">{timeLeft.seconds}</span>
              <span className="label">Secs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
