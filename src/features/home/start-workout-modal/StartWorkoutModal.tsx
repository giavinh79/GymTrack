import { ReactElement } from 'react';
import { Button, Space, Title } from '@mantine/core';

import { EnhancedModal } from 'src/shared/components';

export const StartWorkoutModal = (): ReactElement => {
  return (
    <EnhancedModal>
      <Title order={1}>New Routine</Title>
      <Space h='md' />
      <p>Are you sure you want to start the workout? Your currently selected routine is: </p>
      <Space h='xl' />
      <Button type='submit' fullWidth loading>
        Start Workout
      </Button>
    </EnhancedModal>
  );
};
