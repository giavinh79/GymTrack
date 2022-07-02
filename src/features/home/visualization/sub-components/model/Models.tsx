import Model, { IExerciseData, IMuscleStats } from 'react-body-highlighter';
import { Group } from '@mantine/core';

const data: IExerciseData[] = [
  { name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] },
  { name: 'Push Ups', muscles: ['chest'] },
];

export const Models = () => {
  const handleModelClick = ({ muscle, data }: IMuscleStats) => {
    const { exercises, frequency } = data;

    const message = `You clicked the ${muscle}! You've worked out this muscle ${frequency} times through the following exercises: ${JSON.stringify(
      exercises
    )}`;
    alert(message);
  };

  return (
    <Group position='center' m='lg'>
      <Model data={data} type='posterior' style={{ margin: '0 2rem' }} onClick={handleModelClick} />
      <Model data={data} style={{ margin: '0 2rem' }} onClick={handleModelClick} />
    </Group>
  );
};
