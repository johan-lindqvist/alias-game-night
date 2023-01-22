import { ReactNode } from 'react';

import { IGameDictionary, IGameSettings, TGameTeams } from '~/types';

type IGameOptions = {
  teams: TGameTeams;
  settings: IGameSettings;
  dictionary: IGameDictionary;
};

export interface IGameContext extends IGameOptions {
  quitGame: () => void;
}

export interface IGameProviderProps {
  children: ReactNode;
  options: IGameOptions;
}
