import React, { FunctionComponent, useState } from 'react';
import { Button, Dropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './StartWorkoutModalStyles.css';

interface IProps {
  setStartModal: any;
}

const StartWorkoutModal: FunctionComponent<IProps> = ({ setStartModal }) => {
  const toggle = () => {};
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStartModal(false);
    }, 200);
  };

  return (
    <Modal isOpen={open} toggle={handleClose} className='start-modal'>
      <ModalHeader style={{ border: 'none', backgroundColor: '#736E9E', color: 'white' }}>
        <strong>BigMon Routine</strong>
        <i className='fas fa-dumbbell' style={{ color: '#efefef', marginLeft: 'auto' }}></i>
      </ModalHeader>

      <ModalBody>
        {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> */}
        <p>
          <strong>Today's Workout:</strong> Push Day (Monday)
        </p>

        <p>
          <strong>Exercises:</strong> Bench Press, Dumb-bell Curl, Jumping Jacks, Ab Wheel
        </p>
        {/* <div style={{ height: 0, width: '100%', borderTop: '1px solid #ccc', marginBottom: '1rem' }}></div> */}
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
        {/* </div> */}
      </ModalBody>
      <ModalFooter style={{ border: 'none' }}>
        <Button
          // color='primary'
          style={{
            backgroundColor: '#736E9E',
          }}
        >
          Start Workout
        </Button>{' '}
        <Button color='secondary'>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default StartWorkoutModal;
