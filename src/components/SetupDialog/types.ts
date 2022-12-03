import { ReactNode } from 'react';

import { IGameSettings } from '~/types';

export interface ISetupDialogProps {
  children: ReactNode;
}

export type TSetupFormValuesMetaMap = Record<
  keyof IGameSettings,
  {
    label: string;
    min: number;
    max: number;
    step?: number;
  }
>;
