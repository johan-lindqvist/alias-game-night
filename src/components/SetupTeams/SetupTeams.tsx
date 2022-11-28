import { AddRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { TeamGenerator } from "utils";
import { AddTeamButton, TeamsContainer } from "./styled";
import { Team } from "./Team";
import { ISetupTeamsProps } from "./types";

export const SetupTeams = ({ teams, onAddTeam, onAddTeamPlayer, onRemoveTeam, onRemoveTeamPlayer }: ISetupTeamsProps) => {
  const teamsArr = Object.values(teams);
  const isTeamsFull = teamsArr.length >= 6;

  const handleAddTeam = () => {
    if (!isTeamsFull) { 
      onAddTeam(TeamGenerator.generateTeam());
    }
  };

  return (
    <TeamsContainer>
      {teamsArr.map((team) => (
        <Team
          key={team.id}
          team={team}
          onRemoveTeam={onRemoveTeam}
          onAddTeamPlayer={(player) => onAddTeamPlayer(team.id, player)}
          onRemoveTeamPlayer={(playerId) => onRemoveTeamPlayer(team.id, playerId)}
        />
      ))}
      {!isTeamsFull && (
        <AddTeamButton onClick={handleAddTeam}>
          <AddRounded />
          <Typography>Add team</Typography>
        </AddTeamButton>
      )}
    </TeamsContainer>
  )
};
