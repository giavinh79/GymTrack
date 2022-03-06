import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group, Modal, PasswordInput, Space, TextInput, Title } from '@mantine/core';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useTranslation } from 'react-i18next';
import capitalize from 'lodash/capitalize';

import { auth } from 'src/auth/firebase';
import { register } from 'src/http/auth';
import { MIN_PASSWORD_LENGTH } from 'src/shared/constants';

import { Logo } from 'src/shared/components';

interface ISignupModalProps {
  setDisplaySignupModal: (type: boolean) => void;
  signupEmail: string;
}

export const SignupModal = ({ setDisplaySignupModal, signupEmail }: ISignupModalProps): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState(signupEmail);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setTimeout(() => {
      setDisplaySignupModal(false);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent<any>): Promise<void> => {
    try {
      e.preventDefault();
      setIsLoggingIn(true);

      await register({ email, password });
      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem('expectSignIn', '1');
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const isPasswordTooShort = () =>
    password.length < MIN_PASSWORD_LENGTH || passwordConfirm.length < MIN_PASSWORD_LENGTH;

  const isPasswordVerified = (): boolean => {
    return password.length >= MIN_PASSWORD_LENGTH && password === passwordConfirm;
  };

  return (
    <Modal opened={isModalOpen} onClose={handleCloseModal} centered size='500px' padding={35}>
      <form onSubmit={handleSubmit}>
        <Group position='center' direction='column'>
          <Logo />
          <Title order={1}>{t('landing:SIGNUP.MODAL.TITLE')}</Title>
        </Group>
        <Space h='xl' />
        <TextInput
          type='email'
          name='signup-email'
          id='signupEmail'
          label={t('landing:SIGNUP.MODAL.EMAIL')}
          value={email}
          autoComplete='none'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Space h='md' />
        <PasswordInput
          data-autofocus
          name='signup-password'
          id='signupPassword'
          autoComplete='new-password'
          placeholder={t('landing:SIGNUP.MODAL.PASSWORD_PLACEHOLDER')}
          label={t('landing:SIGNUP.MODAL.PASSWORD')}
          description={capitalize(t('landing:SIGNUP.MODAL.PASSWORD_MIN_LENGTH_WARNING'))}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={isPasswordVerified()}
          required
        />
        <Space h='md' />
        <PasswordInput
          name='signup-password-confirm'
          id='signupPasswordConfirm'
          autoComplete='new-password'
          placeholder={t('landing:SIGNUP.MODAL.CONFIRM_PASSWORD')}
          label={t('landing:SIGNUP.MODAL.CONFIRM_PASSWORD')}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          aria-invalid={isPasswordVerified()}
          required
        />
        <Space h='md' />
        <Group position='right' spacing={0} style={{ height: '1.5rem' }}>
          {isPasswordVerified() ? (
            <i className='fas fa-check' style={{ color: 'green' }} />
          ) : (
            <>
              <p className='text--small' role='alert'>
                {isPasswordTooShort()
                  ? t('landing:SIGNUP.MODAL.PASSWORD_MIN_LENGTH_WARNING')
                  : t('landing:SIGNUP.MODAL.PASSWORDS_ARE_DIFFERENT')}
              </p>
              <i className='fas fa-times' style={{ color: 'red' }} />
            </>
          )}
        </Group>
        <Space h='xl' />
        <Button
          disabled={!isPasswordVerified()}
          type='submit'
          fullWidth
          loading={isLoggingIn}
          style={
            isPasswordVerified()
              ? {
                  backgroundImage: 'linear-gradient(-225deg, #691d8c 0%, #7918f2 48%, #4801ff 100%)',
                }
              : {}
          }>
          {t('landing:SIGNUP.MODAL.SUBMIT_BUTTON')}
        </Button>
      </form>
    </Modal>
  );
};
