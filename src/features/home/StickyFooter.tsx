import React from 'react';

const StickyFooter = () => {
  return (
    <div
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
    </div>
  );
};

export default StickyFooter;
