import { TSetupFormValuesMetaMap } from './types';

export const formValuesMetaMap: TSetupFormValuesMetaMap = {
  time: {
    label: 'Time per round',
    min: 30,
    max: 90,
    step: 10,
  },
  easyRounds: {
    label: 'Easy rounds',
    min: 0,
    max: 30,
  },
  mediumRounds: {
    label: 'Medium rounds',
    min: 0,
    max: 30,
  },
  hardRounds: {
    label: 'Hard rounds',
    min: 0,
    max: 30,
  },
  extremeRounds: {
    label: 'Extreme rounds',
    min: 0,
    max: 30,
  },
};
