import { ReactElement, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Center } from '@mantine/core';

import { Logo } from 'src/shared/components';
import { LoginModal } from 'src/features';

import { useStyles } from './Header.styles';

export const Header = (): ReactElement => {
  const { t } = useTranslation();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const { classes } = useStyles();

  return (
    <>
      <Center inline className={classes.container}>
        <Logo />
        <Button
          leftIcon={<i className='fas fa-sign-in-alt' />}
          onClick={() => setShowLoginModal(true)}
          className={classes.loginButton}>
          {t('common:AUTH.LOGIN')}
        </Button>
      </Center>
      <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
    </>
  );
};
