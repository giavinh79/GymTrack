import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../../slices/modalSlice';
import { createRoutine } from '../../../http/routine';
import { refreshData } from '../../../slices/refreshSlice';

export const AddRoutineModal = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [modal, setModal] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRoutine({ name, description });
      dispatch(refreshData());
      dispatch(hideModal());
    } catch (err) {
      console.log(err.message);
      console.log(err);
    }
  };

  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const unmount = () => {
    setModal(!modal);
    setTimeout(() => {
      dispatch(hideModal());
    }, 200);
  };

  return (
    <Modal isOpen={modal} toggle={unmount} centered={true}>
      <Form className='login-form' onSubmit={handleSubmit}>
        <div className='container--column'>
          <p className='text--large' style={{ color: '#736E9E', fontWeight: 500 }}>
            New Routine
          </p>
          {/* <i className='fas fa-users' style={{ fontSize: '3rem', marginBottom: '2rem' }}></i> */}
        </div>
        <FormGroup>
          <Label for='routine-name'>Name</Label>
          <Input
            type='text'
            name='routine-name'
            id='routine-name'
            required
            placeholder='name'
            value={name}
            onChange={handleName}
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleDescription'>Description (optional)</Label>
          <Input
            name='description'
            id='description'
            type='textarea'
            placeholder='description'
            value={description}
            onChange={handleDescription}
          />
        </FormGroup>
        <Button className='login-form__button' type='submit' disabled={name.length === 0}>
          Create
        </Button>
      </Form>
    </Modal>
  );
};
