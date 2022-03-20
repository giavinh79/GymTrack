import { memo, ReactElement } from 'react';
import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

interface ScrollToTopProps {
  pxToDisplayAt?: number;
}

export const ScrollToTopComponent = ({ pxToDisplayAt = 600 }: ScrollToTopProps): ReactElement => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }} aria-hidden='true'>
      <Transition transition='slide-up' mounted={scroll.y > pxToDisplayAt}>
        {(transitionStyles) => (
          <Button style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
            <i className='fas fa-arrow-up' />
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export const ScrollToTop = memo(ScrollToTopComponent);
