import React from 'react';
import Card from './Card';
// import { DragDropContext } from 'react-beautiful-dnd';

const WorkoutList = () => {
  return (
    <div
      className='container--no-margin'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <Card />
      <Card />
    </div>
  );
};

export default WorkoutList;
