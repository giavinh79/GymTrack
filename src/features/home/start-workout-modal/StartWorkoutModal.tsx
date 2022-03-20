import { ReactElement, useState } from 'react';
import { Modal } from '@mantine/core';

interface IStartWorkoutModalProps {
  setShowStartWorkoutModal: (showStartWorkoutModal: boolean) => void;
}

export const StartWorkoutModal = ({ setShowStartWorkoutModal }: IStartWorkoutModalProps): ReactElement => {
  const [open, setOpen] = useState(true);

  const handleClose = (): void => {
    setOpen(false);
    setTimeout(() => {
      setShowStartWorkoutModal(false);
    }, 200);
  };

  return (
    <Modal opened={open} onClose={handleClose}>
      {/* <ModalHeader style={{ border: 'none', backgroundColor: '#736E9E', color: 'white' }}>
        <strong>BigMon Routine</strong>
        <i className='fas fa-dumbbell' style={{ color: '#efefef', marginLeft: 'auto' }}></i>
      </ModalHeader>

      <ModalBody>
        <p>
          <strong>Today's Workout:</strong> Push Day (Monday)
        </p>

        <p>
          <strong>Exercises:</strong> Bench Press, Dumb-bell Curl, Jumping Jacks, Ab Wheel
        </p>
        <p style={{ marginTop: '3rem' }}>Change workout?</p>
        <Dropdown>
          <DropdownToggle tag='span' data-toggle='dropdown'>
            Custom Dropdown Content
          </DropdownToggle>
          <DropdownMenu>
            <div onClick={toggle}>Custom dropdown item</div>
            <div onClick={toggle}>Custom dropdown item</div>
            <div onClick={toggle}>Custom dropdown item</div>
            <div onClick={toggle}>Custom dropdown item</div>
          </DropdownMenu>
        </Dropdown>
      </ModalBody>
      <ModalFooter style={{ border: 'none' }}>
        <Button
          style={{
            backgroundColor: '#736E9E',
          }}>
          Start Workout
        </Button>{' '}
        <Button color='secondary'>Cancel</Button>
      </ModalFooter> */}
    </Modal>
  );
};
