import { List, Typography } from '@mui/material';

import { useGameContext } from '~/hooks/useGameContext';

import { Player } from './Player';
import { TeamColor, TeamContainer } from './styled';
import { ITeamProps } from './types';

export function Team({ team }: ITeamProps) {
  const { id, name, color, players } = team;
  const { activeTeamId } = useGameContext();

  return (
    <TeamContainer $color={color} $active={id === activeTeamId}>
      <TeamColor />
      <Typography variant="h6">{name}</Typography>
      <div>
        <List>
          {players.map((player) => (
            <Player key={player.id} player={player} />
          ))}
        </List>
      </div>
    </TeamContainer>
  );
}
