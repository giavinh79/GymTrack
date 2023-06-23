import React, { memo, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Alert, Button, Group, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { auth } from 'src/auth/firebase';
import { EnhancedModal } from 'src/shared/components';

import { useLoginModalStyles } from './LoginModal.styles';

const LoginModal = memo(function LoginModal(): ReactElement {
  const { t } = useTranslation(['landing']);
  const navigate = useNavigate();

  const [serverError, setServerError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { classes } = useLoginModalStyles();

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
      setIsLoggingIn(false);
      console.log(err);
    }
  };

  const isFormDirty = (): boolean => {
    return Object.values(form.values).some((value) => value.length === 0);
  };

  return (
    <EnhancedModal onSubmit={handleSubmit} centered padding={35}>
      <form autoComplete='on'>
        {serverError && (
          <Alert color='red' className='animate__fadeInDown login-form__alert'>
            {t('landing:LOGIN.MODAL.ERROR.AUTH')}
          </Alert>
        )}
        <Stack align='center'>
          <Title order={1} className={classes.header}>
            {t('landing:LOGIN.MODAL.HEADER')}
          </Title>
          <i className={`fas fa-users ${classes.userIcon}`} />
          <Space h='xl' />
        </Stack>
        <TextInput
          {...form.getInputProps('email')}
          id='loginEmail'
          type='email'
          name='username'
          label={t('landing:LOGIN.MODAL.EMAIL_LABEL')}
          placeholder={t('landing:LOGIN.MODAL.EMAIL_PLACEHOLDER')}
          autoComplete='username'
          required
          classNames={{
            input: serverError ? 'animate__animated animate__shakeX border-error' : '',
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
          autoComplete='current-password'
          required
          classNames={{
            input: serverError ? 'animate__animated animate__shakeX border-error' : '',
          }}
          onFocus={() => setServerError(false)}
        />
        <Space h='md' />
        <Group position='right' spacing='xs'>
          <Link to={'/todo'} target='_blank' style={{ textDecoration: 'none' }}>
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
    </EnhancedModal>
  );
});

export { LoginModal };
