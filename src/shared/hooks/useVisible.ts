import { useEffect, useState } from 'react';

interface IUseVisibleInput {
  ref: React.MutableRefObject<null>;
  rootMargin: string;
}

/**
 * Custom hook for conditionally showing an HTML element depending on where it is in the view
 */
export const useVisible = ({ ref, rootMargin = '0px' }: IUseVisibleInput): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const refValue = ref.current;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin });
    observer.observe(refValue);

    return () => {
      if (refValue) {
        observer.unobserve(refValue);
      }
    };
  }, [ref, rootMargin]);

  return isVisible;
};
