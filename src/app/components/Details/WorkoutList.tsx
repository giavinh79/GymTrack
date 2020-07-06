import React from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';

const WorkoutList = () => {
  return (
    <div
      className='container'
      style={{
        height: 'auto',
        backgroundColor: '#f3f3f3',
        marginTop: '2rem',
        border: '1px solid #e8e8e8',
        alignItems: 'normal',
        padding: '1rem 0',
      }}
    >
      {/* <div className='container' style={{ alignItems: 'normal' }}> */}
      <div style={{ flex: 1 }}>
        <img src='/images/exercises/pushups.png' alt='push up' style={{ width: '100%', height: 'auto' }} />
      </div>
      <div
        className='container--column no-margin'
        style={{ flex: 2, alignItems: 'normal', justifyContent: 'normal', textAlign: 'left' }}
      >
        <p style={{ fontWeight: 500, fontSize: '0.9rem', color: '#666', margin: 0 }}>Triceps Pushdown</p>
        <p style={{ fontWeight: 500, fontSize: '0.9rem', color: '#bbb', margin: 0 }}>Sets: 3 | Reps: 10</p>
        <span style={{ textAlign: 'right' }}>
          <i className='fas fa-trash' style={{ color: '#aaa', marginRight: '1rem' }}></i>
          <i className='fas fa-info-circle' style={{ color: '#aaa', marginRight: '1rem' }}></i>
        </span>
        {/* <p style={{ fontWeight: 500, color: '#666' }}>PUSH UPS</p> */}
      </div>
      {/* </div> */}
      {/* <p className='text--medium--grey bold'>NO EXERCISES FOUND</p> */}
    </div>
  );
};

export default WorkoutList;
