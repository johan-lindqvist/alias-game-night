import { useMemo } from 'react';

import { useGameBoard } from '~/hooks/useGameBoard';

import { Cell, FinishLine, Marker, MarkerContainer, RowContainer, TeamName } from './styled';
import { ITeamRowProps } from './types';

export function TeamRow({ team, position }: ITeamRowProps) {
  const { name, color } = team;
  const { rowCells, moveTeamToPosition } = useGameBoard();

  const inGoal = position > rowCells - 1;
  const cells = useMemo(() => Array.from(Array(rowCells).keys()), [rowCells]);

  return (
    <RowContainer $color={color}>
      <TeamName>{name}</TeamName>
      {cells.map((index) => (
        <Cell key={index} onClick={() => moveTeamToPosition(index)} />
      ))}
      <FinishLine />
      <Cell onClick={() => moveTeamToPosition(rowCells + 1)} />
      <MarkerContainer $position={position} $inGoal={inGoal}>
        <Marker />
      </MarkerContainer>
    </RowContainer>
  );
}
