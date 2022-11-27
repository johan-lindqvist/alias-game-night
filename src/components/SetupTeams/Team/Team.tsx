import { ChangeEvent, Fragment, useState } from "react";
import { Avatar, Card, IconButton, Typography, Divider, TextField, useTheme } from "@mui/material";
import { ClearRounded } from '@mui/icons-material';
import { createTeamPlayer } from "utils";
import { CardHeader, CardContent, StyledCardTitle, ContentRow } from "./styled";
import { ITeamProps } from "./types";

export const Team = ({ team, onAddTeamPlayer, onRemoveTeam, onRemoveTeamPlayer }: ITeamProps) => {
  const { id, color, name, players } = team;
  const [newPlayerName, setNewPlayerName] = useState('');
  const theme = useTheme();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPlayerName(event.target.value);
  };

  const handleNameBlur = () => {
    const trimmedName = newPlayerName.trim();

    if (trimmedName.length > 1) {
      const newTeamPlayer = createTeamPlayer(trimmedName);

      onAddTeamPlayer(newTeamPlayer);
    }

    setNewPlayerName('');
  }

  const handleRemoveTeam = () => {
    onRemoveTeam(id);
  }

  return (
    <Card sx={{  margin: 1, width: theme.custom.teamsCard.width }}>
      <CardHeader>
        <Avatar sx={{ background: color }}>{name[0]}</Avatar>
        <StyledCardTitle>{name}</StyledCardTitle>
        <IconButton onClick={handleRemoveTeam}>
          <ClearRounded />
        </IconButton>
      </CardHeader>
      <CardContent>
        {players.map((player) => (
          <Fragment key={player.id}>
            <Divider />
            <ContentRow>
              <Typography>{player.name}</Typography>
              <IconButton onClick={() => onRemoveTeamPlayer(player.id)}>
                <ClearRounded />
              </IconButton>
            </ContentRow>
          </Fragment>
        ))}
        <Divider />
        <ContentRow>
          <TextField placeholder="Enter player name" value={newPlayerName} size="small" onChange={handleNameChange} onBlur={handleNameBlur} />
        </ContentRow>
      </CardContent>
    </Card>
  )
}