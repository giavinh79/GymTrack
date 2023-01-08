import { ReactElement } from 'react';
import { useLocation } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Button, Container, createStyles, Divider, Group, Space, Title } from '@mantine/core';
import capitalize from 'lodash/capitalize';

import { AddRoutineExerciseModal } from 'src/features/details/modal/AddRoutineExerciseModal';
import { WorkoutList } from 'src/features/details/workout-list/WorkoutList';
import { StickyFooter } from 'src/shared/components';
import { EModal, modalShown, selectedRoutine, selectModal } from 'src/slices';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';
import { EDay } from 'src/types';

const useStyles = createStyles(() => ({
  headerIcon: {
    fontSize: '2rem',
  },
}));

const deriveDay = (pathname: string): EDay => {
  const indexOfQueryParams = pathname.indexOf('?');

  const hasQueryParams = indexOfQueryParams && indexOfQueryParams > pathname.lastIndexOf('/');

  return pathname.substring(
    pathname.lastIndexOf('/') + 1,
    hasQueryParams ? indexOfQueryParams : pathname.length
  ) as EDay;
};

export const ExerciseDetailsPage = (): ReactElement => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);
  const routine = useAppSelector(selectedRoutine);

  const { pathname } = useLocation();
  const day = deriveDay(pathname);

  if (routine == null) {
    return <Navigate to='/home' />;
  }

  return (
    <>
      {modal === EModal.ADD_ROUTINE_EXERCISE && <AddRoutineExerciseModal day={day} />}
      <Container size='lg'>
        <Space h='sm' />
        <Group position='center'>
          <i className={`fas fa-calendar-day ${classes.headerIcon}`} />
          <Title order={1}>{capitalize(day)}</Title>
        </Group>
        {/* @TODO maybe add metadata to workout routine here: i.e. estimated time to complete routine, # of times you've trained this routine, # of exercises, description if applicable */}
        <Space h='lg' />
        <Divider my='xs' label='Exercises' labelPosition='center' />
        <Space h='lg' />
        <WorkoutList data={routine.workout?.[day] ?? []} />
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
