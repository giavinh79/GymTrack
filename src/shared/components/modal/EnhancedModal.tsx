import React, { memo, ReactElement, useEffect, useState } from 'react';
import { Modal, ModalProps } from '@mantine/core';

import { useIsMounted } from 'src/shared/hooks/useIsMounted';
import { modalHidden, selectModal } from 'src/slices';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';

interface IEnhancedModalProps extends Omit<ModalProps, 'onClose' | 'opened' | 'onSubmit'> {
  onClose?: () => Promise<void>;
  onSubmit?: (e: React.FormEvent<HTMLDivElement>) => Promise<void>;
}

/**
 * EnhancedModal component is a project-specific wrapper around the Mantine modal that automates boilerplate around opening and closing states
 * This also helps ensure that animations & transitions for opening and closing the modal are displayed correctly
 * (we first toggle the modal display state followed up by toggling the state in the parent component that renders the modal)
 */
const EnhancedModal = memo(function EnhancedModal(props: IEnhancedModalProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const isMounted = useIsMounted();

  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    isMounted && setIsOpen(false);
    setTimeout(() => {
      props.onClose ? props.onClose() : dispatch(modalHidden());
    }, 150);
  };

  useEffect(() => {
    // animate the modal in
    const timeout = setTimeout(() => {
      isMounted.current && setIsOpen(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [dispatch, isMounted, modal]);

  const modalProps = {
    ...props,
    opened: isOpen,
    onClose: handleCloseModal,
    onSubmit: async (e: React.FormEvent<HTMLDivElement>) => {
      if (props.onSubmit) {
        await props.onSubmit(e);
      }
      handleCloseModal();
    },
  };

  return <Modal {...modalProps} />;
});

export { EnhancedModal };
