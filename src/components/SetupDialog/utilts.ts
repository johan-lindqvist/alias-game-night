import { v4 } from 'uuid';

import { ISetupTeam, ISetupTeamMember } from "./types";

export const createTeamMember = (name: string): ISetupTeamMember => {
  return {
    id: v4(),
    name: name,
  };
};

export const createTeam = (name: string, color: string): ISetupTeam => {
  return {
    id: v4(),
    name: name,
    color: color,
    members: [],
  };
};
