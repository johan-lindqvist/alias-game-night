import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "consts";
import { useLocalStorage } from "hooks/useLocalStorage";
import { IGameProviderProps, TGameContext, TGameData } from './types';
import { GameState } from "types";

export const GameContext = createContext<TGameContext | null>(null);

export const GameProvider = ({ children }: IGameProviderProps) => {
  const [gameData, setGameData] = useState<TGameData>({ gameState: GameState.Setup });

  const { get, set } = useLocalStorage();

  useEffect(() => {
    const data = get<TGameData>(LOCAL_STORAGE_KEY);

    if (data) {
      setGameData(data);
    }
  }, []);

  const initGameData = (data: TGameData) => {
    setGameData(data);
    set(LOCAL_STORAGE_KEY, data);
  };

  const restartGame = () => {
    setGameData({ gameState: GameState.Setup });
  };

  const value: TGameContext = {
    ...gameData,
    restartGame,
    initGameData,
  };

  console.log(value);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
