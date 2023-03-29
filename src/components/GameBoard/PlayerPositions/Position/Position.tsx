import { useGameBoard } from '~/hooks/useGameBoard';

import { Dot, Line, PositionContainer } from './styled';
import { IPositionProps } from './types';

export function Position({ id, color }: IPositionProps) {
  const { getPlayerPosition } = useGameBoard();

  const position = getPlayerPosition(id);

  return (
    <PositionContainer $position={position}>
      <Line $position={position}>
        <Dot $position={position} $color={color} />
      </Line>
    </PositionContainer>
  );
}
