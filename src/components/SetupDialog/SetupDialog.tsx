import { useMemo, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { SetupTeams } from '~/components/SetupTeams';
import { Slider } from '~/components/Slider';
import { UploadGameDictionaryButton } from '~/components/UploadGameDictionaryButton';
import { useGameContext } from '~/hooks/useGameContext';
import { GameState, IGameDictionary, IGamePlayer, IGameSettings, IGameTeam, TGameTeams } from '~/types';
import { TeamGenerator } from '~/utils';

import { INITIAL_SETTINGS, INITIAL_TEAMS } from './constants';
import { formValuesMetaMap } from './meta';
import { ColumnLeft, ColumnMiddle, ColumnRight, Container, Title } from './styled';
import { ISetupDialogProps } from './types';

export function SetupDialog({ children }: ISetupDialogProps) {
  const { gameState, initGameData } = useGameContext();
  const [gameDictionary, setGameDictionary] = useState<IGameDictionary | null>(null);
  const [formValues, setFormValues] = useState<IGameSettings>(INITIAL_SETTINGS);
  const [teams, setTeams] = useState<TGameTeams>(INITIAL_TEAMS);

  const submitDisabled = useMemo(() => {
    const teamsArr = Object.values(teams);
    const playersInvalid = teamsArr.some((team) => team.players.length === 0);

    return !gameDictionary || teamsArr.length < 2 || playersInvalid;
  }, [gameDictionary, teams]);

  const handleAddTeam = (team: IGameTeam) => {
    setTeams({ ...teams, [team.id]: team });
  };

  const handleAddTeamPlayer = (teamId: string, player: IGamePlayer) => {
    const team = teams[teamId];

    setTeams({
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

    setTeams(restTeams);
  };

  const handleRemoveTeamPlayer = (teamId: string, playerId: string) => {
    const team = teams[teamId];

    setTeams({
      ...teams,
      [team.id]: {
        ...team,
        players: team.players.filter((player) => player.id !== playerId),
      },
    });
  };

  const handleFileUpload = (gd: IGameDictionary) => {
    setGameDictionary(gd);
  };

  const handleChangeFormValue = (key: keyof IGameSettings, value: number) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleCompleteSetup = () => {
    if (gameDictionary) {
      initGameData({
        gameState: GameState.Playing,
        dictionary: gameDictionary,
        settings: formValues,
        teams,
      });
    }
  };

  if (gameState === GameState.Playing) {
    return <>{children}</>;
  }

  const formEntries = Object.entries(formValues) as [keyof IGameSettings, number][];

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
