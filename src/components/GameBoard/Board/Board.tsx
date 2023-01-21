import { useGameBoard } from '~/hooks/useGameBoard';

import { BoardRow } from './BoardRow';
import { PlayerPositions } from './PlayerPositions';
import { BoardContainer } from './styled';

export function Board() {
  const { board } = useGameBoard();

  return (
    <BoardContainer>
      <PlayerPositions />
      {board.map((row, index) => (
        <BoardRow key={index} row={row} />
      ))}
    </BoardContainer>
  );
}
