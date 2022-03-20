import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid } from '@mantine/core';

import { AddRoutineModal, Dialog, NoRoutinePlaceholder, VisualizationPanel, WorkoutCard } from 'src/features';
import { retrieveRoutines, deleteRoutine } from 'src/http/routine';
import { auth } from 'src/auth/firebase';
import { EModal, modalShown, selectModal } from 'src/slices/modal/modalSlice';
import { refreshData } from 'src/slices/general/refreshSlice';
import { selectLoading, doneLoading } from 'src/slices/general/loadingSlice';
import { exists, isNil } from 'src/utils';
import { EDay, IRoutine } from 'src/types';
import { ClickableIcon, ScrollToTop, ThemedSkeleton } from 'src/shared/components';

import { defaultRoutineObject } from './utils';
import { EVisualization } from './types';

import 'react-loading-skeleton/dist/skeleton.css';

export const WORKOUT_CARDS = [
  {
    title: 'MON',
    contentTitle: 'Monday',
    day: EDay.MONDAY,
    backgroundColor: 'rgba(113, 104, 193, 0.13)',
    iconColor: 'rgba(113, 104, 193, 0.75)',
    textColor: '#7168c1',
    text: "Placeholder for list of this day's exercises",
  },
  {
    title: 'TUES',
    contentTitle: 'Tuesday',
    day: EDay.TUESDAY,
    backgroundColor: '#388ccd29',
    iconColor: '#388ccdab',
    textColor: '#388ccd',
    text: 'Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl',
  },
  {
    title: 'WED',
    contentTitle: 'Wednesday',
    day: EDay.WEDNESDAY,
    backgroundColor: 'rgba(84, 174, 110, 0.25)',
    iconColor: 'rgba(84, 174, 110, 0.74)',
    textColor: 'rgb(84, 174, 110)',
    text: 'Air bike, Ab Wheel, Sit-ups, Crunches',
  },
  {
    title: 'THUR',
    contentTitle: 'Thursday',
    day: EDay.THURSDAY,
    backgroundColor: '#FFEFB3',
    iconColor: '#e6b707ab',
    textColor: '#e6b707',
    text: 'Running, jogging, sitting, slapping',
  },
  {
    title: 'FRI',
    contentTitle: 'Friday',
    day: EDay.FRIDAY,
    backgroundColor: '#FFD9C7',
    iconColor: '#ff7231b8',
    textColor: '#FF7231',
    text: 'Push-ups, Incline Bench-press, Decline Press Machine',
  },
  {
    title: 'SAT',
    contentTitle: 'Saturday',
    day: EDay.SATURDAY,
    backgroundColor: '#B6EDDE',
    iconColor: '#32c89f99',
    textColor: '#32C89F',
    text: 'Push-ups, Incline Bench-press, Decline Press Machine',
  },
  {
    title: 'SUN',
    contentTitle: 'Sunday',
    day: EDay.SUNDAY,
    backgroundColor: '#5a626842',
    iconColor: '#5a6268ab',
    textColor: '#5A6268',
    text: 'Push-ups, Incline Bench-press, Decline Press Machine',
  },
];

export const HomePage = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModal);
  const loadingState = useSelector(selectLoading);
  // const refreshState = useSelector(selectRefresh);

  const [visualization, setVisualization] = useState(EVisualization.CALENDAR);

  const [routine, setRoutine] = useState<IRoutine | null>(defaultRoutineObject);

  const initializeRoutine = React.useCallback(
    async (token: string) => {
      dispatch(doneLoading());
      const { data } = await retrieveRoutines(token);
      const { routines, selectedRoutine } = data;

      if (isNil(routines) || isNil(selectedRoutine)) {
        setRoutine(null);
        dispatch(doneLoading());
        return;
      }

      const routinesObject = JSON.parse(routines);

      if (routinesObject.length <= 0) {
        setRoutine(null);
      } else {
        // setRoutine(routinesObject.find((routine: any) => routine._id === selectedRoutine));
      }

      dispatch(doneLoading());
    },
    [dispatch]
  );

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (exists(user)) {
        const token = await user.getIdToken();
        initializeRoutine(token);
      }
    });
  }, [initializeRoutine]);

  const handleDelete = React.useCallback(async () => {
    try {
      if (routine) {
        await deleteRoutine(routine.id);
      }

      dispatch(refreshData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, routine]);

  const handleModal = React.useCallback(() => {
    switch (modalState) {
      case EModal.ADD_ROUTINE:
        return <AddRoutineModal />;
      case EModal.DELETE_ROUTINE:
        return (
          <Dialog
            type='delete'
            title='Are you sure you want to delete this routine?'
            text='This action is permanent and cannot be undone.'
            onConfirm={handleDelete}
          />
        );
      default:
        return null;
    }
  }, [modalState, handleDelete]);

  return (
    <>
      {handleModal()}
      <Container size='lg' pb={'6rem'}>
        {routine ? (
          <>
            <div style={{ margin: '1.5rem 0' }}>
              <div style={{ color: '#666', fontWeight: 800, fontSize: '1.7rem', marginBottom: '0.5rem' }}>
                <Button variant='subtle' size='xl' compact rightIcon={<i className='fas fa-caret-down' />}>
                  ROUTINE
                </Button>
                <ClickableIcon
                  className='fas fa-info-circle'
                  aria-label='get information about the current routine'
                  margin='0 0.7rem 0 0'
                  color='blue'
                  onClick={() => dispatch(modalShown(EModal.ROUTINE_INFO))}
                />
                <ClickableIcon
                  className='fas fa-plus-circle'
                  aria-label='add a new routine'
                  margin='0 0.7rem 0 0'
                  color='green'
                  onClick={() => dispatch(modalShown(EModal.ADD_ROUTINE))}
                />
                <ClickableIcon
                  className='fas fa-times-circle'
                  aria-label='delete the current routine'
                  margin='0 0.7rem 0 0'
                  color='red'
                  onClick={() => dispatch(modalShown(EModal.DELETE_ROUTINE))}
                />
              </div>

              {loadingState ? (
                <ThemedSkeleton width='15rem' height='2rem' />
              ) : (
                <span style={{ color: '#8d8d8d', fontWeight: 600, fontSize: '1.5rem' }}>
                  {'Zertovsky Heavy Chest Routine'}
                </span>
              )}
            </div>

            <VisualizationPanel setVisualization={setVisualization} visualization={visualization} />

            <Grid grow gutter='xl'>
              {WORKOUT_CARDS.map((card) => (
                <Grid.Col span={6} key={card.title}>
                  <WorkoutCard
                    backgroundColor={card.backgroundColor}
                    iconColor={card.iconColor}
                    textColor={card.textColor}
                    day={card.title}
                    data={routine.workouts[card.day]}
                    title={card.contentTitle}
                    text={card.text}
                  />
                </Grid.Col>
              ))}
            </Grid>
            <ScrollToTop />
          </>
        ) : (
          <NoRoutinePlaceholder />
        )}
      </Container>
    </>
  );
};
