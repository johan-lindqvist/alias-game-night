import { ChangeEvent, Fragment, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useGameContext } from "../../hooks/useGameContext";
import { ISetupDialogProps } from "./types";

export const SetupDialog = ({ children }: ISetupDialogProps) => {
  const [word, setWord] = useState('');
  const { gameState, initGameData } = useGameContext();

  const handleChangeWord = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleCompleteSetup = () => {
    initGameData({
      gameState: 'playing',
      word: word,
    });
  };

  if (gameState === 'playing') {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Dialog open={true}>
      <DialogTitle>Title</DialogTitle>
      <DialogContent>
        <TextField value={word} onChange={handleChangeWord} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCompleteSetup}>Start</Button>
      </DialogActions>
    </Dialog>
  );
};
