import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid } from '@mantine/core';

import { auth } from 'src/auth/firebase';
import { NoRoutinePlaceholder, RoutinePanel, VisualizationPanel, WorkoutCard } from 'src/features';
import { retrieveRoutines } from 'src/http/routine';
import { ScrollToTop } from 'src/shared/components';
import { doneLoading } from 'src/slices/general/loadingSlice';
import { EDay, IRoutine } from 'src/types';
import { exists, isNil } from 'src/utils';

import { EVisualization } from './types';
import { defaultRoutineObject } from './utils';

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

  return (
    <>
      <Container size='lg' pb={'6rem'}>
        {routine ? (
          <>
            <RoutinePanel />

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
