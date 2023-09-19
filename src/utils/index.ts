import { lazy } from 'react';

/**
 * named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
 * @example
 * const { HomePage } = lazyImport(() => import('src/pages'), 'HomePage');
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lazyImport = <T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I => {
  return Object.create({
    [name]: lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
};

/**
 * Dynamically load css (typically used to lazy load stylesheets)
 */
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

/**
 * Check if two dates are the same day
 */
const isSameDay = (dayOne: Date, dayTwo: Date) => {
  return (
    dayOne.getDate() === dayTwo.getDate() &&
    dayOne.getMonth() === dayTwo.getMonth() &&
    dayOne.getFullYear() === dayTwo.getFullYear()
  );
};

/**
 * Re-orders a list given the source index (item to move) and the destination index (where to move that item)
 * @returns new re-ordered list
 */
const reorderList = <T>(list: T[], sourceIndex: number, destinationIndex: number): T[] => {
  const clone = structuredClone(list) as T[];
  const item = list[sourceIndex];

  clone.splice(sourceIndex, 1);
  clone.splice(destinationIndex, 0, item);
  return clone;
};

/**
 * Invariant function that checks if value is defined, if not, throws error
 */
function assertIsDefined<T>(value: T, errorMsg: string, callback?: () => void): asserts value {
  if (value === undefined || value === null) {
    // if no callback specified (for triggering error snackbar for example), redirect user to landing
    callback ? callback() : (window.location.href = '/home');
    throw new Error(errorMsg);
  }
}

/**
 * Asserts that the condition is true, throws error if otherwise
 */
function assertCondition(condition: unknown, errorMsg?: string): asserts condition {
  if (!condition) throw new Error(errorMsg ?? 'Something went wrong, try again!');
}

export { assertCondition, assertIsDefined, isSameDay, lazyImport, lazyLoadCss, reorderList };
