import { Container } from '@mantine/core';
import { useLocation } from 'react-router';

import { WorkoutList } from 'src/features/details/workout-list/WorkoutList';

export const DetailsPage = () => {
  const { pathname } = useLocation();
  // const day = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

  return (
    <Container size='lg'>
      <WorkoutList
        data={[
          {
            name: 'Benchpress',
            sets: 3,
            reps: 8,
            symbol: 'PIC1',
          },
          {
            name: 'Bicep Curls',
            sets: 4,
            reps: 10,
            symbol: 'PIC2',
          },
        ]}
      />
    </Container>
  );
};
