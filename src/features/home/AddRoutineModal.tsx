import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Modal, Space, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { useCreateRoutineMutation } from 'src/services/routine';
import { modalHidden } from 'src/slices/modal/modalSlice';

export const AddRoutineModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [createRoutine, { isLoading }] = useCreateRoutineMutation();

  const form = useForm<{ name: string; description: string }>({
    initialValues: {
      name: '',
      description: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { name, description } = form.values;
      await createRoutine({ name, description });
      // will need to sync query keys of create routine and get routines to force refresh of new routine
      dispatch(modalHidden());
    } catch (err) {
      showNotification({
        icon: <i className='fas fa-exclamation' />,
        id: 'create-routine-error',
        title: 'Error creating a routine',
        message: 'Please try again in a few seconds or contact our support if you continue having issues.',
      });
      throw err; // for Sentry
    }
  };

  return (
    <Modal centered opened onClose={() => dispatch(modalHidden())}>
      <form onSubmit={handleSubmit}>
        <Title order={1}>New Routine</Title>
        {/* <p className='text--large' style={{ color: '#736E9E', fontWeight: 500 }}>
            New Routine
          </p> */}
        <Space h='md' />
        <TextInput
          {...form.getInputProps('name')}
          type='text'
          id='routine-name'
          name='routine-name'
          label={t('Name')}
          placeholder={t('Name')}
          required
          // classNames={{
          //   input: serverError ? 'animate__animated animate__shakeX border-error' : '',
          // }}
          // onFocus={() => setServerError(false)}
        />
        <Space h='md' />
        <Textarea
          {...form.getInputProps('description')}
          id='routine-name'
          name='routine-name'
          label={t('Description (optional)')}
          placeholder={t('Description')}
          required
          minRows={3}
          // classNames={{
          //   input: serverError ? 'animate__animated animate__shakeX border-error' : '',
          // }}
          // onFocus={() => setServerError(false)}
        />
        <Space h='xl' />
        {/* <FormGroup>
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
        </FormGroup> */}
        {/* <FormGroup>
          <Label for='exampleDescription'>Description (optional)</Label>
          <Input
            name='description'
            id='description'
            type='textarea'
            placeholder='description'
            value={description}
            onChange={handleDescription}
          />
        </FormGroup> */}
        <Button type='submit' disabled={form.values.name?.length === 0} fullWidth loading={isLoading}>
          {t('Create')}
        </Button>
        {/* <Button className='login-form__button' type='submit' disabled={name.length === 0}>
          Create
        </Button> */}
      </form>
    </Modal>
  );
};
