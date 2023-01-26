import { ReactNode } from 'react';

import { IGameDictionary, IGameSettings, TGameTeams } from '~/types';

type IGameOptions = {
  teams: TGameTeams;
  settings: IGameSettings;
  dictionary: IGameDictionary;
};

export interface IGameState {
  teams: Record<string, { teamId: string; activePlayerIndex: number; isActive: boolean }>;
}

export interface IGameContext extends IGameOptions {
  activeTeamId: string;
  activePlayerId: string;
  quitGame: () => void;
  nextTeam: () => void;
}

export interface IGameProviderProps {
  children: ReactNode;
  options: IGameOptions;
}
