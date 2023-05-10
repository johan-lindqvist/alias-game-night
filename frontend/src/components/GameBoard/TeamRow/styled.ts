import styled, { css } from 'styled-components';

import { CELL_SIZE, FINISH_LINE_WIDTH, TEAM_NAME_WIDTH } from '../constants';

import { IMarkerContainerProps, IRowContainerProps } from './types';

export const TeamName = styled.div`
  height: ${CELL_SIZE}px;
  width: ${TEAM_NAME_WIDTH}px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-weight: bold;
  text-shadow: black 0px 1px 1px;
`;

export const Cell = styled.div`
  height: ${CELL_SIZE}px;
  width: ${CELL_SIZE}px;
  border: 1px solid black;
`;

export const FinishLine = styled.div`
  width: ${FINISH_LINE_WIDTH}px;
  height: ${CELL_SIZE}px;
  background-color: white;
`;

const getPosition = ({ $position, $inGoal }: IMarkerContainerProps) => {
  if ($inGoal) {
    return css`
      right: 0px;
      transform: unset;
    `;
  }

  return css`
    transform: translateX(${$position * CELL_SIZE}px);
  `;
};

export const MarkerContainer = styled.div<IMarkerContainerProps>`
  position: absolute;
  margin-left: ${TEAM_NAME_WIDTH}px;
  height: ${CELL_SIZE}px;
  width: ${CELL_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $position, $inGoal }) => getPosition({ $position, $inGoal })};
`;

export const Marker = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 2px;
`;

export const RowContainer = styled.div<IRowContainerProps>`
  position: relative;
  display: flex;

  ${TeamName} {
    background-color: ${({ $color }) => $color};
  }

  ${Marker} {
    background-color: ${({ $color }) => $color};
  }
`;
