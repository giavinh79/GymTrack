import { useState } from 'react';
import Model, { IExerciseData, Muscle } from 'react-body-highlighter';
import { useTranslation } from 'react-i18next';
import { Button, Center, Group, Modal, NumberInput, Space, Tabs, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import kebabCase from 'lodash/kebabCase';

import { useAddRoutineExerciseMutation, useGetExercisesQuery } from 'src/services/exercise';
import { ClickableIcon, RunningLoader } from 'src/shared/components';
import { DEFAULT_REPS, EXERCISE_VALUE_TYPE_TO_ID } from 'src/shared/constants/domain';
import { modalHidden } from 'src/slices/modal/modalSlice';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';
import { EDay, IExercise } from 'src/types';

import { ExerciseDropdown } from './ExerciseDropdown';

interface IAddRoutineExerciseModalProps {
  day: EDay;
}

export const AddRoutineExerciseModal = ({ day }: IAddRoutineExerciseModalProps) => {
  const [selectedExercise, setSelectedExercise] = useState<IExercise | undefined>();
  const [numOfSets, setNumOfSets] = useState<number>(3);
  const [modelView, setModelView] = useState<'posterior' | 'anterior'>('anterior');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: exercises, isFetching } = useGetExercisesQuery();
  const [addRoutineExercise, { isLoading }] = useAddRoutineExerciseMutation();

  const [userId, selectedRoutine] = useAppSelector((state) => [state.context.user.id, state.routines.selectedRoutine]);

  const createDefaultSets = () => {
    const sets = [];

    for (let i = 0; i < numOfSets; i++) {
      sets.push({
        exerciseValueTypeId: EXERCISE_VALUE_TYPE_TO_ID.REPS,
        numReps: DEFAULT_REPS,
      });
    }

    return sets;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (userId && selectedRoutine?.id && selectedExercise) {
        await addRoutineExercise({
          routineId: selectedRoutine.id,
          userId,
          exerciseId: selectedExercise.id,
          addRoutineExercisePayload: {
            day,
            exerciseOrder: selectedRoutine.workout[day].length + 1,
            sets: createDefaultSets(),
          },
        });
        dispatch(modalHidden());
        // @TODO trigger cache invalidation of selected user routine
        // do I really even need to store the API result in a new slice?
        // should be able to just grab it from that API file `services/routine.ts`
      }
    } catch (err) {
      showNotification({
        icon: <i className='fas fa-exclamation' />,
        id: 'create-exercise-error',
        title: 'Error adding an exercise',
        message: 'Please try again in a few seconds or contact our support if you continue having issues.',
      });
      throw err; // for Sentry
    }
  };

  const getExerciseMuscleDataForModel = (): IExerciseData[] => {
    if (selectedExercise == null) return [];

    return [
      {
        name: 'N/A',
        muscles: selectedExercise.musclesUsed.map((musclesUsed) => kebabCase(musclesUsed.name) as Muscle),
      },
    ];
  };

  const isAddButtonDisabled = () => selectedExercise == null && numOfSets == null;

  return (
    <Modal centered opened onClose={() => dispatch(modalHidden())}>
      <form onSubmit={handleSubmit}>
        <Title order={1}>Add Exercise</Title>
        <Space h='md' />
        {isFetching || exercises == null ? (
          <>
            <RunningLoader />
            <Space h='lg' />
          </>
        ) : (
          <>
            <ExerciseDropdown exercises={exercises} setSelectedExercise={setSelectedExercise} />
            <Space h='lg' />
            {selectedExercise && (
              <>
                <Tabs variant='outline' defaultValue='gallery'>
                  <Tabs.List>
                    <Tabs.Tab value='gallery' icon={<i className='fas fa-info-circle' />}>
                      Info
                    </Tabs.Tab>
                    <Tabs.Tab value='messages' icon={<i className='fas fa-dumbbell' />}>
                      Muscles
                    </Tabs.Tab>
                    <Tabs.Tab value='settings' icon={<i className='fas fa-book' />}>
                      Reference
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value='gallery' pt='xs'>
                    <Text size='sm'>{selectedExercise.description}</Text>
                    <Space h='md' />
                    <Center>
                      <img
                        src={selectedExercise?.image.url}
                        alt={t(`domain:EXERCISE.${selectedExercise.name}`) ?? ''}
                        style={{
                          width: '100%',
                          objectFit: 'contain',
                          height: '300px',
                          borderRadius: '10px',
                          backgroundColor: '#e8e8e8',
                        }}
                      />
                    </Center>
                  </Tabs.Panel>

                  <Tabs.Panel value='messages' pt='xs'>
                    <Space h='xs' />
                    <Group position='right' spacing='xs'>
                      <ClickableIcon
                        onClick={() =>
                          setModelView((modelView) => (modelView === 'posterior' ? 'anterior' : 'posterior'))
                        }
                      >
                        <i className='fas fa-sync' style={{ fontSize: '1.5rem' }} />
                      </ClickableIcon>
                    </Group>

                    <Center>
                      <Model type={modelView} style={{ width: '50%' }} data={getExerciseMuscleDataForModel()} />
                    </Center>
                    <Space h='xs' />
                  </Tabs.Panel>

                  <Tabs.Panel value='settings' pt='xs'>
                    Reference Links and Additional Information (TODO)
                    <Space h='xs' />
                  </Tabs.Panel>
                </Tabs>
                <Space h='sm' />
                <NumberInput
                  min={1}
                  defaultValue={3}
                  label='Number of Sets'
                  onChange={(value) => setNumOfSets(value ?? 3)}
                />
              </>
            )}
          </>
        )}
        <Space h='xl' />
        <Button type='submit' disabled={isAddButtonDisabled()} fullWidth loading={isLoading}>
          {t('Add')}
        </Button>
      </form>
    </Modal>
  );
};
