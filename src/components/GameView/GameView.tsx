import { GameBoard } from '~/components/GameBoard';
import { SettingsDrawer } from '~/components/SettingsDrawer';
import { Stopwatch } from '~/components/Stopwatch';
import { Teams } from '~/components/Teams';
import { WordActions } from '~/components/WordActions';

import { Cell, GameContainer } from './styled';

export function GameView() {
  return (
    <GameContainer>
      <Cell>
        <Stopwatch />
        <WordActions />
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
