import { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Pause, PlayArrow, Replay } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useGameContext } from '~/hooks/useGameContext';

import { StopwatchContainer, TimerText } from './styled';

export function Stopwatch() {
  const [isStarted, setIsStarted] = useState(false);

  const { settings, nextWord, activeTeamId } = useGameContext();
  const { time } = settings;

  const getExpiryTimestamp = () => {
    const date = new Date();

    date.setSeconds(date.getSeconds() + time);

    return date;
  };

  const onExpire = () => {
    // eslint-disable-next-line no-alert
    alert('expired');
  };

  const { isRunning, seconds, minutes, start, pause, resume, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    autoStart: false,
    onExpire,
  });

  const handlePlayButtonClick = () => {
    if (isRunning) {
      pause();

      return;
    }

    if (isStarted) {
      resume();
    } else {
      setIsStarted(true);
      nextWord();
      start();
    }
  };

  const handleRestart = () => {
    const expiryTimestamp = getExpiryTimestamp();

    restart(expiryTimestamp, false);

    setIsStarted(false);
  };

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTeamId]);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedTime = `${formattedMinutes} : ${formattedSeconds}`;

  return (
    <StopwatchContainer>
      <TimerText>{formattedTime}</TimerText>
      {isRunning ? (
        <IconButton onClick={pause}>
          <Pause />
        </IconButton>
      ) : (
        <IconButton onClick={handlePlayButtonClick}>
          <PlayArrow />
        </IconButton>
      )}
      <IconButton onClick={handleRestart}>
        <Replay />
      </IconButton>
    </StopwatchContainer>
  );
}
