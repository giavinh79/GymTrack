import { ReactElement } from 'react';
import { createStyles } from '@mantine/core';

interface StickyFooterProps {
  children?: ReactElement | null;
}

const useStyles = createStyles(() => ({
  footer: {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',

    bottom: 0,
    left: 0,
    width: '100%',
    minHeight: '4rem',

    color: 'white',
    fontWeight: 600,
    fontSize: '0.8rem',
  },
}));

export const StickyFooter = (props: StickyFooterProps): ReactElement => {
  const { classes } = useStyles();

  return <div className={classes.footer}>{props.children}</div>;
};
