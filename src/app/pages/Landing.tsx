import React, { useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import Header from '../components/Header';
// import './Landing.css';

const Landing = () => {
  let [test, setTest] = useState(false);

  setTimeout(() => {
    setTest(!test);
  }, 2000);

  return (
    <>
      {test ? (
        <>
          <Header test={test} />
          <>
            <Row style={{ paddingTop: '9rem', height: '55rem', width: '100%', flexWrap: 'nowrap' }}>
              <Col sm={5}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
                  <h1 style={{ fontSize: '3rem' }}>
                    <strong style={{ color: '#7f6d96' }}>Track</strong>
                    <span> your fitness journey.</span>
                  </h1>
                  <h1 style={{ fontSize: '3rem', margin: '2rem' }}>
                    <strong style={{ color: '#7f6d96' }}>Start</strong>
                    <span> today for free.</span>
                  </h1>
                  <Button size='lg' style={{ backgroundColor: '#736E9E', margin: '3rem' }}>
                    Sign Up
                  </Button>
                </Row>
              </Col>
              <Col sm={7}>
                <img src='/landingpagefitness.svg' alt='landing page' style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </Col>
            </Row>
            <div style={{ marginTop: '-13rem', height: '17rem', width: '100%', backgroundColor: '#2f2f2f' }}></div>
          </>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              // height: '4rem',
              width: '100%',
              backgroundColor: '#f1f1f1',
            }}
          >
            <img src='/logo192.png' alt='logo' />
            <p style={{ fontSize: '1.4rem', margin: '1rem 2rem 2rem 2rem', color: '#27113c' }}>
              GV79 &copy; GymTrack 2020
            </p>
          </div>
        </>
      ) : (
        <div style={{ width: '100%', maxWidth: '80rem', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
          <Header />
          <>
            <div style={{ marginTop: '3.6rem', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  maxHeight: '100%',
                  backgroundColor: '#212121',
                  borderBottom: '1px solid #ccc',
                }}
              >
                <img
                  src='/landingpagefitness.svg'
                  alt='landing page'
                  style={{
                    backgroundColor: 'white',
                    // transform: 'scale(-1, 1)',
                    height: '20rem',
                    padding: '1rem',
                    // clipPath: 'polygon(100% 0, 0 0, 0 100%)',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '2.5rem',
                    minWidth: '100%',
                    color: 'white',
                  }}
                >
                  <h1 style={{ fontSize: '2rem', margin: '1rem' }}>
                    <strong style={{ color: '#96dad7' }}>Track</strong>
                    <span> your fitness journey.</span>
                  </h1>
                  <h1 style={{ fontSize: '2rem', margin: '1rem' }}>
                    <strong style={{ color: '#96dad7' }}>Start</strong>
                    <span> today for free.</span>
                  </h1>
                  <Button
                    size='lg'
                    style={{
                      backgroundColor: '#736E9E',
                      margin: '2rem 2rem 1rem 2rem',
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              // height: '4rem',
              width: '100%',
              backgroundColor: '#f1f1f1',
            }}
          >
            <img src='/logo192.png' alt='logo' />
            <p style={{ fontSize: '1.4rem', margin: '1rem 2rem 2rem 2rem', color: '#27113c' }}>
              GV79 &copy; GymTrack 2020
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
