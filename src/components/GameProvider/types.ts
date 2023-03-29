import { ReactNode } from 'react';

import { EDictionaryTypes, IGameDictionary, IGameSettings, TGameTeams } from '~/types';

type IGameOptions = {
  teams: TGameTeams;
  settings: IGameSettings;
  dictionary: IGameDictionary;
};

interface IGameContextTeam {
  score: number;
  teamId: string;
  activePlayerIndex: number;
  isActive: boolean;
}

export type TTeamsState = Record<string, IGameContextTeam>;

export type TWordsState = {
  active: string;
  type: EDictionaryTypes;
  played: Record<EDictionaryTypes, string[]>;
  remaining: Record<EDictionaryTypes, string[]>;
};

export interface IGameContext extends IGameOptions {
  activeWord: string;
  activeTeam: IGameContextTeam;
  activeTeamId: string;
  activePlayerId: string;
  quitGame: () => void;
  nextTeam: () => void;
  nextWord: () => void;
  correctGuess: () => void;
  setTeamScore: (id: string, score: number) => void;
}

export interface IGameProviderProps {
  children: ReactNode;
  options: IGameOptions;
}
