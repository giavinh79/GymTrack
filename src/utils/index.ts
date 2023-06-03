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
    dayOne.getUTCFullYear() === dayTwo.getUTCFullYear() &&
    dayOne.getUTCMonth() === dayTwo.getUTCMonth() &&
    dayOne.getUTCDate() === dayTwo.getUTCDate()
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

export { isSameDay, lazyImport, lazyLoadCss, reorderList };
