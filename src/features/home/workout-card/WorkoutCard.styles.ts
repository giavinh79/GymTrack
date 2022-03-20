import { createStyles } from '@mantine/core';

export const useWorkoutCardStyles = createStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '1rem 0',
    flex: '1',
    borderRadius: '22px',
    padding: '12px',
    minWidth: '12rem',
    ...(theme.colorScheme === 'dark'
      ? {
          backgroundColor: '#ffffff08',
        }
      : {
          boxShadow: '0 1px 5px #ccc',
        }),
  },
  cardInfo: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0',
    flex: '5',
    minWidth: '15rem',
    padding: '1rem',
  },
  dayAbbreviation: {
    fontWeight: '800',
    fontSize: '3rem',
    borderRadius: '10px',
    minWidth: '10rem',
    flex: '4',

    ['p']: {
      margin: 0,
    },

    ['i']: {
      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
        display: 'none',
      },
    },
  },
  detailsButton: {
    position: 'absolute',
    height: '2.5rem',
    bottom: '-2rem',
    padding: '0 3rem',
  },
  skeletonContainer: {
    width: '100%',
    marginBottom: '0.5rem',
  },
}));
