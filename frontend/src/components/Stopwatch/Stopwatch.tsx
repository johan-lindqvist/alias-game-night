import { useCallback, useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Pause, PlayArrow, Replay } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { Keybinds } from '~/constants';
import { useGameContext } from '~/hooks/useGameContext';
import { useKeybinds } from '~/hooks/useKeybinds';

import { KeybindTooltip } from '../KeybindTooltip';

import { StopwatchContainer, TimerText } from './styled';

export function Stopwatch() {
  const [isStarted, setIsStarted] = useState(false);

  const { settings, nextWord, activeTeamId, activeTeam } = useGameContext();
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

  const handlePlayButtonClick = useCallback(() => {
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
  }, [isRunning, isStarted, nextWord, pause, resume, start]);

  const handleRestart = () => {
    const expiryTimestamp = getExpiryTimestamp();

    restart(expiryTimestamp, false);

    setIsStarted(false);
  };

  useEffect(() => {
    handleRestart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTeamId]);

  useEffect(() => {
    if (activeTeam.isFinished) {
      handleRestart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTeam]);

  useKeybinds({ [Keybinds.PlayPause]: handlePlayButtonClick });

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedTime = `${formattedMinutes} : ${formattedSeconds}`;

  return (
    <StopwatchContainer>
      <TimerText>{formattedTime}</TimerText>
      <KeybindTooltip title="Space">
        {isRunning ? (
          <IconButton onClick={pause}>
            <Pause />
          </IconButton>
        ) : (
          <IconButton disabled={activeTeam.isFinished} onClick={handlePlayButtonClick}>
            <PlayArrow />
          </IconButton>
        )}
      </KeybindTooltip>
      <IconButton disabled={activeTeam.isFinished} onClick={handleRestart}>
        <Replay />
      </IconButton>
    </StopwatchContainer>
  );
}
