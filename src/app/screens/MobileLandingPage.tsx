import React from 'react';
import Header from '../components/Landing/Header';
import { Button, InputGroupAddon, InputGroup, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { enableEmailRegistration } from '../../slices/signupSlice';

interface IProps {
  handleSubmit: (e: React.FormEvent) => void;
}

export const MobileLandingPage: React.FC<IProps> = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  return (
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
              // maxHeight: '100%',
              backgroundColor: '#212121',
              borderBottom: '1px solid #ccc',
            }}
          >
            <img
              src='/images/landingpagefitness.svg'
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
              <form onSubmit={handleSubmit} style={{ margin: '2rem' }}>
                <InputGroup size='lg'>
                  <Input
                    placeholder='Email'
                    type='email'
                    required
                    onChange={(e) => dispatch(enableEmailRegistration(e.target.value))}
                  />
                  <InputGroupAddon addonType='append'>
                    <Button size='' style={{ backgroundColor: '#736E9E' }}>
                      SIGN UP
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
