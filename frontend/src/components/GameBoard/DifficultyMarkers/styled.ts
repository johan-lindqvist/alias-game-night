import styled from 'styled-components';

import { CELL_SIZE, TEAM_NAME_WIDTH } from '../constants';

import { IMarkerProps } from './types';

export const MarkersContainer = styled.div`
  margin-left: ${TEAM_NAME_WIDTH}px;
  display: flex;
`;

export const Marker = styled.div<IMarkerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${CELL_SIZE}px;
  width: ${({ $rounds }) => `calc(${CELL_SIZE}px * ${$rounds})`};
  border: 1px solid black;
  background-color: #222;
  border-radius: 4px;
`;
