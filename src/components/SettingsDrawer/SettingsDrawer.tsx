import { useState } from 'react';
import { Settings } from '@mui/icons-material';
import { Button, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';

import { useGameContext } from '~/hooks/useGameContext';
import { useSetupContext } from '~/hooks/useSetupContext';

import { DrawerButton } from './styled';

export function SettingsDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);

  const { settings, resetPlayedWords } = useSetupContext();
  const { quitGame, restartGame } = useGameContext();

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  return (
    <>
      <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
        <List>
          {Object.entries(settings).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText primary={key} secondary={value} />
            </ListItem>
          ))}
          <ListItem>
            <Button fullWidth variant="contained" onClick={quitGame}>
              Quit game
            </Button>
          </ListItem>
          <ListItem>
            <Button fullWidth variant="outlined" onClick={resetPlayedWords}>
              Reset played words
            </Button>
          </ListItem>
          <ListItem>
            <Button fullWidth variant="outlined" onClick={restartGame}>
              Restart game
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <DrawerButton>
        <IconButton color="info" onClick={toggleDrawer}>
          <Settings />
        </IconButton>
      </DrawerButton>
    </>
  );
}
