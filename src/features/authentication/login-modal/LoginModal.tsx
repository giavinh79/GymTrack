import React, { ReactElement, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Alert, Button, Group, Modal, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

import { auth } from 'src/auth/firebase';

import { useStyles } from './LoginModal.styles';

interface ILoginModalProps {
  showLoginModal: boolean;
  setShowLoginModal: (type: boolean) => void;
}

export const LoginModal = ({ showLoginModal, setShowLoginModal }: ILoginModalProps): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [serverError, setServerError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { classes } = useStyles();

  const form = useForm<{ email: string; password: string }>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      setIsLoggingIn(true);
      await signInWithEmailAndPassword(auth, form.values.email, form.values.password);
      localStorage.setItem('expectSignIn', '1');
      navigate('/home');
    } catch (err) {
      setServerError(true);
      console.log(err);
    }
  };

  const handleCloseModal = (): void => {
    setShowLoginModal(false);
    form.reset();
  };

  const isFormDirty = (): boolean => {
    return Object.values(form.values).some((value) => value.length === 0);
  };

  return (
    <Modal opened={showLoginModal} onClose={handleCloseModal} centered padding={35}>
      <form onSubmit={handleSubmit} autoComplete='on'>
        {serverError && (
          <Alert color='red' className='animate__fadeInDown login-form__alert'>
            {t('landing:LOGIN.MODAL.ERROR.AUTH')}
          </Alert>
        )}
        <Group position='center' direction='column'>
          <Title order={1} className={classes.header}>
            {t('landing:LOGIN.MODAL.HEADER')}
          </Title>
          <i className={`fas fa-users ${classes.userIcon}`} />
          <Space h='xl' />
        </Group>
        <TextInput
          {...form.getInputProps('email')}
          id='loginEmail'
          type='email'
          name='username'
          label={t('landing:LOGIN.MODAL.EMAIL_LABEL')}
          placeholder={t('landing:LOGIN.MODAL.EMAIL_PLACEHOLDER')}
          required
          classNames={{
            input: serverError ? 'animate__animated animate__shakeX input-error' : '',
          }}
          data-autofocus
          onFocus={() => setServerError(false)}
        />
        <Space h='md' />
        <TextInput
          {...form.getInputProps('password')}
          id='loginPassword'
          type='password'
          name='password'
          label={t('landing:LOGIN.MODAL.PASSWORD_LABEL')}
          placeholder={t('landing:LOGIN.MODAL.PASSWORD_PLACEHOLDER')}
          required
          classNames={{
            input: serverError ? 'animate__animated animate__shakeX input-error' : '',
          }}
          onFocus={() => setServerError(false)}
        />
        <Space h='md' />
        <Group position='right' spacing='xs'>
          <Link to={'/todo'} target='_blank'>
            <Text color='red' size='xs'>
              {t('landing:LOGIN.MODAL.FORGOT_PASSWORD')}
            </Text>
          </Link>
          <i className={`fa fa-key ${classes.keyIcon}`} aria-hidden='true' />
        </Group>
        <Space h='xl' />
        <Button type='submit' disabled={isFormDirty()} fullWidth loading={isLoggingIn}>
          {t('landing:LOGIN.MODAL.PRIMARY_BUTTON')}
        </Button>
      </form>
    </Modal>
  );
};
