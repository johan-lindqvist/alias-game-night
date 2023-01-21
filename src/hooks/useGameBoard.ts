import { useContext } from 'react';

import { GameBoardContext } from '~/components/GameBoard';

export function useGameBoard() {
  const context = useContext(GameBoardContext);

  if (!context) {
    throw new Error('useGameBoard must be used as a child to GameBoardProvider');
  }

  return context;
}
