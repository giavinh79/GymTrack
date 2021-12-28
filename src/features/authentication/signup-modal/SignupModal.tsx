import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Modal } from 'reactstrap';
import { useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useTranslation } from 'react-i18next';

import { selectSignupEmail } from 'src/slices/auth/signupSlice';
import { auth } from 'src/auth/firebase';
import { register } from 'src/http/auth';
import { MIN_PASSWORD_LENGTH } from 'src/shared/constants';
import { Translations } from 'src/locales/i18n';

import '../styles/styles.scss';

interface ISignupModalProps {
  setDisplaySignupModal: (type: boolean) => void;
}

export const SignupModal = ({ setDisplaySignupModal }: ISignupModalProps): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation(Translations.EN);

  const [modal, setModal] = useState(true);
  const [email, setEmail] = useState(useSelector(selectSignupEmail));
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const unmount = (): void => {
    setModal((modal) => !modal);
    setTimeout(() => {
      setDisplaySignupModal(false);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent<any>): Promise<void> => {
    try {
      e.preventDefault();

      await register({ email, password });
      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem('expectSignIn', '1');
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const isPasswordVerified = (): boolean => {
    return password.length > MIN_PASSWORD_LENGTH && password === passwordConfirm;
  };

  const verificationMessage = (): ReactElement => {
    if (password.length > MIN_PASSWORD_LENGTH || passwordConfirm.length > MIN_PASSWORD_LENGTH) {
      return (
        <>
          <p className='text--small'>{t('landing:SIGNUP.MODAL.PASSWORD_VERIFIED')}</p>
          <i className='fas fa-check' style={{ color: isPasswordVerified() ? 'green' : 'red' }}></i>
        </>
      );
    }

    return (
      <div id='password-constraints' style={{ display: 'flex', alignItems: 'center' }}>
        <p className='text--small'>{t('landing:SIGNUP.MODAL.PASSWORD_MIN_LENGTH_WARNING')}</p>
        <i className='fas fa-times' style={{ color: 'red' }}></i>
      </div>
    );
  };

  return (
    <Modal isOpen={modal} toggle={unmount} centered>
      <Form className='signup-form' onSubmit={handleSubmit}>
        <div className='signup-form__icon-wrapper'>
          <i className='fas fa-times' style={{ cursor: 'pointer' }} onClick={unmount}></i>
        </div>
        <div className='container--column' style={{ textAlign: 'center' }}>
          <div className='container'>
            <span className='text--medium'>Gym</span>
            <span className='signup-form__logo-text text--medium'>Track</span>
            <i className='fas fa-running text--medium' style={{ margin: '0 1rem' }}></i>
          </div>
          <p style={{ fontSize: '2.5rem', fontWeight: 500 }}>{t('landing:SIGNUP.MODAL.TITLE')}</p>
        </div>
        <FormGroup>
          <Label for='exampleEmail'>{t('landing:SIGNUP.MODAL.EMAIL')}</Label>
          <Input
            type='email'
            name='signup-email'
            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
            id='exampleEmail'
            value={email}
            autoComplete='none'
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='examplePassword'>{t('landing:SIGNUP.MODAL.PASSWORD')}</Label>
          <Input
            type='password'
            name='signup-password'
            id='examplePassword'
            placeholder={t('landing:SIGNUP.MODAL.PASSWORD_PLACEHOLDER')}
            autoComplete='new-password'
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby='password-constraints'
          />
        </FormGroup>
        <FormGroup>
          <Label for='examplePasswordConfirm'>{t('landing:SIGNUP.MODAL.CONFIRM_PASSWORD')}</Label>
          <Input
            type='password'
            name='signup-password-confirm'
            id='examplePassword'
            placeholder={t('landing:SIGNUP.MODAL.CONFIRM_PASSWORD')}
            autoComplete='new-password'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </FormGroup>
        <div className='container--right'>{verificationMessage()}</div>

        <Button className='signup-form__button' disabled={!isPasswordVerified()} type='submit'>
          {t('landing:SIGNUP.MODAL.SUBMIT_BUTTON')}
        </Button>
      </Form>
    </Modal>
  );
};
