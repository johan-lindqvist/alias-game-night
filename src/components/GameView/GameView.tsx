import { GameBoard } from '~/components/GameBoard';
import { SettingsDrawer } from '~/components/SettingsDrawer';
import { Stopwatch } from '~/components/Stopwatch';
import { Teams } from '~/components/Teams';
import { WordActions } from '~/components/WordActions';

import { GameCellBottom, GameCellLeft, GameCellRight, GameContainer } from './styled';

export function GameView() {
  return (
    <GameContainer>
      <GameCellLeft>
        <GameBoard />
      </GameCellLeft>
      <GameCellRight>
        <Stopwatch />
        <WordActions />
      </GameCellRight>
      <GameCellBottom>
        <Teams />
      </GameCellBottom>
      <SettingsDrawer />
    </GameContainer>
  );
}
