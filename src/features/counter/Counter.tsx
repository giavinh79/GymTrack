import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, incrementAsync, selectCount } from './counterSlice';
import { Button, Row, Col } from 'reactstrap';
import './Counter.module.css';
import Navbar from '../../app/components/Navbar';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <>
      <Navbar />
      <Row style={{ paddingTop: '9rem', height: '55rem', width: '100%', flexWrap: 'nowrap' }}>
        <Col sm={5}>
          <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '3rem' }}>
              <strong>Track</strong>
              <span> your fitness journey.</span>
            </h1>
            <h1 style={{ fontSize: '3rem', margin: '2rem' }}>
              <strong>Start</strong>
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
      <div>
        <div className={'row'}>
          <button className='button' aria-label='Increment value' onClick={() => dispatch(increment())}>
            +
          </button>
          <span className={'value'}>{count}</span>
          <button className='button' aria-label='Decrement value' onClick={() => dispatch(decrement())}>
            -
          </button>
        </div>
        <div className='row'>
          <input
            className='textbox'
            aria-label='Set increment amount'
            value={incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
          />
          <button className='button' onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
            Add Amount
          </button>
          <button className='asyncButton' onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>
            Add Async
          </button>
        </div>
      </div>
    </>
  );
}
