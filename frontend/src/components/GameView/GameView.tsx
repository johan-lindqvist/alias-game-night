import { ActiveWord } from '~/components/ActiveWord';
import { GameBoard } from '~/components/GameBoard';
import { SettingsDrawer } from '~/components/SettingsDrawer';
import { Stopwatch } from '~/components/Stopwatch';
import { TeamActions } from '~/components/TeamActions';
import { Teams } from '~/components/Teams';

import { Actions, Cell, Divider, GameContainer } from './styled';

export function GameView() {
  return (
    <GameContainer>
      <Cell>
        <Actions>
          <Stopwatch />
          <Divider />
          <ActiveWord />
          <Divider />
          <TeamActions />
        </Actions>
      </Cell>
      <Cell>
        <GameBoard />
      </Cell>
      <Cell>
        <Teams />
      </Cell>
      <SettingsDrawer />
    </GameContainer>
  );
}
