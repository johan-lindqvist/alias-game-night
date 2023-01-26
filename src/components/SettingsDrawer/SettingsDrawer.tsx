import { Fragment, useState } from 'react';
import { Settings } from '@mui/icons-material';
import { Button, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';

import { useGameContext } from '~/hooks/useGameContext';
import { useSetupContext } from '~/hooks/useSetupContext';

import { DrawerButton } from './styled';

export function SettingsDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);

  const { settings } = useSetupContext();
  const { quitGame } = useGameContext();

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
