import { ReactNode } from 'react';

import { IGameDictionary, IGameSettings, TGameTeams } from '~/types';

export enum ESetupState {
  Setup = 'Setup',
  Complete = 'Complete',
}

export interface ISetupState {
  state: ESetupState;
  teams: TGameTeams;
  settings: IGameSettings;
  dictionary: IGameDictionary | null;
}

export type TUpdateKey = keyof Omit<ISetupState, 'state'>;
export type TUpdateValue = ISetupState[TUpdateKey];

export interface ISetupContext extends ISetupState {
  updateSetupState: (key: TUpdateKey, value: TUpdateValue) => void;
  completeSetup: () => void;
  initializeSetup: () => void;
}

export interface ISetupProviderProps {
  children: ReactNode;
}
