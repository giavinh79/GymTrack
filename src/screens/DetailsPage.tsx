import { useLocation } from 'react-router';
import { Container, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap';

import WorkoutList from 'src/features/details/WorkoutList';

export const DetailsPage = () => {
  const { pathname } = useLocation();
  const day = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

  return (
    <Container
      fluid='lg'
      style={{
        textAlign: 'center',
        marginLeft: 'auto !important',
        marginRight: 'auto !important',
        padding: '2rem 1rem',
        maxWidth: '50rem',
      }}>
      <div className='container--tight' style={{ marginBottom: '1rem' }}>
        <InputGroup style={{ flex: 1 }}>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
          <Input defaultValue={day.charAt(0).toUpperCase() + day.slice(1)} />
        </InputGroup>
        <div className='container--tight button--blue' style={{ borderRadius: '5px', marginRight: 0 }}>
          <i className='fas fa-save button__icon'></i>
          <p className='button__text'>SAVE</p>
        </div>
      </div>
      <div className='container--tight button--green' style={{ borderRadius: '5px', margin: '0 0 1rem 0' }}>
        <i className='fas fa-plus button__icon'></i>
        <p className='button__text'>ADD EXERCISE</p>
      </div>
      {/* <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='bicepcurl' stroke='#8884d8' activeDot={{ r: 8 }} />
          <Line type='monotone' dataKey='benchpress' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer> */}
      {/* <p style={{ fontWeight: 500, fontSize: '1.2rem', color: '#5a5a5a', margin: '2rem 0' }}>EXERCISES</p> */}
      <WorkoutList />
    </Container>
  );
};
