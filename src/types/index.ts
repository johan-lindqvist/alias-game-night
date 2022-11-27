export enum GameState {
  Playing,
  Setup
}

export interface IGameDictionary {
  easy: string[];
  medium: string[];
  hard: string[];
  veryhard: string[];
}

export interface IGameSettings {
  time: number;
  easyRounds: number;
  mediumRounds: number;
  hardRounds: number;
  veryHardRounds: number;
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