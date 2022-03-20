import { createStyles } from '@mantine/core';

export const useHeaderStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    padding: `0 ${theme.spacing.xl}px`,
    height: '60px',
    width: '100%',

    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.dark[7],
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      boxShadow: '0 1px 4px rgb(0 0 0 / 30%)',
    },
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
}));
