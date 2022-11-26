import { ISetupTeamMember } from "components/SetupDialog/types";
import { createTeam } from "components/SetupDialog/utilts";
import { Team } from "./Team";
import { ISetupTeamsProps } from "./types";

export const SetupTeams = ({ teams, onAddTeam, onAddTeamMember, onRemoveTeam, onRemoveTeamMember }: ISetupTeamsProps) => {
  const handleAddTeam = () => {
    const newTeam = createTeam('kekw', 'orange');

    onAddTeam(newTeam);
  };

  return (
    <div>
      <h3>Teams</h3>
      <button onClick={handleAddTeam}>Add team</button>
      {Object.values(teams).map((team) => (
        <Team
          key={team.id}
          team={team}
          onAddTeamMember={(member) => onAddTeamMember(team.id, member)}
          onRemoveTeam={() => onRemoveTeam(team.id)}
          onRemoveTeamMember={(memberId) => onRemoveTeamMember(team.id, memberId)}
        />
      ))}
    </div>
  )
};
