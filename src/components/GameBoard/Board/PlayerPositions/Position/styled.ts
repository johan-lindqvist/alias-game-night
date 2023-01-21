import styled, { css } from 'styled-components';

import { TPlayerPosition } from '~/components/GameBoard/types';

const MARGIN = 5;
const SIZE = 40;
const GAP = 10;

const getTransformFromPosition = (position: TPlayerPosition) => {
  const { row, cell } = position;

  const top = row * (SIZE + GAP);
  const left = cell * (SIZE + GAP);

  return css`
    transform: ${`translate(${left}px, ${top}px)`};
  `;
};

const getRotation = (position: TPlayerPosition) => {
  const { place, siblings } = position;

  if (siblings === 0) {
    return css``;
  }

  const degrees = 360 / (siblings + 1);
  const index = place + 1;

  return css`
    transform: rotateZ(calc(${degrees}deg * ${index}));
  `;
};

const getDotPosition = ({ siblings }: TPlayerPosition) => {
  const getDistancePercentage = () => {
    switch (siblings) {
      case 0:
        return 200;
      default:
        return 200 + siblings * 30;
    }
  };

  return css`
    transform: translate(-3px, ${getDistancePercentage()}%);
  `;
};

export const PositionContainer = styled.div<{ $position: TPlayerPosition }>`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  width: ${SIZE}px;
  height: ${SIZE}px;
  margin: ${MARGIN}px;
  display: flex;
  justify-content: center;
  transition: transform 200ms ease;

  ${({ $position }) => getTransformFromPosition($position)};
`;

export const Line = styled.div<{ $position: TPlayerPosition }>`
  position: absolute;
  left: calc(50% - 1px);
  width: 2px;
  height: 50%;
  transform-origin: bottom center;
  transition: transform 200ms ease;

  ${({ $position }) => getRotation($position)};
`;

export const Dot = styled.div<{ $color: string; $position: TPlayerPosition }>`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${({ $color }) => $color};

  ${({ $position }) => getDotPosition($position)};
`;
