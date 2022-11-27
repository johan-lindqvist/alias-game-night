import { IGamePlayer, IGameTeam } from 'types';
import { v4 } from 'uuid';

export const createTeamPlayer = (name: string): IGamePlayer => {
  return {
    id: v4(),
    name: name,
  };
};

export const createTeam = (name: string, color: string): IGameTeam => {
  return {
    id: v4(),
    name: name,
    color: color,
    players: [],
  };
};
