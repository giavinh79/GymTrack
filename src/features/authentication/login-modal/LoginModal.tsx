import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Modal, Alert } from 'reactstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from 'src/auth/firebase';

import '../styles/styles.scss';

interface ILoginModalProps {
  setShowLoginModal: (type: boolean) => void;
}

export const LoginModal = ({ setShowLoginModal }: ILoginModalProps): ReactElement => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('expectSignIn', '1');
      navigate('/home');
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError(false);
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError(false);
    setPassword(e.target.value);
  };

  const unmount = (): void => {
    setShowModal(false);
    setTimeout(() => {
      setShowLoginModal(false);
    }, 200);
  };

  return (
    <Modal isOpen={showModal} toggle={unmount} centered>
      <Form className='login-form' onSubmit={handleSubmit} autoComplete='on'>
        <div className='container--tight'>
          {error && (
            <Alert color='danger' className={'animate__fadeInDown login-form__alert'}>
              Invalid username or password, please try again.
            </Alert>
          )}
          <i className='fas fa-times login-form__close-icon' onClick={unmount}></i>
        </div>
        <div className='container--column'>
          <p className='text--large'>Welcome</p>
          <i className='fas fa-users' style={{ fontSize: '3rem', marginBottom: '2rem' }}></i>
        </div>
        <FormGroup>
          <Label for='loginEmail'>Email</Label>
          <Input
            type='email'
            name='username'
            id='loginEmail'
            required
            placeholder='email'
            value={email}
            onChange={handleEmail}
            className={error ? 'animate__animated animate__shakeX input-error' : ''}
          />
        </FormGroup>
        <FormGroup>
          <Label for='loginPassword'>Password</Label>
          <Input
            type='password'
            name='password'
            id='loginPassword'
            required
            placeholder='password'
            value={password}
            onChange={handlePassword}
            className={error ? 'animate__animated animate__shakeX input-error' : ''}
          />
        </FormGroup>
        <div className='container--right'>
          <p className='text--small' style={{ cursor: 'pointer', color: '#bd2b2b' }}>
            FORGOT PASSWORD?
          </p>
          <i className='fa fa-key' aria-hidden='true' style={{ color: '#bd2b2b' }}></i>
          {/* <i className='fas fa-times' style={{ color: 'red' }}></i> */}
        </div>
        <Button className='login-form__button' type='submit' disabled={email.length === 0 || password.length === 0}>
          Login
        </Button>
      </Form>
    </Modal>
  );
};
