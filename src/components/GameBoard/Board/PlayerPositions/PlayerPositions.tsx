import { Fragment } from 'react';

import { useGameBoard } from '~/hooks/useGameBoard';

import { Position } from './Position';

export function PlayerPositions() {
  const { players } = useGameBoard();

  return (
    <>
      {players.map((player) => (
        <Position key={player.id} {...player} />
      ))}
    </>
  );
}
