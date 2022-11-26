import { ISetupTeam, ISetupTeamMember } from "components/SetupDialog/types";

export interface ITeamProps {
  team: ISetupTeam;
  onAddTeamMember: (member: ISetupTeamMember) => void;
  onRemoveTeam: () => void;
  onRemoveTeamMember: (memberId: string) => void;
}