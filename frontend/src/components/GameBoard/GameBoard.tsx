import { useGameBoard } from '~/hooks/useGameBoard';
import { useGameContext } from '~/hooks/useGameContext';

import { DifficultyMarkers } from './DifficultyMarkers';
import { BoardContainer } from './styled';
import { TeamRow } from './TeamRow';

export function GameBoard() {
  const { teamPositions } = useGameBoard();
  const { teams } = useGameContext();

  return (
    <BoardContainer>
      <DifficultyMarkers />
      {Object.values(teams).map((team) => (
        <TeamRow key={team.id} team={team} position={teamPositions[team.id]} />
      ))}
    </BoardContainer>
  );
}
