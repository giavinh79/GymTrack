import { lazy } from 'react';
import isNil from 'lodash/isNil'; // lodash is CommonJS and not tree-shakeable with regular named exports :(
import get from 'lodash/get';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

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

// dynamically load css (typically used to lazy load stylesheets)
const lazyLoadCss = (cssArray: string[]) => {
  const { head } = document;

  cssArray.forEach((css) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = css;
    head.appendChild(link);
  });
};

export { exists, get, isNil, lazyLoadCss, lazyImport, omit, pick };
