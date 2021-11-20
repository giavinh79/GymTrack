import React from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import { selectLoading } from 'src/slices/general/loadingSlice';

import './styles/workout-card.scss';

interface IWorkoutCardProps {
  backgroundColor: string;
  day: string;
  data: any;
  iconColor: string;
  textColor: string;
  text?: string;
  title: string;
}

const days: Record<string, any> = {
  MON: 'monday',
  TUES: 'tuesday',
  WED: 'wednesday',
  THUR: 'thursday',
  FRI: 'friday',
  SAT: 'saturday',
  SUN: 'sunday',
};

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
  const loadingState = useSelector(selectLoading);

  const handleDetails = () => {
    navigate(`/home/details/${days[day]}`);
  };

  return (
    <div className='workout-card'>
      <div className='workout-card__day' style={{ color, backgroundColor }}>
        <p style={{ margin: 0 }}>{day}</p>
        <i className='fas fa-dumbbell hide-mobile' style={{ color: iconColor }}></i>
      </div>
      <div className='workout-card__info'>
        {loadingState ? (
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <Skeleton count={4} />
          </div>
        ) : (
          <>
            <p style={{ fontSize: '2rem', fontWeight: 700 }}>{title}</p>
            <p style={{ color: '#606060' }}>{exercises.length === 0 ? "Placeholder for list of this day's exercises" : text}</p>
          </>
        )}
        <Button size='lg' className='workout-card__btn' disabled={loadingState} onClick={handleDetails}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
