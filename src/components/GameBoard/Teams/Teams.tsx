import { useGameBoard } from '~/hooks/useGameBoard';

import { Button, Container, Item, ItemDot, ItemText } from './styled';

export function Teams() {
  const { players, activePlayerId, isPlayerMoving, nextPlayer } = useGameBoard();

  const handleClick = () => {
    if (!isPlayerMoving) {
      nextPlayer();
    }
  };

  return (
    <Container>
      {players.map(({ id, name, color }) => (
        <Item key={id} $color={color} $active={id === activePlayerId}>
          <ItemDot />
          <ItemText>{name}</ItemText>
        </Item>
      ))}
      <Button onClick={handleClick}>Next Player</Button>
    </Container>
  );
}
