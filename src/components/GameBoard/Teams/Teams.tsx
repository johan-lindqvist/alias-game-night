import { useGameBoard } from '~/hooks/useGameBoard';
import { useGameContext } from '~/hooks/useGameContext';

import { Button, Container } from './styled';

export function Teams() {
  const { isPlayerMoving } = useGameBoard();
  const { nextTeam } = useGameContext();

  const handleClick = () => {
    if (!isPlayerMoving) {
      nextTeam();
    }
  };

  return (
    <Container>
      <Button onClick={handleClick}>Next Player</Button>
    </Container>
  );
}
