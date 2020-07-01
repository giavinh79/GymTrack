import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Calendar from 'rc-calendar';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import StartWorkoutModal from '../components/StartWorkoutModal';
import Model from 'react-body-highlighter';
import 'rc-calendar/assets/index.css';
import WorkoutCard from '../components/Home/WorkoutCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal, showAddRoutineModal } from '../../slices/modalSlice';
import AddRoutineModal from '../components/Home/AddRoutineModal';
import VisualizationPanel from '../components/Home/VisualizationPanel';
import { VISUALIZATION } from './types';
import NoRoutinePlaceholder from '../components/Home/NoRoutinePlaceholder';

const Home = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModal);

  const [startModal, setStartModal] = useState(false);
  const [showVisualization, setShowVisualization] = useState(VISUALIZATION.CALENDAR);

  const [routine, setRoutine] = useState(null);
  // const [loading, setLoading] = useState(true);

  const handleStart = () => {
    setStartModal(true);
  };

  const handleVisualization = () => {
    if (showVisualization === VISUALIZATION.CALENDAR) {
      return <Calendar style={{ height: '100%', minWidth: '20.5rem', width: '100%' }} />; //maxWidth: '50rem',
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

  return (
    <>
      {modalState === 'ADD_ROUTINE' && <AddRoutineModal />}
      {startModal && <StartWorkoutModal setStartModal={setStartModal} />}
      <Container fluid='lg'>
        {routine ? (
          <>
            <div style={{ marginTop: '1.5rem' }}>
              <span style={{ color: '#666', fontWeight: 800, fontSize: '1.5rem' }}>
                <span style={{ cursor: 'pointer' }}>CURRENT ROUTINE</span>
                <i className='fas fa-caret-down' style={{ cursor: 'pointer', margin: '0 0.5rem' }}></i>
                {/* <div style={{ display: 'inline-block', padding: '1rem', borderRadius: '50%' }}> */}
                <i
                  className='fas fa-plus'
                  style={{ cursor: 'pointer', color: '#5AA45A', margin: '1rem' }}
                  onClick={() => dispatch(showAddRoutineModal())}
                ></i>
                {/* </div> */}
                <i className='fas fa-times' style={{ cursor: 'pointer', color: '#d93030' }}></i>
              </span>
              <br />
              <span style={{ color: '#8d8d8d', fontWeight: 600, fontSize: '1.5rem' }}>
                Zertovsky's Heavy Chest Routine
              </span>
            </div>

            <VisualizationPanel setShowVisualization={setShowVisualization} />

            <div style={{ margin: '0 1rem' }}>{handleVisualization()}</div>
            <Row style={{ justifyContent: 'center' }}>
              <Col sm={12} style={{ justifyContent: 'center', padding: '2rem' }}>
                <Row>
                  <WorkoutCard
                    backgroundColor='rgba(113, 104, 193, 0.13)'
                    iconColor='rgba(113, 104, 193, 0.75)'
                    textColor='#7168c1'
                    day='MON'
                    title='Push Day'
                    text='Bench Press, Incline Benchpress, Decline Benchpress, Chest Flies'
                  />
                  <WorkoutCard
                    backgroundColor='#388ccd29'
                    iconColor='#388ccdab'
                    textColor='#388ccd'
                    day='TUES'
                    title='Pull Day'
                    text='Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl'
                  />
                </Row>
                <Row>
                  <WorkoutCard
                    backgroundColor='rgba(84, 174, 110, 0.25)'
                    iconColor='rgba(84, 174, 110, 0.74)'
                    textColor='rgb(84, 174, 110)'
                    day='WED'
                    title='Ab Day'
                    text='Air bike, Ab Wheel, Sit-ups, Crunches'
                  />
                  <WorkoutCard
                    backgroundColor='#FFEFB3'
                    iconColor='#e6b707ab'
                    textColor='#e6b707'
                    day='THURS'
                    title='Pull Day'
                    text='Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl'
                  />
                </Row>
                <Row>
                  <WorkoutCard
                    backgroundColor='#FFD9C7'
                    iconColor='#ff7231b8'
                    textColor='#FF7231'
                    day='FRI'
                    title='Push Day 2'
                    text='Push-ups, Incline Benchpress, Decline Press Machine'
                  />
                  <WorkoutCard
                    backgroundColor='#B6EDDE'
                    iconColor='#32c89f99'
                    textColor='#32C89F'
                    day='SAT'
                    title='Pull Day 2'
                    text='Hammer Curls, Bicep Curls, Rope Pull'
                  />
                </Row>
                <Row>
                  <WorkoutCard
                    backgroundColor='#5a626842'
                    iconColor='#5a6268ab'
                    textColor='#5A6268'
                    day='SUN'
                    title='Rest Day'
                    text=''
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
