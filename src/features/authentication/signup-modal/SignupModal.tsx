import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Button, Group, PasswordInput, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import capitalize from 'lodash/capitalize';

import { auth } from 'src/auth/firebase';
import { register } from 'src/services/auth';
import { EnhancedModal, Logo } from 'src/shared/components';
import { MIN_PASSWORD_LENGTH } from 'src/shared/constants';
import { useIsMounted } from 'src/shared/hooks/useIsMounted';

interface ISignupModalProps {
  signupEmail: string;
}

export const SignupModal = ({ signupEmail }: ISignupModalProps): ReactElement => {
  const { t } = useTranslation(['landing']);
  const navigate = useNavigate();
  const isMounted = useIsMounted();

  const [email, setEmail] = useState(signupEmail);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>): Promise<void> => {
    try {
      e.preventDefault();
      setIsLoggingIn(true);

      await register({ email, password });
      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem('expectSignIn', '1');
      // manually call
      navigate('/home');
    } catch (err) {
      if (isMounted.current) {
        setIsLoggingIn(false);
        showNotification({
          message: 'Error signing up, please try again.',
          autoClose: true,
        });
      }
    }
  };

  const isPasswordTooShort = (): boolean =>
    password.length < MIN_PASSWORD_LENGTH || passwordConfirm.length < MIN_PASSWORD_LENGTH;

  const isPasswordVerified = (): boolean => {
    return password.length >= MIN_PASSWORD_LENGTH && password === passwordConfirm;
  };

  return (
    <EnhancedModal onSubmit={handleSubmit} centered size='500px' padding={35}>
      <form>
        <Stack align='center'>
          <Logo />
          <Title order={1}>{t('landing:SIGNUP.MODAL.TITLE')}</Title>
        </Stack>
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
              <Text size='xs' color='dimmed' mr='sm'>
                {isPasswordTooShort()
                  ? t('landing:SIGNUP.MODAL.PASSWORD_MIN_LENGTH_WARNING')
                  : t('landing:SIGNUP.MODAL.PASSWORDS_ARE_DIFFERENT')}
              </Text>
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
                  border: 'transparent',
                }
              : {}
          }
          // @TODO - when disabled, make button text color white instead
        >
          {t('landing:SIGNUP.MODAL.SUBMIT_BUTTON')}
        </Button>
      </form>
    </EnhancedModal>
  );
};
