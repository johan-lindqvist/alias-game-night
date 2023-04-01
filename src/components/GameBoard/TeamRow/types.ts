import { IGameTeam } from '~/types';

export interface ITeamRowProps {
  team: IGameTeam;
  position: number;
}

export interface IRowContainerProps {
  $color: string;
}

export interface IMarkerContainerProps {
  $position: number;
  $inGoal: boolean;
}
