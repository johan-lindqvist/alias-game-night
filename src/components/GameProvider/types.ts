import { ReactNode } from 'react';
import { GameState, IGameDictionary, IGameSettings, TGameTeams } from 'types';

interface IGameDataSetup {
  gameState: GameState.Setup;
}

interface IGameDataPlaying {
  gameState: GameState.Playing;
  dictionary: IGameDictionary;
  settings: IGameSettings;
  teams: TGameTeams;
}

export type TGameData = IGameDataSetup | IGameDataPlaying;

export type TGameContext = TGameData & {
  initGameData: (data: TGameData) => void;
};

export interface IGameProviderProps {
  children: ReactNode;
}