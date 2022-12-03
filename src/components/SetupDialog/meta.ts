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
    min: 1,
    max: 10,
  },
  mediumRounds: {
    label: 'Medium rounds',
    min: 1,
    max: 10,
  },
  hardRounds: {
    label: 'Hard rounds',
    min: 1,
    max: 10,
  },
  veryHardRounds: {
    label: 'Very hard rounds',
    min: 1,
    max: 10,
  },
};
