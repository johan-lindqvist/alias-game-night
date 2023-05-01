import { ReactNode } from 'react';

import { EDictionaryTypes, IGameDictionary, IGameSettings, IGameTeam, IWords, TGameTeams } from '~/types';

export enum ESetupState {
  Setup = 'Setup',
  Complete = 'Complete',
}

export interface ISetupState {
  state: ESetupState;
  teams: TGameTeams;
  settings: IGameSettings;
  dictionary: IGameDictionary | null;
  playedWords: IWords;
}

export type TUpdateKey = keyof ISetupState;
export type TUpdateValue = ISetupState[TUpdateKey];

export interface ISetupContext extends ISetupState {
  updateSetupState: (key: TUpdateKey, value: TUpdateValue) => void;
  completeSetup: () => void;
  initializeSetup: () => void;
  addPlayedWord: (type: EDictionaryTypes, word: string) => void;
  resetPlayedWords: () => void;
  generateTeam: () => IGameTeam;
  removeTeam: (team: IGameTeam) => void;
}

export interface ISetupProviderProps {
  children: ReactNode;
}
