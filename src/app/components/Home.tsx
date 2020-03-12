import React from 'react';
import { Container, Row, Col, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
// @ts-ignore
import Calendar from 'rc-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './CalendarStyles.css';
import 'rc-calendar/assets/index.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

export default function Home() {
  return (
    <>
      <Navbar light style={{ width: '100%', justifyContent: 'center' }}>
        <NavbarBrand href='/' style={{ position: 'absolute' }}>
          <span>Gym</span>
          <span style={{ color: '#3e41ab' }}>Track</span>
        </NavbarBrand>
        <NavbarText style={{ marginLeft: 'auto' }}>Logout</NavbarText>
      </Navbar>
      <div style={{ backgroundColor: '#F8F9FA', width: '100%' }}>
        <Container fluid='lg'>
          <p style={{ fontSize: '1.1rem', margin: '2rem' }}>
            Welcome tester@gmail.com! Your current routine is: <span style={{ color: '#5C41AB' }}>BigMon</span>
          </p>
          <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
            <Button outline color='info'>
              Start Workout
            </Button>{' '}
            <div style={{ height: '3rem', width: 0, margin: '0 1rem', border: '1px solid #e2e2e2' }}></div>
            <Button outline color='secondary'>
              End Workout
            </Button>{' '}
            <div style={{ height: '3rem', width: 0, margin: '0 1rem', border: '1px solid #e2e2e2' }}></div>
            <Button outline color='success'>
              Share Workout
            </Button>{' '}
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <Col sm={12} style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <Calendar style={{ height: '100%', maxWidth: '50rem', minWidth: '20.5rem', width: '100%' }} />
            </Col>
            <Col
              sm={12}
              //   style={{
              //     padding: '2rem',
              //     backgroundColor: 'rgba(232, 232, 232, 0.29)',
              //     borderRadius: '20px',
              //   }}
              style={{ justifyContent: 'center', padding: '2rem', maxWidth: '54rem' }}
            >
              <Row>
                <Col sm='6' style={{ marginBottom: '1rem' }}>
                  <Card body>
                    <CardTitle>
                      <strong>Monday</strong>
                    </CardTitle>
                    <CardText>Push Day: Bench Press, Incline Bench Press, Decline Benchpress, Chest Flies</CardText>
                    <Button>Details</Button>
                  </Card>
                </Col>
                <Col sm='6' style={{ marginBottom: '1rem' }}>
                  <Card body>
                    <CardTitle>
                      <strong>Tuesday</strong>
                    </CardTitle>
                    <CardText>Pull day: Bicep Curl, Dumbbell Rows, Bicep Machine, Barbell Curl</CardText>
                    <Button>Details</Button>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm='6' style={{ marginBottom: '1rem' }}>
                  <Card body>
                    <CardTitle>
                      <strong>Wednesday</strong>
                    </CardTitle>
                    <CardText>Ab day: Air bike, Ab Wheel, Sit-ups, Crunches</CardText>
                    <Button>Details</Button>
                  </Card>
                </Col>
                <Col sm='6' style={{ marginBottom: '1rem' }}>
                  <Card body>
                    <CardTitle>
                      <strong>Thursday</strong>
                    </CardTitle>
                    <CardText>Shoulder day: Overhead press, front raises</CardText>
                    <Button>Details</Button>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm='6' style={{ marginBottom: '1rem' }}>
                  <Card body>
                    <CardTitle>
                      <strong>Friday</strong>
                    </CardTitle>
                    <CardText>Push day 2: Push-ups, benchpress, benchpress machine</CardText>
                    <Button>Details</Button>
                  </Card>
                </Col>
                <Col sm='6' style={{ marginBottom: '1rem' }}>
                  <Card body>
                    <CardTitle>
                      <strong>Saturday</strong>
                    </CardTitle>
                    <CardText>Pull day 2: Hammer curls, bicep curls sitting down, rope pull.</CardText>
                    <Button>Details</Button>
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginBottom: '1rem' }}>
                <Col sm='6' style={{ marginBottom: '1rem' }}>
                  <Card body>
                    <CardTitle>
                      <strong>Sunday</strong>
                    </CardTitle>
                    <CardText>Rest day :)</CardText>
                    <Button>Details</Button>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div style={{ marginTop: '-20rem', height: '40rem', width: '100%', backgroundColor: '#2f2f2f' }}></div> */}
    </>
  );
}
