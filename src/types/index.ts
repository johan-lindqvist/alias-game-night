export enum EDictionaryTypes {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Extreme = 'extreme',
}

export interface IWords {
  [EDictionaryTypes.Easy]: string[];
  [EDictionaryTypes.Medium]: string[];
  [EDictionaryTypes.Hard]: string[];
  [EDictionaryTypes.Extreme]: string[];
}

export interface IGameDictionary {
  fileName: string;
  words: IWords;
}

export interface IGameSettings {
  time: number;
  easyRounds: number;
  mediumRounds: number;
  hardRounds: number;
  extremeRounds: number;
}

export interface IGamePlayer {
  id: string;
  name: string;
}

export interface IGameTeam {
  id: string;
  name: string;
  color: string;
  players: IGamePlayer[];
}

export type TGameTeams = Record<string, IGameTeam>;
