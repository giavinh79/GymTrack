import { memo, ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalProps } from '@mantine/core';

import { useIsMounted } from 'src/shared/hooks/useIsMounted';
import { EModal, modalHidden, selectModal } from 'src/slices';

interface IEnhancedModalProps extends Omit<ModalProps, 'onClose' | 'opened'> {
  onClose?: () => void;
}

/**
 * EnhancedModal component is a project-specific wrapper around the Mantine modal that automates boilerplate around opening and closing states
 */
const EnhancedModal = memo(function EnhancedModal(props: IEnhancedModalProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const isMounted = useIsMounted();

  const modal = useSelector(selectModal);
  const dispatch = useDispatch();

  const handleCloseModal = (): void => {
    isMounted && setIsOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      isMounted.current && setIsOpen(true);
    }, 50);

    return () => {
      if (modal !== EModal.NONE) dispatch(modalHidden());
    };
  }, [dispatch, isMounted, modal]);

  const modalProps = {
    ...props,
    opened: isOpen,
    onClose: () => {
      handleCloseModal();
      props.onClose && setTimeout(props.onClose, 150);
    },
  };

  return <Modal {...modalProps} />;
});

export { EnhancedModal };
