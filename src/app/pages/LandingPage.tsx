import React, { useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import Header from '../components/Header';
import './LandingPageStyles.css';

const Landing = () => {
  let [test, setTest] = useState(true);

  // setTimeout(() => {
  //   setTest(!test);
  // }, 2000);

  return (
    <>
      <div className='landing-wrapper-desktop' style={{ width: '100%', position: 'relative' }}>
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
          <div className='mountain-background'></div>
          <div style={{ marginTop: '-13rem', height: '17rem', width: '100%', backgroundColor: '#2f2f2f' }}>
            {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
              <path
                fill='#2F2F2F'
                fill-opacity='1'
                d='M0,192L40,192C80,192,160,192,240,213.3C320,235,400,277,480,277.3C560,277,640,235,720,218.7C800,203,880,213,960,202.7C1040,192,1120,160,1200,165.3C1280,171,1360,213,1400,234.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
              ></path>
            </svg> */}
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
      <div
        style={{ width: '100%', maxWidth: '80rem', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
        className='landing-wrapper-mobile'
      >
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
                  height: '20rem',
                  padding: '1rem',
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
                    margin: '1rem',
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
    </>
  );
};

export default Landing;
