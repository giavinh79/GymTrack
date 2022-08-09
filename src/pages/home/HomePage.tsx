import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@mantine/core';

import { AddRoutineModal, NoRoutinePlaceholder, RoutinePanel, VisualizationPanel, WorkoutCard } from 'src/features';
// import { useGetUsersRoutinesQuery } from 'src/services/routine';
import { ScrollToTop } from 'src/shared/components';
import { EModal, selectedRoutine, selectModal } from 'src/slices';
import { EDay } from 'src/types';

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
  const modal = useSelector(selectModal);
  // const context = useSelector(selectContext);

  const [visualization, setVisualization] = useState(EVisualization.CALENDAR);
  // const { data: routines, isError, isLoading } = useGetUsersRoutinesQuery(context.user.id);

  const currentUserRoutine = useSelector(selectedRoutine);

  const handleModal = useCallback(() => {
    switch (modal) {
      case EModal.ADD_ROUTINE:
        return <AddRoutineModal />;
      // case EModal.DELETE_ROUTINE:
      //   return (
      //     <Dialog
      //       type='delete'
      //       title='Are you sure you want to delete this routine?'
      //       text='This action is permanent and cannot be undone.'
      //       onConfirm={() => ({})}
      //     />
      //   );
      default:
        return null;
    }
  }, [modal]);

  return (
    <>
      {handleModal()}

      <Container size='lg' pb={'6rem'}>
        {currentUserRoutine ? (
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
                    data={currentUserRoutine?.workouts[card.day]}
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
