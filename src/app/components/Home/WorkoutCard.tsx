import React from 'react';
import { Button } from 'reactstrap';
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
  return (
    <div className='workout-card'>
      <div className='workout-card__day' style={{ color, backgroundColor }}>
        <p style={{ margin: 0 }}>{day}</p>
        <i className='fas fa-dumbbell hide-mobile' style={{ color: iconColor }}></i>
      </div>
      <div className='workout-card__info'>
        <p style={{ fontSize: '2rem', fontWeight: 700 }}>{title}</p>
        <p style={{ color: '#606060' }}>{text}</p>
        <Button size='lg' className='workout-card__btn'>
          Details
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
