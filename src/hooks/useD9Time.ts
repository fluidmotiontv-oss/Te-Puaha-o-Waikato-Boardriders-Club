import { useState, useEffect } from 'react';

export function useD9Time() {
  const [time, setTime] = useState({ d9Hour: 9, d9Min: 43, d9Sec: 21 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Dragon 9 time calculation (54-minute hour, harmonic 432Hz cycle)
      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hr = (now.getHours() % 9) + 1;
      setTime({
        d9Hour: hr,
        d9Min: min > 54 ? min - 54 : min,
        d9Sec: sec
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}
