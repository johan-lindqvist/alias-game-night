import { GameBoard } from '~/components/GameBoard';
import { SettingsDrawer } from '~/components/SettingsDrawer';
import { useGameContext } from '~/hooks/useGameContext';

import { GameContainer } from './styled';

export function GameView() {
  const { quitGame } = useGameContext();

  return (
    <GameContainer>
      <h1>Alias</h1>
      <button type="button" onClick={quitGame}>
        Quit
      </button>
      <GameBoard />
      <SettingsDrawer />
    </GameContainer>
  );
}
