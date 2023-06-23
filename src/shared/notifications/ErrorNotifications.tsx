import { showNotification } from '@mantine/notifications';
import i18n from 'i18next';

interface IShowErrorApi {
  id: string;
  title: string;
  message: string;
}

export const showError = ({
  id,
  title,
  message = 'Please try again in a few seconds or contact our support if you continue having issues.',
}: IShowErrorApi) =>
  showNotification({
    icon: <i className='fas fa-exclamation' />,
    id,
    title,
    message,
    color: 'red',
  });

// @TODO - placeholder for when i18n is incorporated into logic above
export const test = (messageKey: string) => {
  return i18n.t(messageKey);
};
