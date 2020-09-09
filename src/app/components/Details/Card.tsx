import React from 'react';
import './styles/card.scss';
// import { DragDropContext } from 'react-beautiful-dnd';

const Card = () => {
  return (
    <div className='container exercise-card no-margin'>
      {/* <div className='container' style={{ alignItems: 'normal' }}> */}

      <div
        className='container--column no-margin'
        style={{ flex: 2, alignItems: 'normal', justifyContent: 'normal', textAlign: 'left' }}
      >
        <p style={{ fontWeight: 500, fontSize: '0.9rem', color: '#666', margin: 0 }}>Triceps Pushdown</p>
        <p style={{ fontWeight: 500, fontSize: '0.9rem', color: '#a0a0a0', margin: 0 }}>Sets: 3 | Reps: 10</p>
        <span style={{ textAlign: 'right' }}>
          <i className='fas fa-info-circle' style={{ color: '#aaa', marginRight: '1rem' }}></i>
          <i className='fas fa-trash' style={{ color: '#aaa', marginRight: '1rem' }}></i>
        </span>
        {/* <p style={{ fontWeight: 500, color: '#666' }}>PUSH UPS</p> */}
      </div>
      <div style={{ flex: 1 }}>
        <img src='/images/exercises/pushups.png' alt='push up' style={{ width: '100%', height: 'auto' }} />
      </div>
      {/* </div> */}
      {/* <p className='text--medium--grey bold'>NO EXERCISES FOUND</p> */}
    </div>
  );
};

export default Card;
