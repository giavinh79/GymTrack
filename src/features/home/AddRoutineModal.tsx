import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { modalHidden } from 'src/slices/modal/modalSlice';
import { createRoutine } from 'src/http/routine';
import { refreshData } from 'src/slices/general/refreshSlice';

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
      dispatch(modalHidden());
    } catch (err) {
      console.log(err);
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const unmount = () => {
    setModal((modal) => !modal);
    setTimeout(() => {
      dispatch(modalHidden());
    }, 200);
  };

  return (
    <></>
    // <Modal isOpen={modal} toggle={unmount} centered>
    //   <Form className='login-form' onSubmit={handleSubmit}>
    //     <div className='container--column'>
    //       <p className='text--large' style={{ color: '#736E9E', fontWeight: 500 }}>
    //         New Routine
    //       </p>
    //       {/* <i className='fas fa-users' style={{ fontSize: '3rem', marginBottom: '2rem' }}></i> */}
    //     </div>
    //     <FormGroup>
    //       <Label for='routine-name'>Name</Label>
    //       <Input
    //         type='text'
    //         name='routine-name'
    //         id='routine-name'
    //         required
    //         placeholder='name'
    //         value={name}
    //         onChange={handleName}
    //       />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for='exampleDescription'>Description (optional)</Label>
    //       <Input
    //         name='description'
    //         id='description'
    //         type='textarea'
    //         placeholder='description'
    //         value={description}
    //         onChange={handleDescription}
    //       />
    //     </FormGroup>
    //     <Button className='login-form__button' type='submit' disabled={name.length === 0}>
    //       Create
    //     </Button>
    //   </Form>
    // </Modal>
  );
};
