import { Fragment, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Slider } from "components/Slider";
import { UploadGameDictionaryButton, IGameDictionary } from "components/UploadGameDictionaryButton";
import { useGameContext } from "hooks/useGameContext";
import { ISetupDialogProps, ISetupFormValues, ISetupTeam, ISetupTeams, ISetupTeamMember } from "./types";
import { formValuesMetaMap } from "./meta";
import { createTeam } from "./utilts";
import { SetupTeams } from "components/SetupTeams";

const team1 = createTeam('pepega', 'red');
const team2 = createTeam('omegalul', 'blue');

export const SetupDialog = ({ children }: ISetupDialogProps) => {
  const { gameState, initGameData } = useGameContext();
  const [gameDictionary, setGameDictionary] = useState<IGameDictionary | null>(null)
  const [formValues, setFormValues] = useState<ISetupFormValues>({
    time: 60,
    easyRounds: 5,
    mediumRounds: 5,
    hardRounds: 5,
    veryHardRounds: 5,
  });
  const [teams, setTeams] = useState<ISetupTeams>({
    [team1.id]: team1,
    [team2.id]: team2,
  });

  const submitDisabled = !gameDictionary;

  const handleAddTeam = (team: ISetupTeam) => {
    setTeams({ ...teams, [team.id]: team });
  };

  const handleAddTeamMember = (teamId: string, member: ISetupTeamMember) => {
    const team = teams[teamId];

    setTeams({
      ...teams,
      [team.id]: {
        ...team,
        members: [...team.members, member]
      }
    })
  }

  const handleRemoveTeam = (id: string) => {
    const { [id]: removedTeam, ...restTeams } = teams;

    setTeams(restTeams);
  };

  const handleRemoveTeamMember = (teamId: string, memberId: string) => {
    const team = teams[teamId];

    setTeams({
      ...teams,
      [team.id]: {
        ...team,
        members: team.members.filter((member) => member.id !== memberId)
      }
    });
  };

  const handleFileUpload = (gd: IGameDictionary) => {
    setGameDictionary(gd);
  };

  const handleChangeFormValue = (key: keyof ISetupFormValues, value: number) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleCompleteSetup = () => {
    console.log(gameDictionary);
    console.log(formValues);
    console.log(Object.values(teams));
    // initGameData({
    //   gameState: 'playing',
    //   word: 'Hejsan',
    // });
  };

  if (gameState === 'playing') {
    return <Fragment>{children}</Fragment>;
  }

  const formEntries = Object.entries(formValues) as [keyof ISetupFormValues, number][];

  return (
    <Dialog fullWidth open={true}>
      <DialogTitle>Title</DialogTitle>
      <DialogContent>
        <SetupTeams
          teams={teams}
          onAddTeam={handleAddTeam}
          onAddTeamMember={handleAddTeamMember}
          onRemoveTeam={handleRemoveTeam}
          onRemoveTeamMember={handleRemoveTeamMember}
        />
        <UploadGameDictionaryButton onFileUpload={handleFileUpload} />
        {formEntries.map(([key, value]) => (
          <Slider key={key} value={value} {...formValuesMetaMap[key]} onChange={(value) => handleChangeFormValue(key, value)} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="primary" disabled={submitDisabled} onClick={handleCompleteSetup}>Start</Button>
      </DialogActions>
    </Dialog>
  );
};
