import { ReactElement, useCallback, useState } from 'react';
import { Container, Grid } from '@mantine/core';

import { AddRoutineModal, NoRoutinePlaceholder, RoutinePanel, VisualizationPanel, WorkoutCard } from 'src/features';
import { ScrollToTop } from 'src/shared/components';
import { EModal, selectedRoutine, selectModal } from 'src/slices';
import { useAppSelector } from 'src/stores/hooks';

import { WORKOUT_CARDS } from './constants';
import { EVisualization } from './types';

import 'react-loading-skeleton/dist/skeleton.css';

export const HomePage = (): ReactElement => {
  const modal = useAppSelector(selectModal);

  const [visualization, setVisualization] = useState(EVisualization.CALENDAR);

  const currentUserRoutine = useAppSelector(selectedRoutine);

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
                  <WorkoutCard card={card} exercises={currentUserRoutine.workout?.[card.day] ?? []} />
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
