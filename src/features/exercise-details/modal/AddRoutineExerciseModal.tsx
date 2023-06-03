import { useState } from 'react';
import Model, { IExerciseData, Muscle } from 'react-body-highlighter';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Center, Group, Modal, NumberInput, Space, Tabs, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import kebabCase from 'lodash/kebabCase';

import { useAddRoutineExerciseMutation, useGetExercisesQuery } from 'src/services/exercise';
import { useGetSelectedUserRoutineQuery } from 'src/services/routine';
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
  const [modelView, setModelView] = useState<'posterior' | 'anterior'>('anterior');
  const [numOfSets, setNumOfSets] = useState(3);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data: exercises, isFetching } = useGetExercisesQuery();
  const [addRoutineExercise, { isLoading }] = useAddRoutineExerciseMutation();

  const [userId] = useAppSelector((state) => [state.context.user.id]);
  const { data: routine } = useGetSelectedUserRoutineQuery(userId);

  const createDefaultSets = () =>
    Array.from(Array(3), () => ({
      exerciseValueTypeId: EXERCISE_VALUE_TYPE_TO_ID.REPS,
      numReps: DEFAULT_REPS,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (userId && routine?.id && selectedExercise) {
        await addRoutineExercise({
          routineId: routine.id,
          userId,
          exerciseId: selectedExercise.id,
          addRoutineExercisePayload: {
            day,
            exerciseOrder: routine.workout[day].length + 1,
            sets: createDefaultSets(),
          },
        });
        dispatch(modalHidden());
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

  const isExerciseAlreadyInRoutine = routine?.workout[day].some(
    (e) => selectedExercise && e.exerciseId === selectedExercise.id
  );
  const isAddButtonDisabled = (selectedExercise == null && numOfSets == null) || isExerciseAlreadyInRoutine;

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
        {isExerciseAlreadyInRoutine && (
          <>
            <Alert icon={<i className='fas fa-exclamation-circle' />} color='red' variant='filled'>
              This exercise is already added to the routine
            </Alert>
            <Space h='sm' />
          </>
        )}
        <Button type='submit' disabled={isAddButtonDisabled} fullWidth loading={isLoading}>
          {t('Add')}
        </Button>
      </form>
    </Modal>
  );
};
