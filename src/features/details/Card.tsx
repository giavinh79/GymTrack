const Card = () => {
  return (
    <div className='container exercise-card no-margin'>
      {/* <div className='container' style={{ alignItems: 'normal' }}> */}
      <div style={{ flex: 5 }}>
        <img src='/images/exercises/pushups.png' alt='push up' style={{ width: '100%', height: 'auto' }} />
      </div>
      <div
        className='container--column no-margin'
        style={{ flex: 7, alignItems: 'normal', justifyContent: 'normal', textAlign: 'left', height: '100%' }}
      >
        <p style={{ fontWeight: 500, fontSize: '0.9rem', color: '#666', margin: 0 }}>Triceps Pushdown</p>
        <p style={{ fontWeight: 500, fontSize: '0.9rem', color: '#a0a0a0', margin: 0 }}>Sets: 3 | Reps: 10</p>
        <span
          style={{
            textAlign: 'right',
            paddingTop: '1rem',
            marginTop: 'auto',
            marginRight: '1rem',
            borderTop: '1px solid #e8e8e8',
          }}
        >
          <i className='fas fa-info-circle'></i>
          <i className='fas fa-trash'></i>
        </span>
        {/* <p style={{ fontWeight: 500, color: '#666' }}>PUSH UPS</p> */}
      </div>

      {/* </div> */}
      {/* <p className='text--medium--grey bold'>NO EXERCISES FOUND</p> */}
    </div>
  );
};

export default Card;
