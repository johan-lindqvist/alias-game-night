import { IGameSettings } from '~/types';

export type TSetupFormValuesMetaMap = Record<
  keyof IGameSettings,
  {
    label: string;
    min: number;
    max: number;
    step?: number;
  }
>;
