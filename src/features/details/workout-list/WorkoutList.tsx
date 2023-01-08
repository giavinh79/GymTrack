import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { createStyles, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';

import { ClickableIcon } from 'src/shared/components';
import { IExercise } from 'src/types';

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
  data: IExercise[];
}

export const WorkoutList = ({ data }: IDndListHandleProps): ReactElement => {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState<IExercise>(data);

  const { t } = useTranslation();

  const exercises = state.map((exercise, index) => (
    <Draggable key={exercise.id} index={index} draggableId={exercise.name}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.exercise, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <i className='fas fa-grip-horizontal' />
          </div>
          <img src={exercise.image.url} alt='' className={classes.exerciseImage} />
          <div style={{ textAlign: 'left', marginLeft: '1rem' }}>
            <Text>{t(`domain:EXERCISE.${exercise.name}`)}</Text>
            <Text color='dimmed' size='sm'>
              {exercise.description} • <strong>Sets:</strong> {exercise.sets.length}
            </Text>
          </div>
          <ClickableIcon
            className='far fa-times-circle'
            color='red'
            onClick={() => ({})}
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

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index ?? source.index })
      }
    >
      <Droppable droppableId='dnd-list' direction='vertical'>
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
