"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 5,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="text-right">
      <div 
        className="text-purple-400 text-base sm:text-xl md:text-2xl tracking-widest"
        style={{ fontFamily: "'Courier New', 'Monaco', monospace", textShadow: "0 0 10px rgba(168, 85, 247, 0.5)" }}
      >
        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </div>
      <p className="text-white/40 text-[8px] sm:text-[10px] mt-1 uppercase tracking-wide">
        Time left to claim your spot at GTM Summit
      </p>
    </div>
  );
}
