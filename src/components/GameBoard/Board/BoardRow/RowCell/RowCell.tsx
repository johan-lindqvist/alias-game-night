import { useGameBoard } from '~/hooks/useGameBoard';

import { Cell } from './styled';
import { IRowCellProps } from './types';

export function RowCell({ step }: IRowCellProps) {
  const { movePlayer } = useGameBoard();

  if (step === 0) {
    return <Cell />;
  }

  return <Cell onClick={() => movePlayer(step)}>{step}</Cell>;
}
