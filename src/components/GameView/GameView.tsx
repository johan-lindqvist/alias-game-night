import { GameBoard } from '~/components/GameBoard';
import { SettingsDrawer } from '~/components/SettingsDrawer';
import { Teams } from '~/components/Teams';

import { GameCellBottom, GameCellLeft, GameCellRight, GameContainer } from './styled';

export function GameView() {
  return (
    <GameContainer>
      <GameCellLeft>
        <GameBoard />
      </GameCellLeft>
      <GameCellRight>B</GameCellRight>
      <GameCellBottom>
        <Teams />
      </GameCellBottom>
      <SettingsDrawer />
    </GameContainer>
  );
}
