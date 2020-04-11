import React, { FunctionComponent } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

interface IProps {
  login: boolean; // false - signup
  unmount(): void;
}

const FormElement: FunctionComponent<IProps> = ({ login, unmount }) => {
  return (
    <Form style={{ padding: '2rem' }}>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <i className='fas fa-times' style={{ cursor: 'pointer' }}></i>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <p style={{ fontSize: '2.5rem' }}>{login ? 'Welcome' : 'Sign Up'}</p>
        <i className='fas fa-users' style={{ fontSize: '3rem', marginBottom: '2rem' }}></i>
      </div>
      <FormGroup>
        <Label for='exampleEmail'>Email</Label>
        <Input type='email' name='email' id='exampleEmail' required placeholder='email' />
      </FormGroup>
      <FormGroup>
        <Label for='examplePassword'>Password</Label>
        <Input type='password' name='password' id='examplePassword' required placeholder='password' />
      </FormGroup>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <Button style={{ backgroundColor: '#48455f', marginTop: '1rem', borderRadius: '20px', width: '100%' }}>
          Login
        </Button>
      </div>
    </Form>
  );
};

export default FormElement;
