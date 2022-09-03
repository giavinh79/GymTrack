import { memo, ReactElement, useEffect, useState } from 'react';
import { Modal, ModalProps } from '@mantine/core';

import { useIsMounted } from 'src/shared/hooks/useIsMounted';
import { modalHidden, selectModal } from 'src/slices';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';

interface IEnhancedModalProps extends Omit<ModalProps, 'onClose' | 'opened'> {
  onClose?: () => void;
}

/**
 * EnhancedModal component is a project-specific wrapper around the Mantine modal that automates boilerplate around opening and closing states
 */
const EnhancedModal = memo(function EnhancedModal(props: IEnhancedModalProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const isMounted = useIsMounted();

  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    isMounted && setIsOpen(false);
  };

  useEffect(() => {
    // animate the modal in
    setTimeout(() => {
      isMounted.current && setIsOpen(true);
    }, 50);
  }, [dispatch, isMounted, modal]);

  const modalProps = {
    ...props,
    opened: isOpen,
    onClose: () => {
      handleCloseModal();
      props.onClose ? setTimeout(props.onClose, 150) : dispatch(modalHidden());
    },
  };

  return <Modal {...modalProps} onSubmit={() => dispatch(modalHidden())} />;
});

export { EnhancedModal };
