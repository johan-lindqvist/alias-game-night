import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GameState, IGameContext, IGameData, IGameProviderProps } from './types';

export const GameContext = createContext<IGameContext | null>(null);

export const GameProvider = ({ children }: IGameProviderProps) => {
  const [gameData, setGameData] = useState<IGameData>({
    gameState: 'setup',
    word: '',
  });

  const { get, set } = useLocalStorage();

  useEffect(() => {
    const data = get<IGameData>(LOCAL_STORAGE_KEY);

    if (data) {
      setGameData(data);
    }
  }, []);

  const initGameData = (data: IGameData) => {
    setGameData(data);
    set(LOCAL_STORAGE_KEY, data);
  };

  const value: IGameContext = {
    ...gameData,
    initGameData,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
