import { ISetupTeam, ISetupTeams, ISetupTeamMember } from "components/SetupDialog/types";

export interface ISetupTeamsProps {
  teams: ISetupTeams;
  onAddTeam: (team: ISetupTeam) => void;
  onAddTeamMember: (teamId: string, member: ISetupTeamMember) => void;
  onRemoveTeam: (teamId: string) => void;
  onRemoveTeamMember: (teamId: string, memberId: string) => void;
}