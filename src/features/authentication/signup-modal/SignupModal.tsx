import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Modal } from 'reactstrap';
import { useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from '@firebase/auth';

import { selectSignupEmail } from 'src/slices/auth/signupSlice';
import { auth } from 'src/auth/firebase';
import { register } from 'src/http/auth';

import '../styles/styles.scss';
import { MIN_PASSWORD_LENGTH } from 'src/constants';

interface ISignupModalProps {
  setDisplaySignupModal: (type: boolean) => void;
}

const SignupModal: React.FC<ISignupModalProps> = ({ setDisplaySignupModal }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(true);
  const [email, setEmail] = useState(useSelector(selectSignupEmail));
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const unmount = () => {
    setModal(!modal);
    setTimeout(() => {
      setDisplaySignupModal(false);
    }, 200);
    setModal(!modal);
  };

  const handleSubmit = async (e: React.FormEvent<any>) => {
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

  const isPasswordVerified = () => {
    return password.length > MIN_PASSWORD_LENGTH && password === passwordConfirm;
  };

  const verificationMessage = () => {
    if (password.length > MIN_PASSWORD_LENGTH || passwordConfirm.length > MIN_PASSWORD_LENGTH) {
      return isPasswordVerified() ? (
        <>
          <p className='text--small'>PASSWORD VERIFIED</p>
          <i className='fas fa-check' style={{ color: 'green' }}></i>
        </>
      ) : (
        <>
          <p className='text--small'>PASSWORD VERIFIED</p>
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        </>
      );
    }

    return (
      <div id='password-constraints' style={{ display: 'flex', alignItems: 'center' }}>
        <p className='text--small'>PASSWORD MUST BE AT LEAST 6 CHARACTERS</p>
        <i className='fas fa-times' style={{ color: 'red' }}></i>
      </div>
    );
  };

  return (
    <Modal isOpen={modal} toggle={unmount} centered={true}>
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
          <p style={{ fontSize: '2.5rem', fontWeight: 500 }}>Let's Get Started</p>
        </div>
        <FormGroup>
          <Label for='exampleEmail'>Email</Label>
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
          <Label for='examplePassword'>Password</Label>
          <Input
            type='password'
            name='signup-password'
            id='examplePassword'
            placeholder='Enter password'
            autoComplete='new-password'
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby='password-constraints'
          />
        </FormGroup>
        <FormGroup>
          <Label for='examplePasswordConfirm'>Confirm Password</Label>
          <Input
            type='password'
            name='signup-password-confirm'
            id='examplePassword'
            placeholder='Confirm password'
            autoComplete='new-password'
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </FormGroup>
        <div className='container--right'>{verificationMessage()}</div>

        <Button className='signup-form__button' disabled={!isPasswordVerified()} type='submit'>
          Sign Up
        </Button>
      </Form>
    </Modal>
  );
};

export default SignupModal;
