import { createStyles } from '@mantine/core';

export const useLoginModalStyles = createStyles((theme) => ({
  header: {
    fontSize: '2.5rem',
  },
  userIcon: {
    fontSize: '3rem',
  },
  keyIcon: {
    color: theme.colors.red[9],
  },
}));
