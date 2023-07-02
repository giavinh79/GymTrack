import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { createStyles, Text } from '@mantine/core';

import { useDeleteRoutineExerciseMutation, useUpdateRoutineExercisesMutation } from 'src/services/exercise';
import { useGetSelectedUserRoutineQuery } from 'src/services/routine';
import { ClickableIcon } from 'src/shared/components';
import { useAppSelector } from 'src/stores/hooks';
import { EDay, EExercise, IRoutineDayExercise } from 'src/types';
import { reorderList } from 'src/utils';

const useStyles = createStyles((theme) => ({
  exercise: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  exerciseImage: {
    width: '50px',
    objectFit: 'contain',
    height: '50px',
    borderRadius: '6px',
    backgroundColor: '#e8e8e8',
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    padding: theme.spacing.md,
    fontSize: '1.5rem',
    cursor: 'grab',
  },
}));

interface IDndListHandleProps {
  data: IRoutineDayExercise[];
  day: EDay;
}

export const WorkoutList = ({ day, data }: IDndListHandleProps): ReactElement => {
  const { classes, cx } = useStyles();

  const userId = useAppSelector((state) => state.context.user.id);
  const { data: routine } = useGetSelectedUserRoutineQuery(userId);

  const [updateRoutineExercises] = useUpdateRoutineExercisesMutation();
  const [deleteRoutineExercise] = useDeleteRoutineExerciseMutation();

  const { t } = useTranslation(['domain']);

  const exercises = data.map((routineExercise) => (
    <Draggable key={routineExercise.id} index={routineExercise.exerciseOrder} draggableId={`${routineExercise.id}`}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.exercise, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <i className='fas fa-grip-horizontal' />
          </div>
          <img src={routineExercise.image.url} alt='' className={classes.exerciseImage} />
          <div style={{ textAlign: 'left', marginLeft: '1rem' }}>
            <Text>{t(`domain:EXERCISE.${routineExercise.name as EExercise}`)}</Text>
            <Text color='dimmed' size='sm'>
              {routineExercise.description} • <strong style={{ fontVariantNumeric: 'tabular-nums' }}>Sets:</strong>{' '}
              {routineExercise.sets.length}
            </Text>
          </div>
          <ClickableIcon
            className='far fa-times-circle'
            color='red'
            onClick={() =>
              routine?.id &&
              deleteRoutineExercise({
                routineId: routine.id,
                userId: userId,
                exerciseId: routineExercise.exerciseId,
                deleteRoutineExercisesPayload: {
                  day,
                },
              })
            }
            style={{
              position: 'absolute',
              top: 5,
              right: 0,
            }}
          />
        </div>
      )}
    </Draggable>
  ));

  const updateExerciseOrders = async (sourceIndex: number, destinationIndex: number) => {
    if (routine?.id) {
      // re-map exercise orders
      const updatedExercises = reorderList(data, sourceIndex, destinationIndex).map((routineExercise, index) => ({
        id: routineExercise.id,
        exerciseId: routineExercise.exerciseId,
        exerciseOrder: index + 1, // exercise order starts at 1
        day,
      }));

      await updateRoutineExercises({
        routineId: routine.id,
        userId: userId,
        updateRoutineExercisesPayload: updatedExercises,
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={async ({ destination, source }) => {
        if (destination?.index) {
          await updateExerciseOrders(source.index - 1, destination.index - 1);
        }
      }}
    >
      <Droppable droppableId='exercises-dnd-list' direction='vertical'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {exercises}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
