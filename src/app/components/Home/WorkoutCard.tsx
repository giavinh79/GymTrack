import React from 'react';
import { Button } from 'reactstrap';
import { selectLoading } from '../../../slices/loadingSlice';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import './styles/workout-card.scss';

interface Props {
  backgroundColor: string;
  day: string;
  iconColor: string;
  textColor: string;
  text?: string;
  title: string;
}

const WorkoutCard: React.FC<Props> = ({ backgroundColor, day, iconColor, textColor: color, text, title }) => {
  const loadingState = useSelector(selectLoading);

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
            <p style={{ color: '#606060' }}>{text}</p>
          </>
        )}
        <Button size='lg' className='workout-card__btn' disabled={loadingState}>
          Details
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
