import { createContext } from "react";
import { IGameContext, IGameProviderProps } from './types';

export const GameContext = createContext<IGameContext | null>(null);

export const GameProvider = ({ children }: IGameProviderProps) => {
  const value = { x: '' };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
