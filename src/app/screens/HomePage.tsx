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

const VISUALIZATION = {
  CALENDAR: 'calendar',
  GRAPH: 'graph',
  MODEL: 'model',
};

const Home = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModal);

  const [startModal, setStartModal] = useState(false);
  const [showVisualization, setShowVisualization] = useState(VISUALIZATION.CALENDAR);

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
          <span style={{ color: '#8d8d8d', fontWeight: 600, fontSize: '1.5rem' }}>Zertovsky's Heavy Chest Routine</span>
        </div>

        <div className='container' style={{ marginTop: '1rem', padding: 0 }}>
          <i
            className='fas fa-calendar-day'
            style={{
              cursor: 'pointer',
              color: '#5a5562',
              fontSize: '2rem',
              padding: '0.5rem 1rem',
              marginLeft: 'auto',
            }}
            onClick={() => setShowVisualization(VISUALIZATION.CALENDAR)}
          ></i>
          <i
            className='fas fa-child'
            style={{
              cursor: 'pointer',
              color: '#5a556296',
              fontSize: '2rem',
              padding: '0.5rem 1rem',
            }}
            onClick={() => setShowVisualization(VISUALIZATION.MODEL)}
          ></i>
          <i
            className='fas fa-chart-bar'
            style={{
              cursor: 'pointer',
              color: '#5a556296',
              fontSize: '2rem',
              padding: '0.5rem 1rem',
            }}
            onClick={() => setShowVisualization(VISUALIZATION.GRAPH)}
          ></i>
        </div>
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
              {/* <div
                className='container--no-center'
                style={{
                  flex: 1,
                  borderRadius: '22px',
                  boxShadow: '0 1px 5px #ccc',
                  padding: '12px',
                  margin: '1rem 1rem 3rem 1rem',
                  height: '100%',
                }}
              >
                <div
                  className='.container--column'
                  style={{
                    flex: 4,
                    height: '100%',
                    fontWeight: 800,
                    fontSize: '3rem',
                    color: '#388ccd',
                    backgroundColor: '#388ccd29',
                    borderRadius: '10px',
                    minWidth: '10rem',
                  }}
                >
                  <p style={{ margin: 0 }}>TUES</p>
                  <i className='fas fa-dumbbell hide-mobile' style={{ color: '#388ccdab' }}></i>
                </div>
                <div
                  className='container--column no-margin'
                  style={{
                    position: 'relative',
                    justifyContent: 'normal',
                    flex: 5,
                    padding: '1rem',
                    minWidth: '10rem',
                  }}
                >
                  <p style={{ fontSize: '2rem', fontWeight: 700 }}>Pull Day</p>
                  <p style={{ color: '#606060' }}>Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl</p>
                  <Button
                    size='lg'
                    style={{
                      position: 'absolute',
                      bottom: '-2rem',
                      backgroundColor: '#5aa45a',
                      fontWeight: 500,
                      border: 'none',
                      padding: '0.5rem 3rem',
                    }}
                  >
                    Details
                  </Button>
                </div>
              </div> */}
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
      </Container>
      {/* <div
        style={{
          display: 'flex',
          minHeight: '4rem',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          color: 'white',
          fontWeight: 600,
          backgroundColor: '#625479',
          bottom: '0',
          fontSize: '0.8rem',
        }}
      >
        Start Workout | Change Workout | Share Workout
      </div> */}
    </>
  );
};

export default Home;
