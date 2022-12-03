import { useGameContext } from '~/hooks/useGameContext';

export function GameView() {
  const { restartGame } = useGameContext();

  return (
    <div>
      <h1>Alias</h1>
      <button type="button" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}
