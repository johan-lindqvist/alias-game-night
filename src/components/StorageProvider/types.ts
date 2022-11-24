import { ReactNode } from 'react';

export interface IStorageContext {
  gameState: 'setup' | 'playing';
}

export interface IStorageProviderProps {
  children: ReactNode;
}