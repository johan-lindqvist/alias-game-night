import { ReactNode } from 'react';

export type GameState = 'setup' | 'playing';

export interface IGameData {
  word: string;
  gameState: GameState;
}

export interface IGameContext extends IGameData {
  initGameData: (data: IGameData) => void;
}

export interface IGameProviderProps {
  children: ReactNode;
}