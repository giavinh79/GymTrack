import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal } from 'reactstrap';

const SignupModal = () => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);
  //   turnform code into component for both login and signup and pass props in

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <Form style={{ padding: '2rem' }}>
          <div style={{ width: '100%', textAlign: 'right' }}>
            <i className='fas fa-times' style={{ cursor: 'pointer' }}></i>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p style={{ fontSize: '2.5rem' }}>Sign Up</p>
            <i className='fas fa-users' style={{ fontSize: '3rem', marginBottom: '2rem' }}></i>
          </div>
          <FormGroup>
            <Label for='exampleEmail'>Email</Label>
            <Input type='email' name='email' id='exampleEmail' placeholder='with a placeholder' />
          </FormGroup>
          <FormGroup>
            <Label for='examplePassword'>Password</Label>
            <Input type='password' name='password' id='examplePassword' placeholder='password placeholder' />
          </FormGroup>
          <div style={{ width: '100%', textAlign: 'right' }}>
            <Button style={{ backgroundColor: '#48455f', marginTop: '1rem', borderRadius: '20px', width: '100%' }}>
              Login
            </Button>
          </div>
        </Form>
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default SignupModal;
