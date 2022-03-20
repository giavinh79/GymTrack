import { createStyles, useMantineColorScheme } from '@mantine/core';
import { Calendar } from '@mantine/dates';

import { isSameDay } from 'src/utils';

const useActivityCalendarStyles = createStyles((theme) => ({
  root: {
    zIndex: 1,
    ...(theme.colorScheme === 'dark'
      ? {
          border: 'transparent',
          boxShadow: 'rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px',
          backgroundColor: theme.colors.dark[6],
        }
      : {
          backgroundColor: 'white',
          border: '1px solid #ccc',
          boxShadow: '0 1px 5px #ccc',
        }),
  },
}));

export const ActivityCalendar = () => {
  const { colorScheme } = useMantineColorScheme();
  const { classes } = useActivityCalendarStyles();

  const getDayStyle = (date: Date) => {
    if (isSameDay(date, new Date())) {
      return { backgroundColor: colorScheme === 'dark' ? '#323034' : '#f6eeff' };
    }

    return {};
  };

  return <Calendar size='md' className={classes.root} dayStyle={getDayStyle} fullWidth />;
};
