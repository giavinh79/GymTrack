import React from 'react';
import { Button } from 'reactstrap';
import { selectLoading } from '../../../slices/loadingSlice';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import './styles/workout-card.scss';
import { useHistory } from 'react-router-dom';

interface Props {
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
  THURS: 'thursday',
  FRI: 'friday',
  SAT: 'saturday',
  SUN: 'sunday',
};

const WorkoutCard: React.FC<Props> = ({
  backgroundColor,
  day,
  data: { exercises },
  iconColor,
  textColor: color,
  text,
  title,
}) => {
  const history = useHistory();
  const loadingState = useSelector(selectLoading);

  const handleDetails = () => {
    history.push(`/home/details/${days[day]}`);
  };

  return (
    <div className='workout-card'>
      <div className='workout-card__day' style={{ color, backgroundColor }}>
        <p style={{ margin: 0 }}>{day}</p>
        <i className='fas fa-dumbbell hide-mobile' style={{ color: iconColor }}></i>
      </div>
      <div className='workout-card__info'>
        {loadingState ? (
          <div style={{ width: '100%' }}>
            <Skeleton count={4} />
          </div>
        ) : (
          <>
            <p style={{ fontSize: '2rem', fontWeight: 700 }}>{title}</p>
            <p style={{ color: '#606060' }}>
              {exercises.length === 0 ? "Placeholder for list of this day's exercises" : text}
            </p>
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
