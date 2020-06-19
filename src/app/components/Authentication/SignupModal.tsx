import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal } from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectSignupEmail } from '../../../slices/signupSlice';
import './styles/styles.scss';

interface IProps {
  setDisplaySignupModal: (type: boolean) => void;
}

const SignupModal: React.FC<IProps> = ({ setDisplaySignupModal }) => {
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

  const isPasswordVerified = () => {
    if (password.length > 5 && passwordConfirm.length > 5 && password === passwordConfirm) {
      return true;
    }
    return false;
  };

  const verificationMessage = () => {
    if (password.length > 0 || passwordConfirm.length > 0) {
      if (password.length > 5 || passwordConfirm.length > 5) {
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
    }

    return (
      <>
        <p className='text--small'>PASSWORD MUST BE AT LEAST 6 CHARACTERS</p>
        <i className='fas fa-times' style={{ color: 'red' }}></i>
      </>
    );
  };

  return (
    <Modal isOpen={modal} toggle={unmount} centered={true}>
      <Form className='signup-form'>
        <div className='signup-form__icon-wrapper'>
          <i className='fas fa-times' style={{ cursor: 'pointer' }} onClick={unmount}></i>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
            autoComplete='fdsaf'
            onChange={(e) => setPassword(e.target.value)}
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

        <Button className='signup-form__button' disabled={!isPasswordVerified()}>
          Sign Up
        </Button>
      </Form>
    </Modal>
  );
};

export default SignupModal;
