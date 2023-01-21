import { RowCell } from './RowCell';
import { Row } from './styled';
import { IBoardRowProps } from './types';

export function BoardRow({ row }: IBoardRowProps) {
  return (
    <Row>
      {row.map((cell, index) => (
        <RowCell key={index} step={cell} />
      ))}
    </Row>
  );
}
