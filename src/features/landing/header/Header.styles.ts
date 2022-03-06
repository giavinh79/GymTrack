import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.gray[0],
    height: '60px',
    width: '100%',
    padding: `0 ${theme.spacing.xl}px`,
  },
  loginButton: {
    marginLeft: 'auto',
  },
}));
