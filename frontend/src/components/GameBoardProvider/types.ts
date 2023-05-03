import { ReactNode } from 'react';

export type TTeamPositions = Record<string, number>;

export interface IGameBoardContext {
  rowCells: number;
  teamPositions: TTeamPositions;
  moveTeamToPosition: (position: number) => void;
}

export interface IGameBoardProviderProps {
  children: ReactNode;
}
