import { useGameContext } from "hooks/useGameContext";

export const GameView = () => {
  const { restartGame, ...rest } = useGameContext();

  console.log({ rest });

  return (
    <div>
      <h1>Alias</h1>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
};
