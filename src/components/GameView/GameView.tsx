import { GameBoard } from '~/components/GameBoard';
import { SettingsDrawer } from '~/components/SettingsDrawer';

import { GameContainer } from './styled';

export function GameView() {
  return (
    <GameContainer>
      <GameBoard />
      <SettingsDrawer />
    </GameContainer>
  );
}
