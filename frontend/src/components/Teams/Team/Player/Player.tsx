import { Mic } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { useGameContext } from '~/hooks/useGameContext';

import { IPlayerProps } from './types';

export function Player({ player }: IPlayerProps) {
  const { id, name } = player;
  const { activePlayerId } = useGameContext();
  const active = id === activePlayerId;

  return (
    <ListItem disablePadding>
      <ListItemText
        primary={name}
        primaryTypographyProps={active ? { fontWeight: 'bold' } : undefined}
        secondary={active && 'Speaker'}
      />
      {active && (
        <ListItemIcon>
          <Mic />
        </ListItemIcon>
      )}
    </ListItem>
  );
}
