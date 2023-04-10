import { IGameSettings, IWords, TGameTeams } from '~/types';
import { TeamGenerator } from '~/utils';

const team1 = TeamGenerator.generateTeam();
const team2 = TeamGenerator.generateTeam();

export const INITIAL_TEAMS: TGameTeams = { [team1.id]: team1, [team2.id]: team2 };

export const INITIAL_SETTINGS: IGameSettings = {
  time: 60,
  easyRounds: 5,
  mediumRounds: 5,
  hardRounds: 5,
  extremeRounds: 5,
};

export const INITIAL_PLAYED_WORDS: IWords = {
  easy: [],
  medium: [],
  hard: [],
  extreme: [],
};
