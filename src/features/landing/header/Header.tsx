import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Center, Space } from '@mantine/core';

import { LoginModal } from 'src/features/authentication';
import { Logo, ThemeToggle } from 'src/shared/components';
import { EModal, modalHidden, modalShown, selectModal } from 'src/slices';

import { useHeaderStyles } from './Header.styles';

export const Header = (): ReactElement => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  const { classes } = useHeaderStyles();

  return (
    <>
      {modal === EModal.LOGIN && <LoginModal onClose={() => dispatch(modalHidden())} />}
      <Center inline className={classes.container}>
        <Logo enableLink />
        <div className={classes.rightSection}>
          <ThemeToggle />
          <Space w='md' />
          <Button leftIcon={<i className='fas fa-sign-in-alt' />} onClick={() => dispatch(modalShown(EModal.LOGIN))}>
            {t('common:AUTH.LOGIN')}
          </Button>
        </div>
      </Center>
    </>
  );
};
