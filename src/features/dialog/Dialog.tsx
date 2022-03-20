import { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { modalHidden } from 'src/slices/modal/modalSlice';

interface IDialogProps {
  type?: 'confirm' | 'info' | 'delete';
  title: string;
  text: string;
  onConfirm: () => void;
}

/* Object for conditional renders depending on dialog type */
const dialog = {
  delete: {
    icon: 'fas fa-exclamation-circle',
    buttonColor: '#cd4545',
  },
  confirm: {
    icon: 'fas fa-exclamation-circle',
    buttonColor: '#736E9E',
  },
  info: {
    icon: 'fas fa-exclamation-circle',
    buttonColor: '#736E9E',
  },
};

export const Dialog: FunctionComponent<IDialogProps> = ({ title, text, type = 'info', onConfirm }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(modalHidden());
    }, 200);
  };

  const handleConfirm = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(modalHidden());
      onConfirm();
    }, 200);
  };

  return (
    <></>
    // <Modal isOpen={open} toggle={handleClose} className='dialog' centered>
    //   <ModalBody>
    //     <div>
    //       <i className={dialog[type].icon}></i>
    //     </div>
    //     <div>
    //       <p className='dialog__title'>{title}</p>
    //       <p className='dialog__text'>{text}</p>
    //     </div>
    //   </ModalBody>
    //   <ModalFooter style={{ border: 'none' }}>
    //     <Button color='secondary' size='sm' onClick={handleClose}>
    //       CANCEL
    //     </Button>
    //     <Button
    //       size='sm'
    //       style={{
    //         backgroundColor: dialog[type].buttonColor,
    //       }}
    //       onClick={handleConfirm}
    //     >
    //       CONFIRM
    //     </Button>
    //   </ModalFooter>
    // </Modal>
  );
};
