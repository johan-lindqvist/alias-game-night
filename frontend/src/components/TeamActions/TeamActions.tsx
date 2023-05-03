import { KeybindTooltip } from '~/components/KeybindTooltip';
import { Keybinds } from '~/constants';
import { useGameContext } from '~/hooks/useGameContext';
import { useKeybinds } from '~/hooks/useKeybinds';

import { ActionsContainer, StyledButton } from './styled';

export function TeamActions() {
  const { activeWord, nextWord, correctGuess, nextTeam } = useGameContext();
  const disabled = !activeWord;

  const onCorrectGuessKeybind = () => {
    if (!disabled) {
      correctGuess();
    }
  };

  const onSkipWordKeybind = () => {
    if (!disabled) {
      nextWord();
    }
  };

  useKeybinds({
    [Keybinds.CorrectGuess]: onCorrectGuessKeybind,
    [Keybinds.SkipWord]: onSkipWordKeybind,
  });

  return (
    <ActionsContainer>
      <KeybindTooltip title="C">
        <StyledButton disabled={disabled} onClick={correctGuess}>
          Correct Guess
        </StyledButton>
      </KeybindTooltip>
      <KeybindTooltip title="S">
        <StyledButton disabled={disabled} onClick={nextWord}>
          Skip Word
        </StyledButton>
      </KeybindTooltip>
      <StyledButton onClick={nextTeam}>Next Team</StyledButton>
    </ActionsContainer>
  );
}
