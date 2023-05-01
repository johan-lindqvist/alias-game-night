import { useEffect } from 'react';

import { Keybinds } from '~/constants';
import { useGameContext } from '~/hooks/useGameContext';

import { KeybindTooltip } from '../KeybindTooltip';

import { ActionsContainer, StyledButton } from './styled';

export function TeamActions() {
  const { activeWord, nextWord, correctGuess, nextTeam } = useGameContext();
  const disabled = !activeWord;

  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent) => {
      if (disabled) {
        return;
      }

      if (event.code === Keybinds.CorrectGuess) {
        correctGuess();
      }

      if (event.code === Keybinds.SkipWord) {
        nextWord();
      }
    };

    document.addEventListener('keypress', onKeyPress);

    return () => document.removeEventListener('keypress', onKeyPress);
  }, [disabled, correctGuess, nextWord]);

  return (
    <ActionsContainer>
      <KeybindTooltip tooltip="C">
        <StyledButton disabled={disabled} onClick={correctGuess}>
          Correct Guess
        </StyledButton>
      </KeybindTooltip>
      <KeybindTooltip tooltip="S">
        <StyledButton disabled={disabled} onClick={nextWord}>
          Skip Word
        </StyledButton>
      </KeybindTooltip>
      <StyledButton onClick={nextTeam}>Next Team</StyledButton>
    </ActionsContainer>
  );
}
