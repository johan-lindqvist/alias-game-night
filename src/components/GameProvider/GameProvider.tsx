import { createContext, useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_KEY } from '~/constants';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { GameState } from '~/types';

import { IGameProviderProps, TGameContext, TGameData } from './types';

export const GameContext = createContext<TGameContext | null>(null);

export function GameProvider({ children }: IGameProviderProps) {
  const [gameData, setGameData] = useState<TGameData>({ gameState: GameState.Setup });

  const { get, set } = useLocalStorage();

  useEffect(() => {
    const data = get<TGameData>(LOCAL_STORAGE_KEY);

    if (data) {
      setGameData(data);
    }
  }, [get]);

  const updateGameData = (data: TGameData) => {
    setGameData(data);
    set(LOCAL_STORAGE_KEY, data);
  };

  const initGameData = (data: TGameData) => {
    updateGameData(data);
  };

  const restartGame = () => {
    updateGameData({ gameState: GameState.Setup });
  };

  const value: TGameContext = useMemo(
    () => ({
      ...gameData,
      restartGame,
      initGameData,
    }),
    [],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
