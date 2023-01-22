import { useMemo } from 'react';
import { Button, Typography } from '@mui/material';

import { SetupTeams } from '~/components/SetupTeams';
import { Slider } from '~/components/Slider';
import { UploadGameDictionaryButton } from '~/components/UploadGameDictionaryButton';
import { useSetupContext } from '~/hooks/useSetupContext';
import { IGameDictionary, IGamePlayer, IGameSettings, IGameTeam } from '~/types';
import { TeamGenerator } from '~/utils';

import { formValuesMetaMap } from './meta';
import { ColumnLeft, ColumnMiddle, ColumnRight, Container, Title } from './styled';

export function SetupDialog() {
  const { settings, dictionary, teams, updateSetupState, completeSetup } = useSetupContext();

  const submitDisabled = useMemo(() => {
    const teamsArr = Object.values(teams);
    const playersInvalid = teamsArr.some((team) => team.players.length === 0);

    return !dictionary || teamsArr.length < 2 || playersInvalid;
  }, [dictionary, teams]);

  const handleAddTeam = (team: IGameTeam) => {
    updateSetupState('teams', { ...teams, [team.id]: team });
  };

  const handleAddTeamPlayer = (teamId: string, player: IGamePlayer) => {
    const team = teams[teamId];

    updateSetupState('teams', {
      ...teams,
      [team.id]: {
        ...team,
        players: [...team.players, player],
      },
    });
  };

  const handleRemoveTeam = (id: string) => {
    const { [id]: removedTeam, ...restTeams } = teams;

    TeamGenerator.releaseTeam(removedTeam);

    updateSetupState('teams', restTeams);
  };

  const handleRemoveTeamPlayer = (teamId: string, playerId: string) => {
    const team = teams[teamId];

    updateSetupState('teams', {
      ...teams,
      [team.id]: {
        ...team,
        players: team.players.filter((player) => player.id !== playerId),
      },
    });
  };

  const handleFileUpload = (gd: IGameDictionary) => {
    updateSetupState('dictionary', gd);
  };

  const handleChangeFormValue = (key: keyof IGameSettings, value: number) => {
    updateSetupState('settings', { ...settings, [key]: value });
  };

  const handleCompleteSetup = () => {
    if (dictionary) {
      completeSetup();
    }
  };

  const formEntries = Object.entries(settings) as [keyof IGameSettings, number][];

  return (
    <Container>
      <ColumnLeft>
        <Title>
          <Typography variant="h5">Settings</Typography>
        </Title>
        <UploadGameDictionaryButton onFileUpload={handleFileUpload} />
        {formEntries.map(([key, value]) => (
          <Slider key={key} value={value} {...formValuesMetaMap[key]} onChange={(v) => handleChangeFormValue(key, v)} />
        ))}
      </ColumnLeft>
      <ColumnMiddle>
        <Button color="primary" variant="contained" disabled={submitDisabled} onClick={handleCompleteSetup}>
          Start
        </Button>
      </ColumnMiddle>
      <ColumnRight>
        <Title>
          <Typography variant="h5">Teams</Typography>
        </Title>
        <SetupTeams
          teams={teams}
          onAddTeam={handleAddTeam}
          onAddTeamPlayer={handleAddTeamPlayer}
          onRemoveTeam={handleRemoveTeam}
          onRemoveTeamPlayer={handleRemoveTeamPlayer}
        />
      </ColumnRight>
    </Container>
  );
}
