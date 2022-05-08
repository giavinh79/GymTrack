import { createStyles } from '@mantine/core';

export const useRoutinePanelStyles = createStyles((theme) => ({
  container: {
    margin: '1.5rem 0',
  },
  routineControlsWrapper: {
    color: '#666',
    fontWeight: 800,
    fontSize: '1.7rem',
    marginBottom: '0.5rem',
  },
  changeRoutineButton: {
    fontSize: '1.7rem',
    fontWeight: 'bolder',
    marginRight: '0.5rem',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.gray[7],
  },
}));
