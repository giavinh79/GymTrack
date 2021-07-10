import { isNil, get, pick, omit } from 'lodash';

const exists = <T>(value: T | null | undefined): value is T => {
  return !isNil(value);
};

export {
  isNil,
  exists,
  get,
  omit,
  pick
};
