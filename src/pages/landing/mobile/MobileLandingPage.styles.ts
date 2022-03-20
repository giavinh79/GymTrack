import { createStyles } from '@mantine/core';

export const useMobileLandingPageStyles = createStyles((theme) => ({
  container: {
    display: 'none',
    width: '100%',
    maxWidth: '80rem',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: 'block',
    },
  },
  body: {
    width: '100%',
    backgroundColor: '#212121',
  },
  fitnessBackground: {
    backgroundColor: 'white',
    height: '24rem',
    padding: '1.5rem',
    width: '100%',
  },
  content: {
    padding: '2.5rem',
    minWidth: '100%',
    color: theme.colors.violet[0],
  },
  header: {
    fontSize: '2rem',
    margin: '1rem',
  },
  headerPrefix: {
    color: theme.colors.cyan[2],
  },
}));
