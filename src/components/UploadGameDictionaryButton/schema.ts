import { array, object, string } from 'yup';

export const schema = object({
  easy: array().of(string()),
  medium: array().of(string()),
  hard: array().of(string()),
  veryhard: array().of(string()),
});
