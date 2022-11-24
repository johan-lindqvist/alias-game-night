import { createContext } from "react";
import { IStorageContext, IStorageProviderProps } from './types';

export const StorageContext = createContext<IStorageContext | null>(null);

export const StorageProvider = ({ children }: IStorageProviderProps) => {
  const value = { gameState: 'setup' as const };

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
}
