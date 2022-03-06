import { Container } from 'reactstrap';
import { useDispatch } from 'react-redux';

import emptySvg from 'src/assets/images/landing/landing_page_fitness.svg';
import { showAddRoutineModal } from 'src/slices/modal';

import './styles/no-routine-placeholder.scss';

export const NoRoutinePlaceholder = () => {
  const dispatch = useDispatch();

  return (
    <Container fluid='lg' className='empty'>
      <p className='empty__title'>NO ROUTINES FOUND</p>
      <div className='container'>
        <p className='empty__subtitle'>Add your first workout routine!</p>
        <div className='container--tight button--green' onClick={() => dispatch(showAddRoutineModal())}>
          <i className='fas fa-plus button__icon' onClick={() => dispatch(showAddRoutineModal())}></i>
          <p className='button__text'>CREATE</p>
        </div>
      </div>
      <img src={emptySvg} alt='empty' />
    </Container>
  );
};
