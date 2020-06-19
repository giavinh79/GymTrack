import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal } from 'reactstrap';
import firebase from '../../../auth/firebase';
import { useHistory } from 'react-router-dom';
import './styles/styles.scss';

interface IProps {
  setShowLoginModal: (type: boolean) => void;
}

const LoginModal: React.FC<IProps> = ({ setShowLoginModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [error, setError] = useState(null);
  const [modal, setModal] = useState(true);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      localStorage.setItem('expectSignIn', '1');
      history.push('/home');
    } catch (err) {
      console.log(err);
      //setError
    }
  };

  const unmount = () => {
    setModal(!modal);
    setTimeout(() => {
      setShowLoginModal(false);
    }, 200);
  };

  return (
    <Modal isOpen={modal} toggle={unmount} centered={true}>
      <Form className='login-form' onSubmit={handleSubmit}>
        <div className='login-form__icon-wrapper'>
          <i className='fas fa-times' style={{ cursor: 'pointer' }} onClick={unmount}></i>
        </div>
        <div className='container--column'>
          <p className='text--large'>Welcome</p>
          <i className='fas fa-users' style={{ fontSize: '3rem', marginBottom: '2rem' }}></i>
        </div>
        <FormGroup>
          <Label for='exampleEmail'>Email</Label>
          <Input
            type='email'
            name='email'
            id='exampleEmail'
            required
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='examplePassword'>Password</Label>
          <Input
            type='password'
            name='password'
            id='examplePassword'
            required
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button className='login-form__button' type='submit'>
          Login
        </Button>
      </Form>
    </Modal>
  );
};

export default LoginModal;
