import { GameBoard } from '~/components/GameBoard';
import { useGameContext } from '~/hooks/useGameContext';

export function GameView() {
  const { quitGame } = useGameContext();

  return (
    <div>
      <h1>Alias</h1>
      <button type="button" onClick={quitGame}>
        Quit
      </button>
      <GameBoard />
    </div>
  );
}
