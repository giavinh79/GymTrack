import { Container } from '@mantine/core';
import { useLocation } from 'react-router';

import WorkoutList from 'src/features/details/WorkoutList';

export const DetailsPage = () => {
  const { pathname } = useLocation();
  const day = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

  return (
    <Container
      style={{
        textAlign: 'center',
        marginLeft: 'auto !important',
        marginRight: 'auto !important',
        padding: '2rem 1rem',
        maxWidth: '50rem',
      }}
    >
      {/* <div className='container--tight' style={{ marginBottom: '1rem' }}>
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
      </div> */}
      <WorkoutList />
    </Container>
  );
};
