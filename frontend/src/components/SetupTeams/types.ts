import { IGamePlayer, IGameTeam, TGameTeams } from '~/types';

export interface ISetupTeamsProps {
  teams: TGameTeams;
  onAddTeam: (team: IGameTeam) => void;
  onAddTeamPlayer: (teamId: string, player: IGamePlayer) => void;
  onRemoveTeam: (teamId: string) => void;
  onRemoveTeamPlayer: (teamId: string, playerId: string) => void;
}
