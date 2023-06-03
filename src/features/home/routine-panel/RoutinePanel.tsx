import { memo } from 'react';
import { Button } from '@mantine/core';

import { useGetSelectedUserRoutineQuery } from 'src/services/routine';
import { ClickableIcon, ThemedSkeleton } from 'src/shared/components';
import { EModal, modalShown, selectContext } from 'src/slices';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';

import { useRoutinePanelStyles } from './RoutinePanel.styles';

const RoutinePanelComponent = () => {
  const { classes } = useRoutinePanelStyles();

  const dispatch = useAppDispatch();

  const context = useAppSelector(selectContext);
  const { data: routine, isFetching } = useGetSelectedUserRoutineQuery(context.user.id);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.routineControlsWrapper}>
          <Button
            variant='subtle'
            size='xl'
            compact
            rightIcon={<i className='fas fa-caret-down' />}
            className={classes.changeRoutineButton}
          >
            ROUTINE
          </Button>
          <ClickableIcon
            className='fas fa-info-circle'
            aria-label='get information about the current routine'
            color='blue'
            onClick={() => dispatch(modalShown(EModal.ROUTINE_INFO))}
          />
          <ClickableIcon
            className='fas fa-plus-circle'
            aria-label='add a new routine'
            color='green'
            onClick={() => dispatch(modalShown(EModal.ADD_ROUTINE))}
          />
          <ClickableIcon
            className='fas fa-times-circle'
            aria-label='delete the current routine'
            color='red'
            onClick={() => dispatch(modalShown(EModal.DELETE_ROUTINE))}
          />
        </div>

        {isFetching ? (
          <ThemedSkeleton width='15rem' height='2rem' />
        ) : (
          <span style={{ color: '#8d8d8d', fontWeight: 600, fontSize: '1.5rem' }}>{routine?.name}</span>
        )}
      </div>
    </>
  );
};

export const RoutinePanel = memo(RoutinePanelComponent);
