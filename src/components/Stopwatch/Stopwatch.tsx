import { useTimer } from 'react-timer-hook';

export function Stopwatch() {
  const getExpiryTimestamp = () => {
    const date = new Date();

    date.setSeconds(date.getSeconds() + 60);

    return date;
  };

  const onExpire = () => {
    alert('expired');
  };

  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    autoStart: false,
    onExpire,
  });

  const handleRestart = () => {
    const expiryTimestamp = getExpiryTimestamp();

    restart(expiryTimestamp, false);
  };

  return (
    <div>
      <button type="button" onClick={start}>
        Start
      </button>
      <button type="button" onClick={pause}>
        Pause
      </button>
      <button type="button" onClick={handleRestart}>
        Reset
      </button>
      <div>
        <span>minutes: {minutes} </span>
        <span>seconds: {seconds} </span>
      </div>
    </div>
  );
}
