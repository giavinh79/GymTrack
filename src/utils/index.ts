import { lazy } from 'react';
import { isNil, get, pick, omit } from 'lodash';

const exists = <T>(value: T | null | undefined): value is T => {
  return !isNil(value);
};

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
const lazyImport = <T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I => {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
};

export { isNil, lazyImport, exists, get, omit, pick };
