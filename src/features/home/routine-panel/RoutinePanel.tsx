import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mantine/core';

import { Dialog } from 'src/features/dialog';
import { ClickableIcon, ThemedSkeleton } from 'src/shared/components';
import { EModal, modalShown, selectModal } from 'src/slices';
import { selectRoutinesLoading } from 'src/slices/gym/routine/routinesLoadingSlice';

import { AddRoutineModal } from '../AddRoutineModal';

import { useRoutinePanelStyles } from './RoutinePanel.styles';

const RoutinePanelComponent = () => {
  const { classes } = useRoutinePanelStyles();

  const dispatch = useDispatch();
  const modalState = useSelector(selectModal);
  const loadingRoutinesState = useSelector(selectRoutinesLoading);

  const handleModal = useCallback(() => {
    switch (modalState) {
      case EModal.ADD_ROUTINE:
        return <AddRoutineModal />;
      case EModal.DELETE_ROUTINE:
        return (
          <Dialog
            type='delete'
            title='Are you sure you want to delete this routine?'
            text='This action is permanent and cannot be undone.'
            onConfirm={() => ({})}
          />
        );
      default:
        return null;
    }
  }, [modalState]);

  return (
    <>
      {handleModal()}

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

        {loadingRoutinesState ? (
          <ThemedSkeleton width='15rem' height='2rem' />
        ) : (
          <span style={{ color: '#8d8d8d', fontWeight: 600, fontSize: '1.5rem' }}>
            {'Zertovsky Heavy Chest Routine'}
          </span>
        )}
      </div>
    </>
  );
};

export const RoutinePanel = memo(RoutinePanelComponent);
