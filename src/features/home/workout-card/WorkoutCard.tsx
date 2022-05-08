import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Text, Title } from '@mantine/core';

import { selectRoutinesLoading } from 'src/slices/gym/routine/routinesLoadingSlice';
import { ThemedSkeleton } from 'src/shared/components';

import { useWorkoutCardStyles } from './WorkoutCard.styles';

interface IWorkoutCardProps {
  backgroundColor: string;
  day: string;
  data: any;
  iconColor: string;
  textColor: string;
  text?: string;
  title: string;
}

export const WorkoutCard: React.FC<IWorkoutCardProps> = ({
  backgroundColor,
  day,
  data: { exercises },
  iconColor,
  textColor: color,
  text,
  title,
}) => {
  const navigate = useNavigate();
  const loadingState = useSelector(selectRoutinesLoading);

  const { classes } = useWorkoutCardStyles();

  const handleDetails = () => {
    // @TODO - turn into button link for accessibility - mantine supports this
    navigate(`/home/details/${day.toLowerCase()}`);
  };

  return (
    <div className={classes.card}>
      <div className={classes.dayAbbreviation} style={{ color, backgroundColor }}>
        <p>{day}</p>
        <i className='fas fa-dumbbell' style={{ color: iconColor }} />
      </div>
      <div className={classes.cardInfo}>
        {loadingState ? (
          <div className={classes.skeletonContainer}>
            <ThemedSkeleton count={4} />
          </div>
        ) : (
          <>
            <Title mb='sm' style={{ fontWeight: 700 }}>
              {title}
            </Title>
            <Text color='dimmed' m='sm'>
              {exercises.length === 0 ? "Placeholder for list of this day's exercises" : text}
            </Text>
          </>
        )}
        <Button
          color='green'
          size='lg'
          loading={loadingState}
          onClick={handleDetails}
          className={classes.detailsButton}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
