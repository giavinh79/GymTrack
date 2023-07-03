import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Space, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

import { useCreateRoutineMutation } from 'src/services/routine';
import { selectContext } from 'src/slices';
import { modalHidden } from 'src/slices/modal/modalSlice';

export const AddRoutineModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const context = useSelector(selectContext);
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

      await createRoutine({ name, description, userId: context.user.id }).unwrap();
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
        <Space h='md' />
        <TextInput
          {...form.getInputProps('name')}
          type='text'
          id='routine-name'
          name='routine-name'
          label={t('Name')}
          placeholder={t('Name')}
          required
        />
        <Space h='md' />
        <Textarea
          {...form.getInputProps('description')}
          id='routine-name'
          name='routine-name'
          label={t('Description (optional)')}
          placeholder={t('Description')}
          minRows={3}
        />
        <Space h='xl' />
        <Button type='submit' disabled={form.values.name?.length === 0} fullWidth loading={isLoading}>
          {t('Create')}
        </Button>
      </form>
    </Modal>
  );
};
