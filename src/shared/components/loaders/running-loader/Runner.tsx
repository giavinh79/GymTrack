import './runner.css';

export const Runner = () => {
  return (
    <div className='running'>
      <div className='runner'>
        <div className='runner-body'>
          <div className='arm behind'></div>
          <div className='arm front'></div>
          <div className='leg behind'></div>
          <div className='leg front'></div>
        </div>
      </div>
    </div>
  );
};
