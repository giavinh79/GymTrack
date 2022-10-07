import { ReactElement } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { createStyles, Text, useMantineTheme } from '@mantine/core';
import { useListState } from '@mantine/hooks';

import { ReactComponent as ExerciseAbBicycle } from 'src/assets/images/exercises/exercise_ab_bicycle.svg';
import { ClickableIcon } from 'src/shared/components';

const useStyles = createStyles((theme) => ({
  item: {
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

interface WorkoutCardData {
  name: string;
  symbol: string;
  sets: number;
  reps: number;
}

interface DndListHandleProps {
  data: WorkoutCardData[];
}

export const WorkoutList = ({ data }: DndListHandleProps): ReactElement => {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState<WorkoutCardData>(data);

  const theme = useMantineTheme();

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <i className='fas fa-grip-horizontal' />
          </div>
          <ExerciseAbBicycle width='4rem' fill={theme.colors.violet[6]} />
          <div style={{ textAlign: 'left', marginLeft: '1.5rem' }}>
            <Text>{item.name}</Text>
            <Text color='dimmed' size='sm'>
              Sets: {item.sets} • Reps: {item.reps}
            </Text>
          </div>
          <ClickableIcon
            className='far fa-times-circle'
            // color='red'
            onClick={() => ({})}
            style={{
              position: 'absolute',
              top: 0,
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
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
