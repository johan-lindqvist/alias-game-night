import { ReactNode } from 'react';

export interface IGameContext {
  x: string;
}

export interface IGameProviderProps {
  children: ReactNode;
}