import React, { useState, FunctionComponent } from 'react';
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
  setShowLoginModal(type: boolean): void;
}

const LoginModal: FunctionComponent<IProps> = ({ setShowLoginModal }) => {
  const [modal, setModal] = useState(true);

  const unmount = () => {
    setModal(!modal);
    setTimeout(() => {
      setShowLoginModal(false);
    }, 200);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={unmount} centered={true}>
        <Form style={{ padding: '2rem' }}>
          <div style={{ width: '100%', textAlign: 'right' }}>
            <i className='fas fa-times' style={{ cursor: 'pointer' }} onClick={unmount}></i>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p style={{ fontSize: '2.5rem' }}>Welcome</p>
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
      </Modal>
    </div>
  );
};

export default LoginModal;

{
  //   <Form>
  // <FormGroup>
  //   <Label for='exampleEmail'>Email</Label>
  //   <Input type='email' name='email' id='exampleEmail' placeholder='with a placeholder' />
  // </FormGroup>
  // <FormGroup>
  //   <Label for='examplePassword'>Password</Label>
  //   <Input type='password' name='password' id='examplePassword' placeholder='password placeholder' />
  // </FormGroup>
  // <FormGroup>
  //   <Label for='exampleSelect'>Select</Label>
  //   <Input type='select' name='select' id='exampleSelect'>
  //     <option>1</option>
  //     <option>2</option>
  //     <option>3</option>
  //     <option>4</option>
  //     <option>5</option>
  //   </Input>
  // </FormGroup>
  // <FormGroup>
  //   <Label for='exampleSelectMulti'>Select Multiple</Label>
  //   <Input type='select' name='selectMulti' id='exampleSelectMulti' multiple>
  //     <option>1</option>
  //     <option>2</option>
  //     <option>3</option>
  //     <option>4</option>
  //     <option>5</option>
  //   </Input>
  // </FormGroup>
  // <FormGroup>
  //   <Label for='exampleText'>Text Area</Label>
  //   <Input type='textarea' name='text' id='exampleText' />
  // </FormGroup>
  // <FormGroup>
  //   <Label for='exampleFile'>File</Label>
  //   <Input type='file' name='file' id='exampleFile' />
  //   <FormText color='muted'>
  //     This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a
  //     new line.
  //   </FormText>
  // </FormGroup>
  // <FormGroup tag='fieldset'>
  //   <legend>Radio Buttons</legend>
  //   <FormGroup check>
  //     <Label check>
  //       <Input type='radio' name='radio1' /> Option one is this and that—be sure to include why it's great
  //     </Label>
  //   </FormGroup>
  //   <FormGroup check>
  //     <Label check>
  //       <Input type='radio' name='radio1' /> Option two can be something else and selecting it will deselect option
  //       one
  //     </Label>
  //   </FormGroup>
  //   <FormGroup check disabled>
  //     <Label check>
  //       <Input type='radio' name='radio1' disabled /> Option three is disabled
  //     </Label>
  //   </FormGroup>
  // </FormGroup>
  // <FormGroup check>
  //   <Label check>
  //     <Input type='checkbox' /> Check me out
  //   </Label>
  // </FormGroup>
  // <Button>Submit</Button>
  // </Form>
}
