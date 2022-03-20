import Card from './Card';

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
