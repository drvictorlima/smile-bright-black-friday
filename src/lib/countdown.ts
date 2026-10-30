import { useEffect, useState } from "react";

export const COUNTDOWN_SECONDS = 180;

export function useCountdown() {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const deadline = Date.now() + COUNTDOWN_SECONDS * 1000;
    const id = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining === 0) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return {
    minutes: String(Math.floor(seconds / 60)).padStart(2, "0"),
    seconds: String(seconds % 60).padStart(2, "0"),
    expired: seconds === 0,
  };
}