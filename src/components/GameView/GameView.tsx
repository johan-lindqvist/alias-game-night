import { useGameContext } from "hooks/useGameContext";

export const GameView = () => {
  const { restartGame } = useGameContext();

  return (
    <div>
      <h1>Alias</h1>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
};
