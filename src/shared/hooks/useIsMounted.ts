import { useEffect, useRef } from 'react';

/**
 * Custom hook that determines whether or not component is unmounting
 *
 * @example
 * const isMounted = useIsMounted();
 * if (isMounted.current) // component is not unmounting
 */
export const useIsMounted = (): React.MutableRefObject<boolean> => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
};
