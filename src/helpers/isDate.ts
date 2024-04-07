import { isValid } from 'date-fns';

export const isDate = (value: number) => {
  if (!value) return false;

  return isValid(new Date(value));
}
