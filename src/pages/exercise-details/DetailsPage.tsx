import { useLocation } from 'react-router';
import { Button, Container, createStyles, Divider, Group, Space, Title } from '@mantine/core';

import { AddRoutineExerciseModal } from 'src/features/details/modal/AddRoutineExerciseModal';
import { WorkoutList } from 'src/features/details/workout-list/WorkoutList';
import { StickyFooter } from 'src/shared/components';
import { EModal, modalShown, selectModal } from 'src/slices';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';

const useStyles = createStyles(() => ({
  headerIcon: {
    fontSize: '2rem',
  },
}));

const deriveDay = (pathname: string) => {
  const indexOfQueryParams = pathname.indexOf('?');

  const hasQueryParams = indexOfQueryParams && indexOfQueryParams > pathname.lastIndexOf('/');

  return pathname.substring(pathname.lastIndexOf('/') + 1, hasQueryParams ? indexOfQueryParams : pathname.length);
};

export const DetailsPage = () => {
  const { classes, cx } = useStyles();

  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  const { pathname } = useLocation();
  const day = deriveDay(pathname);

  return (
    <>
      {modal === EModal.ADD_ROUTINE_EXERCISE && <AddRoutineExerciseModal />}
      <Container size='lg'>
        <Space h='sm' />
        <Group position='center'>
          <i className={`fas fa-calendar-day ${classes.headerIcon}`} />
          <Title order={1}>Monday</Title>
        </Group>
        {/* <Space h='lg' /> */}
        {/* maybe add metadata to workout routine here: i.e. estimated time to complete routine, # of times you've trained this routine, # of exercises, description if applicable */}
        <Space h='lg' />
        <Divider my='xs' label='Exercises' labelPosition='center' />
        <Space h='lg' />
        <WorkoutList
          data={[
            {
              name: 'Benchpress',
              sets: 3,
              reps: 8,
              symbol: 'PIC1',
            },
            {
              name: 'Bicep Curls',
              sets: 4,
              reps: 10,
              symbol: 'PIC2',
            },
          ]}
        />
        <StickyFooter>
          <Group position='right'>
            <Button color='violet' onClick={() => dispatch(modalShown(EModal.ADD_ROUTINE_EXERCISE))}>
              Add Exercise
            </Button>
          </Group>
        </StickyFooter>
      </Container>
    </>
  );
};
