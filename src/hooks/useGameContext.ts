import { useContext } from "react";
import { GameContext } from "components/GameProvider";

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used as a child to GameProvider');
  }

  return context;
};
