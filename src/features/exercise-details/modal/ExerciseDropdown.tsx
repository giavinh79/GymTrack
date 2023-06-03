import { forwardRef, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Group, Select, Text } from '@mantine/core';

import type { IExercise } from 'src/types';

interface IItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image?: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, IItemProps>(function SelectItem(
  { label, description, ...others }: IItemProps,
  ref
) {
  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size='sm'>{label}</Text>
          <Text size='xs' color='dimmed'>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  );
});

interface IExerciseDropdownProps {
  exercises: IExercise[];
  setSelectedExercise: (exercise: IExercise | undefined) => void;
}

export const ExerciseDropdown = ({ exercises, setSelectedExercise }: IExerciseDropdownProps): ReactElement => {
  const { t } = useTranslation(['common']);

  const mapExerciseToSelectData = () => {
    const dropdownData = exercises.map((exercise) => ({
      image: exercise.image.url,
      label: t(`domain:EXERCISE.${exercise.name}`),
      value: exercise.id.toString(),
      description: exercise.description,
    }));

    dropdownData.sort((dataA, dataB) => dataA.label.localeCompare(dataB.label));
    return dropdownData;
  };

  const handleSelectChange = (exerciseId: string) => {
    setSelectedExercise(exercises.find((exercise) => exercise.id === parseInt(exerciseId), 10));
  };

  return (
    <Select
      label='Select an exercise'
      placeholder='Pick one'
      itemComponent={SelectItem}
      data={mapExerciseToSelectData()}
      searchable
      maxDropdownHeight={400}
      nothingFound={t('common:ERROR.GENERAL')}
      onChange={handleSelectChange}
      withAsterisk
    />
  );
};
