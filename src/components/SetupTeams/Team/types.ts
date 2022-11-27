import { IGamePlayer, IGameTeam } from "types";

export interface ITeamProps {
  team: IGameTeam;
  onAddTeamPlayer: (player: IGamePlayer) => void;
  onRemoveTeam: (teamId: string) => void;
  onRemoveTeamPlayer: (playerId: string) => void;
}