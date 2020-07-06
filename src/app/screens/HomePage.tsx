import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Calendar from 'rc-calendar';
import Model from 'react-body-highlighter';
import WorkoutCard from '../components/Home/WorkoutCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal, showAddRoutineModal, showDeleteRoutineDialog } from '../../slices/modalSlice';
import { selectLoading, doneLoading } from '../../slices/loadingSlice';
import AddRoutineModal from '../components/Home/AddRoutineModal';
import VisualizationPanel from '../components/Home/VisualizationPanel';
import { VISUALIZATION, RoutineObject } from './types';
import NoRoutinePlaceholder from '../components/Home/NoRoutinePlaceholder';
import { retrieveRoutines, deleteRoutine } from '../../api/restCalls';
import firebase from '../../auth/firebase';
import Skeleton from 'react-loading-skeleton';
import Dialog from '../components/Dialog/Dialog';
import { selectRefresh, refreshData } from '../../slices/refreshSlice';
import './styles/homepage.scss';
import 'rc-calendar/assets/index.css';

const Home = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModal);
  const loadingState = useSelector(selectLoading);
  const refreshState = useSelector(selectRefresh);

  const [showVisualization, setShowVisualization] = useState(VISUALIZATION.CALENDAR);

  const [routine, setRoutine] = useState<RoutineObject | null>({
    name: '',
    date: null,
    description: '',
    token: '',
    _id: '',
    userId: '',
    userEmail: '',
    workouts: {
      monday: {
        exercises: [],
      },
      tuesday: {
        exercises: [],
      },
      wednesday: {
        exercises: [],
      },
      thursday: {
        exercises: [],
      },
      friday: {
        exercises: [],
      },
      saturday: {
        exercises: [],
      },
      sunday: {
        exercises: [],
      },
    },
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const {
          data: { routines, selectedRoutine },
        } = await retrieveRoutines(token);

        if (routines != null && JSON.parse(routines).length > 0 && selectedRoutine != null) {
          setRoutine(JSON.parse(routines).find((routine: any) => routine._id === selectedRoutine));
        } else {
          setRoutine(null);
        }

        dispatch(doneLoading());
      }
    });
  }, [dispatch, refreshState]);

  const handleVisualization = () => {
    if (showVisualization === VISUALIZATION.CALENDAR) {
      return <Calendar style={{ height: '100%', width: '100%', minWidth: '20.5rem', zIndex: 1 }} />;
    } else if (showVisualization === VISUALIZATION.GRAPH) {
      return <div></div>;
    } else {
      return (
        <div className='container'>
          <Model responsive={false} data={[]} type='posterior' style={{ margin: '0 2rem' }} />
          <Model responsive={false} data={[]} style={{ margin: '0 2rem' }} />
        </div>
      );
    }
  };

  const handleDelete = async () => {
    try {
      if (routine) await deleteRoutine(routine._id);
      dispatch(refreshData());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {modalState === 'ADD_ROUTINE' && <AddRoutineModal />}
      {modalState === 'DELETE_ROUTINE' && (
        <Dialog
          type='delete'
          title='Are you sure you want to delete this routine?'
          text='This action is permanent and cannot be undone.'
          onConfirm={handleDelete}
        />
      )}

      <Container fluid='lg'>
        {routine ? (
          <>
            <div style={{ marginTop: '1.5rem' }}>
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

            <VisualizationPanel setShowVisualization={setShowVisualization} />

            <div className='visualization-wrapper'>{handleVisualization()}</div>
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
                    title={routine.workouts['tuesday'].name || 'Monday'}
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
                    title={routine.workouts['wednesday'].name || 'Monday'}
                    // text='Air bike, Ab Wheel, Sit-ups, Crunches'
                  />
                  <WorkoutCard
                    backgroundColor='#FFEFB3'
                    iconColor='#e6b707ab'
                    textColor='#e6b707'
                    day='THURS'
                    data={routine.workouts['thursday']}
                    title={routine.workouts['thursday'].name || 'Monday'}
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
                    title={routine.workouts['friday'].name || 'Monday'}
                    // text='Push-ups, Incline Benchpress, Decline Press Machine'
                  />
                  <WorkoutCard
                    backgroundColor='#B6EDDE'
                    iconColor='#32c89f99'
                    textColor='#32C89F'
                    day='SAT'
                    data={routine.workouts['saturday']}
                    title={routine.workouts['saturday'].name || 'Monday'}
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
                    title={routine.workouts['sunday'].name || 'Monday'}
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

export default Home;
