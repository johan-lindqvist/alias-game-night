import { ReactNode } from "react";

export interface ISetupDialogProps {
  children: ReactNode;
}

export interface ISetupFormValues {
  time: number;
  easyRounds: number;
  mediumRounds: number;
  hardRounds: number;
  veryHardRounds: number;
}

export type TSetupFormValuesMetaMap = Record<keyof ISetupFormValues, {
  label: string;
  min: number;
  max: number;
  step?: number;
}>;

export interface ISetupTeamMember {
  id: string;
  name: string;
}

export interface ISetupTeam {
  id: string;
  name: string;
  color: string;
  members: ISetupTeamMember[];
}

export type ISetupTeams = Record<string, ISetupTeam>;
