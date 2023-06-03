import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, Title } from '@mantine/core';
import capitalize from 'lodash/capitalize';

import { IWorkoutCard } from 'src/pages/home/constants';
import { useGetSelectedUserRoutineQuery } from 'src/services/routine';
import { ThemedSkeleton } from 'src/shared/components';
import { selectContext } from 'src/slices';
import { useAppSelector } from 'src/stores/hooks';
import { IRoutineDayExercise } from 'src/types';

import { useWorkoutCardStyles } from './WorkoutCard.styles';

interface IWorkoutCardProps {
  card: IWorkoutCard;
  exercises: IRoutineDayExercise[];
}

export const WorkoutCard: React.FC<IWorkoutCardProps> = ({ card, exercises }: IWorkoutCardProps) => {
  const { backgroundColor, day, iconColor, textColor: color, text, title } = card;

  const navigate = useNavigate();
  const context = useAppSelector(selectContext);
  const { isFetching } = useGetSelectedUserRoutineQuery(context.user.id);

  const { classes } = useWorkoutCardStyles();

  const handleDetails = () => {
    // @TODO - turn into button link for accessibility - mantine supports this
    navigate(`/home/details/${day.toLowerCase()}`);
  };

  return (
    <div className={classes.card}>
      <div className={classes.dayAbbreviation} style={{ color, backgroundColor }}>
        <p>{title}</p>
        <i className='fas fa-dumbbell' style={{ color: iconColor }} />
      </div>
      <div className={classes.cardInfo}>
        {isFetching ? (
          <div className={classes.skeletonContainer}>
            <ThemedSkeleton count={4} />
          </div>
        ) : (
          <>
            <Title mb='sm' style={{ fontWeight: 700 }}>
              {capitalize(day)}
            </Title>
            <Text color='dimmed' m='sm'>
              {exercises.length === 0 ? 'Rest Day' : text}
            </Text>
          </>
        )}
        <Button color='green' size='lg' loading={isFetching} onClick={handleDetails} className={classes.detailsButton}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
