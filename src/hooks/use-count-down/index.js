import { useCallback, useEffect, useRef, useState } from 'react';

const useCountDown = (options) => {
  const { delay = 1000, startCount = 120, endCount = 0, endCountdownCb = () => {} } = options;

  const intervalID = useRef('');

  const [countdownOver, setCountdownOver] = useState(false);
  const [countDown, setCountDown] = useState(startCount);

  const clearCountdown = useCallback(() => {
    if (intervalID.current) {
      clearInterval(intervalID.current);
    }
  }, []);

  const startTimer = useCallback(() => {
    intervalID.current = setInterval(() => {
      setCountDown((count) => count - delay / 1000);
    }, delay);
  }, [delay]);

  const startCountdown = useCallback(() => {
    clearCountdown();
    setCountdownOver(false);
    setCountDown(startCount);
    startTimer();
  }, [startCount, startTimer, clearCountdown]);

  const stopCountdown = useCallback(() => {
    clearCountdown();
  }, [clearCountdown]);

  const goOnCountdown = useCallback(() => {
    if (!countdownOver) {
      startTimer();
    }
  }, [startTimer, countdownOver]);

  useEffect(
    () => () => {
      clearCountdown();
    },
    [clearCountdown],
  );

  useEffect(() => {
    if (countDown === endCount) {
      clearCountdown();
      setCountdownOver(true);
      endCountdownCb();
    }
  }, [countDown, endCountdownCb, endCount, clearCountdown]);

  return [
    countDown,
    {
      startCountdown,
      stopCountdown,
      goOnCountdown,
      clearCountdown,
    },
    countdownOver,
  ];
};

export default useCountDown;
