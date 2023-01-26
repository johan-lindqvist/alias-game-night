import { IGameTeam } from '~/types';

export interface ITeamProps {
  team: IGameTeam;
}

export interface ITeamContainerProps {
  $color: string;
  $active: boolean;
}
