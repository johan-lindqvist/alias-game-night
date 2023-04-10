import { useGameContext } from '~/hooks/useGameContext';

import { ActionsContainer, StyledButton } from './styled';

export function TeamActions() {
  const { nextWord, correctGuess, nextTeam } = useGameContext();

  return (
    <ActionsContainer>
      <StyledButton onClick={correctGuess}>Correct Guess</StyledButton>
      <StyledButton onClick={nextWord}>Skip Word</StyledButton>
      <StyledButton onClick={nextTeam}>Next Team</StyledButton>
    </ActionsContainer>
  );
}
