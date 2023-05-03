import { IWords } from '~/types';

export const getEmptyWords = (): IWords => ({
  easy: [],
  medium: [],
  hard: [],
  extreme: [],
});
