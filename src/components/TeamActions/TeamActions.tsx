import { useGameContext } from '~/hooks/useGameContext';

import { ActionsContainer, StyledButton } from './styled';

export function TeamActions() {
  const { activeWord, nextWord, correctGuess, nextTeam } = useGameContext();
  const disabled = !activeWord;

  return (
    <ActionsContainer>
      <StyledButton disabled={disabled} onClick={correctGuess}>
        Correct Guess
      </StyledButton>
      <StyledButton disabled={disabled} onClick={nextWord}>
        Skip Word
      </StyledButton>
      <StyledButton onClick={nextTeam}>Next Team</StyledButton>
    </ActionsContainer>
  );
}
