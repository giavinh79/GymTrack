import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Row, Col, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import Header from '../features/landing/Header';
import { MobileLandingPage } from '.';
import SignupModal from '../features/authentication/signup-modal/SignupModal';
import { enableEmailRegistration } from '../slices/auth/signupSlice';

import './LandingPageStyles.css';

export const LandingPage = () => {
  const dispatch = useDispatch();
  const [displaySignupModal, setDisplaySignupModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplaySignupModal(true);
  };

  return (
    <>
      {displaySignupModal && <SignupModal setDisplaySignupModal={setDisplaySignupModal} />}
      <div className='landing-wrapper-desktop' style={{ width: '100%', position: 'relative' }}>
        <Header />
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
                <form onSubmit={handleSubmit}>
                  <InputGroup size='lg' style={{ margin: '2rem' }}>
                    <Input
                      placeholder='Email Address'
                      type='email'
                      required
                      onChange={(e) => dispatch(enableEmailRegistration(e.target.value))}
                      style={{ paddingRight: '12rem', zIndex: 1 }}
                    />
                    <InputGroupAddon addonType='append' style={{ position: 'absolute', right: 0, zIndex: 2 }}>
                      <Button size='' style={{ backgroundColor: '#736E9E' }}>
                        SIGN UP TODAY
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </Row>
            </Col>
            <Col sm={7}>
              <img src='/images/landingpagefitness.svg' alt='landing page' style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Col>
          </Row>
          <div className='mountain-background'></div>
          <div style={{ marginTop: '-13rem', height: '17rem', width: '100%', backgroundColor: '#2f2f2f' }}></div>
        </>
      </div>
      <MobileLandingPage handleSubmit={handleSubmit} />
    </>
  );
};
