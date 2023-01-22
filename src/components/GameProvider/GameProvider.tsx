import { createContext } from 'react';

import { useSetupContext } from '~/hooks/useSetupContext';

import { IGameContext, IGameProviderProps } from './types';

export const GameContext = createContext<IGameContext | null>(null);

export function GameProvider({ children, options }: IGameProviderProps) {
  const { initializeSetup } = useSetupContext();

  const quitGame = () => {
    initializeSetup();
  };

  const value: IGameContext = { ...options, quitGame };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
