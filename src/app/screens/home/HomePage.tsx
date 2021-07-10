import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Calendar from 'rc-calendar';
import Model from 'react-body-highlighter';
import Skeleton from 'react-loading-skeleton';
import 'rc-calendar/assets/index.css';

import { AddRoutineModal, Dialog, NoRoutinePlaceholder, VisualizationPanel, WorkoutCard } from 'app/components';
import { EModal, selectModal, showAddRoutineModal, showDeleteRoutineDialog } from 'slices/modalSlice';
import { selectLoading, doneLoading } from 'slices/loadingSlice';
import { EVisualization, IRoutineObject } from '../types';
import { retrieveRoutines, deleteRoutine } from 'http/routine';
import firebase from 'auth/firebase';
import { refreshData } from 'slices/refreshSlice';
import { exists, isNil } from 'utility';
import { defaultRoutineObject } from './utils';

import '../styles/homepage.scss';

export const HomePage = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModal);
  const loadingState = useSelector(selectLoading);
  // const refreshState = useSelector(selectRefresh);

  const [visualization, setVisualization] = useState(EVisualization.CALENDAR);

  const [routine, setRoutine] = useState<IRoutineObject | null>(defaultRoutineObject);

  const initializeRoutine = React.useCallback(
    async (token: string) => {
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
        setRoutine(routinesObject.find((routine: any) => routine._id === selectedRoutine));
      }

      dispatch(doneLoading());
    },
    [dispatch]
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (exists(user)) {
        const token = await user.getIdToken();
        initializeRoutine(token);
      }
    });
  }, [initializeRoutine]);

  const handleDelete = React.useCallback(async () => {
    try {
      if (routine) {
        await deleteRoutine(routine._id);
      }

      dispatch(refreshData());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, routine]);

  const renderVisualization = React.useCallback(() => {
    switch (visualization) {
      case EVisualization.CALENDAR:
        return <Calendar style={{ height: '100%', width: '100%', minWidth: '20.5rem', zIndex: 1 }} />;
      case EVisualization.GRAPH:
        return <div></div>;
      default:
        return (
          <div className='container'>
            <Model data={[]} type='posterior' style={{ margin: '0 2rem' }} />
            <Model data={[]} style={{ margin: '0 2rem' }} />
          </div>
        );
    }
  }, [visualization]);

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

      <Container fluid='lg'>
        {routine ? (
          <>
            <div style={{ margin: '1.5rem 0' }}>
              <div style={{ color: '#666', fontWeight: 800, fontSize: '1.7rem', marginBottom: '0.5rem' }}>
                <span style={{ cursor: 'pointer' }}>ROUTINE</span>
                <i className='fas fa-caret-down' style={{ cursor: 'pointer', margin: '0 1.5rem 0 0.5rem' }}></i>
                <i className='fas fa-info-circle icon--blue'></i>
                <i className='fas fa-plus-circle icon--green' onClick={() => dispatch(showAddRoutineModal())}></i>
                <i className='fas fa-times-circle icon--red' onClick={() => dispatch(showDeleteRoutineDialog())}></i>
              </div>
              <span style={{ color: '#8d8d8d', fontWeight: 600, fontSize: '1.5rem' }}>
                {loadingState ? <Skeleton width={'70%'} /> : routine.name}
              </span>
            </div>

            <VisualizationPanel setVisualization={setVisualization} visualization={visualization} />

            <div className='visualization-wrapper'>{renderVisualization()}</div>
            <Row style={{ justifyContent: 'center' }}>
              <Col sm={12} style={{ justifyContent: 'center', padding: '2rem' }}>
                <Row>
                  <WorkoutCard
                    backgroundColor='rgba(113, 104, 193, 0.13)'
                    iconColor='rgba(113, 104, 193, 0.75)'
                    textColor='#7168c1'
                    day='MON'
                    data={routine.workouts['monday']}
                    title={routine.workouts['monday'].name || 'Monday'}
                    text="Placeholder for list of this day's exercises"
                  // text='Bench Press, Incline Benchpress, Decline Benchpress, Chest Flies'
                  />
                  <WorkoutCard
                    backgroundColor='#388ccd29'
                    iconColor='#388ccdab'
                    textColor='#388ccd'
                    day='TUES'
                    data={routine.workouts['tuesday']}
                    title={routine.workouts['tuesday'].name || 'Tuesday'}
                  // text='Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl'
                  />
                </Row>
                <Row>
                  <WorkoutCard
                    backgroundColor='rgba(84, 174, 110, 0.25)'
                    iconColor='rgba(84, 174, 110, 0.74)'
                    textColor='rgb(84, 174, 110)'
                    day='WED'
                    data={routine.workouts['wednesday']}
                    title={routine.workouts['wednesday'].name || 'Wednesday'}
                  // text='Air bike, Ab Wheel, Sit-ups, Crunches'
                  />
                  <WorkoutCard
                    backgroundColor='#FFEFB3'
                    iconColor='#e6b707ab'
                    textColor='#e6b707'
                    day='THUR'
                    data={routine.workouts['thursday']}
                    title={routine.workouts['thursday'].name || 'Thursday'}
                  // text='Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl'
                  />
                </Row>
                <Row>
                  <WorkoutCard
                    backgroundColor='#FFD9C7'
                    iconColor='#ff7231b8'
                    textColor='#FF7231'
                    day='FRI'
                    data={routine.workouts['friday']}
                    title={routine.workouts['friday'].name || 'Friday'}
                  // text='Push-ups, Incline Benchpress, Decline Press Machine'
                  />
                  <WorkoutCard
                    backgroundColor='#B6EDDE'
                    iconColor='#32c89f99'
                    textColor='#32C89F'
                    day='SAT'
                    data={routine.workouts['saturday']}
                    title={routine.workouts['saturday'].name || 'Saturday'}
                  // text='Hammer Curls, Bicep Curls, Rope Pull'
                  />
                </Row>
                <Row>
                  <WorkoutCard
                    backgroundColor='#5a626842'
                    iconColor='#5a6268ab'
                    textColor='#5A6268'
                    day='SUN'
                    data={routine.workouts['sunday']}
                    title={routine.workouts['sunday'].name || 'Sunday'}
                  // text=''
                  />
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <NoRoutinePlaceholder />
        )}
      </Container>
    </>
  );
};
